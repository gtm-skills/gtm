import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, FileText } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Jeff Bezos Tonality | Customer-Obsessed Sales Writing | Free GTM Prompts',
  description: 'Write like Jeff Bezos. Customer-obsessed, data-driven narratives, six-pager philosophy. Copy these Claude/ChatGPT prompts for enterprise proposals and strategic deals.',
  keywords: 'bezos question mark emails, customer obsession sales, six-pager writing, amazon memo format, working backwards method, jeff bezos communication',
  openGraph: {
    title: 'Jeff Bezos Tonality | Customer-Obsessed Sales Writing',
    description: 'Write like Jeff Bezos. Customer-obsessed, data-driven narratives. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the Jeff Bezos tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Their customer's problem: [What their end customers struggle with]
- My product: [What you sell]
- How we help their customers: [The downstream impact]

Jeff Bezos Style Rules:
- Start with the customer. Their customer. Work backwards from there.
- Use narrative structure, not bullet points. Tell a story.
- Weave in data naturally—numbers that prove the customer impact.
- Show long-term thinking. This isn't about a quick win.
- Ask questions that show deep research about their customers.
- Reference the gap between their stated values and current capabilities.
- Under 100 words. Dense with insight.

Tone: Strategic. Customer-obsessed. Long-term thinking.`;

const discoveryCallPrompt = `Generate Jeff Bezos-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their customers: [WHO THEY SERVE]
- My solution: [WHAT YOU OFFER]

Jeff Bezos Approach to Discovery:
- Start every question with the customer's customer
- Ask about metrics they track for customer success
- Probe for gaps between stated values and actual capabilities
- Challenge short-term thinking with long-term questions
- Use the "?" technique: short, pointed questions that demand real answers

Generate 5 questions that:
1. Reveal how they think about their customers' success
2. Expose gaps in their current customer experience
3. Challenge assumptions about "good enough"
4. Frame your solution as customer advocacy
5. One single-word or short "?" style question`;

const objectionPrompt = `Handle this objection in the Jeff Bezos tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Customer impact: [HOW WE HELP THEIR CUSTOMERS]

Jeff Bezos Response Framework:
- Acknowledge the concern, then reframe around customer impact
- Use data to show what customers are experiencing now
- Paint a picture of what their customers could experience
- Reference long-term thinking vs. short-term constraints
- Ask a clarifying question that centers on their customers
- Make them feel the weight of NOT improving customer experience

Generate a response that makes this about their customers, not them.`;

const linkedinPrompt = `Write a LinkedIn message in the Jeff Bezos tonality.

Context:
- Recipient: [NAME], [TITLE]
- Their customers: [WHO THEY SERVE]
- What I want: [Meeting, intro, feedback, etc.]

Jeff Bezos LinkedIn Rules:
- Open with an insight about their customers, not them
- Reference something specific about how they serve their market
- Connect it to a customer outcome they'd care about
- Keep it narrative—tell a one-sentence story
- End with a question about their customers
- Under 60 words.`;

const proposalPrompt = `Write a six-pager style proposal summary in the Jeff Bezos tonality.

Context:
- Customer: [COMPANY NAME]
- Their customers: [END USERS THEY SERVE]
- Problem: [WHAT'S BROKEN IN THEIR CUSTOMER EXPERIENCE]
- Our solution: [WHAT YOU'RE PROPOSING]
- Key metrics: [NUMBERS THAT MATTER]

Six-Pager Structure:
1. Start with the customer press release—imagine announcing success
2. Work backwards: What did we have to do to get that headline?
3. Data woven into narrative, not tables
4. Address the hard questions explicitly
5. Long-term vision with near-term milestones
6. End with the customer benefit, not features

Write a compelling 200-word executive summary for this proposal.`;

const exampleOutput = `Subject: Your customers wait 4.2 days

Maria —

I noticed Acme's support CSAT dropped 12 points last quarter. Dug into G2 reviews—the pattern is clear: response times during peak periods.

Your customers are asking for help. The average wait is 4.2 days.

We help B2B SaaS teams cut that to under 4 hours. Not by adding headcount. By routing the right issues to the right people automatically.

Notion's support team handles 3x the volume now. Same team size.

What would it mean for Acme's customers if they got help the same day?

— David`;

const realExample = `Bezos would forward customer complaint emails to executives with just "?" in the body.

That single character triggered deep investigations, systemic fixes, and a culture of extreme customer ownership.

No explanation needed. The question mark was the message: "Why is this happening to our customer?"`;

const relatedTonalities = [
  { slug: 'steve-jobs', name: 'Steve Jobs', tagline: 'Brutally Direct' },
  { slug: 'chris-voss', name: 'Chris Voss', tagline: 'Tactical Empathy' },
  { slug: 'hemingway', name: 'Hemingway', tagline: 'Radically Brief' },
  { slug: 'cormac-mccarthy', name: 'Cormac McCarthy', tagline: 'Sparse & Powerful' },
];

export default function JeffBezosTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Jeff Bezos
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Customer-Obsessed. Data-Driven Narratives. Long-Term Thinking.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on Amazon's six-pager memo format and the famous "?" email method.
            Work backwards from the customer. Weave data into stories.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <div className="text-zinc-300 mb-4 space-y-4">
            {realExample.split('\n\n').map((para, i) => (
              <p key={i} className={i === 0 ? 'italic' : ''}>{para}</p>
            ))}
          </div>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Philosophy</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Bezos built Amazon on one idea: <strong>customer obsession over competitor focus</strong>.
              Every document, every email, every decision starts with the customer and works backwards.
            </p>
            <p>
              The six-pager format exists because Bezos believes narratives force clearer thinking than
              bullet points. You can't hide fuzzy logic in a story. When you write in this tonality,
              you demonstrate strategic depth.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Narrative structure.</strong> Stories over bullet points. Prose that forces clarity.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Working backwards.</strong> Start with the customer outcome, then explain how to get there.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Data in stories.</strong> Numbers woven into narrative, not dumped in tables.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">The "?" email.</strong> Sometimes one character is all you need to drive accountability.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Long-term alignment.</strong> This isn't about the quarter. It's about the decade.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complex enterprise sales needing detailed proposals</li>
                <li>• Strategic partnerships requiring deep alignment</li>
                <li>• Equipping champions to sell internally</li>
                <li>• Responding to major customer concerns</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Quick transactional deals needing brevity</li>
                <li>• Prospects who don't think about their customers</li>
                <li>• Early cold outreach (save it for later stages)</li>
                <li>• Situations requiring emotional appeal over logic</li>
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

          {/* Six-Pager Proposal */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Six-Pager Proposal Summary</h3>
              <CopyButton text={proposalPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{proposalPrompt}</pre>
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
