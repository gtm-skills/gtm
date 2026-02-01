/**
 * Attribution Cookie System
 *
 * Tracks contributor referrals with a 30-day cookie window.
 * Used to attribute signups, upgrades, and outcomes to contributors.
 */

// Cookie names
export const ATTRIBUTION_COOKIE = 'gtm_ref';
export const FINGERPRINT_COOKIE = 'gtm_fp';

// Cookie duration: 30 days
export const COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

export interface AttributionData {
  contributorId: string;
  promptId?: string;
  landingPage: string;
  referrerUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  timestamp: number;
}

/**
 * Parse attribution data from cookie value
 */
export function parseAttributionCookie(cookieValue: string): AttributionData | null {
  try {
    const decoded = Buffer.from(cookieValue, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Serialize attribution data for cookie
 */
export function serializeAttributionCookie(data: AttributionData): string {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

/**
 * Generate a browser fingerprint
 * This is a simple fingerprint based on available headers
 */
export function generateFingerprint(request: Request): string {
  const ua = request.headers.get('user-agent') || '';
  const lang = request.headers.get('accept-language') || '';
  const encoding = request.headers.get('accept-encoding') || '';

  // Simple hash function
  const str = `${ua}|${lang}|${encoding}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(36);
}

/**
 * Extract UTM parameters from URL
 */
export function extractUtmParams(url: URL): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
} {
  return {
    utmSource: url.searchParams.get('utm_source') || undefined,
    utmMedium: url.searchParams.get('utm_medium') || undefined,
    utmCampaign: url.searchParams.get('utm_campaign') || undefined,
  };
}

/**
 * Extract contributor reference from URL
 * Supports: ?ref=contributor-slug or ?contributor=contributor-slug
 */
export function extractContributorRef(url: URL): string | null {
  return url.searchParams.get('ref') || url.searchParams.get('contributor') || null;
}

/**
 * Build attribution link for a contributor
 */
export function buildAttributionLink(
  baseUrl: string,
  contributorSlug: string,
  promptId?: string
): string {
  const url = new URL(baseUrl);
  url.searchParams.set('ref', contributorSlug);
  if (promptId) {
    url.searchParams.set('prompt', promptId);
  }
  return url.toString();
}

/**
 * Client-side attribution tracking script
 * Include this in pages to track attribution
 */
export const ATTRIBUTION_SCRIPT = `
(function() {
  // Get or create fingerprint
  function getFingerprint() {
    let fp = localStorage.getItem('gtm_fp');
    if (!fp) {
      fp = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('gtm_fp', fp);
    }
    return fp;
  }

  // Check for attribution params
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref') || params.get('contributor');

  if (ref) {
    // Store attribution
    const attribution = {
      ref: ref,
      prompt: params.get('prompt'),
      page: window.location.pathname,
      referrer: document.referrer,
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      ts: Date.now()
    };

    localStorage.setItem('gtm_attribution', JSON.stringify(attribution));

    // Track visit
    fetch('/api/v1/attribution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contributor_id: ref,
        prompt_id: attribution.prompt,
        visitor_fingerprint: getFingerprint(),
        event_type: 'visit',
        referrer_url: attribution.referrer,
        landing_page: attribution.page,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign
      })
    }).catch(console.error);
  }
})();
`;
