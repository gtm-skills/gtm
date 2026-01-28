<p align="center">
  <img src="public/logo.svg" alt="GTM Skills Logo" width="120" height="120" />
</p>

<h1 align="center">GTM Skills</h1>

<p align="center">
  <strong>2,500+ AI prompts for B2B sales & marketing</strong>
</p>

<p align="center">
  <a href="https://github.com/Prospeda/gtm-skills/stargazers"><img src="https://img.shields.io/github/stars/Prospeda/gtm-skills?style=for-the-badge&logo=github&color=yellow" alt="GitHub Stars"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License: MIT"></a>
  <a href="https://github.com/Prospeda/gtm-skills/blob/main/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge" alt="PRs Welcome"></a>
  <a href="https://gtm-skills.com"><img src="https://img.shields.io/badge/Website-gtm--skills.com-purple?style=for-the-badge" alt="Website"></a>
</p>

<p align="center">
  The most comprehensive open-source library of AI prompts for sales development, account executives, revenue operations, and GTM leaders.<br/>
  <strong>Works with Claude, ChatGPT, Gemini, and any LLM.</strong>
</p>

<p align="center">
  <a href="https://gtm-skills.com"><strong>Browse Prompts</strong></a> &#8226;
  <a href="#-quick-start"><strong>Quick Start</strong></a> &#8226;
  <a href="#-mcp-server"><strong>MCP Server</strong></a> &#8226;
  <a href="#-contributing"><strong>Contributing</strong></a> &#8226;
  <a href="https://prospeda.com"><strong>Powered by Prospeda</strong></a>
</p>

---

## Why GTM Skills?

| Challenge | Solution |
|-----------|----------|
| Generic AI prompts don't understand sales | **2,500+ prompts** built specifically for B2B GTM |
| Scattered resources across the web | **One organized library** by role, industry, workflow |
| Prompts that sound robotic | **Battle-tested templates** that actually convert |
| No structure for complex workflows | **End-to-end playbooks** from cold outreach to close |

---

## Features

- **Agentic BDR Guide** - Learn to build autonomous AI agents for research, personalization, and outbound
- **Role-Based Playbooks** - Tailored prompts for SDRs, AEs, Sales Managers, RevOps, CSMs, and Founders
- **Industry Packs** - Specialized templates for SaaS, FinTech, Healthcare, Manufacturing, and 10+ more
- **Sales Methodologies** - MEDDPICC, SPIN, Challenger, Gap Selling, Value Selling, Sandler frameworks
- **Complete Workflows** - Full-cycle sequences from first touch to signed deal
- **24 Writing Tonalities** - From executive gravitas to casual peer-to-peer
- **Claude Projects** - Ready-to-use system prompts for AI assistants
- **MCP Server** - Native integration with Claude Desktop
- **Signal-Based Targeting** - Prompts triggered by buying signals

---

## What's Inside

### By Role

| Role | Prompts | Description |
|------|---------|-------------|
| [SDR/BDR](/role/sdr.md) | 400+ | Prospecting, cold outreach, qualification |
| [Account Executive](/role/ae) | 500+ | Discovery, demos, proposals, negotiation |
| [Sales Manager](/role/sales-manager) | 200+ | Coaching, forecasting, pipeline review |
| [RevOps](/role/revops) | 300+ | Process optimization, analytics, automation |
| [Customer Success](/role/csm) | 250+ | Onboarding, expansion, retention |
| [Founder/CEO](/role/founder) | 150+ | Strategy, investor updates, hiring |

### By Industry

| Industry | Use Cases |
|----------|-----------|
| [SaaS](/industry/saas.md) | PLG, enterprise sales, usage-based pricing |
| [FinTech](/industry/fintech) | Compliance, security, integration selling |
| [Healthcare](/industry/healthcare) | HIPAA, procurement cycles, clinical workflows |
| [Manufacturing](/industry/manufacturing) | Long sales cycles, technical buyers |
| [Professional Services](/industry/professional-services) | Relationship selling, SOW creation |
| [+ 10 more industries](/industry) | E-commerce, Real Estate, Education... |

### By Workflow

| Workflow | Description |
|----------|-------------|
| [Cold-to-Close](/workflow/cold-to-close) | Full cycle from first touch to signed deal |
| [Discovery Mastery](/workflow/discovery) | MEDDPICC, SPIN, Challenger frameworks |
| [Demo-to-Proposal](/workflow/demo-proposal) | Technical validation to commercial terms |
| [Competitive Displacement](/workflow/competitive) | Win against incumbents |
| [Expansion Playbook](/workflow/expansion) | Land and expand strategies |
| [QBR Excellence](/workflow/qbr) | Quarterly business reviews that drive retention |

### By Methodology

| Methodology | Focus |
|-------------|-------|
| [MEDDPICC](/methodology/meddpicc.md) | Enterprise deal qualification |
| [SPIN Selling](/methodology/spin) | Situation, Problem, Implication, Need-payoff |
| [Challenger Sale](/methodology/challenger) | Teach, tailor, take control |
| [Gap Selling](/methodology/gap-selling) | Current state to future state |
| [Value Selling](/methodology/value-selling) | ROI-focused conversations |
| [Sandler](/methodology/sandler) | Pain, budget, decision process |

---

## Quick Start

### Option 1: Browse Online

Visit **[gtm-skills.com](https://gtm-skills.com)** to search, filter, and copy prompts instantly.

### Option 2: Clone the Repo

```bash
git clone https://github.com/Prospeda/gtm-skills.git
cd gtm-skills

# Browse markdown files directly
ls role/
ls industry/
ls methodology/
```

### Option 3: Use with Claude Projects

1. Go to [claude.ai](https://claude.ai) and navigate to Projects
2. Create a new Project
3. Copy any prompt from this repo into "Custom Instructions"
4. Start chatting with your GTM-optimized Claude

### Option 4: Install the MCP Server

```bash
npx gtm-mcp-server
```

See the [MCP Server section](#-mcp-server) for full installation instructions.

---

## Example Prompts

### SDR Cold Email

```
You are an expert SDR writing a cold email.

Context:
- Target: {{company_name}}, {{industry}}
- Persona: {{title}} responsible for {{responsibilities}}
- Pain point: {{pain_point}}
- Our solution: {{value_prop}}

Write a 3-sentence cold email that:
1. Opens with a specific observation about their business
2. Connects that observation to a problem you solve
3. Ends with a soft CTA (no hard meeting ask)

Tone: Conversational, peer-to-peer, zero fluff
```

### Discovery Call Prep

```
Prepare me for a discovery call with {{company_name}}.

Research their:
1. Recent news, funding, leadership changes
2. Tech stack (check job postings, BuiltWith)
3. Competitors and market position
4. Likely pain points based on company stage

Then generate:
- 5 open-ended discovery questions using SPIN framework
- 3 potential objections and responses
- A hypothesis for their biggest problem I can solve
```

### Competitive Displacement

```
I'm selling against {{competitor}} at {{prospect_company}}.

Help me build a competitive displacement strategy:

1. Identify 3 weaknesses of {{competitor}} that matter to {{buyer_persona}}
2. Create trap-setting questions that expose these weaknesses
3. Draft a "why switch" narrative that doesn't bash the competitor
4. Suggest proof points (case studies, data) that demonstrate our advantage

Be specific and tactical, not generic.
```

[**Browse 2,500+ more prompts**](https://gtm-skills.com)

---

## MCP Server

The GTM MCP Server provides AI-powered sales tools directly in Claude Desktop with interactive UIs.

### Installation

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "gtm": {
      "command": "npx",
      "args": ["gtm-mcp-server"]
    }
  }
}
```

Or install globally:

```bash
npm install -g gtm-mcp-server
```

### Available Tools

| Tool | Description |
|------|-------------|
| `research_company` | Research a company for sales outreach |
| `research_lead` | Research a specific person/lead |
| `draft_cold_email` | Draft personalized cold emails |
| `draft_linkedin_message` | Draft LinkedIn connection messages |
| `handle_objection` | Get strategic objection responses |
| `generate_cold_call_script` | Generate cold call scripts |
| `generate_discovery_questions` | Generate SPIN/MEDDPICC discovery questions |
| `create_follow_up_sequence` | Create multi-touch follow-up sequences |
| `build_value_proposition` | Build tailored value props |
| `analyze_competitor` | Generate competitive positioning |

### Agentic Workflows

| Workflow | Description |
|----------|-------------|
| `account_strategy` | Full account strategy with stakeholder mapping |
| `competitive_deal_workflow` | Complete competitive deal strategy |
| `reengagement_workflow` | Strategy to re-engage stalled opportunities |
| `enterprise_expansion` | Expand within existing customer accounts |
| `full_sales_cycle` | End-to-end sales cycle orchestration |
| `objection_battlecard` | Comprehensive objection handling playbook |

---

## Tonalities

Write in any of **24 professional writing styles** to match your audience and situation:

| Category | Styles |
|----------|--------|
| **Authority** | Executive, Thought Leader, Analyst, Expert |
| **Connection** | Conversational, Friendly, Empathetic, Peer-to-Peer |
| **Persuasion** | Consultative, Challenger, Value-Focused, Urgency |
| **Clarity** | Direct, Concise, Educational, Technical |
| **Tone** | Professional, Casual, Confident, Humble |
| **Energy** | Enthusiastic, Calm, Bold, Measured |

Each tonality includes:
- Detailed writing guidelines
- Example phrases and patterns
- When to use (and when to avoid)
- Before/after examples

---

## Claude Projects

Ready-to-use system prompts for Claude Projects:

| Project | Description |
|---------|-------------|
| [Sales Research Assistant](/projects/research-assistant.md) | Research any company or contact on demand |
| [Email Writing Partner](/projects/email-writer.md) | Write all types of sales emails |
| [Objection Library](/projects/objection-handler.md) | Handle any objection instantly |
| Call Prep Companion | Prepare for any call in 5 minutes |
| Proposal Generator | Create compelling proposals |
| LinkedIn Content Creator | Build authority with content |
| Competitive Intel Analyst | Battle cards and positioning |
| Deal Strategy Advisor | Coaching on any deal |
| Territory Planner | Plan and optimize territory |
| Revenue Forecaster | Build accurate forecasts |

---

## Categories Overview

```
gtm-skills/
├── role/                # Role-based playbooks (SDR, AE, Manager, RevOps, CSM, Founder)
├── industry/            # Industry-specific prompts (SaaS, FinTech, Healthcare, etc.)
├── workflow/            # End-to-end workflows (Cold-to-Close, Discovery, Expansion)
├── methodology/         # Sales methodologies (MEDDPICC, SPIN, Challenger, etc.)
├── templates/           # Ready-to-use templates (emails, LinkedIn, call scripts)
├── projects/            # Claude Project system prompts
├── signals/             # Signal-based targeting prompts
├── mcp-server/          # MCP Server for Claude Desktop
├── objections/          # Objection handling library
├── competitive/         # Competitive intelligence prompts
├── discovery/           # Discovery call frameworks
├── proposals/           # Proposal and pricing prompts
├── research/            # Account and contact research
├── linkedin/            # LinkedIn-specific content
├── outreach/            # Multi-channel outreach sequences
├── follow-up/           # Follow-up strategies
├── meeting-prep/        # Pre-call preparation
├── icp/                 # ICP definition and targeting
└── advanced/            # Advanced techniques and strategies
```

---

## Who Uses GTM Skills

Used by sales teams at companies like:

- High-growth startups scaling their outbound
- Enterprise teams standardizing their AI usage
- Solo founders doing their own sales
- Revenue operations building prompt libraries
- Sales enablement teams training reps

> "GTM Skills cut our prompt engineering time by 80%. We just copy, customize, and send."
> — *Sales Leader, Series B SaaS*

---

## Want More Power?

**GTM Skills** is the open-source foundation.

**[Prospeda](https://prospeda.com)** is the full platform:

- AI agents that run your entire sales workflow
- CRM integration with automatic data enrichment
- Personalized sequences at scale
- Analytics and coaching insights

[**Try Prospeda Free**](https://prospeda.com)

---

## Contributing

We welcome contributions! GTM Skills is better when the community helps.

### Ways to Contribute

- **Add prompts** - Submit your battle-tested templates
- **Fix errors** - Typos, outdated info, broken links
- **Suggest categories** - New industries, roles, workflows
- **Share feedback** - What's missing? What could be better?
- **Star the repo** - Help others discover GTM Skills

### Quick Contribution

1. Fork the repository
2. Create your branch: `git checkout -b add-prompt-description`
3. Add your prompt following our [template](./CONTRIBUTING.md#prompt-template)
4. Commit: `git commit -m "Add: [description]"`
5. Push and open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Prospeda/gtm-skills&type=Date)](https://star-history.com/#Prospeda/gtm-skills&Date)

---

## License

MIT License - use these prompts however you want, commercially or personally.

See [LICENSE](./LICENSE) for details.

---

## Links

| Resource | Link |
|----------|------|
| Website | [gtm-skills.com](https://gtm-skills.com) |
| Full Platform | [prospeda.com](https://prospeda.com) |
| Twitter | [@prospaboricua](https://twitter.com/prospaboricua) |
| LinkedIn | [Prospeda](https://linkedin.com/company/prospeda) |
| Email | hello@gtm-skills.com |

---

<p align="center">
  <strong>If GTM Skills helps you close deals, give it a star!</strong>
  <br><br>
  <a href="https://github.com/Prospeda/gtm-skills/stargazers">
    <img src="https://img.shields.io/github/stars/Prospeda/gtm-skills?style=social" alt="Star on GitHub">
  </a>
  <br><br>
  Built with care by <a href="https://prospeda.com">Prospeda</a>
</p>
