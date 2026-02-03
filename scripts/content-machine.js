#!/usr/bin/env node

/**
 * Content Machine — Weekly viral content analysis and rewrite system
 *
 * Usage:
 *   node scripts/content-machine.js --hunt        Show search prompts for finding winners
 *   node scripts/content-machine.js --list        List collected posts from SWIPE_FILE.md
 *   node scripts/content-machine.js --analyze     Extract patterns from collected posts
 *   node scripts/content-machine.js --templatize  Generate reusable templates
 *   node scripts/content-machine.js --rewrite     Rewrite with agentic BDR angle
 *   node scripts/content-machine.js --full        Run full pipeline (analyze → templatize → rewrite)
 */

const fs = require('fs');
const path = require('path');

const SWIPE_FILE = path.join(__dirname, '..', 'SWIPE_FILE.md');
const DISTRIBUTION_FILE = path.join(__dirname, '..', 'DISTRIBUTION.md');

// Our voice/angle for rewrites
const OUR_ANGLE = {
  persona: 'hardcore GTM operator who has closed millions in deals',
  tone: 'raw, confident, no corporate speak',
  frame: 'openclaw is my bdr bitch boy — does all the annoying parts of GTM 24/7',
  keyThemes: [
    'speed to lead is everything',
    'agentic BDRs that never sleep',
    'AI that messages you first',
    'persistent memory across conversations',
    'voice cloning for cold calls',
    'multi-channel (telegram, whatsapp, slack)',
    'human approves, AI executes',
  ],
  style: [
    'short punchy paragraphs',
    'em dashes for emphasis',
    'rhetorical questions',
    'specific numbers and results',
    'contrarian framing',
  ],
  // Platform-specific punctuation rules
  platformStyle: {
    twitter: 'lowercase sentence starts. no caps. raw typing energy.',
    linkedin: 'Proper punctuation. Sentence caps. Polished but human.',
  },
  // Word choice: avoid generic "AI"
  wordChoice: {
    avoid: ['AI', 'AI agent', 'AI tool', 'AI automation'],
    useInstead: ['LLM', 'Claude', 'GPT', 'agentic', 'agentic BDR', 'agentic GTM', 'Claude-powered'],
    reason: '"AI" is vague and overused. Precision signals expertise.',
  },
};

// Search prompts for manual hunting
const SEARCH_PROMPTS = {
  twitter: {
    'High-Engagement GTM/Sales': [
      '(sales OR "cold email" OR "outbound" OR SDR OR BDR OR AE) min_faves:500 -filter:replies lang:en',
      '("AI sales" OR "AI SDR" OR "agentic" OR "sales automation") min_faves:200 -filter:replies lang:en',
      '("speed to lead" OR "response time" OR "first to respond") min_faves:100 lang:en',
    ],
    'Viral AI/Automation': [
      '(Claude OR ChatGPT OR "AI agent" OR openclaw OR clawdbot) min_faves:1000 -filter:replies lang:en',
      '("built with AI" OR "AI workflow" OR "automated" OR "replaced") min_faves:500 lang:en',
    ],
    'Story Bangers': [
      '("I quit" OR "I stopped" OR "I fired" OR "changed everything") (sales OR business OR startup) min_faves:500 lang:en',
      '("here\'s what happened" OR "the result" OR "30 days later") min_faves:300 lang:en',
    ],
    'Thread Hunters': [
      '(🧵 OR "thread" OR "a story") (sales OR AI OR startup) min_faves:300 lang:en',
    ],
  },
  linkedin: {
    'Search Phrases (filter by Posts)': [
      '"I automated"',
      '"I replaced"',
      '"Here\'s what I learned"',
      '"The truth about"',
      '"Stop doing this"',
      '"I closed $"',
      '"AI changed"',
      '"My sales team"',
    ],
    'Hashtags to Follow': [
      '#sales #salestips #b2bsales #coldcalling',
      '#AIinsales #salesautomation #revops',
      '#SDR #BDR #accountexecutive',
    ],
  },
  reddit: {
    'Subreddits (Top > This Week)': [
      'r/sales',
      'r/salesdevelopment',
      'r/startups',
      'r/Entrepreneur',
      'r/ChatGPT',
      'r/SaaS',
    ],
    'Google Search': [
      'site:reddit.com/r/sales "AI" OR "automated" OR "ChatGPT"',
    ],
  },
};

// Accounts to stalk
const ACCOUNTS_TO_FOLLOW = {
  'GTM/Sales Leaders': [
    '@jaboris - sales tactics',
    '@SamNelsonSDR - SDR strategies',
    '@armand_farrokh - 30MPC, deal execution',
    '@NickCegelski - 30MPC, cold calling',
    '@ColinCadmus - sales leadership',
    '@alexhormozi - hooks master',
    '@SahilBloom - storytelling structure',
    '@dickiebush - writing frameworks',
  ],
  'AI/Tech Builders': [
    '@levelsio - indie hacker',
    '@swyx - AI engineering',
    '@karpathy - AI research',
  ],
  'LinkedIn Voices': [
    'John Barrows - sales training',
    'Morgan Ingram - SDR/content',
    'Josh Braun - sales messaging',
    'Chris Walker - demand gen',
  ],
};

// Analysis prompt for extracting patterns
const ANALYSIS_PROMPT = `
You are a viral content analyst. Analyze these winning posts and extract:

## For Each Post:

1. **Hook Analysis**
   - First line/sentence
   - Hook type: [story / contrarian / result / question / pattern-interrupt]
   - Why it stops the scroll

2. **Structure Breakdown**
   - Opening (hook)
   - Build-up (context/problem)
   - Payload (insight/transformation)
   - Proof (results/specifics)
   - Close (CTA/punchline)

3. **Engagement Triggers**
   - Emotional appeal
   - Curiosity gaps
   - Social proof elements
   - Controversy/contrarian takes

4. **Copywriting Techniques**
   - Sentence rhythm (short/long patterns)
   - Power words used
   - Formatting tricks (line breaks, lists, etc.)
   - Voice/tone markers

## Overall Patterns:

After analyzing all posts, identify:
- Common hook patterns that work
- Story structures that drive engagement
- Formatting patterns (length, line breaks, etc.)
- Topics/angles with highest engagement

---

POSTS TO ANALYZE:

{{POSTS}}
`;

// Template generation prompt
const TEMPLATE_PROMPT = `
Based on these winning content patterns, create reusable templates.

## Requirements:

For each template:
1. Name it (e.g., "The Contrarian Flip", "The Result Stack", "The Quiet Quit")
2. Provide the fill-in-the-blank structure
3. Note when to use it
4. Give one example filled in

## Template Format:

### [TEMPLATE NAME]

**Hook Pattern:**
\`\`\`
[First line with {{VARIABLE}} placeholders]
\`\`\`

**Structure:**
\`\`\`
1. Hook: {{CONTRARIAN_STATEMENT}}
2. Old way: {{WHAT_EVERYONE_DOES}}
3. Breaking point: {{WHAT_MADE_YOU_CHANGE}}
4. New way: {{YOUR_APPROACH}}
5. Results: {{SPECIFIC_OUTCOMES}}
6. CTA: {{SOFT_ASK}}
\`\`\`

**Best for:** [use case]

**Example:**
\`\`\`
[Filled in example]
\`\`\`

---

Create 5-7 templates from these patterns:

{{PATTERNS}}
`;

// Rewrite prompt with our angle
const REWRITE_PROMPT = `
You are a ghostwriter for a hardcore GTM operator. Rewrite these templates/posts with our specific angle.

## CRITICAL: Adapt, Don't Copy

Extract the MECHANICS from winning posts, not the WORDS.

**Steal:** Hook structure, engagement mechanics, rhythm, proof elements
**Change:** Actual phrases, story/context, examples, specific voice

Formula: THEIR FORMAT + OUR ANGLE + OUR EXAMPLES = Original post

If the original and your rewrite could be put side-by-side and someone says "copied" — you didn't adapt enough.

## Our Voice & Angle:

**Persona:** ${OUR_ANGLE.persona}

**Tone:** ${OUR_ANGLE.tone}

**Core Frame:** ${OUR_ANGLE.frame}

**Key Themes to Weave In:**
${OUR_ANGLE.keyThemes.map(t => `- ${t}`).join('\n')}

**Style Rules:**
${OUR_ANGLE.style.map(s => `- ${s}`).join('\n')}

## Examples of Our Voice:

"openclaw is my bdr bitch boy. i'm not being cute. that's what he is."

"telegram ping at 2 AM: 'found a VP of Sales at a series B fintech. they just posted a job for 3 SDRs. budget is moving. here's the angle.' i wake up, glance at my phone, approve the outreach. go back to sleep. by 9 AM the meeting's booked."

"when he cold calls a prospect? he does it in my voice. when he leaves a linkedin voice message? my voice. not some robot. MY voice."

## Task:

Take each template and create a ready-to-post piece about agentic BDRs/openclaw.

Requirements:
- Apply our voice exactly
- Include specific examples/scenarios
- Reference our tools: openclaw, gtm-skills.com
- Make it feel like someone typing fast, thinking out loud
- End with soft CTA to gtm-skills.com/free-tools/openclaw

---

TEMPLATES TO REWRITE:

{{TEMPLATES}}
`;

function showHunt() {
  console.log('\n' + '='.repeat(60));
  console.log('  CONTENT HUNTING — Search Prompts & Targets');
  console.log('='.repeat(60) + '\n');

  console.log('TWITTER/X ADVANCED SEARCH');
  console.log('Go to: twitter.com/search-advanced\n');

  for (const [category, queries] of Object.entries(SEARCH_PROMPTS.twitter)) {
    console.log(`  ${category}:`);
    queries.forEach(q => console.log(`    ${q}`));
    console.log();
  }

  console.log('\nLINKEDIN SEARCH');
  for (const [category, items] of Object.entries(SEARCH_PROMPTS.linkedin)) {
    console.log(`  ${category}:`);
    items.forEach(i => console.log(`    ${i}`));
    console.log();
  }

  console.log('\nREDDIT HUNTING');
  for (const [category, items] of Object.entries(SEARCH_PROMPTS.reddit)) {
    console.log(`  ${category}:`);
    items.forEach(i => console.log(`    ${i}`));
    console.log();
  }

  console.log('\n' + '-'.repeat(60));
  console.log('  ACCOUNTS TO STALK');
  console.log('-'.repeat(60) + '\n');

  for (const [category, accounts] of Object.entries(ACCOUNTS_TO_FOLLOW)) {
    console.log(`  ${category}:`);
    accounts.forEach(a => console.log(`    ${a}`));
    console.log();
  }

  console.log('\n' + '-'.repeat(60));
  console.log('  QUICK COPY-PASTE SEARCHES');
  console.log('-'.repeat(60) + '\n');

  console.log('  Best all-around Twitter search (paste directly):');
  console.log('  (sales OR SDR OR "cold email") min_faves:500 -filter:replies\n');

  console.log('  AI + Sales combo:');
  console.log('  ("AI sales" OR "AI SDR" OR "automated outbound") min_faves:200\n');

  console.log('  Story format winners:');
  console.log('  ("I quit" OR "I stopped" OR "changed everything") min_faves:500\n');

  console.log('\nAfter finding posts, add them to SWIPE_FILE.md');
  console.log('Then run: node scripts/content-machine.js --analyze\n');
}

function listPosts() {
  if (!fs.existsSync(SWIPE_FILE)) {
    console.log('\nNo SWIPE_FILE.md found. Creating template...');
    console.log('Add posts to SWIPE_FILE.md first, then run --analyze\n');
    return;
  }

  const content = fs.readFileSync(SWIPE_FILE, 'utf8');

  // Extract posts between ``` blocks in "This Week's Collected Posts" section
  const weekSection = content.split('## This Week\'s Collected Posts')[1];
  if (!weekSection) {
    console.log('\nNo posts collected this week yet.');
    console.log('Use --hunt to find winning posts, then add them to SWIPE_FILE.md\n');
    return;
  }

  const posts = weekSection.match(/#### (TWITTER|LINKEDIN|REDDIT) #\d+[\s\S]*?(?=####|## Archive|## Extracted|$)/g);

  if (!posts || posts.length === 0) {
    console.log('\nNo posts found in this week\'s section.');
    console.log('Add posts using the template format in SWIPE_FILE.md\n');
    return;
  }

  console.log('\n' + '='.repeat(60));
  console.log('  COLLECTED POSTS THIS WEEK');
  console.log('='.repeat(60) + '\n');

  posts.forEach((post, i) => {
    const titleMatch = post.match(/#### (TWITTER|LINKEDIN|REDDIT) #(\d+)/);
    const authorMatch = post.match(/\*\*Author:\*\* (.+)/);
    const engagementMatch = post.match(/\*\*Engagement:\*\* (.+)/);
    const hookTypeMatch = post.match(/\*\*Hook Type:\*\* (.+)/);
    const scoreMatch = post.match(/\*\*Score:\*\* (.+)/);

    if (titleMatch) {
      console.log(`  ${i + 1}. ${titleMatch[1]} #${titleMatch[2]}`);
      if (authorMatch) console.log(`     Author: ${authorMatch[1]}`);
      if (engagementMatch) console.log(`     Engagement: ${engagementMatch[1]}`);
      if (hookTypeMatch) console.log(`     Hook Type: ${hookTypeMatch[1]}`);
      if (scoreMatch) console.log(`     Score: ${scoreMatch[1]}`);
      console.log();
    }
  });

  console.log('Run --analyze to extract patterns from these posts\n');
}

function showAnalyzePrompt() {
  if (!fs.existsSync(SWIPE_FILE)) {
    console.log('\nNo SWIPE_FILE.md found. Add posts first.\n');
    return;
  }

  const content = fs.readFileSync(SWIPE_FILE, 'utf8');

  // Extract just the post content
  const weekSection = content.split('## This Week\'s Collected Posts')[1];
  if (!weekSection) {
    console.log('\nNo posts to analyze. Add posts to SWIPE_FILE.md first.\n');
    return;
  }

  // Get content between ``` blocks
  const postContents = weekSection.match(/```[\s\S]*?```/g);

  if (!postContents || postContents.length === 0) {
    console.log('\nNo post content found. Make sure posts are in ``` blocks.\n');
    return;
  }

  const postsText = postContents.map((p, i) => `--- POST ${i + 1} ---\n${p.replace(/```/g, '')}`).join('\n\n');

  const prompt = ANALYSIS_PROMPT.replace('{{POSTS}}', postsText);

  console.log('\n' + '='.repeat(60));
  console.log('  ANALYSIS PROMPT — Copy to Claude/ChatGPT');
  console.log('='.repeat(60) + '\n');
  console.log(prompt);
  console.log('\n' + '='.repeat(60));
  console.log('\nCopy the prompt above and paste into Claude or ChatGPT.');
  console.log('Then paste the analysis results back into SWIPE_FILE.md under "Extracted Templates"\n');
}

function showTemplatizePrompt() {
  console.log('\n' + '='.repeat(60));
  console.log('  TEMPLATIZE PROMPT — Copy to Claude/ChatGPT');
  console.log('='.repeat(60) + '\n');

  console.log('First, run --analyze and paste the results.');
  console.log('Then use this prompt with those patterns:\n');
  console.log('-'.repeat(60) + '\n');
  console.log(TEMPLATE_PROMPT.replace('{{PATTERNS}}', '[PASTE YOUR ANALYSIS RESULTS HERE]'));
  console.log('\n' + '='.repeat(60) + '\n');
}

function showRewritePrompt() {
  console.log('\n' + '='.repeat(60));
  console.log('  REWRITE PROMPT — Apply Our Agentic BDR Angle');
  console.log('='.repeat(60) + '\n');

  console.log('Use this prompt with your templates to generate ready-to-post content:\n');
  console.log('-'.repeat(60) + '\n');
  console.log(REWRITE_PROMPT.replace('{{TEMPLATES}}', '[PASTE YOUR TEMPLATES HERE]'));
  console.log('\n' + '='.repeat(60) + '\n');
}

function showFull() {
  console.log('\n' + '='.repeat(60));
  console.log('  FULL PIPELINE — Weekly Content Machine');
  console.log('='.repeat(60) + '\n');

  console.log('STEP 1: HUNT (15-20 min)');
  console.log('-'.repeat(40));
  console.log('Run: node scripts/content-machine.js --hunt');
  console.log('Use search prompts to find 5-10 winning posts');
  console.log('Add them to SWIPE_FILE.md with metadata\n');

  console.log('STEP 2: ANALYZE (5 min)');
  console.log('-'.repeat(40));
  console.log('Run: node scripts/content-machine.js --analyze');
  console.log('Copy prompt → Paste to Claude → Get patterns\n');

  console.log('STEP 3: TEMPLATIZE (5 min)');
  console.log('-'.repeat(40));
  console.log('Run: node scripts/content-machine.js --templatize');
  console.log('Copy prompt with patterns → Get templates\n');

  console.log('STEP 4: REWRITE (5 min)');
  console.log('-'.repeat(40));
  console.log('Run: node scripts/content-machine.js --rewrite');
  console.log('Copy prompt with templates → Get ready-to-post drafts\n');

  console.log('STEP 5: DISTRIBUTE');
  console.log('-'.repeat(40));
  console.log('Add best drafts to DISTRIBUTION.md');
  console.log('Run: node scripts/distribute.js --list');
  console.log('Schedule via Buffer GUI\n');

  console.log('='.repeat(60));
  console.log('  Total time: ~30 min for a week of content');
  console.log('='.repeat(60) + '\n');
}

function showOurAngle() {
  console.log('\n' + '='.repeat(60));
  console.log('  OUR ANGLE — Agentic BDR Voice');
  console.log('='.repeat(60) + '\n');

  console.log('PERSONA:');
  console.log(`  ${OUR_ANGLE.persona}\n`);

  console.log('TONE:');
  console.log(`  ${OUR_ANGLE.tone}\n`);

  console.log('CORE FRAME:');
  console.log(`  ${OUR_ANGLE.frame}\n`);

  console.log('KEY THEMES:');
  OUR_ANGLE.keyThemes.forEach(t => console.log(`  - ${t}`));
  console.log();

  console.log('STYLE RULES:');
  OUR_ANGLE.style.forEach(s => console.log(`  - ${s}`));
  console.log();
}

function showHelp() {
  console.log(`
Content Machine — Weekly viral content analysis and rewrite system

Usage:
  node scripts/content-machine.js [command]

Commands:
  --hunt        Show search prompts for finding winning posts
  --list        List collected posts from SWIPE_FILE.md
  --analyze     Show analysis prompt (copy to Claude)
  --templatize  Show template generation prompt
  --rewrite     Show rewrite prompt with our angle
  --full        Show full pipeline walkthrough
  --angle       Show our voice/angle definition
  --help        Show this help

Workflow:
  1. --hunt      → Find winning posts manually
  2. Add to SWIPE_FILE.md
  3. --analyze   → Extract patterns
  4. --templatize → Create templates
  5. --rewrite   → Apply our angle
  6. Add to DISTRIBUTION.md → Schedule
`);
}

// Main
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case '--hunt':
    showHunt();
    break;
  case '--list':
    listPosts();
    break;
  case '--analyze':
    showAnalyzePrompt();
    break;
  case '--templatize':
    showTemplatizePrompt();
    break;
  case '--rewrite':
    showRewritePrompt();
    break;
  case '--full':
    showFull();
    break;
  case '--angle':
    showOurAngle();
    break;
  case '--help':
  default:
    showHelp();
    break;
}
