/**
 * HubSpot CRM Integration for GTM MCP Server
 *
 * Provides real API integration with HubSpot for:
 * - Contact management
 * - Deal tracking
 * - Activity logging
 * - Company management
 *
 * Requires HUBSPOT_API_KEY environment variable
 */

import { z } from "zod";

const HUBSPOT_API_BASE = "https://api.hubapi.com";

// Get API key from environment
function getApiKey(): string {
  const key = process.env.HUBSPOT_API_KEY;
  if (!key) {
    throw new Error("HUBSPOT_API_KEY environment variable is required. Get your key from HubSpot Settings > Integrations > Private Apps");
  }
  return key;
}

// Generic HubSpot API request helper
async function hubspotRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = getApiKey();

  const response = await fetch(`${HUBSPOT_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HubSpot API error (${response.status}): ${error}`);
  }

  return response.json();
}

// ============================================================================
// SCHEMAS
// ============================================================================

export const CreateContactSchema = z.object({
  email: z.string().email().describe("Contact's email address (required)"),
  firstName: z.string().optional().describe("Contact's first name"),
  lastName: z.string().optional().describe("Contact's last name"),
  phone: z.string().optional().describe("Phone number"),
  company: z.string().optional().describe("Company name"),
  jobTitle: z.string().optional().describe("Job title"),
  linkedinUrl: z.string().optional().describe("LinkedIn profile URL"),
  notes: z.string().optional().describe("Notes about the contact"),
});

export const UpdateContactSchema = z.object({
  contactId: z.string().describe("HubSpot contact ID to update"),
  email: z.string().email().optional().describe("Updated email"),
  firstName: z.string().optional().describe("Updated first name"),
  lastName: z.string().optional().describe("Updated last name"),
  phone: z.string().optional().describe("Updated phone"),
  company: z.string().optional().describe("Updated company"),
  jobTitle: z.string().optional().describe("Updated job title"),
  notes: z.string().optional().describe("Updated notes"),
});

export const GetContactSchema = z.object({
  contactId: z.string().optional().describe("HubSpot contact ID"),
  email: z.string().email().optional().describe("Contact email to search"),
});

export const SearchContactsSchema = z.object({
  query: z.string().describe("Search query (name, email, or company)"),
  limit: z.number().optional().default(10).describe("Max results to return"),
});

export const CreateDealSchema = z.object({
  dealName: z.string().describe("Name of the deal"),
  pipeline: z.string().optional().describe("Pipeline ID (defaults to default pipeline)"),
  stage: z.string().optional().describe("Deal stage ID"),
  amount: z.number().optional().describe("Deal amount"),
  closeDate: z.string().optional().describe("Expected close date (YYYY-MM-DD)"),
  contactId: z.string().optional().describe("Associated contact ID"),
  companyId: z.string().optional().describe("Associated company ID"),
  notes: z.string().optional().describe("Deal notes"),
});

export const UpdateDealSchema = z.object({
  dealId: z.string().describe("HubSpot deal ID to update"),
  dealName: z.string().optional().describe("Updated deal name"),
  stage: z.string().optional().describe("Updated stage ID"),
  amount: z.number().optional().describe("Updated amount"),
  closeDate: z.string().optional().describe("Updated close date"),
  notes: z.string().optional().describe("Updated notes"),
});

export const LogActivitySchema = z.object({
  contactId: z.string().describe("Contact ID to log activity for"),
  activityType: z.enum(["email", "call", "meeting", "note"]).describe("Type of activity"),
  subject: z.string().describe("Activity subject/title"),
  body: z.string().describe("Activity details/notes"),
  timestamp: z.string().optional().describe("When the activity occurred (ISO 8601)"),
  dealId: z.string().optional().describe("Associated deal ID"),
});

export const GetPipelineSchema = z.object({
  pipelineId: z.string().optional().describe("Specific pipeline ID (returns all if omitted)"),
});

// ============================================================================
// API FUNCTIONS
// ============================================================================

interface HubSpotContact {
  id: string;
  properties: {
    email?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    company?: string;
    jobtitle?: string;
    hs_linkedin_url?: string;
    notes?: string;
    createdate?: string;
    lastmodifieddate?: string;
  };
}

interface HubSpotDeal {
  id: string;
  properties: {
    dealname?: string;
    dealstage?: string;
    pipeline?: string;
    amount?: string;
    closedate?: string;
    notes?: string;
    createdate?: string;
    hs_lastmodifieddate?: string;
  };
}

interface HubSpotSearchResult {
  total: number;
  results: HubSpotContact[];
}

export async function createContact(params: z.infer<typeof CreateContactSchema>): Promise<string> {
  const properties: Record<string, string> = {
    email: params.email,
  };

  if (params.firstName) properties.firstname = params.firstName;
  if (params.lastName) properties.lastname = params.lastName;
  if (params.phone) properties.phone = params.phone;
  if (params.company) properties.company = params.company;
  if (params.jobTitle) properties.jobtitle = params.jobTitle;
  if (params.linkedinUrl) properties.hs_linkedin_url = params.linkedinUrl;
  if (params.notes) properties.notes = params.notes;

  const result = await hubspotRequest<HubSpotContact>("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  return formatContactResponse(result, "created");
}

export async function updateContact(params: z.infer<typeof UpdateContactSchema>): Promise<string> {
  const properties: Record<string, string> = {};

  if (params.email) properties.email = params.email;
  if (params.firstName) properties.firstname = params.firstName;
  if (params.lastName) properties.lastname = params.lastName;
  if (params.phone) properties.phone = params.phone;
  if (params.company) properties.company = params.company;
  if (params.jobTitle) properties.jobtitle = params.jobTitle;
  if (params.notes) properties.notes = params.notes;

  const result = await hubspotRequest<HubSpotContact>(
    `/crm/v3/objects/contacts/${params.contactId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    }
  );

  return formatContactResponse(result, "updated");
}

export async function getContact(params: z.infer<typeof GetContactSchema>): Promise<string> {
  if (!params.contactId && !params.email) {
    throw new Error("Either contactId or email is required");
  }

  let contact: HubSpotContact;

  if (params.contactId) {
    contact = await hubspotRequest<HubSpotContact>(
      `/crm/v3/objects/contacts/${params.contactId}?properties=email,firstname,lastname,phone,company,jobtitle,hs_linkedin_url,notes,createdate,lastmodifieddate`
    );
  } else {
    // Search by email
    const searchResult = await hubspotRequest<HubSpotSearchResult>(
      "/crm/v3/objects/contacts/search",
      {
        method: "POST",
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: "email",
              operator: "EQ",
              value: params.email,
            }],
          }],
          properties: ["email", "firstname", "lastname", "phone", "company", "jobtitle", "hs_linkedin_url", "notes", "createdate", "lastmodifieddate"],
        }),
      }
    );

    if (searchResult.results.length === 0) {
      return `No contact found with email: ${params.email}`;
    }
    contact = searchResult.results[0];
  }

  return formatContactResponse(contact, "found");
}

export async function searchContacts(params: z.infer<typeof SearchContactsSchema>): Promise<string> {
  const result = await hubspotRequest<HubSpotSearchResult>(
    "/crm/v3/objects/contacts/search",
    {
      method: "POST",
      body: JSON.stringify({
        query: params.query,
        limit: params.limit,
        properties: ["email", "firstname", "lastname", "phone", "company", "jobtitle"],
      }),
    }
  );

  if (result.results.length === 0) {
    return `No contacts found matching: "${params.query}"`;
  }

  const contacts = result.results.map((c) => {
    const name = [c.properties.firstname, c.properties.lastname].filter(Boolean).join(" ") || "Unknown";
    return `- **${name}** (ID: ${c.id})
  Email: ${c.properties.email || "N/A"}
  Company: ${c.properties.company || "N/A"}
  Title: ${c.properties.jobtitle || "N/A"}`;
  }).join("\n\n");

  return `# Search Results for "${params.query}"

Found ${result.total} contact(s):

${contacts}`;
}

export async function createDeal(params: z.infer<typeof CreateDealSchema>): Promise<string> {
  const properties: Record<string, string | number> = {
    dealname: params.dealName,
  };

  if (params.pipeline) properties.pipeline = params.pipeline;
  if (params.stage) properties.dealstage = params.stage;
  if (params.amount) properties.amount = params.amount;
  if (params.closeDate) properties.closedate = params.closeDate;
  if (params.notes) properties.notes = params.notes;

  const result = await hubspotRequest<HubSpotDeal>("/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  // Associate with contact if provided
  if (params.contactId) {
    await hubspotRequest(
      `/crm/v3/objects/deals/${result.id}/associations/contacts/${params.contactId}/deal_to_contact`,
      { method: "PUT" }
    );
  }

  // Associate with company if provided
  if (params.companyId) {
    await hubspotRequest(
      `/crm/v3/objects/deals/${result.id}/associations/companies/${params.companyId}/deal_to_company`,
      { method: "PUT" }
    );
  }

  return formatDealResponse(result, "created", params.contactId, params.companyId);
}

export async function updateDeal(params: z.infer<typeof UpdateDealSchema>): Promise<string> {
  const properties: Record<string, string | number> = {};

  if (params.dealName) properties.dealname = params.dealName;
  if (params.stage) properties.dealstage = params.stage;
  if (params.amount) properties.amount = params.amount;
  if (params.closeDate) properties.closedate = params.closeDate;
  if (params.notes) properties.notes = params.notes;

  const result = await hubspotRequest<HubSpotDeal>(
    `/crm/v3/objects/deals/${params.dealId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    }
  );

  return formatDealResponse(result, "updated");
}

export async function logActivity(params: z.infer<typeof LogActivitySchema>): Promise<string> {
  const timestamp = params.timestamp || new Date().toISOString();

  const activityTypeMap = {
    email: "emails",
    call: "calls",
    meeting: "meetings",
    note: "notes",
  };

  const objectType = activityTypeMap[params.activityType];

  let properties: Record<string, string>;

  if (params.activityType === "note") {
    properties = {
      hs_note_body: params.body,
      hs_timestamp: timestamp,
    };
  } else if (params.activityType === "email") {
    properties = {
      hs_email_subject: params.subject,
      hs_email_text: params.body,
      hs_email_direction: "OUTBOUND",
      hs_timestamp: timestamp,
    };
  } else if (params.activityType === "call") {
    properties = {
      hs_call_title: params.subject,
      hs_call_body: params.body,
      hs_call_direction: "OUTBOUND",
      hs_timestamp: timestamp,
    };
  } else {
    // meeting
    properties = {
      hs_meeting_title: params.subject,
      hs_meeting_body: params.body,
      hs_timestamp: timestamp,
    };
  }

  const result = await hubspotRequest<{ id: string }>(
    `/crm/v3/objects/${objectType}`,
    {
      method: "POST",
      body: JSON.stringify({ properties }),
    }
  );

  // Associate with contact
  await hubspotRequest(
    `/crm/v3/objects/${objectType}/${result.id}/associations/contacts/${params.contactId}/${objectType.slice(0, -1)}_to_contact`,
    { method: "PUT" }
  );

  // Associate with deal if provided
  if (params.dealId) {
    await hubspotRequest(
      `/crm/v3/objects/${objectType}/${result.id}/associations/deals/${params.dealId}/${objectType.slice(0, -1)}_to_deal`,
      { method: "PUT" }
    );
  }

  return `# Activity Logged ✓

**Type:** ${params.activityType}
**Subject:** ${params.subject}
**Contact ID:** ${params.contactId}
${params.dealId ? `**Deal ID:** ${params.dealId}` : ""}
**Activity ID:** ${result.id}
**Timestamp:** ${timestamp}

---

**Details:**
${params.body}`;
}

interface HubSpotPipeline {
  id: string;
  label: string;
  displayOrder: number;
  stages: Array<{
    id: string;
    label: string;
    displayOrder: number;
    metadata: {
      isClosed?: string;
      probability?: string;
    };
  }>;
}

interface HubSpotPipelinesResponse {
  results: HubSpotPipeline[];
}

export async function getPipelines(params: z.infer<typeof GetPipelineSchema>): Promise<string> {
  const result = await hubspotRequest<HubSpotPipelinesResponse>("/crm/v3/pipelines/deals");

  if (params.pipelineId) {
    const pipeline = result.results.find((p) => p.id === params.pipelineId);
    if (!pipeline) {
      return `Pipeline not found: ${params.pipelineId}`;
    }
    return formatPipelineResponse(pipeline);
  }

  const pipelines = result.results.map(formatPipelineResponse).join("\n\n---\n\n");

  return `# Deal Pipelines

${pipelines}`;
}

// ============================================================================
// FORMATTING HELPERS
// ============================================================================

function formatContactResponse(contact: HubSpotContact, action: string): string {
  const p = contact.properties;
  const name = [p.firstname, p.lastname].filter(Boolean).join(" ") || "Unknown";

  return `# Contact ${action.charAt(0).toUpperCase() + action.slice(1)} ✓

**ID:** ${contact.id}
**Name:** ${name}
**Email:** ${p.email || "N/A"}
**Phone:** ${p.phone || "N/A"}
**Company:** ${p.company || "N/A"}
**Title:** ${p.jobtitle || "N/A"}
${p.hs_linkedin_url ? `**LinkedIn:** ${p.hs_linkedin_url}` : ""}
${p.notes ? `\n**Notes:** ${p.notes}` : ""}

---

**Created:** ${p.createdate || "N/A"}
**Last Modified:** ${p.lastmodifieddate || "N/A"}

[View in HubSpot](https://app.hubspot.com/contacts/${contact.id})`;
}

function formatDealResponse(
  deal: HubSpotDeal,
  action: string,
  contactId?: string,
  companyId?: string
): string {
  const p = deal.properties;

  return `# Deal ${action.charAt(0).toUpperCase() + action.slice(1)} ✓

**ID:** ${deal.id}
**Name:** ${p.dealname || "Unnamed Deal"}
**Stage:** ${p.dealstage || "N/A"}
**Amount:** ${p.amount ? `$${Number(p.amount).toLocaleString()}` : "N/A"}
**Close Date:** ${p.closedate || "N/A"}
${p.notes ? `**Notes:** ${p.notes}` : ""}

---

**Associated Contact ID:** ${contactId || "None"}
**Associated Company ID:** ${companyId || "None"}

**Created:** ${p.createdate || "N/A"}
**Last Modified:** ${p.hs_lastmodifieddate || "N/A"}

[View in HubSpot](https://app.hubspot.com/deals/${deal.id})`;
}

function formatPipelineResponse(pipeline: HubSpotPipeline): string {
  const stages = pipeline.stages
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((s) => {
      const prob = s.metadata.probability ? ` (${s.metadata.probability}% prob)` : "";
      const closed = s.metadata.isClosed === "true" ? " [CLOSED]" : "";
      return `  ${s.displayOrder + 1}. **${s.label}**${prob}${closed}\n     ID: \`${s.id}\``;
    })
    .join("\n");

  return `## ${pipeline.label}
**Pipeline ID:** \`${pipeline.id}\`

**Stages:**
${stages}`;
}

// ============================================================================
// TOOL DEFINITIONS FOR MCP
// ============================================================================

export const hubspotTools = [
  {
    name: "hubspot_create_contact",
    description: "Create a new contact in HubSpot CRM",
    inputSchema: {
      type: "object",
      properties: {
        email: { type: "string", description: "Contact's email address (required)" },
        firstName: { type: "string", description: "Contact's first name" },
        lastName: { type: "string", description: "Contact's last name" },
        phone: { type: "string", description: "Phone number" },
        company: { type: "string", description: "Company name" },
        jobTitle: { type: "string", description: "Job title" },
        linkedinUrl: { type: "string", description: "LinkedIn profile URL" },
        notes: { type: "string", description: "Notes about the contact" },
      },
      required: ["email"],
    },
  },
  {
    name: "hubspot_update_contact",
    description: "Update an existing contact in HubSpot",
    inputSchema: {
      type: "object",
      properties: {
        contactId: { type: "string", description: "HubSpot contact ID to update" },
        email: { type: "string", description: "Updated email" },
        firstName: { type: "string", description: "Updated first name" },
        lastName: { type: "string", description: "Updated last name" },
        phone: { type: "string", description: "Updated phone" },
        company: { type: "string", description: "Updated company" },
        jobTitle: { type: "string", description: "Updated job title" },
        notes: { type: "string", description: "Updated notes" },
      },
      required: ["contactId"],
    },
  },
  {
    name: "hubspot_get_contact",
    description: "Get a contact from HubSpot by ID or email",
    inputSchema: {
      type: "object",
      properties: {
        contactId: { type: "string", description: "HubSpot contact ID" },
        email: { type: "string", description: "Contact email to search" },
      },
    },
  },
  {
    name: "hubspot_search_contacts",
    description: "Search for contacts in HubSpot",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query (name, email, or company)" },
        limit: { type: "number", description: "Max results to return (default 10)" },
      },
      required: ["query"],
    },
  },
  {
    name: "hubspot_create_deal",
    description: "Create a new deal in HubSpot",
    inputSchema: {
      type: "object",
      properties: {
        dealName: { type: "string", description: "Name of the deal" },
        pipeline: { type: "string", description: "Pipeline ID" },
        stage: { type: "string", description: "Deal stage ID" },
        amount: { type: "number", description: "Deal amount" },
        closeDate: { type: "string", description: "Expected close date (YYYY-MM-DD)" },
        contactId: { type: "string", description: "Associated contact ID" },
        companyId: { type: "string", description: "Associated company ID" },
        notes: { type: "string", description: "Deal notes" },
      },
      required: ["dealName"],
    },
  },
  {
    name: "hubspot_update_deal",
    description: "Update a deal in HubSpot",
    inputSchema: {
      type: "object",
      properties: {
        dealId: { type: "string", description: "HubSpot deal ID to update" },
        dealName: { type: "string", description: "Updated deal name" },
        stage: { type: "string", description: "Updated stage ID" },
        amount: { type: "number", description: "Updated amount" },
        closeDate: { type: "string", description: "Updated close date" },
        notes: { type: "string", description: "Updated notes" },
      },
      required: ["dealId"],
    },
  },
  {
    name: "hubspot_log_activity",
    description: "Log an activity (email, call, meeting, note) in HubSpot",
    inputSchema: {
      type: "object",
      properties: {
        contactId: { type: "string", description: "Contact ID to log activity for" },
        activityType: { type: "string", enum: ["email", "call", "meeting", "note"], description: "Type of activity" },
        subject: { type: "string", description: "Activity subject/title" },
        body: { type: "string", description: "Activity details/notes" },
        timestamp: { type: "string", description: "When the activity occurred (ISO 8601)" },
        dealId: { type: "string", description: "Associated deal ID" },
      },
      required: ["contactId", "activityType", "subject", "body"],
    },
  },
  {
    name: "hubspot_get_pipelines",
    description: "Get deal pipelines and stages from HubSpot",
    inputSchema: {
      type: "object",
      properties: {
        pipelineId: { type: "string", description: "Specific pipeline ID (returns all if omitted)" },
      },
    },
  },
];

// ============================================================================
// TOOL HANDLER
// ============================================================================

export async function handleHubSpotTool(name: string, args: unknown): Promise<string> {
  switch (name) {
    case "hubspot_create_contact":
      return createContact(CreateContactSchema.parse(args));
    case "hubspot_update_contact":
      return updateContact(UpdateContactSchema.parse(args));
    case "hubspot_get_contact":
      return getContact(GetContactSchema.parse(args));
    case "hubspot_search_contacts":
      return searchContacts(SearchContactsSchema.parse(args));
    case "hubspot_create_deal":
      return createDeal(CreateDealSchema.parse(args));
    case "hubspot_update_deal":
      return updateDeal(UpdateDealSchema.parse(args));
    case "hubspot_log_activity":
      return logActivity(LogActivitySchema.parse(args));
    case "hubspot_get_pipelines":
      return getPipelines(GetPipelineSchema.parse(args));
    default:
      throw new Error(`Unknown HubSpot tool: ${name}`);
  }
}

// Check if HubSpot is configured
export function isHubSpotConfigured(): boolean {
  return !!process.env.HUBSPOT_API_KEY;
}
