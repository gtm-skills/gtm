# Advanced GTM Skills

**10x workflows that transform how you sell.** These aren't prompts—they're complete systems for deal analysis, pipeline intelligence, and predictive selling.

## Skills Included

| Skill | Command | What It Does |
|-------|---------|--------------|
| Signal Synthesis | `/gtm-skills signals` | Combine weak signals into timing predictions |
| Champion Enablement | `/gtm-skills champion` | Arm your champion to sell internally |
| Referral Mining | `/gtm-skills referrals` | Systematic referral generation |
| ICP Evolution | `/gtm-skills icp-evolve` | Evolve your ICP from actual data |
| Timing Predictor | `/gtm-skills when` | Predict when a company will buy |
| Expansion Radar | `/gtm-skills expand` | Proactive expansion intelligence |
| Objection Patterns | `/gtm-skills objection-patterns` | Find systemic causes of objections |
| Competitor War Room | `/gtm-skills warroom` | Dynamic competitive positioning |
| Pricing Intelligence | `/gtm-skills price` | Optimal pricing recommendations |
| Deal Debrief | `/gtm-skills debrief` | Learn from closed deals to improve win rate |

---

## Installation

Add to Claude Code:
```bash
cp -r advanced ~/.claude/commands/gtm-skills-advanced.md
```

Or paste the SKILL.md contents into Claude.ai Project Knowledge.

---

## Skills Reference

### 1. Signal Synthesis

**Command:** `/gtm-skills signals`

**When to use:** Evaluating accounts, prioritizing outreach, predicting timing.

```
Synthesize buying signals for [COMPANY] and predict purchase timing.

AVAILABLE SIGNALS:

Funding/Financial:
- [Recent funding round, amount, investors]
- [Revenue signals, growth indicators]
- [Financial pressures or tailwinds]

Hiring Signals:
- [Current job postings, especially relevant roles]
- [Recent hires, especially leadership]
- [Team size changes]

Technology Signals:
- [Current tech stack]
- [Recent tool adoptions or migrations]
- [Integration patterns]

Organizational Signals:
- [Leadership changes]
- [Restructuring or reorgs]
- [Strategic announcements]

Competitive Signals:
- [Competitor usage or churn]
- [Market positioning moves]
- [Peer company behaviors]

Content/Intent Signals:
- [Content they're consuming]
- [Events they're attending]
- [Questions they're asking]

ANALYSIS REQUIRED:

1. SIGNAL STRENGTH SCORE (1-10)
- Rate each signal category
- Weight by relevance to our solution
- Calculate composite score

2. BUYING STAGE PREDICTION
- Where are they in their journey? (Unaware / Problem-aware / Solution-aware / Evaluating / Ready to buy)
- What evidence supports this stage?
- What would move them to the next stage?

3. TIMING PREDICTION
- When will they likely make a decision?
- What events will trigger urgency?
- What's their likely buying window?

4. RECOMMENDED ACTION
- What's the optimal outreach timing?
- What message will resonate given these signals?
- What should we wait for before reaching out?

5. SIGNAL GAPS
- What signals are we missing?
- What would strengthen or weaken this assessment?
- What should we monitor going forward?
```

---

### 2. Champion Enablement

**Command:** `/gtm-skills champion`

**When to use:** When your deal depends on someone selling internally for you.

```
Create champion enablement materials for this deal:

DEAL CONTEXT:
- Company: [COMPANY]
- Champion: [NAME], [TITLE]
- Their motivation: [Why they want this to happen]
- Decision makers they need to convince: [CFO, CEO, VP of X, etc.]
- Budget owner: [Who controls the money]
- Timeline: [When they need approval by]

OUR SOLUTION:
- What we sell: [BRIEF DESCRIPTION]
- Price: [AMOUNT]
- Key value props: [LIST 3-5]

KNOWN OBJECTIONS/CONCERNS:
- [List any concerns raised by other stakeholders]

GENERATE:

1. INTERNAL EMAIL TEMPLATE
Draft the email your champion sends to the decision maker requesting approval. Include:
- Why this matters now (urgency)
- What problem it solves (their language, not ours)
- Why this vendor (competitive differentiation)
- Clear ask (meeting, approval, next step)

2. ONE-PAGE BUSINESS CASE
Create a simple document they can share:
- Problem statement (2 sentences)
- Solution overview (3 bullets)
- ROI calculation (specific to their situation)
- Risk of inaction (what happens if they don't act)
- Implementation timeline
- Recommended next step

3. OBJECTION RESPONSES
For each stakeholder concern, provide:
- What to say to the CFO about [concern]
- What to say to the CEO about [concern]
- What to say to [other stakeholder] about [concern]

4. MEETING PREP
If they need to present in a meeting:
- 3 talking points to lead with
- Questions they should be ready to answer
- How to handle "let's table this" or "we need more time"

5. FOLLOW-UP SEQUENCE
- What to send if no response in 3 days
- How to re-engage if it stalls
- When to loop us (the vendor) back in

Make everything sound like it's coming from them, not from us.
```

---

### 3. Referral Mining

**Command:** `/gtm-skills referrals`

**When to use:** Customer success review, referral program, warm intro generation.

```
Generate referral opportunities from this customer:

CUSTOMER PROFILE:
- Company: [NAME]
- Main contact: [NAME, TITLE]
- Relationship strength: [1-10]
- Time as customer: [LENGTH]
- Success level: [HOW WELL IS IT GOING]
- Have they referred before: [YES/NO, DETAILS]

CUSTOMER NETWORK (if known):
- Previous companies they worked at: [LIST]
- Board positions: [IF ANY]
- Investors/advisors they know: [IF KNOWN]
- Industry associations: [MEMBERSHIPS]
- LinkedIn connection count: [APPROXIMATE]

IDEAL REFERRAL TARGET:
- ICP characteristics: [WHO WE WANT INTROS TO]
- Specific companies: [IF ANY]
- Specific people: [IF ANY]

ANALYSIS:

1. REFERRAL READINESS SCORE (1-10)
- How likely are they to refer based on relationship and results?
- What would increase their willingness?
- What might make them hesitant?

2. WARM INTRO OPPORTUNITIES
Based on their likely network:
- Target 1: [PERSON/COMPANY] — Connection type: [HOW THEY KNOW THEM]
- Target 2: [PERSON/COMPANY] — Connection type: [HOW THEY KNOW THEM]
- Target 3: [PERSON/COMPANY] — Connection type: [HOW THEY KNOW THEM]

3. REFERRAL ASK SCRIPT
Personalized script for asking this specific customer:

"[PERSONALIZED REFERRAL ASK]"

4. INCENTIVE CONSIDERATION
- What would motivate this person to refer?
- Monetary vs. social vs. reciprocal
- How to frame the ask

5. FOLLOW-UP SEQUENCE
- If they say yes: [NEXT STEPS]
- If they say "let me think": [FOLLOW-UP]
- If they decline: [HOW TO PRESERVE RELATIONSHIP]

6. REFERRAL QUALITY PREDICTION
- How strong would their referral be?
- Would targets take their call?
- What would they likely say about us?

7. ALTERNATIVE APPROACHES
If direct referral won't work:
- LinkedIn introduction request
- Case study participation
- Reference call availability
- Social proof (quote, testimonial)
```

---

### 4. ICP Evolution

**Command:** `/gtm-skills icp-evolve`

**When to use:** Quarterly ICP review, new market evaluation, GTM strategy.

```
Evolve our ICP based on actual deal data:

CURRENT ICP ASSUMPTIONS:
- Company size: [EMPLOYEES / REVENUE]
- Industry: [VERTICALS]
- Geography: [REGIONS]
- Tech stack: [REQUIRED TECHNOLOGIES]
- Buying triggers: [WHAT WE THINK CAUSES THEM TO BUY]
- Key personas: [WHO WE TARGET]

CLOSED-WON DATA:
[For each won deal in last 6-12 months]
- Company: [NAME]
- Size: [EMPLOYEES]
- Industry: [VERTICAL]
- Deal size: [AMOUNT]
- Sales cycle: [LENGTH]
- Entry point: [HOW WE GOT IN]
- Champion: [TITLE]
- Trigger: [WHAT CAUSED THEM TO BUY]

CLOSED-LOST DATA:
[For each lost deal]
- Company: [NAME]
- Size: [EMPLOYEES]
- Industry: [VERTICAL]
- Deal size: [AMOUNT]
- Stage lost: [WHERE IT DIED]
- Reason: [WHY WE LOST]

ANALYSIS:

1. PATTERN RECOGNITION
- What patterns exist in closed-won that don't exist in closed-lost?
- What unexpected segments are we winning?
- What segments do we lose more than win?

2. ICP REFINEMENT
Based on evidence, our ICP should be:
- Company size: [REFINED]
- Industry: [REFINED, with sub-verticals]
- Geography: [REFINED]
- Required characteristics: [NEW CRITERIA]
- Disqualification criteria: [WHO TO AVOID]

3. HIDDEN SEGMENTS
- Segments we're winning that we're not actively targeting
- Adjacent markets showing buying behavior
- Characteristics we didn't know mattered

4. ANTI-PERSONAS
- Who should we stop targeting?
- What looks good on paper but doesn't convert?
- What characteristics predict failure?

5. TRIGGER EVENTS
- What actually causes our best customers to buy?
- What signals predict a win?
- What should we prioritize in outbound targeting?

6. RECOMMENDED ACTIONS
- ICP changes to implement
- Targeting criteria to add/remove
- Segments to test
```

---

### 7. Objection Patterns

**Command:** `/gtm-skills objection-patterns`

**When to use:** Monthly review, sales enablement, product feedback.

```
Analyze objection patterns across our deals:

OBJECTION LOG:
[For each objection received in last 30-90 days]
- Deal: [COMPANY]
- Stage: [WHEN IT CAME UP]
- Objection: [EXACT WORDS]
- Outcome: [OVERCAME / LOST DEAL / PENDING]
- Response used: [HOW REP HANDLED IT]

Or paste raw data from CRM/notes.

ANALYSIS:

1. OBJECTION FREQUENCY
- Rank objections by frequency
- Map to sales stage (when do they occur?)
- Identify clustering (do certain objections travel together?)

2. ROOT CAUSE ANALYSIS
For each top objection:
- Is this a real concern or a symptom of something else?
- What's happening upstream that causes this?
- Is this a sales problem, product problem, or market problem?

3. UPSTREAM PREVENTION
- What could we do earlier to prevent this objection?
- What questions should we ask before this comes up?
- What should we address proactively?

4. RESPONSE EFFECTIVENESS
- Which responses to this objection work?
- Which responses fail?
- What's the win rate after each response approach?

5. SYSTEMIC FIXES
- Sales process changes to prevent objections
- Messaging changes to address concerns earlier
- Product/pricing feedback for leadership

6. ENABLEMENT GAPS
- What are reps not equipped to handle?
- What training or materials are needed?
- What's the skill gap vs. the resource gap?

7. COMPETITIVE IMPLICATIONS
- Which objections are competitor-driven?
- What are competitors saying about us?
- How do we need to adjust positioning?
```

---

### 6. Expansion Radar

**Command:** `/gtm-skills expand`

**When to use:** Quarterly customer review, upsell planning, retention risk.

```
Analyze expansion opportunities for this customer:

CUSTOMER PROFILE:
- Company: [NAME]
- Current plan: [WHAT THEY PAY FOR]
- Contract value: [AMOUNT]
- Contract end: [DATE]
- Main user/champion: [NAME, TITLE]
- Executive sponsor: [NAME, TITLE]
- Usage level: [HIGH/MEDIUM/LOW]
- Health score: [IF KNOWN]

CURRENT SIGNALS:
- Recent company news: [FUNDING, HIRING, PRODUCT LAUNCHES]
- Relevant job postings: [ROLES THAT INDICATE GROWTH]
- Usage changes: [ANY NOTABLE PATTERNS]
- Support tickets: [THEMES OR VOLUME CHANGES]
- Feature requests: [WHAT THEY'VE ASKED FOR]
- Stakeholder changes: [NEW PEOPLE, DEPARTURES]

OUR EXPANSION OPTIONS:
- Upsell to: [HIGHER TIER/PLAN]
- Cross-sell: [OTHER PRODUCTS]
- Add seats: [MORE USERS]
- Add features: [PREMIUM CAPABILITIES]

ANALYSIS:

1. EXPANSION READINESS SCORE (1-10)
- Score each expansion vector
- Identify the highest-probability opportunity
- Estimate timing for each

2. BUYING TRIGGERS
- What events would trigger expansion?
- What internal milestones matter?
- What external pressures create urgency?

3. STAKEHOLDER MAP FOR EXPANSION
- Who would champion this?
- Who controls expansion budget?
- Who might resist and why?

4. RISK ASSESSMENT
- Is this customer at churn risk?
- What would we need to address first?
- Is expansion the right conversation or retention?

5. RECOMMENDED APPROACH
- What to lead with
- Who to engage
- When to engage
- What to avoid

6. TALKING POINTS
- Value delivered so far (quantified)
- Natural next step in their journey
- ROI of expansion
- Cost of not expanding
```

---

### 5. Timing Predictor

**Command:** `/gtm-skills when`

**When to use:** Account prioritization, outreach timing, forecasting.

```
Predict purchase timing for [COMPANY]:

KNOWN INFORMATION:

Fiscal/Budget Signals:
- Fiscal year end: [MONTH]
- Budget cycle: [WHEN DO THEY PLAN?]
- Recent budget news: [CUTS, INCREASES, FREEZES]

Organizational Signals:
- Recent leadership changes: [WHO, WHEN]
- Strategic initiatives announced: [WHAT]
- Reorg or restructuring: [DETAILS]

Competitive Signals:
- Current vendor: [WHO]
- Contract renewal timing: [IF KNOWN]
- Pain with current solution: [EVIDENCE]

Project Signals:
- Related initiatives underway: [WHAT]
- Implementation timelines: [KNOWN DEADLINES]
- Dependencies on our solution: [WHAT'S BLOCKED]

External Signals:
- Regulatory deadlines: [IF APPLICABLE]
- Market pressures: [WHAT'S HAPPENING IN THEIR INDUSTRY]
- Competitive pressures: [WHAT PEERS ARE DOING]

PREDICTION:

1. DECISION WINDOW
- Earliest likely decision: [DATE] — Why: [REASONING]
- Most likely decision: [DATE] — Why: [REASONING]
- Latest likely decision: [DATE] — Why: [REASONING]

2. TRIGGER EVENTS
What will cause them to act:
- Trigger 1: [EVENT] — Timing: [WHEN]
- Trigger 2: [EVENT] — Timing: [WHEN]
- Trigger 3: [EVENT] — Timing: [WHEN]

3. URGENCY ACCELERATORS
What could move timing earlier:
- Accelerator 1: [WHAT COULD HAPPEN]
- Accelerator 2: [WHAT COULD HAPPEN]

4. DELAY FACTORS
What could push timing later:
- Delay 1: [RISK]
- Delay 2: [RISK]

5. OPTIMAL OUTREACH TIMING
- When to first engage: [DATE/TIMEFRAME]
- What message at that time: [ANGLE]
- When to follow up: [CADENCE]

6. SIGNALS TO MONITOR
- What to watch for that indicates timing shift
- How to stay informed
- When to re-assess this prediction
```

---

### 8. Competitor War Room

**Command:** `/gtm-skills warroom [competitor]`

**When to use:** Active competitive deal, battlecard creation, positioning work.

```
Enter war room mode for competing against [COMPETITOR]:

DEAL CONTEXT:
- Prospect: [COMPANY]
- What they said about competitor: [EXACT QUOTES OR PARAPHRASES]
- What they're comparing: [FEATURES, PRICING, ETC]
- Where competitor is strong in their view: [STATED STRENGTHS]
- Where they have concerns: [STATED CONCERNS]

COMPETITIVE INTELLIGENCE:
- Competitor's typical positioning: [HOW THEY SELL]
- Their recent wins: [WHO THEY'VE CLOSED]
- Their recent losses: [WHO THEY'VE LOST]
- Their pricing: [IF KNOWN]
- Their weaknesses: [KNOWN GAPS]

WAR ROOM OUTPUT:

1. WHAT COMPETITOR IS LIKELY SAYING ABOUT US
- Their narrative against us
- How they're positioning our weaknesses
- What FUD they're spreading

2. REFRAME THEIR STRENGTHS
For each stated competitor strength:
- Strength: [WHAT PROSPECT SAID]
- Reframe: [HOW TO POSITION THIS DIFFERENTLY]
- Evidence: [PROOF POINTS]

3. EXPLOIT THEIR WEAKNESSES
- Weakness 1: [GAP] — How to surface it: [QUESTION TO ASK]
- Weakness 2: [GAP] — How to surface it: [QUESTION TO ASK]
- Weakness 3: [GAP] — How to surface it: [QUESTION TO ASK]

4. TRAP QUESTIONS
Questions that make competitor look bad:
- Question 1: [ASK THIS] — They can't answer well because: [WHY]
- Question 2: [ASK THIS] — They can't answer well because: [WHY]

5. LANDMINES TO AVOID
- Topics where competitor wins
- Claims we shouldn't make
- Comparisons that hurt us

6. WINNING NARRATIVE
- Our 30-second positioning against this competitor
- The one thing that wins this deal
- How to close if they're leaning toward competitor

7. REFERENCE PLAY
- Customer who switched from competitor to us
- What they'd say if prospect called them
- How to offer this reference
```

---

### 9. Pricing Intelligence

**Command:** `/gtm-skills price`

**When to use:** Quote preparation, negotiation, deal review.

```
Optimize pricing for this deal:

DEAL CONTEXT:
- Company: [NAME]
- Size: [EMPLOYEES / REVENUE]
- Industry: [VERTICAL]
- Use case: [WHAT THEY'LL USE IT FOR]
- Volume/scope: [SEATS, USAGE, ETC]
- Competition: [WHO ELSE THEY'RE CONSIDERING]
- Budget signals: [WHAT WE KNOW ABOUT THEIR BUDGET]
- Urgency: [HOW QUICKLY DO THEY NEED TO DECIDE]
- Champion's influence: [STRONG / WEAK]

OUR PRICING:
- List price: [STANDARD PRICING]
- Proposed price: [WHAT WE'RE THINKING]
- Discount from list: [PERCENTAGE]
- Term: [LENGTH OF CONTRACT]

COMPARABLE DEALS (if available):
[List similar deals you've closed with size, industry, price]

ANALYSIS:

1. PRICING BENCHMARKS
- What similar deals closed at
- Price range for this profile
- Where this deal falls in the range

2. VALUE PERCEPTION
- How much value does this customer perceive?
- What's their willingness to pay?
- What would premium positioning look like?

3. COMPETITIVE PRICING PRESSURE
- What is competitor likely quoting?
- How should we position against their price?
- When to compete on price vs. value

4. DISCOUNT ANALYSIS
- Is the proposed discount appropriate?
- What are we leaving on the table?
- What would we lose by holding firm?

5. NEGOTIATION STRATEGY
- Opening position: [PRICE + TERMS]
- Walk-away point: [MINIMUM ACCEPTABLE]
- Concessions to offer (in order): [WHAT WE CAN GIVE]
- What to ask for in return: [IF WE DISCOUNT, THEY GIVE US X]

6. DEAL STRUCTURE OPTIONS
- Option A: [STRUCTURE] — Pros/cons
- Option B: [STRUCTURE] — Pros/cons
- Option C: [STRUCTURE] — Pros/cons

7. RECOMMENDATION
- Recommended price: [SPECIFIC NUMBER]
- Recommended structure: [TERMS]
- Expected outcome: [PROBABILITY OF CLOSE]
- Rationale: [WHY THIS IS OPTIMAL]
```

---

### 10. Deal Debrief

**Command:** `/gtm-skills debrief`

**When to use:** After closing a deal (won or lost) to extract lessons and improve win rate.

```
Conduct a deal debrief on this recently closed opportunity:

DEAL CONTEXT:
- Company: [COMPANY]
- Contact: [PERSON], [TITLE]
- Deal size: [AMOUNT]
- Sales cycle: [START DATE] to [CLOSE DATE]
- Outcome: [WON / LOST TO COMPETITOR / NO DECISION]
- If lost, stated reason: [WHAT THEY TOLD YOU]

EVIDENCE:
[Paste email threads, call notes, proposal, any communications]

ANALYZE:

1. TIMELINE RECONSTRUCTION
- Map key touchpoints with dates
- Identify momentum shifts (positive and negative)
- Mark the turning point (when the outcome became clear)

2. WHAT WORKED
- Which messages resonated?
- Which proof points landed?
- What moved them forward?

3. WHAT DIDN'T WORK
- Where did we struggle?
- What objections weren't fully resolved?
- What could we have done differently?

4. BUYING CRITERIA ANALYSIS
- What criteria did they evaluate on?
- How did we rank on each criterion?
- What criteria did we miss?

5. STAKEHOLDER MAPPING
- Who influenced the decision?
- Who did we miss engaging?
- What were each stakeholder's priorities?

6. COMPETITIVE DYNAMICS
- Who else were they considering?
- How did we differentiate?
- What did competitors do well (or poorly)?

7. KEY LESSONS
- What specifically should we replicate?
- What should we avoid next time?
- What process changes would improve outcomes?

8. APPLY TO ACTIVE DEALS
- Which current deals have similar patterns?
- What can we do differently right now?
- What early warning signs should we watch for?

Focus on actionable insights that improve future deals.
```

---

## How to Use These Skills

1. **Copy the relevant skill prompt**
2. **Fill in your specific context** (the more detail, the better output)
3. **Paste into Claude** (Claude.ai, Claude Code, or API)
4. **Iterate** — Ask follow-up questions, request alternatives

## Tips for Best Results

- **Be specific**: Vague inputs = vague outputs
- **Include evidence**: Paste actual emails, transcripts, deal data
- **Ask for alternatives**: "Give me 3 different approaches"
- **Challenge the output**: "What am I missing?" "What could go wrong?"

---

## More Resources

- [Basic GTM Skills](/gtm-skills) — Research, outreach, content, objections
- [Free Tools](https://prospeda.com/free-tools) — Use prompts in your browser
- [Prospeda](https://prospeda.com) — AI-powered lead research with human review

---

**Questions?** Open an issue or reach out at hello@prospeda.com.
