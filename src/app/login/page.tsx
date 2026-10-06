import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/server';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = { title: 'Sign in | GTM Skills', robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; email?: string; error?: string }> }) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith('/') ? sp.next : '/account';
  if (await getUser()) redirect(next);
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <p className="label-mono text-xs text-primary mb-3">§ Account</p>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Sign in</h1>
      <p className="text-sm text-muted-foreground mb-8">One account for the site, your agents, and the ChatGPT plugin.</p>
      {sp.error && <p className="text-sm text-destructive mb-4">That link didn&rsquo;t work. Request a new one.</p>}
      <LoginForm next={next} presetEmail={sp.email} />
    </div>
  );
}
