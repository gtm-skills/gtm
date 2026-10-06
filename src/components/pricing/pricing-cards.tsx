import Link from 'next/link';
import { Check } from 'lucide-react';
import { kits, getSkill, formatPrice, type Kit } from '@/data/skills';
import type { LaunchState } from '@/lib/entitlements';
import { CheckoutButton } from './checkout-button';

const GUARANTEE = '14-day money-back guarantee · Secure checkout via Stripe · Instant access';

export function PricingCards({ launch, compact = false }: { launch: LaunchState; compact?: boolean }) {
  const bundle = kits.find((k) => k.id === 'full-bundle')!;
  const pro = kits.find((k) => k.id === 'pro')!;
  const roleKits = kits.filter((k) => k.kind === 'kit');

  const bundlePrice = launch.active && bundle.launchPriceCents ? bundle.launchPriceCents : bundle.priceCents;

  return (
    <div className="flex flex-col gap-6">
      {/* Headline pair: Bundle + Pro */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative rounded-2xl border-2 border-primary bg-card p-7 flex flex-col">
          <span className="absolute -top-3 left-6 label-mono text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded">
            {launch.active ? `Launch price · ${launch.left} of ${launch.limit} left` : 'Best value'}
          </span>
          <h3 className="text-xl font-bold">{bundle.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{bundle.tagline}</p>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-bold tabular-nums">{formatPrice(bundlePrice)}</span>
            {launch.active && <span className="text-lg text-muted-foreground line-through tabular-nums">{formatPrice(bundle.priceCents)}</span>}
            <span className="text-sm text-muted-foreground">once</span>
          </div>
          {launch.active && (
            <p className="text-xs text-muted-foreground mt-1">Goes to {formatPrice(bundle.priceCents)} after {launch.limit} buyers.</p>
          )}
          <ul className="mt-6 space-y-2 text-sm flex-1">
            {[
              `All ${bundle.skillSlugs.length} premium skills across every kit`,
              'Every new skill drop for 12 months',
              'Claude Code, Cursor, Codex, Gemini CLI, OpenClaw',
              'Unlocks premium tools in the GTM Skills plugin for ChatGPT',
              'Personal license, team pricing on request',
            ].map((f) => (
              <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}</li>
            ))}
          </ul>
          <div className="mt-7">
            <CheckoutButton productId="full-bundle" priceCents={bundlePrice} className="w-full h-12 label-mono text-xs">
              Get the Bundle — {formatPrice(bundlePrice)}
            </CheckoutButton>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 flex flex-col">
          <h3 className="text-xl font-bold">{pro.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{pro.tagline}</p>
          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-4xl font-bold tabular-nums">{formatPrice(pro.priceCents)}</span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Cancel anytime from your account.</p>
          <ul className="mt-6 space-y-2 text-sm flex-1">
            {[
              'Everything in the Bundle while active',
              'Unlimited call prep, debrief and follow-up in ChatGPT',
              'Weekly drops the day they ship',
              'Priority requests for new skills',
            ].map((f) => (
              <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}</li>
            ))}
          </ul>
          <div className="mt-7">
            <CheckoutButton productId="pro" priceCents={pro.priceCents} variant="outline" className="w-full h-12 label-mono text-xs">
              Start Pro — {formatPrice(pro.priceCents)}/mo
            </CheckoutButton>
          </div>
        </div>
      </div>

      {/* Role kits */}
      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roleKits.map((k) => <KitCard key={k.id} kit={k} />)}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">{GUARANTEE}</p>
    </div>
  );
}

function KitCard({ kit }: { kit: Kit }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col">
      <h4 className="font-semibold">{kit.name}</h4>
      <p className="text-xs text-muted-foreground mt-1">{kit.tagline}</p>
      <div className="mt-4 text-2xl font-bold tabular-nums">{formatPrice(kit.priceCents)} <span className="text-xs font-normal text-muted-foreground">once</span></div>
      <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground flex-1">
        {kit.skillSlugs.map((s) => {
          const sk = getSkill(s);
          return sk ? (
            <li key={s}><Link href={`/skills/${s}`} className="hover:text-foreground">{sk.name}</Link></li>
          ) : null;
        })}
      </ul>
      <div className="mt-5">
        <CheckoutButton productId={kit.id} priceCents={kit.priceCents} variant="outline" size="sm" className="w-full">
          Get {kit.name}
        </CheckoutButton>
      </div>
    </div>
  );
}
