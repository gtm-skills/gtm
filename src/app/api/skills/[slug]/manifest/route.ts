import { NextResponse } from 'next/server';
import { getSkill } from '@/data/skills';

/** Public metadata for CLI/agents: what files exist, which tier, which agents. No content. */
export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const s = getSkill(slug);
  if (!s) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json(
    { slug: s.slug, name: s.name, version: s.version, tier: s.tier, kits: s.kits, agents: s.agents, files: s.files, lastTested: s.lastTested },
    { headers: { 'Cache-Control': 'public, s-maxage=3600' } },
  );
}
