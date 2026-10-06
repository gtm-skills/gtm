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
          <li>244 copy-paste prompts and installable agent skills</li>
          <li>Industry-specific playbooks</li>
          <li>Weekly new prompts and templates</li>
          <li>First look at new premium skills and kits</li>
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

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://gtm-skills.com';

/** Receipt + onboarding after Stripe checkout. Works for guests (tells them to sign in with the same email). */
export async function sendPurchaseEmail(opts: { to: string; productId: string; hasAccount: boolean }) {
  if (!resend) return null;
  const { kits } = await import('@/data/skills');
  const product = kits.find((k) => k.id === opts.productId);
  const name = product?.name ?? 'GTM Skills';
  const loginUrl = `${SITE}/login?next=/account&email=${encodeURIComponent(opts.to)}`;

  return resend.emails.send({
    from: 'GTM Skills <hello@gtm-skills.com>',
    to: opts.to,
    subject: `Your ${name} is ready`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color:#18181b;">
        <h1 style="font-size: 22px; margin: 0 0 16px;">${name} — you're in.</h1>
        <p style="font-size: 16px; line-height: 1.6; color:#3f3f46;">
          ${opts.hasAccount
            ? 'Your skills are unlocked on your account.'
            : `Sign in with <strong>${opts.to}</strong> and your purchase attaches automatically. No password.`}
        </p>
        <a href="${opts.hasAccount ? `${SITE}/account` : loginUrl}" style="display:inline-block;background:#18181b;color:#fff;padding:12px 22px;text-decoration:none;border-radius:6px;font-weight:600;margin:12px 0 24px;">
          ${opts.hasAccount ? 'Open your account' : 'Sign in to unlock'}
        </a>
        <p style="font-size: 14px; line-height: 1.6; color:#3f3f46;">
          Install in Claude Code, Cursor, Codex, Gemini CLI or OpenClaw from any skill page. In ChatGPT, add the GTM Skills plugin and sign in with the same email.
        </p>
        <p style="font-size: 13px; color:#71717a; margin-top: 28px;">
          14-day money-back guarantee. Reply to this email for anything. — Prospeda
        </p>
      </div>
    `,
  });
}
