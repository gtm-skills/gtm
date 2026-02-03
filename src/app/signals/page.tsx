import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { Radio, TrendingUp, Users, Briefcase, DollarSign, Building2, Github } from 'lucide-react';

export const metadata = {
  title: 'Signal-Based Selling | GTM Skills',
  description: 'Turn buying signals into conversations. Prompts for funding rounds, job postings, leadership changes, and more.',
};

const signals = [
  {
    name: 'Funding Round',
    icon: DollarSign,
    description: 'Company just raised money and is scaling',
    prompt: `A company just announced a [SERIES/AMOUNT] funding round. Write a cold email that:

1. Congratulates without being generic ("Saw the news" is lazy)
2. References what the funding likely means for their [SPECIFIC TEAM/INITIATIVE]
3. Connects to how we help companies at this stage with [YOUR VALUE PROP]
4. Asks a question about their priorities post-raise

Context:
- Company: [NAME]
- Funding: [AMOUNT/SERIES]
- What they do: [ONE LINE]
- What we do: [ONE LINE]

Keep under 75 words. No "reaching out" or "touching base".`,
  },
  {
    name: 'New Executive Hire',
    icon: Users,
    description: 'New leader means new priorities and budget',
    prompt: `A company just hired a new [TITLE]. Write a cold email that:

1. Acknowledges their new role without brown-nosing
2. References a common challenge for new [TITLES] in their first 90 days
3. Offers a specific insight or resource (not a demo)
4. Opens a conversation about their priorities

Context:
- New hire: [NAME], [TITLE] at [COMPANY]
- Their background: [PREVIOUS COMPANY/ROLE]
- What we help with: [ONE LINE]

Tone: Peer-to-peer. You're a helpful expert, not a vendor.`,
  },
  {
    name: 'Job Posting Signal',
    icon: Briefcase,
    description: 'Hiring indicates growth and potential pain points',
    prompt: `A company is hiring for [ROLE]. Write a cold email that:

1. References the job posting specifically (quote a requirement)
2. Connects that hire to a broader challenge we solve
3. Positions our solution as helping that new hire succeed faster
4. Asks about their timeline or criteria for this hire

Context:
- Company: [NAME]
- Role they're hiring: [TITLE]
- Specific requirement from posting: [QUOTE]
- How we help: [ONE LINE]

Be specific. Generic "I saw you're hiring" emails get ignored.`,
  },
  {
    name: 'Company Expansion',
    icon: Building2,
    description: 'New office, market, or product launch',
    prompt: `A company announced [EXPANSION TYPE: new office/market/product]. Write a cold email that:

1. References the specific expansion news
2. Acknowledges a challenge that comes with this type of growth
3. Shares a relevant insight or case study
4. Asks about their approach or timeline

Context:
- Company: [NAME]
- Expansion: [DETAILS]
- Challenge this creates: [YOUR HYPOTHESIS]
- How we help: [ONE LINE]

This is about them, not you. Lead with their world.`,
  },
  {
    name: 'Tech Stack Change',
    icon: TrendingUp,
    description: 'New tool adoption signals initiative and budget',
    prompt: `A company just adopted [NEW TOOL/PLATFORM]. Write a cold email that:

1. References their adoption of the new tool
2. Acknowledges what this signals about their priorities
3. Connects to how we complement or enhance that investment
4. Asks about their goals with the new tool

Context:
- Company: [NAME]
- New tool: [TOOL NAME]
- What this signals: [YOUR HYPOTHESIS]
- How we integrate/complement: [ONE LINE]

Be specific about the integration opportunity.`,
  },
];

export default function SignalsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-rose-500/30 text-rose-400">
            <Radio className="h-3 w-3 mr-1" />
            Signal-Based Selling
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Turn Signals Into Conversations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Buying signals are your competitive advantage. These prompts help you craft relevant, timely outreach based on what&apos;s happening in your prospect&apos;s world.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {signals.map((signal) => (
            <div
              key={signal.name}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                  <signal.icon className="h-6 w-6 text-rose-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-xl mb-1">{signal.name}</h3>
                      <p className="text-muted-foreground">{signal.description}</p>
                    </div>
                    <CopyButton text={signal.prompt} label={signal.name} />
                  </div>
                </div>
              </div>
              <pre className="bg-zinc-900 rounded-lg p-4 text-sm text-zinc-300 whitespace-pre-wrap overflow-x-auto">
                {signal.prompt}
              </pre>
            </div>
          ))}
        </div>

        <div className="text-center bg-zinc-900/50 rounded-xl p-8 border border-zinc-800">
          <h2 className="text-2xl font-bold mb-3">Want More Signal-Based Prompts?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Star the repo to save these prompts for later and help others discover GTM Skills.
          </p>
          <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
            <Button className="gap-2">
              <Github className="h-4 w-4" />
              Star on GitHub
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
