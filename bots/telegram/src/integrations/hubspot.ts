/**
 * HubSpot Integration
 *
 * CRM operations for prospect and deal management.
 */

import { Client } from '@hubspot/api-client';

export class HubspotClient {
  private client: Client | null = null;

  constructor() {
    if (process.env.HUBSPOT_API_KEY) {
      this.client = new Client({ accessToken: process.env.HUBSPOT_API_KEY });
    }
  }

  private ensureClient(): Client {
    if (!this.client) {
      throw new Error('HubSpot not configured. Add HUBSPOT_API_KEY to environment.');
    }
    return this.client;
  }

  async getRecentContacts(limit: number = 10): Promise<unknown[]> {
    const client = this.ensureClient();
    const response = await client.crm.contacts.basicApi.getPage(limit, undefined, [
      'email',
      'firstname',
      'lastname',
      'jobtitle',
      'company',
      'notes_last_updated',
    ]);
    return response.results;
  }

  async getContactByEmail(email: string): Promise<unknown | null> {
    const client = this.ensureClient();
    try {
      const response = await client.crm.contacts.searchApi.doSearch({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              },
            ],
          },
        ],
        properties: [
          'email',
          'firstname',
          'lastname',
          'jobtitle',
          'company',
          'phone',
          'notes_last_updated',
        ],
        limit: 1,
        after: '0',
        sorts: [],
      });
      return response.results[0] || null;
    } catch (error) {
      console.error('Error searching contact:', error);
      return null;
    }
  }

  async createContact(data: {
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
    title?: string;
  }): Promise<unknown> {
    const client = this.ensureClient();
    return await client.crm.contacts.basicApi.create({
      properties: {
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        company: data.company || '',
        jobtitle: data.title || '',
      },
      associations: [],
    });
  }

  async logEmail(data: { email: string; subject: string; body: string }): Promise<void> {
    const client = this.ensureClient();

    // Find contact
    const contact = await this.getContactByEmail(data.email);
    if (!contact) {
      console.log('Contact not found, skipping email log');
      return;
    }

    const contactId = (contact as { id: string }).id;

    // Create email engagement
    await client.crm.objects.basicApi.create('emails', {
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_email_direction: 'OUTBOUND',
        hs_email_subject: data.subject,
        hs_email_text: data.body,
        hs_email_status: 'SENT',
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 198, // Email to Contact
            },
          ],
        },
      ],
    });
  }

  async updateDeal(data: {
    company: string;
    stage: string;
    amount?: number;
    lostReason?: string;
  }): Promise<void> {
    const client = this.ensureClient();

    // Search for deal by company name
    const deals = await client.crm.deals.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'dealname',
              operator: 'CONTAINS_TOKEN',
              value: data.company,
            },
          ],
        },
      ],
      properties: ['dealname', 'dealstage', 'amount'],
      limit: 1,
      after: '0',
      sorts: [],
    });

    if (deals.results.length === 0) {
      console.log('Deal not found');
      return;
    }

    const dealId = deals.results[0].id;

    const properties: Record<string, string | number> = {
      dealstage: data.stage,
    };

    if (data.amount) {
      properties.amount = data.amount;
    }

    if (data.lostReason) {
      properties.closed_lost_reason = data.lostReason;
    }

    await client.crm.deals.basicApi.update(dealId, { properties });
  }
}
