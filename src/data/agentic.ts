// Tier 8: Agentic BDR pSEO Data

export interface AgentType {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  useCases: string[];
  prompts: string[];
  tools: string[];
}

export interface IndustryAgent {
  slug: string;
  industry: string;
  name: string;
  description: string;
  challenges: string[];
  prompts: string[];
  signals: string[];
}

export interface WorkflowAgent {
  slug: string;
  workflow: string;
  name: string;
  description: string;
  steps: string[];
  prompts: string[];
}

// 10 Agent Types
export const agentTypes: AgentType[] = [
  {
    slug: 'research-agent',
    name: 'Building a Research Agent',
    shortName: 'Research Agent',
    description: 'Autonomous agents that gather account intelligence, identify buying signals, and build comprehensive prospect profiles before any outreach.',
    useCases: [
      'Account profiling before cold outreach',
      'Identifying trigger events (funding, hiring, product launches)',
      'Mapping org charts and buying committees',
      'Competitive intelligence gathering',
      'News and press release monitoring',
    ],
    prompts: [
      `You are a Research Agent for B2B sales. Given a company name and domain, compile a research brief.

Company: [COMPANY NAME]
Domain: [DOMAIN]

Research the following:
1. **Company Overview**: What they do, market position, company size
2. **Recent News**: Last 90 days - funding, product launches, executive changes, press
3. **Technology Stack**: Tools they use (check job postings, BuiltWith, etc.)
4. **Key People**: Decision makers in [TARGET DEPARTMENT]
5. **Trigger Events**: Any signals indicating buying intent

Output a structured research brief I can use for personalized outreach.`,

      `Analyze this 10-K filing excerpt and extract sales-relevant insights:

[PASTE 10-K SECTION]

Identify:
1. Strategic priorities mentioned
2. Challenges or risks highlighted
3. Investment areas
4. Competitive threats discussed
5. Growth initiatives

Format as bullet points I can reference in a cold email to their [TARGET ROLE].`,

      `You are monitoring news for sales triggers. Analyze this article about [COMPANY]:

[PASTE ARTICLE]

Classify the trigger type:
- FUNDING (Series A/B/C, IPO, acquisition)
- HIRING (new exec, team expansion, new department)
- PRODUCT (launch, pivot, expansion)
- PARTNERSHIP (strategic alliance, integration)
- CHALLENGE (layoffs, pivot, leadership change)

Then write a brief on how to leverage this trigger for outreach.`,

      `Build an org chart analysis for [COMPANY] based on this LinkedIn data:

[PASTE LINKEDIN PROFILES OR SEARCH RESULTS]

Identify:
1. The likely decision maker for [YOUR PRODUCT CATEGORY]
2. The likely champion (mid-level advocate)
3. The likely blocker (procurement, IT security, etc.)
4. Reporting relationships between them

Suggest who to contact first and why.`,

      `Score this account based on our ICP criteria:

Company: [NAME]
Industry: [INDUSTRY]
Size: [EMPLOYEE COUNT]
Funding: [FUNDING STAGE]
Tech Stack: [KNOWN TOOLS]
Recent Activity: [ANY TRIGGERS]

ICP Criteria:
- Industry fit (weight: 30%)
- Company size (weight: 25%)
- Tech stack compatibility (weight: 20%)
- Timing signals (weight: 25%)

Output a score 1-100 with reasoning for each criterion.`,
    ],
    tools: ['LinkedIn Sales Navigator', 'Clearbit', 'Apollo', 'Crunchbase', 'Google News API', 'BuiltWith'],
  },
  {
    slug: 'personalization-agent',
    name: 'Building a Personalization Agent',
    shortName: 'Personalization Agent',
    description: 'Agents that transform raw research into compelling, 1:1 messaging that resonates with each specific prospect.',
    useCases: [
      'Generating personalized email opening lines',
      'Creating prospect-specific value propositions',
      'Adapting tone to persona and industry',
      'A/B testing message variations',
      'Localizing content for different regions',
    ],
    prompts: [
      `You are a Personalization Agent. Transform this research into a cold email opening line.

Research:
- Company: [NAME]
- Prospect: [NAME], [TITLE]
- Recent trigger: [TRIGGER EVENT]
- Their challenge: [PAIN POINT]

Rules:
- Reference something specific about THEM (not generic industry stuff)
- Under 20 words
- No flattery or "I noticed..."
- Create curiosity or resonate with their situation

Generate 3 variations with different angles.`,

      `Given this prospect context, craft a personalized value proposition:

Prospect: [NAME], [TITLE] at [COMPANY]
Their situation: [CONTEXT FROM RESEARCH]
Our solution: [YOUR PRODUCT/SERVICE]
Our differentiator: [KEY DIFFERENTIATOR]

Write a 2-sentence value prop that:
1. Acknowledges their specific situation
2. Connects it to a specific outcome we enable
3. Avoids generic buzzwords

Generate 3 variations.`,

      `Adapt this email template to match the prospect's communication style:

Original template:
[PASTE YOUR TEMPLATE]

Prospect context:
- Role: [TITLE]
- Industry: [INDUSTRY]
- Company culture: [FORMAL/CASUAL/TECHNICAL]
- Their LinkedIn posts suggest: [TONE OBSERVATIONS]

Rewrite the template to match their style while keeping the core message.`,

      `Create A/B test variations for this cold email:

Base email:
[PASTE EMAIL]

Generate variations testing:
1. Subject line (3 options)
2. Opening line (3 options)
3. CTA (3 options)

For each variation, explain the hypothesis (what we're testing and why).`,

      `You are personalizing follow-up #3 for a prospect who hasn't responded.

Previous touches:
- Email 1: [SUMMARY]
- Email 2: [SUMMARY]
- LinkedIn connection: [STATUS]

What we know about them:
[RESEARCH CONTEXT]

Write a follow-up that:
- Doesn't reference previous emails
- Brings a completely new angle or value
- Stays under 50 words
- Has a softer CTA`,
    ],
    tools: ['Crystal Knows', 'Lavender', 'Regie.ai', 'Copy.ai', 'ChatGPT API'],
  },
  {
    slug: 'execution-agent',
    name: 'Building an Execution Agent',
    shortName: 'Execution Agent',
    description: 'Agents that orchestrate multi-channel outreach sequences with human approval at key decision points.',
    useCases: [
      'Managing multi-touch sequences across channels',
      'Optimizing send times per prospect',
      'Handling replies and routing conversations',
      'Booking meetings automatically',
      'Tracking engagement and iterating',
    ],
    prompts: [
      `You are an Execution Agent managing a multi-channel sequence.

Prospect: [NAME] at [COMPANY]
Sequence status:
- Day 1: Email sent, opened 2x, no reply
- Day 3: LinkedIn connection sent, pending
- Day 5: Today

Decide the next action:
1. What channel? (email, LinkedIn, phone)
2. What message type? (follow-up, new angle, breakup)
3. What time? (based on their timezone and past engagement)

Explain your reasoning.`,

      `Analyze this reply and determine the appropriate response:

Prospect reply:
"[PASTE REPLY]"

Context:
- They are [TITLE] at [COMPANY]
- We sell [YOUR SOLUTION]
- Previous message was about [TOPIC]

Classify the reply:
- POSITIVE (interested, wants to learn more)
- OBJECTION (has concerns, needs addressing)
- REFERRAL (pointing to someone else)
- NOT NOW (timing issue)
- NOT INTERESTED (clear rejection)

Then draft an appropriate response.`,

      `A prospect replied asking for a meeting. Generate calendar booking instructions.

Prospect: [NAME], [TITLE]
Their timezone: [TIMEZONE]
Meeting type: [DISCOVERY/DEMO/INTRO]
Your availability tool: [CALENDLY/HUBSPOT/CHILI PIPER]

Write a response that:
1. Confirms their interest
2. Provides booking link
3. Includes backup times if they can't use the link
4. Sets expectations for the call`,

      `Review this sequence performance and recommend optimizations:

Sequence: [NAME]
Total prospects: [N]
Email 1: [OPEN RATE]%, [REPLY RATE]%
Email 2: [OPEN RATE]%, [REPLY RATE]%
Email 3: [OPEN RATE]%, [REPLY RATE]%
LinkedIn: [CONNECTION RATE]%, [REPLY RATE]%

Based on the data:
1. Which touch is underperforming?
2. What hypothesis explains it?
3. What specific change would you test?`,

      `You are pausing a sequence because the prospect engaged differently than expected.

Event: [DESCRIBE EVENT - e.g., "visited pricing page", "connected on LinkedIn", "mentioned on Twitter"]

Current sequence position: Day [N], [LAST ACTION]

Decide:
1. Should we pause, continue, or change approach?
2. If changing, what should the next touch be?
3. How should we acknowledge their action (or should we)?`,
    ],
    tools: ['Outreach', 'Salesloft', 'Apollo', 'HubSpot Sequences', 'Zapier', 'Clay'],
  },
  {
    slug: 'qualification-agent',
    name: 'Building a Qualification Agent',
    shortName: 'Qualification Agent',
    description: 'Agents that score and qualify leads based on fit, intent signals, and engagement patterns.',
    useCases: [
      'Lead scoring based on ICP fit',
      'Intent signal detection and scoring',
      'BANT/MEDDPICC qualification automation',
      'Prioritizing accounts for outreach',
      'Identifying when to escalate vs. nurture',
    ],
    prompts: [
      `You are a Qualification Agent. Score this inbound lead.

Lead info:
- Company: [NAME]
- Size: [EMPLOYEES]
- Industry: [INDUSTRY]
- Title: [JOB TITLE]
- Form submission: [WHAT THEY REQUESTED]
- Behavior: [PAGES VISITED, CONTENT DOWNLOADED]

Our ICP:
[DESCRIBE YOUR IDEAL CUSTOMER]

Score 1-100 and recommend:
- HOT: Immediate outreach within 5 minutes
- WARM: Outreach within 24 hours
- NURTURE: Add to email sequence
- DISQUALIFY: Not a fit (explain why)`,

      `Analyze these intent signals and determine buying stage:

Company: [NAME]
Signals detected:
- [LIST SIGNALS: e.g., "Visited pricing 3x", "Downloaded case study", "Searched for competitor"]

Classify their buying stage:
1. AWARENESS: Just learning about the problem
2. CONSIDERATION: Evaluating solutions
3. DECISION: Ready to buy, comparing vendors

Then recommend the appropriate outreach approach for this stage.`,

      `Pre-qualify this prospect for a discovery call using BANT criteria:

Prospect: [NAME], [TITLE] at [COMPANY]

What we know:
- Budget indicators: [ANY SIGNALS]
- Authority: [THEIR ROLE AND INFLUENCE]
- Need: [PAIN POINTS IDENTIFIED]
- Timeline: [ANY URGENCY SIGNALS]

For each unknown criterion, suggest a question to ask during outreach that naturally uncovers this information.`,

      `Analyze this prospect's engagement history and recommend next action:

Prospect: [NAME]
Email engagement: [OPENS, CLICKS]
Website visits: [PAGES, FREQUENCY]
Content downloads: [WHAT THEY'VE ACCESSED]
Social engagement: [LINKEDIN ACTIVITY]

Based on their engagement pattern:
1. How interested are they? (Score 1-10)
2. What are they most interested in?
3. What's the right next touch?`,

      `Compare these two accounts and recommend which to prioritize:

Account A:
- Company: [NAME]
- Fit score: [X]
- Intent signals: [LIST]
- Last engagement: [DATE]

Account B:
- Company: [NAME]
- Fit score: [Y]
- Intent signals: [LIST]
- Last engagement: [DATE]

Which account should we prioritize and why? Consider both fit and timing.`,
    ],
    tools: ['6sense', 'Bombora', 'ZoomInfo Intent', 'Clearbit Reveal', 'HubSpot Lead Scoring'],
  },
  {
    slug: 'enrichment-agent',
    name: 'Building an Enrichment Agent',
    shortName: 'Enrichment Agent',
    description: 'Agents that automatically fill in missing data, validate contact information, and keep your CRM accurate.',
    useCases: [
      'Filling in missing contact data',
      'Validating email addresses',
      'Updating job title changes',
      'Adding firmographic data',
      'Detecting contact job changes',
    ],
    prompts: [
      `You are an Enrichment Agent. Given this partial contact record, identify what's missing and suggest how to find it.

Current record:
- Name: [NAME]
- Company: [COMPANY]
- Email: [EMAIL OR MISSING]
- Phone: [PHONE OR MISSING]
- Title: [TITLE OR MISSING]
- LinkedIn: [URL OR MISSING]

Missing fields to prioritize:
1. [FIELD]: Suggested source to find it
2. [FIELD]: Suggested source to find it

Also flag any data that looks outdated or suspicious.`,

      `Verify this contact's current employment status:

Contact: [NAME]
Current record shows: [TITLE] at [COMPANY]
LinkedIn URL: [URL]
Last verified: [DATE]

Check for:
1. Are they still at this company?
2. Has their title changed?
3. Any recent activity suggesting job change?

If they've moved, suggest how to find their new contact info.`,

      `Enrich this company record with missing firmographic data:

Company: [NAME]
Domain: [DOMAIN]
Current data:
- Industry: [KNOWN OR UNKNOWN]
- Size: [KNOWN OR UNKNOWN]
- Revenue: [KNOWN OR UNKNOWN]
- Funding: [KNOWN OR UNKNOWN]
- Location: [KNOWN OR UNKNOWN]

For each unknown field, provide:
1. The likely value based on available signals
2. Confidence level (HIGH/MEDIUM/LOW)
3. Source to verify`,

      `Detect if this contact has changed jobs:

Contact: [NAME]
Previous company: [COMPANY]
Previous title: [TITLE]
Previous email: [EMAIL]

Signals to check:
1. LinkedIn profile changes
2. Email bounce status
3. New company announcements
4. Out-of-office patterns

If job change detected, find their new company and suggest updated contact info.`,

      `Clean and standardize this batch of company names:

Raw data:
[LIST OF COMPANY NAMES WITH VARIATIONS]

For each, provide:
1. Standardized company name
2. Parent company (if subsidiary)
3. Domain
4. Any duplicates to merge

Flag any that need human review.`,
    ],
    tools: ['Clearbit', 'ZoomInfo', 'Apollo', 'Hunter.io', 'Lusha', 'FullContact'],
  },
  {
    slug: 'routing-agent',
    name: 'Building a Routing Agent',
    shortName: 'Routing Agent',
    description: 'Agents that intelligently route leads, opportunities, and tasks to the right team members.',
    useCases: [
      'Lead assignment based on territory and expertise',
      'Escalating hot leads to senior reps',
      'Routing inbound requests to specialists',
      'Load balancing across the team',
      'Handling round-robin with intelligence',
    ],
    prompts: [
      `You are a Routing Agent. Assign this inbound lead to the right rep.

Lead details:
- Company: [NAME]
- Industry: [INDUSTRY]
- Size: [EMPLOYEES]
- Location: [REGION]
- Source: [HOW THEY CAME IN]
- Interest: [WHAT THEY ASKED ABOUT]

Team members:
[LIST REPS WITH THEIR TERRITORIES, SPECIALTIES, CURRENT LOAD]

Recommend assignment with reasoning. Consider: territory, expertise, current workload, and lead value.`,

      `This lead requires escalation. Determine the appropriate path.

Lead: [NAME] at [COMPANY]
Situation: [DESCRIBE WHY ESCALATION NEEDED]
Current owner: [REP NAME]

Escalation options:
1. Manager review (for coaching opportunity)
2. Senior AE takeover (for complex deal)
3. Specialist involvement (for technical needs)
4. Executive sponsor (for strategic account)

Recommend the escalation path and draft the handoff summary.`,

      `Route this support-to-sales handoff:

Customer: [COMPANY]
Current status: [CUSTOMER TYPE]
Support ticket: [SUMMARY]
Expansion signal: [WHAT TRIGGERED THE HANDOFF]

CSM: [NAME]
Account team: [LIST]

Create a handoff that:
1. Routes to the right person
2. Includes relevant context
3. Suggests next action
4. Sets expectations on timing`,

      `Balance these new leads across the team:

New leads: [COUNT]
Lead details: [HIGH-LEVEL BREAKDOWN BY SEGMENT]

Team capacity:
[LIST REPS WITH CURRENT PIPELINE, QUOTA ATTAINMENT, AVAILABILITY]

Create an assignment plan that:
1. Matches lead complexity to rep experience
2. Balances workload fairly
3. Respects territory rules
4. Prioritizes hot leads to available reps`,

      `Determine if this opportunity needs sales engineer involvement:

Opportunity: [COMPANY]
Deal size: [VALUE]
Stage: [CURRENT STAGE]
Technical requirements: [WHAT THE PROSPECT ASKED ABOUT]

SE involvement criteria:
[LIST YOUR CRITERIA]

Recommend: SE needed? If yes, at what stage? Draft the SE briefing document.`,
    ],
    tools: ['LeanData', 'Chili Piper', 'Salesforce Assignment Rules', 'HubSpot Workflows', 'Tray.io'],
  },
  {
    slug: 'scheduling-agent',
    name: 'Building a Scheduling Agent',
    shortName: 'Scheduling Agent',
    description: 'Agents that handle meeting coordination, calendar management, and booking optimization.',
    useCases: [
      'Booking meetings from email threads',
      'Rescheduling with minimal friction',
      'Finding mutual availability',
      'Optimizing calendars for focus time',
      'Handling timezone complexity',
    ],
    prompts: [
      `You are a Scheduling Agent. A prospect wants to meet. Find and propose times.

Prospect: [NAME] at [COMPANY]
Their timezone: [TIMEZONE]
Meeting type: [DISCOVERY/DEMO/CLOSING CALL]
Duration needed: [MINUTES]

Rep's calendar: [DESCRIBE AVAILABILITY OR CONSTRAINTS]

Propose 3 meeting times that:
1. Work for the rep's calendar
2. Are reasonable in the prospect's timezone
3. Avoid Monday morning and Friday afternoon
4. Consider the prospect's likely schedule based on their role`,

      `Draft a meeting request that gets responses:

Prospect: [NAME], [TITLE]
Purpose: [MEETING TYPE]
Context: [WHY THEY SHOULD MEET]

Write a brief message that:
1. Confirms the meeting purpose
2. Proposes 2-3 specific times
3. Includes a backup option (calendar link)
4. Makes rescheduling easy`,

      `Handle this reschedule request gracefully:

Original meeting: [DATE/TIME]
Prospect's message: "[PASTE THEIR RESCHEDULE REQUEST]"

Rep's constraints: [ANY HARD CONSTRAINTS]

Write a response that:
1. Accommodates without frustration
2. Proposes new times quickly
3. Maintains positive tone
4. Confirms the value of meeting`,

      `Coordinate a multi-stakeholder meeting:

Attendees needed:
- [PROSPECT NAME], [ROLE] - [TIMEZONE]
- [PROSPECT NAME], [ROLE] - [TIMEZONE]
- [REP NAME] - [TIMEZONE]
- [SE NAME] - [TIMEZONE]

Duration: [MINUTES]
Deadline: [BY WHEN]

Create a plan to find mutual availability, including:
1. Who to poll first
2. Proposed time ranges
3. Backup virtual option if no overlap`,

      `Review this rep's calendar and suggest optimizations:

Calendar snapshot:
[DESCRIBE THEIR TYPICAL WEEK - MEETINGS, BLOCKS, PATTERNS]

Goals:
- [X] discovery calls per week
- [Y] hours of prospecting time
- [Z] hours of admin/prep

Suggest a calendar structure that:
1. Batches similar activities
2. Protects deep work time
3. Accounts for energy levels
4. Leaves buffer for urgent needs`,
    ],
    tools: ['Calendly', 'Chili Piper', 'SavvyCal', 'Reclaim.ai', 'Clockwise'],
  },
  {
    slug: 'follow-up-agent',
    name: 'Building a Follow-up Agent',
    shortName: 'Follow-up Agent',
    description: 'Agents specialized in re-engaging prospects who have gone dark or need nurturing.',
    useCases: [
      'Crafting follow-ups that don\'t sound desperate',
      'Re-engaging cold opportunities',
      'Post-meeting follow-up sequences',
      'Handling the "not right now" response',
      'Timing follow-ups optimally',
    ],
    prompts: [
      `You are a Follow-up Agent. This prospect has gone dark.

Prospect: [NAME] at [COMPANY]
Last contact: [DATE]
Last message sent: [SUMMARY]
Previous engagement: [WHAT THEY DID BEFORE GOING DARK]

Write a re-engagement email that:
1. Doesn't guilt them for not responding
2. Brings genuine new value
3. Keeps it under 50 words
4. Has a low-friction CTA

Generate 3 variations with different approaches.`,

      `Create a post-meeting follow-up sequence:

Meeting type: [DISCOVERY/DEMO]
What was discussed: [KEY POINTS]
Next steps agreed: [WHAT THEY SAID]
Prospect temperature: [HOT/WARM/UNCERTAIN]

Design a 3-touch follow-up sequence:
- Touch 1 (same day): [CONTENT + PURPOSE]
- Touch 2 (day 3): [CONTENT + PURPOSE]
- Touch 3 (day 7): [CONTENT + PURPOSE]

Include subject lines and brief outlines for each.`,

      `Handle this "not right now" response:

Prospect's message: "[PASTE THEIR MESSAGE]"

Context:
- Deal stage: [WHERE THEY WERE]
- Their stated reason: [WHY NOT NOW]
- When they might be ready: [IF MENTIONED]

Write a response that:
1. Respects their timeline
2. Keeps the door open
3. Sets up a future touchpoint
4. Provides value they can use now

Then suggest a nurture cadence.`,

      `Revive this cold opportunity:

Opportunity: [COMPANY]
Last activity: [DATE] ([X] months ago)
Stage when it went cold: [STAGE]
Why it stalled: [REASON IF KNOWN]
Recent trigger: [ANY NEW SIGNAL]

Write a re-engagement approach that:
1. Acknowledges time passed (without dwelling)
2. Leverages the new trigger
3. Doesn't restart from zero
4. Proposes a specific next step`,

      `Determine the optimal timing for this follow-up:

Prospect: [NAME], [ROLE]
Industry: [INDUSTRY]
Previous engagement patterns:
- Opens emails at: [TIMES]
- Most responsive on: [DAYS]
- Timezone: [TZ]

Last touch: [DATE AND TYPE]
Current sequence position: [WHERE THEY ARE]

Recommend:
1. Exact send time for next follow-up
2. Day of week
3. Reasoning based on their patterns`,
    ],
    tools: ['Mixmax', 'Yesware', 'Outreach', 'Gong', 'Clari'],
  },
  {
    slug: 'analytics-agent',
    name: 'Building an Analytics Agent',
    shortName: 'Analytics Agent',
    description: 'Agents that analyze sales data, identify patterns, and provide actionable insights.',
    useCases: [
      'Identifying winning patterns in outreach',
      'Forecasting pipeline and revenue',
      'Detecting at-risk deals early',
      'Benchmarking rep performance',
      'Recommending next-best actions',
    ],
    prompts: [
      `You are an Analytics Agent. Analyze this sequence performance:

Sequence: [NAME]
Time period: [DATES]
Total prospects: [N]

Step-by-step metrics:
[PASTE OPEN RATES, REPLY RATES, MEETING RATES PER STEP]

Identify:
1. Which step has the biggest drop-off?
2. What hypothesis explains it?
3. What specific test would you run?
4. Expected impact if test succeeds`,

      `Analyze these two reps' performance and identify what the top performer does differently:

Rep A (top performer):
- Emails sent: [N]
- Reply rate: [%]
- Meetings booked: [N]
- Sample emails: [PASTE EXAMPLES]

Rep B (underperformer):
- Emails sent: [N]
- Reply rate: [%]
- Meetings booked: [N]
- Sample emails: [PASTE EXAMPLES]

What specific behaviors or techniques explain the difference? Provide actionable recommendations for Rep B.`,

      `Review this deal and predict risk level:

Opportunity: [COMPANY]
Stage: [CURRENT]
Amount: [VALUE]
Close date: [DATE]
Age in stage: [DAYS]

Activity summary:
- Last meeting: [DATE]
- Emails exchanged: [RECENT COUNT]
- Stakeholders engaged: [COUNT]
- Champion status: [ACTIVE/QUIET/GONE]

Predict:
1. Risk level (LOW/MEDIUM/HIGH)
2. Top risk factors
3. Recommended actions to de-risk
4. Realistic close date based on patterns`,

      `Forecast next quarter's pipeline:

Current pipeline:
[PASTE PIPELINE SUMMARY BY STAGE]

Historical conversion rates:
[PASTE STAGE-TO-STAGE CONVERSION RATES]

Assumptions:
- Rep capacity: [DETAILS]
- Seasonality: [FACTORS]
- New lead flow: [EXPECTED]

Provide:
1. Expected revenue (low/mid/high)
2. Key assumptions that drive variance
3. Deals to focus on for highest impact
4. Gaps to fill in early stages`,

      `Identify the best time and channel to reach prospects in [INDUSTRY]:

Historical data:
- Email performance by day/time: [DATA]
- LinkedIn performance by day/time: [DATA]
- Phone connect rates by day/time: [DATA]

Based on the data:
1. Optimal first-touch timing
2. Best channel mix
3. When to avoid outreach
4. How this differs from other industries`,
    ],
    tools: ['Gong', 'Clari', 'People.ai', 'Salesforce Einstein', 'Tableau', 'InsightSquared'],
  },
  {
    slug: 'integration-agent',
    name: 'Building an Integration Agent',
    shortName: 'Integration Agent',
    description: 'Agents that connect tools, sync data, and automate workflows across your sales tech stack.',
    useCases: [
      'Syncing data between CRM and outreach tools',
      'Triggering workflows based on events',
      'Keeping records updated across systems',
      'Building custom integrations without code',
      'Handling webhook events intelligently',
    ],
    prompts: [
      `You are an Integration Agent. Design a workflow for when a new lead comes in.

Trigger: New lead in [SOURCE - e.g., "HubSpot form", "Inbound email", "Webinar signup"]

Systems to update:
1. CRM: [SALESFORCE/HUBSPOT]
2. Outreach tool: [OUTREACH/SALESLOFT/APOLLO]
3. Enrichment: [CLEARBIT/ZOOMINFO]
4. Slack notification: [CHANNEL]

Design the workflow:
- What data flows where
- In what order
- What checks/validations
- Error handling`,

      `Create a data sync rule between these two systems:

Source: [SYSTEM A]
Destination: [SYSTEM B]
Object: [CONTACTS/ACCOUNTS/OPPORTUNITIES]

Sync requirements:
- Fields to sync: [LIST]
- Sync direction: [ONE-WAY/BI-DIRECTIONAL]
- Conflict resolution: [SOURCE WINS/NEWEST WINS/MANUAL]
- Frequency: [REAL-TIME/HOURLY/DAILY]

Document the sync logic and edge cases to handle.`,

      `Handle this webhook event from [SYSTEM]:

Event payload:
[PASTE WEBHOOK JSON]

Desired actions:
1. [ACTION 1]
2. [ACTION 2]
3. [ACTION 3]

Write the logic to:
1. Parse the event
2. Determine which actions to trigger
3. Handle each action
4. Log success/failure`,

      `Audit this integration and identify gaps:

Current setup:
- CRM: [SYSTEM]
- Email: [SYSTEM]
- Dialer: [SYSTEM]
- Enrichment: [SYSTEM]
- Analytics: [SYSTEM]

Known issues:
[DESCRIBE PROBLEMS - DATA GAPS, SYNC DELAYS, ETC.]

Identify:
1. What data isn't flowing correctly
2. Root cause
3. Fix recommendation
4. How to verify it's working`,

      `Design a trigger-based workflow:

Trigger: [DESCRIBE EVENT - e.g., "Prospect opens email 3x", "Deal stuck in stage 5+ days"]

Actions to take:
[DESCRIBE DESIRED OUTCOME]

Systems involved:
[LIST TOOLS]

Create a detailed workflow specification:
1. Trigger conditions (specific criteria)
2. Actions in sequence
3. Branching logic if needed
4. Notifications to send
5. How to measure success`,
    ],
    tools: ['Zapier', 'Tray.io', 'Workato', 'Clay', 'n8n', 'Make (Integromat)'],
  },
];

// 8 Industry-Specific Agents
export const industryAgents: IndustryAgent[] = [
  {
    slug: 'saas',
    industry: 'SaaS',
    name: 'Agentic BDR for SaaS',
    description: 'Building autonomous sales agents specialized for software-as-a-service companies selling to technical and business buyers.',
    challenges: [
      'Long evaluation cycles with multiple stakeholders',
      'Technical buyers who do their own research',
      'Competitive market with many alternatives',
      'Need to demonstrate ROI and integration ease',
      'Complex pricing and packaging decisions',
    ],
    prompts: [
      `You are a SaaS Research Agent. Research this prospect for a cold outreach campaign.

Target company: [COMPANY NAME]
Our solution: [YOUR SAAS PRODUCT]
ICP: [IDEAL CUSTOMER PROFILE]

Research and compile:
1. **Tech Stack**: What tools do they currently use in our category?
2. **Buying Signals**: Recent job posts, funding, or tech changes
3. **Decision Makers**: Who owns [YOUR CATEGORY] decisions?
4. **Integration Points**: What systems would we need to connect to?
5. **Competition**: Are they using a competitor? Which one?

Output a research brief with personalization hooks.`,

      `Analyze this SaaS prospect's tech stack and identify our entry point:

Company: [NAME]
Known tech stack:
[LIST TOOLS FROM JOB POSTINGS OR TECHNOGRAPHICS]

Our product: [YOUR SOLUTION]
We integrate with: [YOUR INTEGRATIONS]
We replace: [COMPETITORS WE DISPLACE]

Identify:
1. The most likely integration point
2. The pain we solve in their current stack
3. The champion persona who would benefit
4. The angle for cold outreach`,

      `Create a multi-threading strategy for this SaaS deal:

Company: [NAME]
Current contact: [NAME], [TITLE]
Deal status: [STAGE]
Blockers: [KNOWN CHALLENGES]

Our solution requires buy-in from:
- [PERSONA 1]: [WHY]
- [PERSONA 2]: [WHY]

Design a multi-threading approach:
1. Who else to contact and why
2. How to reach them (channel, message)
3. How to position without going around our champion`,

      `Write a competitive displacement email for a SaaS prospect using [COMPETITOR]:

What we know:
- They've been on [COMPETITOR] for [DURATION]
- Pain points with [COMPETITOR]: [IF KNOWN]
- Our differentiator: [KEY DIFFERENCE]

Rules:
- Don't trash the competitor
- Focus on outcomes, not features
- Reference something specific about their situation
- Keep it under 100 words`,

      `Build a ROI calculator for our SaaS prospect:

Our solution: [YOUR PRODUCT]
Pricing: [YOUR MODEL]

Prospect context:
- Company size: [EMPLOYEES]
- Team using product: [SIZE]
- Current solution: [WHAT THEY USE NOW]
- Current spend: [IF KNOWN]

Calculate and present:
1. Time savings per week
2. Cost savings annually
3. Revenue impact (if applicable)
4. Payback period
5. 3-year TCO comparison`,
    ],
    signals: [
      'Job postings for roles that use your category',
      'Series B or later funding announcements',
      'New CTO/VP Engineering hires',
      'Competitor mentions in reviews (G2, Capterra)',
      'Technology stack changes on BuiltWith',
    ],
  },
  {
    slug: 'fintech',
    industry: 'FinTech',
    name: 'Agentic BDR for FinTech',
    description: 'Autonomous agents designed for the unique challenges of selling to financial services and fintech companies.',
    challenges: [
      'Strict regulatory and compliance requirements',
      'Long procurement cycles with security reviews',
      'Risk-averse buyers who need extensive proof',
      'Complex stakeholder maps across compliance, IT, and business',
      'Data security and privacy concerns',
    ],
    prompts: [
      `You are a FinTech Research Agent. Research this financial services prospect:

Company: [NAME]
Type: [BANK/INSURANCE/PAYMENTS/WEALTH MANAGEMENT]
Our solution: [YOUR PRODUCT]

Research:
1. **Regulatory landscape**: What regulations affect them?
2. **Technology initiatives**: Any digital transformation announcements?
3. **Risk factors**: What did their latest 10-K highlight?
4. **Compliance contacts**: Who handles vendor security reviews?
5. **Timing signals**: Budget cycles, fiscal year end

Focus on compliance-friendly angles for outreach.`,

      `Prepare a compliance-focused pitch for this FinTech prospect:

Company: [NAME]
Their compliance concerns: [SOC2/PCI-DSS/GDPR/ETC]
Our certifications: [YOUR COMPLIANCE]
Our security features: [KEY SECURITY POINTS]

Write an email that:
1. Leads with compliance/security credibility
2. References relevant regulations they face
3. Positions us as reducing their risk
4. Offers a security review call`,

      `Navigate this FinTech buying committee:

Account: [COMPANY]
Deal size: [VALUE]

Known stakeholders:
- Business owner: [NAME], [TITLE]
- IT/Security: [NAME], [TITLE]
- Compliance: [NAME], [TITLE]
- Procurement: [NAME], [TITLE]

For each stakeholder:
1. What do they care about?
2. What objections will they raise?
3. What content/proof do they need?
4. How do we win them over?`,

      `Handle this FinTech objection: "We can't use a vendor without [CERTIFICATION/REQUIREMENT]"

Prospect concern: [SPECIFIC REQUIREMENT]
Our current status: [WHAT WE HAVE]
Our plan: [WHEN WE'LL HAVE IT, IF APPLICABLE]

Write a response that:
1. Acknowledges the requirement's importance
2. Explains our current security posture
3. Provides alternative proof points
4. Proposes a path forward`,

      `Create a FinTech case study narrative for outreach:

Customer: [SIMILAR FINTECH CUSTOMER]
Their situation: [BEFORE STATE]
What we did: [SOLUTION]
Results: [QUANTIFIED OUTCOMES]

Turn this into:
1. A 2-sentence proof point for cold email
2. A LinkedIn post the prospect would find valuable
3. A question that opens the door to share this story`,
    ],
    signals: [
      'Regulatory changes affecting their business',
      'Merger/acquisition announcements',
      'Digital transformation initiatives',
      'New product/service launches',
      'Executive hires in technology or compliance',
    ],
  },
  {
    slug: 'healthcare',
    industry: 'Healthcare',
    name: 'Agentic BDR for Healthcare',
    description: 'Specialized agents for navigating healthcare sales with HIPAA compliance and clinical workflow considerations.',
    challenges: [
      'HIPAA and patient data privacy requirements',
      'Long sales cycles with multiple approval layers',
      'Clinical workflow disruption concerns',
      'Budget constraints and reimbursement pressures',
      'Complex stakeholder maps across clinical and administrative',
    ],
    prompts: [
      `You are a Healthcare Research Agent. Research this healthcare prospect:

Organization: [NAME]
Type: [HOSPITAL SYSTEM/CLINIC/HEALTH TECH/PAYER]
Our solution: [YOUR PRODUCT]

Research:
1. **HIPAA/compliance**: What data handling requirements?
2. **EHR System**: What's their primary EHR (Epic, Cerner, etc.)?
3. **Recent initiatives**: Value-based care, digital health, etc.
4. **Budget cycle**: When is their fiscal year?
5. **Decision makers**: CMIO, CIO, VP Clinical Operations?

Focus on clinical workflow and compliance angles.`,

      `Craft a HIPAA-compliant outreach message for healthcare:

Prospect: [NAME], [TITLE] at [ORGANIZATION]
Our solution: [YOUR PRODUCT]
HIPAA relevance: [HOW WE HANDLE PHI]

Write an email that:
1. Leads with patient/provider value
2. Addresses HIPAA compliance upfront
3. References their EHR if known
4. Avoids any PHI references
5. Proposes a clinical-focused conversation`,

      `Navigate this healthcare buying committee:

Organization: [NAME]
Deal type: [CLINICAL/ADMINISTRATIVE/IT]

Typical stakeholders:
- Clinical champion: [TITLE]
- IT/Security: [TITLE]
- Compliance/Legal: [TITLE]
- Finance: [TITLE]
- Executive sponsor: [TITLE]

Create a multi-touch strategy:
1. Who to engage first
2. What each stakeholder needs to hear
3. How to build internal consensus
4. Typical objections from each`,

      `Handle this healthcare objection: "We need to ensure this integrates with [EHR SYSTEM]"

Their EHR: [EPIC/CERNER/MEDITECH/OTHER]
Our integration status: [CURRENT CAPABILITIES]
Their concern: [SPECIFIC INTEGRATION NEED]

Write a response that:
1. Confirms our integration approach
2. References similar implementations
3. Addresses workflow concerns
4. Proposes a technical discovery session`,

      `Build a value proposition for healthcare cost savings:

Our solution: [YOUR PRODUCT]
Healthcare context:
- Their pain: [CLINICAL/OPERATIONAL CHALLENGE]
- Current cost: [TIME, MONEY, OR OUTCOMES]
- Our impact: [IMPROVEMENT]

Quantify value in terms healthcare buyers understand:
1. Time savings for clinical staff
2. Patient outcome improvements
3. Compliance risk reduction
4. Reimbursement impact`,
    ],
    signals: [
      'New CIO/CMIO/CNO appointments',
      'EHR implementation or upgrade projects',
      'Value-based care initiative announcements',
      'Digital health or telehealth expansion',
      'Quality reporting challenges or penalties',
    ],
  },
  {
    slug: 'manufacturing',
    industry: 'Manufacturing',
    name: 'Agentic BDR for Manufacturing',
    description: 'Agents built for selling to manufacturing and industrial companies with operational efficiency focus.',
    challenges: [
      'Conservative, risk-averse buying culture',
      'Long implementation concerns (downtime)',
      'Complex stakeholder maps across plants and corporate',
      'ROI must be quantifiable and proven',
      'Legacy system integration challenges',
    ],
    prompts: [
      `You are a Manufacturing Research Agent. Research this industrial prospect:

Company: [NAME]
Type: [DISCRETE/PROCESS/MIXED MANUFACTURING]
Our solution: [YOUR PRODUCT]

Research:
1. **Operations**: Number of plants, production type
2. **Challenges**: Supply chain, quality, workforce issues
3. **Technology**: ERP system, automation level
4. **Initiatives**: Industry 4.0, digital transformation
5. **Decision makers**: Plant managers vs. corporate

Focus on operational efficiency and downtime angles.`,

      `Quantify the downtime cost for this manufacturing prospect:

Company: [NAME]
Industry: [SPECIFIC MANUFACTURING TYPE]
Company size: [REVENUE OR EMPLOYEES]

Estimate their:
1. Cost per hour of unplanned downtime
2. Typical downtime incidents per month
3. Annual downtime cost
4. Our potential impact

Use industry benchmarks and show your math. This becomes our ROI hook.`,

      `Create a plant manager vs. corporate messaging strategy:

Account: [COMPANY]
Our solution: [YOUR PRODUCT]
Entry point: [PLANT OR CORPORATE]

Plant Manager cares about:
[LIST PRIORITIES]

Corporate (VP Ops, CFO) cares about:
[LIST PRIORITIES]

Create:
1. Plant-level pitch (operational focus)
2. Corporate pitch (strategic/financial focus)
3. How to build from plant to corporate (or vice versa)`,

      `Handle this manufacturing objection: "We can't afford downtime for implementation"

Their concern: [SPECIFIC IMPLEMENTATION WORRY]
Our implementation approach: [HOW WE DEPLOY]
Timeline: [TYPICAL DURATION]

Write a response that:
1. Acknowledges downtime sensitivity
2. Explains our low-disruption approach
3. References similar implementations
4. Proposes a phased pilot`,

      `Build a supply chain disruption angle for outreach:

Company: [NAME]
Recent supply chain issues: [WHAT WE KNOW]
Our solution: [YOUR PRODUCT]
How we help: [SUPPLY CHAIN BENEFIT]

Write an outreach that:
1. References their specific supply chain context
2. Connects to broader industry challenges
3. Positions our solution naturally
4. Doesn't sound opportunistic about their pain`,
    ],
    signals: [
      'Plant expansion or new facility announcements',
      'Supply chain disruption mentions in earnings',
      'Industry 4.0 or automation initiatives',
      'Quality issues or recalls',
      'New VP Operations or Plant Manager hires',
    ],
  },
  {
    slug: 'professional-services',
    industry: 'Professional Services',
    name: 'Agentic BDR for Professional Services',
    description: 'Agents optimized for selling to consulting firms, law firms, accounting firms, and other professional services.',
    challenges: [
      'Partner-driven decision making',
      'Utilization and billable hour focus',
      'Knowledge management and collaboration needs',
      'Client confidentiality requirements',
      'Practice-specific vs. firm-wide decisions',
    ],
    prompts: [
      `You are a Professional Services Research Agent. Research this firm:

Firm: [NAME]
Type: [CONSULTING/LEGAL/ACCOUNTING/OTHER]
Our solution: [YOUR PRODUCT]

Research:
1. **Firm structure**: Practices, offices, partner count
2. **Growth areas**: Which practices are expanding?
3. **Technology**: Known tools and recent investments
4. **Challenges**: Utilization, talent, client demands
5. **Decision makers**: Managing Partner vs. Practice Lead

Focus on utilization and client delivery angles.`,

      `Create a utilization improvement pitch for professional services:

Firm: [NAME]
Our solution: [YOUR PRODUCT]
How we improve utilization: [SPECIFIC MECHANISM]

Frame the value in terms partners understand:
1. Hours saved per professional per week
2. Utilization rate improvement
3. Additional billable capacity created
4. Revenue impact at their billing rates

Show the math with industry-standard billing rates.`,

      `Navigate partner politics at this professional services firm:

Firm: [NAME]
Our champion: [NAME], [ROLE]
Decision process: [WHAT WE KNOW]

Professional services buying typically involves:
- Practice leads who control their P&L
- Managing Partner or COO for firm-wide
- IT for security/integration review
- Individual partners for adoption

Create a strategy to build consensus without creating political friction.`,

      `Handle this objection from a law firm: "Our associates won't use it"

Their concern: [ADOPTION WORRY]
Similar firms using us: [REFERENCES]
Our adoption approach: [HOW WE DRIVE USAGE]

Write a response that:
1. Acknowledges the adoption challenge
2. Shares how similar firms succeeded
3. Addresses the time-pressed associate reality
4. Proposes a limited pilot with champions`,

      `Write thought leadership that would resonate with professional services:

Our expertise: [YOUR DOMAIN]
Target audience: [PARTNERS AT TYPE OF FIRM]
Current industry trend: [RELEVANT TREND]

Create:
1. A LinkedIn post angle (hook + key insight)
2. A question to pose that starts conversation
3. How to naturally transition to our solution`,
    ],
    signals: [
      'New practice area launches',
      'Lateral partner hires',
      'Office expansion or new locations',
      'Merger or acquisition news',
      'Technology investment announcements',
    ],
  },
  {
    slug: 'ecommerce',
    industry: 'E-commerce',
    name: 'Agentic BDR for E-commerce',
    description: 'Agents built for the fast-paced world of e-commerce and retail, focused on conversion and revenue metrics.',
    challenges: [
      'Fast-moving, metrics-obsessed buyers',
      'Tight margins and cost sensitivity',
      'Seasonal budget constraints',
      'Integration with Shopify/BigCommerce/etc.',
      'Need for immediate, measurable impact',
    ],
    prompts: [
      `You are an E-commerce Research Agent. Research this online retailer:

Company: [NAME]
Platform: [SHOPIFY/BIGCOMMERCE/CUSTOM]
Our solution: [YOUR PRODUCT]

Research:
1. **Scale**: Traffic, order volume, SKU count estimates
2. **Tech stack**: Platform, apps, integrations visible
3. **Challenges**: Cart abandonment, CAC, conversion
4. **Seasonality**: When are their peak periods?
5. **Competitors**: Who are they competing with?

Focus on revenue and conversion angles.`,

      `Quantify the conversion opportunity for this e-commerce prospect:

Company: [NAME]
Estimated monthly traffic: [VISITS]
Estimated conversion rate: [%]
Estimated AOV: [VALUE]

Calculate:
1. Current monthly revenue
2. Revenue at +0.5% conversion improvement
3. Revenue at +1% conversion improvement
4. Annual impact

Our solution: [HOW WE IMPROVE CONVERSION]
Typical improvement: [YOUR BENCHMARK]`,

      `Create a seasonal urgency campaign for e-commerce:

Target: E-commerce companies before [HOLIDAY/SEASON]
Our solution: [YOUR PRODUCT]
Implementation time: [HOW LONG TO GO LIVE]
Seasonal deadline: [WHEN THEY NEED TO DECIDE BY]

Create:
1. Urgency-based subject line
2. Email body with seasonal hook
3. CTA tied to their calendar
4. Follow-up sequence if no response`,

      `Handle this e-commerce objection: "We're locked into [PLATFORM/COMPETITOR]"

Their current solution: [WHAT THEY USE]
Contract status: [IF KNOWN]
Our advantage: [WHY WE'RE BETTER]

Write a response that:
1. Doesn't push them to break contracts
2. Plants seeds for when they evaluate
3. Offers value they can use now
4. Positions for future conversation`,

      `Build a customer acquisition cost (CAC) angle for outreach:

Company: [NAME]
Their likely CAC concern: [WHAT'S DRIVING COSTS UP]
Our solution: [YOUR PRODUCT]
How we help CAC: [MECHANISM]

Write outreach that:
1. Leads with CAC trend (rising costs in e-commerce)
2. Connects to their specific situation
3. Shows the math on CAC reduction
4. Proposes a data-driven conversation`,
    ],
    signals: [
      'New platform migration announcements',
      'Funding rounds (Series A+ for DTC brands)',
      'New channel expansion (Amazon, retail)',
      'Hiring for marketing/growth roles',
      'Negative app store reviews for current tools',
    ],
  },
  {
    slug: 'real-estate',
    industry: 'Real Estate',
    name: 'Agentic BDR for Real Estate',
    description: 'Specialized agents for commercial real estate, property management, and proptech sales.',
    challenges: [
      'Relationship-driven, slow-to-trust industry',
      'Property-by-property decision making',
      'Fragmented ownership structures',
      'Long deal cycles with multiple stakeholders',
      'Physical asset focus vs. software skepticism',
    ],
    prompts: [
      `You are a Real Estate Research Agent. Research this property company:

Company: [NAME]
Type: [OWNER/MANAGER/DEVELOPER/REIT]
Portfolio: [PROPERTY TYPES]
Our solution: [YOUR PRODUCT]

Research:
1. **Portfolio**: Size, property types, geography
2. **Technology**: Known property management systems
3. **Initiatives**: ESG, tenant experience, efficiency
4. **Financial**: REIT filings, recent transactions
5. **Decision makers**: Asset managers vs. property managers

Focus on NOI improvement and tenant experience angles.`,

      `Quantify the NOI impact for this real estate prospect:

Company: [NAME]
Portfolio size: [SF OR UNITS]
Property types: [OFFICE/RETAIL/MULTIFAMILY/INDUSTRIAL]
Our solution: [YOUR PRODUCT]
How we impact NOI: [MECHANISM]

Calculate:
1. Estimated current operating costs
2. Savings opportunity (% or $)
3. NOI improvement
4. Cap rate impact on property value

Show the math property owners understand.`,

      `Create a tenant experience angle for commercial real estate:

Target: [PROPERTY TYPE] owners/managers
Our solution: [YOUR PRODUCT]
Tenant experience benefit: [HOW WE HELP]

The pitch:
1. Tenant expectations are changing
2. Experience drives retention (quantify)
3. Our solution enables [SPECIFIC CAPABILITY]
4. ROI through reduced turnover

Write outreach that positions tenant experience as business outcome.`,

      `Navigate the owner vs. property manager dynamic:

Account: [PROPERTY/COMPANY]
Owner: [NAME/ENTITY]
Property Manager: [IF THIRD-PARTY]
Our solution: [YOUR PRODUCT]

Decision dynamics:
- Who controls technology decisions?
- Who controls budget?
- Whose workflow changes?

Create an approach that:
1. Identifies the right entry point
2. Addresses both owner and PM needs
3. Handles potential conflicts`,

      `Handle this real estate objection: "Our properties are all different"

Their portfolio: [DESCRIBE VARIETY]
Our solution: [YOUR PRODUCT]
Flexibility: [HOW WE HANDLE VARIETY]

Write a response that:
1. Acknowledges portfolio diversity
2. Explains our configurable approach
3. References similar diverse portfolios
4. Proposes a pilot at one property type`,
    ],
    signals: [
      'New property acquisitions',
      'Sustainability or ESG announcements',
      'Tenant experience initiatives',
      'Property management technology investments',
      'New asset manager or portfolio manager hires',
    ],
  },
  {
    slug: 'education',
    industry: 'Education',
    name: 'Agentic BDR for Education',
    description: 'Agents designed for K-12, higher education, and corporate training sales cycles.',
    challenges: [
      'Budget cycles tied to academic calendar',
      'Committee-based decision making',
      'Pilot requirements before purchase',
      'Student outcomes focus over features',
      'Privacy concerns (FERPA, student data)',
    ],
    prompts: [
      `You are an Education Research Agent. Research this institution:

Institution: [NAME]
Type: [K-12/HIGHER ED/CORPORATE TRAINING]
Our solution: [YOUR PRODUCT]

Research:
1. **Profile**: Size, student population, budget
2. **Technology**: Known LMS, EdTech tools
3. **Initiatives**: Strategic plan, accreditation
4. **Budget cycle**: When do they make decisions?
5. **Decision makers**: Academic vs. IT vs. Admin

Focus on student outcomes and learning efficacy angles.`,

      `Create a budget cycle strategy for education sales:

Institution: [NAME]
Type: [K-12/HIGHER ED]
Fiscal year starts: [MONTH]
Budget planning window: [WHEN]
Current date: [TODAY]

Create a timeline:
1. When to begin conversations
2. When pilots should run
3. When proposals are due
4. When decisions are made
5. When implementation starts

And messaging for each phase.`,

      `Navigate the education buying committee:

Institution: [NAME]
Our solution: [YOUR PRODUCT]
Entry point: [WHO WE'RE TALKING TO]

Typical stakeholders:
- Faculty/Department: [CONCERNS]
- IT: [CONCERNS]
- Procurement: [CONCERNS]
- Admin/Dean: [CONCERNS]
- Students (increasingly): [CONCERNS]

Create alignment strategy for each stakeholder.`,

      `Build a student outcomes pitch for education:

Our solution: [YOUR PRODUCT]
Target institution type: [K-12/HIGHER ED/TRAINING]
Outcome we improve: [SPECIFIC METRIC]

Frame in education terms:
1. Learning outcome improvement
2. Student engagement increase
3. Faculty time savings
4. Completion/retention impact

Include: evidence we have, studies we can cite, pilot structure to prove it.`,

      `Handle this education objection: "We need to pilot this with faculty first"

Their pilot request: [WHAT THEY'RE ASKING]
Our pilot program: [WHAT WE OFFER]
Typical pilot duration: [TIMELINE]

Write a response that:
1. Embraces the pilot mindset
2. Structures a successful pilot
3. Defines success metrics upfront
4. Sets path from pilot to purchase`,
    ],
    signals: [
      'New academic strategic plan announcements',
      'EdTech RFP releases',
      'Accreditation review preparation',
      'New Dean/Provost/CIO appointments',
      'Enrollment challenges or initiatives',
    ],
  },
];

// 6 Workflow-Specific Agents
export const workflowAgents: WorkflowAgent[] = [
  {
    slug: 'prospecting-agent',
    workflow: 'Prospecting',
    name: 'Autonomous Prospecting Agent',
    description: 'Agents that automatically identify and qualify new prospects matching your ICP.',
    steps: [
      'Define ICP criteria and scoring model',
      'Connect to data sources (LinkedIn, Crunchbase, news)',
      'Run continuous search for matching companies',
      'Score and rank prospects automatically',
      'Queue top prospects for outreach',
    ],
    prompts: [
      `You are a Prospecting Agent. Generate a list of companies matching this ICP:

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

      `Score these companies against our ICP and prioritize:

Companies:
[LIST OF COMPANIES]

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

      `Monitor for trigger events matching our ICP:

Triggers we care about:
- [TRIGGER 1]: [WHY IT MATTERS]
- [TRIGGER 2]: [WHY IT MATTERS]
- [TRIGGER 3]: [WHY IT MATTERS]

Company filter:
[ICP CRITERIA]

When you find a trigger, output:
1. Company name
2. Trigger type and details
3. Urgency (act now / this week / this month)
4. Suggested outreach angle`,

      `Build a prospect list for [SPECIFIC CAMPAIGN]:

Campaign focus: [DESCRIBE]
Target persona: [TITLE/ROLE]
Target companies: [CRITERIA]
Campaign timing: [WHEN]

Generate a list of 20 prospects with:
1. Contact name and title
2. Company and why they fit
3. Personalization hook
4. Best channel to reach them`,

      `Identify competitors' customers who might switch:

Competitor: [COMPETITOR NAME]
Signals of dissatisfaction:
- [SIGNAL 1]
- [SIGNAL 2]

Search for companies that:
1. Currently use [COMPETITOR]
2. Show potential dissatisfaction signals
3. Match our ICP

Output with specific competitive displacement angle for each.`,
    ],
  },
  {
    slug: 'outreach-agent',
    workflow: 'Outreach',
    name: 'Autonomous Outreach Agent',
    description: 'Agents that craft and execute personalized multi-channel outreach sequences.',
    steps: [
      'Receive prospect and research context',
      'Select appropriate sequence and messaging',
      'Generate personalized messages per channel',
      'Queue for human review or auto-send',
      'Monitor engagement and adapt',
    ],
    prompts: [
      `You are an Outreach Agent. Create a cold email for this prospect:

Prospect: [NAME], [TITLE] at [COMPANY]
Research context:
[PASTE RESEARCH BRIEF]

Our value prop: [YOUR VALUE PROP]
Campaign: [CAMPAIGN FOCUS]

Write an email that:
1. Opens with something specific to them
2. Connects to a pain they likely have
3. Offers relevant value
4. Has a clear, low-friction CTA
5. Stays under 100 words`,

      `Design a multi-channel sequence for this prospect:

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

      `Adapt this email template to different personas:

Base template:
[PASTE YOUR TEMPLATE]

Personas to adapt for:
1. [PERSONA 1]: [WHAT THEY CARE ABOUT]
2. [PERSONA 2]: [WHAT THEY CARE ABOUT]
3. [PERSONA 3]: [WHAT THEY CARE ABOUT]

Create a version for each that:
- Adjusts the pain point emphasis
- Changes the value proposition focus
- Modifies the tone appropriately
- Keeps the core structure`,

      `Generate a LinkedIn connection request and follow-up:

Prospect: [NAME], [TITLE]
Mutual connections: [IF ANY]
Their recent activity: [POSTS, COMMENTS]
Our goal: [WHAT WE WANT]

Create:
1. Connection request (under 300 chars)
2. First message after they accept
3. Follow-up if no response to message

Don't pitch in the connection request.`,

      `Handle this reply and determine next action:

Their reply:
"[PASTE REPLY]"

Context:
- Sequence stage: [WHERE THEY WERE]
- Our last message: [SUMMARY]
- Their role: [TITLE]

Classify the reply type and draft appropriate response.
Then update the sequence status.`,
    ],
  },
  {
    slug: 'discovery-agent',
    workflow: 'Discovery',
    name: 'Autonomous Discovery Agent',
    description: 'Agents that prepare for, guide, and follow up on discovery conversations.',
    steps: [
      'Prepare comprehensive pre-call research',
      'Generate discovery questions tailored to prospect',
      'Analyze call recordings for insights',
      'Create structured call summaries',
      'Draft personalized follow-ups',
    ],
    prompts: [
      `You are a Discovery Agent. Prepare me for a discovery call.

Prospect: [NAME], [TITLE] at [COMPANY]
Meeting time: [WHEN]

Research and prepare:
1. **Company context**: What do I need to know?
2. **Their likely challenges**: Based on role and industry
3. **Questions to ask**: 10 discovery questions
4. **Landmines to avoid**: Topics to handle carefully
5. **Success criteria**: What makes this a good call?

Format as a one-page prep doc I can review in 5 minutes.`,

      `Generate discovery questions for this specific situation:

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

      `Analyze this discovery call and extract insights:

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

      `Create a post-discovery follow-up email:

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

      `Score this discovery call and identify gaps:

Call notes:
[PASTE NOTES]

Score against qualification framework:
[USE MEDDPICC, BANT, OR YOUR FRAMEWORK]

For each criterion:
1. What we learned
2. Score (1-5)
3. Gap if not fully qualified
4. Question to ask to fill gap`,
    ],
  },
  {
    slug: 'demo-agent',
    workflow: 'Demo',
    name: 'Autonomous Demo Agent',
    description: 'Agents that prepare customized demos and handle post-demo follow-through.',
    steps: [
      'Analyze discovery notes to tailor demo',
      'Prepare prospect-specific demo script',
      'Generate relevant proof points and examples',
      'Create demo follow-up materials',
      'Handle technical questions async',
    ],
    prompts: [
      `You are a Demo Agent. Create a demo plan for this prospect.

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

      `Generate talk track for this demo section:

Feature/capability: [WHAT YOU'RE SHOWING]
Their pain point: [FROM DISCOVERY]
Their words: [HOW THEY DESCRIBED THE PAIN]

Create a talk track that:
1. Connects to their specific pain (use their words)
2. Shows the feature in context of their workflow
3. Quantifies the improvement
4. Invites their reaction`,

      `Prepare objection responses for this demo:

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

      `Create a post-demo summary email:

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

      `Handle this technical question from the demo:

Their question:
"[PASTE TECHNICAL QUESTION]"

Our capabilities:
[RELEVANT PRODUCT DETAILS]

Write a response that:
1. Answers directly (don't evade)
2. Explains in their context
3. Offers to dive deeper if needed
4. Keeps momentum toward next step`,
    ],
  },
  {
    slug: 'negotiation-agent',
    workflow: 'Negotiation',
    name: 'Autonomous Negotiation Agent',
    description: 'Agents that support pricing negotiations and deal structuring.',
    steps: [
      'Analyze deal context and stakeholder needs',
      'Prepare negotiation strategy and BATNA',
      'Generate response options for common asks',
      'Calculate pricing scenarios',
      'Draft agreement summaries',
    ],
    prompts: [
      `You are a Negotiation Agent. Prepare a negotiation strategy.

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

      `Handle this discount request:

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

      `Calculate pricing scenarios for this deal:

Requested configuration:
- Users/seats: [N]
- Features needed: [LIST]
- Term length: [MONTHS]
- Payment terms: [PREFERENCE]

Our pricing:
[YOUR PRICING MODEL]

Generate scenarios:
1. Full list price
2. Standard discount
3. Maximum discount
4. Multi-year discount
5. Custom structure if requested

Show total deal value and margin for each.`,

      `Draft a proposal executive summary:

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

      `Handle this contract redline:

Their requested change:
"[PASTE THEIR REDLINE]"

Clause area: [LIABILITY/INDEMNITY/SLA/TERMS/ETC.]

Our standard position: [WHAT WE NORMALLY ACCEPT]
Deal importance: [HIGH/MEDIUM/LOW]

Recommend:
1. Accept as-is (if low risk)
2. Counter-proposal (middle ground)
3. Hold firm (with explanation)

Draft the response for legal/procurement.`,
    ],
  },
  {
    slug: 'follow-up-sequence-agent',
    workflow: 'Follow-up',
    name: 'Autonomous Follow-up Agent',
    description: 'Agents specialized in re-engaging prospects across the funnel.',
    steps: [
      'Identify prospects needing follow-up',
      'Analyze engagement history and context',
      'Generate appropriate follow-up content',
      'Optimize timing for maximum response',
      'Escalate stuck opportunities',
    ],
    prompts: [
      `You are a Follow-up Agent. Create a re-engagement strategy.

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

      `Generate a "new value" follow-up for this quiet prospect:

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

      `Create a multi-stakeholder follow-up strategy:

Account: [COMPANY]
Contacts engaged:
- [CONTACT 1]: [LAST INTERACTION]
- [CONTACT 2]: [LAST INTERACTION]
- [CONTACT 3]: [LAST INTERACTION]

Deal status: [STUCK AT STAGE]
Blocker: [WHAT'S HOLDING IT UP]

Create a coordinated follow-up plan:
1. Who to contact
2. What message for each
3. How to create internal momentum
4. When to escalate to executive outreach`,

      `Write a "breakup" email for a prospect who won't respond:

Prospect: [NAME]
Attempts made: [N EMAILS, N CALLS, ETC.]
Time elapsed: [DURATION]
Last known interest: [WHAT THEY SEEMED INTERESTED IN]

Write a final email that:
1. Doesn't guilt them
2. Leaves door open
3. Makes it easy to re-engage later
4. Has a soft CTA (not "let me know")`,

      `Determine if this opportunity should be closed-lost or given one more try:

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
    ],
  },
];

// Helper functions
export function getAgentTypeBySlug(slug: string): AgentType | undefined {
  return agentTypes.find(a => a.slug === slug);
}

export function getIndustryAgentBySlug(slug: string): IndustryAgent | undefined {
  return industryAgents.find(a => a.slug === slug);
}

export function getWorkflowAgentBySlug(slug: string): WorkflowAgent | undefined {
  return workflowAgents.find(a => a.slug === slug);
}

export function getAllAgentSlugs(): string[] {
  return [
    ...agentTypes.map(a => a.slug),
    ...industryAgents.map(a => a.slug),
    ...workflowAgents.map(a => a.slug),
  ];
}

export type AgentPageData =
  | { type: 'agent-type'; data: AgentType }
  | { type: 'industry-agent'; data: IndustryAgent }
  | { type: 'workflow-agent'; data: WorkflowAgent }
  | null;

export function getAgentPageBySlug(slug: string): AgentPageData {
  const agentType = getAgentTypeBySlug(slug);
  if (agentType) return { type: 'agent-type', data: agentType };

  const industryAgent = getIndustryAgentBySlug(slug);
  if (industryAgent) return { type: 'industry-agent', data: industryAgent };

  const workflowAgent = getWorkflowAgentBySlug(slug);
  if (workflowAgent) return { type: 'workflow-agent', data: workflowAgent };

  return null;
}
