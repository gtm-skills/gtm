/**
 * Contributors API
 * GET /api/v1/contributors - List contributors
 * POST /api/v1/contributors - Register new contributor
 */

import { NextRequest, NextResponse } from 'next/server';
import { getContributors, registerContributor } from '@/lib/contributors';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');
  const featured = searchParams.get('featured');
  const sort = searchParams.get('sort') as 'votes' | 'prompts' | 'copies' | 'recent' | undefined;

  const { data, total } = await getContributors({
    limit,
    offset,
    featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
    sort: sort || 'votes',
  });

  return NextResponse.json({
    contributors: data.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      avatar_url: c.avatar_url,
      bio: c.bio,
      twitter_handle: c.twitter_handle,
      linkedin_url: c.linkedin_url,
      total_prompts: c.total_prompts,
      total_copies: c.total_copies,
      total_outcomes: c.total_outcomes,
      total_votes: c.total_votes,
      rank: c.rank,
      badge: c.badge,
      verified: c.verified,
      featured: c.featured,
    })),
    total,
    limit,
    offset,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const result = await registerContributor({
      email: body.email,
      name: body.name,
      bio: body.bio,
      twitter_handle: body.twitter_handle,
      linkedin_url: body.linkedin_url,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to register contributor' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      contributor: {
        id: result.contributor?.id,
        name: result.contributor?.name,
        slug: result.contributor?.slug,
        status: result.contributor?.status,
      },
      message: 'Registration submitted. You will be notified once approved.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
