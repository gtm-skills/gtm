/**
 * Individual Contributor API
 * GET /api/v1/contributors/[slug] - Get contributor profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { getContributorBySlug, getContributorStats, getContributorEarnings } from '@/lib/contributors';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const includeStats = searchParams.get('stats') === 'true';
  const includeEarnings = searchParams.get('earnings') === 'true';

  const contributor = await getContributorBySlug(slug);

  if (!contributor) {
    return NextResponse.json(
      { error: 'Contributor not found' },
      { status: 404 }
    );
  }

  const response: Record<string, unknown> = {
    id: contributor.id,
    name: contributor.name,
    slug: contributor.slug,
    avatar_url: contributor.avatar_url,
    bio: contributor.bio,
    twitter_handle: contributor.twitter_handle,
    linkedin_url: contributor.linkedin_url,
    github_handle: contributor.github_handle,
    website_url: contributor.website_url,
    total_prompts: contributor.total_prompts,
    total_copies: contributor.total_copies,
    total_outcomes: contributor.total_outcomes,
    total_revenue_influenced: contributor.total_revenue_influenced,
    verified: contributor.verified,
    featured: contributor.featured,
    created_at: contributor.created_at,
  };

  // Include detailed stats if requested
  if (includeStats) {
    const stats = await getContributorStats(contributor.id);
    if (stats) {
      response.stats = {
        total_earnings: stats.total_earnings,
        pending_payout: stats.pending_payout,
        this_month_earnings: stats.this_month_earnings,
        top_prompt: stats.top_prompt,
      };
    }
  }

  // Include earnings history if requested (only for authenticated contributor)
  if (includeEarnings) {
    const { data: earnings, total } = await getContributorEarnings(contributor.id, {
      limit: 10,
    });
    response.recent_earnings = {
      data: earnings.map((e) => ({
        id: e.id,
        type: e.earning_type,
        gross_amount: e.gross_amount,
        net_amount: e.net_amount,
        status: e.status,
        description: e.description,
        created_at: e.created_at,
      })),
      total,
    };
  }

  return NextResponse.json(response);
}
