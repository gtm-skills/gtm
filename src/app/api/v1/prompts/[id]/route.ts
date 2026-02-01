import { NextRequest, NextResponse } from 'next/server';
import { getPromptById } from '@/lib/api-utils';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

/**
 * GET /api/v1/prompts/:id
 *
 * Get a single prompt by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prompt = getPromptById(id);

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found', id },
        { status: 404, headers: corsHeaders }
      );
    }

    const response = {
      data: {
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        prompt: prompt.prompt,
        category: prompt.category,
        subcategory: prompt.subcategory,
        tags: prompt.tags,
        difficulty: prompt.difficulty,
        url: `https://gtm-skills.com/prompts/${prompt.id}`,
      },
      meta: {
        api_version: 'v1',
        documentation: 'https://gtm-skills.com/api/docs',
      },
    };

    return NextResponse.json(response, {
      headers: {
        ...corsHeaders,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
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
