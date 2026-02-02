---
name: gtm
description: GTM toolkit for AI agents. Research, intel, outreach, CRM. Raw sales automation.
homepage: https://gtm-skills.com
metadata: {"openclaw":{"emoji":"🎯","config":{"optionalEnv":["APOLLO_API_KEY","CLAY_API_KEY","CLEARBIT_API_KEY","HUBSPOT_API_KEY","SALESFORCE_TOKEN","CALENDLY_URL","CALCOM_URL","GMAIL_ENABLED","OUTLOOK_ENABLED"]}}}
---

# GTM Skills

Research. Write. Send. Book. Track. All from OpenClaw.

```bash
npx clawdhub install gtm-skills/gtm
```

---

## The Full Flow

```
gtm prospect Sarah Chen at Acme Corp
```

Output:
```
🔍 ENRICHING...
Sarah Chen | VP of Sales | Acme Corp
- Company: Series B, $25M raised, 80 employees
- Hiring: 5 SDRs posted this week
- Tech: Salesforce, Outreach, Gong
- LinkedIn: linkedin.com/in/sarachen

📧 DRAFT READY:
Subject: SDR ramp time

Sarah - saw you're hiring 5 SDRs.

Question: how are you thinking about ramp time as you scale?

We helped Datadog cut theirs from 6 months to 3.

15 min to see if relevant?
calendly.com/you/15min

[Send Now] [Edit] [Schedule] [Log to CRM]
```

---

## Commands

### Generate

| Command | What it does |
|---------|--------------|
| `gtm email` | Cold email |
| `gtm reply` | Handle objection |
| `gtm questions` | Discovery questions |
| `gtm linkedin` | Connection request |
| `gtm prep` | Meeting brief |
| `gtm call` | Cold call script |
| `gtm sequence` | Multi-touch cadence |

### Research

| Command | What it does |
|---------|--------------|
| `gtm enrich [person/company]` | Get prospect data |
| `gtm research [company]` | Deep company intel |
| `gtm signals [company]` | Buying signals |
| `gtm battlecard [competitor]` | Competitive intel |

### Intel

Competitive surveillance. The stuff that makes money.

| Command | What it does |
|---------|--------------|
| `gtm sitemap [domain]` | Fetch sitemap.xml, diff against last check, surface new pages |
| `gtm sitemap --watch [domain]` | Monitor daily, alert on new URLs |
| `gtm pricing [domain]` | Snapshot /pricing page, alert on changes |
| `gtm jobs [company]` | Pull job postings - hiring SDRs = budget, hiring AI = pivot |
| `gtm techstack [domain]` | Detect stack via headers, scripts, DNS |
| `gtm reddit [subreddit] [query]` | Fetch threads as JSON, extract pain points + leads |
| `gtm hn [thread-id]` | Pull HN thread, identify buyers in comments |
| `gtm producthunt [launch]` | Commenters = early adopters with budget |
| `gtm g2 [product]` | Scrape reviews - pain points + reviewer companies |
| `gtm funding [industry]` | Recent raises in your ICP - money to spend |
| `gtm github [repo] --contributors` | Who's building with it = potential customers |

### Execute

| Command | What it does |
|---------|--------------|
| `gtm send` | Send email via Gmail/Outlook |
| `gtm book` | Generate booking link |
| `gtm log` | Log activity to CRM |
| `gtm remind [time]` | Set follow-up reminder |
| `gtm track` | Add/update deal in pipeline |

### Combo

| Command | What it does |
|---------|--------------|
| `gtm prospect [person] at [company]` | Full flow: enrich → draft → ready to send |
| `gtm followup [person]` | Check history → draft follow-up → send |
| `gtm close [deal]` | Prep negotiation → create proposal |

---

## Setup

### Enrichment (pick one or more)

```bash
# Apollo.io
export APOLLO_API_KEY=your_key

# Clay
export CLAY_API_KEY=your_key

# Clearbit
export CLEARBIT_API_KEY=your_key
```

### Booking

```bash
# Calendly
export CALENDLY_URL=calendly.com/yourname/15min

# Cal.com
export CALCOM_URL=cal.com/yourname/15min
```

### Email Sending

```bash
# Gmail (uses OpenClaw's Gmail integration)
export GMAIL_ENABLED=true

# Outlook (uses OpenClaw's Outlook integration)
export OUTLOOK_ENABLED=true
```

### CRM

```bash
# HubSpot
export HUBSPOT_API_KEY=your_key

# Salesforce
export SALESFORCE_TOKEN=your_token
```

---

## Enrichment

### Enrich a Person
```
gtm enrich Sarah Chen at Acme Corp
```

Output:
```
Sarah Chen
VP of Sales | Acme Corp

📧 sarah.chen@acme.com
📱 +1 (555) 123-4567
🔗 linkedin.com/in/sarachen

Company: Acme Corp
- Industry: SaaS
- Size: 80 employees
- Funding: Series B ($25M)
- Tech Stack: Salesforce, Outreach, Gong

Recent Activity:
- Hired 5 SDRs this week
- Promoted to VP 3 months ago
- Posted about "scaling sales teams"
```

### Enrich a Company
```
gtm enrich Acme Corp
```

Output:
```
Acme Corp
acme.com | San Francisco, CA

📊 Series B | $25M raised
👥 80 employees (growing 40% YoY)
🏢 Industry: SaaS / Sales Tech

Leadership:
- CEO: John Smith
- VP Sales: Sarah Chen
- CTO: Mike Johnson

Signals:
🟢 Hiring 5 SDRs
🟢 New VP Sales (3 months)
🟡 Raised Series B (8 months ago)

Tech Stack:
Salesforce, Outreach, Gong, Slack, AWS
```

---

## Booking

### Add Booking Link to Emails

All generated emails automatically include your booking link:

```
gtm email Sarah Chen, VP Sales at Acme

Subject: Quick question

Sarah - [email body]

Worth 15 min?
→ calendly.com/you/15min
```

### Generate Standalone Link
```
gtm book
```

Output:
```
Your booking links:

15 min intro: calendly.com/you/15min
30 min demo: calendly.com/you/30min
```

### Check Availability
```
gtm book --check tomorrow
```

Output:
```
Tomorrow (Feb 2):
✓ 9:00 AM - available
✓ 10:00 AM - available
✗ 11:00 AM - booked
✓ 2:00 PM - available
✓ 3:00 PM - available
```

---

## Email Sending

### Send Immediately
```
gtm send

# Or after generating:
gtm email Sarah Chen at Acme
> [Send Now]
```

### Schedule Send
```
gtm send --schedule "tomorrow 8am"
gtm send --schedule "Monday 9am EST"
```

### Send with Tracking
```
gtm send --track
```
Tracks opens and clicks (requires supported email client).

---

## CRM Integration

### Log Activity
```
gtm log "Sent cold email to Sarah Chen"
gtm log "Discovery call - interested in Q2"
gtm log --call "Demo completed, sending proposal"
```

### Track Deal
```
gtm track "Acme Corp" --stage discovery --value 50000
gtm track "Acme Corp" --stage proposal
gtm track "Acme Corp" --stage closed-won 🎉
```

### View Pipeline
```
gtm pipeline
```

Output:
```
Your Pipeline:

Discovery (3):
  Acme Corp - $50K - Sarah Chen
  TechFlow - $30K - James Wilson
  DataSync - $75K - Maria Lopez

Proposal (2):
  CloudFirst - $100K - Alex Kim
  ScaleUp - $40K - Priya Patel

Total: $295K
```

---

## Reminders

### Set Follow-up
```
gtm remind "Follow up with Sarah" in 3 days
gtm remind "Send proposal to Acme" tomorrow 9am
gtm remind "Check in on TechFlow deal" next Monday
```

### View Reminders
```
gtm reminders
```

Output:
```
Upcoming:

Tomorrow:
  9:00 AM - Send proposal to Acme

This Week:
  Wed - Follow up with Sarah
  Fri - Check in on TechFlow deal
```

---

## Tonalities

| Flag | Style |
|------|-------|
| `--direct` | No fluff (default) |
| `--blunt` | Shortest possible |
| `--challenger` | Push back, teach |
| `--exec` | C-suite brevity |
| `--friendly` | Add warmth |

---

## Frameworks

```
gtm questions --meddpicc [persona]
gtm questions --spin [persona]
gtm questions --challenger [persona]
gtm questions --sandler [persona]
gtm questions --gap [persona]
```

---

## Examples

### Full Prospecting Flow
```
You: gtm prospect Maria Lopez, Head of RevOps at ScaleUp

🔍 Enriching Maria Lopez...

Maria Lopez | Head of RevOps | ScaleUp Inc
📧 maria@scaleup.com
🔗 linkedin.com/in/marialopez

Company: ScaleUp Inc (Series C, $50M, 200 employees)
Signals: Hiring 3 RevOps analysts, new CRO started last month

📧 Draft:

Subject: RevOps scaling

Maria - saw you're building out RevOps (3 new analysts).

With a new CRO, guessing forecasting accuracy is top of mind.

We helped Stripe hit 95% forecast accuracy in 60 days.

Worth comparing notes?
→ calendly.com/you/15min

[Send] [Edit] [Schedule for Mon 8am] [Log to HubSpot]
```

### Quick Follow-up
```
You: gtm followup Sarah Chen

📋 History with Sarah Chen:
- Jan 15: Sent cold email (opened, no reply)
- Jan 18: LinkedIn connection (accepted)

📧 Draft follow-up:

Subject: Re: SDR ramp time

Sarah - bumping this up.

Saw your post about onboarding challenges - sounds like ramp time is real.

Here's how Datadog solved it: [link]

Still open to a quick chat?

[Send] [Edit] [Schedule]
```

### Objection → Response → Send
```
You: gtm reply "we're using a competitor"

Response:

"Good to hear you've got something in place.

Quick question - what's working well, and what would you improve?

Asking because companies like [similar] switched to us specifically for [differentiator].

Worth a 15-min comparison?"

[Send to Sarah Chen] [Edit] [Copy]
```

---

## Intel Examples

### Reddit Lead Mining

```
gtm reddit /r/salesforce "frustrated with"

Found 23 pain point threads (last 30 days):

1. "Frustrated with Salesforce reporting" - u/revops_mike
   Company: Likely mid-market (mentions 50 reps)
   Pain: Report builder, dashboard limitations
   Thread: reddit.com/r/salesforce/abc123

2. "Anyone else frustrated with CPQ?" - u/sales_ops_sarah
   Company: Mentions "Series B startup"
   Pain: Quote approval workflow
   Thread: reddit.com/r/salesforce/def456

[Export CSV] [Enrich All] [Draft Outreach]
```

Pro tip: Add `/.json` to any Reddit URL to get the full thread as structured data.

### Sitemap Surveillance

```
gtm sitemap --watch competitor.com

Monitoring competitor.com/sitemap.xml

Changes detected (Jan 28):

NEW PAGES:
+ /products/enterprise-plan      <- moving upmarket
+ /integrations/snowflake        <- partnership incoming
+ /customers/fortune-500         <- case study prep
+ /careers/ai-engineer           <- building AI team

REMOVED:
- /pricing/startup-plan          <- killing lower tier?

[Slack alert] [Deep research] [Draft battlecard]
```

Every company leaks their roadmap in sitemap.xml before they announce it.

### Job Signal Analysis

```
gtm jobs Acme Corp

Acme Corp - 47 open roles

SIGNALS:
12 SDR roles this month     -> scaling outbound, has budget
3 AI/ML Engineer roles      -> building AI, potential buyer
1 VP RevOps role            -> leadership change, process overhaul
0 CS roles                  -> not focused on retention

VERDICT: Hot. New RevOps VP = 90-day mandate to buy tools.

[Research deeper] [Find VP RevOps] [Draft outreach]
```

### Funding Intel

```
gtm funding "sales tech" --raised "last 30 days"

12 companies raised in Sales Tech (last 30 days):

1. ScaleAI - $50M Series C
   Signal: Will need sales tools to spend that $$$

2. Ramp - $25M Series B
   Signal: Hiring 8 AEs right now

3. Groove - $15M Series A
   Signal: Just hired VP Sales from Gong

[Export list] [Enrich all] [Build sequence]
```

Fresh funding = budget unlocked. Hit them in the first 90 days.

---

## Links

- [gtm-skills.com](https://gtm-skills.com)
- [API Docs](https://gtm-skills.com/developers)
- [GitHub](https://github.com/gtm-skills/gtm)

---

## Support

Questions? Issues?
- GitHub: github.com/gtm-skills/gtm/issues
- Email: hello@gtm-skills.com
