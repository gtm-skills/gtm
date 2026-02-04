import { Resend } from 'resend';

// Only create client if API key is configured
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendWelcomeEmail(email: string) {
  if (!resend) {
    console.log('Resend not configured, skipping welcome email for:', email);
    return null;
  }

  return resend.emails.send({
    from: 'GTM Skills <hello@gtm-skills.com>',
    to: email,
    subject: 'Welcome to GTM Skills',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #18181b; font-size: 24px; margin-bottom: 20px;">Welcome to GTM Skills</h1>

        <p style="color: #3f3f46; font-size: 16px; line-height: 1.6;">
          You're now part of a community of GTM professionals using AI to sell smarter.
        </p>

        <p style="color: #3f3f46; font-size: 16px; line-height: 1.6;">
          Here's what you get:
        </p>

        <ul style="color: #3f3f46; font-size: 16px; line-height: 1.8;">
          <li>2,500+ copy-paste prompts for sales and marketing</li>
          <li>Industry-specific playbooks</li>
          <li>Weekly new prompts and templates</li>
          <li>Early access to premium content</li>
        </ul>

        <a href="https://gtm-skills.com" style="display: inline-block; background: #18181b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; margin-top: 20px;">
          Browse Prompts
        </a>

        <p style="color: #71717a; font-size: 14px; margin-top: 40px;">
          Questions? Reply to this email.
        </p>

        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 30px 0;" />

        <p style="color: #a1a1aa; font-size: 12px;">
          GTM Skills · The agentic GTM operating system
        </p>
      </div>
    `,
  });
}

export async function sendNewsletterEmail(
  emails: string[],
  subject: string,
  content: string
) {
  if (!resend) {
    console.log('Resend not configured, skipping newsletter for', emails.length, 'recipients');
    return null;
  }

  // Resend supports batch sending up to 100 emails
  const batches = [];
  for (let i = 0; i < emails.length; i += 100) {
    batches.push(emails.slice(i, i + 100));
  }

  const results = [];
  for (const batch of batches) {
    const result = await resend.batch.send(
      batch.map((email) => ({
        from: 'GTM Skills <hello@gtm-skills.com>',
        to: email,
        subject,
        html: content,
      }))
    );
    results.push(result);
  }

  return results;
}
