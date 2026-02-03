# GTM Skills Distribution Workflow

## Quick Start

```bash
# Step 1: Preview content
node scripts/poasting.js --list          # See all drafts
node scripts/poasting.js --preview twitter 1   # Preview specific draft

# Step 2: Copy content, paste into Buffer GUI
# Open https://publish.buffer.com

# Step 3 (optional): Run enhancers before posting
node scripts/poasting.js --enhance twitter 1
```

---

## Progress & Roadmap

### Current Status: Buffer GUI (Manual)
- ✅ Content drafts ready (5 Twitter, 6 LinkedIn, 4 Reddit)
- ✅ CLI tool for preview/enhance
- ✅ `/poasting` slash command
- ✅ LinkedIn timing guard (blocks 8am-5:30pm EST)
- ⏸️ Buffer API blocked (they deprecated new developer apps)

### Future: Pure API Integration
When we want full automation:

| Platform | API Status | Setup Required |
|----------|------------|----------------|
| Twitter/X | Available | developer.twitter.com → Create app → Get OAuth tokens |
| LinkedIn | Available | linkedin.com/developers → Create app → OAuth 2.0 flow |
| Reddit | Restricted | PRAW library, but posting APIs are limited |
| Buffer | ❌ Blocked | No longer accepting new developer apps |

**Next steps for API automation:**
1. [ ] Set up Twitter Developer account ($100/mo for basic API)
2. [ ] Build OAuth flow for Twitter posting
3. [ ] Add thread support (post all tweets in sequence)
4. [ ] LinkedIn API integration (complex but doable)
5. [ ] Consider alternatives: Typefully API, Hypefury API

**For now:** Buffer GUI works perfectly. Copy → Paste → Schedule.

---

## Adaptation Rules (Don't Copy, Capture)

When rewriting viral content, extract the MECHANICS, not the WORDS.

**What to steal:**
- Hook structure (question, contrarian, result)
- Engagement mechanics (comment CTAs, lists, specificity)
- Rhythm and pacing (short/long sentence patterns)
- Proof elements (numbers, names, outcomes)

**What to change:**
- Actual words and phrases
- Story/context (make it ours)
- Examples and specifics
- Voice and tone (match our platform style)

**The formula:**
```
THEIR FORMAT + OUR ANGLE + OUR EXAMPLES = Original post that works
```

**Example transformation:**

Original mechanic: "What if your AI could learn from [experts]? → List of names → I built [thing]"

Our adaptation: "Every AI writes the same way. → Problem → I wanted different → List of names → I built [thing]"

Same skeleton. Different flesh.

---

## The Story Angle

**Core narrative:** "I built an agentic sales stack that transforms how AEs work. Here's the open-source prompt library that powers it."

**Key points to hit:**
- 2,500+ prompts, fully open source
- Built programmatically (pSEO angle for tech audience)
- Solves real AE pain: research, personalization, follow-up
- Not a product pitch - genuine resource sharing

---

## Platform Tones

### Twitter/X Tone
- **Vibe:** Builder sharing work, slightly irreverent, dense value
- **Format:** Thread (7-10 tweets), hook + substance + resource
- **Audience:** Sales tech builders, SDR/AE practitioners, AI enthusiasts
- **What works:** Specificity, contrarian takes, "here's exactly how" energy
- **Style:** lowercase. no caps at sentence start. raw energy. typing fast.

### LinkedIn Tone
- **Vibe:** Professional but human, insight-led, generous expertise
- **Format:** Single post with line breaks, story arc, soft CTA
- **Audience:** Sales leaders, RevOps, GTM executives
- **What works:** Pattern interrupts, relatable pain, actionable frameworks
- **Style:** Proper punctuation. Sentence caps. Still human, but polished.

### Word Choice: Avoid "AI"

Don't say "AI" — it's vague and overused. Be precise:

| Instead of | Say |
|------------|-----|
| AI | LLM, Claude, GPT, agentic |
| AI agent | agentic BDR, agentic workflow |
| AI sales tool | agentic GTM, Claude-powered |
| AI automation | agentic automation, LLM-powered |
| AI can do this | Claude can do this, your agentic BDR can do this |

**Why:** "AI" is meaningless now. Everyone claims AI. Precision signals expertise.

### Reddit Tone
- **Vibe:** Peer sharing genuinely useful thing, zero self-promotion smell
- **Format:** Text post, context → problem → solution → resource
- **Audience:** Skeptical practitioners who hate being sold to
- **What works:** "I made this, thought you'd find it useful" energy

---

## Content Drafts

---

### TWITTER: openclaw Memory for GTM (Thread)

```
HOOK (Tweet 1):
Most AI sales tools forget everything the moment you close the chat.

I've been running sales agents that remember every prospect, every deal, every conversation—permanently.

Here's how openclaw's memory system works for GTM: 🧵

---

Tweet 2:
The problem with AI for sales:

You talk to a prospect on Monday.
By Wednesday, the AI has zero context.
You're starting from scratch every time.

That's not augmentation. That's a liability.

---

Tweet 3:
openclaw (formerly Clawdbot) solves this with persistent memory.

Not RAM. Not session storage.

Plain Markdown files that persist forever:
- MEMORY.md → long-term prospect facts
- memory/YYYY-MM-DD.md → daily context

Your agent remembers like a human would.

---

Tweet 4:
How I use it for sales:

MEMORY.md stores:
- Prospect company context
- Key pain points they mentioned
- Deal stage and timeline
- Objections they raised
- What resonated with them

Every conversation builds on the last.

---

Tweet 5:
The magic: multi-channel memory.

Start a deal conversation on WhatsApp.
Continue on Telegram.
Reference it from Discord.

Same memory. Same context. One unified agent.

Session scope = "per-sender" means each prospect has their own persistent brain.

---

Tweet 6:
Before context compaction (when memory fills up), openclaw does something clever:

It triggers an automatic "memory flush"—prompting the model to save important facts before summarizing.

Your prospect details never get lost.

---

Tweet 7:
Key settings for GTM agents:

session.scope: "per-sender"
→ Each prospect gets own context

compaction.memoryFlush.enabled: true
→ Auto-save before summarization

contextPruning.mode: "adaptive"
→ Preserve important context intelligently

---

Tweet 8:
The result:

"Hey John, last time we talked you mentioned the CFO needed to sign off and budget was tight until Q2. Did that change after the board meeting?"

That's not scripted. That's remembered.

---

Tweet 9:
I wrote up a full explainer on using openclaw for GTM agents:

gtm-skills.com/free-tools/openclaw

Covers:
- Memory architecture
- Multi-channel setup
- Config for sales agents
- Sample openclaw.json

---

Tweet 10:
If you're building AI sales agents, memory isn't a nice-to-have.

It's the difference between a novelty and a real tool.

openclaw: molt.bot
Full guide: gtm-skills.com/free-tools/openclaw
```

---

### TWITTER: Agentic Sales Stack Story (Thread)

```
HOOK (Tweet 1):
I mass quit traditional sales. Got my AE team off research hamster wheels.

Built an agentic stack instead. Open-sourced the whole prompt library.

2,500+ prompts. Here's how it works: 🧵

---

Tweet 2:
The old AE workflow is broken:

→ 30 min researching one account
→ Copy-paste the same email template
→ "Personalize" by adding their name
→ Wonder why reply rates suck

We fixed this with 3 agents.

---

Tweet 3:
AGENT 1: Research

Pulls 10-K filings, news, LinkedIn, job postings.
Outputs a 1-page brief per account in seconds.

Not summaries. Actual sales angles:
- Trigger events
- Pain indicators
- Champion candidates
- Competitive intel

---

Tweet 4:
AGENT 2: Personalization

Takes research brief → generates messaging.

Not "Hi {first_name}" garbage.

Real personalization:
- References their Q3 earnings call
- Connects to their hiring patterns
- Speaks to their specific tech stack

---

Tweet 5:
AGENT 3: Execution

Orchestrates the sequence.
Human approves before send.

Handles:
- Multi-channel timing
- Reply classification
- Meeting booking
- Follow-up logic

---

Tweet 6:
The prompts behind these agents?

I packaged all of them.

2,500+ prompts organized by:
- Industry (SaaS, FinTech, Healthcare...)
- Role (SDR, AE, CSM...)
- Workflow (Research, Outreach, Discovery...)

Every combination has specific prompts.

---

Tweet 7:
Examples:

"SaaS AE Discovery Questions" - 15 prompts
"FinTech Objection Handling" - 12 prompts
"Healthcare MEDDPICC Qualification" - 10 prompts

Not generic. Industry + role + workflow specific.

---

Tweet 8:
Why open source this?

Because the prompts aren't the moat.

The moat is:
- Your ICP knowledge
- Your use cases
- Your iteration speed

The prompts are just the starting point.

---

Tweet 9:
Grab them here:

github.com/gtm-skills/gtm

Or browse the site:
gtm-skills.com/prompts

MIT license. Copy, modify, build on top.

If you use them, tell me what works.

---

Tweet 10:
Building something similar?

Reply with your stack. Curious what others are running.

Especially interested in:
- What research sources you use
- How you handle human-in-the-loop
- Your biggest automation wins
```

### TWITTER: pSEO Technical Build (Thread)

```
HOOK:
Built a pSEO system that generated 420 sales prompt pages automatically.

Each page ranks for long-tail keywords like "SaaS SDR cold email MEDDPICC"

Here's the architecture: 🧵

---

Tweet 2:
The insight:

Sales people search for specific combinations:
- "fintech AE discovery questions"
- "healthcare objection handling"
- "manufacturing cold email templates"

One page can't rank for all of these.
420 pages can.

---

Tweet 3:
The data model:

8 industries × 6 roles × 6 workflows = 288 combinations

Each combination gets:
- Unique URL
- Generated prompts
- Industry-specific context
- Internal links to related pages

---

Tweet 4:
The prompt generation:

Not GPT slop. Structured templates with variables:

```
function getPrompts(industry, role, workflow) {
  // Inject industry.painPoints
  // Inject role.activities
  // Inject workflow.stages
  // Return 5 contextual prompts
}
```

---

Tweet 5:
The stack:

- Next.js 16 with App Router
- generateStaticParams() for all combinations
- Dynamic sitemap generation
- Vercel for hosting

Build time: 44 seconds for 500+ pages.

---

Tweet 6:
SEO mechanics:

Each page has:
- Unique title: "{Industry} {Role} {Workflow} Prompts"
- Meta description with keywords
- Schema markup
- Internal links to adjacent combinations

Google sees 420 unique, indexable pages.

---

Tweet 7:
Early results (2 weeks in):

- 421 pages indexed
- Ranking for 50+ long-tail keywords
- 0 paid promotion

Waiting to see if Google keeps them indexed or flags as programmatic.

---

Tweet 8:
The whole thing is open source:

github.com/gtm-skills/gtm

/src/data/pseo.ts - all the data
/src/app/prompts/[...slug] - the dynamic route

Fork it. Build your own pSEO system.

---

Tweet 9:
What's next:

- Tracking which pages rank
- Doubling down on winners
- Adding more combinations (tonality × use case)

Will share results in 30 days.

Follow if you want the update.
```

---

### TWITTER: Speed to Lead (Long-Form Article)

**Format:** Twitter Article/Note (not a thread) — ~900 words
**Style:** lowercase sentence starts for casual twitter-native feel

```
the openclaw debate misses the point: speed to lead is everything

everyone's arguing about whether openclaw (formerly clawdbot) is revolutionary or risky. 60,000 github stars. andrej karpathy calling it the future. heather adkins saying "don't run it." david sacks investing.

here's what nobody's talking about: this might be the most important tool for sales teams in a decade.

not because it's cool AI. because of one brutal reality:

if you don't respond to a lead in 5 minutes, you're already losing.

---

the speed to lead problem

insidesales.com found that responding to a lead within 5 minutes makes you 100x more likely to connect than waiting 30 minutes. MIT research shows the odds of qualifying a lead drop 21x after just 30 minutes.

yet the average B2B response time? 47 hours.

not 47 minutes. 47 hours.

your competitors are responding in 5 minutes with "hey, saw you downloaded our whitepaper, got 10 minutes tomorrow?" while your SDRs are working through a queue, context-switching between 47 browser tabs, trying to remember who this person is.

the lead goes cold. the deal dies. not because your product was worse—because you were slow.

---

why traditional AI doesn't solve this

chatgpt and claude are amazing. but they're reactive. they sit there waiting for you to ask them something.

a lead comes in at 2 AM? your AI assistant doesn't care. it's not watching your inbox. it doesn't know this person downloaded three whitepapers and visited your pricing page twice.

you wake up, check your messages, start your day, and finally get to that lead 9 hours later. by then, they've already had three demos with competitors.

---

what makes openclaw different for sales

three things matter:

1. proactive engagement

openclaw can message *you* first. it's not waiting for you to ask—it's watching signals and flagging opportunities.

lead comes in from a company that matches your ICP? openclaw can alert you instantly, pre-research the account, and draft your outreach before you even know they exist.

this isn't AI as a tool you use. it's AI as a teammate watching your back.

2. persistent memory

most AI forgets everything between sessions. openclaw remembers.

every interaction with a lead, every piece of context you've gathered, every preference they've mentioned—it's stored and searchable. when that lead resurfaces 6 months later, you have instant context.

no more "let me check my notes." no more CRM archaeology. the context is just... there.

3. multi-channel native

leads don't care about your preferred channel. they message on linkedin, email, twitter, slack—wherever's convenient for them.

openclaw works across all of them. same memory. same context. same speed.

a lead DMs you on twitter at 11 PM? your agentic BDR can acknowledge within seconds, gather intel, and tee up a warm handoff for the morning.

---

the agentic BDR reality

here's where it gets interesting.

an agentic BDR powered by openclaw doesn't sleep. doesn't take weekends. doesn't need coffee breaks. doesn't context-switch.

it's monitoring signals 24/7:
- pricing page visits
- email opens
- linkedin engagement
- inbound chat requests
- form submissions

the moment something happens, it acts. not next business day. not when the SDR finishes their current task. immediately.

is this replacing humans? no. it's giving humans superhuman response times.

your best AE still closes the deal. your SDR still builds relationships. but they're no longer losing opportunities to a 47-hour response time problem.

---

the security debate

yes, giving AI agents access to your systems has risks. the people worried about this aren't wrong.

but here's the reality: the companies that figure out how to safely deploy agentic AI will have a structural advantage. the ones who wait for "perfect security" will watch their leads get poached by competitors who moved faster.

the answer isn't "don't use it." it's "use it thoughtfully."

sandbox it. limit permissions. audit actions. start with low-risk use cases like lead response and expand from there.

---

the bottom line

the debate about openclaw's significance misses the most practical application.

forget autonomous coding for a second. forget AI agents running your whole company.

focus on this: an AI that can respond to leads in seconds instead of hours.

that alone is worth the github stars.

speed to lead is everything. timing is the unfair advantage nobody talks about. and openclaw might be the first tool that actually solves the response time problem at scale.

while everyone argues about whether it's revolutionary or dangerous, the smart sales teams are quietly deploying it and watching their connect rates skyrocket.

the leads don't wait for the debate to settle.

---

building agentic BDR workflows with openclaw? check out gtm-skills.com/free-tools/openclaw for the full implementation guide.
```

---

### TWITTER: BDR Bitch Boy (Long-Form Article, Hardcore GTM)

**Format:** Twitter Article/Note — ~950 words
**Style:** lowercase, raw, hardcore GTM operator voice, aggressive confidence

```
the openclaw debate is missing the point. here's how i actually use it.

i've closed millions in deals. sat across from CFOs who wanted to watch me sweat. walked out of boardrooms where the wrong word meant walking away empty.

and you know what i learned?

the deals aren't won in the room. they're won before anyone sits down.

the rep who gets there first wins. period.

---

speed to lead is the only metric that matters

MIT research: respond in 5 minutes vs 30 minutes = 100x more likely to connect.

yet the average B2B response time? 47 hours.

while your SDRs are "prioritizing their pipeline" and "working through the queue," your competitor already booked the meeting.

i don't lose deals because my product is worse. i lose deals because someone else showed up first.

so i stopped letting that happen.

---

openclaw is my bdr bitch boy

i'm not being cute. that's what he is.

all the annoying parts of GTM? the stuff that makes you want to throw your laptop? he does it. and he does it well. extremely well. exceedingly well.

24/7 this thing is working for me:

- scanning for leads that match my ICP
- monitoring intent signals
- watching for trigger events
- researching accounts before i even know they exist

when he finds something? he tells me. immediately.

telegram ping at 2 AM: "found a VP of Sales at a series B fintech. they just posted a job for 3 SDRs. budget is moving. here's the angle."

i wake up, glance at my phone, approve the outreach. go back to sleep.

by 9 AM the meeting's booked.

---

he crafts my outreach. not template garbage.

every message sounds like me because it IS me.

he's read every deal i've closed. every email that got a response. every cold call that converted. he knows my voice better than my marketing team does.

when he writes outreach, it's not "i noticed your company is growing" bullshit. it's specific. it's personal. it references the exact pain point that company is dealing with right now.

and here's the thing that makes people uncomfortable:

when he cold calls a prospect? he does it in my voice.

when he leaves a linkedin voice message? my voice.

not some robot. not some generic AI tone. MY voice. trained on hours of my calls.

the prospect thinks they're talking to me. because functionally, they are.

---

he remembers everything

had a conversation with a prospect 6 months ago? they went dark? suddenly they're back?

openclaw remembers every detail.

"hey john, last time we talked you said the CFO needed to sign off and budget was tight until Q2. you also mentioned your daughter's soccer tournament was that weekend. how'd that go? and more importantly—did Q2 budget come through?"

that's not scripted. that's remembered.

every conversation we have, he gets better. learns what works. learns what doesn't. adapts.

day 1 he was good. day 90 he's scary good.

---

the workflow

here's how my day actually works now:

morning: check telegram. openclaw has 3-5 warm leads queued with research briefs and draft outreach. i approve, tweak, or kill each one in under 2 minutes.

during the day: he monitors. new signal comes in—job posting, funding announcement, linkedin engagement—he flags it. i get a ping. "worth pursuing?" yes or no.

calls: he's already left voice messages to the ones i approved. some call back. those go straight to my calendar.

evening: he sends me a summary. what worked. what didn't. what's in the pipeline.

i focus on closing. he focuses on everything else.

---

"but isn't this risky?"

yeah. giving an AI agent access to your outreach has risks.

you know what else is risky? losing every deal because you're too slow.

the companies figuring out how to deploy this safely will eat the companies waiting for "perfect security."

i'm not reckless. i sandbox it. i review before anything goes out. i audit what he's doing.

but i'm also not sitting on the sidelines while my competitors move faster.

---

the bottom line

everyone's debating whether openclaw is revolutionary or dangerous. 60k github stars. VCs investing. security people freaking out.

here's what i know:

i haven't missed a hot lead in 4 months. my response time is under 3 minutes. my pipeline is fuller than it's ever been.

openclaw isn't replacing me. he's multiplying me.

he handles the grind. i handle the close.

that's the game now.

---

if you want to see how i configured this:
gtm-skills.com/free-tools/openclaw

or keep doing it the old way. more leads for me.
```

---

### LINKEDIN: 24 Tonalities Launch (Name-Drop List + Comment CTA)

**Format:** Single post with comment engagement hack
**Engagement target:** High comments (CTA drives replies)
**Inspired by:** Udi Menkes "Awesome PM Skills" post (221 likes, 383 comments)
**Adapted elements:** Name-drop credibility, specific numbers, comment CTA — NOT copied: different hook, structure, voice

```
Every AI writes the same way.

Formal. Safe. Forgettable.

Meanwhile, the best salespeople in history each had a distinct voice that moved people to action.

Hormozi's urgency. Voss's tactical empathy. Ogilvy's precision. Sandler's psychology.

I wanted my AI to write like them. Not like a committee.

So I built tonality modes.

24 of them. Each one captures how a specific master communicates:

• Alex Hormozi — high-pressure, offer-driven
• Chris Voss — negotiation, mirroring, labeling
• Seth Godin — permission, tribes, remarkable
• David Ogilvy — long-form, direct response
• Naval Ravikant — leverage, first principles
• Hemingway — short, concrete, visceral
• The Challenger Sale — teaching, tailoring, control
• MEDDIC — qualification, metrics, process

Plus 16 more covering everything from executive briefings to win-back campaigns.

Pick a tonality. Feed it your context. Get copy that actually sounds like something.

Free. Open source. Works with Claude Code and Cursor.

Comment "tonalities" and I'll drop the link.
```

---

### LINKEDIN: openclaw Memory System (Persistent Context)

```
The biggest problem with AI for sales isn't intelligence.

It's amnesia.

—

Every AI sales tool I've tried has the same fatal flaw:

You have a great conversation with a prospect on Monday.
By Wednesday, the AI has zero memory of it.
You're starting from scratch every single time.

That's not augmentation. That's a liability.

—

I've been running sales agents differently.

Using openclaw (formerly Clawdbot), my agents have persistent memory that survives across:
• Sessions
• Days
• Weeks
• Channels (WhatsApp, Telegram, Discord, Slack)

When I talk to a prospect, the agent remembers everything from every previous conversation.

—

How the memory system works:

Two layers of storage (plain Markdown files):

1. MEMORY.md - Long-term facts
   "John @ Acme: Series B, CFO needs to approve, budget cycle is Q2, concerned about integration complexity"

2. memory/YYYY-MM-DD.md - Daily logs
   "2024-01-29: Called John, discussed pricing, he's looping in their IT director, follow up next Thursday"

Both persist indefinitely. Both are searchable. Both load automatically.

—

The multi-channel piece is key for sales.

Start a conversation on WhatsApp.
Continue on Telegram.
The agent remembers both.

Session scope = "per-sender" means each prospect has their own persistent context.

No more "remind me what we discussed." The agent knows.

—

Before the AI's context window fills up, openclaw does something clever:

It triggers an automatic "memory flush"—prompting the model to save important facts before summarizing old context.

Your prospect details are never lost.

—

I wrote up a full guide on configuring openclaw for GTM agents:

gtm-skills.com/free-tools/openclaw

Covers:
• Memory architecture deep dive
• Multi-channel configuration
• Sample config for sales agents
• Key settings explained

—

If you're building AI sales workflows, memory isn't optional.

It's the difference between a demo toy and a real tool.

What's your current approach to AI memory in sales?
```

---

### LINKEDIN: AE Workflow Transformation (Three Agents)

```
I rebuilt how my AE team works.

Not with a new CRM.
Not with another sales tool.
With prompts.

Here's what I mean:

—

The average AE spends 30 minutes researching a single account.

They pull up LinkedIn. Scan the 10-K. Read some news articles. Try to find an angle.

Then they write an email that says "I noticed your company is growing..."

That's not personalization. That's wasted motion.

—

So I built a different system.

Three AI agents that handle the grunt work:

1. Research Agent - pulls data, identifies triggers, maps stakeholders
2. Personalization Agent - turns research into specific messaging
3. Execution Agent - manages sequences with human approval

The AE focuses on conversations. The agents handle the prep.

—

The prompts powering these agents?

I packaged them into an open-source library.

2,500+ prompts organized by:
• Industry (SaaS, FinTech, Healthcare, Manufacturing...)
• Role (SDR, AE, CSM, Sales Manager...)
• Workflow (Research, Outreach, Discovery, Negotiation...)

Every combination has tailored prompts.

—

Why give this away?

Because the prompts are the starting point, not the destination.

Your edge comes from:
• How you customize them to your ICP
• The iteration cycles you run
• The data you feed into them

The prompts just accelerate the starting line.

—

If you're building agentic sales workflows, grab them:

gtm-skills.com/prompts

GitHub: github.com/gtm-skills/gtm

MIT license. Use however you want.

—

What's your current research workflow look like?

Curious if anyone else is running agent-based systems.
```

---

### LINKEDIN: 12 Meetings Story (Research Agent Results)

```
Last month an AE on my team booked 12 meetings in one week.

Same territory. Same product. Same quota.

The difference: she stopped doing research manually.

Here's the shift:

—

Before:
• 25 min researching each account
• Generic "personalization"
• 3-4 meetings per week
• Constant context switching

After:
• Research agent preps accounts overnight
• She reviews briefs in 2 minutes each
• Writes genuinely personalized outreach
• 12 meetings. Same effort.

—

The research agent isn't magic.

It's a prompt + data sources + structure.

It pulls:
• Recent news and funding
• Job postings (hiring = pain signals)
• 10-K mentions of strategic priorities
• LinkedIn for stakeholder mapping

Outputs a 1-page brief with actual sales angles.

—

I've open-sourced all the prompts behind this system.

2,500+ prompts for:
• Account research
• Personalization by industry
• Discovery questions
• Objection handling
• Follow-up sequences

Organized by role, industry, and workflow.

—

Not selling anything here.

Just sharing what worked.

If you're experimenting with AI in your sales workflow, these might save you time:

gtm-skills.com

—

What's working in your outbound right now?

Genuine question - trying to learn from what others are testing.
```

---

### LINKEDIN: Tonalities — AI Writes Like a Committee (Voice Problem)

**Format:** Problem-first, name-drop credibility, comment CTA
**Angle:** Generic AI voice is forgettable. Distinct voices close deals.

```
ChatGPT writes like a committee.

Safe. Formal. Forgettable.

Every cold email sounds the same. Every LinkedIn message reads like it was generated by the same intern.

That's not how closers communicate.

The best salespeople have distinct voices:

• Hormozi — urgency, scarcity, "you'd be stupid not to"
• Chris Voss — mirrors, labels, tactical empathy
• Ogilvy — long-form persuasion, direct response
• Sandler — pain funnels, upfront contracts, reversals
• Naval — first principles, leverage, clarity

I studied how each of them writes. The patterns. The word choices. The rhythm.

Then I built 24 tonality modes.

Pick one. Feed it your context. Get copy that sounds like a human with a point of view.

Not corporate. Not safe. Not forgettable.

Totally free. No signup. No email gate. Just use it.

Comment "voice" and I'll send the link.
```

---

### LINKEDIN: Generic AI Problem — 2500+ Prompts (Specificity Fix)

**Format:** Pain example, problem diagnosis, solution with specifics, comment CTA
**Angle:** AI doesn't know sales. We taught it.

```
I asked ChatGPT to write a cold email last week.

It gave me:

"I hope this email finds you well. I wanted to reach out because I believe our solution could add value to your organization."

That's not a cold email. That's a delete button magnet.

The problem isn't AI. It's that AI doesn't know sales.

It doesn't know MEDDIC. It doesn't know Challenger. It doesn't know the difference between discovery questions for a CFO vs. a VP of Engineering.

So I built a prompt library that does.

2,500+ prompts organized by:

• Industry (SaaS, FinTech, Healthcare, Manufacturing)
• Role (SDR, AE, CSM, Founder)
• Workflow (Research, Outreach, Discovery, Negotiation)

Every combination has specific prompts built on frameworks that actually close.

Not "write a cold email."

"Write a cold email for a Series B FinTech CFO using pain-based Sandler methodology, referencing their recent hiring surge as a trigger event."

That's the difference.

Totally free. No signup. No gated PDF nonsense.

Comment "prompts" and I'll drop the link.
```

---

### REDDIT r/sales: openclaw Persistent Memory Setup

```
TITLE: How I'm using persistent AI memory to actually remember prospects (openclaw setup)

---

Been experimenting with AI for sales workflows and the biggest limitation I kept hitting: memory.

Every tool forgets everything the moment you close the chat. Talk to a prospect Monday, by Wednesday the AI has zero context. You're basically starting fresh every time.

**The Solution: openclaw (formerly Clawdbot)**

It's a messaging gateway that connects WhatsApp/Telegram/Discord/Slack to Claude (or other models), but the killer feature is persistent memory.

**How the memory works:**

Instead of RAM that disappears, it stores everything in Markdown files:

- `MEMORY.md` - Long-term facts about prospects (company context, pain points, deal stage, objections raised)
- `memory/YYYY-MM-DD.md` - Daily conversation logs

Both files persist forever and auto-load at session start.

**Why this matters for sales:**

1. **Continuity** - "Last time you mentioned the CFO needed to approve this and budget was tight until Q2..." — that's not scripted, that's remembered

2. **Multi-channel** - Start convo on WhatsApp, continue on Telegram. Same memory.

3. **No manual notes** - The AI tracks deal details automatically

4. **Compaction safety** - Before context fills up, it auto-prompts the model to save important facts

**Key config for sales:**

```json
{
  "session": {
    "scope": "per-sender"  // Each prospect gets own context
  },
  "compaction": {
    "memoryFlush": { "enabled": true }  // Save before summarizing
  }
}
```

**I wrote up a full guide:**

gtm-skills.com/free-tools/openclaw

Covers memory architecture, multi-channel setup, sample config for sales agents.

**The project itself:**

molt.bot (install: `npm install -g openclaw@latest`)

---

Curious if anyone else is running AI with persistent memory for sales. What's your setup?
```

---

### REDDIT r/ChatGPT: openclaw Memory Architecture Deep Dive

```
TITLE: Deep dive: How openclaw's persistent memory system works (Markdown-based, semantic search, multi-channel)

---

I've been digging into openclaw's memory architecture and wanted to share how it works for anyone building AI agents that need to remember things long-term.

**The Problem openclaw Solves:**

Most AI tools have session-based memory that disappears when you close the chat. For use cases like sales, support, or personal assistants, you need persistence across days/weeks/months.

**How openclaw Does Memory:**

**1. File-based storage (not RAM)**

Memory is stored as plain Markdown in your workspace:

```
~/clawd/
├── MEMORY.md           # Long-term durable facts
└── memory/
    ├── 2024-01-28.md   # Yesterday's context
    └── 2024-01-29.md   # Today's notes
```

At session start, it loads MEMORY.md + last 2 days of logs automatically.

**2. Semantic search (hybrid BM25 + vector)**

The system builds a semantic index over memory files:
- Vector embeddings for meaning-based search
- BM25 for exact keyword matching
- Default: 70% vector, 30% text weighting

You can search for concepts even if the wording is different.

**3. Auto memory flush before compaction**

When context approaches token limits, openclaw triggers a silent turn prompting the model to save important memories before summarizing. Critical details don't get lost.

**4. Multi-channel persistence**

Memory is shared across WhatsApp, Telegram, Discord, Slack, etc. Session scope can be:
- `per-sender` - each person has own context
- `per-channel` - shared context per channel
- `global` - one context for everything

**Config example:**

```json
{
  "session": {
    "scope": "per-sender",
    "reset": {
      "mode": "idle",
      "idleMinutes": 480
    }
  },
  "agents": {
    "defaults": {
      "contextPruning": { "mode": "adaptive" },
      "compaction": {
        "memoryFlush": { "enabled": true }
      }
    }
  }
}
```

**Full docs:** docs.molt.bot

**I wrote a guide on using this for sales/GTM agents specifically:** gtm-skills.com/free-tools/openclaw

Anyone else using file-based memory for AI agents? Curious about other approaches.
```

---

### REDDIT r/sales: 2500+ Prompts Open Source Launch

```
TITLE: I open-sourced 2,500+ sales prompts organized by industry/role/workflow - free to use

---

Hey r/sales,

I've been building out an agentic workflow for my AE team and ended up creating a ton of prompts in the process. Figured I'd package them up and share.

**What it is:**

A library of 2,500+ prompts organized by:
- Industry (SaaS, FinTech, Healthcare, Manufacturing, etc.)
- Role (SDR, AE, CSM, Sales Manager, etc.)
- Workflow (Research, Cold Outreach, Discovery, Objection Handling, etc.)

Every combination has specific prompts. So "SaaS AE Discovery Questions" is different from "Healthcare AE Discovery Questions."

**Why I made it:**

I was tired of generic prompt libraries that had stuff like "Write a cold email" with no context. Real sales work is specific - the questions you ask a healthcare CIO are different from a SaaS CTO.

So I built prompts that account for industry pain points, buyer personas, and workflow stages.

**Examples:**

- Research prompts that pull specific data points per industry
- Cold email templates that reference industry-specific triggers
- Discovery questions tailored to different buyer types
- Objection handling for common pushbacks in each vertical

**How to use it:**

Browse: gtm-skills.com/prompts
GitHub: github.com/gtm-skills/gtm

MIT license - copy, modify, use however you want.

**What I'm looking for:**

Feedback, honestly. What's missing? What industries or workflows should I add?

If you use any of these, let me know what works and what doesn't.

---

Not trying to sell anything. No email capture or gated content. Just a resource I found useful and figured others might too.
```

---

### REDDIT r/sales: 6 Months Building Prompts (Problem-Led Story)

```
TITLE: Spent 6 months building prompts for my sales team - sharing the full library (free)

---

Context: I run a small sales team and got frustrated with how much time we spent on repetitive tasks - research, writing first drafts of emails, prepping for discovery calls.

So I started building prompts. A lot of them.

After 6 months, I had 2,500+ prompts organized by industry, role, and workflow. Decided to open-source the whole thing.

**The problem I was solving:**

Generic prompts suck. "Write a cold email to a prospect" doesn't help when you're selling compliance software to healthcare CFOs.

So I built prompts that are specific:
- Industry context (pain points, buyers, regulations)
- Role context (what SDRs need vs what AEs need)
- Workflow context (research vs outreach vs discovery)

**What's in there:**

- 8 industries × 6 roles × 6 workflows = hundreds of specific combinations
- Each combination has 5-10 prompts
- Prompts for research, personalization, qualification, objection handling, follow-up

**Example:**

Instead of "Write a discovery question," you get:

"Create 10 discovery questions for a healthcare CFO focused on compliance costs, reimbursement pressures, and EHR integration challenges. Include questions about their decision process and timeline."

**Link:**

gtm-skills.com/prompts

Or the GitHub: github.com/gtm-skills/gtm

No signup, no email capture, no catch. MIT license.

**Ask:**

What prompts would be useful that aren't in there? Happy to add more if there's demand for specific industries or workflows.
```

---

### REDDIT r/ChatGPT: pSEO System — 2500 Pages Programmatically

```
TITLE: I built a system that generates 2,500+ unique prompt pages programmatically - here's how

---

Wanted to share a project I just finished.

**The concept:**

Instead of one page with "sales prompts," I built a system that generates unique pages for every combination of:
- 8 industries (SaaS, FinTech, Healthcare...)
- 6 roles (SDR, AE, CSM...)
- 6 workflows (Research, Outreach, Discovery...)

That's 288 unique pages, each with tailored prompts for that specific combination.

**Why this works better:**

"SaaS SDR Cold Outreach prompts" is a different need than "Healthcare AE Discovery prompts."

By generating specific pages, each one can:
- Reference industry-specific pain points
- Include role-appropriate language
- Match the workflow stage

**How I built it:**

Next.js with dynamic routes. The data structure looks like:

```javascript
industries = [{ slug: 'saas', painPoints: [...], buyers: [...] }]
roles = [{ slug: 'sdr', activities: [...] }]
workflows = [{ slug: 'cold-outreach', stages: [...] }]

// Generate prompts by injecting context
function generatePrompts(industry, role, workflow) {
  // Returns 5-10 contextual prompts
}
```

The `generateStaticParams()` function creates all combinations at build time.

**Results:**

- 420+ pages generated in 44 seconds
- Each page has unique, contextual prompts
- All indexed by Google

**The prompts themselves:**

Open source: github.com/gtm-skills/gtm
Browse: gtm-skills.com/prompts

If you're building something similar (prompt libraries, pSEO systems), happy to answer questions about the architecture.
```

---

## Copywriting Enhancers

### Enhancer #1: Three Adversarial Personas

Before posting, run content through:

**The Ruthless Competitor:**
> "You're a competing sales tool's CMO. Find every weakness, every claim to counter, every angle to attack."

**The Cynical Consumer:**
> "You've been burned by 47 similar promises. What triggers your BS detector? What would crack your skepticism?"

**The Distracted Scroller:**
> "You're on your phone at 11pm, half-watching Netflix. You'll give this 0.8 seconds. What stops your thumb?"

**Synthesis:** Any element that fails ANY persona gets rebuilt.

---

### Enhancer #2: Objection Gauntlet

> "Have the most skeptical [target persona] list every objection, doubt, or reason they'd stop reading. Address each within the copy. Repeat until objection rate < 10%."

---

### Enhancer #3: Specificity Audit

> "Replace any vague statement with concrete specificity: numbers, timeframes, mechanisms, sensory details. If a line could apply to any competitor, it's not specific enough."

---

### Enhancer #4: Voice Authenticity Test

> "Read aloud as if speaking to a customer at a coffee shop. Flag any phrase that sounds written rather than spoken, any corporate-speak, any line that glazes eyes."

---

## Adding New Prompt Styles

To add a new copywriting style, append to this section:

### [STYLE NAME]

**When to use:** [context]

**The prompt:**
```
[Your enhancer prompt here]
```

**Example output:**
```
[Before/after example]
```

---

## How to Post (Buffer GUI)

### Step-by-Step

1. **Preview your content**
   ```bash
   node scripts/poasting.js --preview twitter 1
   ```

2. **Open Buffer**
   - Go to [publish.buffer.com](https://publish.buffer.com)
   - Make sure Twitter + LinkedIn are connected

3. **Create post**
   - Click "Create" or the compose button
   - Select the platform (Twitter or LinkedIn)
   - Paste the content from the preview

4. **Schedule**
   - **Twitter:** Tuesday-Thursday, 9:00 AM EST
   - **LinkedIn:** Tuesday-Thursday, 6:30 AM or 6:00 PM EST (NOT during work hours!)
   - **Reddit:** Post directly on reddit.com (Buffer doesn't support)

5. **For Twitter threads**
   - Paste first tweet
   - Click "Add to thread" for each subsequent tweet
   - Or use Twitter's native composer for better thread UX

### LinkedIn Timing Rules

```
🚫 BLOCKED: 8:00 AM - 5:30 PM EST (work hours)

✅ ALLOWED:
   • Early morning: 6:00 AM - 7:45 AM EST
   • Early evening: 5:45 PM - 9:00 PM EST
```

**Why?** LinkedIn during work hours looks like you're not working. Early AM = "thought leader grinding before work." Evening = "reflecting on the day."

---

## Future: Direct API Integration

Buffer deprecated their API for new apps. When we want full automation:

### Twitter API v2
```bash
# Requires: developer.twitter.com account (~$100/mo for basic)
npm install twitter-api-v2
```

```javascript
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function postThread(tweets) {
  let lastTweetId = null;
  for (const tweet of tweets) {
    const response = await client.v2.tweet({
      text: tweet,
      reply: lastTweetId ? { in_reply_to_tweet_id: lastTweetId } : undefined
    });
    lastTweetId = response.data.id;
  }
}
```

### LinkedIn API
```javascript
// Requires: linkedin.com/developers app + OAuth 2.0
const axios = require('axios');

async function postToLinkedIn(accessToken, authorId, text) {
  return axios.post('https://api.linkedin.com/v2/ugcPosts', {
    author: `urn:li:person:${authorId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text },
        shareMediaCategory: 'NONE'
      }
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
  }, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
}
```

### Reddit
Manual posting only. Reddit's API restricts automated posts for new apps.

---

## Launch Checklist

### Pre-Launch (Day Before)
- [ ] Final review of all drafts
- [ ] Run through copywriting enhancers
- [ ] Test all links (gtm-skills.com, GitHub)
- [ ] Prepare images/screenshots if needed
- [ ] Set up Buffer queue OR API credentials

### Launch Day
- [ ] 9:00 AM EST - Post Twitter thread
- [ ] 9:30 AM EST - Post LinkedIn
- [ ] 10:00 AM EST - Post to r/sales
- [ ] 10:30 AM EST - Post to r/ChatGPT (if doing)
- [ ] Monitor engagement, reply to comments

### Post-Launch
- [ ] Engage with every comment (first 2 hours critical)
- [ ] Cross-reference: "Also shared on Twitter if you want to RT"
- [ ] Track: impressions, clicks, GitHub stars
- [ ] Note what resonates for future content

---

## Metrics to Track

| Platform | Metric | Target |
|----------|--------|--------|
| Twitter | Impressions | 50K+ |
| Twitter | Profile visits | 500+ |
| LinkedIn | Impressions | 20K+ |
| LinkedIn | Comments | 50+ |
| Reddit | Upvotes | 100+ |
| GitHub | Stars (delta) | +50 |
| Site | Traffic (24h) | 1K+ |

---

## Notes

- Reddit is most sensitive to self-promotion. Lead with value, mention link casually
- Twitter threads perform best with strong hook + substance in first 3 tweets
- LinkedIn algorithm favors comments in first hour - engage aggressively
- Best posting times: Tuesday-Thursday, 9-11am EST

---

*Last updated: 2026-01-29*
