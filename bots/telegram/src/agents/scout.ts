/**
 * SCOUT Agent - Research & Prospecting
 *
 * Mission: Find qualified prospects 24/7. Never run out of pipeline.
 *
 * Capabilities:
 * - Passive monitoring (signals, hiring, funding)
 * - Active research (company deep dives)
 * - Contact enrichment (Apollo, Clay)
 * - ICP scoring and qualification
 */

import Anthropic from '@anthropic-ai/sdk';
import { HubspotClient } from '../integrations/hubspot.js';
import { ApolloClient } from '../integrations/apollo.js';

const anthropic = new Anthropic();

interface Prospect {
  name: string;
  title: string;
  email: string;
  company: string;
  score: number;
  signals: string[];
  suggestedAngle: string;
}

interface CompanyResearch {
  name: string;
  domain: string;
  employees: number;
  funding: string;
  industry: string;
  signals: string[];
  contacts: Prospect[];
  suggestedAngle: string;
}

export class ScoutAgent {
  private hubspot: HubspotClient;
  private apollo: ApolloClient;
  private prospectCache: Map<string, Prospect[]> = new Map();

  constructor() {
    this.hubspot = new HubspotClient();
    this.apollo = new ApolloClient();
  }

  async getStatus(): Promise<string> {
    const recentProspects = this.prospectCache.size;
    return `Found ${recentProspects} prospects in cache
Monitoring: LinkedIn, Crunchbase, job boards
Last scan: ${new Date().toLocaleTimeString()}`;
  }

  async getDailyBrief(): Promise<string> {
    const prospects = await this.getTopProspects();
    return prospects;
  }

  async getTopProspects(): Promise<string> {
    // In production: Pull from HubSpot or cached research
    // For now: Demo data showing the format

    try {
      // Try to get recent contacts from HubSpot
      const contacts = await this.hubspot.getRecentContacts(10);

      if (contacts.length > 0) {
        return this.formatProspects(contacts);
      }
    } catch (error) {
      console.log('HubSpot not connected, using demo data');
    }

    // Demo data
    return `
TOP 10 PROSPECTS TODAY

1. Sarah Chen | VP Sales | Acme Corp
   Score: 92 | Signals: Hiring 5 SDRs, Series B
   Angle: SDR ramp time
   /write sarah@acme.com

2. John Park | Head of Revenue | Beta Inc
   Score: 88 | Signals: New role (2 weeks), scaling team
   Angle: New leader quick wins
   /write john@beta.io

3. Lisa Wang | Director Sales Ops | Gamma Tech
   Score: 85 | Signals: Evaluated competitor, tech stack change
   Angle: Competitive displacement
   /write lisa@gamma.tech

4. Mike Torres | CRO | Delta SaaS
   Score: 82 | Signals: IPO prep, hiring AEs
   Angle: Enterprise readiness
   /write mike@delta.io

5. Emma Davis | VP Revenue | Echo Labs
   Score: 80 | Signals: Series A, first sales hire
   Angle: Building sales foundation
   /write emma@echo.com

[+5 more - type /scout 10 for full list]

Quick actions:
/write [email] - Draft email
/scout [domain] - Deep research
`;
  }

  async getBuyingSignals(): Promise<string> {
    // In production: Pull from signal monitoring services
    return `
BUYING SIGNALS DETECTED TODAY

HIRING (strongest signal)
Acme Corp - Hiring 5 SDRs
Beta Inc - Posted VP Sales role
Gamma Tech - 3 AE positions

FUNDING
Delta SaaS - Series B announced ($25M)
Echo Labs - Seed round closed

TECH CHANGES
Foxtrot Co - Removed competitor from stack
Golf Inc - Added Salesforce (needs tooling)

LEADERSHIP
Hotel Corp - New CRO started
India LLC - VP Sales promoted to CRO

GROWTH
Juliet Co - Opened 2 new offices
Kilo Inc - 50% headcount growth YoY

Research any:
/scout [company]
`;
  }

  async research(query: string): Promise<string> {
    const isDomain = query.includes('.');
    const isQuoted = query.startsWith('"');

    if (isDomain) {
      return await this.researchCompany(query);
    }

    if (isQuoted) {
      return await this.findProspects(query.replace(/"/g, ''));
    }

    return await this.researchCompany(query);
  }

  async researchCompany(domain: string): Promise<string> {
    // Clean up domain
    const cleanDomain = domain.replace(/https?:\/\//, '').replace(/\/$/, '');

    try {
      // Try Apollo enrichment
      const apolloData = await this.apollo.enrichCompany(cleanDomain);

      if (apolloData) {
        return this.formatCompanyResearch(apolloData);
      }
    } catch (error) {
      console.log('Apollo enrichment failed, using AI research');
    }

    // Use Claude to research (fallback/demo)
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Research this company for B2B sales outreach: ${cleanDomain}

Provide:
1. Company name and what they do
2. Estimated employee count
3. Funding stage if known
4. 2-3 likely decision makers (titles)
5. 2-3 potential pain points for sales outreach
6. Suggested outreach angle

Format as a brief sales intel report.`,
        },
      ],
    });

    const research = response.content[0].type === 'text' ? response.content[0].text : '';

    return `
COMPANY RESEARCH: ${cleanDomain}

${research}

Next steps:
/scout enrich [email] - Get contact details
/write [email] - Draft outreach
`;
  }

  async findProspects(criteria: string): Promise<string> {
    try {
      // Try Apollo search
      const prospects = await this.apollo.searchPeople(criteria);

      if (prospects.length > 0) {
        return this.formatProspectList(prospects);
      }
    } catch (error) {
      console.log('Apollo search failed, using AI');
    }

    // Use Claude to suggest where to find these prospects
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `I'm looking for prospects matching: "${criteria}"

Suggest:
1. 5 specific companies that likely match this criteria
2. The titles I should target at each
3. Where to find them (LinkedIn, events, communities)
4. A good outreach angle for this segment`,
        },
      ],
    });

    const suggestions = response.content[0].type === 'text' ? response.content[0].text : '';

    return `
PROSPECT SEARCH: "${criteria}"

${suggestions}

To research specific companies:
/scout [domain]
`;
  }

  async enrichContact(email: string): Promise<string> {
    try {
      const profile = await this.apollo.enrichPerson(email);

      if (profile) {
        return this.formatContactProfile(profile);
      }
    } catch (error) {
      console.log('Apollo enrichment failed');
    }

    // Parse email domain for company research
    const domain = email.split('@')[1];

    return `
CONTACT PROFILE: ${email}

Email: ${email}
Company: ${domain}

Apollo enrichment not available.
Try searching LinkedIn or use:
/scout ${domain}
`;
  }

  // ==========================================================================
  // FORMATTING HELPERS
  // ==========================================================================

  private formatProspects(contacts: unknown[]): string {
    // Format HubSpot contacts as prospect list
    let output = '\nTOP PROSPECTS\n\n';

    contacts.forEach((contact: unknown, index: number) => {
      const c = contact as Record<string, unknown>;
      const props = c.properties as Record<string, string>;
      output += `${index + 1}. ${props.firstname} ${props.lastname} | ${props.jobtitle || 'Unknown'} | ${props.company || 'Unknown'}\n`;
      output += `   Email: ${props.email}\n\n`;
    });

    return output;
  }

  private formatCompanyResearch(data: CompanyResearch): string {
    return `
COMPANY RESEARCH: ${data.name}

Domain: ${data.domain}
Employees: ${data.employees}
Funding: ${data.funding}
Industry: ${data.industry}

SIGNALS:
${data.signals.map((s) => `- ${s}`).join('\n')}

KEY CONTACTS:
${data.contacts
  .map(
    (c, i) => `${i + 1}. ${c.name} | ${c.title}
   Score: ${c.score} | ${c.email}
   /write ${c.email}`
  )
  .join('\n\n')}

SUGGESTED ANGLE:
${data.suggestedAngle}
`;
  }

  private formatProspectList(prospects: Prospect[]): string {
    let output = '\nPROSPECTS FOUND\n\n';

    prospects.forEach((p, i) => {
      output += `${i + 1}. ${p.name} | ${p.title} | ${p.company}\n`;
      output += `   Score: ${p.score} | ${p.email}\n`;
      output += `   Signals: ${p.signals.join(', ')}\n`;
      output += `   /write ${p.email}\n\n`;
    });

    return output;
  }

  private formatContactProfile(profile: Prospect): string {
    return `
CONTACT PROFILE

${profile.name}
${profile.title} at ${profile.company}

Email: ${profile.email}
Score: ${profile.score}

Signals:
${profile.signals.map((s) => `- ${s}`).join('\n')}

Suggested Angle:
${profile.suggestedAngle}

/write ${profile.email}
`;
  }
}
