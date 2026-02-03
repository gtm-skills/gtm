import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Search } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Pain Point Research | Deep Discovery Framework | Free GTM Prompts',
  description: 'Master pain point discovery. Uncover surface symptoms, root causes, business impact, and emotional drivers. Free prompts for Claude & ChatGPT.',
  keywords: 'pain point discovery, sales discovery framework, customer pain points, problem discovery questions, deep discovery sales',
  openGraph: {
    title: 'Pain Point Research | Deep Discovery Framework',
    description: 'Master pain point discovery. Uncover surface symptoms, root causes, and impact. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const researchPrompt = `Research pain points for this prospect using public information.

Context:
- Company: [COMPANY NAME]
- Industry: [INDUSTRY]
- Prospect role: [TITLE]
- My solution area: [WHAT YOU HELP WITH]

Pain Point Research Framework:
1. Surface symptoms: What visible problems might they have?
2. Root causes: What's driving those symptoms?
3. Business impact: How does this affect revenue, costs, or risk?
4. Emotional impact: How does this affect the person in that role?
5. Timing triggers: What events make this urgent now?

Research sources to synthesize:
- Recent job postings (what they're hiring for signals priorities)
- G2/Glassdoor reviews (internal challenges surface here)
- Earnings calls/investor materials (stated priorities)
- LinkedIn activity (what they're talking about)
- Industry reports (macro pressures)

Generate a pain point hypothesis with supporting evidence.`;

const discoveryCallPrompt = `Generate deep pain point discovery questions.

Context:
- Prospect company: [COMPANY]
- Prospect role: [TITLE]
- Suspected pain area: [HYPOTHESIS]
- My solution: [WHAT YOU OFFER]

Pain Point Discovery Layers:
1. Surface level: What they'll tell anyone
2. Business level: The measurable impact
3. Personal level: How it affects them specifically
4. Root cause level: Why it's really happening
5. Urgency level: Why now vs. later

Generate questions for each layer:

Layer 1 - Surface (easy to answer):
Layer 2 - Business Impact (quantifiable):
Layer 3 - Personal Impact (emotional):
Layer 4 - Root Cause (diagnostic):
Layer 5 - Urgency (timing):`;

const icpPainPrompt = `Map pain points across an Ideal Customer Profile.

Context:
- Target company profile: [SIZE, INDUSTRY, STAGE]
- Key personas: [TITLES YOU SELL TO]
- My solution: [WHAT YOU OFFER]
- Common use cases: [HOW CUSTOMERS USE YOU]

Pain Mapping Framework:
For each persona, identify:
1. Their top 3 professional priorities
2. What blocks them from achieving those
3. The cost of those blockers (time, money, career risk)
4. What triggers them to seek a solution
5. What they've tried before and why it didn't work

Generate a pain point map for each persona.`;

const competitorPainPrompt = `Analyze competitor weakness and customer pain from reviews.

Context:
- My company: [YOUR COMPANY]
- Key competitors: [COMPETITOR NAMES]
- My differentiation: [WHERE YOU WIN]

Review Mining Framework:
Analyze G2, Capterra, TrustRadius reviews for:
1. Top 3 complaints about each competitor
2. What customers wish the product did better
3. Support/service issues mentioned
4. Use cases where competitors fail
5. How these map to your strengths

Generate competitor pain analysis with direct quotes.`;

const objectionPrompt = `Handle this objection by returning to pain.

The objection: [PASTE OBJECTION HERE]

Context:
- The pain we uncovered: [WHAT THEY SAID WAS PAINFUL]
- Business impact: [HOW IT AFFECTS THEM]
- Personal impact: [HOW IT AFFECTS THEM PERSONALLY]

Pain-Based Response Framework:
- Acknowledge the objection
- Return to the pain they articulated
- Quantify what doing nothing costs
- Connect your solution to that specific pain
- Ask if the pain has changed or gotten worse

Generate a response that reminds them why they engaged.`;

const exampleOutput = `Pain Point Hypothesis for Sarah Patel, VP of Sales at Acme Corp

SURFACE SYMPTOMS:
- Recent job post for "Sales Operations Manager" mentions "scaling SDR processes"
- LinkedIn post about "spending more time in spreadsheets than selling"
- G2 reviews of their current CRM mention "clunky reporting"

ROOT CAUSES:
- Fast growth (50% YoY per press release) outpacing process maturity
- Tech stack assembled ad-hoc, now creating data silos
- Leadership likely expecting more pipeline from existing headcount

BUSINESS IMPACT:
- Estimate: 3-5 hours/week per rep on manual data work = ~$15K/rep/year
- Reporting delays mean slow response to performance issues
- Pipeline forecasting unreliable → CFO pressure

EMOTIONAL IMPACT:
- Sarah promoted 8 months ago (LinkedIn). Needs to prove she can scale.
- Posts suggest frustration with "firefighting" vs. strategic work
- Likely feels pressure from board to hit growth targets

TIMING TRIGGERS:
- Q1 planning happening now (based on industry patterns)
- Series B closed 4 months ago → investor reporting pressure
- Hiring surge suggests they're trying to hit aggressive targets

OUTREACH ANGLE:
Lead with the spreadsheet/admin time pain. Connect to her personal pressure to prove the team can scale without just adding headcount.`;

const realExample = `Great discovery uncovers four layers of pain:

1. Surface: "Our process is inefficient"
2. Business: "It costs us $X per month in lost productivity"
3. Personal: "I've promised my boss I'd fix this by Q2"
4. Root: "Our original system was built for a company 1/10th our size"

Most salespeople stop at layer 1. Top performers get to layer 4.`;

const relatedTonalities = [
  { slug: 'meddic', name: 'MEDDIC', tagline: 'Qualification Framework' },
  { slug: 'socratic', name: 'Socratic', tagline: 'Question-Led' },
  { slug: 'challenger', name: 'Challenger', tagline: 'Teach & Reframe' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
];

export default function PainPointResearchPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Skill</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Search className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Pain Point Research
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Deep Discovery. Root Causes. Real Impact.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Go beyond surface symptoms to uncover root causes, business impact, and personal stakes.
            The foundation of all great sales conversations.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <div className="text-zinc-300 space-y-4">
            {realExample.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Philosophy</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Most salespeople accept the first problem a prospect mentions. <strong>Great salespeople
              dig deeper</strong>—finding the root cause, quantifying the impact, and understanding
              the personal stakes for their buyer.
            </p>
            <p>
              Pain point research isn't just about finding problems. It's about understanding why
              those problems matter, who they affect, and what happens if nothing changes.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">The Four Layers of Pain</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Surface.</strong> The symptom they'll tell anyone who asks.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Business.</strong> The measurable impact in dollars, time, or risk.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Personal.</strong> How it affects their career, reputation, or stress.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Root cause.</strong> Why the problem exists in the first place.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Research Sources</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Job postings.</strong> What they're hiring for signals priorities and gaps.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Review sites.</strong> G2, Glassdoor, TrustRadius reveal internal challenges.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">LinkedIn activity.</strong> What they post and engage with shows priorities.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Investor materials.</strong> Earnings calls, board decks reveal strategic pressures.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pre-call research to personalize outreach</li>
                <li>• Discovery calls to go deeper</li>
                <li>• Building business cases</li>
                <li>• Training AI on your ICP</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Prospect has already articulated their pain</li>
                <li>• Transactional sales with obvious needs</li>
                <li>• Time pressure to move to close</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground">The Prompts</h2>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Prospect Pain Research</h3>
              <CopyButton text={researchPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{researchPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Discovery Call Questions</h3>
              <CopyButton text={discoveryCallPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{discoveryCallPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">ICP Pain Mapping</h3>
              <CopyButton text={icpPainPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{icpPainPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Competitor Pain Analysis</h3>
              <CopyButton text={competitorPainPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{competitorPainPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Objection Handling (Return to Pain)</h3>
              <CopyButton text={objectionPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{objectionPrompt}</pre>
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
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Methodologies</h2>
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
