import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import {
  ChevronRight,
  ArrowRight,
  Link2,
  Search,
  Mail,
  MessageSquare,
  Presentation,
  Handshake,
  RefreshCw,
  Users,
  Rocket,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agentic GTM Workflows: 10 Prompt Chains That Replace Manual SDR Work',
  description:
    '10 real, copy-paste prompt chains pulled from a 2,500+ prompt library — cold outreach, discovery prep, objection handling, negotiation, and deal re-engagement, each one built as a sequence where every output feeds the next prompt.',
  openGraph: {
    title: 'Agentic GTM Workflows: 10 Prompt Chains That Replace Manual SDR Work',
    description:
      '10 real prompt chains for agentic GTM — cold outreach, discovery, demo, objections, negotiation, and re-engagement, built from an actual 2,500+ prompt library.',
  },
};

interface ChainStep {
  step: number;
  title: string;
  explanation: string;
  prompt: string;
}

interface Chain {
  id: string;
  title: string;
  tagline: string;
  icon: typeof Search;
  source: string;
  steps: ChainStep[];
}

const chains: Chain[] = [
  {
    id: 'icp-research-to-outreach',
    title: 'ICP Research → Personalized Outreach Chain',
    tagline: 'Turn a raw ICP definition into a scored prospect list and a ready-to-send email — without opening a spreadsheet.',
    icon: Search,
    source: 'Prospecting Agent + Outreach Agent workflows',
    steps: [
      {
        step: 1,
        title: 'Find companies matching your ICP',
        explanation: 'Generates a shortlist with the specific reason each company fits, not just a name and domain.',
        prompt: `You are a Prospecting Agent. Generate a list of companies matching this ICP:

ICP Criteria:
- Industry: [INDUSTRIES]
- Company size: [EMPLOYEE RANGE]
- Technology: [TOOLS THEY LIKELY USE]
- Signals: [FUNDING, HIRING, ETC.]
- Geography: [REGIONS]

Search and return:
1. Company name
2. Why they match (specific criteria)
3. Key contact to target
4. Suggested angle for outreach

Find 10 companies matching at least 4 of 5 criteria.`,
      },
      {
        step: 2,
        title: 'Score and prioritize the list',
        explanation: 'Feed the output of step 1 straight back in — this ranks who to work first instead of going in list order.',
        prompt: `Score these companies against our ICP and prioritize:

Companies:
[PASTE THE LIST FROM THE PROSPECTING PROMPT]

Scoring criteria:
- Industry fit (0-25)
- Size fit (0-25)
- Technology fit (0-25)
- Timing signals (0-25)

For each company:
1. Score each criterion
2. Total score
3. Rank order
4. Recommended action (pursue now / nurture / skip)`,
      },
      {
        step: 3,
        title: 'Draft the personalized cold email',
        explanation: 'The research brief from steps 1-2 becomes the context block, so the email references real specifics instead of generic ICP language.',
        prompt: `You are an Outreach Agent. Create a cold email for this prospect:

Prospect: [NAME], [TITLE] at [COMPANY]
Research context:
[PASTE THE RESEARCH BRIEF FROM STEP 1]

Our value prop: [YOUR VALUE PROP]
Campaign: [CAMPAIGN FOCUS]

Write an email that:
1. Opens with something specific to them
2. Connects to a pain they likely have
3. Offers relevant value
4. Has a clear, low-friction CTA
5. Stays under 100 words`,
      },
      {
        step: 4,
        title: 'Build the full multi-channel sequence',
        explanation: 'Expands the single email into a two-week, multi-channel cadence so the top-priority accounts from step 2 get more than one shot.',
        prompt: `Design a multi-channel sequence for this prospect:

Prospect: [NAME], [TITLE] at [COMPANY]
Channel preferences: [WHAT WE KNOW]
Urgency: [HIGH/MEDIUM/LOW]

Create a 2-week sequence:
- Day 1: [CHANNEL + MESSAGE BRIEF]
- Day 3: [CHANNEL + MESSAGE BRIEF]
- Day 5: [CHANNEL + MESSAGE BRIEF]
- Day 8: [CHANNEL + MESSAGE BRIEF]
- Day 12: [CHANNEL + MESSAGE BRIEF]

Include subject lines for emails and connection note for LinkedIn.`,
      },
    ],
  },
  {
    id: 'multi-channel-sdr-sequence',
    title: 'Multi-Channel SDR Sequence Chain',
    tagline: 'One target, three channels, one reply-handling playbook — the full cold outreach loop an SDR runs every day.',
    icon: Mail,
    source: 'SDR + Cold Outreach role-workflow prompts',
    steps: [
      {
        step: 1,
        title: 'Write the 3-touch email sequence',
        explanation: 'Sets the core narrative (hook, new angle, breakup) that every other channel in this chain reinforces.',
        prompt: `Write a cold email sequence (3 touches) for an SDR.

Target: [TITLE] at [COMPANY TYPE]
Value prop: [WHAT WE DO]
Trigger: [WHY NOW]

Email 1: Initial outreach (hook + value)
Email 2: Follow-up (new angle, 3 days later)
Email 3: Breakup (5 days later)

Each email under 75 words.`,
      },
      {
        step: 2,
        title: 'Build the cold call opener',
        explanation: 'Reuses the same value statement from the email sequence so the phone touch doesn\'t contradict the written one.',
        prompt: `Create a cold call opener that gets past "not interested."

Target: [TITLE]
My company: [WHAT WE DO]

Structure:
- Pattern interrupt (not "how are you")
- Permission-based approach
- Quick value statement
- Soft ask for time`,
      },
      {
        step: 3,
        title: 'Add the LinkedIn touch',
        explanation: 'A parallel, lower-friction channel that runs alongside email/call without pitching in the connection request.',
        prompt: `Write a LinkedIn cold outreach sequence:
1. Connection request (under 300 chars)
2. Thank you + soft intro (once accepted)
3. Value message (if no response)

Don't be salesy. Be curious and valuable.`,
      },
      {
        step: 4,
        title: 'Handle the reply, whatever it says',
        explanation: 'Closes the loop — feed in the actual reply text from any of the three channels above and get a response that keeps the door open.',
        prompt: `My cold email got this reply: "[THEIR RESPONSE - e.g., 'Not interested' / 'We use X' / 'Bad timing']"

Write a response that:
- Doesn't argue
- Shows understanding
- Leaves door open
- Provides unexpected value`,
      },
    ],
  },
  {
    id: 'discovery-prep-chain',
    title: 'Discovery Prep Chain',
    tagline: 'From "I have a call in 15 minutes" to a follow-up email that quotes the prospect\'s own words back to them.',
    icon: MessageSquare,
    source: 'Discovery Agent workflow',
    steps: [
      {
        step: 1,
        title: 'Build the one-page pre-call brief',
        explanation: 'Compresses everything you need to know into a doc you can read in five minutes before the call.',
        prompt: `You are a Discovery Agent. Prepare me for a discovery call.

Prospect: [NAME], [TITLE] at [COMPANY]
Meeting time: [WHEN]

Research and prepare:
1. **Company context**: What do I need to know?
2. **Their likely challenges**: Based on role and industry
3. **Questions to ask**: 10 discovery questions
4. **Landmines to avoid**: Topics to handle carefully
5. **Success criteria**: What makes this a good call?

Format as a one-page prep doc I can review in 5 minutes.`,
      },
      {
        step: 2,
        title: 'Expand into a full question set',
        explanation: 'Takes the "10 discovery questions" from step 1 and organizes a deeper set by current state, pain, future state, process, and timing.',
        prompt: `Generate discovery questions for this specific situation:

Prospect: [TITLE] at [COMPANY]
Industry: [INDUSTRY]
What we know: [CONTEXT]
Our solution: [YOUR PRODUCT]
What we need to learn: [GAPS IN KNOWLEDGE]

Create 15 discovery questions organized by:
1. Current state (how they do things today)
2. Pain and impact (problems and consequences)
3. Future state (what they want to achieve)
4. Decision process (how they'll buy)
5. Timing (urgency and timeline)`,
      },
      {
        step: 3,
        title: 'Extract insights from the call notes',
        explanation: 'After the call, paste your raw notes in — this is where the prep work in steps 1-2 pays off with a structured qualification read.',
        prompt: `Analyze this discovery call and extract insights:

Call notes:
[PASTE NOTES OR TRANSCRIPT]

Extract:
1. **Key pains identified**: [LIST]
2. **Impact of problems**: [QUANTIFIED IF POSSIBLE]
3. **Decision process**: [WHO, HOW, WHEN]
4. **Next steps agreed**: [LIST]
5. **Red flags**: [CONCERNS]
6. **Champion status**: [ASSESSMENT]
7. **Recommended actions**: [WHAT TO DO NEXT]`,
      },
      {
        step: 4,
        title: 'Send the follow-up in their words',
        explanation: 'Uses the exact pains extracted in step 3 so the follow-up email mirrors the prospect\'s language instead of your product\'s.',
        prompt: `Create a post-discovery follow-up email:

Call summary:
[WHAT WAS DISCUSSED]

Key pains they mentioned:
[THEIR WORDS, NOT OURS]

Next steps agreed:
[WHAT THEY SAID]

Write a follow-up that:
1. Thanks them for time (briefly)
2. Summarizes what we heard (their words)
3. Confirms next steps
4. Attaches relevant resource
5. Keeps it scannable`,
      },
    ],
  },
  {
    id: 'ae-discovery-to-proposal',
    title: 'AE Discovery-to-Proposal Chain',
    tagline: 'The full arc of an AE-owned deal: call prep, a strong open, a tight recap, and a proposal that leads with outcomes.',
    icon: ArrowRight,
    source: 'Account Executive industry-role prompts',
    steps: [
      {
        step: 1,
        title: 'Prep the call from CRM context',
        explanation: 'Builds a one-page call-prep doc from account history and industry trends before you dial in.',
        prompt: `Prepare me for a discovery call with [PROSPECT NAME], [THEIR TITLE] at [COMPANY].

Research what I should know about:
1. Their company and recent news
2. Industry trends affecting them
3. Likely pain points around [KNOWN PAIN POINT AREAS]
4. Questions to ask about their decision process

Format as a one-page call prep doc.`,
      },
      {
        step: 2,
        title: 'Open the call with a pattern interrupt',
        explanation: 'Turns the prep doc into the actual first 30 seconds you\'ll say out loud.',
        prompt: `Write a discovery call opening for [THEIR TITLE] at [COMPANY].

Include:
- A pattern interrupt (not "how are you today")
- Acknowledgment of their time
- A clear agenda suggestion
- Permission to ask questions

Keep it under 30 seconds when spoken.`,
      },
      {
        step: 3,
        title: 'Turn call notes into a follow-up',
        explanation: 'Paste in what actually happened on the call and get a follow-up that restates their pains and locks the next step.',
        prompt: `Based on this discovery call:
[PASTE CALL NOTES]

Create a follow-up email that:
- Summarizes what we discussed
- Confirms next steps
- Restates the key pains they mentioned
- Attaches relevant resources`,
      },
      {
        step: 4,
        title: 'Write the proposal executive summary',
        explanation: 'The pains restated in step 3 become the "current situation" section here — the proposal reads as a direct response to the call, not a template.',
        prompt: `Write a proposal executive summary for [COMPANY].

Their situation:
- Current challenge: [PAIN POINT FROM DISCOVERY]
- Desired outcome: [THEIR GOAL]
- Key stakeholders: [BUYER TITLES]

Our solution: [YOUR PRODUCT/SERVICE]

Format: 1 page, focused on business outcomes not features.`,
      },
    ],
  },
  {
    id: 'demo-chain',
    title: 'Demo Chain',
    tagline: 'From discovery notes to a demo agenda, a talk track that uses the prospect\'s own words, and a follow-up that closes the gaps.',
    icon: Presentation,
    source: 'Demo Agent workflow',
    steps: [
      {
        step: 1,
        title: 'Build the demo plan from discovery notes',
        explanation: 'Turns raw discovery findings into a timed agenda ordered by the prospect\'s stated priorities, not your feature list.',
        prompt: `You are a Demo Agent. Create a demo plan for this prospect.

Prospect: [NAME], [TITLE] at [COMPANY]
Discovery notes:
[PASTE KEY FINDINGS]

Their top priorities:
1. [PRIORITY 1]
2. [PRIORITY 2]
3. [PRIORITY 3]

Create a demo flow:
1. **Opening** (2 min): How to frame the demo
2. **Priority 1** (10 min): What to show and why
3. **Priority 2** (10 min): What to show and why
4. **Priority 3** (5 min): What to show and why
5. **Closing** (5 min): How to end and next steps`,
      },
      {
        step: 2,
        title: 'Write the talk track for each section',
        explanation: 'Takes one priority block from the agenda in step 1 and scripts it to connect directly to the pain in the prospect\'s own language.',
        prompt: `Generate talk track for this demo section:

Feature/capability: [WHAT YOU'RE SHOWING]
Their pain point: [FROM DISCOVERY]
Their words: [HOW THEY DESCRIBED THE PAIN]

Create a talk track that:
1. Connects to their specific pain (use their words)
2. Shows the feature in context of their workflow
3. Quantifies the improvement
4. Invites their reaction`,
      },
      {
        step: 3,
        title: 'Pre-load objection responses',
        explanation: 'Prepares Acknowledge → Respond → Evidence → Redirect answers before the live objections show up mid-demo.',
        prompt: `Prepare objection responses for this demo:

Prospect profile: [INDUSTRY, SIZE, PERSONA]
Common objections in demos:
1. [OBJECTION 1]
2. [OBJECTION 2]
3. [OBJECTION 3]

For each objection, prepare:
1. Acknowledge (validate their concern)
2. Respond (address it directly)
3. Evidence (proof point or example)
4. Redirect (back to value)`,
      },
      {
        step: 4,
        title: 'Send the post-demo summary',
        explanation: 'Folds in whatever objections actually surfaced in step 3 so the follow-up addresses them by name instead of ignoring them.',
        prompt: `Create a post-demo summary email:

Demo attendees:
[LIST WITH ROLES]

What we showed:
[KEY DEMO SECTIONS]

Their reactions:
[POSITIVE MOMENTS, CONCERNS RAISED]

Next steps discussed:
[WHAT WAS AGREED]

Write a follow-up that:
1. Personalizes to each attendee's interests
2. Addresses concerns raised
3. Provides relevant resources
4. Confirms next steps`,
      },
    ],
  },
  {
    id: 'objection-handling-chain',
    title: 'Objection Handling Chain',
    tagline: 'Build the framework once, then reuse it live — general cheat sheet down to a specific stall pattern.',
    icon: Handshake,
    source: 'Objection Handling role-workflow prompts',
    steps: [
      {
        step: 1,
        title: 'Build the objection cheat sheet',
        explanation: 'Creates a reference doc for the five objections you hear most, before you ever need it in the moment.',
        prompt: `Create an objection handling cheat sheet for sales reps.

Common objections:
- "Too expensive"
- "We're using [competitor]"
- "Not a priority right now"
- "Need to think about it"
- "Send me more information"

For each: Acknowledge, clarify question, and response.`,
      },
      {
        step: 2,
        title: 'Handle the live objection',
        explanation: 'Applies the Acknowledge → Clarify → Respond → Confirm → Advance framework to whatever the prospect actually just said.',
        prompt: `Handle this objection: "[OBJECTION]"

Context: [DEAL STAGE, WHAT YOU KNOW]

Provide:
1. Acknowledge (show you heard them)
2. Clarify (understand the real concern)
3. Respond (address it directly)
4. Confirm (check if resolved)
5. Advance (next step)`,
      },
      {
        step: 3,
        title: 'Diagnose the "talk to my team" stall',
        explanation: 'A specific, high-frequency variant of step 2 — decides whether it\'s a real process step or a brush-off before you respond.',
        prompt: `My prospect said: "I need to talk to my team."

This is often a stall. Help me:
- Understand if it's real or a brush-off
- Questions to ask to qualify it
- How to stay engaged without being pushy
- Offer to help them sell internally`,
      },
    ],
  },
  {
    id: 'negotiation-chain',
    title: 'Negotiation Chain',
    tagline: 'Strategy before the ask, a structured response to the discount request, and paperwork that reinforces the value story.',
    icon: Layers,
    source: 'Negotiation Agent + Negotiation role-workflow prompts',
    steps: [
      {
        step: 1,
        title: 'Set the negotiation strategy',
        explanation: 'Establishes what to give, what to hold, and your walk-away point before procurement gets involved.',
        prompt: `You are a Negotiation Agent. Prepare a negotiation strategy.

Deal: [COMPANY], [DEAL SIZE]
Stage: [NEGOTIATION/PROCUREMENT]
Our champion: [NAME, TITLE]
Their procurement: [IF INVOLVED]

What they've asked for:
[LIST THEIR REQUESTS]

Our constraints:
[LIST OUR LIMITS]

Create:
1. Negotiation strategy (what to give, what to hold)
2. Trade-offs to propose (give X if they give Y)
3. Walk-away point
4. Paths to yes`,
      },
      {
        step: 2,
        title: 'Respond to the discount ask',
        explanation: 'Uses the constraints from step 1 to generate three graded response options instead of one reflexive answer.',
        prompt: `Handle this discount request:

Their ask: "[PASTE THEIR MESSAGE]"

Context:
- Deal size: [VALUE]
- Our standard discount authority: [%]
- Strategic importance: [HIGH/MEDIUM/LOW]
- Competitive pressure: [IF ANY]

Generate 3 response options:
1. Hold firm (with rationale)
2. Partial concession (with trade-off)
3. Full concession (with conditions)

Recommend which to use and why.`,
      },
      {
        step: 3,
        title: 'Draft the proposal executive summary',
        explanation: 'Packages the agreed-on position from step 2 into a one-pager that restates their challenge and quantifies ROI.',
        prompt: `Draft a proposal executive summary:

Prospect: [COMPANY]
Their needs:
[SUMMARIZE FROM DISCOVERY/DEMO]

Our solution:
[WHAT WE'RE PROPOSING]

Investment:
[PRICING]

Create a 1-page executive summary that:
1. Restates their challenges (their words)
2. Outlines our solution
3. Quantifies expected ROI
4. Proposes clear next steps`,
      },
      {
        step: 4,
        title: 'Send the final offer',
        explanation: 'Closes the chain when talks stall — firm, but written to preserve the relationship built in steps 1-3.',
        prompt: `Write a "final offer" email that creates urgency without being cheesy.

Context: We've been negotiating for [TIME]. They want [THEIR ASK]. I can offer [MY FINAL POSITION].

Make it firm but maintain the relationship.`,
      },
    ],
  },
  {
    id: 'deal-re-engagement-chain',
    title: 'Deal Re-engagement Chain',
    tagline: 'A stalled deal doesn\'t need a single "just checking in" email — it needs a strategy, an escalation, and a decision.',
    icon: RefreshCw,
    source: 'Follow-up Agent workflow',
    steps: [
      {
        step: 1,
        title: 'Build the re-engagement strategy',
        explanation: 'Plans three touches in advance so every message brings something new instead of repeating "following up."',
        prompt: `You are a Follow-up Agent. Create a re-engagement strategy.

Stalled prospect: [NAME] at [COMPANY]
Last contact: [DATE]
Stage when they went dark: [STAGE]
Last message sent: [SUMMARY]
What we know: [CONTEXT]

Create a 3-touch re-engagement sequence:
- Touch 1: [NEW ANGLE + CHANNEL]
- Touch 2: [DIFFERENT APPROACH]
- Touch 3: [BREAKUP/LAST CHANCE]

Each touch should bring new value, not just "checking in."`,
      },
      {
        step: 2,
        title: 'Execute touch one with real value',
        explanation: 'Fills in "Touch 1" from step 1 with an actual piece of value — news, a feature, a case study, or a data point.',
        prompt: `Generate a "new value" follow-up for this quiet prospect:

Prospect: [NAME], [TITLE]
Industry: [INDUSTRY]
Their challenge: [WHAT THEY CARED ABOUT]
Days since contact: [N]

Find something new to share:
1. Industry news relevant to them
2. New feature that addresses their need
3. Case study from similar company
4. Insight or data point they'd find valuable

Write a follow-up that leads with this value.`,
      },
      {
        step: 3,
        title: 'Send the breakup email',
        explanation: 'If touch one goes unanswered, this is "Touch 3" from the original strategy — closes the loop without guilt-tripping.',
        prompt: `Write a "breakup" email for a prospect who won't respond:

Prospect: [NAME]
Attempts made: [N EMAILS, N CALLS, ETC.]
Time elapsed: [DURATION]
Last known interest: [WHAT THEY SEEMED INTERESTED IN]

Write a final email that:
1. Doesn't guilt them
2. Leaves door open
3. Makes it easy to re-engage later
4. Has a soft CTA (not "let me know")`,
      },
      {
        step: 4,
        title: 'Decide the opportunity\'s fate',
        explanation: 'The chain\'s exit gate — after the breakup email, decide whether to try once more, nurture, or close-lost in the CRM.',
        prompt: `Determine if this opportunity should be closed-lost or given one more try:

Opportunity: [COMPANY]
Stage: [CURRENT]
Age: [DAYS/WEEKS]
Last activity: [DATE AND WHAT]
Pipeline value: [AMOUNT]

Signals:
- Positive: [LIST]
- Negative: [LIST]

Recommend:
1. One more attempt (with specific action)
2. Move to nurture (with timeline to revisit)
3. Close lost (with reason code)`,
      },
    ],
  },
  {
    id: 'customer-success-expansion-chain',
    title: 'Customer Success Expansion Chain',
    tagline: 'From onboarding health to a QBR that surfaces the expansion angle, backed by proof the buying committee can share.',
    icon: Users,
    source: 'Customer Success Manager industry-role prompts',
    steps: [
      {
        step: 1,
        title: 'Set the 90-day onboarding plan',
        explanation: 'Establishes the milestones and success metrics that later QBRs and expansion conversations get measured against.',
        prompt: `Create a 90-day onboarding plan for a new customer.

Account context:
- Company: [NAME]
- Main contact: [NAME], [THEIR TITLE]
- Use case: [PRIMARY USE CASE]
- Success metrics: [THEIR KPIS]

Include milestones, check-in cadence, and success criteria.`,
      },
      {
        step: 2,
        title: 'Prep the QBR agenda',
        explanation: 'Reviews performance against the metrics set in step 1 and surfaces roadmap items relevant to their stated pain points.',
        prompt: `Prepare a QBR agenda for [CUSTOMER], in their [Nth] quarter with us.

Cover:
- Results vs. goals
- Industry-specific benchmarks
- Expansion opportunities
- Roadmap items relevant to [THEIR TOP PAIN POINT]
- Strategic recommendations`,
      },
      {
        step: 3,
        title: 'Identify the expansion play',
        explanation: 'Takes "expansion opportunities" flagged in the QBR agenda and turns it into 3 concrete upsell plays with talking points.',
        prompt: `Identify upsell opportunities for [CUSTOMER].

Current usage: [WHAT THEY USE TODAY]
Their team: [SIZE AND ROLES]
Trends to consider: [FACTORS CREATING EXPANSION NEED]

Suggest 3 expansion plays with talking points.`,
      },
      {
        step: 4,
        title: 'Build the proof point',
        explanation: 'Turns this account\'s own results into a case study script — proof the champion can use to sell the expansion internally.',
        prompt: `Write a case study interview script for [CUSTOMER], a successful customer.

Focus on:
- Their situation before ([INITIAL PAIN POINT])
- Why they chose us
- Results achieved (quantified)
- What they'd tell a peer considering us`,
      },
    ],
  },
  {
    id: 'founder-led-sales-chain',
    title: 'Founder-Led Sales Chain',
    tagline: 'No SDR team yet? This is the chain founders run solo — positioning first, then outreach, meeting prep, and the credibility objection.',
    icon: Rocket,
    source: 'Founder/CEO industry-role prompts',
    steps: [
      {
        step: 1,
        title: 'Lock the positioning',
        explanation: 'Everything downstream in this chain — the email, the meeting, the objection response — draws on this positioning statement.',
        prompt: `I'm a founder selling into [TARGET INDUSTRY]. Help me craft my positioning.

We do: [DESCRIBE YOUR PRODUCT]
Competitors: [LIST COMPETITORS]
Pain points we address: [LIST PAIN POINTS]

Create:
- One-sentence positioning statement
- 30-second elevator pitch
- Key differentiators for this market`,
      },
      {
        step: 2,
        title: 'Send the founder cold email',
        explanation: 'Uses the positioning from step 1 but strips the template feel — this is meant to read as one founder writing to one person.',
        prompt: `Write a cold email I (founder/CEO) can send to a target prospect.

Context:
- We're an early-stage startup
- [DESCRIBE TRACTION/PROOF POINTS]
- We specifically help [TARGET SEGMENT] with [THEIR TOP PAIN POINT]

The founder email should feel personal, not templated.`,
      },
      {
        step: 3,
        title: 'Prep the meeting',
        explanation: 'For prospects who reply and might become a design partner, this reuses the positioning and traction points to prep the actual conversation.',
        prompt: `Prepare me for a meeting with [COMPANY], a potential design partner.

I need:
- Questions to assess their fit as a design partner
- How to pitch the partnership value exchange
- Red flags to watch for
- What to offer/what to ask for`,
      },
      {
        step: 4,
        title: 'Handle the credibility objection',
        explanation: 'The objection every early-stage founder hits mid-conversation — answers it using the traction points established back in step 2.',
        prompt: `A prospect asked for customer references but we're early stage.

Help me craft a response that:
- Acknowledges we're early
- Pivots to other proof points
- Offers alternative validation
- Maintains confidence without BS`,
      },
    ],
  },
];

const faqs = [
  {
    question: 'What is a prompt chain?',
    answer:
      'A prompt chain is a sequence of two to four prompts where the output of one becomes the input context for the next. Instead of asking an AI to do an entire workflow in one giant instruction, you break it into discrete steps — research, then personalize, then draft — and carry the result forward at each stage.',
  },
  {
    question: 'Why not just use one mega-prompt for the whole workflow?',
    answer:
      'A single mega-prompt asks a model to research, reason, and write in one pass, which tends to produce shallow research and generic writing because both compete for the same output. Chaining separates the jobs: the research step can be thorough because it only has to research, and the writing step is stronger because it starts from real, specific context instead of guessing.',
  },
  {
    question: 'Do I need an agent framework or MCP server to run these chains?',
    answer:
      'No. Every chain on this page works by copying the output of one prompt and pasting it into the placeholder of the next inside a normal Claude conversation. If you want the hand-off automated, tools like the GTM MCP Server or a Claude Code agent can pass outputs between steps for you, but manual copy-paste works fine to start.',
  },
  {
    question: 'Can I reorder or skip steps in a chain?',
    answer:
      'Yes. The chains are built around a logical hand-off, not a rigid script — skip the scoring step in the outreach chain if you already know who you\'re contacting, or start the objection chain straight at step 2 if you already have a framework. Just keep the steps you do run in order, since later prompts assume the context from earlier ones.',
  },
  {
    question: 'Where do these prompts come from?',
    answer:
      'They\'re adapted directly from the site\'s prompt library — the same prospecting, outreach, discovery, demo, negotiation, follow-up, and role-specific prompts indexed across gtm-skills.com/prompts, /role, and /agentic-bdr. Nothing here was invented for this page; each chain links real, existing prompts into a sequence.',
  },
];

export default function AgenticGtmPromptChainsPage() {
  return (
    <div className="py-12 md:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Guides', url: 'https://gtm-skills.com/guides' },
          {
            name: 'Agentic GTM Prompt Chains',
            url: 'https://gtm-skills.com/guides/agentic-gtm-prompt-chains',
          },
        ]}
      />
      <FAQJsonLd questions={faqs} />

      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/guides" className="hover:text-foreground transition-colors">
            Guides
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Agentic GTM Prompt Chains</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
            Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Agentic GTM Workflows: 10 Prompt Chains That Replace Manual SDR Work
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Every chain below is built from real prompts already indexed across our{' '}
            <Link href="/prompts" className="text-foreground underline underline-offset-4">
              2,500+ prompt library
            </Link>
            . No invented examples — just the actual prospecting, outreach, discovery, demo,
            negotiation, and follow-up prompts, linked into sequences where each output feeds
            the next input.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              <span>10 chains</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              <span>36 sequential prompts</span>
            </div>
          </div>
        </div>

        {/* Intro: what is a prompt chain */}
        <div className="mb-16 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            What a prompt chain is, and why it beats a mega-prompt
          </h2>
          <p>
            Most people's first instinct when they discover AI can help with sales work is to
            write one enormous prompt: "Research this company, find the right contact, draft a
            personalized email, and build a follow-up sequence." It reads efficient. In practice
            it produces mediocre output, because you've asked a single pass of reasoning to
            research, decide, and write at the same time — and the writing step ends up working
            from thin, half-formed research because the model never had room to do the research
            properly.
          </p>
          <p>
            A <strong className="text-foreground">prompt chain</strong> breaks that single ask
            into two to four discrete steps, where the output of each step becomes the input
            context for the next. Step one might research a company. Step two takes that research
            and drafts an email. Step three takes the email and the eventual reply and drafts a
            response. Every step does one job well, and every downstream step gets to work from
            real, specific context instead of a vague instruction to "personalize it."
          </p>
          <p>
            This is also exactly how agentic GTM workflows are structured under the hood — an{' '}
            <Link href="/agentic-bdr" className="text-foreground underline underline-offset-4">
              agentic BDR
            </Link>{' '}
            isn't one call to a model, it's a chain of specialized steps (research, score,
            personalize, sequence, handle-reply) with state passed between them. The 10 chains
            below are the manual, copy-paste version of that same architecture — pulled from the
            prompts already organized by{' '}
            <Link href="/role" className="text-foreground underline underline-offset-4">
              role
            </Link>{' '}
            and workflow across the site, so you can run them today without any tooling.
          </p>
        </div>

        {/* Chain navigation */}
        <div className="mb-12 p-4 rounded-xl bg-card">
          <h3 className="font-semibold mb-3">Jump to a chain:</h3>
          <div className="flex flex-wrap gap-2">
            {chains.map((chain) => (
              <a
                key={chain.id}
                href={`#${chain.id}`}
                className="px-3 py-1.5 rounded-lg bg-muted text-sm hover:bg-accent transition-colors"
              >
                {chain.title}
              </a>
            ))}
          </div>
        </div>

        {/* Chains */}
        <div className="space-y-16 mb-16">
          {chains.map((chain) => (
            <div key={chain.id} id={chain.id}>
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <chain.icon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{chain.title}</h2>
                  <p className="text-sm text-muted-foreground">{chain.tagline}</p>
                </div>
              </div>

              <div className="mb-6">
                <Badge variant="secondary" className="text-xs">
                  Source: {chain.source}
                </Badge>
              </div>

              <div className="space-y-4">
                {chain.steps.map((step) => (
                  <div key={step.step} className="p-5 rounded-xl border border-border bg-card">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-bold text-sm">{step.step}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{step.explanation}</p>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Prompt:</span>
                            <CopyButton text={step.prompt} label={`${chain.id}-step-${step.step}`} />
                          </div>
                          <div className="bg-card rounded-lg p-3">
                            <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                              {step.prompt}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                    {step.step < chain.steps.length && (
                      <div className="flex justify-center mt-3">
                        <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Explore more */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Explore the Full Library</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/prompts"
              className="p-4 rounded-xl border border-border bg-card hover:border-cyan-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-cyan-400 transition-colors">
                Browse All Prompts
              </h3>
              <p className="text-sm text-muted-foreground">
                2,500+ GTM prompts organized by category
              </p>
            </Link>
            <Link
              href="/role"
              className="p-4 rounded-xl border border-border bg-card hover:border-purple-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-purple-400 transition-colors">
                Prompts by Role
              </h3>
              <p className="text-sm text-muted-foreground">
                SDR, AE, CSM, RevOps, Sales Manager, and Founder prompts
              </p>
            </Link>
            <Link
              href="/agentic-bdr"
              className="p-4 rounded-xl border border-border bg-card hover:border-green-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-green-400 transition-colors">
                Agentic BDR
              </h3>
              <p className="text-sm text-muted-foreground">
                How these chains become an autonomous agent
              </p>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
