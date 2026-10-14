import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Terms of Service | GTM Skills',
  description: 'Terms governing use of gtm-skills.com, premium skill kits, Pro, and the GTM Skills plugin for ChatGPT.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="October 6, 2026">
      <p>
        These terms govern your use of gtm-skills.com, the GTM Skills API and MCP server, the GTM Skills plugin for
        ChatGPT and Codex, and any premium content you purchase (together, the &ldquo;Service&rdquo;), operated by
        Prospeda. By using the Service you agree to them.
      </p>

      <h2>Open-source core</h2>
      <p>
        The code and content in the public repository at github.com/gtm-skills/gtm are licensed under the MIT
        License. Nothing in these terms limits your rights under that license.
      </p>

      <h2>Premium content</h2>
      <p>
        Premium skill kits, the Full Bundle and Pro (&ldquo;Premium Content&rdquo;) are licensed, not sold. On
        purchase you receive a personal, non-exclusive, non-transferable license to install and use the Premium
        Content with AI agents you operate, for your own or your employer&rsquo;s internal business use. You may
        modify it for your own use. You may not redistribute, resell, publish, or share Premium Content, or make it
        available to anyone who has not purchased it. One purchase covers one person; team licensing is available
        on request.
      </p>

      <h2>Kits and Bundle</h2>
      <p>
        Kits and the Full Bundle are one-time purchases that include updates to the purchased content for 12 months
        from the date of purchase. After 12 months you keep what you have.
      </p>

      <h2>Pro</h2>
      <p>
        Pro is a monthly subscription billed in advance. It includes all Premium Content and unlimited use of
        premium plugin tools while active. Cancel at any time from your Account page; access continues to the end
        of the paid period. Prices may change with 30 days&rsquo; notice.
      </p>

      <h2>Refunds</h2>
      <p>
        14-day money-back guarantee on every purchase, no questions asked. Email{' '}
        <a href="mailto:hello@gtm-skills.com">hello@gtm-skills.com</a> within 14 days of purchase. Refunded
        purchases revoke access to the Premium Content.
      </p>

      <h2>Plugin and API</h2>
      <p>
        Free tools are rate-limited. You may not use automated means to exceed limits, scrape the Service, or
        resell access. The plugin generates suggestions from the inputs you provide; you are responsible for what
        you send to prospects and customers. Do not submit personal data you are not permitted to share.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not use the Service to send unsolicited bulk messages in violation of CAN-SPAM, GDPR, CASL or similar
        laws, to harass anyone, or for any unlawful purpose.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo;. We do not guarantee any sales outcome. To the fullest extent
        permitted by law, our liability is limited to the amount you paid us in the 12 months before the claim.
      </p>

      <h2>Not affiliated</h2>
      <p>
        GTM Skills is an independent product. It is not affiliated with, endorsed by or sponsored by OpenAI,
        Anthropic, Cursor, Google, HubSpot or Salesforce. Product names are trademarks of their owners.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms; we will post changes here. Questions:{' '}
        <a href="mailto:hello@gtm-skills.com">hello@gtm-skills.com</a>.
      </p>
    </LegalPage>
  );
}
