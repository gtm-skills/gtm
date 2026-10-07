import 'server-only';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PREP_FRAMEWORK, DEBRIEF_RUBRIC, FOLLOWUP_FRAMEWORK, matchObjection } from './frameworks';
import { UI_RESOURCES, UI_MIME } from './ui';
import { resolveIdentity, meter, capMessage, canUseSkill, PLANS_URL, type PluginIdentity } from './auth';
import { getSkill, AGENTS, getKitForSkill, type Agent } from '@/data/skills';
import { getSkillFiles } from '@/lib/skill-content';
import { createAdminClient } from '@/lib/supabase/admin';

const INSTRUCTIONS =
  'GTM Skills: methodology for the sales call loop. Sequence: call.prep before a meeting → call.debrief after (returns a MEDDIC scorecard) → followup.draft (recap email + mutual action plan). ' +
  'Each tool first returns a framework; after you draft with it, call the same tool again with the structured draft to render the card. ' +
  'Never invent facts about real companies; mark unknowns. Do not use these tools for generic marketing copy or CRM record edits.';

const uiMeta = (key: keyof typeof UI_RESOURCES) => ({
  ui: { resourceUri: UI_RESOURCES[key].uri },
  'openai/outputTemplate': UI_RESOURCES[key].uri,
  'openai/toolInvocation/invoking': 'Working…',
  'openai/toolInvocation/invoked': 'Done',
});

const READ_ONLY = { readOnlyHint: true, destructiveHint: false, openWorldHint: false, idempotentHint: true } as const;

const text = (s: string) => ({ type: 'text' as const, text: s });

export async function createPluginServer(req: Request) {
  const id = await resolveIdentity(req);
  const server = new McpServer({ name: 'gtm-skills', version: '1.0.0' }, { instructions: INSTRUCTIONS });

  // --- UI resources -------------------------------------------------------
  for (const r of Object.values(UI_RESOURCES)) {
    server.registerResource(r.title, r.uri, { title: r.title, mimeType: UI_MIME }, async () => ({
      contents: [{ uri: r.uri, mimeType: UI_MIME, text: r.html }],
    }));
  }

  // --- call.prep ----------------------------------------------------------
  const BriefSchema = z.object({
    company: z.string(),
    person: z.string().optional(),
    role: z.string().optional(),
    signal: z.string().optional(),
    hypotheses: z.array(z.string()).min(1).max(5),
    questions: z.array(z.string()).min(1).max(7),
    objections: z.array(z.string()).max(4).optional(),
    goal: z.string().optional(),
  });

  server.registerTool(
    'call.prep',
    {
      title: 'Call prep brief',
      description:
        'Use this when the user is preparing for a sales call, discovery call, demo or meeting with a prospect or customer and wants a brief: hypotheses, questions, likely objections, success criteria. ' +
        'First call without `brief` to get the prep framework and persona pains. Then draft the brief and call again with `brief` filled to render the card. ' +
        'Do not use for writing cold emails, marketing copy, or editing CRM records.',
      inputSchema: {
        company: z.string().describe('Company the call is with, e.g. "Acme Corp"'),
        person: z.string().optional().describe('Name of the person, if known'),
        role: z.string().optional().describe('Their title or persona, e.g. "VP Sales", "RevOps lead"'),
        context: z.string().optional().describe('Anything the user knows: how the meeting came about, prior conversations, signals'),
        meetingGoal: z.string().optional().describe('What the user wants out of the call'),
        brief: BriefSchema.optional().describe('Your completed brief. Provide to render the card.'),
      },
      annotations: READ_ONLY,
      _meta: uiMeta('brief'),
    },
    async (args) => {
      const m = await meter(id, 'call.prep');
      if (!m.allowed) return capped(id, m);

      if (!args.brief) {
        const premium = await premiumRefs(id, 'scout-pro', ['references/signals.md']);
        return {
          content: [text(`Framework loaded. Draft the brief for ${args.company}${args.person ? ` (${args.person})` : ''}, then call call.prep again with \`brief\` to render it.`)],
          structuredContent: {
            mode: 'framework',
            framework: PREP_FRAMEWORK,
            premium: id.allAccess,
            premiumReferences: premium,
            input: { company: args.company, person: args.person, role: args.role, context: args.context, meetingGoal: args.meetingGoal },
          },
        };
      }
      return {
        content: [text(`Brief for ${args.brief.company}: ${args.brief.hypotheses.length} hypotheses, ${args.brief.questions.length} questions.`)],
        structuredContent: { mode: 'render', brief: args.brief, premium: id.allAccess },
      };
    },
  );

  // --- call.debrief -------------------------------------------------------
  const ElementScore = z.object({ key: z.string(), name: z.string(), score: z.number().int().min(0).max(2), evidence: z.string().optional() });
  const ScorecardSchema = z.object({
    account: z.string(),
    framework: z.string().default('MEDDIC'),
    elements: z.array(ElementScore).min(6).max(8),
    total: z.number().int(),
    max: z.number().int().default(12),
    verdict: z.string(),
    advice: z.string().optional(),
    next: z.array(z.string()).max(3).optional(),
  });

  server.registerTool(
    'call.debrief',
    {
      title: 'Call debrief scorecard',
      description:
        'Use this when the user has call notes or a transcript from a sales call and wants to know how qualified the deal is, what was missed, or what to ask next. Scores MEDDIC 0–2 per element. ' +
        'First call with `notes` to get the rubric. Then score and call again with `scorecard` to render it. ' +
        'Do not use for prepping a call that has not happened, or for non-sales meetings.',
      inputSchema: {
        account: z.string().describe('Account or deal name'),
        notes: z.string().optional().describe('Raw call notes or transcript'),
        scorecard: ScorecardSchema.optional().describe('Your completed scorecard. Provide to render the card.'),
      },
      annotations: READ_ONLY,
      _meta: uiMeta('scorecard'),
    },
    async (args) => {
      const m = await meter(id, 'call.debrief');
      if (!m.allowed) return capped(id, m);

      if (!args.scorecard) {
        const premium = await premiumRefs(id, 'meddpicc-qualifier', ['references/red-flags.md', 'references/question-bank.md']);
        return {
          content: [text(`Rubric loaded. Score each element 0–2 from the notes for ${args.account}, then call call.debrief again with \`scorecard\`.`)],
          structuredContent: { mode: 'framework', rubric: DEBRIEF_RUBRIC, premium: id.allAccess, premiumReferences: premium, notesLength: args.notes?.length ?? 0 },
        };
      }
      return {
        content: [text(`${args.scorecard.account}: ${args.scorecard.total}/${args.scorecard.max} — ${args.scorecard.verdict}.`)],
        structuredContent: { mode: 'render', scorecard: args.scorecard, premium: id.allAccess },
      };
    },
  );

  // --- followup.draft -----------------------------------------------------
  const PlanSchema = z.object({
    account: z.string(),
    title: z.string().optional(),
    goLive: z.string().optional(),
    steps: z.array(z.object({ step: z.string(), owner: z.string(), date: z.string() })).min(1).max(8),
    emailSubject: z.string().optional(),
    emailPreview: z.string().optional(),
  });

  server.registerTool(
    'followup.draft',
    {
      title: 'Follow-up and action plan',
      description:
        'Use this after a sales call when the user wants a recap email, next steps, or a mutual action plan for a deal. ' +
        'First call without `plan` to get the email structure and MAP rules. Then draft and call again with `plan` to render it. ' +
        'Do not use for cold outreach to someone the user has not met, or for generic thank-you notes.',
      inputSchema: {
        account: z.string(),
        summary: z.string().optional().describe('What was discussed and agreed'),
        plan: PlanSchema.optional().describe('Your completed action plan and email. Provide to render the card.'),
      },
      annotations: READ_ONLY,
      _meta: uiMeta('plan'),
    },
    async (args) => {
      const m = await meter(id, 'followup.draft');
      if (!m.allowed) return capped(id, m);

      if (!args.plan) {
        const premium = await premiumRefs(id, 'closer-pro', ['references/mutual-action-plan.md']);
        return {
          content: [text(`Framework loaded. Draft the recap email and action plan for ${args.account}, then call followup.draft again with \`plan\`.`)],
          structuredContent: { mode: 'framework', framework: FOLLOWUP_FRAMEWORK, premium: id.allAccess, premiumReferences: premium },
        };
      }
      return {
        content: [text(`Action plan for ${args.plan.account}: ${args.plan.steps.length} steps.`)],
        structuredContent: { mode: 'render', plan: args.plan, premium: id.allAccess },
      };
    },
  );

  // --- objection.handle ---------------------------------------------------
  server.registerTool(
    'objection.handle',
    {
      title: 'Handle a sales objection',
      description:
        'Use this when a prospect has pushed back ("no budget", "not a priority", "send me information", "we use X", "too expensive", "bad timing", "need to talk to my team", "we can build it") and the user wants a reframe and the next question. ' +
        'Do not use for product feature questions or support complaints.',
      inputSchema: {
        objection: z.string().describe('What the prospect said, verbatim if possible'),
        context: z.string().optional().describe('Deal context: what they care about, what was discussed'),
      },
      annotations: READ_ONLY,
    },
    async (args) => {
      const m = await meter(id, 'objection.handle');
      if (!m.allowed) return capped(id, m);
      const hit = matchObjection(args.objection);
      return {
        content: [text(hit ? `Matched "${hit.key}". Reframe: ${hit.reframe}` : 'No library match; apply the general pattern: acknowledge, isolate, reframe to their metric, ask one question.')],
        structuredContent: {
          match: hit,
          pattern: ['Acknowledge in one sentence without agreeing it is final.', 'Isolate: is this the only thing in the way?', 'Reframe to the metric from discovery.', 'Ask one question that moves the deal.'],
          premium: id.allAccess,
        },
      };
    },
  );

  // --- skill.install ------------------------------------------------------
  server.registerTool(
    'skill.install',
    {
      title: 'Get a GTM skill’s files',
      description:
        'Use this when the user asks to install, download, or read a specific GTM Skills skill (for example "scout-pro", "meddpicc-qualifier") for Claude Code, Cursor, Codex, Gemini CLI or OpenClaw. Returns the skill files for skills the user has access to. ' +
        'Do not use to browse or search skills; link to gtm-skills.com/skills for that.',
      inputSchema: {
        slug: z.string().describe('Skill slug, e.g. "scout-pro"'),
        agent: z.enum(['claude-code', 'cursor', 'codex', 'gemini-cli', 'openclaw', 'windsurf', 'claude-desktop']).optional(),
      },
      annotations: READ_ONLY,
    },
    async (args) => {
      const skill = getSkill(args.slug);
      if (!skill) return { content: [text(`No skill named "${args.slug}". Browse https://gtm-skills.com/skills`)], isError: true };
      if (!(await canUseSkill(id, args.slug))) {
        const kit = getKitForSkill(args.slug);
        return {
          content: [text(`${skill.name} is a premium skill in the ${kit?.name ?? 'Full Bundle'}. ${id.userId ? '' : 'Sign in to GTM Skills from the plugin menu if you already own it. '}Plans are described at ${PLANS_URL}.`)],
          structuredContent: { locked: true, slug: args.slug, kit: kit?.id, plansUrl: PLANS_URL },
        };
      }
      try {
        const files = await getSkillFiles(args.slug, { watermarkEmail: id.email ?? undefined });
        const agent: Agent = args.agent ?? 'claude-code';
        const db = createAdminClient();
        if (db) void db.from('skill_installs').insert({ skill_slug: args.slug, user_id: id.userId, method: 'plugin', agent });
        return {
          content: [text(`${skill.name} v${skill.version}: ${files.length} files. Install to ${AGENTS[agent].installDir.replace('<slug>', skill.slug)}.`)],
          structuredContent: { slug: skill.slug, version: skill.version, installTo: AGENTS[agent].installDir.replace('<slug>', skill.slug), files },
        };
      } catch (e) {
        return { content: [text(`Could not load ${skill.name} right now: ${(e as Error).message}`)], isError: true };
      }
    },
  );

  return server;
}

function capped(id: PluginIdentity, m: Awaited<ReturnType<typeof meter>>) {
  return {
    content: [text(capMessage(id, m))],
    structuredContent: { limited: true, used: m.used - 1, cap: m.cap, plansUrl: PLANS_URL, signedIn: Boolean(id.userId) },
  };
}

/** For all-access users, inline the relevant premium reference files so the model can use them. */
async function premiumRefs(id: PluginIdentity, slug: string, wanted: string[]) {
  if (!id.allAccess && !(await canUseSkill(id, slug))) return null;
  try {
    const files = await getSkillFiles(slug);
    return files.filter((f) => wanted.includes(f.path) || f.path === 'SKILL.md').map((f) => ({ path: f.path, content: f.content.slice(0, 12000) }));
  } catch {
    return null;
  }
}
