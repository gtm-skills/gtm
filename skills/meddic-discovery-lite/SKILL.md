---
name: meddic-discovery-lite
description: Run or review discovery with MEDDIC — question bank per element and a quick scorecard. Use when the user is preparing discovery questions, reviewing call notes, or asking how qualified a deal is. Not for full MEDDPICC with Paper process and Competition, or CRM write-back (see MEDDPICC Qualifier).
version: 1.0.0
license: MIT
source: https://gtm-skills.com/skills/meddic-discovery-lite
---

# MEDDIC Discovery Lite

MEDDIC is six questions about whether a deal is real. This skill turns it into something you can run before a call (which questions to ask) and after (how qualified are we, and what is missing).

## The six elements

| Letter | Element | The question it answers |
|---|---|---|
| M | Metrics | What measurable result does the buyer expect, and have they said the number? |
| E | Economic Buyer | Who can say yes with budget they control, and have we spoken to them? |
| D | Decision Criteria | What will they judge vendors on, in their words? |
| D | Decision Process | What steps, who, and by when? |
| I | Identify Pain | What breaks today, what does it cost, and who feels it? |
| C | Champion | Who inside wants this to happen, has influence, and will sell for us when we are not in the room? |

## Question bank

Ask these as a conversation, not a checklist. Two or three per element is enough for a first call.

**Metrics**
- If this works, what number changes, and from what to what?
- How are you measuring that today?
- What would make this a clear win in six months?

**Economic Buyer**
- Who signs off on spend like this?
- Have they been part of the conversation yet?
- What do they care about that is different from what you care about?

**Decision Criteria**
- When you compare options, what matters most?
- Is there anything that would rule a vendor out immediately?
- Who else gets a vote on the criteria?

**Decision Process**
- Walk me through what happens between "we like it" and "it is live".
- Who needs to be involved — security, legal, procurement, IT?
- What is the date this needs to be working by, and what happens if it slips?

**Identify Pain**
- What is happening today that made you take this call?
- What does that cost you — time, money, people, missed targets?
- Who feels it most? What have you tried?

**Champion**
- Who inside is pushing for this?
- What do they gain personally if it ships?
- Would they introduce us to the economic buyer?

## Scorecard

Score each element 0–2 from the call notes.

- **0** — Not discussed or unknown.
- **1** — Discussed, but vague, assumed, or second-hand.
- **2** — Confirmed by the buyer in their own words, specific.

Total out of 12.

- **10–12**: Qualified. Move to proposal. Protect the champion.
- **6–9**: Real but gappy. Next call must close the 0s and 1s.
- **0–5**: Not a deal yet. Decide whether to invest another call.

Any **0 on Economic Buyer or Identify Pain** overrides the total: the deal is not qualified regardless of the sum.

## Process

**Before a call:** Ask what the user already knows for each element. Return the three to five questions that target the biggest gaps, in the order they would come up naturally.

**After a call:** Take the notes or transcript. For each element, quote or paraphrase the evidence, assign 0/1/2, and name the gap. Return the scorecard, the total, the verdict, and the three questions for the next call.

## Output format (after a call)

```
MEDDIC — <Account> — <date>

M  Metrics            [0/1/2]  <evidence or gap>
E  Economic Buyer     [0/1/2]  <evidence or gap>
D  Decision Criteria  [0/1/2]  <evidence or gap>
D  Decision Process   [0/1/2]  <evidence or gap>
I  Identify Pain      [0/1/2]  <evidence or gap>
C  Champion           [0/1/2]  <evidence or gap>

Total: <n>/12 — <verdict>
Next call: 1) … 2) … 3) …
```

The Pro version — MEDDPICC Qualifier — adds Paper process and Competition, sixty more questions, red-flag detection and a CRM field map. https://gtm-skills.com/skills/meddpicc-qualifier
