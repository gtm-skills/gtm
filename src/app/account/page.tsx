import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/server';
import { getEntitlements } from '@/lib/entitlements';
import { createAdminClient } from '@/lib/supabase/admin';
import { getKit, getSkill, kits, type ProductId } from '@/data/skills';
import { SkillCard } from '@/components/skills/skill-card';
import { ApiKeysPanel } from '@/components/auth/api-keys-panel';
import { PortalButton } from '@/components/auth/portal-button';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Account | GTM Skills', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ purchased?: string }> }) {
  const user = await getUser();
  if (!user) redirect('/login?next=/account');
  const sp = await searchParams;

  // A fresh purchase may land before the webhook; claim by email just in case.
  const admin = createAdminClient();
  if (admin && user.email) await admin.rpc('claim_purchases', { p_user_id: user.id, p_email: user.email });

  const ents = await getEntitlements(user.id);
  const products = Array.from(new Set(ents.map((e) => e.product_id))) as ProductId[];
  const hasSub = ents.some((e) => e.source === 'subscription');
  const slugs = Array.from(new Set(products.flatMap((p) => getKit(p)?.skillSlugs ?? [])));
  const unlocked = slugs.map(getSkill).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{user.email}</h1>
          <p className="text-sm text-muted-foreground mt-1">Same account works in Claude Code, Cursor, Codex and the ChatGPT plugin.</p>
        </div>
        <form action="/auth/signout" method="post"><Button variant="outline" size="sm" type="submit">Sign out</Button></form>
      </div>

      {sp.purchased && (
        <div className="mb-8 rounded-xl border border-primary/40 bg-primary/5 p-5">
          <p className="font-medium">Thanks — {getKit(sp.purchased as ProductId)?.name ?? 'your purchase'} is attaching to this account.</p>
          <p className="text-sm text-muted-foreground mt-1">
            {products.length ? 'Your skills are below.' : 'If it is not listed in a minute, refresh. Receipts come from Stripe.'}
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-10">
          <section>
            <h2 className="label-mono text-xs text-muted-foreground mb-4">Your plans</h2>
            {products.length ? (
              <ul className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <li key={p} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
                    {getKit(p)?.name ?? p}
                    {ents.find((e) => e.product_id === p)?.expires_at && (
                      <span className="text-xs text-muted-foreground ml-2">renews {new Date(ents.find((e) => e.product_id === p)!.expires_at!).toLocaleDateString()}</span>
                    )}
                  </li>
                ))}
                {hasSub && <li><PortalButton /></li>}
              </ul>
            ) : (
              <div className="rounded-xl border border-border bg-card p-5 text-sm">
                <p>No premium plans yet. The {kits.filter((k) => k.kind === 'kit').length} kits and Pro are on the <Link href="/pricing" className="text-primary underline">plans page</Link>.</p>
              </div>
            )}
          </section>

          <section>
            <h2 className="label-mono text-xs text-muted-foreground mb-4">Unlocked skills</h2>
            {unlocked.length ? (
              <div className="grid gap-4 sm:grid-cols-2">{unlocked.map((s) => <SkillCard key={s.slug} skill={s} />)}</div>
            ) : (
              <p className="text-sm text-muted-foreground">Free skills are always available on <Link href="/skills?tier=free" className="text-primary underline">the skills page</Link>.</p>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <ApiKeysPanel />
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <h2 className="font-semibold mb-2">ChatGPT plugin</h2>
            <p className="text-muted-foreground">Add <strong>GTM Skills</strong> from the ChatGPT plugin directory and sign in with this email. Premium tools unlock automatically.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
