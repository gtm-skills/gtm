import Link from 'next/link';
import { getFeaturedSkills } from '@/data/skills';
import { SkillGrid } from '@/components/skills/skill-grid';

export function FeaturedPremium({ installs }: { installs: Record<string, number> }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">The finished playbooks.</h2>
          <p className="text-muted-foreground mt-2 max-w-xl">Each premium skill ships with references, worked examples, per-agent wiring and an eval checklist. Built by operators, not prompt collectors.</p>
        </div>
        <Link href="/skills?tier=premium" className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap">All premium</Link>
      </div>
      <SkillGrid skills={getFeaturedSkills()} installs={installs} />
    </section>
  );
}
