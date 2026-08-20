// Tutorials: hand-authored, step-by-step guides for the real tools this repo ships.
// Every command/config/prompt below is sourced directly from openclaw-skills/, mcp-server/,
// and the existing /free-tools pages — nothing here is templated or invented.

export interface TutorialCodeBlock {
  label?: string;
  language?: string;
  code: string;
}

export interface TutorialStep {
  title: string;
  body: string;
  code?: TutorialCodeBlock[];
}

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  tags: string[];
  intro: string;
  prerequisites: string[];
  steps: TutorialStep[];
  wrapUp: string;
}

export const tutorials: Tutorial[] = [
  // ────────────────────────────────────────────────────────────────
  // 1. OpenClaw Agentic Sales Team
  // ────────────────────────────────────────────────────────────────
  {
    slug: 'openclaw-sales-agents',
    title: 'Build an Agentic Sales Team with OpenClaw',
    description:
      'Install the GTM Skills agents and start running AI-powered research, outreach, and deal strategy—all from your terminal.',
    difficulty: 'Beginner',
    time: '15 min',
    tags: ['OpenClaw', 'Agentic', 'Open Source'],
    intro:
      'The `openclaw-skills/` directory in this repo ships a complete, five-agent sales fleet built on OpenClaw: Mission Control, Scout, Writer, Rep, and Closer. Each agent is just a personality file (`SKILL.md`) plus a playbook (`STRATEGY-*.md`) — no custom backend, no database. They wake up on a cron heartbeat, read shared memory files, do their job, and hand off work to the next agent through a single `WORKING.md` file. This tutorial deploys the real fleet from this repo, not a simplified demo.',
    prerequisites: [
      'A server (or your local machine) to run the OpenClaw gateway on',
      'An Anthropic API key (ANTHROPIC_API_KEY)',
      'A HubSpot private app token if you want CRM logging (HUBSPOT_API_KEY) — optional',
      'A Telegram bot token if you want to chat with the fleet from Telegram — optional',
    ],
    steps: [
      {
        title: 'Understand what you\'re deploying',
        body: 'Before installing anything, know the shape of the system. It\'s not one assistant — it\'s five specialized agents that pass work to each other through files. Scout researches, Writer drafts copy, Rep runs outreach, Closer manages deals, and Mission Control coordinates the fleet and reviews security. Every agent wakes on a staggered heartbeat so they don\'t collide, checks its checklist, does real work or replies HEARTBEAT_OK, and goes back to sleep. Cost is roughly $15-30/month to run all five agents 24/7 (mostly Haiku-tier API usage).',
        code: [
          {
            label: 'Fleet architecture',
            language: 'text',
            code: `┌─────────────────────────────────────────────────────────────────┐
│                      MISSION CONTROL                             │
│                    (Chief of Staff)                              │
└─────────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
     ┌──────────┐      ┌──────────┐      ┌──────────┐
     │  SCOUT   │ ───▶ │  WRITER  │ ───▶ │   REP    │ ───▶ CLOSER
     │ Research │      │   Copy   │      │ Outreach │      Deals
     └──────────┘      └──────────┘      └──────────┘

Heartbeats (staggered so agents don't collide):
:00,:30  Mission Control     :00,:15,:30,:45  Scout
:02,:17,:32,:47  Writer      :04,:19,:34,:49  Rep
:06,:21,:36,:51  Closer`,
          },
        ],
      },
      {
        title: 'Clone the repo and inspect the agent skills',
        body: 'Each agent\'s personality lives in `openclaw-skills/<agent>/SKILL.md`. Open `scout/SKILL.md` and you\'ll see it\'s not a generic prompt — it defines Scout\'s exact response format (a research brief with SIGNALS, KEY CONTACTS, and a "MY TAKE" opinion section), its golden rule ("never end a response without a question or suggestion"), and how it hands work to Rep. `writer/`, `rep/`, and `closer/` follow the same pattern for their respective roles.',
        code: [
          {
            label: 'Clone and explore',
            language: 'bash',
            code: `git clone https://github.com/gtm-skills/gtm.git
cd gtm/openclaw-skills
ls
# closer/  deployment/  mission-control/  rep/  scout/  writer/`,
          },
        ],
      },
      {
        title: 'Deploy the fleet with the setup script',
        body: 'The `deployment/setup.sh` script does the real work: it creates the workspace, copies every agent\'s `SKILL.md` into place (renamed to `SCOUT.md`, `WRITER.md`, etc.), copies the shared memory files (`MEMORY.md`, `HEARTBEAT.md`, `WORKING.md`, `PROGRESS.md`) and strategy playbooks, then registers five cron heartbeat jobs with `clawdbot` — one per agent plus a nightly daily-standup job. Run it against `localhost` to set up locally, or pass a server IP to deploy remotely over SSH.',
        code: [
          {
            label: 'Run the deployment script',
            language: 'bash',
            code: `cd deployment
./setup.sh your-server-ip
# or, to set up locally:
./setup.sh localhost`,
          },
        ],
      },
      {
        title: 'Configure credentials and lock down access',
        body: 'The setup script copies `config.template.json` conventions into `~/.clawdbot/clawdbot.json`. Set your model aliases, then lock the Telegram channel down before you turn anything on: restrict `allowedGroups` and `allowedUsers` to your own IDs, keep `groupPolicy` as `allowlist`, and set `mentionOnly: true` so the bot only responds when @mentioned. API keys go in environment variables, never in the config file itself.',
        code: [
          {
            label: 'Set environment variables',
            language: 'bash',
            code: `export ANTHROPIC_API_KEY=sk-ant-...
export HUBSPOT_API_KEY=pat-na1-...   # optional, enables CRM logging`,
          },
          {
            label: '~/.clawdbot/clawdbot.json — security-relevant section',
            language: 'json',
            code: `{
  "channels": {
    "telegram": {
      "botToken": "YOUR_BOT_TOKEN",
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist",
      "allowedGroups": ["YOUR_GROUP_CHAT_ID"],
      "allowedUsers": ["YOUR_USER_ID"],
      "mentionOnly": true,
      "streamMode": "partial"
    }
  }
}`,
          },
        ],
      },
      {
        title: 'Start the gateway and verify the heartbeats',
        body: 'Once credentials are set, start the OpenClaw gateway and confirm all six cron jobs registered correctly: `mission-control-heartbeat`, `scout-heartbeat`, `writer-heartbeat`, `rep-heartbeat`, `closer-heartbeat`, and `daily-standup` (which fires nightly at 23:30 and compiles a report from `WORKING.md`, `PROGRESS.md`, and the day\'s memory file).',
        code: [
          {
            label: 'Start and verify',
            language: 'bash',
            code: `clawdbot gateway start
clawdbot cron list`,
          },
        ],
      },
      {
        title: 'Talk to your agents like teammates',
        body: 'Once the fleet is running, address agents directly — they\'re designed to ask clarifying questions before acting, not execute blindly. Scout will push back for scope ("What size? What stage?") before returning a list. Every response ends with a question or suggested next step; that\'s a deliberate rule baked into each agent\'s SKILL.md, not a formatting accident.',
        code: [
          {
            label: 'Example conversation',
            language: 'text',
            code: `You: "Find me SaaS companies hiring SDRs"
Scout: "On it. What size? What stage? VP level or Director?"

You: "Series B, VP of Sales"
Scout: "Found 10. Top pick is Sarah Chen at Acme - just raised $25M.
        Want me to brief Writer?"

You → Writer: "Email Sarah"
Writer: "Got the briefing. What tone - direct or challenger?"

[Email written, sent by Rep, meeting booked]

You → Closer: "She wants a proposal"
Closer: "Great. Who else needs to approve? What's the main pain?"`,
          },
        ],
      },
      {
        title: 'Understand the handoff system',
        body: 'There\'s no database. All coordination happens through `WORKING.md` in the shared workspace: Scout writes a research briefing there, Writer reads it and drafts copy, Rep reads the copy and executes outreach, and Closer picks up qualified deals. Because it\'s a plain file, you can read it, edit it, or intervene manually at any point — the fleet is transparent by design, not a black box.',
      },
      {
        title: 'Monitor, iterate, and stay secure',
        body: 'Check `PROGRESS.md` for metrics and `memory/YYYY-MM-DD.md` for daily logs. Mission Control reviews changes and enforces the security model on every heartbeat: workspace isolation (agents only touch their own files), no sudo or system access, and scoped permissions throughout. Read `deployment/ARCHITECTURE.md` in the repo for the full technical breakdown if you want to extend the fleet with a new agent role.',
      },
    ],
    wrapUp:
      'You now have a 24/7, five-agent sales fleet running from files you can read and edit directly — no proprietary platform, no black-box automation. From here, try adding a sixth agent for a workflow this fleet doesn\'t cover yet, or wire in the GTM MCP Server tools below so Writer and Rep can call HubSpot directly.',
  },

  // ────────────────────────────────────────────────────────────────
  // 2. GTM MCP Server
  // ────────────────────────────────────────────────────────────────
  {
    slug: 'mcp-server-sales',
    title: 'Build a Sales MCP Server for Claude',
    description:
      'Create a Model Context Protocol server that gives Claude access to your sales tools, CRM data, and custom prompts.',
    difficulty: 'Intermediate',
    time: '45 min',
    tags: ['MCP', 'Claude', 'Developer'],
    intro:
      'The `mcp-server/` package in this repo is a real, working Model Context Protocol server — `gtm-mcp-server` — that adds 18 sales tools to Claude Code and Claude Desktop. Ten are content-generation tools (research, drafting, objection handling), eight make real HTTP calls into HubSpot\'s CRM API when you set `HUBSPOT_API_KEY`, and on top of the tools there are 3 basic prompts and 6 multi-step "agentic workflows" that chain tools together. This tutorial builds it from source and wires it into both Claude clients.',
    prerequisites: [
      'Node.js and npm installed',
      'Claude Code or Claude Desktop',
      'A HubSpot private app token if you want the CRM tools (optional — content-generation tools work without it)',
    ],
    steps: [
      {
        title: 'Know what you\'re building',
        body: 'The server is a single TypeScript entry point (`src/index.ts`) plus `src/integrations/hubspot.ts` for the real API calls and `src/ui/` for six MCP Apps interactive UIs (email composer, LinkedIn message card, research card, lead profile, objection handler, sequence timeline) that render in Claude Desktop. It\'s built with `@modelcontextprotocol/sdk` and `zod` for schema validation, compiled with `tsc`, and run with plain `node`.',
      },
      {
        title: 'Clone the repo and install dependencies',
        body: 'The MCP server lives inside the monorepo at `mcp-server/`. Clone the repo, move into that directory, and install with npm.',
        code: [
          {
            label: 'Clone and install',
            language: 'bash',
            code: `git clone https://github.com/gtm-skills/gtm.git
cd gtm-skills/mcp-server
npm install`,
          },
        ],
      },
      {
        title: 'Build the server',
        body: 'Compile TypeScript to `dist/index.js`. This is the file both Claude Code and Claude Desktop will launch as a subprocess. If you\'re actively editing the server, `npm run dev` runs it directly with `tsx` instead of a compile step.',
        code: [
          {
            label: 'Build for production',
            language: 'bash',
            code: 'npm run build',
          },
          {
            label: 'Or run in dev mode while editing',
            language: 'bash',
            code: 'npm run dev',
          },
        ],
      },
      {
        title: 'Connect HubSpot for the real CRM tools (optional)',
        body: 'Without a HubSpot key, you still get all 10 content-generation tools. Setting `HUBSPOT_API_KEY` unlocks 8 tools that hit HubSpot\'s live API: `hubspot_create_contact`, `hubspot_update_contact`, `hubspot_get_contact`, `hubspot_search_contacts`, `hubspot_create_deal`, `hubspot_update_deal`, `hubspot_log_activity`, and `hubspot_get_pipelines`. Generate the token from HubSpot Settings → Integrations → Private Apps, granting `crm.objects.contacts`, `crm.objects.deals`, and `crm.objects.companies` scopes.',
        code: [
          {
            label: 'Set the HubSpot key',
            language: 'bash',
            code: 'export HUBSPOT_API_KEY=pat-na1-xxxxxxxx',
          },
        ],
      },
      {
        title: 'Register the server with Claude Code',
        body: 'Add the server to your project\'s `.claude/settings.json`. Claude Code will spawn it as a subprocess and expose all 18 tools plus the prompts and workflows in-session.',
        code: [
          {
            label: '.claude/settings.json',
            language: 'json',
            code: `{
  "mcpServers": {
    "gtm": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"]
    }
  }
}`,
          },
        ],
      },
      {
        title: 'Register the server with Claude Desktop',
        body: 'For Claude Desktop, edit the app\'s config file directly and use an absolute path to `dist/index.js` (relative paths won\'t resolve the same way outside a project directory). This is also what unlocks the MCP Apps interactive UIs — Claude Code gets the same tool output as text.',
        code: [
          {
            label: '~/Library/Application Support/Claude/claude_desktop_config.json',
            language: 'json',
            code: `{
  "mcpServers": {
    "gtm": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"]
    }
  }
}`,
          },
        ],
      },
      {
        title: 'Try a content-generation tool',
        body: 'Restart Claude and ask it to use one of the research or drafting tools by name. Claude will call the tool, and in Desktop you\'ll see the matching interactive UI (a company research card with expandable sections and checklists, in this case).',
        code: [
          {
            label: 'Example prompt',
            language: 'text',
            code: 'Use the research_company tool to research Stripe for potential outreach to their engineering team.',
          },
        ],
      },
      {
        title: 'Try a HubSpot-backed tool',
        body: 'If you set `HUBSPOT_API_KEY`, these tools make real writes to your CRM — verify in HubSpot after running one that the contact or activity actually landed.',
        code: [
          {
            label: 'Create a contact',
            language: 'text',
            code: `Use hubspot_create_contact to add:
- Email: sarah.chen@acme.com
- First name: Sarah
- Last name: Chen
- Company: Acme Corp
- Job title: VP of Sales`,
          },
          {
            label: 'Log an activity',
            language: 'text',
            code: `Use hubspot_log_activity:
- Contact ID: 12345
- Activity type: email
- Subject: Follow-up on demo
- Body: Sent proposal as discussed. Following up next week.`,
          },
        ],
      },
      {
        title: 'Chain tools with an agentic workflow',
        body: 'Beyond individual tools, the server ships 6 multi-step workflows that orchestrate several tools in sequence: `prospecting_workflow`, `account_strategy`, `competitive_deal_workflow`, `reengagement_workflow`, `enterprise_expansion`, and `full_sales_cycle`. Invoke one by describing the account — Claude runs research, drafting, and (if HubSpot is connected) CRM logging as one pass.',
        code: [
          {
            label: 'Run a full sales cycle',
            language: 'text',
            code: `Run the full_sales_cycle workflow for:
- Company: Enterprise Co
- Persona: Head of Operations
- Product: Workflow automation platform
- Pain point: Manual data entry eating up team time`,
          },
        ],
      },
      {
        title: 'Know what\'s next on the roadmap',
        body: 'HubSpot is the only live integration today. Apollo enrichment is next, with Gmail/Outlook sending, Calendly/Cal.com booking, and a direct OpenClaw connection planned after that — so this server and the OpenClaw fleet tutorial above are converging toward the same end state: research, write, send, book, and track without leaving Claude or the terminal.',
      },
    ],
    wrapUp:
      'You now have a working MCP server exposing 18 sales tools, real HubSpot writes, and 6 chainable workflows to both Claude Code and Claude Desktop. Pair it with Clay (next tutorial) for live data enrichment the content-generation tools can\'t provide on their own.',
  },

  // ────────────────────────────────────────────────────────────────
  // 3. Clay Research Agent
  // ────────────────────────────────────────────────────────────────
  {
    slug: 'clay-research-agent',
    title: 'Automate Account Research with Clay',
    description:
      'Build an automated research pipeline that enriches leads with company data, news, and buying signals.',
    difficulty: 'Beginner',
    time: '20 min',
    tags: ['Clay', 'Research', 'Enrichment'],
    intro:
      'Clay is a connected app inside Claude that gives it access to live enrichment data — verified emails, technographics, funding data, and employee counts pulled from 100+ sources — instead of the frameworks and templates the GTM MCP Server\'s content-generation tools produce on their own. This tutorial sets up the Clay connection and runs the three core research workflows: account research, contact enrichment, and ICP list building.',
    prerequisites: [
      'A Claude Pro, Max, Team, or Enterprise account (connected apps are not available on the free tier)',
      'A Clay account (clay.com has a free tier)',
    ],
    steps: [
      {
        title: 'Know what Clay adds to Claude',
        body: 'Four capabilities matter for GTM work: lead research (ask Claude to research a company and find the right contacts using live Clay data), company enrichment (pull technographics, funding, and headcount), contact discovery (find decision-makers with verified emails and recent job changes), and list building (assemble targeted prospect lists against ICP criteria). The key distinction from the GTM MCP Server: Clay returns real, current data — the MCP server\'s tools return research frameworks and checklists for you to fill in manually.',
      },
      {
        title: 'Create a Clay account',
        body: 'Sign up at clay.com. The free tier is enough to follow this tutorial and test the workflows below before deciding whether to upgrade for volume.',
        code: [
          {
            label: 'Sign up',
            language: 'text',
            code: 'https://clay.com',
          },
        ],
      },
      {
        title: 'Enable Clay in Claude\'s connected apps',
        body: 'Clay\'s interactive tools are available for Pro, Max, Team, and Enterprise Claude users. Open your connected apps settings in Claude and enable Clay — once connected, Claude uses it automatically whenever a request needs live data enrichment, without you needing to name the tool explicitly.',
      },
      {
        title: 'Run the account research workflow',
        body: 'Give Claude a target company and what you\'re selling. It will use Clay to pull a company overview, find contacts in the department you specify, surface recent trigger events, and identify pain points to use in outreach.',
        code: [
          {
            label: 'Example prompt',
            language: 'text',
            code: `Research Stripe using Clay. I need:
1. Company overview (size, funding, tech stack)
2. Key contacts in engineering leadership
3. Recent news or trigger events
4. Pain points I can use for outreach

I'm selling developer tools.`,
          },
        ],
      },
      {
        title: 'Run the contact enrichment workflow',
        body: 'Have a raw list of names and companies — from a conference, a webinar, or a CSV export? Hand it to Claude directly. Clay enriches each one with a verified email, current title, and LinkedIn, and Claude can draft a personalized follow-up for each contact in the same pass.',
        code: [
          {
            label: 'Example prompt',
            language: 'text',
            code: `I have these prospects from a conference:
- John Smith, Acme Corp
- Sarah Chen, TechStartup Inc
- Mike Johnson, Enterprise Co

Use Clay to enrich these contacts. Get their emails, current titles, and company info. Then draft a personalized follow-up for each.`,
          },
        ],
      },
      {
        title: 'Run the ICP list-building workflow',
        body: 'Starting from zero? Describe your ideal customer profile and let Clay search and filter companies against it, then find and enrich the best contact at each match.',
        code: [
          {
            label: 'Example prompt',
            language: 'text',
            code: `Build a prospect list using Clay:

ICP: Series B-C SaaS companies, 100-500 employees, using AWS
Target persona: VP of Engineering or CTO
Location: San Francisco Bay Area

Find 25 companies matching this criteria, then get the best contact at each.`,
          },
        ],
      },
      {
        title: 'Know when to reach for the GTM MCP Server instead',
        body: 'Clay and the GTM MCP Server (previous tutorial) are complementary, not competing. Use Clay when you need live, verified data at volume — real-time enrichment, automated prospecting, verified emails. Use the MCP Server when you need outreach drafting, objection handling, discovery questions, or a full multi-step sales workflow — none of which require paid data access. Running both, Clay finds and verifies who to talk to; the MCP Server (or OpenClaw\'s Writer and Rep agents) turns that into outreach.',
      },
      {
        title: 'Turn research into outreach',
        body: 'Once Clay has enriched a list, feed the results straight into whichever execution layer you\'ve set up: ask the GTM MCP Server\'s `draft_cold_email` tool to write against the enriched contact data, or hand the briefing to OpenClaw\'s Scout → Writer → Rep handoff chain if you\'re running the full agent fleet from the first tutorial.',
      },
    ],
    wrapUp:
      'You can now pull live company and contact data into Claude through Clay and route it into either the GTM MCP Server or the OpenClaw agent fleet for drafting and outreach. Together, the three tutorials in this series form a complete research-to-outreach pipeline: OpenClaw for autonomous 24/7 execution, the MCP Server for tool-calling inside Claude, and Clay for the live data both depend on.',
  },
];

export function getAllTutorialSlugs(): string[] {
  return tutorials.map((t) => t.slug);
}

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find((t) => t.slug === slug);
}
