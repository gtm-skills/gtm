/**
 * Vapi Integration
 *
 * AI-powered voice calls for autonomous cold calling.
 */

const VAPI_API_URL = 'https://api.vapi.ai';

export class VapiClient {
  private apiKey: string | null;
  private assistantId: string | null;

  constructor() {
    this.apiKey = process.env.VAPI_API_KEY || null;
    this.assistantId = process.env.VAPI_ASSISTANT_ID || null;
  }

  async initiateCall(params: { to: string; script: string }): Promise<{ id: string; status: string }> {
    if (!this.apiKey) {
      throw new Error('Vapi not configured. Add VAPI_API_KEY to environment.');
    }

    const response = await fetch(`${VAPI_API_URL}/call/phone`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: this.assistantId,
        phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
        customer: {
          number: params.to,
        },
        // Override assistant prompt with custom script
        assistantOverrides: {
          firstMessage: params.script.split('\n')[0],
          instructions: params.script,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Vapi API error: ${error}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      status: data.status,
    };
  }

  async getCallStatus(callId: string): Promise<{
    status: string;
    duration: number;
    transcript: string;
    outcome: string;
  }> {
    if (!this.apiKey) {
      throw new Error('Vapi not configured');
    }

    const response = await fetch(`${VAPI_API_URL}/call/${callId}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get call status');
    }

    const data = await response.json();
    return {
      status: data.status,
      duration: data.duration || 0,
      transcript: data.transcript || '',
      outcome: this.extractOutcome(data),
    };
  }

  async endCall(callId: string): Promise<void> {
    if (!this.apiKey) {
      throw new Error('Vapi not configured');
    }

    await fetch(`${VAPI_API_URL}/call/${callId}/stop`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async createAssistant(config: {
    name: string;
    firstMessage: string;
    instructions: string;
    voiceId: string;
  }): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Vapi not configured');
    }

    const response = await fetch(`${VAPI_API_URL}/assistant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: config.name,
        firstMessage: config.firstMessage,
        context: config.instructions,
        voice: {
          provider: 'elevenlabs',
          voiceId: config.voiceId,
        },
        model: {
          provider: 'anthropic',
          model: 'claude-3-sonnet-20240229',
        },
        // Sales-optimized settings
        endCallMessage: "Thanks for your time. I'll send over the details we discussed.",
        endCallPhrases: [
          'not interested',
          'remove me',
          'stop calling',
          "don't call again",
          'goodbye',
        ],
        silenceTimeoutSeconds: 10,
        maxDurationSeconds: 300, // 5 min max
        backgroundSound: 'office',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create assistant: ${error}`);
    }

    const data = await response.json();
    return data.id;
  }

  private extractOutcome(callData: {
    transcript?: string;
    endedReason?: string;
  }): string {
    const transcript = callData.transcript?.toLowerCase() || '';

    // Check for meeting booked
    if (
      transcript.includes('calendar invite') ||
      transcript.includes('scheduled') ||
      transcript.includes("let's do")
    ) {
      return 'meeting_booked';
    }

    // Check for follow-up requested
    if (
      transcript.includes('send me info') ||
      transcript.includes('email me') ||
      transcript.includes('call back')
    ) {
      return 'follow_up';
    }

    // Check for rejection
    if (
      transcript.includes('not interested') ||
      transcript.includes('no thanks') ||
      callData.endedReason === 'customer-ended-call'
    ) {
      return 'not_interested';
    }

    return 'unknown';
  }
}
