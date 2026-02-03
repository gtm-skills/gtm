/**
 * ElevenLabs Integration
 *
 * Voice cloning and text-to-speech for personalized voice notes.
 */

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

export class ElevenLabsClient {
  private apiKey: string | null;
  private voiceId: string | null;

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY || null;
    this.voiceId = process.env.ELEVENLABS_VOICE_ID || null;
  }

  async textToSpeech(text: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('ElevenLabs not configured. Add ELEVENLABS_API_KEY to environment.');
    }

    if (!this.voiceId) {
      throw new Error('Voice ID not configured. Add ELEVENLABS_VOICE_ID to environment.');
    }

    const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${this.voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    // Get audio as buffer
    const audioBuffer = await response.arrayBuffer();

    // In production: Upload to S3/CloudStorage and return URL
    // For now: Return base64 data URL
    const base64 = Buffer.from(audioBuffer).toString('base64');
    return `data:audio/mpeg;base64,${base64}`;
  }

  async getVoices(): Promise<Array<{ voice_id: string; name: string }>> {
    if (!this.apiKey) {
      throw new Error('ElevenLabs not configured');
    }

    const response = await fetch(`${ELEVENLABS_API_URL}/voices`, {
      headers: {
        'xi-api-key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch voices');
    }

    const data = await response.json();
    return data.voices || [];
  }

  async cloneVoice(name: string, audioFiles: Buffer[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('ElevenLabs not configured');
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', 'GTM Command Center voice clone');

    audioFiles.forEach((file, index) => {
      formData.append('files', new Blob([file]), `sample_${index}.mp3`);
    });

    const response = await fetch(`${ELEVENLABS_API_URL}/voices/add`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to clone voice');
    }

    const data = await response.json();
    return data.voice_id;
  }
}
