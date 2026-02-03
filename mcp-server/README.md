# GTM MCP Server

An MCP (Model Context Protocol) server that provides AI-powered GTM (Go-To-Market) tools for sales and marketing workflows.

**Now with MCP Apps support** - Interactive UIs for email composition, LinkedIn messages, research cards, and more.

## Features

### MCP Apps Interactive UIs

When used with Claude Desktop or other MCP Apps-compatible hosts, these tools display rich interactive interfaces:

| Tool | Interactive UI |
|------|---------------|
| `research_company` | Company research card with checklists |
| `research_lead` | Lead profile with personalization hooks |
| `draft_cold_email` | Email composer with tone selection and copy |
| `draft_linkedin_message` | Message card with character count |
| `handle_objection` | Step-by-step objection response framework |
| `create_follow_up_sequence` | Visual timeline of follow-up emails |


### Content Generation Tools

| Tool | Description |
|------|-------------|
| `research_company` | Research a company for sales outreach |
| `research_lead` | Research a specific person/lead |
| `draft_cold_email` | Draft personalized cold emails |
| `draft_linkedin_message` | Draft LinkedIn messages |
| `handle_objection` | Get strategic objection responses |
| `generate_cold_call_script` | Generate cold call scripts |
| `generate_discovery_questions` | Generate discovery questions |
| `create_follow_up_sequence` | Create follow-up sequences |
| `build_value_proposition` | Build tailored value props |
| `analyze_competitor` | Generate competitive positioning |

### HubSpot CRM Tools (Real API Integration)

Set `HUBSPOT_API_KEY` to enable these tools:

| Tool | Description |
|------|-------------|
| `hubspot_create_contact` | Create a new contact in HubSpot |
| `hubspot_update_contact` | Update an existing contact |
| `hubspot_get_contact` | Get contact by ID or email |
| `hubspot_search_contacts` | Search for contacts |
| `hubspot_create_deal` | Create a new deal |
| `hubspot_update_deal` | Update deal stage, amount, etc. |
| `hubspot_log_activity` | Log email, call, meeting, or note |
| `hubspot_get_pipelines` | Get deal pipelines and stages |

### Prompts (Basic)

| Prompt | Description |
|--------|-------------|
| `prospecting_workflow` | Complete prospecting workflow for a target account |
| `deal_strategy` | Strategic plan for advancing a deal |
| `competitive_battle_card` | Generate a competitive battle card |

### Agentic Workflows (Advanced)

| Workflow | Description |
|----------|-------------|
| `account_strategy` | Full account strategy with stakeholder mapping and multi-channel outreach plan |
| `competitive_deal_workflow` | Complete competitive deal strategy when facing a known competitor |
| `reengagement_workflow` | Strategy to re-engage a cold or stalled opportunity |
| `enterprise_expansion` | Strategy to expand within an existing customer account |
| `full_sales_cycle` | End-to-end sales cycle orchestration from cold to close |
| `objection_battlecard` | Comprehensive objection handling playbook for a specific deal |

## Installation

### Option 1: From npm (when published)

```bash
npm install -g gtm-mcp-server
```

### Option 2: From source

```bash
git clone https://github.com/gtm-skills/gtm.git
cd gtm-skills/mcp-server
npm install
npm run build
```

## Configuration

### Environment Variables

```bash
# HubSpot CRM Integration (optional - enables HubSpot tools)
export HUBSPOT_API_KEY=pat-na1-xxxxxxxx

# Get your API key:
# 1. Go to HubSpot Settings > Integrations > Private Apps
# 2. Create a new private app
# 3. Grant scopes: crm.objects.contacts, crm.objects.deals, crm.objects.companies
# 4. Copy the access token
```

### For Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "gtm": {
      "command": "node",
      "args": ["/path/to/gtm-mcp-server/dist/index.js"]
    }
  }
}
```

### For Claude Code

Add to your project's `.claude/settings.json`:

```json
{
  "mcpServers": {
    "gtm": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"]
    }
  }
}
```

## Usage Examples

### Research a Company

```
Use the research_company tool to research Stripe for potential outreach.
```

### Draft a Cold Email

```
Use draft_cold_email to create an email for:
- Recipient: John Smith, VP of Sales at Acme Corp
- Pain point: manual CRM data entry
- Product: AI-powered CRM automation
```

### Handle an Objection

```
Use handle_objection for:
- Objection: "We're happy with our current solution"
- Context: Enterprise deal, they use Salesforce
- Product: Next-gen sales intelligence platform
```

### Run a Prospecting Workflow

```
Run the prospecting_workflow prompt for:
- Company: Notion
- Persona: VP of Revenue Operations
- Product: Revenue intelligence platform
```

### Full Account Strategy

```
Run the account_strategy workflow for:
- Company: Stripe
- Industry: Fintech
- Product: Sales intelligence platform
- Deal size: $100k ARR
```

### Competitive Deal Strategy

```
Run the competitive_deal_workflow for:
- Company: Acme Corp
- Competitor: Salesforce
- Product: Next-gen CRM
- Deal stage: Evaluation
```

### Re-engage a Cold Lead

```
Run the reengagement_workflow for:
- Company: TechStartup Inc
- Contact: Sarah Chen
- Last interaction: Demo call, they said timing was off
- Days since contact: 45
```

### Full Sales Cycle Orchestration

```
Run the full_sales_cycle workflow for:
- Company: Enterprise Co
- Persona: Head of Operations
- Product: Workflow automation platform
- Pain point: Manual data entry eating up team time
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## License

MIT
