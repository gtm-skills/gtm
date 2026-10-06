'use client';

import { Button } from '@/components/ui/button';

export function PortalButton() {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={async () => {
        const r = await fetch('/api/account/portal', { method: 'POST' });
        const j = await r.json();
        if (j.url) window.location.href = j.url;
      }}
    >
      Manage subscription
    </Button>
  );
}
