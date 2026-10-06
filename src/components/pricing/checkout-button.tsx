'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import type { ProductId } from '@/data/skills';

export function CheckoutButton({
  productId,
  priceCents,
  children,
  variant = 'default',
  className,
  size = 'lg',
}: {
  productId: ProductId;
  priceCents: number;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const go = async () => {
    setLoading(true);
    setErr(null);
    trackEvent('begin_checkout', { productId, priceCents });
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error ?? 'checkout failed');
      window.location.href = json.url;
    } catch (e) {
      setErr(res503((e as Error).message));
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={go} disabled={loading} variant={variant} size={size} className={className}>
        {loading ? 'Opening checkout…' : children}
      </Button>
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );
}

function res503(m: string) {
  return m === 'payments_unavailable' || m === 'product not priced'
    ? 'Checkout is not live yet. Email hello@gtm-skills.com and we will sort you out.'
    : 'Something went wrong. Try again or email hello@gtm-skills.com.';
}
