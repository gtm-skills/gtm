import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import {
  ArrowRight,
  ChevronRight,
  Database,
  MessageSquare,
  Layers,
  Terminal,
  Sparkles,
  DollarSign,
  Workflow,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clay vs. Claude + GTM Skills MCP | AI Research Stack Comparison',
  description:
    'Clay vs. Claude + GTM Skills MCP: a fair, factual comparison of the two approaches to AI-powered sales research, and when to use each (or both).',
  openGraph: {
    title: 'Clay vs. Claude + GTM Skills MCP: Which AI Research Stack Wins',
    description:
      'A practical comparison of Clay\'s data enrichment platform and Claude + GTM Skills MCP\'s conversational research approach — plus when to combine them.',
  },
};

const faqs = [
  {
    question: 'Is GTM Skills MCP a replacement for Clay?',
    answer:
      'Not exactly. GTM Skills MCP is a free, open-source set of prompts and tools that run inside Claude for research, drafting, and strategy. Clay is a dedicated data enrichment platform with live connections to dozens of data providers and CRMs. Many teams use both: Clay for bulk data enrichment and waterfall lookups, GTM Skills MCP for conversational research, message drafting, and deal strategy on top of that data.',
  },
  {
    question: 'Which one is better for finding verified emails and phone numbers?',
    answer:
      'Clay, hands down. Clay is purpose-built to query multiple data providers in a waterfall (falling back from one source to the next until it finds a match) and return verified contact data. GTM Skills MCP does not have its own contact database — it gives Claude research frameworks and prompt templates, so it is better suited to synthesizing and acting on data you already have than sourcing new verified contact records from scratch.',
  },
  {
    question: 'Does GTM Skills MCP cost anything?',
    answer:
      'No. GTM Skills MCP is free and open source, and it runs on your existing Claude subscription (or Claude.ai account) with no separate platform fee. Clay offers a free tier to get started, with paid plans that scale as your enrichment volume and provider usage grow.',
  },
  {
    question: 'Can I use Clay data inside Claude conversations?',
    answer:
      'Yes. When Clay is connected as an integration in Claude, you can ask Claude to pull Clay enrichment data directly into the conversation, then use GTM Skills MCP prompts and tools to turn that data into research briefs, outreach drafts, or account plans without switching tools.',
  },
  {
    question: 'Do I need to learn a new platform to use GTM Skills MCP?',
    answer:
      'No. That is one of the main differences from Clay. GTM Skills MCP has no separate UI, table builder, or workflow editor to learn — you install it once and then work entirely through natural-language prompts inside Claude. Clay, by contrast, has its own table-based workflow builder that takes time to learn but gives you far more control over large-scale enrichment pipelines.',
  },
  {
    question: 'Which one scales better for high-volume prospecting?',
    answer:
      'Clay. It was built for processing large lists — hundreds or thousands of rows — through automated enrichment waterfalls and CRM sync. GTM Skills MCP is conversational by design, which makes it strong for deep research on individual accounts, deal strategy, and message drafting, but it is not built as a bulk list-processing engine the way Clay is.',
  },
];

export default function ClayVsClaudeMcpPage() {
  return (
    <div className="py-12 md:py-20">
      <FAQJsonLd questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Guides', url: 'https://gtm-skills.com/guides' },
          {
            name: 'Clay vs. Claude + GTM Skills MCP',
            url: 'https://gtm-skills.com/guides/clay-vs-claude-mcp',
          },
        ]}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/guides" className="hover:text-foreground transition-colors">
            Guides
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Clay vs. Claude + GTM Skills MCP</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-green-500/30 text-green-400">
            Comparison Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Clay vs. Claude + GTM Skills MCP: Which AI Research Stack Wins
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Clay and Claude + GTM Skills MCP solve overlapping but distinct problems in the sales
            research stack. This guide breaks down what each one is actually good at, so you can
            pick the right tool — or run them together.
          </p>
        </div>

        {/* Intro */}
        <div className="mb-16 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            If you sell B2B, you have probably run into both names. Clay is a well-known data
            enrichment and workflow platform that sales and RevOps teams use to build prospect
            lists, waterfall through dozens of data providers, and sync clean records into a CRM.
            The{' '}
            <Link href="/free-tools/mcp-server" className="text-cyan-400 hover:text-cyan-300">
              GTM Skills MCP Server
            </Link>{' '}
            is a free, open-source set of tools that gives Claude sales-specific capabilities —
            research, outreach drafting, discovery questions, deal strategy — directly inside a
            conversation, with no separate app to open.
          </p>
          <p>
            This is not a &quot;which one should you cancel&quot; comparison. Clay is a capable,
            widely-used platform, and plenty of teams get real value from it. The honest framing
            is that these are two different shapes of tool — one is a structured data-enrichment
            platform you configure once and run at scale, the other is a conversational research
            layer you use directly in Claude, for free. In fact, our own{' '}
            <Link href="/free-tools/claude-integrations/clay" className="text-cyan-400 hover:text-cyan-300">
              Claude + Clay integration guide
            </Link>{' '}
            already treats them as complementary rather than competing — this guide goes deeper on
            when to reach for which.
          </p>
        </div>

        {/* What Clay does well */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold">What Clay Does Well</h2>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Clay&apos;s core strength is data enrichment at scale. It connects to a large
              network of third-party data providers and lets you build &quot;waterfalls&quot; —
              queries that check one provider, and if a field comes back empty, automatically fall
              back to the next provider until it finds a match. That means higher fill rates on
              things like verified emails, direct-dial phone numbers, and firmographic data than
              relying on any single source.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              It is also a genuine workflow platform, not just a lookup tool. You can build
              spreadsheet-style tables that combine enrichment, filtering logic, AI-generated
              columns, and automated syncs into your CRM or outbound tools, so a list goes from
              raw domains to enriched, scored, CRM-ready records without manual copy-paste. For
              teams that need to process hundreds or thousands of prospects on a recurring basis,
              that kind of automated pipeline is genuinely hard to replicate with a
              conversational tool.
            </p>
          </div>
        </div>

        {/* What Claude + GTM Skills MCP does differently */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold">What Claude + GTM Skills MCP Does Differently</h2>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              GTM Skills MCP takes a different shape entirely. Instead of a table builder and a
              network of paid data providers, it is a library of sales-specific tools and prompts
              that plug directly into Claude through the Model Context Protocol. There is no
              second app to log into — you install the MCP server once, and from then on you just
              talk to Claude the way you already do.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That conversational shape changes what it is good at. Rather than processing a list
              of a thousand rows, it excels at agent-driven research on a specific account or
              deal: pulling together what is publicly known about a company, drafting outreach
              that reflects your actual positioning, generating discovery questions for a specific
              persona, or working through objection handling for a live deal — all without leaving
              the chat window. It is free and open source, so there is no subscription tier to
              manage or seat count to negotiate.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The tradeoff is the flip side of Clay&apos;s strength: GTM Skills MCP does not own a
              network of paid data providers, so it cannot guarantee verified emails or phone
              numbers the way a dedicated enrichment waterfall can. It is strongest as a research
              and drafting layer, not a contact database.
            </p>
          </div>
        </div>

        {/* Side by side */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Side by Side</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Dimension</th>
                  <th className="text-left py-3 px-4 font-semibold text-green-400">Clay</th>
                  <th className="text-left py-3 px-4 font-semibold text-cyan-400">
                    Claude + GTM Skills MCP
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">Primary shape</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Table-based data enrichment platform
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Conversational research layer inside Claude
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">Best for</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    High-volume list enrichment, waterfall lookups
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Account research, drafting, deal strategy
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">Data sourcing</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Live connections to third-party data providers
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Works with data you provide or Claude finds via search
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">Learning curve</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Own workflow builder and table logic to learn
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Natural language — no new UI to learn
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">Cost</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Free tier plus paid plans as usage scales
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Free and open source
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium">Where it lives</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Separate platform, connects to Claude
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    Runs directly inside Claude, no separate app
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use which */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Workflow className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold">When to Use Which (And When to Use Both)</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
              <h3 className="font-semibold text-green-400 mb-2">Reach for Clay when...</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>You need to enrich hundreds or thousands of records at once</li>
                <li>You want verified emails or phone numbers with high fill rates</li>
                <li>You need an automated, recurring sync into your CRM</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
              <h3 className="font-semibold text-cyan-400 mb-2">Reach for Claude + MCP when...</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>You are researching one account or deal in depth</li>
                <li>You want to draft outreach, discovery questions, or deal strategy</li>
                <li>You want a free, no-platform way to work inside Claude</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-2">Use both when...</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>You enrich a list in Clay, then research top accounts in Claude</li>
                <li>You want verified data plus AI-drafted, personalized outreach</li>
                <li>You need both scale (Clay) and depth (Claude + MCP)</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            In practice, the two stack cleanly. A common pattern is to let Clay do what it is
            best at — pulling a large list down to a clean, enriched, CRM-ready set of accounts
            and contacts — and then bring your shortlist into Claude for the work that benefits
            from reasoning rather than lookups: understanding why an account is a good fit right
            now, what to say to a specific persona, and how to sequence outreach. Our{' '}
            <Link href="/free-tools/claude-integrations/clay" className="text-cyan-400 hover:text-cyan-300">
              Claude + Clay integration guide
            </Link>{' '}
            covers exactly that combined workflow in more detail, including how to connect Clay
            to Claude directly.
          </p>
        </div>

        {/* Example workflow comparison */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Same Goal, Two Approaches</h2>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Say you want to research a target account before outreach. Here is what that looks
            like with each approach — and what it looks like combined.
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-lg mb-1">Approach 1: Clay-first enrichment</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You already have Clay connected and want firmographic and contact data for a
                target account, enriched through Clay&apos;s provider waterfall.
              </p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Example Prompt:</h4>
                <CopyButton
                  text={`"Use Clay to enrich Stripe: company size, funding stage, tech stack, and the top 3 contacts in engineering leadership with verified emails."`}
                  label="clay-first-prompt"
                />
              </div>
              <div className="bg-card rounded-lg p-4">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
{`"Use Clay to enrich Stripe: company size, funding stage,
tech stack, and the top 3 contacts in engineering
leadership with verified emails."`}
                </pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-lg mb-1">
                Approach 2: Claude + GTM Skills MCP research
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                No enrichment platform needed — Claude uses GTM Skills MCP tools to build a
                research brief and outreach angle directly in the conversation.
              </p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Example Prompt:</h4>
                <CopyButton
                  text={`"Research Stripe for a cold outreach campaign. I'm selling developer tools. Give me a company overview, likely pain points for their engineering leadership, a trigger event I can reference, and a first-line hook for a cold email."`}
                  label="mcp-only-prompt"
                />
              </div>
              <div className="bg-card rounded-lg p-4">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
{`"Research Stripe for a cold outreach campaign. I'm
selling developer tools. Give me a company overview,
likely pain points for their engineering leadership,
a trigger event I can reference, and a first-line
hook for a cold email."`}
                </pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
              <h3 className="font-semibold text-lg mb-1 text-cyan-400">
                Approach 3: Combined workflow
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Clay supplies the verified data, GTM Skills MCP turns it into a research brief and
                drafted outreach — all in one Claude conversation.
              </p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Example Prompt:</h4>
                <CopyButton
                  text={`"Use Clay to pull firmographic and contact data for Stripe, then use that data to write a research brief on why they're a good fit for developer tools, and draft a personalized cold email to the most relevant contact."`}
                  label="combined-prompt"
                />
              </div>
              <div className="bg-card rounded-lg p-4">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
{`"Use Clay to pull firmographic and contact data for
Stripe, then use that data to write a research brief
on why they're a good fit for developer tools, and
draft a personalized cold email to the most relevant
contact."`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Cost framing */}
        <div className="mb-16 p-6 rounded-xl border border-border bg-card">
          <div className="flex items-start gap-4">
            <DollarSign className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">On Cost</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Clay offers a free tier to get started, with paid plans that scale as your
                enrichment volume and connected data providers grow — a normal model for a
                platform that pays providers per lookup. GTM Skills MCP is free and open source
                end to end; it runs on top of your existing Claude access, so there is no separate
                subscription to add. Neither model is &quot;better&quot; in the abstract — it
                depends on whether you need paid, verified data at volume (Clay) or a free research
                and drafting layer (GTM Skills MCP).
              </p>
            </div>
          </div>
        </div>

        {/* Complement CTA */}
        <div className="mb-16 p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
          <div className="flex items-start gap-4">
            <Terminal className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-cyan-400 mb-2">Try Them Together</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you already use Clay, you do not have to choose. Install the GTM Skills MCP
                Server to add research, drafting, and deal strategy on top of the data Clay
                enriches — read the{' '}
                <Link href="/free-tools/claude-integrations/clay" className="text-cyan-400 hover:text-cyan-300">
                  Claude + Clay integration guide
                </Link>{' '}
                for the step-by-step setup.
              </p>
              <Link
                href="/free-tools/mcp-server"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                Install the GTM MCP Server
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">Want the Full GTM Prompt Library?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            GTM Skills is a free, open-source library of sales prompts and an MCP server that
            plugs straight into Claude — no new platform to learn.
          </p>
          <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
            <Button className="brand-gradient">
              Explore GTM Skills Free
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
