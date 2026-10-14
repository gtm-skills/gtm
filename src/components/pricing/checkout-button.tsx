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
  const [waitlist, setWaitlist] = useState(false);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

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
      if (json.error === 'payments_unavailable' || json.error === 'product not priced') {
        setWaitlist(true);
        setLoading(false);
        trackEvent('waitlist_shown', { productId });
        return;
      }
      if (!res.ok || !json.url) throw new Error(json.error ?? 'checkout failed');
      window.location.href = json.url;
    } catch (e) {
      setErr(res503((e as Error).message));
      setLoading(false);
    }
  };

  const join = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: `waitlist:${productId}` }),
    }).catch(() => null);
    setLoading(false);
    if (res?.ok) { setJoined(true); trackEvent('waitlist_joined', { productId }); }
    else setErr('Could not save that. Email hello@gtm-skills.com instead.');
  };

  if (waitlist) {
    return (
      <div className="flex flex-col gap-2 text-left">
        {joined ? (
          <p className="text-sm"><strong>You are on the list.</strong> We email you the moment checkout opens, at today&rsquo;s price.</p>
        ) : (
          <form onSubmit={join} className="flex flex-col gap-2">
            <p className="text-sm">Checkout opens in days. Leave your email and keep today&rsquo;s price.</p>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
              className="h-10 rounded-md border border-border bg-background px-3 text-sm"
            />
            <Button type="submit" disabled={loading || !email} variant={variant} size="default">{loading ? 'Saving…' : 'Hold my spot'}</Button>
          </form>
        )}
        {err && <p className="text-xs text-destructive">{err}</p>}
      </div>
    );
  }

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
