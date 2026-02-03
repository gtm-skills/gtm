import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, RotateCcw } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'SPIN Selling Tonality | Situation-Problem-Implication-Need Discovery | Premium GTM Prompts',
  description: 'Master SPIN Selling. Situation, Problem, Implication, and Need-Payoff questions that guide prospects to their own conclusions. Premium prompts for Claude/ChatGPT.',
  keywords: 'spin selling, neil rackham, situation questions, problem questions, implication questions, need payoff questions, consultative selling',
  openGraph: {
    title: 'SPIN Selling Tonality | Structured Discovery Framework',
    description: 'Master SPIN Selling. Situation, Problem, Implication, and Need-Payoff questions. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email using the SPIN Selling framework.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- Key problem I solve: [The core issue my product addresses]

SPIN Email Approach:
- Don't pitch. Spark curiosity about a problem they might have.
- Reference a Situation you've observed about their business.
- Hint at a Problem that situation often creates.
- Imply the consequences (but don't lecture).
- Offer a conversation to explore if this resonates.
- The goal isn't to sell—it's to earn a discovery call.
- Under 100 words. Open a door, don't give the whole tour.

Tone: Curious, consultative, genuinely interested in understanding their world.`;

const discoveryCallPrompt = `Generate a complete SPIN Selling discovery call question set.

Context:
- Prospect company: [COMPANY]
- Their industry: [INDUSTRY]
- Their likely problem: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Generate questions in the SPIN sequence:

SITUATION QUESTIONS (2-3 questions)
- Understand their current state, processes, environment
- Gather facts, not opinions
- Don't assume—verify
- Keep these brief; too many situation questions bore buyers

PROBLEM QUESTIONS (2-3 questions)
- Identify difficulties, dissatisfactions, challenges
- Find where the current situation falls short
- Listen for emotional language (frustrated, concerned, worried)
- These reveal where you can help

IMPLICATION QUESTIONS (3-4 questions)
- Explore consequences of the problems
- Make the impact tangible and urgent
- Connect to business outcomes (revenue, cost, risk, time)
- These build value—don't skip them

NEED-PAYOFF QUESTIONS (2-3 questions)
- Get them to articulate the value of solving
- Have them describe the ideal future state
- Let them convince themselves
- These prepare them for your solution

The best SPIN practitioners spend more time on Implication and Need-Payoff than Situation and Problem.`;

const objectionPrompt = `Handle this objection using the SPIN Selling approach.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Why we're better: [KEY DIFFERENTIATOR]
- The problem we solve: [CORE ISSUE]

SPIN Objection Handling Framework:
- Don't counter the objection directly. Ask about it.
- Use Problem questions to understand the concern behind the objection.
- Use Implication questions to explore what happens if the concern is valid.
- Use Need-Payoff questions to have them describe what would resolve it.
- Let the conversation reveal whether this is a real blocker or a reflex.

Generate:
1. An acknowledgment (not agreement, acknowledgment)
2. A Problem question to understand the objection better
3. An Implication question to explore consequences
4. A Need-Payoff question to pivot toward resolution`;

const linkedinPrompt = `Write a LinkedIn message using SPIN Selling principles.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- What I want: [Discovery call or conversation]
- Problem I help with: [CORE ISSUE MY PRODUCT SOLVES]

SPIN LinkedIn Approach:
- Reference a Situation relevant to their role.
- Hint at a Problem that often exists in that situation.
- Ask if it resonates—don't assume.
- Offer a conversation, not a demo.
- Under 60 words. Create curiosity, not pressure.

Tone: Curious, low-pressure, genuinely interested in their perspective.`;

const implicationPrompt = `Generate powerful Implication questions for this scenario.

Context:
- The Problem: [THE ISSUE THE PROSPECT HAS]
- Business impact areas: [REVENUE / COST / RISK / TIME / COMPETITIVE]
- Stakeholders affected: [WHO ELSE IS IMPACTED]

Implication Question Rules:
- Connect problems to business outcomes
- Explore ripple effects (how one problem creates others)
- Make consequences concrete and specific
- Involve other stakeholders ("How does this affect your team?")
- Build urgency through understanding, not pressure

Generate 5 Implication questions that:
1. Connect to revenue impact
2. Connect to cost/efficiency impact
3. Connect to risk/compliance impact
4. Explore impact on other teams/people
5. Project forward (what happens if this continues for 12 months?)

These questions should make the problem feel larger and more urgent—without you having to say so.`;

const exampleOutput = `Subject: Quick question about your SDR ramp

Hi Sarah,

Noticed you've hired 3 SDRs in the last quarter. Congrats on the growth.

Curious: how long does it typically take before a new SDR hits quota? I've been talking to a few heads of sales dealing with 90+ day ramp times, and it's creating some interesting downstream problems I hadn't expected.

Would love to hear if you're seeing anything similar—or if you've cracked the code.

Worth a 15-minute call?

— Marcus`;

const realExample = `"The purpose of questions in the larger sale is not to gather information—it's to build value. The best salespeople ask questions that make their customers think differently about their problems."

— Neil Rackham, SPIN Selling`;

const spinFramework = [
  { type: 'Situation', purpose: 'Understand context', example: 'How are you currently handling X?', notes: 'Keep brief. Too many = boring.' },
  { type: 'Problem', purpose: 'Identify difficulties', example: 'Where does that process break down?', notes: 'Listen for emotion.' },
  { type: 'Implication', purpose: 'Explore consequences', example: 'What happens when that fails?', notes: 'This builds value. Don\'t skip.' },
  { type: 'Need-Payoff', purpose: 'Articulate value', example: 'How would it help if you could...?', notes: 'Let them sell themselves.' },
];

const relatedTonalities = [
  { slug: 'socratic', name: 'Socratic Selling', tagline: 'Question-Led' },
  { slug: 'gap-selling', name: 'Gap Selling', tagline: 'Future State Focus' },
  { slug: 'challenger', name: 'Challenger Sale', tagline: 'Teach & Reframe' },
  { slug: 'meddic', name: 'MEDDIC', tagline: 'Qualification Framework' },
];

export default function SpinSellingTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Methodology</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <RotateCcw className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              SPIN Selling
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Situation. Problem. Implication. Need-Payoff.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on Neil Rackham's research from 35,000 sales calls. The most validated
            discovery framework in B2B sales. Questions that guide prospects to their own conclusions.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0]}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* SPIN Framework Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The SPIN Framework</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Purpose</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Example</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {spinFramework.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-orange-600 dark:text-orange-400">{row.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                    <td className="px-4 py-3 text-muted-foreground italic">{row.example}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Philosophy</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              SPIN Selling is built on research, not opinion. Rackham's team analyzed 35,000 sales calls
              and found that top performers in complex sales ask fundamentally different questions—especially
              Implication and Need-Payoff questions that build value.
            </p>
            <p>
              This methodology works because <strong>people believe their own conclusions more than yours</strong>.
              Instead of telling prospects they have a problem, you ask questions that help them discover it.
              Instead of pitching benefits, you ask what solving the problem would mean to them.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Questions over statements.</strong> The best salespeople talk less and ask more.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Implication questions build value.</strong> Top performers ask 3x more implication questions than average.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Need-Payoff prevents objections.</strong> When buyers articulate value, they sell themselves.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Situation questions are overrated.</strong> They're necessary but don't build value. Keep them brief.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Research-validated.</strong> This isn't theory—it's based on observed behavior of successful sellers.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complex sales with multiple stakeholders</li>
                <li>• Discovery calls and needs analysis</li>
                <li>• Consultative selling environments</li>
                <li>• Deals where buyers don't fully understand their problem</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Simple, transactional sales</li>
                <li>• Buyers who know exactly what they want</li>
                <li>• Time-pressured conversations (too many questions feel slow)</li>
                <li>• Late-stage deals where discovery is done</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="SPIN Selling">
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
                <h3 className="text-lg font-semibold text-foreground">Full SPIN Discovery Call</h3>
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

            {/* Implication Questions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Implication Question Generator</h3>
                <CopyButton text={implicationPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{implicationPrompt}</pre>
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
        </TonalityGate>

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
          <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
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
            <a href="https://github.com/gtm-skills/gtm" className="text-muted-foreground hover:text-foreground">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
