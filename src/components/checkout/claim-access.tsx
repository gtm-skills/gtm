'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

/**
 * Sends the buyer a sign-in link the moment they land, so the only thing left
 * to do after paying is click one email. Sent once per checkout session.
 */
export function ClaimAccess({ email, next, sessionId }: { email: string; next: string; sessionId: string }) {
  const [state, setState] = useState<'sending' | 'sent' | 'error'>('sending');
  const [err, setErr] = useState<string | null>(null);
  const started = useRef(false);

  const send = async () => {
    setState('sending'); setErr(null);
    const { error } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) { setErr(error.message); setState('error'); return; }
    try { sessionStorage.setItem(`claim-sent:${sessionId}`, '1'); } catch {}
    setState('sent');
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let already = false;
    try { already = sessionStorage.getItem(`claim-sent:${sessionId}`) === '1'; } catch {}
    if (already) setState('sent'); else void send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-xl border border-brand-primary/50 bg-brand-primary/5 p-6">
      <div className="flex items-start gap-4">
        <Mail className="h-6 w-6 text-brand-primary shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="font-medium text-lg">
            {state === 'sending' && 'Sending your sign-in link…'}
            {state === 'sent' && 'Check your email to unlock your skills.'}
            {state === 'error' && 'We could not send your sign-in link.'}
          </p>
          <p className="text-sm text-muted-foreground mt-1 break-words">
            {state === 'error'
              ? err
              : <>One link, sent to <strong className="text-foreground">{email}</strong>. No password. Click it and your purchase is attached.</>}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
            <Button onClick={send} disabled={state === 'sending'} variant="outline" size="sm">
              {state === 'sending' ? 'Sending…' : 'Send it again'}
            </Button>
            <Link href={`/login?next=${encodeURIComponent(next)}&email=${encodeURIComponent(email)}`} className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2">
              Sign in another way
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
