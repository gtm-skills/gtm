import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import {
  ArrowRight,
  ChevronRight,
  Terminal,
  Search,
  Mail,
  Phone,
  MessageSquare,
  Shield,
  Users,
  LineChart,
  Workflow,
  CheckCircle2,
  Github,
  Zap,
  Sparkles,
  Palette,
  Clock,
  LayoutGrid,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GTM MCP Server | AI Sales Tools for Claude Code & Desktop',
  description: 'Add 10 AI-powered sales tools + 6 interactive UIs to Claude. Research companies, draft cold emails, handle objections with MCP Apps support.',
  openGraph: {
    title: 'GTM MCP Server: Sales Tools with Interactive UIs',
    description: 'Install the GTM MCP Server and get AI-powered sales tools with rich interactive interfaces in Claude Desktop.',
  },
};

const interactiveUIs = [
  {
    icon: Mail,
    name: 'Email Composer',
    description: 'Interactive email editor with tone selection, live preview, and one-click copy',
    tool: 'draft_cold_email',
  },
  {
    icon: MessageSquare,
    name: 'LinkedIn Message Card',
    description: 'Message builder with character count and connection type tabs',
    tool: 'draft_linkedin_message',
  },
  {
    icon: LayoutGrid,
    name: 'Company Research Card',
    description: 'Structured company data with expandable sections and checklists',
    tool: 'research_company',
  },
  {
    icon: Users,
    name: 'Lead Profile',
    description: 'Lead profile with personalization hooks and social links',
    tool: 'research_lead',
  },
  {
    icon: Shield,
    name: 'Objection Handler',
    description: '4-step objection response framework with practice mode',
    tool: 'handle_objection',
  },
  {
    icon: Clock,
    name: 'Sequence Timeline',
    description: 'Visual timeline of follow-up emails with copy per step',
    tool: 'create_follow_up_sequence',
  },
];

const tools = [
  {
    icon: Search,
    name: 'research_company',
    description: 'Research a company for sales outreach - finds key info, news, pain points, and outreach angles',
    hasUI: true,
  },
  {
    icon: Users,
    name: 'research_lead',
    description: 'Research a specific person/lead - background, interests, talking points',
  },
  {
    icon: Mail,
    name: 'draft_cold_email',
    description: 'Draft personalized cold emails with multiple versions and tones',
  },
  {
    icon: MessageSquare,
    name: 'draft_linkedin_message',
    description: 'Draft LinkedIn connection requests and messages',
  },
  {
    icon: Shield,
    name: 'handle_objection',
    description: 'Get strategic responses to sales objections',
  },
  {
    icon: Phone,
    name: 'generate_cold_call_script',
    description: 'Generate cold call scripts with openers and objection handling',
  },
  {
    icon: Search,
    name: 'generate_discovery_questions',
    description: 'Generate discovery questions tailored to prospect and deal stage',
  },
  {
    icon: Mail,
    name: 'create_follow_up_sequence',
    description: 'Create follow-up email sequences for re-engagement',
  },
  {
    icon: Zap,
    name: 'build_value_proposition',
    description: 'Build tailored value propositions for different personas',
  },
  {
    icon: LineChart,
    name: 'analyze_competitor',
    description: 'Analyze a competitor and generate competitive positioning',
  },
];

const workflows = [
  {
    name: 'prospecting_workflow',
    description: 'Complete prospecting package: research, contacts, email, LinkedIn, discovery questions',
    badge: 'Multi-step',
  },
  {
    name: 'account_strategy',
    description: 'Full account strategy with stakeholder mapping and engagement plan',
    badge: 'Enterprise',
  },
  {
    name: 'competitive_deal_workflow',
    description: 'Competitive intelligence, positioning, landmines, and win plan',
    badge: 'Competitive',
  },
  {
    name: 'full_sales_cycle',
    description: 'End-to-end orchestration from cold outreach to close',
    badge: 'Complete',
  },
  {
    name: 'reengagement_workflow',
    description: 'Re-engage stalled deals with fresh angles and sequences',
    badge: 'Win-back',
  },
  {
    name: 'objection_battlecard',
    description: 'Comprehensive responses for 24+ common objections',
    badge: 'Objections',
  },
];

const installSteps = [
  {
    number: '01',
    title: 'Clone the Repository',
    content: `git clone https://github.com/Prospeda/gtm-skills.git
cd gtm-skills/mcp-server`,
    copyable: `git clone https://github.com/Prospeda/gtm-skills.git && cd gtm-skills/mcp-server`,
  },
  {
    number: '02',
    title: 'Install Dependencies',
    content: `npm install`,
    copyable: 'npm install',
  },
  {
    number: '03',
    title: 'Build the Server',
    content: `npm run build`,
    copyable: 'npm run build',
  },
];

const claudeCodeConfig = `{
  "mcpServers": {
    "gtm": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"]
    }
  }
}`;

const claudeDesktopConfig = `{
  "mcpServers": {
    "gtm": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"]
    }
  }
}`;

const usageExamples = [
  {
    title: 'Research a Company',
    prompt: 'Use the research_company tool to research Stripe for potential outreach to their engineering team.',
  },
  {
    title: 'Draft a Cold Email',
    prompt: `Use draft_cold_email for:
- Recipient: Sarah Chen, VP of Sales at Acme Corp
- Pain point: manual CRM data entry
- Product: AI-powered CRM automation
- Tone: professional`,
  },
  {
    title: 'Handle an Objection',
    prompt: `Use handle_objection for:
- Objection: "We're happy with our current solution"
- Context: Enterprise deal, they use Salesforce
- Product: Next-gen sales intelligence platform`,
  },
  {
    title: 'Run Full Prospecting Workflow',
    prompt: `Run the prospecting_workflow prompt for:
- Company: Notion
- Persona: VP of Revenue Operations
- Product: Revenue intelligence platform`,
  },
  {
    title: 'Competitive Deal Strategy',
    prompt: `Run the competitive_deal_workflow for:
- Company: TechCorp
- Competitor: Salesforce
- Product: Modern CRM platform
- Deal stage: Evaluation`,
  },
];

export default function MCPServerPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/free-tools" className="hover:text-foreground transition-colors">
            Free Tools
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">MCP Server</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
              Model Context Protocol
            </Badge>
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              <Sparkles className="h-3 w-3 mr-1" />
              MCP Apps Support
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            GTM MCP Server
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Add 10 AI-powered sales tools + 6 interactive UIs directly to Claude.
            Research companies, draft outreach, handle objections - with rich visual interfaces.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="h-5 w-5" />
              <span>Claude Code & Desktop</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span>6 Interactive UIs</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Workflow className="h-5 w-5" />
              <span>6 Agentic Workflows</span>
            </div>
            <a
              href="https://github.com/Prospeda/gtm-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
            >
              <Github className="h-5 w-5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        {/* MCP Apps Interactive UIs */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">Interactive UIs</h2>
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              MCP Apps
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            When used with Claude Desktop, these tools display rich interactive interfaces directly in your conversation.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interactiveUIs.map((ui) => (
              <div
                key={ui.name}
                className="p-4 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <ui.icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm">{ui.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{ui.description}</p>
                    <code className="text-[10px] text-amber-400/70 mt-2 block">{ui.tool}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex items-start gap-3">
              <Palette className="h-5 w-5 text-amber-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">How it works</h4>
                <p className="text-sm text-muted-foreground">
                  When you call a tool like <code className="text-amber-400">draft_cold_email</code> in Claude Desktop,
                  an interactive composer UI appears with tone selection, live preview, and copy buttons.
                  In Claude Code, you get the same great text output - the UIs are a bonus for Desktop users.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Overview */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">10 Sales Tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex items-start gap-3">
                  <tool.icon className="h-5 w-5 text-cyan-400 mt-0.5" />
                  <div>
                    <code className="text-sm font-semibold text-foreground">{tool.name}</code>
                    <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agentic Workflows */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Agentic Workflows</h2>
          <p className="text-muted-foreground mb-6">
            Multi-step workflows that orchestrate tools together for complete sales motions.
          </p>
          <div className="space-y-3">
            {workflows.map((workflow) => (
              <div
                key={workflow.name}
                className="p-4 rounded-xl border border-border bg-card flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-semibold text-foreground">{workflow.name}</code>
                    <Badge variant="secondary" className="text-xs">{workflow.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{workflow.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Guide */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Installation</h2>
          <div className="space-y-4">
            {installSteps.map((step) => (
              <div
                key={step.number}
                className="flex gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold">{step.number}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <CopyButton text={step.copyable} />
                  </div>
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-zinc-900 rounded-lg p-4">
                    {step.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Configuration</h2>

          {/* Claude Code */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">For Claude Code</h3>
              <CopyButton text={claudeCodeConfig} />
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Add to your project&apos;s <code className="text-cyan-400">.claude/settings.json</code>:
            </p>
            <div className="bg-zinc-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre">
                {claudeCodeConfig}
              </pre>
            </div>
          </div>

          {/* Claude Desktop */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">For Claude Desktop</h3>
              <CopyButton text={claudeDesktopConfig} />
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Add to <code className="text-cyan-400">~/Library/Application Support/Claude/claude_desktop_config.json</code>:
            </p>
            <div className="bg-zinc-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre">
                {claudeDesktopConfig}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Replace <code>/absolute/path/to/</code> with the actual path where you cloned the repo.
            </p>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Usage Examples</h2>
          <div className="space-y-4">
            {usageExamples.map((example) => (
              <div
                key={example.title}
                className="p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-cyan-400">{example.title}</h3>
                  <CopyButton text={example.prompt} />
                </div>
                <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">
                  {example.prompt}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Pro Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">Best Practices</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Provide detailed context for better outputs</li>
                    <li>Use workflows for complex multi-step tasks</li>
                    <li>Chain tools together for custom workflows</li>
                    <li>Review and personalize before sending</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
              <div className="flex items-start gap-2">
                <Zap className="h-5 w-5 text-cyan-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">Power User Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Combine with web search for real-time research</li>
                    <li>Use full_sales_cycle for new accounts</li>
                    <li>Run competitive_deal_workflow in bake-offs</li>
                    <li>Create custom prompts combining tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is MCP */}
        <div className="mb-16 p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-bold mb-4">What is MCP?</h2>
          <p className="text-muted-foreground mb-4">
            <strong className="text-foreground">Model Context Protocol (MCP)</strong> is an open standard
            that allows AI models to connect to external tools and data sources. It&apos;s how Claude Code
            and Claude Desktop can be extended with custom capabilities.
          </p>
          <p className="text-muted-foreground">
            The GTM MCP Server adds sales-specific tools that help you research, write, and strategize
            without leaving your development environment.
          </p>
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mt-4"
          >
            Learn more about MCP
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-zinc-900">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want GTM Automation at Scale?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda provides the same AI-powered sales tools with CRM integration,
            lead enrichment, and automated sequences. No setup required.
          </p>
          <a href="https://github.com/Prospeda/gtm-skills" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Try Prospeda Free
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
