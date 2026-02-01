import { NextRequest, NextResponse } from 'next/server';
import { recommendPrompts, type RecommendContext } from '@/lib/api-utils';

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
 * GET /api/v1/prompts/recommend
 *
 * Get contextual prompt recommendations
 *
 * Query parameters:
 * - deal_stage: Current deal stage (prospecting, discovery, demo, proposal, negotiation, closing)
 * - persona: Buyer persona (e.g., 'VP Sales', 'CTO', 'SDR')
 * - industry: Industry (e.g., 'saas', 'fintech', 'healthcare')
 * - company_size: Company size (e.g., 'startup', 'mid-market', 'enterprise')
 * - context: Free-form context about the situation
 * - limit: Number of recommendations (default 5, max 20)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const context: RecommendContext = {
      dealStage: searchParams.get('deal_stage') || undefined,
      persona: searchParams.get('persona') || undefined,
      industry: searchParams.get('industry') || undefined,
      companySize: searchParams.get('company_size') || undefined,
      context: searchParams.get('context') || undefined,
    };

    const limit = Math.min(parseInt(searchParams.get('limit') || '5', 10), 20);

    // Check if any context was provided
    const hasContext = Object.values(context).some((v) => v !== undefined);
    if (!hasContext) {
      return NextResponse.json(
        {
          error: 'At least one context parameter is required',
          available_params: ['deal_stage', 'persona', 'industry', 'company_size', 'context'],
          example: '/api/v1/prompts/recommend?deal_stage=discovery&industry=saas',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const recommendations = recommendPrompts(context, limit);

    const response = {
      data: recommendations.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        prompt: r.prompt,
        category: r.category,
        subcategory: r.subcategory,
        tags: r.tags,
        difficulty: r.difficulty,
        relevance_score: r.relevanceScore,
        relevance_reason: r.relevanceReason,
      })),
      context: {
        deal_stage: context.dealStage,
        persona: context.persona,
        industry: context.industry,
        company_size: context.companySize,
        context: context.context,
      },
      meta: {
        api_version: 'v1',
        total_recommendations: recommendations.length,
        documentation: 'https://gtm-skills.com/api/docs',
      },
    };

    return NextResponse.json(response, {
      headers: {
        ...corsHeaders,
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
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
