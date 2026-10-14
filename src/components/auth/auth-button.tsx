'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

/** Sign In link, or avatar → /account when a session exists. Renders nothing until known. */
export function AuthButton({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [state, setState] = useState<'loading' | 'out' | 'in'>('loading');
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase')) { setState('out'); return; }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setState(data.user ? 'in' : 'out');
      setAvatar((data.user?.user_metadata?.avatar_url as string | undefined) ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setState(session?.user ? 'in' : 'out');
      setAvatar((session?.user?.user_metadata?.avatar_url as string | undefined) ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (state === 'loading') return <span className={mobile ? 'block h-12' : 'inline-block w-16 h-8'} aria-hidden="true" />;

  if (state === 'in') {
    return (
      <Link href="/account" onClick={onNavigate} aria-label="Account" className={mobile ? 'block' : ''}>
        {mobile ? (
          <Button variant="outline" className="w-full h-12 gap-2 text-base"><UserIcon className="h-5 w-5" />Account</Button>
        ) : avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" className="h-8 w-8 rounded-full border border-border" />
        ) : (
          <Button variant="ghost" size="sm" className="label-mono text-xs gap-2"><UserIcon className="h-4 w-4" />Account</Button>
        )}
      </Link>
    );
  }

  return (
    <Link href="/login" onClick={onNavigate} className={mobile ? 'block' : ''}>
      <Button variant={mobile ? 'outline' : 'ghost'} size={mobile ? 'default' : 'sm'} className={mobile ? 'w-full h-12 text-base' : 'label-mono text-xs'}>
        Sign in
      </Button>
    </Link>
  );
}
