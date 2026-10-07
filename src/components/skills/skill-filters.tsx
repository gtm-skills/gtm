'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CATEGORIES, AGENTS, type SkillCategory, type Agent, type Tier } from '@/data/skills';

const ROLES = [
  ['sdr', 'SDR'], ['ae', 'AE'], ['manager', 'Manager'], ['revops', 'RevOps'], ['csm', 'CSM'], ['founder', 'Founder'],
] as const;

export function SkillFilters() {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();

  const set = (k: string, v: string | null) => {
    const next = new URLSearchParams(sp.toString());
    if (!v || sp.get(k) === v) next.delete(k); else next.set(k, v);
    router.replace(`${path}${next.size ? `?${next}` : ''}`, { scroll: false });
  };

  const Chip = ({ k, v, label }: { k: string; v: string; label: string }) => {
    const on = sp.get(k) === v;
    return (
      <button
        type="button"
        onClick={() => set(k, v)}
        className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
          on ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Chip k="tier" v={'free' satisfies Tier} label="Free" />
        <Chip k="tier" v={'premium' satisfies Tier} label="Premium" />
        <span className="w-px bg-border mx-1" />
        {(Object.keys(CATEGORIES) as SkillCategory[]).map((c) => (
          <Chip key={c} k="category" v={c} label={CATEGORIES[c].name} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {ROLES.map(([v, l]) => <Chip key={v} k="role" v={v} label={l} />)}
        <span className="w-px bg-border mx-1" />
        {(Object.keys(AGENTS) as Agent[]).map((a) => <Chip key={a} k="agent" v={a} label={AGENTS[a].name} />)}
      </div>
    </div>
  );
}
