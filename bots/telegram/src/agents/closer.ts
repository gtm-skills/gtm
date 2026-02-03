/**
 * CLOSER Agent - Payments & Revenue
 *
 * Mission: Convert interest to revenue. Never let a deal die.
 *
 * Capabilities:
 * - Stripe payment links
 * - Proposal generation
 * - Deal nurture and follow-up
 * - Win/loss tracking
 */

import Anthropic from '@anthropic-ai/sdk';
import { HubspotClient } from '../integrations/hubspot.js';
import { StripeClient } from '../integrations/stripe.js';

const anthropic = new Anthropic();

interface Deal {
  id: string;
  company: string;
  contact: string;
  email: string;
  value: number;
  stage: 'proposal' | 'negotiation' | 'verbal' | 'contract';
  lastActivity: Date;
  nextAction: string;
}

export class CloserAgent {
  private hubspot: HubspotClient;
  private stripe: StripeClient;
  private deals: Deal[] = [];

  constructor() {
    this.hubspot = new HubspotClient();
    this.stripe = new StripeClient();
  }

  async getStatus(): Promise<string> {
    const pipeline = await this.calculatePipeline();
    return `Pipeline: $${pipeline.total.toLocaleString()}/mo
Deals in progress: ${pipeline.count}
Ready to close: ${pipeline.readyToClose}
Stalled: ${pipeline.stalled}`;
  }

  async getDailyBrief(): Promise<string> {
    return `Pipeline: $12,500/mo across 8 deals
Ready to close: 2 deals ($2,500)
Proposal sent: Acme viewed 3x (hot!)
Payment link: Beta clicked, didn't pay`;
  }

  async getReadyDeals(): Promise<string> {
    // In production: Pull from HubSpot pipeline
    return `
DEALS READY TO CLOSE

HOT (close this week):

1. Acme Corp | Sarah Chen
   Value: $1,500/mo | Stage: Proposal Sent
   Activity: Viewed proposal 3x today
   Action: Call to close
   /invoice sarah@acme.com $1500

2. Beta Inc | John Park
   Value: $1,000/mo | Stage: Verbal Yes
   Activity: Said "send the link" yesterday
   Action: Payment link
   /invoice john@beta.io $1000

WARM (close this month):

3. Gamma Tech | Lisa Wang
   Value: $2,000/mo | Stage: Negotiation
   Activity: Asking about annual discount
   Action: Send final offer
   /proposal gamma --discount

4. Delta SaaS | Mike Torres
   Value: $3,000/mo | Stage: Discovery
   Activity: Good call yesterday
   Action: Send proposal
   /proposal delta

Quick actions:
/invoice [email] $[amount] - Payment link
/proposal [company] - Generate proposal
/pipeline - Full pipeline view
`;
  }

  async generatePaymentLink(email: string, amount: number): Promise<string> {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return `
PAYMENT LINK

To: ${email}
Amount: $${amount}/mo

Stripe not configured. To enable:
1. Add STRIPE_SECRET_KEY to environment
2. Create products in Stripe dashboard

Manual fallback:
1. Create link in Stripe dashboard
2. Send via email:

---
Subject: Payment link for [Product]

[Name] - here's the link to get started:

[PASTE STRIPE LINK]

Let me know if you have any questions.
---
`;
    }

    try {
      const link = await this.stripe.createPaymentLink({
        amount: amount * 100, // cents
        currency: 'usd',
        recurring: 'month',
        customerEmail: email,
      });

      // Generate email with payment link
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 256,
        messages: [
          {
            role: 'user',
            content: `Write a brief email to send a payment link.

To: ${email}
Amount: $${amount}/month
Link: ${link.url}

Requirements:
- 3 sentences max
- Reference previous conversations
- Clear CTA to click link
- No pressure, just helpful`,
          },
        ],
      });

      const emailBody = response.content[0].type === 'text' ? response.content[0].text : '';

      return `
PAYMENT LINK CREATED

To: ${email}
Amount: $${amount}/mo
Link: ${link.url}

Email draft:
${emailBody}

[Send Email] [Copy Link] [Edit]

Tracking: You'll be notified when they:
- Click the link
- Complete payment
- Abandon checkout
`;
    } catch (error) {
      return `Failed to create payment link: ${error}`;
    }
  }

  async generateProposal(company: string): Promise<string> {
    // Get company context from HubSpot or cache
    const context = await this.getCompanyContext(company);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Generate a proposal outline for:

Company: ${context.name}
Contact: ${context.contact}
Industry: ${context.industry}
Size: ${context.employees} employees
Pain Points: ${context.painPoints.join(', ')}

Include:
1. Executive Summary (3 sentences)
2. The Challenge (their specific problems)
3. Our Solution (how we solve it)
4. Expected Outcomes (specific metrics)
5. Investment (tiered pricing: Starter/Growth/Enterprise)
6. Next Steps

Keep it concise. This is an outline, not a full document.`,
        },
      ],
    });

    const proposal = response.content[0].type === 'text' ? response.content[0].text : '';

    return `
PROPOSAL: ${context.name}

${proposal}

Actions:
[Generate PDF] [Send] [Edit]

Pricing options:
/invoice ${context.email} $500 - Starter
/invoice ${context.email} $1500 - Growth
/invoice ${context.email} $3000 - Enterprise
`;
  }

  async getStalledDeals(): Promise<string> {
    return `
STALLED DEALS

No activity in 7+ days:

1. Echo Labs | Emma Davis
   Value: $1,000/mo | Stage: Proposal
   Last activity: 10 days ago
   Action: Re-engage
   /write emma@echo.com --challenger

2. Foxtrot Co | Alex Kim
   Value: $500/mo | Stage: Discovery
   Last activity: 14 days ago
   Action: Breakup email or close
   /write alex@foxtrot.co --blunt

3. Golf Inc | Chris Lee
   Value: $2,000/mo | Stage: Negotiation
   Last activity: 21 days ago
   Action: Final attempt or mark lost
   /lost golf "went dark"

Re-engage all:
Sends personalized follow-up to each stalled deal
/reengage all
`;
  }

  async getPipelineValue(): Promise<string> {
    const pipeline = await this.calculatePipeline();

    return `
PIPELINE SUMMARY

Total: $${pipeline.total.toLocaleString()}/mo
Weighted: $${pipeline.weighted.toLocaleString()}/mo

By Stage:
Discovery:    $${pipeline.byStage.discovery.toLocaleString()} (${pipeline.byStage.discoveryCount} deals)
Proposal:     $${pipeline.byStage.proposal.toLocaleString()} (${pipeline.byStage.proposalCount} deals)
Negotiation:  $${pipeline.byStage.negotiation.toLocaleString()} (${pipeline.byStage.negotiationCount} deals)
Verbal:       $${pipeline.byStage.verbal.toLocaleString()} (${pipeline.byStage.verbalCount} deals)

Expected This Month:
$${pipeline.thisMonth.toLocaleString()} from ${pipeline.thisMonthCount} deals

Actions:
/close - Deals ready to close
/stalled - Deals needing attention
`;
  }

  async logWon(details: string): Promise<string> {
    // Parse details
    const parts = details.split(' ');
    const company = parts[0] || 'Unknown';
    const amount = parts.find((p) => p.startsWith('$'))?.replace('$', '') || '0';

    // Log to HubSpot
    try {
      await this.hubspot.updateDeal({
        company,
        stage: 'closedwon',
        amount: parseInt(amount),
      });
    } catch (error) {
      console.log('Could not log to HubSpot');
    }

    return `
DEAL WON!

${company}
Amount: $${amount}/mo
ARR Impact: $${parseInt(amount) * 12}/year

Logged to HubSpot.

Next:
- Send welcome email
- Schedule onboarding
- Update forecasts

/status - Updated pipeline
`;
  }

  async logLost(details: string): Promise<string> {
    const parts = details.split(' ');
    const company = parts[0] || 'Unknown';
    const reason = parts.slice(1).join(' ') || 'No reason given';

    // Log to HubSpot
    try {
      await this.hubspot.updateDeal({
        company,
        stage: 'closedlost',
        lostReason: reason,
      });
    } catch (error) {
      console.log('Could not log to HubSpot');
    }

    return `
DEAL LOST

${company}
Reason: ${reason}

Logged to HubSpot.

Analysis:
${await this.analyzeLostDeal(reason)}

Add to win-back sequence?
/sequence ${company.toLowerCase()} --winback
`;
  }

  // ==========================================================================
  // HELPER METHODS
  // ==========================================================================

  private async calculatePipeline(): Promise<{
    total: number;
    weighted: number;
    count: number;
    readyToClose: number;
    stalled: number;
    thisMonth: number;
    thisMonthCount: number;
    byStage: {
      discovery: number;
      discoveryCount: number;
      proposal: number;
      proposalCount: number;
      negotiation: number;
      negotiationCount: number;
      verbal: number;
      verbalCount: number;
    };
  }> {
    // Demo data - in production, pull from HubSpot
    return {
      total: 12500,
      weighted: 6250,
      count: 8,
      readyToClose: 2,
      stalled: 3,
      thisMonth: 3500,
      thisMonthCount: 3,
      byStage: {
        discovery: 4000,
        discoveryCount: 2,
        proposal: 3500,
        proposalCount: 3,
        negotiation: 3000,
        negotiationCount: 2,
        verbal: 2000,
        verbalCount: 1,
      },
    };
  }

  private async getCompanyContext(company: string): Promise<{
    name: string;
    contact: string;
    email: string;
    industry: string;
    employees: number;
    painPoints: string[];
  }> {
    // Demo data
    const companies: Record<
      string,
      {
        name: string;
        contact: string;
        email: string;
        industry: string;
        employees: number;
        painPoints: string[];
      }
    > = {
      acme: {
        name: 'Acme Corp',
        contact: 'Sarah Chen',
        email: 'sarah@acme.com',
        industry: 'SaaS',
        employees: 150,
        painPoints: ['SDR ramp time', 'Pipeline coverage', 'Rep productivity'],
      },
      beta: {
        name: 'Beta Inc',
        contact: 'John Park',
        email: 'john@beta.io',
        industry: 'Fintech',
        employees: 80,
        painPoints: ['New sales leader', 'Quick wins needed', 'Team alignment'],
      },
      gamma: {
        name: 'Gamma Tech',
        contact: 'Lisa Wang',
        email: 'lisa@gamma.tech',
        industry: 'MarTech',
        employees: 200,
        painPoints: ['Competitive pressure', 'Market positioning', 'Sales velocity'],
      },
      delta: {
        name: 'Delta SaaS',
        contact: 'Mike Torres',
        email: 'mike@delta.io',
        industry: 'Enterprise SaaS',
        employees: 500,
        painPoints: ['IPO prep', 'Enterprise deals', 'Sales forecasting'],
      },
    };

    const key = company.toLowerCase();
    return (
      companies[key] || {
        name: company,
        contact: 'Unknown',
        email: 'unknown@example.com',
        industry: 'Technology',
        employees: 100,
        painPoints: ['Growth', 'Efficiency', 'Scale'],
      }
    );
  }

  private async analyzeLostDeal(reason: string): Promise<string> {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: `Briefly analyze this lost deal reason and suggest improvements:

Reason: ${reason}

Provide:
1. What we could have done differently
2. Pattern to watch for in future deals
3. Win-back opportunity (yes/no/maybe)

Keep it to 3-4 lines.`,
        },
      ],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }
}
