import Link from 'next/link';
import { skills } from '@/data/skills';
import { SkillIcon } from '@/components/skills/skill-icon';

/** Two rows of tiles scrolling opposite ways. Each tile links to its skill. */
export function SkillMarquee() {
  const half = Math.ceil(skills.length / 2);
  const rows = [skills.slice(0, half), skills.slice(half)];
  return (
    <div className="space-y-4" aria-label="Browse skills">
      {rows.map((row, i) => {
        const items = [...row, ...row]; // duplicate for a seamless loop
        return (
          <div key={i} className="marquee">
            <div className="marquee-track" data-dir={i === 0 ? 'left' : 'right'}>
              {items.map((s, j) => (
                <Link
                  key={`${s.slug}-${j}`}
                  href={`/skills/${s.slug}`}
                  aria-hidden={j >= row.length}
                  tabIndex={j >= row.length ? -1 : 0}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card/70 pl-2 pr-4 py-2 hover:border-foreground/40 transition-colors"
                >
                  <SkillIcon name={s.icon.lucide} hue={s.icon.hue} />
                  <div className="leading-tight">
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.tier === 'free' ? 'Free' : 'Premium'}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
