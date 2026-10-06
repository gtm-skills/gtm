'use client';

import { track } from '@vercel/analytics';

type Events = {
  view_skill: { slug: string; tier: 'free' | 'premium' };
  paywall_hit: { slug: string; kit: string };
  view_pricing: { source?: string };
  select_kit: { productId: string };
  begin_checkout: { productId: string; priceCents: number };
  purchase: { productId: string };
  install_copied: { slug: string; method: string; agent: string };
  signup: { provider: string };
  banner_click: { productId: string };
};

export function trackEvent<K extends keyof Events>(name: K, props: Events[K]) {
  try {
    track(name, props as Record<string, string | number>);
  } catch {
    /* analytics must never break the page */
  }
}
