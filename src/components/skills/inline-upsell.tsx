import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getKit, getSkill, formatPrice, type KitId } from '@/data/skills';

/** Drop-in CTA for free/SEO pages: points at the matching premium skill or kit. */
export function InlineUpsell({ kit, skill, title }: { kit?: KitId; skill?: string; title?: string }) {
  const s = skill ? getSkill(skill) : undefined;
  const k = getKit(kit ?? s?.kits[0] ?? 'sdr-kit');
  if (!k) return null;
  const href = s ? `/skills/${s.slug}` : `/pricing#${k.id}`;
  return (
    <Link href={href} className="group my-10 flex items-center justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 p-5 hover:bg-primary/10 transition-colors">
      <div>
        <p className="label-mono text-[10px] text-primary mb-1">Go further</p>
        <p className="font-semibold">{title ?? (s ? `${s.name} — the finished version of this` : `${k.name}: ${k.tagline}`)}</p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {s ? s.tagline : k.description} · {formatPrice(k.priceCents)} once or in Pro.
        </p>
      </div>
      <ArrowRight className="h-5 w-5 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}
