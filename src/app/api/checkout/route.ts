import { NextResponse } from 'next/server';
import { getStripe, stripeConfigured, SITE_URL } from '@/lib/stripe';
import { getProduct, launchSeatsTaken } from '@/lib/entitlements';
import { getUser } from '@/lib/supabase/server';
import type { ProductId } from '@/data/skills';

export const runtime = 'nodejs';

/**
 * POST /api/checkout { productId }
 * Guest checkout is allowed. Entitlement is claimed by email on first sign-in.
 */
export async function POST(req: Request) {
  if (!stripeConfigured()) return NextResponse.json({ error: 'payments_unavailable' }, { status: 503 });

  const { productId } = (await req.json().catch(() => ({}))) as { productId?: ProductId };
  if (!productId) return NextResponse.json({ error: 'missing productId' }, { status: 400 });

  const product = await getProduct(productId);
  if (!product || !product.active) return NextResponse.json({ error: 'unknown product' }, { status: 404 });

  // Launch pricing: honor the launch price only while seats remain.
  let priceId = product.stripe_price_id;
  let wasLaunch = false;
  if (product.stripe_launch_price_id && product.launch_seat_limit) {
    const taken = await launchSeatsTaken(productId);
    if (taken < product.launch_seat_limit) {
      priceId = product.stripe_launch_price_id;
      wasLaunch = true;
    }
  }
  if (!priceId) return NextResponse.json({ error: 'product not priced' }, { status: 503 });

  const user = await getUser();
  const stripe = getStripe();
  const isSub = product.kind === 'subscription';

  const session = await stripe.checkout.sessions.create({
    mode: isSub ? 'subscription' : 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    ...(user?.email ? { customer_email: user.email } : {}),
    ...(user ? { client_reference_id: user.id } : {}),
    metadata: { product_id: productId, user_id: user?.id ?? '', was_launch_price: wasLaunch ? '1' : '0' },
    ...(isSub ? { subscription_data: { metadata: { product_id: productId, user_id: user?.id ?? '' } } } : {}),
    success_url: `${SITE_URL}/account?purchased=${productId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/pricing?canceled=1`,
    automatic_tax: { enabled: true },
    ...(isSub ? {} : { invoice_creation: { enabled: true } }),
  });

  return NextResponse.json({ url: session.url });
}
