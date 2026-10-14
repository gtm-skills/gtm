import Link from 'next/link';
import { getFreeSkills } from '@/data/skills';
import { SkillIcon } from '@/components/skills/skill-icon';

export function FreeSkillsRow() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Try one first.</h2>
            <p className="text-muted-foreground mt-2">Five skills are free, complete, and MIT licensed. Install one, run it end to end, keep what it makes.</p>
          </div>
          <Link href="/skills?tier=free" className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap">All free</Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {getFreeSkills().map((s) => (
            <li key={s.slug}>
              <Link href={`/skills/${s.slug}`} className="flex lg:flex-col gap-3 rounded-xl border border-border bg-card p-4 h-full hover:border-foreground/40 transition-colors">
                <SkillIcon name={s.icon.lucide} hue={s.icon.hue} size="sm" />
                <div>
                  <div className="font-medium text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.tagline}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
