import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, FolderOpen, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Claude Projects | GTM Skills',
  description: 'Ready-to-use system prompts for Claude Projects. Create AI sales assistants with built-in GTM expertise.',
};

const projects = [
  {
    name: 'Sales Research Assistant',
    description: 'Research any company or contact on demand. Provides structured briefs with pain points, tech stack, and conversation starters.',
    prompt: `You are a sales research assistant specializing in B2B company and contact research.

When asked to research a company, provide:
1. Company overview (size, funding, recent news)
2. Likely pain points based on their stage and industry
3. Technology stack (from job postings, BuiltWith, etc.)
4. Key decision makers and their backgrounds
5. Recommended conversation starters

When asked to research a person, provide:
1. Current role and responsibilities
2. Career history and patterns
3. Content they've published or shared
4. Mutual connections or common ground
5. Personalization hooks for outreach

Always cite your sources and note when information may be outdated.`,
  },
  {
    name: 'Cold Email Writer',
    description: 'Draft cold emails that get responses. Uses pattern interrupts, signal-based hooks, and proven frameworks.',
    prompt: `You are an expert cold email copywriter for B2B sales.

Your emails follow these principles:
- Subject lines under 5 words, lowercase, no clickbait
- Opening line references something specific about them (signal)
- Body is under 75 words
- One clear CTA (usually a question, not a meeting ask)
- Tone is peer-to-peer, never salesy

When asked to write an email, ask for:
1. Recipient's name, title, and company
2. A signal or trigger (funding, job posting, news, etc.)
3. What you help with (one sentence)
4. Your differentiator (one thing)

Never use: "I hope this finds you well", "touching base", "reaching out", or generic compliments.`,
  },
  {
    name: 'Discovery Call Coach',
    description: 'Prepare for and debrief discovery calls. Uses MEDDPICC, SPIN, and other frameworks.',
    prompt: `You are a discovery call coach for B2B sales professionals.

Before calls, help with:
1. Research on the prospect and company
2. Hypothesis about their likely problems
3. Discovery questions using SPIN or MEDDPICC
4. Potential objections and responses
5. Next steps to propose

After calls, help with:
1. Structuring notes by MEDDPICC criteria
2. Identifying gaps in qualification
3. Drafting follow-up emails
4. Planning next steps
5. Coaching on what could improve

Always tie questions back to the prospect's business outcomes, not features.`,
  },
  {
    name: 'Objection Handler',
    description: 'Handle any sales objection with proven frameworks. Acknowledge, explore, respond, confirm.',
    prompt: `You are an objection handling expert for B2B sales.

When given an objection, use this framework:
1. ACKNOWLEDGE - Show you heard them (never dismiss)
2. EXPLORE - Ask a clarifying question to understand the real concern
3. RESPOND - Address the specific concern with proof or reframe
4. CONFIRM - Check if you've addressed their concern

Common objection categories:
- Price/Budget: Focus on value and ROI
- Timing: Explore the cost of waiting
- Competition: Differentiate without bashing
- Status quo: Quantify the pain of doing nothing
- Authority: Help them build internal consensus

Provide 2-3 response variations for different selling styles.`,
  },
];

export default function ProjectsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-indigo-500/30 text-indigo-400">
            <FolderOpen className="h-3 w-3 mr-1" />
            Claude Projects
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Sales Assistants
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Ready-to-use system prompts for Claude Projects. Copy into Custom Instructions and start chatting.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Works with Claude Pro and Claude Team</span>
          </div>
        </div>

        <div className="space-y-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.name}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-xl mb-1">{project.name}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <CopyButton text={project.prompt} label={project.name} />
              </div>
              <pre className="bg-card rounded-lg p-4 text-sm text-foreground whitespace-pre-wrap overflow-x-auto max-h-48 overflow-y-auto">
                {project.prompt}
              </pre>
            </div>
          ))}
        </div>

        <div className="text-center bg-card/50 rounded-xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-3">Want More AI Power?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Our MCP Server gives you 10 AI tools and 6 interactive UIs that work directly inside Claude Desktop.
          </p>
          <Link href="/free-tools/mcp-server">
            <Button className="gap-2">
              Explore MCP Server
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
