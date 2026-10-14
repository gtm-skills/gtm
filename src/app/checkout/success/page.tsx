import type { Metadata } from 'next';
import Link from 'next/link';
import type Stripe from 'stripe';
import { Check } from 'lucide-react';
import { getStripe, stripeConfigured } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { getUser } from '@/lib/supabase/server';
import { getEntitlements } from '@/lib/entitlements';
import { fulfillCheckoutSession } from '@/lib/fulfillment';
import { getKit, getSkill, type ProductId } from '@/data/skills';
import { SkillIcon } from '@/components/skills/skill-icon';
import { ClaimAccess } from '@/components/checkout/claim-access';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Payment received | GTM Skills', robots: { index: false } };
export const dynamic = 'force-dynamic';

const SUPPORT = 'hello@gtm-skills.com';

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="max-w-3xl mx-auto px-6 py-16">{children}</div>;
}

function Notice({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <Shell>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-3">{body}</p>
      <Button asChild className="mt-6"><Link href={href}>{cta}</Link></Button>
      <p className="text-sm text-muted-foreground mt-8">Need help? <a className="underline underline-offset-2" href={`mailto:${SUPPORT}`}>{SUPPORT}</a></p>
    </Shell>
  );
}

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId } = await searchParams;

  let session: Stripe.Checkout.Session | null = null;
  if (sessionId?.startsWith('cs_') && stripeConfigured()) {
    session = await getStripe().checkout.sessions.retrieve(sessionId).catch(() => null);
  }

  if (!session) {
    return <Notice title="We could not find that checkout." body="If you paid, your receipt is in your inbox and your purchase is safe. Sign in with the email you paid with to see it." href="/login?next=/account" cta="Sign in" />;
  }
  if (session.status !== 'complete') {
    return <Notice title="That checkout was not finished." body="Nothing was charged. Pick up where you left off." href="/pricing" cta="Back to pricing" />;
  }

  const paid = session.payment_status === 'paid' || session.payment_status === 'no_payment_required';
  const email = session.customer_details?.email ?? session.customer_email ?? '';
  const productId = (session.metadata?.product_id ?? '') as ProductId;
  const kit = getKit(productId);

  if (!paid) {
    return <Notice title="Your payment is processing." body={`Your bank has not confirmed it yet. We will email ${email || 'you'} the moment it clears, and your skills unlock then.`} href="/skills" cta="Browse skills meanwhile" />;
  }

  // Record the purchase here as well as in the webhook, so access never waits on webhook delivery.
  const db = createAdminClient();
  if (db) await fulfillCheckoutSession(db, session).catch(() => null);

  const user = await getUser();
  let unlocked = false;
  if (user && db) {
    if (user.email) await db.rpc('claim_purchases', { p_user_id: user.id, p_email: user.email });
    unlocked = (await getEntitlements(user.id)).some((e) => e.product_id === productId);
  }

  const skillList = (kit?.skillSlugs ?? []).map(getSkill).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const first = skillList[0];
  const isSub = session.mode === 'subscription';
  const amount = ((session.amount_total ?? 0) / 100).toLocaleString('en-US', { style: 'currency', currency: (session.currency ?? 'usd').toUpperCase() });
  const next = `/account?purchased=${productId}`;

  const steps = [
    { title: unlocked ? 'Signed in' : 'Click the link in your email', body: unlocked ? `Your purchase is attached to ${user?.email}.` : 'That signs you in and attaches this purchase to your account.', done: unlocked },
    { title: 'Open a skill and copy its install prompt', body: 'Each skill page has one prompt per agent. Your account page has the API key it needs.', done: false },
    { title: 'Paste it into your agent', body: 'Claude Code, Cursor, Codex or Gemini CLI fetches the files and writes them to the right folder.', done: false },
  ];

  return (
    <Shell>
      <div className="flex items-center gap-2 text-sm text-brand-primary font-medium">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-[#0F1521]"><Check className="h-4 w-4" strokeWidth={3} /></span>
        Payment received
      </div>
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4">
        {isSub ? `You are on ${kit?.name ?? 'Pro'}.` : `You own the ${kit?.name ?? 'kit'}.`}
      </h1>
      <p className="text-muted-foreground mt-3">
        {amount}{isSub ? ' a month' : ', paid once'}. {email && <>Receipt sent to <span className="text-foreground">{email}</span>.</>}
      </p>

      <div className="mt-8">
        {unlocked ? (
          <div className="rounded-xl border border-brand-primary/50 bg-brand-primary/5 p-6">
            <p className="font-medium text-lg">Your skills are unlocked.</p>
            <p className="text-sm text-muted-foreground mt-1">Start with one. Install it, run it on a real account, keep what it makes.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {first && <Button asChild><Link href={`/skills/${first.slug}`}>Install {first.name}</Link></Button>}
              <Button asChild variant="outline"><Link href="/account">Get your API key</Link></Button>
            </div>
          </div>
        ) : user ? (
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="font-medium text-lg">This purchase is under a different email.</p>
            <p className="text-sm text-muted-foreground mt-1">You are signed in as {user.email}, but you paid as <strong className="text-foreground">{email}</strong>. Sign out, then sign in with that email to unlock it.</p>
            <form action="/auth/signout" method="post" className="mt-4"><Button variant="outline" size="sm" type="submit">Sign out</Button></form>
          </div>
        ) : (
          <ClaimAccess email={email} next={next} sessionId={session.id} />
        )}
      </div>

      <section className="mt-12">
        <h2 className="label-mono text-xs text-muted-foreground mb-4">What happens next</h2>
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm tabular-nums ${s.done ? 'bg-brand-primary text-[#0F1521]' : 'border border-border text-muted-foreground'}`}>
                {s.done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {skillList.length > 0 && (
        <section className="mt-12">
          <h2 className="label-mono text-xs text-muted-foreground mb-4">What you unlocked · {skillList.length} skills</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {skillList.map((s) => (
              <li key={s.slug}>
                <Link href={`/skills/${s.slug}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-foreground/40 transition-colors">
                  <SkillIcon name={s.icon.lucide} hue={s.icon.hue} size="sm" />
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{s.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{s.tagline}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-sm text-muted-foreground mt-12 border-t border-border pt-6">
        {isSub ? 'Cancel any time from your account page.' : '14-day refund, no questions asked.'} Questions or trouble signing in: <a className="underline underline-offset-2" href={`mailto:${SUPPORT}`}>{SUPPORT}</a>
      </p>
    </Shell>
  );
}
