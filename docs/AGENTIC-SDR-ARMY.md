# Agentic SDR Army: First Principles Design

## What Do Sales Reps Actually DO?

### SDR/BDR Daily Activities (8 hours → 24/7 with agents)

| Activity | Time Spent | Can Automate? | Agent |
|----------|-----------|---------------|-------|
| Research prospects | 2h | YES | SCOUT |
| Write cold emails | 2h | YES | WRITER |
| Send follow-ups | 1h | YES | WRITER |
| Cold calls | 2h | PARTIAL | CALLER |
| LinkedIn outreach | 30m | YES | WRITER |
| CRM updates | 30m | YES | ALL |
| Reply handling | 1h | PARTIAL | WRITER |

### AE Daily Activities

| Activity | Time Spent | Can Automate? | Agent |
|----------|-----------|---------------|-------|
| Discovery calls | 3h | NO | Human |
| Demos | 2h | NO | Human |
| Proposals | 1h | PARTIAL | CLOSER |
| Follow-up/negotiate | 1h | PARTIAL | CLOSER |
| Admin/CRM | 1h | YES | ALL |

**Key Insight:** SDR work is 90% automatable. AE work is 30% automatable. The goal is autonomous SDRs that feed qualified meetings to a human AE (you).

---

## The Four Agents

```
┌─────────────────────────────────────────────────────────────────┐
│                     GTM COMMAND CENTER                          │
│              (Telegram / WhatsApp / Slack Bot)                  │
│                                                                 │
│  "scout acme.com"  "write sarah"  "call john"  "close deal"    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │  SCOUT  │          │ WRITER  │          │ CALLER  │
   │Research │          │Outreach │          │  Voice  │
   │  Agent  │          │  Agent  │          │  Agent  │
   └────┬────┘          └────┬────┘          └────┬────┘
        │                    │                    │
   ┌────┴────┐          ┌────┴────┐          ┌────┴────┐
   │• Apollo │          │• Gmail  │          │• Vapi   │
   │• Clay   │          │• Outlook│          │• Bland  │
   │• LinkedIn│         │• LinkedIn│         │• Eleven │
   │• News   │          │• HubSpot│          │• Twilio │
   └─────────┘          └─────────┘          └─────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             ↓
                    ┌─────────────────┐
                    │     HUBSPOT     │
                    │ (Source of Truth)│
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ CALENDLY/STRIPE │
                    │  (Conversions)  │
                    └─────────────────┘
```

---

## Agent 1: SCOUT (Research Agent)

**Mission:** Find qualified prospects 24/7. Never run out of pipeline.

### What SCOUT Does

1. **Passive Monitoring** (runs continuously)
   - Monitor job postings for ICP companies hiring sales roles
   - Track funding announcements (Series A/B = budget)
   - Watch for tech stack changes (competitor → you)
   - LinkedIn activity of target personas

2. **Active Research** (on command)
   - Deep dive on specific company
   - Find decision makers + contact info
   - Build account map (who reports to who)
   - Identify pain points from public info

3. **Qualification** (automatic)
   - Score against ICP criteria
   - Flag hot signals (hiring, funding, complaints)
   - Prioritize by likelihood to convert

### SCOUT Commands

```
/scout                     → Show today's top 10 new prospects
/scout acme.com            → Deep research on Acme Corp
/scout "series B fintech"  → Find 10 prospects matching criteria
/scout signals             → What buying signals detected today?
/scout enrich sarah@acme   → Get full profile on this person
```

### SCOUT Output (to HubSpot)

```json
{
  "company": "Acme Corp",
  "domain": "acme.com",
  "employees": 150,
  "funding": "Series B, $25M",
  "industry": "Fintech",
  "signals": ["Hiring 3 SDRs", "New VP Sales started"],
  "contacts": [
    {
      "name": "Sarah Chen",
      "title": "VP of Sales",
      "email": "sarah@acme.com",
      "linkedin": "linkedin.com/in/sarachen",
      "score": 85,
      "reason": "ICP match + hiring signal"
    }
  ],
  "suggested_angle": "SDR ramp time - they're scaling fast"
}
```

### SCOUT Tech Stack

- **Apollo** - Contact enrichment, email finding
- **Clay** - Waterfall enrichment, data cleanup
- **LinkedIn Sales Nav** - Company/people research
- **Crunchbase/News APIs** - Funding, company signals
- **BuiltWith** - Tech stack detection

---

## Agent 2: WRITER (Outreach Agent)

**Mission:** Personalized outreach at scale. Never miss a follow-up.

### What WRITER Does

1. **Initial Outreach** (from SCOUT's prospects)
   - Write hyper-personalized cold emails
   - Craft LinkedIn connection requests
   - Generate first-touch sequences (email 1, 2, 3...)

2. **Follow-Up Machine** (runs continuously)
   - Track all open conversations
   - Send timely follow-ups (3 days, 7 days, 14 days)
   - Vary messaging each touch
   - Know when to stop (after 5-7 touches)

3. **Reply Handling** (semi-autonomous)
   - Categorize replies (interested, objection, not now, unsubscribe)
   - Draft responses to objections
   - Surface hot replies for human review
   - Auto-respond to simple questions

### WRITER Commands

```
/write                     → Show outreach queue for today
/write sarah@acme.com      → Draft email to Sarah
/write sarah --challenger  → Draft with Challenger tonality
/sequence john@beta.io     → Start full sequence for John
/followup                  → What follow-ups due today?
/replies                   → Show replies needing response
/reply 47 --book           → Reply to thread #47, push for meeting
```

### WRITER Output Examples

**Cold Email (Auto-generated, human-approved):**
```
Subject: SDR ramp

Sarah - saw you're hiring 3 SDRs.

Quick question: how are you thinking about ramp time as you scale from 150 to 200+ people?

We helped Datadog cut SDR ramp from 6 months to 3. Happy to share how.

15 min? [calendly link]
```

**Follow-Up #2 (Auto-sent):**
```
Subject: Re: SDR ramp

Sarah - bumping this.

Separately - noticed you're using Outreach. We integrate natively.

Still worth a quick call?
```

**Objection Response (Draft for approval):**
```
Sarah - totally get it, timing is tough.

Quick thought: most teams we work with felt the same way, then realized the cost of NOT fixing ramp time was $50K+ per SDR in lost productivity.

What if we did 10 min instead of 30? Just to see if there's a fit worth exploring later.
```

### WRITER Tech Stack

- **Gmail/Outlook API** - Send emails from your account
- **LinkedIn API** - Send connection requests, messages
- **HubSpot** - Track all activity, sequences
- **OpenAI/Claude** - Generate personalized copy
- **Tonalities** - Apply different writing styles

---

## Agent 3: CALLER (Voice Agent)

**Mission:** Warm up cold prospects with your voice. Scale "you."

### What CALLER Does

1. **Voice Notes** (async, personalized)
   - Record template in your voice
   - AI generates personalized version for each prospect
   - Send via LinkedIn voice message, voicemail drop, or WhatsApp

2. **Warm Calls** (live or scheduled)
   - Call engaged prospects (opened email 3x, clicked link)
   - Use AI voice that sounds like you
   - Follow discovery script, handle objections
   - Book meeting or transfer to you

3. **Voicemail Drops** (async, mass)
   - Leave personalized voicemails at scale
   - Different message each touch
   - Track who listens, who calls back

### CALLER Commands

```
/call                      → Who should I call today? (warm list)
/call sarah                → Generate voice note for Sarah
/call sarah --live         → Initiate live AI call to Sarah
/voicemail john            → Drop voicemail for John
/voicenotes 10             → Generate 10 voice notes for top prospects
/callbacks                 → Who called back? (hot leads)
```

### CALLER Output Example

**Voice Note Script (AI-personalized in your voice):**
```
"Hey Sarah, it's [Name] from [Company].

I saw you're hiring a bunch of SDRs right now - congrats on the growth.

I work with a lot of sales leaders dealing with the same challenge:
how do you get new reps productive faster?

Anyway, would love to share what's working for teams like Datadog
and Gong. Shoot me a note if you want to chat.

Talk soon."
```

**Live Call Script (AI follows this):**
```
1. Opener: "Hi Sarah, this is [Name] from [Company]. Did I catch you at a bad time?"
   - If no → continue
   - If yes → "When's better? I'll call back."

2. Hook: "I'll be brief. I noticed you're scaling the sales team pretty aggressively.
   I work with VPs of Sales dealing with SDR ramp time. Is that a priority for you right now?"
   - If yes → discovery
   - If no → "Got it. What IS the biggest challenge right now?"

3. Discovery: "What's your current ramp time for new SDRs?"
   - Listen, probe deeper

4. Value: "We helped Datadog cut that from 6 months to 3. Would it be worth
   15 minutes to see if we could do something similar for you?"

5. Book: "Great. I'm looking at [date/time] - does that work?"
   - Confirm email, send calendar invite
```

### CALLER Tech Stack

- **ElevenLabs** - Voice cloning, text-to-speech
- **Vapi** - Conversational AI voice calls
- **Bland.ai** - Alternative voice AI platform
- **Twilio** - Phone infrastructure
- **Synthflow** - Voice agent builder

---

## Agent 4: CLOSER (Payment Agent)

**Mission:** Convert interest to revenue. Never let a deal die.

### What CLOSER Does

1. **Payment Links** (instant)
   - Generate Stripe payment links on demand
   - Send via email, SMS, or DM
   - Track who opened, who paid

2. **Proposal Generation** (semi-auto)
   - Build proposals from templates
   - Customize pricing tiers
   - Track views and time spent

3. **Deal Nurture** (runs continuously)
   - Follow up on sent proposals
   - Re-engage stalled deals
   - Abandoned cart recovery for payment links

### CLOSER Commands

```
/close                     → Show deals ready to close
/invoice sarah $500/mo     → Send payment link to Sarah
/proposal acme --startup   → Generate startup-tier proposal for Acme
/stalled                   → Show stalled deals to re-engage
/won                       → Log a closed deal
/lost acme "went with competitor" → Log lost deal with reason
```

### CLOSER Output

**Payment Link Message:**
```
Sarah - great call today.

As discussed, here's the link to get started:
→ https://pay.gtm-skills.com/startup-plan

Let me know if you have any questions. Looking forward to working together.
```

---

## The Command Center (Telegram/WhatsApp/Slack Bot)

### Bot Architecture

```
┌────────────────────────────────────────────────────────┐
│                   MESSAGE PLATFORMS                     │
│         Telegram  |  WhatsApp  |  Slack                │
└───────────────────────┬────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────┐
│                   WEBHOOK ROUTER                        │
│         Parse command → Route to agent                  │
└───────────────────────┬────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────┐
│                   AGENT ORCHESTRATOR                    │
│    SCOUT  |  WRITER  |  CALLER  |  CLOSER              │
└───────────────────────┬────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────┐
│                   RESPONSE FORMATTER                    │
│         Format agent output → Send to user              │
└────────────────────────────────────────────────────────┘
```

### Universal Commands

```
/status                    → All agents: what are you doing?
/today                     → Today's summary: prospects, emails, calls, revenue
/week                      → This week's metrics
/pipeline                  → Current pipeline value
/help                      → Show all commands
```

### Daily Briefing (Auto-sent 8am)

```
Good morning! Here's your GTM update:

SCOUT found 12 new prospects overnight:
• 3 high-priority (hiring signals)
• Top pick: Sarah Chen, VP Sales @ Acme ($25M Series B)

WRITER sent 47 emails, 8 follow-ups:
• 3 new replies (2 positive, 1 objection)
• Reply from John @ Beta looking to book

CALLER left 5 voicemails:
• 1 callback from Lisa @ Gamma

CLOSER has 2 deals pending:
• Acme: $500/mo proposal opened 3x
• Beta: Payment link sent, not yet clicked

Quick actions:
→ /reply 23 (John wants to book)
→ /call lisa (she called back)
→ /followup acme (proposal going cold)
```

---

## Implementation Phases

### Phase 1: WRITER Bot (Week 1-2)
**Why first:** Highest impact, most straightforward

- [ ] Telegram bot with basic commands
- [ ] Connect to Gmail API
- [ ] Connect to HubSpot for contact data
- [ ] Email generation with Claude
- [ ] /write, /sequence, /followup commands
- [ ] Daily email summary

### Phase 2: SCOUT Bot (Week 3-4)
**Why second:** Feeds WRITER with prospects

- [ ] Apollo API integration
- [ ] Clay waterfall enrichment
- [ ] Automated ICP scoring
- [ ] /scout, /enrich commands
- [ ] Auto-add to HubSpot

### Phase 3: CALLER Bot (Week 5-6)
**Why third:** Requires voice cloning setup

- [ ] ElevenLabs voice clone
- [ ] Vapi for live calls
- [ ] Twilio for voicemail drops
- [ ] /call, /voicemail commands
- [ ] Call transcripts to HubSpot

### Phase 4: CLOSER Bot (Week 7-8)
**Why last:** Depends on pipeline from other agents

- [ ] Stripe payment links
- [ ] Proposal templates
- [ ] /invoice, /proposal commands
- [ ] Win/loss tracking

### Phase 5: Full Orchestration (Week 9-10)
**The magic:** All agents working together

- [ ] Cross-agent workflows
- [ ] Automated handoffs
- [ ] Daily briefings
- [ ] Performance dashboards

---

## Revenue Model

### How This Drives MRR

```
SCOUT → 50 qualified prospects/week
    ↓
WRITER → 200 personalized emails/week (4 per prospect)
    ↓
CALLER → 20 voice touches/week (top 40%)
    ↓
15% reply rate = 30 conversations
    ↓
30% book rate = 9 meetings/week
    ↓
25% close rate = 2-3 new customers/week
    ↓
@ $500/mo average = $4,000-6,000 new MRR/week
```

**Break-even calculation:**
- Apollo: $100/mo
- Clay: $150/mo
- ElevenLabs: $50/mo
- Vapi: $100/mo
- Twilio: $50/mo
- Total: ~$450/mo

**ROI:** 1 closed deal pays for 10+ months of tooling.

---

## Technical Requirements

### APIs Needed

| Service | Purpose | Cost |
|---------|---------|------|
| Telegram Bot API | Command interface | Free |
| OpenAI/Claude | Content generation | ~$50/mo |
| Apollo | Enrichment | $100/mo |
| Clay | Waterfall enrichment | $150/mo |
| HubSpot | CRM | Free tier |
| Gmail API | Send emails | Free |
| ElevenLabs | Voice cloning | $50/mo |
| Vapi | Voice calls | $100/mo |
| Twilio | Phone/SMS | ~$50/mo |
| Stripe | Payments | 2.9% + 30¢ |

### Infrastructure

- **Backend:** Node.js or Python
- **Queue:** Redis (for async jobs)
- **Database:** Supabase (store conversation state)
- **Hosting:** Railway or Vercel

---

## Next Steps

1. **Voice clone:** Record 30 min of you speaking naturally
2. **ICP definition:** Write down exact criteria for SCOUT
3. **Email templates:** 10 first-touch templates, 5 follow-up templates
4. **Calendly setup:** Booking link with intake questions
5. **HubSpot setup:** Pipeline stages, contact properties
6. **Telegram bot:** Create bot, get token

Ready to build?
