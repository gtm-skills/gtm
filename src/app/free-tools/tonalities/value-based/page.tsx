import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, DollarSign } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Value-Based Selling | ROI-Focused Sales Writing | Free GTM Prompts',
  description: 'Master value-based selling. Quantify ROI, build business cases, speak the language of finance. Free prompts for Claude & ChatGPT.',
  keywords: 'value based selling, roi selling, business case sales, value selling methodology, quantified value proposition, value engineering sales',
  openGraph: {
    title: 'Value-Based Selling | ROI-Focused Sales Writing',
    description: 'Master value-based selling. Quantify ROI, build business cases. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email using Value-Based Selling methodology.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Their likely problem: [PAIN POINT]
- Cost of the problem: [ANNUAL IMPACT - time, money, opportunity cost]
- My product: [What you sell]
- Typical ROI: [X% return or $X saved]

Value-Based Selling Rules:
- Lead with the cost of the problem, not features
- Quantify everything possible (time, money, resources)
- Speak the language of finance (ROI, payback period, NPV)
- Reference similar companies and their results
- Make the math obvious—they should be able to calculate ROI
- Under 100 words. Dense with numbers.

Tone: Analytical. Confident. Business-focused.`;

const discoveryCallPrompt = `Generate Value-Based Selling discovery questions.

Context:
- Prospect company: [COMPANY]
- Their likely problem: [PAIN POINT]
- My solution: [WHAT YOU OFFER]
- Typical value drivers: [WHERE CUSTOMERS SEE ROI]

Value-Based Discovery Approach:
- Quantify the current state (cost, time, resources)
- Uncover hidden costs they haven't calculated
- Understand their decision criteria and metrics
- Build toward a business case collaboratively
- Get them to state the value themselves

Generate 6 questions that:
1. Quantify the current problem in dollars
2. Uncover hidden or adjacent costs
3. Understand how they measure success
4. Surface the cost of inaction
5. Identify who cares about these metrics
6. Set up the ROI conversation`;

const objectionPrompt = `Handle this objection using Value-Based Selling methodology.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Typical ROI: [EXPECTED RETURN]
- Payback period: [HOW LONG UNTIL VALUE EXCEEDS COST]

Value-Based Response Framework:
- Acknowledge the concern, then return to value
- Reframe price as investment with quantified return
- Compare to cost of inaction or alternatives
- Use customer proof points with specific numbers
- Build or reference a simple business case
- End with a question about their value criteria

Generate a response that makes the math irresistible.`;

const linkedinPrompt = `Write a LinkedIn message using Value-Based Selling methodology.

Context:
- Recipient: [NAME], [TITLE]
- Their likely problem: [PAIN POINT]
- Quantified impact: [COST OR TIME SAVINGS]
- Proof point: [SIMILAR CUSTOMER RESULT]

Value-Based LinkedIn Rules:
- Lead with a specific number
- Reference a similar company's result
- Make the ROI calculation obvious
- Ask about their metrics or goals
- Under 50 words.`;

const businessCasePrompt = `Build a value-based business case using this framework.

Context:
- Customer: [COMPANY NAME]
- Problem: [WHAT THEY'RE TRYING TO SOLVE]
- Current cost of problem: [ANNUAL IMPACT]
- Our solution: [WHAT WE'RE PROPOSING]
- Investment required: [PRICE]
- Expected outcomes: [BENEFITS WITH METRICS]

Business Case Framework:
1. Executive Summary (1-2 sentences with headline ROI)
2. Current State (quantified costs, inefficiencies)
3. Proposed Solution (what changes)
4. Expected Outcomes (quantified benefits by category)
5. Investment & ROI Calculation
6. Risk Mitigation (why this is safe)
7. Next Steps

Generate a 200-word business case summary.`;

const exampleOutput = `Subject: $340K sitting on the table

Sarah —

Your team of 12 SDRs spends ~4 hours daily on research. That's 240 hours/week of fully-loaded salary ($85K avg) doing work that AI handles in minutes.

The math: $340,000/year in research time that could go to actual selling.

We helped Segment's SDR team reclaim 70% of that time. Pipeline per rep went up 40% in 90 days.

Would a 15-minute call to see if similar results are realistic for Acme be worth it?

— Marcus`;

const realExample = `Value-Based Selling shifts the conversation from "What does it cost?" to "What is it worth?"

Top performers quantify three types of value:
1. Hard savings (reduced costs, eliminated spend)
2. Revenue impact (increased sales, faster deals)
3. Risk reduction (avoided losses, compliance)

The goal: Make the ROI so obvious that price becomes a non-issue.`;

const relatedTonalities = [
  { slug: 'challenger', name: 'Challenger', tagline: 'Teach & Reframe' },
  { slug: 'meddic', name: 'MEDDIC', tagline: 'Qualification Framework' },
  { slug: 'trusted-advisor', name: 'Trusted Advisor', tagline: 'Relationship-First' },
  { slug: 'pain-point-research', name: 'Pain Point Research', tagline: 'Deep Discovery' },
];

export default function ValueBasedTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Methodology</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <DollarSign className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Value-Based Selling
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Quantify ROI. Build Business Cases. Make Price Irrelevant.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Shift from features to financial outcomes. Lead with numbers. Speak the language
            of finance. Make the investment decision obvious.
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
              Value-Based Selling transforms the conversation from cost to investment. Instead of
              defending price, you <strong>make the ROI so clear that the decision becomes obvious</strong>.
            </p>
            <p>
              This methodology works because it speaks the language of business leaders. CFOs don't
              care about features—they care about financial impact. When you quantify value, you
              move from "sales conversation" to "business case."
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Value Categories</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Hard savings.</strong> Direct cost reduction, eliminated spend, efficiency gains.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Revenue impact.</strong> New revenue, faster sales cycles, increased conversion.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Risk reduction.</strong> Avoided losses, compliance, business continuity.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Strategic value.</strong> Competitive advantage, market position, optionality.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Metrics to Quantify</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">ROI %.</strong> Total return divided by investment.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Payback period.</strong> Months until value exceeds cost.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Annual value.</strong> Ongoing yearly benefit.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Cost of delay.</strong> What they lose each month they wait.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enterprise deals with CFO involvement</li>
                <li>• Price-sensitive negotiations</li>
                <li>• ROI-driven buyers</li>
                <li>• Building business cases for champions</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Value is hard to quantify</li>
                <li>• Buyer cares more about vision than numbers</li>
                <li>• Early-stage discovery (need pain first)</li>
                <li>• Transactional low-stakes purchases</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground">The Prompts</h2>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Cold Email</h3>
              <CopyButton text={coldEmailPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{coldEmailPrompt}</pre>
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
              <h3 className="text-lg font-semibold text-foreground">Objection Handling</h3>
              <CopyButton text={objectionPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{objectionPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">LinkedIn Message</h3>
              <CopyButton text={linkedinPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{linkedinPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Business Case Builder</h3>
              <CopyButton text={businessCasePrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{businessCasePrompt}</pre>
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
