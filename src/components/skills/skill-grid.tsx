import type { Skill } from '@/data/skills';
import { SkillCard } from './skill-card';

export function SkillGrid({ skills, installs = {} }: { skills: Skill[]; installs?: Record<string, number> }) {
  if (!skills.length) return <p className="text-sm text-muted-foreground py-12 text-center">No skills match.</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((s) => (
        <SkillCard key={s.slug} skill={s} installs={installs[s.slug]} />
      ))}
    </div>
  );
}
