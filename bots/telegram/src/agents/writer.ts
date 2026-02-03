/**
 * WRITER Agent - Outreach & Follow-ups
 *
 * Mission: Personalized outreach at scale. Never miss a follow-up.
 *
 * Capabilities:
 * - Hyper-personalized cold emails
 * - Multi-touch sequences
 * - Follow-up automation
 * - Reply handling
 */

import Anthropic from '@anthropic-ai/sdk';
import { HubspotClient } from '../integrations/hubspot.js';
import { GmailClient } from '../integrations/gmail.js';

const anthropic = new Anthropic();

// Tonality prompts
const TONALITIES: Record<string, string> = {
  direct: 'Write in a direct, no-fluff style. Get to the point quickly. No pleasantries or filler.',
  blunt:
    'Write in an extremely blunt, short style. Shortest possible message that still conveys value.',
  challenger:
    'Write in a Challenger Sale style. Push back on assumptions. Teach something new. Be provocative.',
  exec: 'Write for C-suite executives. Extreme brevity. Focus on business outcomes and numbers.',
  friendly:
    'Write with warmth and personality. Be personable but still professional and value-focused.',
  hormozi:
    'Write like Alex Hormozi. Value-stacking, outcome-focused, confident but not arrogant.',
  voss: 'Write like Chris Voss. Use tactical empathy, labeling, and calibrated questions.',
};

interface EmailDraft {
  subject: string;
  body: string;
  to: string;
  status: 'draft' | 'sent' | 'scheduled';
}

interface Reply {
  id: string;
  from: string;
  subject: string;
  body: string;
  sentiment: 'positive' | 'objection' | 'not_now' | 'unsubscribe';
  receivedAt: Date;
}

export class WriterAgent {
  private hubspot: HubspotClient;
  private gmail: GmailClient;
  private drafts: Map<string, EmailDraft> = new Map();
  private pendingReplies: Reply[] = [];

  constructor() {
    this.hubspot = new HubspotClient();
    this.gmail = new GmailClient();
  }

  async getStatus(): Promise<string> {
    return `Drafts ready: ${this.drafts.size}
Sequences active: 12
Follow-ups due today: 8
Pending replies: ${this.pendingReplies.length}`;
  }

  async getDailyBrief(): Promise<string> {
    return `Sent 47 emails yesterday
3 new replies (2 positive, 1 objection)
8 follow-ups due today
Top reply: John @ Beta wants to book`;
  }

  async getOutreachQueue(): Promise<string> {
    // In production: Pull from HubSpot sequence queue
    return `
OUTREACH QUEUE

Ready to send (need approval):

1. Sarah Chen | sarah@acme.com
   Subject: SDR ramp time
   Status: Draft ready
   /write sarah@acme.com

2. John Park | john@beta.io
   Subject: Quick question for new revenue leaders
   Status: Draft ready
   /write john@beta.io

3. Lisa Wang | lisa@gamma.tech
   Subject: Saw you evaluated [competitor]
   Status: Draft ready
   /write lisa@gamma.tech

Sequences in progress:

4. Mike Torres | mike@delta.io
   Touch 3 of 5 | Scheduled for tomorrow

5. Emma Davis | emma@echo.com
   Touch 2 of 5 | Sending in 2 hours

/sequence [email] - Start new sequence
/followup - View all due follow-ups
`;
  }

  async draftEmail(email: string, tonality: string = 'direct'): Promise<string> {
    // Get contact info from HubSpot or cache
    let contactInfo = '';
    try {
      const contact = await this.hubspot.getContactByEmail(email);
      if (contact) {
        const props = contact.properties as Record<string, string>;
        contactInfo = `
Name: ${props.firstname} ${props.lastname}
Title: ${props.jobtitle}
Company: ${props.company}
Notes: ${props.notes_last_updated || 'None'}`;
      }
    } catch (error) {
      console.log('Could not fetch contact from HubSpot');
    }

    // If no contact info, extract from email
    if (!contactInfo) {
      const domain = email.split('@')[1];
      contactInfo = `Company domain: ${domain}`;
    }

    const tonalityPrompt = TONALITIES[tonality] || TONALITIES.direct;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Write a cold email to this prospect:

${contactInfo}
Email: ${email}

Tonality: ${tonalityPrompt}

Requirements:
- Subject line under 50 characters
- Body under 100 words
- One clear ask (15 min call)
- Include a specific observation about them
- End with calendar link placeholder [calendly]

Format:
Subject: [subject]

[body]`,
        },
      ],
    });

    const draft = response.content[0].type === 'text' ? response.content[0].text : '';

    // Cache the draft
    const lines = draft.split('\n');
    const subjectLine = lines.find((l) => l.startsWith('Subject:'));
    const subject = subjectLine?.replace('Subject:', '').trim() || 'Quick question';
    const body = lines
      .filter((l) => !l.startsWith('Subject:'))
      .join('\n')
      .trim();

    this.drafts.set(email, {
      subject,
      body,
      to: email,
      status: 'draft',
    });

    return `
EMAIL DRAFT

To: ${email}
${draft}

Tonality: ${tonality}
/write ${email} --blunt (try different tonality)
`;
  }

  async sendEmail(email: string): Promise<string> {
    const draft = this.drafts.get(email);

    if (!draft) {
      return `No draft found for ${email}. Use /write ${email} first.`;
    }

    try {
      await this.gmail.send({
        to: email,
        subject: draft.subject,
        body: draft.body,
      });

      // Log to HubSpot
      await this.hubspot.logEmail({
        email,
        subject: draft.subject,
        body: draft.body,
      });

      draft.status = 'sent';

      return `Sent to ${email}

Subject: ${draft.subject}

Logged to HubSpot. Follow-up scheduled for 3 days.`;
    } catch (error) {
      return `Failed to send: ${error}

Draft saved. Try again or check Gmail connection.`;
    }
  }

  async startSequence(email: string): Promise<string> {
    // Generate 5-touch sequence
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Create a 5-email cold outreach sequence for: ${email}

Requirements:
- Email 1: Initial outreach with value prop
- Email 2: Different angle, add social proof (Day 3)
- Email 3: Share relevant content/insight (Day 7)
- Email 4: Brief follow-up, create urgency (Day 10)
- Email 5: Breakup email (Day 14)

Each email should be under 75 words.
Each subject line under 40 characters.
Direct, no-fluff tonality.

Format each as:
[Email X - Day Y]
Subject: ...
Body: ...`,
        },
      ],
    });

    const sequence = response.content[0].type === 'text' ? response.content[0].text : '';

    return `
SEQUENCE CREATED: ${email}

${sequence}

Sequence scheduled:
- Email 1: Sending now
- Email 2: Day 3
- Email 3: Day 7
- Email 4: Day 10
- Email 5: Day 14

/sequence ${email} --pause to pause
/sequence ${email} --cancel to cancel
`;
  }

  async getDueFollowups(): Promise<string> {
    // In production: Pull from HubSpot tasks/sequences
    return `
FOLLOW-UPS DUE TODAY

1. Mike Torres | mike@delta.io
   Last touch: 3 days ago (opened 2x, no reply)
   Suggested: Follow-up with case study
   /reply mike

2. Emma Davis | emma@echo.com
   Last touch: 7 days ago (no opens)
   Suggested: Try different subject line
   /write emma@echo.com --blunt

3. Alex Kim | alex@foxtrot.co
   Last touch: 5 days ago (clicked link)
   Suggested: Reference the click, push for call
   /reply alex

Overdue (needs attention):

4. Chris Lee | chris@golf.com
   Last touch: 14 days ago
   Status: Sequence complete, no reply
   Action: Move to nurture or close
   /lost chris "no response"
`;
  }

  async getPendingReplies(): Promise<string> {
    // In production: Pull from Gmail inbox
    return `
PENDING REPLIES

POSITIVE (action needed):

1. John Park | john@beta.io
   "Let's do it. What times work next week?"
   Action: Book meeting
   /reply 1 --book

2. Sarah Chen | sarah@acme.com
   "Interesting. Can you send more info?"
   Action: Send case study, keep pushing
   /reply 2 --info

OBJECTION (draft response):

3. Lisa Wang | lisa@gamma.tech
   "We're locked into a contract until Q3"
   Suggested response ready
   /reply 3

NOT NOW (nurture):

4. Mike Torres | mike@delta.io
   "Reach out in 6 months"
   Action: Add to nurture, set reminder
   /reply 4 --nurture

UNSUBSCRIBE (remove):

5. random@spam.com
   "Remove me from your list"
   /unsubscribe 5
`;
  }

  async draftReply(threadId: string, action?: string): Promise<string> {
    // Get thread context (in production: from Gmail)
    const thread = this.getThreadContext(threadId);

    let prompt = `Draft a reply to this email thread:

Last message from prospect:
${thread.lastMessage}

`;

    if (action === 'book') {
      prompt += `Goal: Book a meeting. Be direct, suggest 2-3 specific times.`;
    } else if (action === 'info') {
      prompt += `Goal: Send additional info while pushing for a call. Don't let them off the hook.`;
    } else if (action === 'nurture') {
      prompt += `Goal: Acknowledge timing, set expectation for future follow-up. Keep door open.`;
    } else {
      prompt += `Goal: Handle the objection and keep conversation moving toward a meeting.`;
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = response.content[0].type === 'text' ? response.content[0].text : '';

    return `
DRAFT REPLY

Thread: ${thread.subject}
To: ${thread.from}

${reply}

Actions:
[Send] [Edit] [Regenerate]
`;
  }

  private getThreadContext(threadId: string): {
    from: string;
    subject: string;
    lastMessage: string;
  } {
    // Demo data - in production, fetch from Gmail
    const threads: Record<
      string,
      {
        from: string;
        subject: string;
        lastMessage: string;
      }
    > = {
      '1': {
        from: 'john@beta.io',
        subject: 'Re: Quick question',
        lastMessage: "Let's do it. What times work next week?",
      },
      '2': {
        from: 'sarah@acme.com',
        subject: 'Re: SDR ramp time',
        lastMessage: 'Interesting. Can you send more info?',
      },
      '3': {
        from: 'lisa@gamma.tech',
        subject: 'Re: Saw you evaluated [competitor]',
        lastMessage: "We're locked into a contract until Q3",
      },
    };

    return (
      threads[threadId] || {
        from: 'unknown@example.com',
        subject: 'Re: Outreach',
        lastMessage: 'No context available',
      }
    );
  }
}
