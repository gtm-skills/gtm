import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES, getSkillsByCategory, type SkillCategory } from '@/data/skills';
import { SkillGrid } from '@/components/skills/skill-grid';
import { getInstallCounts } from '@/lib/installs';

export const revalidate = 300;

export function generateStaticParams() {
  return (Object.keys(CATEGORIES) as SkillCategory[]).map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params;
  const c = CATEGORIES[cat as SkillCategory];
  if (!c) return {};
  return {
    title: `${c.name} Skills for Claude Code, Cursor & Codex | GTM Skills`,
    description: `${c.description} Installable ${c.name.toLowerCase()} skills for AI sales agents.`,
    alternates: { canonical: `https://gtm-skills.com/skills/category/${cat}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const c = CATEGORIES[cat as SkillCategory];
  if (!c) notFound();
  const list = getSkillsByCategory(cat as SkillCategory);
  const installs = await getInstallCounts();
  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <nav className="text-xs text-muted-foreground mb-6"><Link href="/skills" className="hover:text-foreground">Skills</Link> / {c.name}</nav>
      <h1 className="text-4xl font-bold tracking-tight">{c.name}</h1>
      <p className="text-muted-foreground mt-2 mb-10 max-w-2xl">{c.description}</p>
      <SkillGrid skills={list} installs={installs} />
      {list.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-6">
          Nothing here yet. <Link href="/pricing" className="text-primary underline">Pro members</Link> vote on what ships next.
        </p>
      )}
    </div>
  );
}
