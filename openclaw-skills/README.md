# GTM Skills Agents

3 agents. 3 channels. Talk to them like teammates.

## The Team

| Agent | Job | Talk to them about |
|-------|-----|-------------------|
| **Scout** | Research | "Find me prospects", "Research Acme", "Who's hiring?" |
| **Rep** | Outreach | "Email Sarah", "She said not interested", "Follow up" |
| **Closer** | Deals | "Send proposal", "They want a discount", "Invoice $500" |

## They Use GTM Skills

All agents pull from **gtm-skills.com**:

- 420+ prompts by industry/role/workflow
- 24 tonalities (writing styles)
- Voice templates
- Methodology frameworks (MEDDPICC, SPIN, Challenger, etc.)
- MCP server for HubSpot integration

## Setup

### Option 1: OpenClaw Skills
```bash
npx clawdhub install gtm-skills/scout
npx clawdhub install gtm-skills/rep
npx clawdhub install gtm-skills/closer
```

### Option 2: Claude Projects
Create 3 Claude projects, paste each SKILL.md as the system prompt:
- Project "Scout" → `scout/SKILL.md`
- Project "Rep" → `rep/SKILL.md`
- Project "Closer" → `closer/SKILL.md`

### Option 3: Slack/Telegram Channels
Deploy as bots to 3 channels:
- #scout
- #rep
- #closer

(See `bots/telegram/` for bot code)

## Example Workflow

**You → Scout:**
> "Find me SaaS companies that raised Series B in the last 3 months and are hiring SDRs"

**Scout:**
> Here are 10 prospects... Top pick: Sarah Chen, VP Sales at Acme Corp.
> Angle: SDR ramp time.
> Tell Rep: "email sarah@acme.com"

**You → Rep:**
> "Email sarah@acme.com - she's hiring 5 SDRs, angle is ramp time"

**Rep:**
> [Drafts email using gtm-skills.com/prompts/saas/sdr]
> Subject: SDR ramp
> [Body]
> Want a different tone? Try "make it more challenger"

**Sarah replies: "We're using a competitor"**

**You → Rep:**
> "She said they're using a competitor"

**Rep:**
> [Objection handling response]
> Chris Voss approach: gtm-skills.com/free-tools/tonalities/chris-voss

**Meeting happens, goes well**

**You → Closer:**
> "Send proposal to Acme - $1500/mo, they care about ramp time"

**Closer:**
> [Proposal with their pain points and ROI]
> Next: "Invoice sarah@acme.com $1500"

## Links

- **GTM Skills**: gtm-skills.com
- **Prompts**: gtm-skills.com/prompts
- **Tonalities**: gtm-skills.com/free-tools/tonalities
- **MCP Server**: gtm-skills.com/free-tools/mcp-server
- **Agentic BDR**: gtm-skills.com/agentic-bdr
