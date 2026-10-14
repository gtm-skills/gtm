import Link from 'next/link';
import { Lock } from 'lucide-react';
import type { Skill } from '@/data/skills';
import { CATEGORIES, AGENTS } from '@/data/skills';
import { SkillIcon } from './skill-icon';

export function SkillCard({ skill, installs }: { skill: Skill; installs?: number }) {
  const cat = CATEGORIES[skill.category];
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
    >
      <div className="flex items-start justify-between gap-3">
        <SkillIcon name={skill.icon.lucide} hue={skill.icon.hue} />
        <span
          className={`label-mono text-[10px] px-2 py-1 rounded ${
            skill.tier === 'free' ? 'bg-secondary text-muted-foreground' : 'bg-primary/15 text-primary'
          }`}
        >
          {skill.tier === 'free' ? 'Free' : (
            <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" />Premium</span>
          )}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">{skill.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-snug line-clamp-2">{skill.tagline}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{cat.name}</span>
        <span className="tabular-nums">
          {installs != null ? `${installs.toLocaleString()} installs` : `${skill.agents.length} agents`}
        </span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {skill.agents.slice(0, 4).map((a) => (
          <span key={a} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
            {AGENTS[a].name}
          </span>
        ))}
        {skill.agents.length > 4 && <span className="text-[10px] px-1.5 py-0.5 text-muted-foreground">+{skill.agents.length - 4}</span>}
      </div>
    </Link>
  );
}
