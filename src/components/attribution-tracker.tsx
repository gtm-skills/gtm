'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

/**
 * Attribution Tracker Component
 *
 * Include this in the root layout to track contributor referrals.
 * Handles attribution cookie setting and visit tracking.
 */
export function AttributionTracker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Check for attribution params
    const ref = searchParams.get('ref') || searchParams.get('contributor');

    if (ref) {
      // Get or create fingerprint
      let fingerprint = localStorage.getItem('gtm_fp');
      if (!fingerprint) {
        fingerprint = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('gtm_fp', fingerprint);
      }

      // Store attribution data
      const attribution = {
        ref,
        prompt: searchParams.get('prompt'),
        page: pathname,
        referrer: document.referrer,
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
        ts: Date.now(),
      };

      localStorage.setItem('gtm_attribution', JSON.stringify(attribution));

      // Track visit
      fetch('/api/v1/attribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contributor_id: ref,
          prompt_id: attribution.prompt,
          visitor_fingerprint: fingerprint,
          event_type: 'visit',
          referrer_url: attribution.referrer || undefined,
          landing_page: attribution.page,
          utm_source: attribution.utm_source || undefined,
          utm_medium: attribution.utm_medium || undefined,
          utm_campaign: attribution.utm_campaign || undefined,
        }),
      }).catch(console.error);
    }
  }, [searchParams, pathname]);

  return null;
}

/**
 * Track a prompt view event
 */
export async function trackPromptView(promptId: string) {
  const attribution = getStoredAttribution();
  const fingerprint = getFingerprint();

  if (attribution?.ref) {
    await fetch('/api/v1/attribution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contributor_id: attribution.ref,
        prompt_id: promptId,
        visitor_fingerprint: fingerprint,
        event_type: 'prompt_view',
      }),
    }).catch(console.error);
  }
}

/**
 * Track a prompt copy event
 */
export async function trackPromptCopy(promptId: string) {
  const attribution = getStoredAttribution();
  const fingerprint = getFingerprint();

  if (attribution?.ref) {
    await fetch('/api/v1/attribution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contributor_id: attribution.ref,
        prompt_id: promptId,
        visitor_fingerprint: fingerprint,
        event_type: 'prompt_copy',
      }),
    }).catch(console.error);
  }
}

/**
 * Track an outcome logged event
 */
export async function trackOutcomeLogged(promptId: string, outcomeValue: number) {
  const attribution = getStoredAttribution();
  const fingerprint = getFingerprint();

  if (attribution?.ref) {
    await fetch('/api/v1/attribution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contributor_id: attribution.ref,
        prompt_id: promptId,
        visitor_fingerprint: fingerprint,
        event_type: 'outcome_logged',
        event_value: outcomeValue,
      }),
    }).catch(console.error);
  }
}

// Helper functions
function getFingerprint(): string {
  let fingerprint = localStorage.getItem('gtm_fp');
  if (!fingerprint) {
    fingerprint = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('gtm_fp', fingerprint);
  }
  return fingerprint;
}

interface StoredAttribution {
  ref: string;
  prompt?: string;
  page: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ts: number;
}

function getStoredAttribution(): StoredAttribution | null {
  try {
    const data = localStorage.getItem('gtm_attribution');
    if (!data) return null;

    const attribution = JSON.parse(data) as StoredAttribution;

    // Check if attribution is still valid (30 days)
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - attribution.ts > thirtyDays) {
      localStorage.removeItem('gtm_attribution');
      return null;
    }

    return attribution;
  } catch {
    return null;
  }
}
