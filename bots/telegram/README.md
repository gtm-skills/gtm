# GTM Command Center

Control your Agentic SDR Army from Telegram, WhatsApp, or Slack.

```
/scout acme.com → Research this company
/write sarah@acme.com → Draft personalized email
/call sarah → Voice note in your voice
/invoice sarah $500 → Send payment link
```

## The Four Agents

| Agent | Mission | Commands |
|-------|---------|----------|
| **SCOUT** | Research 24/7 | `/scout`, `/enrich` |
| **WRITER** | Personalized outreach | `/write`, `/sequence`, `/reply` |
| **CALLER** | Voice notes & calls | `/call`, `/voicemail` |
| **CLOSER** | Payments & deals | `/invoice`, `/proposal`, `/pipeline` |

## Quick Start

### 1. Create Telegram Bot

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot` and follow prompts
3. Copy your bot token

### 2. Configure Environment

```bash
cd bots/telegram
cp .env.example .env
```

Edit `.env` with your credentials:

```bash
# Required
TELEGRAM_BOT_TOKEN=your_token
ANTHROPIC_API_KEY=your_key
AUTHORIZED_TELEGRAM_IDS=your_telegram_id

# Optional (enable as needed)
HUBSPOT_API_KEY=your_key        # CRM
APOLLO_API_KEY=your_key         # Enrichment
ELEVENLABS_API_KEY=your_key     # Voice cloning
VAPI_API_KEY=your_key           # AI calls
STRIPE_SECRET_KEY=your_key      # Payments
```

### 3. Install & Run

```bash
npm install
npm run dev
```

### 4. Test

Message your bot on Telegram:
```
/start
/scout acme.com
/write test@example.com
```

## Commands

### SCOUT (Research)
```
/scout                    # Top 10 new prospects
/scout acme.com           # Deep research on company
/scout "series B saas"    # Find matching prospects
/scout signals            # Today's buying signals
/scout enrich sarah@x.com # Get full contact profile
```

### WRITER (Outreach)
```
/write                    # Today's outreach queue
/write sarah@acme.com     # Draft email to Sarah
/write sarah --challenger # Draft with Challenger tonality
/sequence john@beta.io    # Start 5-email sequence
/followup                 # Due follow-ups
/replies                  # Pending replies
/reply 47 --book          # Reply to thread, push meeting
```

### CALLER (Voice)
```
/call                     # Warm call list (engaged prospects)
/call sarah               # Voice note for Sarah
/call sarah --live        # AI-powered live call
/voicemail john           # Drop voicemail
/callbacks                # Who called back (hot leads!)
```

### CLOSER (Payments)
```
/close                    # Deals ready to close
/invoice sarah $500       # Send Stripe payment link
/proposal acme            # Generate proposal
/stalled                  # Stalled deals to re-engage
/pipeline                 # Pipeline summary
/won acme $1500           # Log closed deal
/lost beta "went dark"    # Log lost deal
```

### Status
```
/status                   # All agent activity
/today                    # Daily briefing
/help                     # All commands
```

## Integrations

| Service | Purpose | Required? |
|---------|---------|-----------|
| Telegram | Command interface | Yes |
| Anthropic | AI generation | Yes |
| HubSpot | CRM | Recommended |
| Apollo | Enrichment | Recommended |
| Gmail | Send emails | Optional |
| ElevenLabs | Voice cloning | Optional |
| Vapi | AI calls | Optional |
| Stripe | Payments | Optional |

## Architecture

```
Telegram Message
      ↓
  Bot Router
      ↓
┌─────────────────────────────────┐
│  SCOUT   WRITER   CALLER   CLOSER │
│    ↓        ↓        ↓        ↓    │
│  Apollo   Gmail  ElevenLabs Stripe │
└─────────────────────────────────┘
      ↓
   HubSpot (source of truth)
      ↓
   Calendly/Stripe (conversions)
```

## Tonalities

Available writing styles for `/write`:

| Flag | Style |
|------|-------|
| `--direct` | No fluff (default) |
| `--blunt` | Shortest possible |
| `--challenger` | Teach and push back |
| `--exec` | C-suite brevity |
| `--friendly` | Warm and personable |
| `--hormozi` | Value-stacking |
| `--voss` | Tactical empathy |

Example:
```
/write sarah@acme.com --challenger
```

## Daily Briefing

The bot sends a daily briefing at 8am:

```
Good morning! Here's your GTM update:

SCOUT found 12 new prospects overnight:
• 3 high-priority (hiring signals)
• Top pick: Sarah Chen, VP Sales @ Acme

WRITER sent 47 emails, 8 follow-ups:
• 3 new replies (2 positive, 1 objection)
• John @ Beta wants to book

CALLER left 5 voicemails:
• 1 callback from Lisa @ Gamma

CLOSER has 2 deals pending:
• Acme: Proposal viewed 3x
• Beta: Payment link sent

Quick actions:
→ /reply 23 (book John)
→ /call lisa (she called back)
```

## Production Deployment

### Railway

```bash
railway login
railway init
railway up
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Voice Clone Setup

1. Record 30 minutes of natural speech
2. Upload to ElevenLabs → Voice Lab → Add Voice
3. Copy voice ID to `ELEVENLABS_VOICE_ID`
4. Test with `/call test`

## Contributing

See [AGENTIC-SDR-ARMY.md](../../docs/AGENTIC-SDR-ARMY.md) for the full design doc.
