import { skills } from '@/data/skills';
import { SkillGrid } from '@/components/skills/skill-grid';

/** Top six by real install count. Hidden until there is signal. */
export function Trending({ installs }: { installs: Record<string, number> }) {
  const ranked = skills
    .filter((s) => (installs[s.slug] ?? 0) > 0)
    .sort((a, b) => (installs[b.slug] ?? 0) - (installs[a.slug] ?? 0))
    .slice(0, 6);
  if (ranked.length < 3) return null;
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">Most installed this month.</h2>
      <SkillGrid skills={ranked} installs={installs} />
    </section>
  );
}
