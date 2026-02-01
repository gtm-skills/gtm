import { NextRequest, NextResponse } from 'next/server';
import { filterPrompts, type PromptFilters } from '@/lib/api-utils';

export const runtime = 'edge';

// CORS headers for API access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

/**
 * GET /api/v1/prompts
 *
 * List prompts with optional filtering
 *
 * Query parameters:
 * - category: Filter by category (e.g., 'saas', 'sdr')
 * - subcategory: Filter by subcategory (e.g., 'outreach', 'discovery')
 * - industry: Filter by industry
 * - tags: Comma-separated tags to filter by
 * - difficulty: Filter by difficulty (beginner, intermediate, advanced)
 * - search: Search in title, description, and content
 * - limit: Number of results (default 20, max 100)
 * - offset: Pagination offset (default 0)
 * - sort: Sort order (popular, recent, alphabetical)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: PromptFilters = {
      category: searchParams.get('category') || undefined,
      subcategory: searchParams.get('subcategory') || undefined,
      industry: searchParams.get('industry') || undefined,
      tags: searchParams.get('tags')?.split(',').filter(Boolean) || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
      search: searchParams.get('search') || undefined,
      limit: Math.min(parseInt(searchParams.get('limit') || '20', 10), 100),
      offset: parseInt(searchParams.get('offset') || '0', 10),
      sort: (searchParams.get('sort') as PromptFilters['sort']) || undefined,
    };

    const { prompts, total } = filterPrompts(filters);

    const response = {
      data: prompts.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        prompt: p.prompt,
        category: p.category,
        subcategory: p.subcategory,
        tags: p.tags,
        difficulty: p.difficulty,
      })),
      pagination: {
        total,
        limit: filters.limit,
        offset: filters.offset,
        hasMore: (filters.offset || 0) + prompts.length < total,
      },
      meta: {
        api_version: 'v1',
        documentation: 'https://gtm-skills.com/api/docs',
      },
    };

    return NextResponse.json(response, {
      headers: {
        ...corsHeaders,
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
