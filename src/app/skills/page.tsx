import type { Metadata } from 'next';
import { Suspense } from 'react';
import { skills, STATS, type SkillCategory, type Role, type Agent, type Tier } from '@/data/skills';
import { SkillGrid } from '@/components/skills/skill-grid';
import { SkillFilters } from '@/components/skills/skill-filters';
import { getInstallCounts } from '@/lib/installs';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'GTM Skills for Claude Code, Cursor & Codex — Installable Sales Workflows',
  description: `${STATS.skills} installable sales skills: prospecting, outreach, discovery, closing, RevOps. ${STATS.freeSkills} free. Works with Claude Code, Cursor, Codex, Gemini CLI, OpenClaw and ChatGPT.`,
  alternates: { canonical: 'https://gtm-skills.com/skills' },
};

export default async function SkillsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const installs = await getInstallCounts();

  let list = skills;
  if (sp.tier) list = list.filter((s) => s.tier === (sp.tier as Tier));
  if (sp.category) list = list.filter((s) => s.category === (sp.category as SkillCategory));
  if (sp.role) list = list.filter((s) => s.role.includes(sp.role as Role) || s.role.includes('all'));
  if (sp.agent) list = list.filter((s) => s.agents.includes(sp.agent as Agent));

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Agent skills that sell.</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          {STATS.skills} installable skills for the whole GTM motion. {STATS.freeSkills} are free, run end to end, and are yours to keep.
          The rest ship in kits, or all together in Pro.
        </p>
      </div>
      <div className="mb-8">
        <Suspense fallback={null}>
          <SkillFilters />
        </Suspense>
      </div>
      <SkillGrid skills={list} installs={installs} />
    </div>
  );
}
