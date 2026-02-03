/**
 * Gmail Integration
 *
 * Send emails from your Gmail account.
 * Requires OAuth setup - see docs for configuration.
 */

export class GmailClient {
  private accessToken: string | null;

  constructor() {
    this.accessToken = process.env.GMAIL_ACCESS_TOKEN || null;
  }

  async send(email: { to: string; subject: string; body: string }): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Gmail not configured. Add GMAIL_ACCESS_TOKEN to environment.');
    }

    // Create email in RFC 2822 format
    const message = [
      `To: ${email.to}`,
      `Subject: ${email.subject}`,
      'Content-Type: text/plain; charset=utf-8',
      '',
      email.body,
    ].join('\r\n');

    // Base64 encode
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: encodedMessage,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gmail API error: ${error}`);
    }
  }

  async getInbox(maxResults: number = 10): Promise<
    Array<{
      id: string;
      from: string;
      subject: string;
      snippet: string;
    }>
  > {
    if (!this.accessToken) {
      throw new Error('Gmail not configured');
    }

    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}&labelIds=INBOX`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch inbox');
    }

    const data = await response.json();
    const messages = data.messages || [];

    // Fetch details for each message
    const details = await Promise.all(
      messages.slice(0, maxResults).map(async (m: { id: string }) => {
        const msgResponse = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        return msgResponse.json();
      })
    );

    return details.map(
      (d: {
        id: string;
        snippet?: string;
        payload?: { headers?: Array<{ name: string; value: string }> };
      }) => {
        const headers = d.payload?.headers || [];
        const from = headers.find((h: { name: string }) => h.name === 'From')?.value || 'Unknown';
        const subject =
          headers.find((h: { name: string }) => h.name === 'Subject')?.value || 'No subject';

        return {
          id: d.id,
          from,
          subject,
          snippet: d.snippet || '',
        };
      }
    );
  }
}
