import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendPurchaseEmail } from '@/lib/resend';

export const runtime = 'nodejs';

/**
 * Stripe webhook. Idempotent via stripe_events PK. Handles:
 *  - checkout.session.completed / async_payment_succeeded  → purchases | subscriptions + entitlements
 *  - customer.subscription.updated / deleted               → subscriptions + entitlement expiry
 *  - charge.refunded                                       → purchase refunded, entitlement revoked
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get('stripe-signature');
  if (!secret || !sig) return NextResponse.json({ error: 'not configured' }, { status: 503 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, sig, secret);
  } catch (e) {
    return NextResponse.json({ error: `bad signature: ${(e as Error).message}` }, { status: 400 });
  }

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'db unavailable' }, { status: 503 });

  // Idempotency gate
  const { error: dupe } = await db.from('stripe_events').insert({ id: event.id, type: event.type, payload: event as unknown as Record<string, unknown> });
  if (dupe) return NextResponse.json({ received: true, duplicate: true });

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await onCheckoutCompleted(db, event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await onSubscriptionChanged(db, event.data.object as Stripe.Subscription);
        break;
      case 'charge.refunded':
        await onRefund(db, event.data.object as Stripe.Charge);
        break;
    }
    await db.from('stripe_events').update({ processed_at: new Date().toISOString() }).eq('id', event.id);
  } catch (e) {
    await db.from('stripe_events').update({ error: (e as Error).message }).eq('id', event.id);
    return NextResponse.json({ error: 'handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

type Db = NonNullable<ReturnType<typeof createAdminClient>>;

async function onCheckoutCompleted(db: Db, session: Stripe.Checkout.Session) {
  if (session.payment_status !== 'paid' && session.mode !== 'subscription') return;
  const productId = session.metadata?.product_id;
  const email = session.customer_details?.email ?? session.customer_email;
  const userId = session.metadata?.user_id || session.client_reference_id || null;
  if (!productId || !email) return;

  if (session.mode === 'subscription') {
    const subId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
    if (!subId) return;
    const sub = await getStripe().subscriptions.retrieve(subId);
    await upsertSubscription(db, sub, { productId, email, userId });
    return;
  }

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

  await sendPurchaseEmail({ to: email, productId, hasAccount: Boolean(userId) }).catch(() => {});
}

async function onSubscriptionChanged(db: Db, sub: Stripe.Subscription) {
  const productId = sub.metadata?.product_id ?? 'pro';
  const { data: existing } = await db.from('subscriptions').select('email, user_id').eq('stripe_subscription_id', sub.id).maybeSingle();
  if (!existing) return; // created by checkout handler first
  await upsertSubscription(db, sub, { productId, email: existing.email, userId: existing.user_id });
}

async function upsertSubscription(db: Db, sub: Stripe.Subscription, ctx: { productId: string; email: string; userId: string | null }) {
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

async function onRefund(db: Db, charge: Stripe.Charge) {
  const pi = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
  if (!pi) return;
  const { data: purchase } = await db
    .from('purchases')
    .update({ status: 'refunded', refunded_at: new Date().toISOString() })
    .eq('stripe_payment_intent_id', pi)
    .select('id')
    .maybeSingle();
  if (purchase) {
    await db.from('entitlements').update({ revoked_at: new Date().toISOString(), note: 'refunded' }).eq('source_id', purchase.id);
  }
}
