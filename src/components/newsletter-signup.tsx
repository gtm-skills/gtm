'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Check, Loader2 } from 'lucide-react';
import { track } from '@vercel/analytics';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact';
}

export function NewsletterSignup({ variant = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer_newsletter' }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        track('newsletter_signup', { source: 'footer' });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Something went wrong');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-500 text-sm">
        <Check className="h-4 w-4" />
        <span>You're subscribed!</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          disabled={status === 'loading'}
        />
        <Button
          type="submit"
          size="sm"
          disabled={status === 'loading'}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
        </Button>
      </form>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Weekly GTM AI tips. No spam.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          disabled={status === 'loading'}
        />
        <Button
          type="submit"
          size="sm"
          disabled={status === 'loading'}
          className="w-full gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Mail className="h-4 w-4" />
              Subscribe
            </>
          )}
        </Button>
        {status === 'error' && (
          <p className="text-xs text-red-500">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
