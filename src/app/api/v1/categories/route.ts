import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/api-utils';

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
 * GET /api/v1/categories
 *
 * List all available categories (industries, roles, workflows, methodologies)
 */
export async function GET() {
  try {
    const categories = getAllCategories();

    const response = {
      data: categories,
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
