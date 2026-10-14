import { NextResponse } from 'next/server';
import { getSkill, AGENTS, type Agent } from '@/data/skills';
import { getUser } from '@/lib/supabase/server';
import { userIdFromApiKey } from '@/lib/api-keys';
import { hasSkillAccess, upsellFor } from '@/lib/entitlements';
import { getSkillFiles } from '@/lib/skill-content';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

/**
 * GET /api/skills/[slug]/install?agent=claude-code
 * Auth: cookie session OR `Authorization: Bearer gsk_live_...`
 * Free skills: 200 for anyone. Premium: 200 if entitled, else 402.
 */
export async function GET(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const skill = getSkill(slug);
  if (!skill) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const url = new URL(req.url);
  const agent = (url.searchParams.get('agent') as Agent | null) ?? 'claude-code';
  const method = url.searchParams.get('method') ?? 'prompt';

  // Resolve identity
  let userId: string | null = null;
  let email: string | undefined;
  const bearer = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (bearer) {
    userId = await userIdFromApiKey(bearer);
    if (!userId) return NextResponse.json({ error: 'invalid_api_key' }, { status: 401 });
  } else {
    const user = await getUser();
    userId = user?.id ?? null;
    email = user?.email ?? undefined;
  }

  if (!(await hasSkillAccess(userId, slug))) {
    const { kit, pro } = upsellFor(slug);
    return NextResponse.json(
      {
        error: 'payment_required',
        skill: slug,
        kit,
        pro,
        plansUrl: 'https://gtm-skills.com/pricing',
        message: userId
          ? `${skill.name} is in the ${kit}. See plans at gtm-skills.com/pricing.`
          : `Sign in at gtm-skills.com/login to use your purchase, or see plans at gtm-skills.com/pricing.`,
      },
      { status: 402 },
    );
  }

  let files;
  try {
    files = await getSkillFiles(slug, { watermarkEmail: email });
  } catch (e) {
    return NextResponse.json({ error: 'content_unavailable', detail: (e as Error).message }, { status: 503 });
  }

  const db = createAdminClient();
  if (db) void db.from('skill_installs').insert({ skill_slug: slug, user_id: userId, method, agent });

  return NextResponse.json({
    slug,
    name: skill.name,
    version: skill.version,
    tier: skill.tier,
    installTo: AGENTS[agent]?.installDir.replace('<slug>', slug) ?? `.claude/skills/${slug}/`,
    files,
  });
}
