/**
 * Methodology payloads the plugin tools hand to the model. ChatGPT does the
 * reasoning; these keep it on the rails our skills define. Free tier = what is
 * in the MIT skills. Premium adds the playbook references (fetched per user).
 */

export const PREP_FRAMEWORK = {
  name: 'Call Prep Brief',
  steps: [
    'State what is known about the account and the person in two lines. Flag anything that is a guess.',
    'Name the one timing signal that makes this call relevant now (hire, launch, funding, exec change, pricing change, review trend). If none is known, say so and ask.',
    'Write three hypotheses about the pain this persona likely owns, each in one sentence, each falsifiable on the call.',
    'Write five discovery questions that test those hypotheses, ordered the way they would come up in conversation. Favor open questions that produce a number or a story.',
    'List the two objections most likely to surface and a one-line reframe for each.',
    'Define the single outcome that makes this call a success (a next step, a name, a number).',
  ],
  personaPains: {
    sdr_manager: ['pipeline per rep', 'ramp time', 'reply rates'],
    vp_sales: ['forecast accuracy', 'win rate', 'cycle length', 'rep productivity'],
    revops: ['data hygiene', 'tool sprawl', 'attribution', 'forecast method'],
    founder: ['first customers', 'pricing', 'time spent selling', 'hiring the first rep'],
    cfo: ['cash', 'forecast variance', 'cost per lead', 'tooling spend'],
    vp_cs: ['churn', 'onboarding time', 'expansion', 'NPS'],
    vp_eng: ['velocity', 'reliability', 'security review load', 'hiring'],
  },
  rules: [
    'Never invent facts about a real company. Mark unknowns as unknowns.',
    'Hypotheses are about their problem, not our product.',
    'Questions should be answerable with a number or a story, not yes/no.',
  ],
};

export const DEBRIEF_RUBRIC = {
  name: 'MEDDIC Debrief',
  elements: [
    { key: 'M', name: 'Metrics', question: 'What measurable result does the buyer expect, and have they said the number?' },
    { key: 'E', name: 'Economic Buyer', question: 'Who can say yes with budget they control, and have we spoken to them?' },
    { key: 'D1', name: 'Decision Criteria', question: 'What will they judge vendors on, in their words?' },
    { key: 'D2', name: 'Decision Process', question: 'What steps, who, and by when?' },
    { key: 'I', name: 'Identify Pain', question: 'What breaks today, what does it cost, who feels it?' },
    { key: 'C', name: 'Champion', question: 'Who inside wants this, has influence, and will sell for us when we are not there?' },
  ],
  scoring: {
    0: 'Not discussed or unknown.',
    1: 'Discussed but vague, assumed, or second-hand.',
    2: 'Confirmed by the buyer in their own words, specific.',
  },
  verdicts: [
    { min: 10, label: 'Qualified', advice: 'Move to proposal. Protect the champion.' },
    { min: 6, label: 'Real but gappy', advice: 'Next call must close the 0s and 1s.' },
    { min: 0, label: 'Not a deal yet', advice: 'Decide whether to invest another call.' },
  ],
  overrides: ['A 0 on Economic Buyer or Identify Pain means not qualified regardless of total.'],
  premiumNote: 'MEDDPICC Qualifier (AE Kit / Pro) adds Paper process, Competition, 60+ questions, red flags and a CRM field map.',
};

export const FOLLOWUP_FRAMEWORK = {
  name: 'Follow-up + Mutual Action Plan',
  email: [
    'Subject: what we agreed, in four words or fewer.',
    'Line 1: thank them in six words or fewer, then stop.',
    'Lines 2–4: what you heard — their words, their numbers. This is where trust is built.',
    'Line 5: the one next step, with a date and an owner.',
    'Line 6: a question that confirms the date. Nothing else.',
    'Under 120 words. No attachments on the first follow-up unless they asked.',
  ],
  mapColumns: ['Step', 'Owner (them / us)', 'Date', 'Done?'],
  mapRules: [
    'Start from their go-live date and work backwards.',
    'Every step has one owner. "Both" is not an owner.',
    'Include their internal steps (security review, legal, procurement), not just ours.',
    'The next step is always within five business days.',
  ],
  premiumNote: 'Closer Pro (AE Kit / Pro) adds the full close plan: stakeholder gaps, risk by stage, negotiation guardrails and a procurement playbook.',
};

export const OBJECTION_LIBRARY: Record<string, { reframe: string; proofPrompt: string; question: string }> = {
  'no budget': {
    reframe: 'Budget is a priority statement. The question is whether this problem ranks.',
    proofPrompt: 'Quantify the cost of the problem in their numbers from discovery.',
    question: 'If the cost of leaving this alone is roughly X per quarter, where does that sit against what is funded?',
  },
  'not a priority': {
    reframe: 'Agree. Then find out what is, and whether this blocks it.',
    proofPrompt: 'Connect to the initiative they did name.',
    question: 'What is the priority this quarter — and does the problem we discussed slow it down?',
  },
  'send me information': {
    reframe: 'A polite no, or a real request. Find out which with one question.',
    proofPrompt: 'Offer one specific asset tied to what they said.',
    question: 'Happy to. Which part would be most useful to see — the X or the Y?',
  },
  'we use a competitor': {
    reframe: 'Good — they have budget and a defined problem. Ask what they would change.',
    proofPrompt: 'Do not disparage. Ask about the gap.',
    question: 'What would you change about it if you could?',
  },
  'too expensive': {
    reframe: 'Price is only too high relative to value they have not yet quantified.',
    proofPrompt: 'Return to the metric from discovery.',
    question: 'Compared to what — the current cost of the problem, or another option you are weighing?',
  },
  'bad timing': {
    reframe: 'Timing objections hide a missing event. Find the event.',
    proofPrompt: 'Anchor to their calendar, not yours.',
    question: 'What needs to happen first — and when does that land?',
  },
  'need to talk to my team': {
    reframe: 'Multi-threading opportunity, not a stall.',
    proofPrompt: 'Offer to join or to arm them.',
    question: 'Who needs to weigh in, and what will they want to know that we have not covered?',
  },
  'we can build it ourselves': {
    reframe: 'They can. The question is whether they should, and when it would be done.',
    proofPrompt: 'Ask about the opportunity cost of the engineers.',
    question: 'What would the team that builds it otherwise ship this quarter?',
  },
};

export function matchObjection(text: string) {
  const t = text.toLowerCase();
  const keys = Object.keys(OBJECTION_LIBRARY);
  const hit =
    keys.find((k) => t.includes(k)) ??
    (t.match(/budget|money|afford/) ? 'no budget'
      : t.match(/priorit/) ? 'not a priority'
      : t.match(/info|deck|email me|send/) ? 'send me information'
      : t.match(/already use|competitor|using [a-z]+/) ? 'we use a competitor'
      : t.match(/expensive|price|cost/) ? 'too expensive'
      : t.match(/timing|later|next quarter|not now|busy/) ? 'bad timing'
      : t.match(/team|boss|manager|discuss internally/) ? 'need to talk to my team'
      : t.match(/build|in-house|ourselves/) ? 'we can build it ourselves'
      : null);
  return hit ? { key: hit, ...OBJECTION_LIBRARY[hit] } : null;
}

/** Daily free caps per anonymous or free-account user. */
export const FREE_CAPS: Record<string, number> = {
  'call.prep': 3,
  'call.debrief': 3,
  'followup.draft': 3,
  'objection.handle': 10,
};
