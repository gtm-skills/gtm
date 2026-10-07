import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import type { createAdminClient } from '@/lib/supabase/admin';
import { sendPurchaseEmail } from '@/lib/resend';

/**
 * Fulfilment shared by the Stripe webhook and the post-checkout page.
 * Both call it for the same session; every write is an upsert keyed on the
 * Stripe id, and the purchase email only goes out the first time.
 */
export type Db = NonNullable<ReturnType<typeof createAdminClient>>;

export interface Fulfilled {
  productId: string;
  email: string;
  userId: string | null;
}

export async function fulfillCheckoutSession(db: Db, session: Stripe.Checkout.Session): Promise<Fulfilled | null> {
  if (session.payment_status !== 'paid' && session.mode !== 'subscription') return null;
  const productId = session.metadata?.product_id;
  const email = session.customer_details?.email ?? session.customer_email;
  const userId = session.metadata?.user_id || session.client_reference_id || null;
  if (!productId || !email) return null;
  const out: Fulfilled = { productId, email, userId };

  if (session.mode === 'subscription') {
    const subId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
    if (!subId) return null;
    const { data: seenSub } = await db.from('subscriptions').select('id').eq('stripe_subscription_id', subId).maybeSingle();
    const sub = await getStripe().subscriptions.retrieve(subId);
    await upsertSubscription(db, sub, { productId, email, userId });
    if (!seenSub) await sendPurchaseEmail({ to: email, productId, hasAccount: Boolean(userId) }).catch(() => {});
    return out;
  }

  const { data: seen } = await db.from('purchases').select('id').eq('stripe_checkout_session_id', session.id).maybeSingle();

  const { data: purchase } = await db
    .from('purchases')
    .upsert(
      {
        user_id: userId || null,
        email,
        product_id: productId,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null,
        amount_cents: session.amount_total ?? 0,
        currency: session.currency ?? 'usd',
        was_launch_price: session.metadata?.was_launch_price === '1',
        status: 'paid',
      },
      { onConflict: 'stripe_checkout_session_id' },
    )
    .select('id')
    .single();

  if (userId && purchase) {
    await db.from('entitlements').upsert(
      { user_id: userId, product_id: productId, source: 'purchase', source_id: purchase.id },
      { onConflict: 'user_id,product_id,source,source_id', ignoreDuplicates: true },
    );
  } else if (purchase) {
    // Guest: claim on first sign-in via claim_purchases(). If the email already
    // has an account, claim now.
    const { data: prof } = await db.from('profiles').select('id').ilike('email', email).maybeSingle();
    if (prof?.id) await db.rpc('claim_purchases', { p_user_id: prof.id, p_email: email });
  }

  if (!seen) await sendPurchaseEmail({ to: email, productId, hasAccount: Boolean(userId) }).catch(() => {});
  return out;
}

export async function upsertSubscription(db: Db, sub: Stripe.Subscription, ctx: { productId: string; email: string; userId: string | null }) {
  const periodEnd = sub.items.data[0]?.current_period_end ?? null;
  const periodEndIso = periodEnd ? new Date(periodEnd * 1000).toISOString() : null;
  const active = ['active', 'trialing', 'past_due'].includes(sub.status);

  const { data: row } = await db
    .from('subscriptions')
    .upsert(
      {
        user_id: ctx.userId,
        email: ctx.email,
        product_id: ctx.productId,
        stripe_subscription_id: sub.id,
        stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
        status: sub.status,
        current_period_end: periodEndIso,
        cancel_at_period_end: sub.cancel_at_period_end,
        canceled_at: sub.canceled_at ? new Date(sub.canceled_at * 1000).toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'stripe_subscription_id' },
    )
    .select('id, user_id')
    .single();

  const userId = row?.user_id ?? ctx.userId;
  if (!row || !userId) {
    if (row && !userId) {
      const { data: prof } = await db.from('profiles').select('id').ilike('email', ctx.email).maybeSingle();
      if (prof?.id) await db.rpc('claim_purchases', { p_user_id: prof.id, p_email: ctx.email });
    }
    return;
  }

  // Entitlement tracks the current period; a lapsed sub simply expires.
  await db.from('entitlements').upsert(
    {
      user_id: userId,
      product_id: ctx.productId,
      source: 'subscription',
      source_id: row.id,
      expires_at: active ? periodEndIso : new Date().toISOString(),
      revoked_at: null,
    },
    { onConflict: 'user_id,product_id,source,source_id' },
  );
}
