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
    total_revenue_influenced: stats.total_revenue_influenced,
    total_earnings: stats.total_earnings,
    pending_payout: stats.pending_payout,
    this_month_earnings: stats.this_month_earnings,
    top_prompt: stats.top_prompt,
  });
}
