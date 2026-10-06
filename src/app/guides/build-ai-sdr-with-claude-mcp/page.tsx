import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { HowToJsonLd, FAQJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import {
  ArrowRight,
  ChevronRight,
  Terminal,
  Search,
  Mail,
  Shield,
  Database,
  Workflow,
  CheckCircle2,
  Zap,
  Plug,
  AlertTriangle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Build an AI SDR with Claude + MCP (No-Code Setup) | GTM Skills',
  description:
    'Turn Claude into an AI SDR using the real, open-source GTM MCP server. Step-by-step setup for Claude Desktop and Claude Code, real commands and config, zero programming.',
  keywords: [
    'AI SDR',
    'Claude MCP server',
    'Model Context Protocol sales',
    'MCP server setup',
    'Claude Desktop MCP',
    'Claude Code MCP',
    'AI sales development rep',
    'GTM MCP server',
  ],
  openGraph: {
    title: 'How to Build an AI SDR with Claude + MCP',
    description:
      'A real, working setup guide for the open-source GTM MCP server — no invented steps, no fake config.',
  },
};

const installSteps = [
  {
    number: '01',
    title: 'Clone the repository',
    description: 'The MCP server lives inside the gtm-skills monorepo, in the mcp-server/ directory.',
    copyable: 'git clone https://github.com/gtm-skills/gtm.git && cd gtm-skills/mcp-server',
    content: `git clone https://github.com/gtm-skills/gtm.git
cd gtm-skills/mcp-server`,
  },
  {
    number: '02',
    title: 'Install dependencies',
    description: 'Installs the MCP SDK and Zod, the only two runtime dependencies the server needs.',
    copyable: 'npm install',
    content: 'npm install',
  },
  {
    number: '03',
    title: 'Build the server',
    description:
      'Compiles TypeScript to dist/index.js. This step is required — dist/ is gitignored, so it does not ship in the repo. Skip it and Claude will have nothing to run.',
    copyable: 'npm run build',
    content: 'npm run build',
  },
  {
    number: '04',
    title: '(Optional) Connect HubSpot CRM',
    description:
      'Set this environment variable to unlock 8 additional tools that make real HubSpot API calls (create/update contacts and deals, log activity). Skip this step and the 10 content-generation tools still work with zero config.',
    copyable: 'export HUBSPOT_API_KEY=pat-na1-xxxxxxxx',
    content: 'export HUBSPOT_API_KEY=pat-na1-xxxxxxxx',
  },
];

const claudeDesktopConfig = `{
  "mcpServers": {
    "gtm": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"]
    }
  }
}`;

const claudeCodeConfig = `{
  "mcpServers": {
    "gtm": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"]
    }
  }
}`;

const walkthroughSteps = [
  {
    icon: Search,
    tool: 'research_company',
    title: 'Research the target account',
    description:
      'Required input: companyName. Optional: industry, focusAreas. In Claude Desktop this renders as an interactive Company Research Card with checklists; in Claude Code you get the same research as structured text.',
    prompt: `Use the research_company tool to research Acme Corp for outreach.
Focus areas: recent funding news, current tech stack, likely pain points.`,
  },
  {
    icon: Mail,
    tool: 'draft_cold_email',
    title: 'Draft the outreach email',
    description:
      'Required input: recipientName, recipientTitle, company, painPoint, yourProduct. Optional: signal (a trigger event) and tone. Feed it what research_company just found.',
    prompt: `Use draft_cold_email for:
- Recipient: Sarah Chen, VP of Sales at Acme Corp
- Pain point: manual CRM data entry slowing down the sales team
- Product: AI-powered CRM automation
- Signal: Acme just closed a Series B and is scaling the sales org
- Tone: direct`,
  },
  {
    icon: Shield,
    tool: 'handle_objection',
    title: 'Pre-empt the likely objection',
    description:
      'Required input: objection, context, yourProduct. Optional: competitorMentioned. Use it before the call, not just after — it returns a step-by-step response framework, not just a one-liner.',
    prompt: `Use handle_objection for:
- Objection: "We're happy with our current solution"
- Context: Enterprise deal, they use Salesforce, first outbound touch
- Product: AI-powered CRM automation`,
  },
];

const troubleshooting = [
  {
    title: '"No such tool" or the tools never show up',
    detail:
      'dist/ is in .gitignore — it does not come from git clone, it comes from npm run build. Confirm dist/index.js actually exists in mcp-server/ before touching your Claude config.',
  },
  {
    title: 'You edited the config but nothing changed',
    detail:
      'Claude Desktop reads claude_desktop_config.json on startup only. Fully quit the app (not just close the window) and relaunch it after every config edit.',
  },
  {
    title: 'Relative paths work in Claude Code but not Claude Desktop',
    detail:
      'Claude Desktop does not run from your project folder, so its config needs an absolute path to dist/index.js. Claude Code runs from your repo root, so the relative ./mcp-server/dist/index.js path in .claude/settings.json works there.',
  },
  {
    title: 'HubSpot tools are missing from the tool list',
    detail:
      'The 8 HubSpot tools only register once the server process can see a HUBSPOT_API_KEY environment variable at startup. No key, no HubSpot tools — the 10 content-generation tools are unaffected either way.',
  },
  {
    title: 'Module or syntax errors when the server starts',
    detail:
      'The server is a native ESM package ("type": "module" in package.json). Use a reasonably current Node.js LTS release if node dist/index.js throws ERR_MODULE_NOT_FOUND or similar.',
  },
];

const faqs = [
  {
    question: 'What is MCP (Model Context Protocol), in plain terms?',
    answer:
      'MCP is an open protocol that lets an AI model like Claude call out to external tools and data sources mid-conversation, instead of only generating text. A server process exposes a defined list of tools; Claude Desktop or Claude Code connects to that server locally and can invoke those tools as part of answering you.',
  },
  {
    question: 'Do I need to know how to code to set this up?',
    answer:
      'No. Every step here is a terminal command (git clone, npm install, npm run build) or a JSON config paste. You never write or edit TypeScript to get the server running — you only run the build step that compiles it.',
  },
  {
    question: 'Does this work with both Claude Desktop and Claude Code?',
    answer:
      'Yes, with the same server and dist/index.js build. Claude Desktop additionally renders interactive UIs (an email composer, a company research card, an objection framework, and three others) for six of the tools via MCP Apps. Claude Code gets the same underlying tools as structured text output.',
  },
  {
    question: 'Is the GTM MCP server actually free?',
    answer:
      'Yes. It is MIT-licensed and open source inside the gtm-skills repo, and it runs entirely on your own machine as a local process — there is no hosted service, account, or subscription involved in running it.',
  },
  {
    question: 'Do I need a HubSpot account to use it?',
    answer:
      'No. Ten of the eighteen tools — research, email and LinkedIn drafting, objection handling, discovery questions, competitive analysis — work with zero configuration. The eight HubSpot tools (create/update contacts and deals, log activity, read pipelines) only activate once you set HUBSPOT_API_KEY.',
  },
  {
    question: 'What is the difference between the individual tools and the agentic workflows?',
    answer:
      'Individual tools like research_company or draft_cold_email each handle one task per call. The server also ships six agentic workflows (account_strategy, full_sales_cycle, competitive_deal_workflow, reengagement_workflow, enterprise_expansion, objection_battlecard) that chain several tools together behind a single prompt for an entire motion, from cold research through a multi-touch outreach plan.',
  },
];

const howToSteps = [
  {
    name: 'Clone the repository',
    text: 'Run git clone https://github.com/gtm-skills/gtm.git, then cd into gtm-skills/mcp-server.',
  },
  {
    name: 'Install dependencies',
    text: 'Run npm install inside mcp-server/ to install the MCP SDK and Zod.',
  },
  {
    name: 'Build the server',
    text: 'Run npm run build to compile TypeScript to dist/index.js. This step is required since dist/ is not committed to git.',
  },
  {
    name: 'Optionally connect HubSpot',
    text: 'Set the HUBSPOT_API_KEY environment variable to unlock the 8 HubSpot CRM tools. Skip this to use only the 10 content-generation tools.',
  },
  {
    name: 'Add the server to Claude',
    text: 'Add an mcpServers entry pointing to node and the absolute path to dist/index.js in claude_desktop_config.json for Claude Desktop, or a relative path in .claude/settings.json for Claude Code.',
  },
  {
    name: 'Restart Claude and verify',
    text: 'Fully quit and relaunch Claude Desktop (or restart Claude Code), then ask Claude to use the research_company tool on a real account to confirm the connection works.',
  },
];

export default function BuildAiSdrWithClaudeMcpPage() {
  return (
    <div className="py-12 md:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Guides', url: 'https://gtm-skills.com/guides' },
          {
            name: 'Build an AI SDR with Claude + MCP',
            url: 'https://gtm-skills.com/guides/build-ai-sdr-with-claude-mcp',
          },
        ]}
      />
      <HowToJsonLd
        name="How to Build an AI SDR with Claude + MCP"
        description="Step-by-step setup for the open-source GTM MCP server, connecting Claude Desktop or Claude Code to real sales tools with no programming required."
        steps={howToSteps}
      />
      <FAQJsonLd questions={faqs} />

      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/guides" className="hover:text-foreground transition-colors">
            Guides
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Build an AI SDR with Claude + MCP</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
              Setup Guide
            </Badge>
            <Badge variant="outline" className="border-green-500/30 text-green-400">
              <Plug className="h-3 w-3 mr-1" />
              No-Code
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How to Build an AI SDR with Claude + MCP
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Most &quot;AI SDR&quot; content is theory. This is a real setup guide for a real,
            open-source MCP server — exact commands, exact config, and a walkthrough of using
            actual tools to research an account, draft outreach, and handle an objection.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              <span>~15 minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>18 real tools, zero fabricated steps</span>
            </div>
          </div>
        </div>

        {/* What is MCP */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">What MCP Is, and Why It Matters for Sales</h2>
          <p className="text-muted-foreground mb-4">
            <strong className="text-foreground">Model Context Protocol (MCP)</strong> is an open
            standard that lets an AI model like Claude call out to external tools and data sources
            in the middle of a conversation, instead of only generating text from what it already
            knows. A program called an MCP server exposes a fixed list of tools — each with a name,
            a description, and an input schema — over a local connection. Claude Desktop or Claude
            Code connects to that server as a client, sees the tool list, and can call any of those
            tools when it decides one is useful for what you asked.
          </p>
          <p className="text-muted-foreground mb-4">
            For sales teams this matters because it turns Claude from a chatbot that can{' '}
            <em>talk about</em> a research or drafting task into something that actually runs it.
            Ask a generic LLM to &quot;research Acme Corp,&quot; and it either declines or guesses.
            Ask Claude connected to a sales-specific MCP server, and it calls a{' '}
            <code className="text-cyan-400">research_company</code> tool built to structure exactly
            the fields an SDR needs — pain points, outreach angles, recent signals — every time,
            with a consistent output shape you can act on immediately.
          </p>
          <p className="text-muted-foreground">
            This guide uses the <strong className="text-foreground">GTM MCP Server</strong>, an
            open-source server shipped in this repo with 18 tools purpose-built for sales:
            10 content-generation tools that work out of the box (research, email drafting,
            objection handling, discovery questions, competitive analysis) plus 8 tools with real
            HubSpot CRM API integration. See the{' '}
            <Link href="/free-tools/mcp-server" className="text-cyan-400 hover:text-cyan-300">
              full tool reference and interactive UI details
            </Link>{' '}
            for the complete picture — this guide focuses on getting it running and using it for
            a real prospecting task.
          </p>
        </div>

        {/* Prerequisites */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Prerequisites</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Node.js and npm installed</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The server is a Node/TypeScript project built with npm run build. A current
                  Node LTS version is enough — it runs as native ESM.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Claude Desktop or Claude Code</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Either works. Claude Desktop unlocks interactive UIs for six of the tools; Claude
                  Code runs the same tools as text output from your terminal.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Comfort with a terminal</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You&apos;ll run four commands and paste one JSON block. No programming knowledge
                  required, but you do need to open a terminal.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
              <Database className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">A HubSpot private app key (optional)</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Only needed if you want the 8 tools that write directly to HubSpot. Skip it and
                  the other 10 tools work with no setup.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Step-by-Step Setup</h2>
          <p className="text-muted-foreground mb-8">
            These are the exact commands from the server&apos;s own README — nothing invented.
          </p>
          <div className="space-y-4">
            {installSteps.map((step) => (
              <div key={step.number} className="flex gap-4 p-6 rounded-xl border border-border bg-card">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold">{step.number}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <CopyButton text={step.copyable} label={step.title} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-card rounded-lg p-4">
                    {step.content}
                  </pre>
                </div>
              </div>
            ))}

            {/* Step 5: Claude Desktop config */}
            <div className="flex gap-4 p-6 rounded-xl border border-border bg-card">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <span className="text-cyan-400 font-bold">05</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Add the server to Claude Desktop</h3>
                  <CopyButton text={claudeDesktopConfig} label="Claude Desktop config" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Add this to{' '}
                  <code className="text-cyan-400">
                    ~/Library/Application Support/Claude/claude_desktop_config.json
                  </code>
                  . Replace <code className="text-cyan-400">/absolute/path/to/</code> with the
                  real path where you cloned the repo — Claude Desktop does not run from your
                  project folder, so relative paths silently fail here.
                </p>
                <pre className="text-sm text-foreground whitespace-pre font-mono bg-card rounded-lg p-4 overflow-x-auto">
                  {claudeDesktopConfig}
                </pre>
                <p className="text-sm text-muted-foreground mt-3">
                  Using Claude Code instead? Add this to your project&apos;s{' '}
                  <code className="text-cyan-400">.claude/settings.json</code> — a relative path
                  works there because Claude Code runs from your repo root:
                </p>
                <div className="flex items-center justify-between mt-3 mb-2">
                  <span className="text-xs text-muted-foreground">Claude Code config</span>
                  <CopyButton text={claudeCodeConfig} label="Claude Code config" />
                </div>
                <pre className="text-sm text-foreground whitespace-pre font-mono bg-card rounded-lg p-4 overflow-x-auto">
                  {claudeCodeConfig}
                </pre>
              </div>
            </div>

            {/* Step 6: Restart and verify */}
            <div className="flex gap-4 p-6 rounded-xl border border-border bg-card">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <span className="text-cyan-400 font-bold">06</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Restart Claude and verify the connection</h3>
                  <CopyButton
                    text="Use the research_company tool to research Stripe for potential outreach."
                    label="Verify prompt"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Fully quit Claude Desktop (not just close the window) and relaunch it, since the
                  config is only read on startup. Then start a new conversation and try:
                </p>
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-card rounded-lg p-4">
                  Use the research_company tool to research Stripe for potential outreach.
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Walkthrough */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Using It for a Real Sales Task</h2>
          <p className="text-muted-foreground mb-8">
            Here&apos;s the actual AI SDR motion end to end: research an account, draft outreach
            personalized to that research, then prep for the objection you&apos;ll hear on the
            first call. Each step below is a real tool from the server, with its real required
            inputs.
          </p>
          <div className="space-y-4">
            {walkthroughSteps.map((step, index) => (
              <div key={step.tool} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="h-4 w-4 text-cyan-400" />
                      <h3 className="font-semibold">{step.title}</h3>
                      <Badge variant="outline" className="text-xs font-mono">
                        {step.tool}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Example prompt:</span>
                      <CopyButton text={step.prompt} label={step.tool} />
                    </div>
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono bg-card rounded-lg p-3">
                      {step.prompt}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-card border border-border">
            <div className="flex items-start gap-3">
              <Workflow className="h-5 w-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Closing the loop into your CRM</h4>
                <p className="text-sm text-muted-foreground">
                  If you set <code className="text-cyan-400">HUBSPOT_API_KEY</code> in setup step
                  4, you can extend this same conversation: use{' '}
                  <code className="text-cyan-400">hubspot_create_contact</code> to add Sarah Chen
                  to HubSpot, then <code className="text-cyan-400">hubspot_log_activity</code> to
                  log the email you just sent — all without leaving Claude.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Troubleshooting</h2>
          <div className="space-y-3">
            {troubleshooting.map((item) => (
              <div key={item.title} className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Go Deeper</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/free-tools/mcp-server"
              className="p-4 rounded-xl border border-border bg-card hover:border-cyan-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-cyan-400 transition-colors">
                Full GTM MCP Server Reference
              </h3>
              <p className="text-sm text-muted-foreground">
                All 18 tools, 6 agentic workflows, and interactive UI details
              </p>
            </Link>
            <Link
              href="/developers"
              className="p-4 rounded-xl border border-border bg-card hover:border-cyan-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-cyan-400 transition-colors">
                Developer Docs
              </h3>
              <p className="text-sm text-muted-foreground">
                Build on top of GTM Skills, API access, and integration guides
              </p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">Want This Running in Minutes, Not Hours?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Prospeda ships the same AI-powered sales workflows with CRM integration and enrichment
            already connected — no cloning, building, or config editing required.
          </p>
          <a href="https://prospeda.com" target="_blank" rel="noopener noreferrer">
            <Button className="brand-gradient">
              Try Prospeda Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
