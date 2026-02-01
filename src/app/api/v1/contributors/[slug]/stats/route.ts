/**
 * Contributor Stats API
 * GET /api/v1/contributors/[slug]/stats - Get contributor statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { getContributorBySlug, getContributorStats } from '@/lib/contributors';

export const runtime = 'edge';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const contributor = await getContributorBySlug(slug);

  if (!contributor) {
    return NextResponse.json(
      { error: 'Contributor not found' },
      { status: 404 }
    );
  }

  const stats = await getContributorStats(contributor.id);

  if (!stats) {
    return NextResponse.json(
      { error: 'Stats not available' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    contributor_id: contributor.id,
    contributor_name: contributor.name,
    total_prompts: stats.total_prompts,
    total_copies: stats.total_copies,
    total_outcomes: stats.total_outcomes,
    total_votes: stats.total_votes,
    rank: stats.rank,
    top_prompt: stats.top_prompt,
  });
}
