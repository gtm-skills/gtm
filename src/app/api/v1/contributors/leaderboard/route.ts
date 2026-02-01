/**
 * Contributor Leaderboard API
 * GET /api/v1/contributors/leaderboard - Get top contributors
 */

import { NextResponse } from 'next/server';
import { getContributorLeaderboard } from '@/lib/contributors';

export const runtime = 'edge';

export async function GET() {
  const leaderboard = await getContributorLeaderboard();

  return NextResponse.json({
    top_by_votes: leaderboard.topByVotes.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      avatar_url: c.avatar_url,
      total_votes: c.total_votes,
      total_prompts: c.total_prompts,
      verified: c.verified,
    })),
    top_by_copies: leaderboard.topByCopies.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      avatar_url: c.avatar_url,
      total_copies: c.total_copies,
      total_prompts: c.total_prompts,
      verified: c.verified,
    })),
    top_by_prompts: leaderboard.topByPrompts.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      avatar_url: c.avatar_url,
      total_prompts: c.total_prompts,
      verified: c.verified,
    })),
  });
}
