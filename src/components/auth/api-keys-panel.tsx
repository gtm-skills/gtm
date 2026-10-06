'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Trash2 } from 'lucide-react';

interface KeyRow { id: string; prefix: string; label: string | null; last_used_at: string | null; created_at: string }

export function ApiKeysPanel() {
  const [keys, setKeys] = useState<KeyRow[]>([]);
  const [fresh, setFresh] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = () => fetch('/api/account/keys').then((r) => r.json()).then((j) => setKeys(j.keys ?? []));
  useEffect(() => { load(); }, []);

  const create = async () => {
    setBusy(true);
    const r = await fetch('/api/account/keys', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ label: 'agent' }) });
    const j = await r.json();
    setFresh(j.key); setBusy(false); load();
  };
  const revoke = async (id: string) => {
    await fetch('/api/account/keys', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">API keys</h2>
        <Button size="sm" onClick={create} disabled={busy}>New key</Button>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Used in install prompts and the CLI. Shown once.</p>
      {fresh && (
        <div className="mb-4 rounded-lg border border-primary/40 bg-primary/5 p-3">
          <p className="text-xs text-muted-foreground mb-1">Copy this now — it will not be shown again.</p>
          <div className="flex items-center gap-2">
            <code className="text-xs break-all flex-1">{fresh}</code>
            <Button size="sm" variant="outline" onClick={async () => { await navigator.clipboard.writeText(fresh); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}
      <ul className="divide-y divide-border text-sm">
        {keys.map((k) => (
          <li key={k.id} className="py-2 flex items-center justify-between gap-3">
            <div><code className="text-xs">{k.prefix}…</code> <span className="text-xs text-muted-foreground ml-2">{k.label}</span></div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{k.last_used_at ? `used ${new Date(k.last_used_at).toLocaleDateString()}` : 'never used'}</span>
              <button onClick={() => revoke(k.id)} aria-label="Revoke" className="hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </li>
        ))}
        {!keys.length && <li className="py-2 text-xs text-muted-foreground">No keys yet.</li>}
      </ul>
    </div>
  );
}
