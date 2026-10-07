import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice, getKit, kits, type Skill } from '@/data/skills';

/**
 * Server component. Shows a short blurred preview (never the full file) and the two
 * ways to unlock. Pricing lives on /pricing; this is informational.
 */
export function PaywallGate({ skill, preview, signedIn }: { skill: Skill; preview: string | null; signedIn: boolean }) {
  const kit = getKit(skill.kits[0]);
  const pro = kits.find((k) => k.id === 'pro')!;
  return (
    <div className="relative rounded-xl border border-border bg-card overflow-hidden">
      {preview && (
        <pre className="p-5 text-xs leading-relaxed text-muted-foreground select-none blur-[3px] max-h-72 overflow-hidden" aria-hidden="true">
          {preview}
        </pre>
      )}
      <div className={`${preview ? 'absolute inset-0 bg-gradient-to-b from-card/40 via-card/90 to-card' : ''} flex items-end`}>
        <div className="p-6 w-full">
          <div className="flex items-center gap-2 label-mono text-xs text-primary mb-2">
            <Lock className="h-3.5 w-3.5" /> Premium skill
          </div>
          <h3 className="text-lg font-semibold">
            {skill.name} is in the {kit?.name ?? 'Full Bundle'}.
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {kit ? `${formatPrice(kit.priceCents)} once for the kit, or ` : ''}
            {formatPrice(pro.priceCents)}/mo for everything in Pro. 14-day refund.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/pricing#${kit?.id ?? 'full-bundle'}`}>
              <Button className="label-mono text-xs">See plans</Button>
            </Link>
            {!signedIn && (
              <Link href={`/login?next=/skills/${skill.slug}`}>
                <Button variant="outline" className="label-mono text-xs">Already bought? Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
