/**
 * Attribution Tracking API
 * POST /api/v1/attribution - Track attribution events
 */

import { NextRequest, NextResponse } from 'next/server';
import { trackAttribution } from '@/lib/contributors';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.contributor_id || !body.visitor_fingerprint || !body.event_type) {
      return NextResponse.json(
        { error: 'contributor_id, visitor_fingerprint, and event_type are required' },
        { status: 400 }
      );
    }

    // Validate event type
    const validEventTypes = ['visit', 'prompt_view', 'prompt_copy', 'outcome_logged', 'signup', 'upgrade'];
    if (!validEventTypes.includes(body.event_type)) {
      return NextResponse.json(
        { error: `Invalid event_type. Must be one of: ${validEventTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const result = await trackAttribution({
      contributor_id: body.contributor_id,
      prompt_id: body.prompt_id,
      visitor_fingerprint: body.visitor_fingerprint,
      event_type: body.event_type,
      event_value: body.event_value,
      referrer_url: body.referrer_url,
      landing_page: body.landing_page,
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to track attribution' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
