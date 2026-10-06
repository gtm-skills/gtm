'use client';

import { useState } from 'react';
import { Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { trackEvent } from '@/lib/analytics';

export function LoginForm({ next, presetEmail }: { next: string; presetEmail?: string }) {
  const [email, setEmail] = useState(presetEmail ?? '');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const magic = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { error } = await createClient().auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    setBusy(false);
    if (error) setErr(error.message); else { setSent(true); trackEvent('signup', { provider: 'email' }); }
  };

  const github = async () => {
    setBusy(true); setErr(null);
    trackEvent('signup', { provider: 'github' });
    const { error } = await createClient().auth.signInWithOAuth({ provider: 'github', options: { redirectTo } });
    if (error) { setErr(error.message); setBusy(false); }
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <Mail className="h-6 w-6 mx-auto text-primary mb-3" />
        <p className="font-medium">Check your email</p>
        <p className="text-sm text-muted-foreground mt-1">We sent a sign-in link to <strong>{email}</strong>. No password needed.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <Button onClick={github} disabled={busy} variant="outline" className="w-full h-11 gap-2">
        <Github className="h-4 w-4" /> Continue with GitHub
      </Button>
      <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
      <form onSubmit={magic} className="space-y-3">
        <Input type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" />
        <Button type="submit" disabled={busy || !email} className="w-full h-11 label-mono text-xs">
          {busy ? 'Sending…' : 'Email me a sign-in link'}
        </Button>
      </form>
      {err && <p className="text-xs text-destructive">{err}</p>}
      <p className="text-xs text-muted-foreground text-center">
        Bought as a guest? Use the same email and your purchase attaches automatically.
      </p>
    </div>
  );
}
