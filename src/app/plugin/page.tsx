import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { kits, formatPrice } from '@/data/skills';

export const metadata: Metadata = {
  title: 'GTM Skills for ChatGPT — Call Prep, Debrief, Follow-up',
  description: 'The GTM Skills plugin for ChatGPT: call prep briefs, MEDDIC scorecards from your notes, recap emails with mutual action plans, objection reframes. Free daily. Pro unlocks the playbooks.',
  alternates: { canonical: 'https://gtm-skills.com/plugin' },
};

const loop = [
  { step: 'Before the call', tool: 'call.prep', say: '“Prep me for my call with the VP Sales at Acme tomorrow. They just opened four SDR roles.”', get: 'A brief: why now, three hypotheses, five questions, likely objections, the one outcome that counts.' },
  { step: 'After the call', tool: 'call.debrief', say: '“Here are my notes from the Acme call. How qualified is this?”', get: 'A MEDDIC scorecard, 0–2 per element with evidence, a verdict, and the three questions for next time.' },
  { step: 'Same day', tool: 'followup.draft', say: '“Write the follow-up and next steps for Acme.”', get: 'A recap email in their words and a mutual action plan with owners and dates.' },
  { step: 'Any time', tool: 'objection.handle', say: '“They said they have no budget this quarter.”', get: 'The reframe, what proof to bring, and the one question that moves it.' },
];

export default function PluginPage() {
  const pro = kits.find((k) => k.id === 'pro')!;
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="label-mono text-xs text-primary mb-3">§ ChatGPT plugin</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">The sales call loop, inside ChatGPT.</h1>
      <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
        Prep, debrief, follow up. Methodology from the GTM Skills library, rendered as cards you can act on. Free every day. Sign in to unlock the Pro playbooks.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="https://chatgpt.com/plugins" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="label-mono text-xs h-12 px-7 gap-2">Add to ChatGPT <ArrowRight className="h-4 w-4" /></Button>
        </a>
        <Link href="/pricing"><Button size="lg" variant="outline" className="label-mono text-xs h-12 px-7">See plans</Button></Link>
      </div>
      <p className="text-xs text-muted-foreground mt-3">Search “GTM Skills” in the ChatGPT plugin directory. Listing goes live after review.</p>

      <section className="mt-20 grid gap-4">
        {loop.map((l) => (
          <div key={l.tool} className="grid md:grid-cols-[180px_1fr_1fr] gap-4 rounded-xl border border-border bg-card p-6">
            <div>
              <p className="label-mono text-[10px] text-muted-foreground">{l.step}</p>
              <code className="text-xs text-primary">{l.tool}</code>
            </div>
            <p className="text-sm italic text-muted-foreground">{l.say}</p>
            <p className="text-sm">{l.get}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-lg">Free</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {['3 briefs, 3 debriefs, 3 follow-ups a day', 'Objection reframes', 'MEDDIC lite scorecard', 'Five free skills for Claude Code, Cursor, Codex'].map((f) => (
              <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/40 bg-card p-6">
          <h2 className="font-semibold text-lg">With a GTM Skills plan</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {['Unlimited use', 'Scout Pro signal angles in every brief', 'MEDDPICC Qualifier red flags and question bank in every debrief', 'Closer Pro close plan in every follow-up', 'Install any skill you own from inside ChatGPT'].map((f) => (
              <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}</li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-4">Plans start at {formatPrice(pro.priceCents)}/month and are managed on this site. <Link href="/pricing" className="text-primary underline">Plan details</Link>.</p>
        </div>
      </section>

      <section id="support" className="mt-20 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Support</h2>
        <dl className="space-y-4 text-sm">
          <div><dt className="font-medium">How do I connect my account?</dt><dd className="text-muted-foreground mt-1">Open the GTM Skills plugin menu in ChatGPT and choose Sign in. Use the same email you bought with. Purchases attach automatically.</dd></div>
          <div><dt className="font-medium">Does it read my CRM?</dt><dd className="text-muted-foreground mt-1">No. It works from what you paste. Pair it with the HubSpot or Salesforce plugins for records.</dd></div>
          <div><dt className="font-medium">What do you store?</dt><dd className="text-muted-foreground mt-1">Tool names and timestamps to enforce daily limits. Not your notes, not your conversations. <Link href="/privacy" className="text-primary underline">Privacy policy</Link>.</dd></div>
          <div><dt className="font-medium">Something broke.</dt><dd className="text-muted-foreground mt-1">Email <a href="mailto:hello@gtm-skills.com" className="text-primary underline">hello@gtm-skills.com</a>. We answer within one business day.</dd></div>
        </dl>
        <p className="text-xs text-muted-foreground mt-8">GTM Skills is an independent product by Prospeda and is not affiliated with OpenAI.</p>
      </section>
    </div>
  );
}
