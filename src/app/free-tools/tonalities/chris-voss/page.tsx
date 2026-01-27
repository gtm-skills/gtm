import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Chris Voss Tonality | Tactical Empathy Sales Writing | Free GTM Prompts',
  description: 'Write like Chris Voss. Tactical empathy, calibrated questions, FBI negotiation techniques. Copy these Claude/ChatGPT prompts for negotiations and objection handling.',
  keywords: 'chris voss negotiation, tactical empathy sales, fbi negotiation techniques, never split the difference sales, calibrated questions, mirroring sales',
  openGraph: {
    title: 'Chris Voss Tonality | Tactical Empathy Sales Writing',
    description: 'Write like Chris Voss. Tactical empathy, calibrated questions. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the Chris Voss tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Their likely frustration: [PAIN POINT YOU'VE IDENTIFIED]
- My product: [What you sell]
- How we help: [THE OUTCOME YOU DELIVER]

Chris Voss Style Rules:
- Start with a label: "It seems like..." or "It sounds like..."
- Acknowledge their likely emotional state before pitching
- Use tactical empathy—show you understand their world
- Include one calibrated "How" or "What" question
- End with a no-oriented question if appropriate ("Have you given up on...?")
- Use softeners: "I'm afraid...", "I'm sorry if this is off-base..."
- Under 80 words. Empathy is efficient.

Tone: Empathetic but strategic. Curious. Never pushy.`;

const discoveryCallPrompt = `Generate Chris Voss-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their likely pain point: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Chris Voss Approach to Discovery:
- Use labeling to surface emotions: "It seems like...", "It sounds like..."
- Calibrated questions start with "How" or "What" (never "Why")
- Mirror their last 3 words to encourage elaboration
- Use no-oriented questions to create safety
- Tactical silence after questions—let them fill the space

Generate 6 questions/techniques:
1. An opening label to build rapport
2. A calibrated "How" question
3. A calibrated "What" question
4. A mirroring opportunity (with example response)
5. A no-oriented question to surface concerns
6. A summary label to confirm understanding`;

const objectionPrompt = `Handle this objection in the Chris Voss tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- The outcome we deliver: [KEY BENEFIT]

Chris Voss Response Framework:
1. Label the emotion behind the objection: "It sounds like..."
2. Use a calibrated question to understand deeper
3. Mirror if they give a short response
4. Summarize their concerns to get a "That's right"
5. Only then offer perspective—and frame it as their idea
6. End with a how/what question that moves forward

Generate a response that makes them feel heard before moving forward.`;

const linkedinPrompt = `Write a LinkedIn message in the Chris Voss tonality.

Context:
- Recipient: [NAME], [TITLE]
- Their likely frustration: [PAIN POINT]
- What I want: [Meeting, intro, feedback, etc.]

Chris Voss LinkedIn Rules:
- Open with a label: "It seems like you're dealing with..."
- Show you've thought about their challenges
- Ask a calibrated question, not a direct pitch
- Use a softener: "I might be completely off-base, but..."
- End with a no-oriented question if re-engaging cold
- Under 50 words. Empathy doesn't ramble.`;

const reengagementPrompt = `Write a re-engagement email in the Chris Voss tonality.

Context:
- Prospect: [NAME] at [COMPANY]
- Last interaction: [WHAT HAPPENED / HOW LONG AGO]
- What I want: [NEXT STEP]

Chris Voss Re-engagement Framework:
- Subject line: "Have you given up on [PROJECT/GOAL]?"
- This gets 80%+ response rates because "No" is easier than "Yes"
- Acknowledge the silence without guilt-tripping
- Use a label to surface what might be happening
- Make it easy for them to say "No, we haven't given up"
- Offer a low-pressure next step

Generate a re-engagement email that makes "no" the path forward.`;

const exampleOutput = `Subject: Have you given up on this?

James —

It seems like scaling outbound while keeping quality high has been a struggle. I might be completely off-base here.

A few months back you mentioned wanting to 3x pipeline without adding headcount. I'm guessing priorities shifted—or maybe the timing just wasn't right.

Have you given up on solving this for Q2?

Either way, no pressure. Just wanted to check.

— Rachel`;

const realExample = `"Have you given up on this project?"

This subject line gets 80%+ response rates. Why? Because answering "No" is psychologically easier than saying "Yes."

The prospect responds to defend themselves: "No, we haven't given up, we've just been busy..." And now you have a conversation.`;

const relatedTonalities = [
  { slug: 'steve-jobs', name: 'Steve Jobs', tagline: 'Brutally Direct' },
  { slug: 'jeff-bezos', name: 'Jeff Bezos', tagline: 'Customer-Obsessed' },
  { slug: 'hemingway', name: 'Hemingway', tagline: 'Radically Brief' },
  { slug: 'cormac-mccarthy', name: 'Cormac McCarthy', tagline: 'Sparse & Powerful' },
];

export default function ChrisVossTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Chris Voss
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Tactical Empathy. Calibrated Questions. Psychology-Driven.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on FBI hostage negotiation techniques from "Never Split the Difference."
            Label emotions. Ask calibrated questions. Make "no" work for you.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <div className="text-zinc-300 space-y-4">
            <p className="text-lg font-medium italic">"{realExample.split('\n\n')[0].replace(/"/g, '')}"</p>
            {realExample.split('\n\n').slice(1).map((para, i) => (
              <p key={i} className="text-zinc-400">{para}</p>
            ))}
          </div>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Philosophy</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Voss learned negotiation in life-or-death situations. When hostages are at stake,
              you don't have time for rapport-building small talk. You need <strong>tactical empathy</strong>—the
              ability to understand and articulate someone's perspective to build trust fast.
            </p>
            <p>
              In sales, this translates to making prospects feel deeply understood before you ever pitch.
              When someone feels heard, their defenses drop. The negotiation becomes collaboration.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Techniques</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Labeling.</strong> "It seems like...", "It sounds like...", "It looks like..." Name their emotion.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Calibrated questions.</strong> Start with "How" or "What"—never "Why" (feels accusatory).</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">No-oriented questions.</strong> "Have you given up on...?" Gets 80%+ response rates.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Mirroring.</strong> Repeat the last 1-3 words as a question. They'll elaborate.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Softeners.</strong> "I'm afraid...", "I'm sorry if this is off-base..." Lowers defenses.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Negotiating price, terms, or scope</li>
                <li>• Handling objections and concerns</li>
                <li>• Re-engaging cold or ghosted leads</li>
                <li>• Discovery calls to uncover real drivers</li>
                <li>• Building rapport with skeptical prospects</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Prospect wants direct, no-nonsense communication</li>
                <li>• Technical buyers who just want specs</li>
                <li>• Time-pressured situations needing fast answers</li>
                <li>• Overused—can feel manipulative if forced</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground">The Prompts</h2>

          {/* Cold Email */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Cold Email</h3>
              <CopyButton text={coldEmailPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{coldEmailPrompt}</pre>
            </div>
          </div>

          {/* Discovery Call */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Discovery Call Questions</h3>
              <CopyButton text={discoveryCallPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{discoveryCallPrompt}</pre>
            </div>
          </div>

          {/* Objection Handling */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Objection Handling</h3>
              <CopyButton text={objectionPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{objectionPrompt}</pre>
            </div>
          </div>

          {/* LinkedIn Message */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">LinkedIn Message</h3>
              <CopyButton text={linkedinPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{linkedinPrompt}</pre>
            </div>
          </div>

          {/* Re-engagement */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Re-engagement Email</h3>
              <CopyButton text={reengagementPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{reengagementPrompt}</pre>
            </div>
          </div>
        </div>

        {/* Example Output */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Example Output</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <pre className="text-sm text-foreground whitespace-pre-wrap">{exampleOutput}</pre>
          </div>
        </div>

        {/* Related Tonalities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Other Tonalities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedTonalities.map((t) => (
              <Link
                key={t.slug}
                href={`/free-tools/tonalities/${t.slug}`}
                className="p-4 rounded-lg border border-border hover:border-orange-500/50 transition-colors text-center"
              >
                <p className="font-medium text-foreground">{t.name}</p>
                <p className="text-sm text-orange-600 dark:text-orange-400">{t.tagline}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Love this tonality?
          </h2>
          <p className="text-orange-100 mb-6 max-w-xl mx-auto">
            Star the repo to help others discover GTM Skills and save it for later.
          </p>
          <a href="https://github.com/Prospeda/gtm-skills" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-zinc-100">
              Star on GitHub
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">© {new Date().getFullYear()} Prospeda</div>
          <div className="flex gap-6 text-sm">
            <Link href="/free-tools/tonalities" className="text-muted-foreground hover:text-foreground">All Tonalities</Link>
            <Link href="/free-tools" className="text-muted-foreground hover:text-foreground">Free Tools</Link>
            <a href="https://github.com/Prospeda/claude-gtm-skills" className="text-muted-foreground hover:text-foreground">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
