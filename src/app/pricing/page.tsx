import type { Metadata } from 'next';
import { PricingCards } from '@/components/pricing/pricing-cards';
import { getLaunchState } from '@/lib/entitlements';
import { kits, formatPrice, STATS } from '@/data/skills';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Pricing | GTM Skills',
  description: 'Premium GTM skill kits for Claude Code, Cursor, Codex and ChatGPT. One-time kits, a Full Bundle, or Pro monthly. 14-day money-back guarantee.',
  alternates: { canonical: 'https://gtm-skills.com/pricing' },
};

const faqs = [
  ['What exactly do I get?', 'Installable skill folders — SKILL.md plus references, worked examples, per-agent wiring and an eval checklist — delivered through your account. Paste one install prompt into your agent and it writes the files.'],
  ['Which agents are supported?', 'Claude Code, Cursor, Codex, Gemini CLI, OpenClaw and Windsurf for installs. In ChatGPT, the GTM Skills plugin unlocks premium tools when you sign in with the same account.'],
  ['Is this a subscription?', 'Kits and the Bundle are one-time purchases with 12 months of updates. Pro is monthly and includes everything while active. Cancel anytime from your account.'],
  ['What is free?', `The open-source core: ${STATS.prompts} prompts, ${STATS.freeSkills} full skills, the MCP server, 24 tonalities and the base agent personas. MIT licensed, forever.`],
  ['Refunds?', '14 days, no questions asked. Email hello@gtm-skills.com.'],
  ['Can my team use it?', 'One purchase covers one person. Team seats are available — email us.'],
];

export default async function PricingPage() {
  const launch = await getLaunchState('full-bundle');
  const pro = kits.find((k) => k.id === 'pro')!;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="text-center mb-12">
        <p className="label-mono text-xs text-primary mb-3">§ Plans</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Buy the kit. Or take everything.</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Finished playbooks for the agents you already use. Pay once per kit, or {formatPrice(pro.priceCents)}/month for all of it.
        </p>
      </div>

      <PricingCards launch={launch} />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Questions people ask</h2>
        <dl className="divide-y divide-border border-y border-border">
          {faqs.map(([q, a]) => (
            <div key={q} className="py-5">
              <dt className="font-medium">{q}</dt>
              <dd className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
