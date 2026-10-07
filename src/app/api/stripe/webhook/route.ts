import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { fulfillCheckoutSession, upsertSubscription, type Db } from '@/lib/fulfillment';

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
        await fulfillCheckoutSession(db, event.data.object as Stripe.Checkout.Session);
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

async function onSubscriptionChanged(db: Db, sub: Stripe.Subscription) {
  const productId = sub.metadata?.product_id ?? 'pro';
  const { data: existing } = await db.from('subscriptions').select('email, user_id').eq('stripe_subscription_id', sub.id).maybeSingle();
  if (!existing) return; // created by checkout handler first
  await upsertSubscription(db, sub, { productId, email: existing.email, userId: existing.user_id });
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
