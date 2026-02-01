import { NextResponse } from 'next/server';
import { generatePromptsJson } from '@/lib/api-utils';

export const runtime = 'edge';

/**
 * GET /prompts.json
 *
 * Machine-readable JSON index of all prompts for LLM discoverability
 */
export async function GET() {
  try {
    const promptsJson = generatePromptsJson();

    return NextResponse.json(promptsJson, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error generating prompts.json:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompts index' },
      { status: 500 }
    );
  }
}
