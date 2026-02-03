/**
 * GTM Command Center - Telegram Bot
 *
 * Control your Agentic SDR Army from Telegram:
 * - SCOUT: Research prospects 24/7
 * - WRITER: Personalized outreach at scale
 * - CALLER: Voice notes in your voice
 * - CLOSER: Payment links and proposals
 */

import { Telegraf, Context } from 'telegraf';
import { message } from 'telegraf/filters';
import dotenv from 'dotenv';

import { ScoutAgent } from './agents/scout.js';
import { WriterAgent } from './agents/writer.js';
import { CallerAgent } from './agents/caller.js';
import { CloserAgent } from './agents/closer.js';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

// Initialize agents
const scout = new ScoutAgent();
const writer = new WriterAgent();
const caller = new CallerAgent();
const closer = new CloserAgent();

// Authorized users only
const AUTHORIZED_USERS = process.env.AUTHORIZED_TELEGRAM_IDS?.split(',').map(Number) || [];

function isAuthorized(ctx: Context): boolean {
  const userId = ctx.from?.id;
  if (!userId) return false;
  if (AUTHORIZED_USERS.length === 0) return true; // No restrictions if not configured
  return AUTHORIZED_USERS.includes(userId);
}

// Middleware to check authorization
bot.use(async (ctx, next) => {
  if (!isAuthorized(ctx)) {
    await ctx.reply('Unauthorized. Contact admin for access.');
    return;
  }
  return next();
});

// =============================================================================
// UNIVERSAL COMMANDS
// =============================================================================

bot.command('start', async (ctx) => {
  await ctx.reply(`
Welcome to GTM Command Center

Your Agentic SDR Army is ready:

SCOUT (Research)
/scout - Today's top prospects
/scout acme.com - Research company
/scout "series B saas" - Find prospects

WRITER (Outreach)
/write - Today's outreach queue
/write sarah@acme.com - Draft email
/sequence john@beta.io - Start sequence
/replies - Pending replies

CALLER (Voice)
/call - Warm call list
/call sarah - Voice note for Sarah
/voicemail john - Drop voicemail

CLOSER (Revenue)
/close - Deals ready to close
/invoice sarah $500 - Payment link
/pipeline - Current pipeline

STATUS
/status - All agent activity
/today - Today's summary
/help - All commands
`);
});

bot.command('status', async (ctx) => {
  await ctx.reply('Checking all agents...');

  const [scoutStatus, writerStatus, callerStatus, closerStatus] = await Promise.all([
    scout.getStatus(),
    writer.getStatus(),
    caller.getStatus(),
    closer.getStatus(),
  ]);

  await ctx.reply(`
AGENT STATUS

SCOUT (Research)
${scoutStatus}

WRITER (Outreach)
${writerStatus}

CALLER (Voice)
${callerStatus}

CLOSER (Revenue)
${closerStatus}
`);
});

bot.command('today', async (ctx) => {
  await ctx.reply('Generating daily briefing...');

  // Get summaries from all agents
  const briefing = await generateDailyBriefing();
  await ctx.reply(briefing);
});

bot.command('help', async (ctx) => {
  await ctx.reply(`
GTM COMMAND CENTER - FULL COMMAND LIST

SCOUT (Research Agent)
/scout                    Top 10 new prospects
/scout [domain]           Deep research on company
/scout "[criteria]"       Find matching prospects
/scout signals            Today's buying signals
/scout enrich [email]     Get full profile

WRITER (Outreach Agent)
/write                    Today's outreach queue
/write [email]            Draft email
/write [email] --blunt    Draft with tonality
/sequence [email]         Start email sequence
/followup                 Due follow-ups
/replies                  Pending replies
/reply [id]               Respond to thread

CALLER (Voice Agent)
/call                     Warm call list
/call [name]              Voice note for person
/call [name] --live       Live AI call
/voicemail [name]         Drop voicemail
/callbacks                People who called back

CLOSER (Payment Agent)
/close                    Deals ready to close
/invoice [email] $[amt]   Send payment link
/proposal [company]       Generate proposal
/stalled                  Stalled deals
/won / /lost              Log deal outcome

STATUS
/status                   All agent activity
/today                    Daily briefing
/pipeline                 Pipeline value
/metrics                  Performance metrics
`);
});

// =============================================================================
// SCOUT COMMANDS
// =============================================================================

bot.command('scout', async (ctx) => {
  const args = ctx.message.text.replace('/scout', '').trim();

  if (!args) {
    // Show top prospects
    await ctx.reply('Finding top prospects...');
    const prospects = await scout.getTopProspects();
    await ctx.reply(prospects);
    return;
  }

  if (args === 'signals') {
    await ctx.reply('Checking buying signals...');
    const signals = await scout.getBuyingSignals();
    await ctx.reply(signals);
    return;
  }

  if (args.startsWith('enrich ')) {
    const email = args.replace('enrich ', '').trim();
    await ctx.reply(`Enriching ${email}...`);
    const profile = await scout.enrichContact(email);
    await ctx.reply(profile);
    return;
  }

  if (args.startsWith('"') || args.includes('.')) {
    // Search query or domain
    await ctx.reply(`Researching: ${args}...`);
    const research = await scout.research(args);
    await ctx.reply(research);
    return;
  }

  await ctx.reply(`Unknown scout command. Try /help`);
});

// =============================================================================
// WRITER COMMANDS
// =============================================================================

bot.command('write', async (ctx) => {
  const args = ctx.message.text.replace('/write', '').trim();

  if (!args) {
    await ctx.reply('Loading outreach queue...');
    const queue = await writer.getOutreachQueue();
    await ctx.reply(queue);
    return;
  }

  // Parse email and optional tonality
  const parts = args.split(' --');
  const email = parts[0].trim();
  const tonality = parts[1]?.trim() || 'direct';

  await ctx.reply(`Drafting email to ${email} (${tonality} tonality)...`);
  const draft = await writer.draftEmail(email, tonality);
  await ctx.reply(draft);

  // Add quick action buttons
  await ctx.reply('Actions:', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Send', callback_data: `send_${email}` },
          { text: 'Edit', callback_data: `edit_${email}` },
          { text: 'Regenerate', callback_data: `regen_${email}` },
        ],
      ],
    },
  });
});

bot.command('sequence', async (ctx) => {
  const email = ctx.message.text.replace('/sequence', '').trim();

  if (!email) {
    await ctx.reply('Usage: /sequence [email]');
    return;
  }

  await ctx.reply(`Starting sequence for ${email}...`);
  const result = await writer.startSequence(email);
  await ctx.reply(result);
});

bot.command('followup', async (ctx) => {
  await ctx.reply('Loading follow-ups due today...');
  const followups = await writer.getDueFollowups();
  await ctx.reply(followups);
});

bot.command('replies', async (ctx) => {
  await ctx.reply('Loading pending replies...');
  const replies = await writer.getPendingReplies();
  await ctx.reply(replies);
});

bot.command('reply', async (ctx) => {
  const args = ctx.message.text.replace('/reply', '').trim();

  if (!args) {
    await ctx.reply('Usage: /reply [thread_id] or /reply [thread_id] --book');
    return;
  }

  const parts = args.split(' --');
  const threadId = parts[0].trim();
  const action = parts[1]?.trim();

  await ctx.reply(`Drafting reply for thread ${threadId}...`);
  const reply = await writer.draftReply(threadId, action);
  await ctx.reply(reply);
});

// =============================================================================
// CALLER COMMANDS
// =============================================================================

bot.command('call', async (ctx) => {
  const args = ctx.message.text.replace('/call', '').trim();

  if (!args) {
    await ctx.reply('Loading warm call list...');
    const warmList = await caller.getWarmList();
    await ctx.reply(warmList);
    return;
  }

  const parts = args.split(' --');
  const name = parts[0].trim();
  const mode = parts[1]?.trim();

  if (mode === 'live') {
    await ctx.reply(`Initiating live call to ${name}...`);
    const result = await caller.initiateLiveCall(name);
    await ctx.reply(result);
  } else {
    await ctx.reply(`Generating voice note for ${name}...`);
    const voiceNote = await caller.generateVoiceNote(name);

    // Send audio file if available
    if (voiceNote.audioUrl) {
      await ctx.replyWithAudio({ url: voiceNote.audioUrl });
    }
    await ctx.reply(voiceNote.message);
  }
});

bot.command('voicemail', async (ctx) => {
  const name = ctx.message.text.replace('/voicemail', '').trim();

  if (!name) {
    await ctx.reply('Usage: /voicemail [name]');
    return;
  }

  await ctx.reply(`Dropping voicemail for ${name}...`);
  const result = await caller.dropVoicemail(name);
  await ctx.reply(result);
});

bot.command('callbacks', async (ctx) => {
  await ctx.reply('Loading callbacks...');
  const callbacks = await caller.getCallbacks();
  await ctx.reply(callbacks);
});

// =============================================================================
// CLOSER COMMANDS
// =============================================================================

bot.command('close', async (ctx) => {
  await ctx.reply('Loading deals ready to close...');
  const deals = await closer.getReadyDeals();
  await ctx.reply(deals);
});

bot.command('invoice', async (ctx) => {
  const args = ctx.message.text.replace('/invoice', '').trim();
  const match = args.match(/^(\S+)\s+\$?(\d+)/);

  if (!match) {
    await ctx.reply('Usage: /invoice [email] $[amount]');
    return;
  }

  const [, email, amount] = match;
  await ctx.reply(`Generating payment link for ${email} ($${amount}/mo)...`);
  const result = await closer.generatePaymentLink(email, parseInt(amount));
  await ctx.reply(result);
});

bot.command('proposal', async (ctx) => {
  const company = ctx.message.text.replace('/proposal', '').trim();

  if (!company) {
    await ctx.reply('Usage: /proposal [company]');
    return;
  }

  await ctx.reply(`Generating proposal for ${company}...`);
  const result = await closer.generateProposal(company);
  await ctx.reply(result);
});

bot.command('stalled', async (ctx) => {
  await ctx.reply('Loading stalled deals...');
  const stalled = await closer.getStalledDeals();
  await ctx.reply(stalled);
});

bot.command('pipeline', async (ctx) => {
  await ctx.reply('Calculating pipeline...');
  const pipeline = await closer.getPipelineValue();
  await ctx.reply(pipeline);
});

bot.command('won', async (ctx) => {
  const args = ctx.message.text.replace('/won', '').trim();
  await ctx.reply(`Logging won deal: ${args || 'no details'}...`);
  const result = await closer.logWon(args);
  await ctx.reply(result);
});

bot.command('lost', async (ctx) => {
  const args = ctx.message.text.replace('/lost', '').trim();
  await ctx.reply(`Logging lost deal: ${args || 'no details'}...`);
  const result = await closer.logLost(args);
  await ctx.reply(result);
});

// =============================================================================
// CALLBACK HANDLERS (for inline buttons)
// =============================================================================

bot.action(/^send_(.+)$/, async (ctx) => {
  const email = ctx.match[1];
  await ctx.answerCbQuery('Sending...');
  const result = await writer.sendEmail(email);
  await ctx.reply(result);
});

bot.action(/^edit_(.+)$/, async (ctx) => {
  const email = ctx.match[1];
  await ctx.answerCbQuery();
  await ctx.reply(`Reply with your edited version for ${email}:`);
  // Next message will be captured and used as the edit
});

bot.action(/^regen_(.+)$/, async (ctx) => {
  const email = ctx.match[1];
  await ctx.answerCbQuery('Regenerating...');
  const draft = await writer.draftEmail(email, 'direct');
  await ctx.reply(draft);
});

// =============================================================================
// NATURAL LANGUAGE HANDLING
// =============================================================================

bot.on(message('text'), async (ctx) => {
  const text = ctx.message.text;

  // Skip if it's a command
  if (text.startsWith('/')) return;

  // Use Claude to understand intent and route to appropriate agent
  await ctx.reply('Processing...');
  const result = await routeNaturalLanguage(text);
  await ctx.reply(result);
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

async function generateDailyBriefing(): Promise<string> {
  const [scoutBrief, writerBrief, callerBrief, closerBrief] = await Promise.all([
    scout.getDailyBrief(),
    writer.getDailyBrief(),
    caller.getDailyBrief(),
    closer.getDailyBrief(),
  ]);

  return `
DAILY BRIEFING

SCOUT (Research)
${scoutBrief}

WRITER (Outreach)
${writerBrief}

CALLER (Voice)
${callerBrief}

CLOSER (Revenue)
${closerBrief}

Quick actions below
`;
}

async function routeNaturalLanguage(text: string): Promise<string> {
  // TODO: Use Claude to parse intent and route
  // For now, return help
  return `I understand natural language too! Try:
- "research acme corp"
- "write an email to sarah"
- "call john"
- "send invoice to lisa for $500"

Or use commands like /scout, /write, /call, /invoice`;
}

// =============================================================================
// SCHEDULED TASKS
// =============================================================================

// Daily briefing at 8am
// TODO: Implement with node-cron or external scheduler

// =============================================================================
// START BOT
// =============================================================================

bot.launch().then(() => {
  console.log('GTM Command Center is running');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
