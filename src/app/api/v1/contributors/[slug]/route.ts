/**
 * Individual Contributor API
 * GET /api/v1/contributors/[slug] - Get contributor profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { getContributorBySlug, getContributorStats } from '@/lib/contributors';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const includeStats = searchParams.get('stats') === 'true';

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
    total_votes: contributor.total_votes,
    rank: contributor.rank,
    badge: contributor.badge,
    verified: contributor.verified,
    featured: contributor.featured,
    created_at: contributor.created_at,
  };

  // Include detailed stats if requested
  if (includeStats) {
    const stats = await getContributorStats(contributor.id);
    if (stats) {
      response.stats = {
        total_votes: stats.total_votes,
        rank: stats.rank,
        top_prompt: stats.top_prompt,
      };
    }
  }

  return NextResponse.json(response);
}
