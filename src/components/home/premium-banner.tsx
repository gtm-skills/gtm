'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function PremiumBanner({ seatsLeft, launchPrice, regularPrice }: { seatsLeft: number; launchPrice: string; regularPrice: string }) {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    try { setHidden(sessionStorage.getItem('banner-dismissed') === '1'); } catch { setHidden(false); }
  }, []);
  if (hidden) return null;
  const active = seatsLeft > 0;
  return (
    <div className="relative bg-brand-primary text-[#0F1521] text-sm">
      <div className="max-w-7xl mx-auto pl-6 pr-12 py-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="font-medium">
          {active ? `Full Bundle is ${launchPrice} for the first 50 buyers — ${seatsLeft} left, then ${regularPrice}.` : `Full Bundle: every premium skill, ${regularPrice} once.`}
        </span>
        <Link href="/pricing" onClick={() => trackEvent('banner_click', { productId: 'full-bundle' })} className="underline underline-offset-2 font-medium hover:no-underline">
          See plans
        </Link>
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => { setHidden(true); try { sessionStorage.setItem('banner-dismissed', '1'); } catch {} }}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
