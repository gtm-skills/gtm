/**
 * Apollo Integration
 *
 * Contact and company enrichment.
 */

const APOLLO_API_URL = 'https://api.apollo.io/v1';

export class ApolloClient {
  private apiKey: string | null;

  constructor() {
    this.apiKey = process.env.APOLLO_API_KEY || null;
  }

  private ensureApiKey(): string {
    if (!this.apiKey) {
      throw new Error('Apollo not configured. Add APOLLO_API_KEY to environment.');
    }
    return this.apiKey;
  }

  async enrichCompany(domain: string): Promise<{
    name: string;
    domain: string;
    employees: number;
    funding: string;
    industry: string;
    signals: string[];
    contacts: Array<{
      name: string;
      title: string;
      email: string;
      company: string;
      score: number;
      signals: string[];
      suggestedAngle: string;
    }>;
    suggestedAngle: string;
  } | null> {
    const apiKey = this.ensureApiKey();

    const response = await fetch(`${APOLLO_API_URL}/organizations/enrich`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        api_key: apiKey,
        domain,
      }),
    });

    if (!response.ok) {
      throw new Error(`Apollo API error: ${response.statusText}`);
    }

    const data = await response.json();
    const org = data.organization;

    if (!org) return null;

    return {
      name: org.name || domain,
      domain: org.primary_domain || domain,
      employees: org.estimated_num_employees || 0,
      funding: org.funding_total ? `$${(org.funding_total / 1000000).toFixed(1)}M` : 'Unknown',
      industry: org.industry || 'Unknown',
      signals: this.extractSignals(org),
      contacts: [],
      suggestedAngle: this.suggestAngle(org),
    };
  }

  async enrichPerson(email: string): Promise<{
    name: string;
    title: string;
    email: string;
    company: string;
    score: number;
    signals: string[];
    suggestedAngle: string;
  } | null> {
    const apiKey = this.ensureApiKey();

    const response = await fetch(`${APOLLO_API_URL}/people/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        api_key: apiKey,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Apollo API error: ${response.statusText}`);
    }

    const data = await response.json();
    const person = data.person;

    if (!person) return null;

    return {
      name: person.name || email,
      title: person.title || 'Unknown',
      email: person.email || email,
      company: person.organization?.name || 'Unknown',
      score: this.calculateScore(person),
      signals: this.extractPersonSignals(person),
      suggestedAngle: this.suggestPersonAngle(person),
    };
  }

  async searchPeople(query: string): Promise<
    Array<{
      name: string;
      title: string;
      email: string;
      company: string;
      score: number;
      signals: string[];
      suggestedAngle: string;
    }>
  > {
    const apiKey = this.ensureApiKey();

    // Parse query for criteria
    const criteria = this.parseSearchQuery(query);

    const response = await fetch(`${APOLLO_API_URL}/mixed_people/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        api_key: apiKey,
        per_page: 10,
        ...criteria,
      }),
    });

    if (!response.ok) {
      throw new Error(`Apollo API error: ${response.statusText}`);
    }

    const data = await response.json();
    const people = data.people || [];

    return people.map(
      (p: {
        name?: string;
        title?: string;
        email?: string;
        organization?: { name?: string };
      }) => ({
        name: p.name || 'Unknown',
        title: p.title || 'Unknown',
        email: p.email || '',
        company: p.organization?.name || 'Unknown',
        score: this.calculateScore(p),
        signals: this.extractPersonSignals(p),
        suggestedAngle: this.suggestPersonAngle(p),
      })
    );
  }

  private extractSignals(org: {
    estimated_num_employees?: number;
    funding_total?: number;
    technologies?: string[];
  }): string[] {
    const signals: string[] = [];

    if (org.estimated_num_employees && org.estimated_num_employees > 50) {
      signals.push(`${org.estimated_num_employees} employees`);
    }

    if (org.funding_total && org.funding_total > 0) {
      signals.push(`Raised $${(org.funding_total / 1000000).toFixed(1)}M`);
    }

    if (org.technologies && org.technologies.length > 0) {
      signals.push(`Uses: ${org.technologies.slice(0, 3).join(', ')}`);
    }

    return signals;
  }

  private extractPersonSignals(person: {
    seniority?: string;
    departments?: string[];
    organization?: { estimated_num_employees?: number };
  }): string[] {
    const signals: string[] = [];

    if (person.seniority) {
      signals.push(`${person.seniority} level`);
    }

    if (person.departments && person.departments.length > 0) {
      signals.push(`Dept: ${person.departments[0]}`);
    }

    return signals;
  }

  private calculateScore(person: {
    seniority?: string;
    organization?: { estimated_num_employees?: number };
  }): number {
    let score = 50;

    // Seniority boost
    if (person.seniority === 'vp') score += 25;
    if (person.seniority === 'director') score += 20;
    if (person.seniority === 'c_suite') score += 30;
    if (person.seniority === 'manager') score += 10;

    // Company size boost
    const employees = person.organization?.estimated_num_employees || 0;
    if (employees >= 50 && employees <= 500) score += 15;
    if (employees > 500) score += 10;

    return Math.min(100, score);
  }

  private suggestAngle(org: { industry?: string; technologies?: string[] }): string {
    if (org.technologies?.includes('Salesforce')) {
      return 'CRM optimization and automation';
    }
    if (org.industry === 'Software') {
      return 'Sales velocity and pipeline coverage';
    }
    return 'Growth and efficiency';
  }

  private suggestPersonAngle(person: { title?: string; seniority?: string }): string {
    if (person.title?.toLowerCase().includes('sales')) {
      return 'Sales productivity and rep performance';
    }
    if (person.title?.toLowerCase().includes('revenue')) {
      return 'Revenue growth and forecasting';
    }
    if (person.seniority === 'c_suite') {
      return 'Business outcomes and strategic value';
    }
    return 'Efficiency and growth';
  }

  private parseSearchQuery(query: string): Record<string, unknown> {
    const criteria: Record<string, unknown> = {};

    // Series B, Series A, etc.
    const fundingMatch = query.match(/series ([a-z])/i);
    if (fundingMatch) {
      criteria.organization_latest_funding_stage_cd = [fundingMatch[1].toUpperCase()];
    }

    // Industry keywords
    if (query.toLowerCase().includes('saas')) {
      criteria.organization_industry_tag_ids = ['software'];
    }
    if (query.toLowerCase().includes('fintech')) {
      criteria.organization_industry_tag_ids = ['financial services'];
    }

    // Title filters
    if (query.toLowerCase().includes('vp')) {
      criteria.person_seniorities = ['vp'];
    }
    if (query.toLowerCase().includes('sales')) {
      criteria.person_titles = ['sales', 'revenue', 'growth'];
    }

    return criteria;
  }
}
