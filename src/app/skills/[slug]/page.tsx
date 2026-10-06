import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, X } from 'lucide-react';
import { getSkill, getAllSkillSlugs, getRelated, getKit, CATEGORIES, AGENTS, formatPrice, kits } from '@/data/skills';
import { getUser } from '@/lib/supabase/server';
import { hasSkillAccess } from '@/lib/entitlements';
import { getSkillFiles, getSkillPreview } from '@/lib/skill-content';
import { SkillIcon } from '@/components/skills/skill-icon';
import { SkillCard } from '@/components/skills/skill-card';
import { InstallBlock } from '@/components/skills/install-block';
import { PaywallGate } from '@/components/skills/paywall-gate';
import { getInstallCounts } from '@/lib/installs';

// Entitlement check reads cookies → render per request. Catalog metadata is still static.
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return getAllSkillSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSkill(slug);
  if (!s) return {};
  return {
    title: s.seo.title,
    description: s.seo.description,
    keywords: s.seo.keywords.join(', '),
    alternates: { canonical: `https://gtm-skills.com/skills/${slug}` },
    openGraph: { title: s.seo.title, description: s.seo.description, url: `https://gtm-skills.com/skills/${slug}`, type: 'website' },
  };
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const user = await getUser();
  const access = await hasSkillAccess(user?.id ?? null, slug);
  const kit = getKit(skill.kits[0]);
  const pro = kits.find((k) => k.id === 'pro')!;
  const installs = (await getInstallCounts())[slug];
  const cat = CATEGORIES[skill.category];

  let skillMd: string | null = null;
  let preview: string | null = null;
  if (access) {
    try { skillMd = (await getSkillFiles(slug))[0]?.content ?? null; } catch { skillMd = null; }
  } else {
    preview = await getSkillPreview(slug);
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: skill.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Claude Code, Cursor, Codex, Gemini CLI, OpenClaw, ChatGPT',
    description: skill.description,
    softwareVersion: skill.version,
    url: `https://gtm-skills.com/skills/${slug}`,
    brand: { '@type': 'Brand', name: 'GTM Skills' },
    offers: skill.tier === 'free'
      ? { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' }
      : [
          ...(kit ? [{ '@type': 'Offer', name: kit.name, price: (kit.priceCents / 100).toFixed(2), priceCurrency: 'USD', url: 'https://gtm-skills.com/pricing', availability: 'https://schema.org/InStock' }] : []),
          { '@type': 'Offer', name: 'Pro', price: (pro.priceCents / 100).toFixed(2), priceCurrency: 'USD', url: 'https://gtm-skills.com/pricing', availability: 'https://schema.org/InStock' },
        ],
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <nav className="text-xs text-muted-foreground mb-6">
        <Link href="/skills" className="hover:text-foreground">Skills</Link> / <Link href={`/skills/category/${skill.category}`} className="hover:text-foreground">{cat.name}</Link>
      </nav>

      <header className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
        <SkillIcon name={skill.icon.lucide} hue={skill.icon.hue} size="lg" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`label-mono text-[10px] px-2 py-1 rounded ${skill.tier === 'free' ? 'bg-secondary text-muted-foreground' : 'bg-primary/15 text-primary'}`}>
              {skill.tier === 'free' ? 'Free' : `Premium · ${kit?.name ?? 'Bundle'}`}
            </span>
            <span className="text-xs text-muted-foreground">v{skill.version}</span>
            {installs ? <span className="text-xs text-muted-foreground tabular-nums">· {installs.toLocaleString()} installs</span> : null}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{skill.name}</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl">{skill.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skill.agents.map((a) => (
              <span key={a} className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">{AGENTS[a].name}</span>
            ))}
          </div>
        </div>
        {skill.tier === 'premium' && !access && kit && (
          <div className="shrink-0 rounded-xl border border-border bg-card p-4 text-sm min-w-[220px]">
            <div className="flex items-baseline justify-between"><span className="text-muted-foreground">{kit.name}</span><span className="font-semibold tabular-nums">{formatPrice(kit.priceCents)}</span></div>
            <div className="flex items-baseline justify-between mt-1"><span className="text-muted-foreground">Pro</span><span className="font-semibold tabular-nums">{formatPrice(pro.priceCents)}/mo</span></div>
            <Link href={`/pricing#${kit.id}`} className="mt-3 block text-center rounded-md bg-primary text-primary-foreground label-mono text-xs py-2.5">See plans</Link>
          </div>
        )}
      </header>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10">
        <div className="min-w-0">
          <section className="mb-10">
            <p className="text-base leading-relaxed">{skill.description}</p>
          </section>

          <section className="grid sm:grid-cols-2 gap-6 mb-10">
            <div>
              <h2 className="label-mono text-xs text-muted-foreground mb-3">Good fit</h2>
              <ul className="space-y-2 text-sm">{skill.goodFit.map((g) => <li key={g} className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{g}</li>)}</ul>
            </div>
            <div>
              <h2 className="label-mono text-xs text-muted-foreground mb-3">Not for</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">{skill.notFor.map((g) => <li key={g} className="flex gap-2"><X className="h-4 w-4 shrink-0 mt-0.5" />{g}</li>)}</ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="label-mono text-xs text-muted-foreground mb-3">SKILL.md</h2>
            {access ? (
              skillMd ? (
                <article className="rounded-xl border border-border bg-card p-6 prose prose-sm prose-neutral dark:prose-invert max-w-none [&_pre]:bg-background [&_pre]:border [&_pre]:border-border [&_code]:text-xs">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{skillMd}</ReactMarkdown>
                </article>
              ) : (
                <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                  Content is loading from the repo. If this persists, the install prompt below still works.
                </div>
              )
            ) : (
              <PaywallGate skill={skill} preview={preview} signedIn={Boolean(user)} />
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="label-mono text-xs text-muted-foreground mb-3">What you get</h2>
            <ul className="space-y-2 text-sm">{skill.whatYouGet.map((w) => <li key={w} className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{w}</li>)}</ul>
            <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Files</span><span className="tabular-nums">{skill.files.length}</span></div>
              <div className="flex justify-between mt-1"><span>Last tested</span><span>{skill.lastTested}</span></div>
              <div className="flex justify-between mt-1"><span>License</span><span>{skill.tier === 'free' ? 'MIT' : 'Per buyer'}</span></div>
            </div>
          </div>
          {(access || skill.tier === 'free') && <InstallBlock skill={skill} />}
        </aside>
      </div>

      {getRelated(slug).length > 0 && (
        <section className="mt-16">
          <h2 className="label-mono text-xs text-muted-foreground mb-4">Related</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getRelated(slug).map((r) => <SkillCard key={r.slug} skill={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
