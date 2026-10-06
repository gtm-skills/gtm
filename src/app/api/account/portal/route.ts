import { NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getStripe, stripeConfigured, SITE_URL } from '@/lib/stripe';

/** Stripe customer portal for managing Pro. */
export async function POST() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!stripeConfigured()) return NextResponse.json({ error: 'payments_unavailable' }, { status: 503 });
  const db = createAdminClient();
  const { data } = await db!
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .not('stripe_customer_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data?.stripe_customer_id) return NextResponse.json({ error: 'no_subscription' }, { status: 404 });
  const session = await getStripe().billingPortal.sessions.create({ customer: data.stripe_customer_id, return_url: `${SITE_URL}/account` });
  return NextResponse.json({ url: session.url });
}
