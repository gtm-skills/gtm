// pSEO Data for programmatic page generation

export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  buyers: string[];
  painPoints: string[];
}

export interface Role {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  activities: string[];
}

export interface Methodology {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  stages: string[];
}

export interface Workflow {
  slug: string;
  name: string;
  shortName: string;
  description: string;
}

// Industries
export const industries: Industry[] = [
  {
    slug: 'saas',
    name: 'SaaS & Software',
    shortName: 'SaaS',
    description: 'Software-as-a-service and technology companies',
    buyers: ['CTO', 'VP Engineering', 'IT Director', 'Product Manager'],
    painPoints: ['integration complexity', 'security concerns', 'adoption rates', 'ROI justification'],
  },
  {
    slug: 'fintech',
    name: 'Financial Services & FinTech',
    shortName: 'FinTech',
    description: 'Banks, insurance, payments, and financial technology',
    buyers: ['CFO', 'VP Finance', 'Compliance Officer', 'Treasury Manager'],
    painPoints: ['regulatory compliance', 'security requirements', 'legacy system integration', 'audit trails'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & MedTech',
    shortName: 'Healthcare',
    description: 'Hospitals, clinics, medical devices, and health tech',
    buyers: ['CIO', 'CMO', 'VP Clinical Operations', 'IT Director'],
    painPoints: ['HIPAA compliance', 'EHR integration', 'clinical workflow disruption', 'patient data security'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Industrial',
    shortName: 'Manufacturing',
    description: 'Factories, supply chain, and industrial operations',
    buyers: ['Plant Manager', 'VP Operations', 'Supply Chain Director', 'Quality Manager'],
    painPoints: ['downtime costs', 'supply chain visibility', 'quality control', 'workforce training'],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    shortName: 'Prof Services',
    description: 'Consulting, legal, accounting, and business services',
    buyers: ['Managing Partner', 'Practice Lead', 'COO', 'Director of Operations'],
    painPoints: ['utilization rates', 'client retention', 'knowledge management', 'talent development'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce & Retail',
    shortName: 'E-commerce',
    description: 'Online retailers, DTC brands, and omnichannel retail',
    buyers: ['VP E-commerce', 'CMO', 'Head of Digital', 'Merchandising Director'],
    painPoints: ['cart abandonment', 'customer acquisition cost', 'inventory management', 'conversion rates'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate & PropTech',
    shortName: 'Real Estate',
    description: 'Commercial real estate, property management, and proptech',
    buyers: ['Property Manager', 'Asset Manager', 'VP Real Estate', 'Facilities Director'],
    painPoints: ['tenant retention', 'occupancy rates', 'maintenance costs', 'lease management'],
  },
  {
    slug: 'education',
    name: 'Education & EdTech',
    shortName: 'Education',
    description: 'Schools, universities, corporate training, and edtech',
    buyers: ['CIO', 'Dean', 'VP Academic Affairs', 'Director of IT'],
    painPoints: ['student engagement', 'budget constraints', 'technology adoption', 'learning outcomes'],
  },
];

// Roles
export const roles: Role[] = [
  {
    slug: 'sdr',
    name: 'Sales Development Rep (SDR)',
    shortName: 'SDR',
    description: 'Outbound prospecting, qualification, and meeting booking',
    activities: ['cold outreach', 'lead qualification', 'meeting booking', 'account research'],
  },
  {
    slug: 'ae',
    name: 'Account Executive (AE)',
    shortName: 'AE',
    description: 'Discovery, demos, negotiation, and closing deals',
    activities: ['discovery calls', 'product demos', 'proposal writing', 'negotiation', 'closing'],
  },
  {
    slug: 'sales-manager',
    name: 'Sales Manager',
    shortName: 'Sales Manager',
    description: 'Team leadership, coaching, forecasting, and strategy',
    activities: ['coaching', 'pipeline review', 'forecasting', 'hiring', 'strategy'],
  },
  {
    slug: 'csm',
    name: 'Customer Success Manager (CSM)',
    shortName: 'CSM',
    description: 'Onboarding, retention, expansion, and renewals',
    activities: ['onboarding', 'QBRs', 'upselling', 'churn prevention', 'advocacy'],
  },
  {
    slug: 'revops',
    name: 'Revenue Operations',
    shortName: 'RevOps',
    description: 'Process optimization, analytics, and tech stack management',
    activities: ['process design', 'reporting', 'tool administration', 'data hygiene'],
  },
  {
    slug: 'founder',
    name: 'Founder / CEO',
    shortName: 'Founder',
    description: 'Founder-led sales, positioning, and early-stage selling',
    activities: ['positioning', 'enterprise selling', 'investor pitches', 'partnership deals'],
  },
];

// Methodologies
export const methodologies: Methodology[] = [
  {
    slug: 'meddpicc',
    name: 'MEDDPICC',
    shortName: 'MEDDPICC',
    description: 'Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion, Competition',
    stages: ['Metrics', 'Economic Buyer', 'Decision Criteria', 'Decision Process', 'Identify Pain', 'Champion', 'Competition'],
  },
  {
    slug: 'spin',
    name: 'SPIN Selling',
    shortName: 'SPIN',
    description: 'Situation, Problem, Implication, Need-Payoff questioning',
    stages: ['Situation Questions', 'Problem Questions', 'Implication Questions', 'Need-Payoff Questions'],
  },
  {
    slug: 'challenger',
    name: 'Challenger Sale',
    shortName: 'Challenger',
    description: 'Teach, Tailor, Take Control methodology',
    stages: ['Teach', 'Tailor', 'Take Control'],
  },
  {
    slug: 'sandler',
    name: 'Sandler Selling',
    shortName: 'Sandler',
    description: 'Pain funnel, budget, and decision framework',
    stages: ['Bonding & Rapport', 'Up-Front Contract', 'Pain', 'Budget', 'Decision', 'Fulfillment', 'Post-Sell'],
  },
  {
    slug: 'gap-selling',
    name: 'Gap Selling',
    shortName: 'Gap Selling',
    description: 'Current state to future state gap analysis',
    stages: ['Current State', 'Future State', 'Gap', 'Impact'],
  },
  {
    slug: 'value-selling',
    name: 'Value Selling',
    shortName: 'Value Selling',
    description: 'Quantified business value and ROI-focused selling',
    stages: ['Value Discovery', 'Value Proposition', 'Value Proof', 'Value Realization'],
  },
];

// Workflows
export const workflows: Workflow[] = [
  {
    slug: 'cold-outreach',
    name: 'Cold Outreach',
    shortName: 'Cold Outreach',
    description: 'Initial contact with prospects who don\'t know you',
  },
  {
    slug: 'discovery',
    name: 'Discovery Calls',
    shortName: 'Discovery',
    description: 'Understanding prospect needs, pain, and goals',
  },
  {
    slug: 'demo',
    name: 'Product Demo',
    shortName: 'Demo',
    description: 'Showcasing product value and capabilities',
  },
  {
    slug: 'objection-handling',
    name: 'Objection Handling',
    shortName: 'Objections',
    description: 'Addressing concerns and overcoming resistance',
  },
  {
    slug: 'negotiation',
    name: 'Negotiation & Closing',
    shortName: 'Closing',
    description: 'Final stages of deal negotiation and close',
  },
  {
    slug: 'follow-up',
    name: 'Follow-up Sequences',
    shortName: 'Follow-up',
    description: 'Nurturing prospects who haven\'t responded',
  },
];

// Prompt templates by combination type
export function getPromptsForIndustryRole(industry: Industry, role: Role): string[] {
  const prompts: string[] = [];

  // Generate contextual prompts based on the combination
  if (role.slug === 'sdr') {
    prompts.push(
      `You are an SDR targeting ${industry.name} companies. Research [COMPANY NAME] and identify:
1. What they do and their market position
2. Recent news or triggers (funding, hiring, product launches)
3. Key stakeholders in ${industry.buyers.slice(0, 2).join(' and ')} roles
4. Potential pain points related to ${industry.painPoints[0]}

Output a brief profile I can use for personalized outreach.`,

      `Write a cold email to a ${industry.buyers[0]} at a ${industry.shortName} company.

Context:
- They recently [TRIGGER: raised funding / launched product / hired for X]
- We help ${industry.shortName} companies with [YOUR VALUE PROP]
- Our differentiator: [ONE KEY DIFFERENTIATOR]

Rules:
- Subject line under 5 words
- Body under 75 words
- Reference their specific situation
- One clear CTA
- No "I hope this finds you well"`,

      `Write a LinkedIn connection request to a ${industry.buyers[1]} at a ${industry.shortName} company.

Context: [WHAT YOU KNOW ABOUT THEM]

Rules:
- Under 300 characters
- Reference something specific about them or their company
- Don't pitch in the connection request
- Be genuinely curious`,

      `I sent a cold email to [PROSPECT NAME] at [COMPANY] 5 days ago with no response.
They are a ${industry.buyers[0]} at a ${industry.shortName} company.

Write a follow-up email that:
- Doesn't guilt them for not responding
- Adds new value or a different angle
- Keeps it under 50 words
- Has a softer CTA`,

      `Create a list of 10 discovery questions for qualifying a ${industry.shortName} prospect.
Focus on:
- Their current situation with ${industry.painPoints[0]}
- Impact of the problem on their business
- Who else is involved in decisions
- Timeline and urgency`
    );
  } else if (role.slug === 'ae') {
    prompts.push(
      `Prepare me for a discovery call with [PROSPECT NAME], ${industry.buyers[0]} at [COMPANY].

Research what I should know about:
1. Their company and recent news
2. ${industry.shortName} industry trends affecting them
3. Likely pain points around ${industry.painPoints.join(', ')}
4. Questions to ask about their decision process

Format as a one-page call prep doc.`,

      `Write a discovery call opening for a ${industry.buyers[0]} at a ${industry.shortName} company.

Include:
- A pattern interrupt (not "how are you today")
- Acknowledgment of their time
- A clear agenda suggestion
- Permission to ask questions

Keep it under 30 seconds when spoken.`,

      `Based on this discovery call with a ${industry.shortName} company:
[PASTE CALL NOTES]

Create a follow-up email that:
- Summarizes what we discussed
- Confirms next steps
- Restates the key pains they mentioned
- Attaches relevant resources`,

      `Write a proposal executive summary for a ${industry.shortName} company.

Their situation:
- Current challenge: ${industry.painPoints[0]}
- Desired outcome: [THEIR GOAL]
- Key stakeholders: ${industry.buyers.slice(0, 3).join(', ')}

Our solution: [YOUR PRODUCT/SERVICE]

Format: 1 page, focused on business outcomes not features.`,

      `My champion at [COMPANY] (${industry.shortName}) needs to get buy-in from their ${industry.buyers[1]}.

Create a one-pager they can share internally that:
- Speaks to ${industry.buyers[1]} priorities
- Quantifies the problem and solution
- Addresses likely objections around ${industry.painPoints[1]}
- Makes it easy to say yes`
    );
  } else if (role.slug === 'csm') {
    prompts.push(
      `Create a 90-day onboarding plan for a new ${industry.shortName} customer.

Account context:
- Company: [NAME]
- Main contact: [NAME], ${industry.buyers[0]}
- Use case: [PRIMARY USE CASE]
- Success metrics: [THEIR KPIS]

Include milestones, check-in cadence, and success criteria.`,

      `Prepare a QBR agenda for [CUSTOMER], a ${industry.shortName} company in their [Nth] quarter with us.

Cover:
- Results vs. goals
- ${industry.shortName}-specific benchmarks
- Expansion opportunities
- Roadmap items relevant to ${industry.painPoints[0]}
- Strategic recommendations`,

      `[CUSTOMER], a ${industry.shortName} company, is showing signs of churn risk:
[DESCRIBE WARNING SIGNS]

Write an outreach to their ${industry.buyers[0]} that:
- Doesn't sound desperate
- Acknowledges the situation
- Offers concrete help
- Proposes a specific next step`,

      `Identify upsell opportunities for [CUSTOMER], a ${industry.shortName} company.

Current usage: [WHAT THEY USE TODAY]
Their team: [SIZE AND ROLES]
${industry.shortName} trends: Consider how ${industry.painPoints.slice(0, 2).join(' and ')} create expansion needs.

Suggest 3 expansion plays with talking points.`,

      `Write a case study interview script for [CUSTOMER], a successful ${industry.shortName} customer.

Focus on:
- Their situation before (${industry.painPoints[0]})
- Why they chose us
- Results achieved (quantified)
- What they'd tell a peer considering us`
    );
  } else if (role.slug === 'sales-manager') {
    prompts.push(
      `Create a ${industry.shortName} sales playbook outline for my team.

Include sections on:
- ${industry.shortName} buyer personas (${industry.buyers.join(', ')})
- Common pain points and triggers
- Competitive landscape
- Objection handling for ${industry.shortName}
- Discovery questions specific to ${industry.painPoints[0]}`,

      `Review this rep's ${industry.shortName} deal and provide coaching:

Account: [COMPANY]
Stage: [STAGE]
Key contact: ${industry.buyers[0]}
Notes: [REP'S NOTES]

Identify:
- What's going well
- Risks to address
- Suggested next steps
- Questions to ask in our 1:1`,

      `My team is struggling with ${industry.shortName} deals stalling at [STAGE].

Common objections we hear:
- ${industry.painPoints[0]} concerns
- [OTHER OBJECTION]

Create a coaching framework I can use in team meetings to address this.`,

      `Build a ${industry.shortName} territory plan template for my reps.

Include:
- Account tiering criteria for ${industry.shortName}
- Target persona prioritization
- Outreach cadence recommendations
- Key triggers to monitor
- Quota planning guidance`,

      `Create a ${industry.shortName} competitive battle card for [COMPETITOR].

Our differentiators for ${industry.shortName}:
- [DIFFERENTIATOR 1]
- [DIFFERENTIATOR 2]

Format with:
- When we win / when we lose
- Trap questions to set
- Landmines to plant
- ${industry.shortName}-specific proof points`
    );
  } else if (role.slug === 'revops') {
    prompts.push(
      `Design a ${industry.shortName} lead scoring model.

Consider:
- Firmographic signals (company size, tech stack)
- Behavioral signals (content engagement, website visits)
- ${industry.shortName}-specific triggers (${industry.painPoints[0]})
- Buyer persona fit (${industry.buyers.join(', ')})

Output a scoring rubric with point values.`,

      `Create a ${industry.shortName} sales process stage definitions document.

For each stage, define:
- Entry criteria
- Exit criteria
- Required fields in CRM
- ${industry.shortName}-specific qualification criteria
- Typical activities`,

      `Audit our ${industry.shortName} pipeline and identify issues:

Current pipeline: [PASTE DATA OR DESCRIBE]

Analyze:
- Stage conversion rates vs. benchmarks
- Average deal size and cycle length
- Common stuck points
- Data quality issues
- Process bottlenecks`,

      `Build a ${industry.shortName} sales dashboard for leadership.

Key metrics to include:
- Pipeline by stage and ${industry.shortName} sub-segment
- Win rate trends
- Average deal size
- Sales cycle length
- Rep performance
- Forecast accuracy`,

      `Create a ${industry.shortName} deal desk approval workflow.

Consider:
- Discount thresholds requiring approval
- Non-standard terms common in ${industry.shortName} (${industry.painPoints[1]})
- Legal review triggers
- Executive involvement criteria`
    );
  } else if (role.slug === 'founder') {
    prompts.push(
      `I'm a founder selling into ${industry.shortName}. Help me craft my positioning.

We do: [DESCRIBE YOUR PRODUCT]
Competitors: [LIST COMPETITORS]
${industry.shortName} pain points we address: ${industry.painPoints.join(', ')}

Create:
- One-sentence positioning statement
- 30-second elevator pitch
- Key differentiators for ${industry.shortName}`,

      `Write a cold email I (founder/CEO) can send to a ${industry.buyers[0]} at a target ${industry.shortName} company.

Context:
- We're an early-stage startup
- [DESCRIBE TRACTION/PROOF POINTS]
- We specifically help ${industry.shortName} with ${industry.painPoints[0]}

The founder email should feel personal, not templated.`,

      `Prepare me for a meeting with [COMPANY], a potential ${industry.shortName} design partner.

I need:
- Questions to assess their fit as a design partner
- How to pitch the partnership value exchange
- Red flags to watch for
- What to offer/what to ask for`,

      `A ${industry.shortName} prospect asked for customer references but we're early stage.

Help me craft a response that:
- Acknowledges we're early
- Pivots to other proof points
- Offers alternative validation
- Maintains confidence without BS`,

      `I have a meeting with a ${industry.shortName} investor who wants to understand our GTM.

Create talking points on:
- Our ${industry.shortName} ICP and why
- Sales motion and early traction
- Why ${industry.shortName} now (market timing)
- Path to scaling in this vertical`
    );
  }

  return prompts;
}

export function getPromptsForIndustryMethodology(industry: Industry, methodology: Methodology): string[] {
  const prompts: string[] = [];

  if (methodology.slug === 'meddpicc') {
    prompts.push(
      `Create MEDDPICC discovery questions for a ${industry.shortName} deal.

For each element, provide ${industry.shortName}-specific questions:

**Metrics:** What KPIs matter to ${industry.buyers[0]}?
**Economic Buyer:** How do ${industry.shortName} companies structure buying decisions?
**Decision Criteria:** What do ${industry.shortName} buyers evaluate?
**Decision Process:** Typical ${industry.shortName} procurement process?
**Identify Pain:** Questions about ${industry.painPoints.join(', ')}
**Champion:** How to identify and enable a champion?
**Competition:** Who else might they consider?`,

      `Score this ${industry.shortName} deal using MEDDPICC:

Account: [COMPANY]
What we know: [PASTE NOTES]

Rate each element 1-3 (Red/Yellow/Green) and explain:
- What's confirmed
- What's missing
- Suggested actions to strengthen`,

      `My ${industry.shortName} deal is weak on "Economic Buyer" - I'm talking to ${industry.buyers[2]} but haven't reached ${industry.buyers[0]}.

Help me:
- Craft questions to understand the EB's priorities
- Create a strategy to get access
- Prepare materials that appeal to ${industry.shortName} EBs`,

      `Write Champion enablement content for a ${industry.shortName} deal.

My champion is a ${industry.buyers[1]} who needs to sell internally.

Create:
- Email they can forward to their ${industry.buyers[0]}
- One-page summary addressing ${industry.painPoints[0]}
- ROI talking points specific to ${industry.shortName}`
    );
  } else if (methodology.slug === 'spin') {
    prompts.push(
      `Create SPIN questions for a ${industry.shortName} discovery call.

**Situation Questions:** Understand their current state with ${industry.painPoints[0]}
**Problem Questions:** Uncover issues and challenges
**Implication Questions:** Explore impact on their ${industry.shortName} business
**Need-Payoff Questions:** Get them to articulate value of solving

Provide 5 questions for each category, tailored to ${industry.buyers[0]} priorities.`,

      `My ${industry.shortName} prospect said: "[PROSPECT STATEMENT]"

Using SPIN, what's my next question? Provide options for:
- Deepening the problem
- Exploring implications
- Moving to need-payoff`,

      `Convert these features into SPIN Need-Payoff questions for ${industry.shortName}:

Features: [LIST YOUR FEATURES]

For each feature, write a question that gets the ${industry.buyers[0]} to describe how it would help with ${industry.painPoints[0]}.`
    );
  } else if (methodology.slug === 'challenger') {
    prompts.push(
      `Create a Challenger Sale "Teach" moment for ${industry.shortName} buyers.

The insight: [YOUR UNIQUE INSIGHT ABOUT ${industry.shortName.toUpperCase()}]

Structure it as:
1. Warmer - connect to their world
2. Reframe - challenge their thinking
3. Rational drowning - data supporting the reframe
4. Emotional impact - what this means for them
5. New way - your solution approach`,

      `Help me "Tailor" my Challenger pitch for a ${industry.buyers[0]} at a ${industry.shortName} company.

Generic pitch: [YOUR STANDARD PITCH]

Adapt it to address:
- ${industry.buyers[0]} specific priorities
- ${industry.shortName} industry pressures
- ${industry.painPoints[0]} specifically`,

      `My ${industry.shortName} prospect is pushing back on my Challenger reframe.

They said: "[THEIR OBJECTION]"

Help me "Take Control" of the conversation without being pushy. Provide:
- Acknowledgment of their view
- Bridge back to the insight
- Question to advance the dialogue`
    );
  } else if (methodology.slug === 'sandler') {
    prompts.push(
      `Create a Sandler Pain Funnel for ${industry.shortName} prospects.

Starting with surface-level pain around ${industry.painPoints[0]}, create questions that:
1. Surface pain
2. Explore pain
3. Quantify pain
4. Personalize pain

Tailor each level to ${industry.buyers[0]} and ${industry.shortName} context.`,

      `Write an Up-Front Contract for a ${industry.shortName} discovery call.

Include:
- Time expectation
- Purpose of the call
- What they'll share / what I'll share
- Possible outcomes (including "not a fit")
- Permission to ask tough questions

Make it feel natural, not scripted.`,

      `My ${industry.shortName} prospect won't discuss budget (Sandler Budget step).

They said: "[WHAT THEY SAID]"

Help me:
- Understand if this is a red flag
- Reframe the budget conversation
- Questions to indirectly qualify budget`
    );
  } else if (methodology.slug === 'gap-selling') {
    prompts.push(
      `Map the Current State → Future State Gap for a ${industry.shortName} prospect.

**Current State Questions:**
- How are they handling ${industry.painPoints[0]} today?
- What's the impact on their business?
- What have they tried before?

**Future State Questions:**
- What does success look like?
- What would change if this was solved?

**Gap Analysis:**
- What's preventing them from getting there?
- What's the cost of the gap?`,

      `My ${industry.shortName} prospect described their current state:
"[THEIR DESCRIPTION]"

Help me:
1. Summarize their current state
2. Paint a compelling future state
3. Quantify the gap
4. Position our solution as the bridge`,

      `Create a Gap Selling problem identification worksheet for ${industry.shortName}.

For ${industry.painPoints[0]}:
- Current state symptoms
- Root causes to explore
- Business impact categories
- Future state vision
- Gap quantification approach`
    );
  } else if (methodology.slug === 'value-selling') {
    prompts.push(
      `Build a Value Hypothesis for ${industry.shortName} prospects.

Our solution: [DESCRIBE]

For a ${industry.buyers[0]}, quantify value in terms of:
- Revenue impact
- Cost reduction
- Risk mitigation
- Time savings

Use ${industry.shortName} benchmarks where possible.`,

      `Create ROI talking points for a ${industry.shortName} deal.

They care about: ${industry.painPoints.join(', ')}

Build a simple ROI model:
- Investment (our price)
- Returns (quantified benefits)
- Payback period
- 3-year value

Make it specific to ${industry.shortName} metrics.`,

      `My ${industry.shortName} prospect said our ROI projections seem too good.

Help me:
- Validate the assumptions
- Provide conservative scenarios
- Offer proof points from similar ${industry.shortName} customers
- Propose a pilot to prove value`
    );
  }

  return prompts;
}

export function getPromptsForRoleWorkflow(role: Role, workflow: Workflow): string[] {
  const prompts: string[] = [];

  if (workflow.slug === 'cold-outreach') {
    if (role.slug === 'sdr') {
      prompts.push(
        `Write a cold email sequence (3 touches) for an SDR.

Target: [TITLE] at [COMPANY TYPE]
Value prop: [WHAT WE DO]
Trigger: [WHY NOW]

Email 1: Initial outreach (hook + value)
Email 2: Follow-up (new angle, 3 days later)
Email 3: Breakup (5 days later)

Each email under 75 words.`,

        `Create a cold call opener that gets past "not interested."

Target: [TITLE]
My company: [WHAT WE DO]

Structure:
- Pattern interrupt (not "how are you")
- Permission-based approach
- Quick value statement
- Soft ask for time`,

        `Write a LinkedIn cold outreach sequence:
1. Connection request (under 300 chars)
2. Thank you + soft intro (once accepted)
3. Value message (if no response)

Don't be salesy. Be curious and valuable.`,

        `My cold email got this reply: "[THEIR RESPONSE - e.g., 'Not interested' / 'We use X' / 'Bad timing']"

Write a response that:
- Doesn't argue
- Shows understanding
- Leaves door open
- Provides unexpected value`
      );
    } else if (role.slug === 'founder') {
      prompts.push(
        `Write a founder cold email that doesn't feel like a template.

I'm the CEO of [COMPANY].
We help [TARGET COMPANIES] with [VALUE PROP].
I'm reaching out to [PROSPECT NAME], [TITLE] at [COMPANY].

Make it personal, brief, and founder-authentic.`,

        `Create a "warm cold" outreach using a mutual connection.

Mutual connection: [NAME]
Target: [PROSPECT NAME] at [COMPANY]
My ask: [WHAT I WANT]

Write the email and a message to ask the mutual for an intro.`
      );
    }
  } else if (workflow.slug === 'discovery') {
    if (role.slug === 'ae') {
      prompts.push(
        `Create a discovery call framework for a [INDUSTRY] prospect.

Structure:
1. Opening (build rapport, set agenda)
2. Situation questions (current state)
3. Problem questions (pain and impact)
4. Implication questions (what if unsolved)
5. Vision questions (ideal future)
6. Process questions (how they buy)
7. Next steps

Provide 3-5 questions per section.`,

        `My discovery call is in 15 minutes. Quick prep for:

Company: [NAME]
Contact: [NAME, TITLE]
What I know: [BRIEF CONTEXT]

Give me:
- 3 must-ask questions
- 1 insight to share
- A strong opening line`,

        `Score this discovery call and identify gaps:

[PASTE CALL NOTES OR TRANSCRIPT SUMMARY]

Rate on:
- Pain identified (1-5)
- Impact quantified (1-5)
- Decision process mapped (1-5)
- Champion potential (1-5)
- Next steps clarity (1-5)

What should I ask in the follow-up?`
      );
    } else if (role.slug === 'sdr') {
      prompts.push(
        `Create a qualification call script for SDRs.

Goal: Determine if prospect is worth an AE's time.

Qualify on:
- Need (do they have the problem)
- Timeline (are they looking to solve it)
- Authority (can they influence a decision)
- Budget (is there money)

Keep it conversational, under 15 minutes.`
      );
    }
  } else if (workflow.slug === 'objection-handling') {
    prompts.push(
      `Handle this objection: "[OBJECTION]"

Context: [DEAL STAGE, WHAT YOU KNOW]

Provide:
1. Acknowledge (show you heard them)
2. Clarify (understand the real concern)
3. Respond (address it directly)
4. Confirm (check if resolved)
5. Advance (next step)`,

      `Create an objection handling cheat sheet for ${role.shortName}s.

Common objections:
- "Too expensive"
- "We're using [competitor]"
- "Not a priority right now"
- "Need to think about it"
- "Send me more information"

For each: Acknowledge, clarify question, and response.`,

      `My prospect said: "I need to talk to my team."

This is often a stall. Help me:
- Understand if it's real or a brush-off
- Questions to ask to qualify it
- How to stay engaged without being pushy
- Offer to help them sell internally`
    );
  } else if (workflow.slug === 'negotiation') {
    if (role.slug === 'ae') {
      prompts.push(
        `My prospect is asking for a 30% discount.

Deal context:
- Deal size: [AMOUNT]
- Their budget: [IF KNOWN]
- Competition: [IF ANY]
- Timeline: [WHEN THEY NEED TO DECIDE]

Help me:
- Understand what's driving the ask
- Alternatives to discounting
- What to ask for in return
- How to hold the line professionally`,

        `Create a negotiation prep worksheet for my deal.

Account: [NAME]
Deal value: [AMOUNT]
Key stakeholders: [NAMES/TITLES]
What they want: [THEIR ASKS]
What I want: [MY GOALS]
Walk-away point: [MY LIMIT]

Help me plan concessions and trades.`,

        `Write a "final offer" email that creates urgency without being cheesy.

Context: We've been negotiating for [TIME]. They want [THEIR ASK]. I can offer [MY FINAL POSITION].

Make it firm but maintain the relationship.`
      );
    }
  } else if (workflow.slug === 'follow-up') {
    prompts.push(
      `Create a follow-up sequence for a prospect who went dark.

Last contact: [DATE]
Last interaction: [WHAT HAPPENED]
What they said: [THEIR LAST MESSAGE]

Write 3 follow-ups:
1. Value-add (1 week later)
2. Different angle (2 weeks later)
3. Breakup (3 weeks later)`,

      `My prospect hasn't responded to my proposal sent [X] days ago.

Write a follow-up that:
- Doesn't ask "did you get my email"
- Adds new value
- Creates soft urgency
- Makes it easy to respond`,

      `Create a long-term nurture sequence for prospects who said "not now."

Touch 1: [1 month] - Industry insight
Touch 2: [2 months] - Case study
Touch 3: [3 months] - Thought leadership
Touch 4: [4 months] - Check-in

Keep each under 50 words. Not salesy.`
    );
  }

  return prompts;
}

// Triple combination: Industry × Role × Workflow
export function getPromptsForTripleCombination(industry: Industry, role: Role, workflow: Workflow): string[] {
  const prompts: string[] = [];

  if (workflow.slug === 'cold-outreach') {
    if (role.slug === 'sdr') {
      prompts.push(
        `Write a cold email to a ${industry.buyers[0]} at a ${industry.shortName} company.

Context:
- Industry: ${industry.name}
- Target pain: ${industry.painPoints[0]}
- Trigger: [RECENT NEWS/EVENT]

Rules:
- Subject under 5 words
- Body under 75 words
- Reference ${industry.shortName}-specific challenge
- One clear CTA`,

        `Create a 3-touch cold email sequence for ${industry.shortName} prospects.

Target: ${industry.buyers[0]} or ${industry.buyers[1]}
Pain points to address: ${industry.painPoints.slice(0, 2).join(', ')}

Email 1: Pattern interrupt + ${industry.shortName} insight
Email 2: Case study or proof point (3 days later)
Email 3: Breakup with value (5 days later)

Each under 75 words.`,

        `Write a LinkedIn connection request for a ${industry.buyers[0]} at a ${industry.shortName} company.

What I know about them: [THEIR BACKGROUND/POST]
My value prop for ${industry.shortName}: [YOUR OFFERING]

Rules:
- Under 300 characters
- Reference something specific to ${industry.shortName}
- Don't pitch, be curious`,

        `My cold email to a ${industry.shortName} ${industry.buyers[0]} got this response: "[THEIR REPLY]"

Write a follow-up that:
- Acknowledges their point
- Provides unexpected value about ${industry.painPoints[0]}
- Keeps the door open
- Doesn't argue or push`
      );
    } else if (role.slug === 'ae') {
      prompts.push(
        `Write an executive outreach email from an AE to a ${industry.buyers[0]} at a ${industry.shortName} company.

Context:
- We already talked to their ${industry.buyers[2] || 'team member'}
- They care about ${industry.painPoints[0]}
- We can help with [YOUR VALUE PROP]

Make it executive-appropriate: brief, direct, focused on outcomes.`,

        `Create a re-engagement email for a ${industry.shortName} deal that went dark.

Last contact: [DATE]
Stage when they went dark: [STAGE]
Their main concern was: ${industry.painPoints[0]}

Write something that:
- Doesn't guilt them
- Adds new value
- Creates soft urgency`
      );
    } else if (role.slug === 'founder') {
      prompts.push(
        `Write a founder cold email to a ${industry.buyers[0]} at a ${industry.shortName} company.

I'm CEO of [MY COMPANY].
We help ${industry.shortName} companies with ${industry.painPoints[0]}.
I noticed [SOMETHING SPECIFIC ABOUT THEIR COMPANY].

Make it personal, not templated. Founder-to-executive tone.`,

        `Create a warm intro request for a ${industry.shortName} target.

I want to reach: ${industry.buyers[0]} at [TARGET COMPANY]
My mutual connection: [NAME]
Why I want the intro: ${industry.painPoints[0]}

Write:
1. The ask to my connection
2. A forwardable blurb they can use`
      );
    }
  } else if (workflow.slug === 'discovery') {
    prompts.push(
      `Create a ${industry.shortName} discovery call framework for a ${role.shortName}.

Opening (2 min):
- Build rapport with ${industry.shortName}-relevant small talk
- Set agenda

Situation (5 min):
- Current state questions about ${industry.painPoints[0]}

Problem (10 min):
- Impact of ${industry.painPoints.slice(0, 2).join(' and ')}
- Who else is affected

Implication (5 min):
- Cost of inaction
- Competitive pressure

Vision (5 min):
- Ideal future state
- Success metrics

Next steps (3 min):
- Stakeholder mapping
- Timeline`,

      `Write 10 ${industry.shortName}-specific discovery questions for a ${role.shortName} calling on a ${industry.buyers[0]}.

Focus areas:
- ${industry.painPoints[0]}
- ${industry.painPoints[1]}
- Decision process at ${industry.shortName} companies
- Budget and timeline

Mix of situation, problem, and implication questions.`,

      `My ${industry.shortName} discovery call revealed:
[PASTE KEY FINDINGS]

As an ${role.shortName}, help me:
1. Summarize their situation
2. Identify the real pain
3. Quantify the impact
4. Plan my next steps`
    );
  } else if (workflow.slug === 'demo') {
    prompts.push(
      `Create a ${industry.shortName} demo agenda for a ${role.shortName}.

Attendees: ${industry.buyers.slice(0, 3).join(', ')}
Their pain points: ${industry.painPoints.slice(0, 2).join(', ')}
Time: 30 minutes

Structure:
- Recap their situation (3 min)
- Show solution for ${industry.painPoints[0]} (10 min)
- Show solution for ${industry.painPoints[1]} (10 min)
- ROI discussion (5 min)
- Next steps (2 min)`,

      `Write demo talking points for a ${industry.shortName} prospect.

Feature: [YOUR FEATURE]
Their pain: ${industry.painPoints[0]}
Their role: ${industry.buyers[0]}

Connect the feature to:
- Their specific challenge
- Business outcome they care about
- ${industry.shortName} industry context`,

      `Handle this objection during a ${industry.shortName} demo:

Prospect (${industry.buyers[0]}): "[THEIR OBJECTION]"

As an ${role.shortName}, respond by:
- Acknowledging their concern
- Reframing in ${industry.shortName} context
- Providing proof point
- Confirming resolution`
    );
  } else if (workflow.slug === 'objection-handling') {
    prompts.push(
      `Create an objection handling guide for ${role.shortName}s selling to ${industry.shortName}.

Common ${industry.shortName} objections:
1. "${industry.painPoints[0]} isn't a priority"
2. "We already have a solution"
3. "Too expensive for our ${industry.shortName} budget"
4. "Need to involve ${industry.buyers[1]}"
5. "Bad timing with [${industry.shortName} SPECIFIC ISSUE]"

For each: Acknowledge → Clarify → Respond → Advance`,

      `My ${industry.shortName} prospect (${industry.buyers[0]}) said: "[THEIR OBJECTION]"

As an ${role.shortName}, help me:
- Understand the real concern behind it
- Questions to ask to dig deeper
- How to respond without being defensive
- How to advance the conversation`,

      `The ${industry.buyers[1]} at my ${industry.shortName} prospect is blocking the deal.

Their concern: ${industry.painPoints[1]}
My champion: ${industry.buyers[0]}

Help me:
- Create content to address ${industry.buyers[1]}'s concerns
- Coach my champion on how to sell internally
- Plan a direct outreach if needed`
    );
  } else if (workflow.slug === 'negotiation') {
    prompts.push(
      `My ${industry.shortName} prospect wants a 25% discount.

Context:
- Deal size: [AMOUNT]
- Buyer: ${industry.buyers[0]}
- Their concern: ${industry.painPoints[0]}
- Competition: [YES/NO]

As an ${role.shortName}, help me:
- Understand why they're asking
- Alternatives to pure discount
- What to ask for in return
- How to hold value`,

      `Create a negotiation prep sheet for my ${industry.shortName} deal.

Account: [NAME]
Key stakeholders: ${industry.buyers.slice(0, 3).join(', ')}
Deal value: [AMOUNT]
Their priorities: ${industry.painPoints.slice(0, 2).join(', ')}
Our must-haves: [LIST]
Our nice-to-haves: [LIST]

Map out potential trades and concessions.`,

      `Write a "final offer" email for a ${industry.shortName} deal.

We've been negotiating for [TIME].
They want: [THEIR ASKS]
I can offer: [MY FINAL POSITION]

Make it firm but preserve the ${industry.shortName} relationship.`
    );
  } else if (workflow.slug === 'follow-up') {
    prompts.push(
      `Create a follow-up sequence for a ${industry.shortName} prospect who went dark.

Context:
- Role: ${industry.buyers[0]}
- Last contact: [DATE]
- Stage: [STAGE]
- Their interest: ${industry.painPoints[0]}

As an ${role.shortName}, write:
1. Value-add follow-up (1 week)
2. New angle follow-up (2 weeks)
3. Breakup email (3 weeks)

Each under 50 words, ${industry.shortName}-relevant.`,

      `My ${industry.shortName} deal has stalled after [STAGE].

Champion: ${industry.buyers[0]}
Blocker: ${industry.buyers[1]}
Key concern: ${industry.painPoints[1]}

Help me:
- Re-engage the champion
- Create content for the blocker
- Propose a path forward`,

      `Write a "thinking of you" touch for a ${industry.shortName} prospect in long-term nurture.

They said "not now" [X] months ago.
Their situation: ${industry.painPoints[0]}
Recent ${industry.shortName} news: [IF ANY]

Make it valuable, not salesy. Under 50 words.`
    );
  }

  // If no workflow-specific prompts, provide general triple combo prompts
  if (prompts.length === 0) {
    prompts.push(
      `Create a ${workflow.name.toLowerCase()} playbook for ${role.shortName}s in ${industry.shortName}.

Target buyers: ${industry.buyers.join(', ')}
Key pain points: ${industry.painPoints.join(', ')}
${role.shortName} activities: ${role.activities.join(', ')}

Include specific prompts, talk tracks, and templates.`,

      `What are the top 5 things a ${role.shortName} should know about ${workflow.name.toLowerCase()} in ${industry.shortName}?

Consider:
- ${industry.shortName}-specific challenges
- Buyer expectations
- Common mistakes
- Best practices`
    );
  }

  return prompts;
}

// Generate all possible slugs for static generation
export function getAllPromptSlugs(): string[][] {
  const slugs: string[][] = [];

  // Industry × Role (Tier 1)
  for (const industry of industries) {
    for (const role of roles) {
      slugs.push([industry.slug, role.slug]);
    }
  }

  // Industry × Methodology (Tier 1)
  for (const industry of industries) {
    for (const methodology of methodologies) {
      slugs.push([industry.slug, methodology.slug]);
    }
  }

  // Role × Workflow (Tier 1)
  for (const role of roles) {
    for (const workflow of workflows) {
      slugs.push([role.slug, workflow.slug]);
    }
  }

  // Industry × Role × Workflow (Tier 2)
  for (const industry of industries) {
    for (const role of roles) {
      for (const workflow of workflows) {
        slugs.push([industry.slug, role.slug, workflow.slug]);
      }
    }
  }

  return slugs;
}

// Slugs for pages that should be indexed/sitemapped (Industry×Role,
// Industry×Methodology, Role×Workflow — the 132 well-linked double-combo
// pages). Excludes the 288 Industry×Role×Workflow triple-combo pages, which
// are still statically generated (see getAllPromptSlugs) but are thin,
// mostly-orphaned pages that are noindexed and kept out of the sitemap.
export function getIndexablePromptSlugs(): string[][] {
  return getAllPromptSlugs().filter((slug) => slug.length === 2);
}

// Get page data from slug
export function getPageFromSlug(slugParts: string[]): {
  type: 'industry-role' | 'industry-methodology' | 'role-workflow' | 'industry-role-workflow' | null;
  industry?: Industry;
  role?: Role;
  methodology?: Methodology;
  workflow?: Workflow;
  prompts: string[];
  title: string;
  description: string;
} | null {
  // Handle triple combinations (Tier 2)
  if (slugParts.length === 3) {
    const [first, second, third] = slugParts;
    const industry = industries.find(i => i.slug === first);
    const role = roles.find(r => r.slug === second);
    const workflow = workflows.find(w => w.slug === third);

    if (industry && role && workflow) {
      return {
        type: 'industry-role-workflow',
        industry,
        role,
        workflow,
        prompts: getPromptsForTripleCombination(industry, role, workflow),
        title: `${industry.shortName} ${role.shortName} ${workflow.shortName} Prompts`,
        description: `${workflow.name} prompts for ${role.name}s selling into ${industry.name}. Tailored templates for ${industry.shortName} buyers including ${industry.buyers.slice(0, 2).join(' and ')}.`,
      };
    }
    return null;
  }

  if (slugParts.length !== 2) return null;

  const [first, second] = slugParts;

  // Try Industry × Role
  const industry = industries.find(i => i.slug === first);
  const role = roles.find(r => r.slug === second);
  if (industry && role) {
    return {
      type: 'industry-role',
      industry,
      role,
      prompts: getPromptsForIndustryRole(industry, role),
      title: `${industry.shortName} ${role.shortName} Prompts`,
      description: `${role.name} prompts specifically designed for ${industry.name}. Cold outreach, discovery, and closing templates for selling into ${industry.shortName}.`,
    };
  }

  // Try Industry × Methodology
  const methodology = methodologies.find(m => m.slug === second);
  if (industry && methodology) {
    return {
      type: 'industry-methodology',
      industry,
      methodology,
      prompts: getPromptsForIndustryMethodology(industry, methodology),
      title: `${methodology.shortName} for ${industry.shortName}`,
      description: `${methodology.name} questions and frameworks tailored for ${industry.name} sales. Discovery, qualification, and deal progression prompts.`,
    };
  }

  // Try Role × Workflow
  const roleFirst = roles.find(r => r.slug === first);
  const workflow = workflows.find(w => w.slug === second);
  if (roleFirst && workflow) {
    return {
      type: 'role-workflow',
      role: roleFirst,
      workflow,
      prompts: getPromptsForRoleWorkflow(roleFirst, workflow),
      title: `${roleFirst.shortName} ${workflow.shortName} Prompts`,
      description: `${workflow.name} prompts for ${roleFirst.name}s. Templates and scripts for ${workflow.description.toLowerCase()}.`,
    };
  }

  return null;
}
