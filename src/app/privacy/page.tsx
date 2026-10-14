import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Privacy Policy | GTM Skills',
  description: 'How GTM Skills collects, uses and protects your data, including use through the GTM Skills plugin for ChatGPT.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 6, 2026">
      <p>
        GTM Skills is operated by Prospeda (&ldquo;we&rdquo;, &ldquo;us&rdquo;). This policy covers gtm-skills.com, our
        API, the GTM Skills plugin for ChatGPT and Codex, and our MCP server (together, the &ldquo;Service&rdquo;).
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Account data.</strong> Email address and, if you sign in with GitHub, your GitHub username and avatar.</li>
        <li><strong>Purchase data.</strong> Product purchased, amount, and a Stripe customer reference. Card details are handled by Stripe and never touch our servers.</li>
        <li><strong>Usage data.</strong> Which skills you view, install or run, and which plugin tools you call, so we can enforce plan limits and improve the Service. We log tool names and timestamps, not the content of your conversations.</li>
        <li><strong>Tool inputs.</strong> When you use a plugin tool (for example call preparation), the text you provide is processed to generate a response and is not stored beyond the request, except as needed to prevent abuse.</li>
        <li><strong>Newsletter.</strong> Email address if you subscribe.</li>
        <li><strong>Analytics.</strong> Aggregate, privacy-preserving page analytics via Vercel Analytics. No cross-site tracking cookies.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To provide the Service and the content you have paid for.</li>
        <li>To send purchase receipts, account notices and, if subscribed, the newsletter. Unsubscribe at any time.</li>
        <li>To enforce plan limits and prevent abuse.</li>
        <li>To improve the skills and tools we publish, using aggregate usage patterns.</li>
      </ul>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not sell your personal data.</li>
        <li>We do not store your ChatGPT conversation history.</li>
        <li>We do not train models on your inputs.</li>
      </ul>

      <h2>Third parties</h2>
      <p>
        We use Supabase (authentication and database), Stripe (payments), Resend (email), Vercel (hosting and
        analytics) and GitHub (optional sign-in, content hosting). Each processes data under its own privacy terms.
        When you use the plugin inside ChatGPT, OpenAI&rsquo;s privacy policy also applies to your use of ChatGPT.
      </p>

      <h2>Retention</h2>
      <p>
        Account and purchase records are kept while your account exists and as required for tax and accounting.
        Usage logs are kept for 90 days. Delete your account from the Account page or by emailing us; we remove
        personal data within 30 days, except records we are legally required to keep.
      </p>

      <h2>Your rights</h2>
      <p>
        You can access, correct, export or delete your data by emailing{' '}
        <a href="mailto:hello@gtm-skills.com">hello@gtm-skills.com</a>. EU/UK and California residents have
        additional rights under GDPR and CCPA, which we honor for everyone.
      </p>

      <h2>Changes</h2>
      <p>We will post changes here and update the date above. Material changes will be announced by email to account holders.</p>

      <h2>Contact</h2>
      <p>
        Prospeda · <a href="mailto:hello@gtm-skills.com">hello@gtm-skills.com</a>
      </p>
    </LegalPage>
  );
}
