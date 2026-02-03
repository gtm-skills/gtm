/**
 * CALLER Agent - Voice Outreach
 *
 * Mission: Scale "you" with AI voice. Warm up cold prospects.
 *
 * Capabilities:
 * - Voice notes in your cloned voice
 * - AI-powered live calls
 * - Voicemail drops at scale
 * - Call tracking and callbacks
 */

import Anthropic from '@anthropic-ai/sdk';
import { HubspotClient } from '../integrations/hubspot.js';
import { ElevenLabsClient } from '../integrations/elevenlabs.js';
import { VapiClient } from '../integrations/vapi.js';

const anthropic = new Anthropic();

interface VoiceNote {
  audioUrl: string | null;
  message: string;
  transcript: string;
}

interface CallRecord {
  id: string;
  to: string;
  status: 'completed' | 'voicemail' | 'no_answer' | 'callback';
  duration: number;
  transcript?: string;
  outcome?: 'meeting_booked' | 'follow_up' | 'not_interested';
}

export class CallerAgent {
  private hubspot: HubspotClient;
  private elevenlabs: ElevenLabsClient;
  private vapi: VapiClient;
  private callHistory: CallRecord[] = [];

  constructor() {
    this.hubspot = new HubspotClient();
    this.elevenlabs = new ElevenLabsClient();
    this.vapi = new VapiClient();
  }

  async getStatus(): Promise<string> {
    return `Voice clone: Active
Calls today: 5
Voicemails: 3
Callbacks: 1 (Lisa @ Gamma)`;
  }

  async getDailyBrief(): Promise<string> {
    return `Left 5 voicemails yesterday
1 callback: Lisa @ Gamma (hot!)
3 voice notes sent via LinkedIn
Today's warm list: 8 prospects`;
  }

  async getWarmList(): Promise<string> {
    // Warm = engaged with emails/content
    return `
WARM CALL LIST

Priority (high engagement):

1. Lisa Wang | VP Ops | Gamma Tech
   Opened email 5x, clicked link 2x
   Phone: +1 (555) 123-4567
   /call lisa --live

2. John Park | Head of Revenue | Beta Inc
   Replied positive, hasn't booked
   Phone: +1 (555) 234-5678
   /call john

3. Sarah Chen | VP Sales | Acme Corp
   Opened 3 emails, visited website
   Phone: +1 (555) 345-6789
   /call sarah

Medium (some engagement):

4. Mike Torres | CRO | Delta SaaS
   Opened 1 email
   /call mike

5. Emma Davis | VP Revenue | Echo Labs
   LinkedIn viewed your profile
   /call emma

Voicemail candidates (cold):

6-8. [3 more prospects]
   /voicemail [name] - Drop voicemail

Tips:
- Best times: 8-9am, 4-5pm
- Tuesday-Thursday highest connect rates
`;
  }

  async generateVoiceNote(name: string): Promise<VoiceNote> {
    // Get prospect context
    const context = await this.getProspectContext(name);

    // Generate personalized script
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Write a 20-second voice note script for this prospect:

${context}

Requirements:
- Casual, conversational tone (like leaving a message for a friend)
- Reference something specific about them
- Clear value prop in 1 sentence
- Soft CTA (reply if interested)
- NO "I hope this finds you well" or corporate speak

Format as spoken words only, no stage directions.`,
        },
      ],
    });

    const script = response.content[0].type === 'text' ? response.content[0].text : '';

    // Generate audio with ElevenLabs
    let audioUrl: string | null = null;
    try {
      audioUrl = await this.elevenlabs.textToSpeech(script);
    } catch (error) {
      console.log('ElevenLabs not connected, text-only mode');
    }

    return {
      audioUrl,
      message: `
VOICE NOTE: ${name}

Script:
"${script}"

${audioUrl ? 'Audio generated' : 'Audio not available - ElevenLabs not connected'}

Send via:
- LinkedIn voice message
- WhatsApp voice note
- Email (attach as clip)

Log: /log call ${name} voicenote`,
      transcript: script,
    };
  }

  async initiateLiveCall(name: string): Promise<string> {
    const context = await this.getProspectContext(name);

    // Check if Vapi is configured
    if (!process.env.VAPI_API_KEY) {
      return `
LIVE CALL: ${name}

Vapi not configured. To enable AI calls:
1. Sign up at vapi.ai
2. Add VAPI_API_KEY to environment
3. Configure your voice clone

For now, use manual call with script:

CALL SCRIPT
-----------
Opener:
"Hi ${name.split(' ')[0]}, this is [Your Name] from [Company].
Did I catch you at a bad time?"

If no: Continue to hook
If yes: "When's better? I'll call back."

Hook:
"I'll be brief. I noticed [specific observation].
Is [pain point] something you're dealing with right now?"

Value:
"We helped [similar company] [specific result].
Would 15 minutes be worth it to see if we could help?"

Close:
"Great. I'm looking at [day/time]. Does that work?"

Tips:
- Smile while talking (they can hear it)
- Pause after questions
- Mirror their energy
`;
    }

    // Initiate Vapi call
    try {
      const call = await this.vapi.initiateCall({
        to: context.phone,
        script: await this.generateCallScript(context),
      });

      return `
LIVE CALL INITIATED

Calling: ${name}
Phone: ${context.phone}
Status: Connecting...

You'll receive a notification when:
- Call connects
- Meeting is booked
- Call ends with transcript

To listen live: [link]
To take over: /takeover ${call.id}
`;
    } catch (error) {
      return `Failed to initiate call: ${error}`;
    }
  }

  async dropVoicemail(name: string): Promise<string> {
    const voiceNote = await this.generateVoiceNote(name);

    // In production: Use Twilio to drop voicemail
    return `
VOICEMAIL DROPPED

To: ${name}
Status: Queued for delivery

Message:
"${voiceNote.transcript}"

${voiceNote.audioUrl ? 'Audio file ready' : 'Using TTS fallback'}

Voicemail will be delivered via:
1. Direct dial (leave after beep)
2. Ringless voicemail drop (if available)

Follow-up scheduled: 2 days
`;
  }

  async getCallbacks(): Promise<string> {
    // In production: Pull from call tracking system
    return `
CALLBACKS (Hot Leads!)

1. Lisa Wang | Gamma Tech
   Called back: 2 hours ago
   Voicemail: "Hey, got your message about [topic]..."
   Action: Call back immediately!
   /call lisa --live

2. John Park | Beta Inc
   Texted: "Can we do Thursday instead?"
   Action: Confirm time
   /reply john --book

No callbacks in 24h:
- Mike Torres (voicemail left 3 days ago)
- Emma Davis (voicemail left 5 days ago)

Consider: Email follow-up to voicemails
/write mike
`;
  }

  // ==========================================================================
  // HELPER METHODS
  // ==========================================================================

  private async getProspectContext(name: string): Promise<{
    name: string;
    title: string;
    company: string;
    phone: string;
    signals: string[];
    suggestedAngle: string;
  }> {
    // In production: Pull from HubSpot
    // Demo data for now
    const prospects: Record<
      string,
      {
        name: string;
        title: string;
        company: string;
        phone: string;
        signals: string[];
        suggestedAngle: string;
      }
    > = {
      lisa: {
        name: 'Lisa Wang',
        title: 'VP of Operations',
        company: 'Gamma Tech',
        phone: '+1 (555) 123-4567',
        signals: ['Opened email 5x', 'Clicked pricing link'],
        suggestedAngle: 'High engagement - ready to buy',
      },
      john: {
        name: 'John Park',
        title: 'Head of Revenue',
        company: 'Beta Inc',
        phone: '+1 (555) 234-5678',
        signals: ['New role', 'Replied positive'],
        suggestedAngle: 'New leader quick wins',
      },
      sarah: {
        name: 'Sarah Chen',
        title: 'VP of Sales',
        company: 'Acme Corp',
        phone: '+1 (555) 345-6789',
        signals: ['Hiring 5 SDRs', 'Series B'],
        suggestedAngle: 'SDR ramp time',
      },
      mike: {
        name: 'Mike Torres',
        title: 'CRO',
        company: 'Delta SaaS',
        phone: '+1 (555) 456-7890',
        signals: ['IPO prep'],
        suggestedAngle: 'Enterprise readiness',
      },
      emma: {
        name: 'Emma Davis',
        title: 'VP Revenue',
        company: 'Echo Labs',
        phone: '+1 (555) 567-8901',
        signals: ['Series A', 'First sales hire'],
        suggestedAngle: 'Building sales foundation',
      },
    };

    const key = name.toLowerCase().split(' ')[0];
    return (
      prospects[key] || {
        name: name,
        title: 'Unknown',
        company: 'Unknown',
        phone: 'Not available',
        signals: [],
        suggestedAngle: 'General outreach',
      }
    );
  }

  private async generateCallScript(context: {
    name: string;
    title: string;
    company: string;
    signals: string[];
    suggestedAngle: string;
  }): Promise<string> {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Create a cold call script for an AI voice agent calling:

Name: ${context.name}
Title: ${context.title}
Company: ${context.company}
Signals: ${context.signals.join(', ')}
Angle: ${context.suggestedAngle}

Format as a branching script with:
1. Opener (with bad time check)
2. Hook (reference signal)
3. Discovery question
4. Value statement
5. Close (book meeting)

Include handling for:
- "Not interested"
- "Send me info"
- "Not the right person"
- "Call back later"

Keep responses short and conversational.`,
        },
      ],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }
}
