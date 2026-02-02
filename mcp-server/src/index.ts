#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Integrations
import { hubspotTools, handleHubSpotTool, isHubSpotConfigured } from "./integrations/hubspot.js";

// Get current directory for loading UI files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// UI Resource definitions for MCP Apps
const uiResources = [
  {
    uri: "ui://gtm/email-composer",
    name: "Email Composer",
    description: "Interactive cold email composer with tone selection and copy",
    mimeType: "text/html",
    file: "email-composer.html",
  },
  {
    uri: "ui://gtm/linkedin-message",
    name: "LinkedIn Message",
    description: "LinkedIn message composer with character count",
    mimeType: "text/html",
    file: "linkedin-message.html",
  },
  {
    uri: "ui://gtm/company-card",
    name: "Company Research Card",
    description: "Interactive company research card with checklists",
    mimeType: "text/html",
    file: "company-card.html",
  },
  {
    uri: "ui://gtm/lead-profile",
    name: "Lead Profile",
    description: "Lead research profile with personalization hooks",
    mimeType: "text/html",
    file: "lead-profile.html",
  },
  {
    uri: "ui://gtm/objection-handler",
    name: "Objection Handler",
    description: "Step-by-step objection response framework",
    mimeType: "text/html",
    file: "objection-handler.html",
  },
  {
    uri: "ui://gtm/sequence-timeline",
    name: "Follow-Up Sequence",
    description: "Visual timeline for follow-up email sequences",
    mimeType: "text/html",
    file: "sequence-timeline.html",
  },
];

// Tool input schemas
const ResearchCompanySchema = z.object({
  companyName: z.string().describe("Name of the company to research"),
  industry: z.string().optional().describe("Industry if known"),
  focusAreas: z.array(z.string()).optional().describe("Specific areas to focus on"),
});

const ResearchLeadSchema = z.object({
  name: z.string().describe("Name of the person"),
  title: z.string().optional().describe("Job title"),
  company: z.string().describe("Company they work at"),
  linkedinUrl: z.string().optional().describe("LinkedIn profile URL"),
});

const DraftColdEmailSchema = z.object({
  recipientName: z.string().describe("Name of the recipient"),
  recipientTitle: z.string().describe("Job title of the recipient"),
  company: z.string().describe("Company name"),
  painPoint: z.string().describe("Main pain point to address"),
  yourProduct: z.string().describe("What you're selling"),
  signal: z.string().optional().describe("Trigger event or signal"),
  tone: z.enum(["professional", "casual", "direct", "consultative"]).optional(),
});

const DraftLinkedInMessageSchema = z.object({
  recipientName: z.string().describe("Name of the recipient"),
  recipientTitle: z.string().describe("Job title"),
  company: z.string().describe("Company name"),
  connectionReason: z.string().describe("Why you want to connect"),
  messageType: z.enum(["connection_request", "inmail", "follow_up"]),
  mutualConnection: z.string().optional().describe("Mutual connection if any"),
});

const HandleObjectionSchema = z.object({
  objection: z.string().describe("The exact objection received"),
  context: z.string().describe("Context about the deal/conversation"),
  yourProduct: z.string().describe("What you're selling"),
  competitorMentioned: z.string().optional().describe("Competitor if mentioned"),
});

const GenerateColdCallScriptSchema = z.object({
  targetTitle: z.string().describe("Title of person you're calling"),
  company: z.string().describe("Company name"),
  painPoint: z.string().describe("Main pain point"),
  yourProduct: z.string().describe("What you're selling"),
  callObjective: z.enum(["book_meeting", "qualify", "discovery"]),
});

const GenerateDiscoveryQuestionsSchema = z.object({
  prospect: z.string().describe("Company/person name"),
  industry: z.string().describe("Their industry"),
  yourProduct: z.string().describe("What you sell"),
  dealStage: z.string().describe("Current stage in sales process"),
  knownPainPoints: z.array(z.string()).optional().describe("Pain points already identified"),
});

const CreateFollowUpSequenceSchema = z.object({
  recipientName: z.string().describe("Name of the recipient"),
  company: z.string().describe("Company name"),
  lastInteraction: z.string().describe("What happened in last interaction"),
  daysSinceContact: z.number().describe("Days since last contact"),
  dealValue: z.string().optional().describe("Approximate deal value"),
});

const BuildValuePropositionSchema = z.object({
  yourProduct: z.string().describe("What you sell"),
  targetPersona: z.string().describe("Who you're selling to"),
  painPoints: z.array(z.string()).describe("Problems you solve"),
  differentiators: z.array(z.string()).describe("What makes you different"),
  proofPoints: z.array(z.string()).optional().describe("Customer results/metrics"),
});

const AnalyzeCompetitorSchema = z.object({
  competitor: z.string().describe("Competitor name"),
  yourProduct: z.string().describe("What you sell"),
  dealContext: z.string().optional().describe("Context of the competitive deal"),
});

// Create server
const server = new Server(
  {
    name: "gtm-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      prompts: {},
      resources: {},
    },
  }
);

// List UI resources for MCP Apps
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: uiResources.map((r) => ({
      uri: r.uri,
      name: r.name,
      description: r.description,
      mimeType: r.mimeType,
    })),
  };
});

// Read UI resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  const resource = uiResources.find((r) => r.uri === uri);

  if (!resource) {
    throw new Error(`Resource not found: ${uri}`);
  }

  // Read the HTML file
  const filePath = join(__dirname, "ui", resource.file);
  let content: string;

  try {
    content = readFileSync(filePath, "utf-8");
  } catch {
    // Fallback: try from src/ui if running in dev mode
    const devPath = join(__dirname, "..", "src", "ui", resource.file);
    content = readFileSync(devPath, "utf-8");
  }

  return {
    contents: [
      {
        uri: resource.uri,
        mimeType: resource.mimeType,
        text: content,
      },
    ],
  };
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  // Base GTM content generation tools
  const gtmTools = [
      {
        name: "research_company",
        description: "Research a company for sales outreach - finds key info, news, pain points, and outreach angles",
        inputSchema: {
          type: "object",
          properties: {
            companyName: { type: "string", description: "Name of the company to research" },
            industry: { type: "string", description: "Industry if known" },
            focusAreas: { type: "array", items: { type: "string" }, description: "Specific areas to focus on" },
          },
          required: ["companyName"],
        },
        _meta: { "ui/resourceUri": "ui://gtm/company-card" },
      },
      {
        name: "research_lead",
        description: "Research a specific person/lead - background, interests, talking points",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Name of the person" },
            title: { type: "string", description: "Job title" },
            company: { type: "string", description: "Company they work at" },
            linkedinUrl: { type: "string", description: "LinkedIn profile URL" },
          },
          required: ["name", "company"],
        },
        _meta: { "ui/resourceUri": "ui://gtm/lead-profile" },
      },
      {
        name: "draft_cold_email",
        description: "Draft a personalized cold email based on research and context",
        inputSchema: {
          type: "object",
          properties: {
            recipientName: { type: "string", description: "Name of the recipient" },
            recipientTitle: { type: "string", description: "Job title of the recipient" },
            company: { type: "string", description: "Company name" },
            painPoint: { type: "string", description: "Main pain point to address" },
            yourProduct: { type: "string", description: "What you're selling" },
            signal: { type: "string", description: "Trigger event or signal" },
            tone: { type: "string", enum: ["professional", "casual", "direct", "consultative"] },
          },
          required: ["recipientName", "recipientTitle", "company", "painPoint", "yourProduct"],
        },
        _meta: { "ui/resourceUri": "ui://gtm/email-composer" },
      },
      {
        name: "draft_linkedin_message",
        description: "Draft a LinkedIn connection request or message",
        inputSchema: {
          type: "object",
          properties: {
            recipientName: { type: "string", description: "Name of the recipient" },
            recipientTitle: { type: "string", description: "Job title" },
            company: { type: "string", description: "Company name" },
            connectionReason: { type: "string", description: "Why you want to connect" },
            messageType: { type: "string", enum: ["connection_request", "inmail", "follow_up"] },
            mutualConnection: { type: "string", description: "Mutual connection if any" },
          },
          required: ["recipientName", "recipientTitle", "company", "connectionReason", "messageType"],
        },
        _meta: { "ui/resourceUri": "ui://gtm/linkedin-message" },
      },
      {
        name: "handle_objection",
        description: "Get strategic responses to sales objections",
        inputSchema: {
          type: "object",
          properties: {
            objection: { type: "string", description: "The exact objection received" },
            context: { type: "string", description: "Context about the deal/conversation" },
            yourProduct: { type: "string", description: "What you're selling" },
            competitorMentioned: { type: "string", description: "Competitor if mentioned" },
          },
          required: ["objection", "context", "yourProduct"],
        },
        _meta: { "ui/resourceUri": "ui://gtm/objection-handler" },
      },
      {
        name: "generate_cold_call_script",
        description: "Generate a cold call script with opener, talk track, and objection handling",
        inputSchema: {
          type: "object",
          properties: {
            targetTitle: { type: "string", description: "Title of person you're calling" },
            company: { type: "string", description: "Company name" },
            painPoint: { type: "string", description: "Main pain point" },
            yourProduct: { type: "string", description: "What you're selling" },
            callObjective: { type: "string", enum: ["book_meeting", "qualify", "discovery"] },
          },
          required: ["targetTitle", "company", "painPoint", "yourProduct", "callObjective"],
        },
      },
      {
        name: "generate_discovery_questions",
        description: "Generate discovery questions tailored to the prospect and deal stage",
        inputSchema: {
          type: "object",
          properties: {
            prospect: { type: "string", description: "Company/person name" },
            industry: { type: "string", description: "Their industry" },
            yourProduct: { type: "string", description: "What you sell" },
            dealStage: { type: "string", description: "Current stage in sales process" },
            knownPainPoints: { type: "array", items: { type: "string" }, description: "Pain points already identified" },
          },
          required: ["prospect", "industry", "yourProduct", "dealStage"],
        },
      },
      {
        name: "create_follow_up_sequence",
        description: "Create a follow-up email sequence for re-engagement",
        inputSchema: {
          type: "object",
          properties: {
            recipientName: { type: "string", description: "Name of the recipient" },
            company: { type: "string", description: "Company name" },
            lastInteraction: { type: "string", description: "What happened in last interaction" },
            daysSinceContact: { type: "number", description: "Days since last contact" },
            dealValue: { type: "string", description: "Approximate deal value" },
          },
          required: ["recipientName", "company", "lastInteraction", "daysSinceContact"],
        },
        _meta: { "ui/resourceUri": "ui://gtm/sequence-timeline" },
      },
      {
        name: "build_value_proposition",
        description: "Build tailored value propositions for different personas",
        inputSchema: {
          type: "object",
          properties: {
            yourProduct: { type: "string", description: "What you sell" },
            targetPersona: { type: "string", description: "Who you're selling to" },
            painPoints: { type: "array", items: { type: "string" }, description: "Problems you solve" },
            differentiators: { type: "array", items: { type: "string" }, description: "What makes you different" },
            proofPoints: { type: "array", items: { type: "string" }, description: "Customer results/metrics" },
          },
          required: ["yourProduct", "targetPersona", "painPoints", "differentiators"],
        },
      },
      {
        name: "analyze_competitor",
        description: "Analyze a competitor and generate competitive positioning",
        inputSchema: {
          type: "object",
          properties: {
            competitor: { type: "string", description: "Competitor name" },
            yourProduct: { type: "string", description: "What you sell" },
            dealContext: { type: "string", description: "Context of the competitive deal" },
          },
          required: ["competitor", "yourProduct"],
        },
      },
    ];

  // Add HubSpot tools if configured
  const allTools = isHubSpotConfigured()
    ? [...gtmTools, ...hubspotTools]
    : gtmTools;

  return { tools: allTools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "research_company": {
      const { companyName, industry, focusAreas } = ResearchCompanySchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateCompanyResearch(companyName, industry, focusAreas),
          },
        ],
      };
    }

    case "research_lead": {
      const { name: personName, title, company, linkedinUrl } = ResearchLeadSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateLeadResearch(personName, company, title, linkedinUrl),
          },
        ],
      };
    }

    case "draft_cold_email": {
      const params = DraftColdEmailSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateColdEmail(params),
          },
        ],
      };
    }

    case "draft_linkedin_message": {
      const params = DraftLinkedInMessageSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateLinkedInMessage(params),
          },
        ],
      };
    }

    case "handle_objection": {
      const params = HandleObjectionSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateObjectionResponse(params),
          },
        ],
      };
    }

    case "generate_cold_call_script": {
      const params = GenerateColdCallScriptSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateColdCallScript(params),
          },
        ],
      };
    }

    case "generate_discovery_questions": {
      const params = GenerateDiscoveryQuestionsSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateDiscoveryQuestions(params),
          },
        ],
      };
    }

    case "create_follow_up_sequence": {
      const params = CreateFollowUpSequenceSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateFollowUpSequence(params),
          },
        ],
      };
    }

    case "build_value_proposition": {
      const params = BuildValuePropositionSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateValueProposition(params),
          },
        ],
      };
    }

    case "analyze_competitor": {
      const params = AnalyzeCompetitorSchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: generateCompetitorAnalysis(params),
          },
        ],
      };
    }

    default:
      // Check if it's a HubSpot tool
      if (name.startsWith("hubspot_") && isHubSpotConfigured()) {
        const result = await handleHubSpotTool(name, args);
        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      }
      throw new Error(`Unknown tool: ${name}`);
  }
});

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "prospecting_workflow",
        description: "Complete prospecting workflow for a target account",
        arguments: [
          { name: "company", description: "Target company name", required: true },
          { name: "persona", description: "Target persona/title", required: true },
          { name: "product", description: "What you're selling", required: true },
        ],
      },
      {
        name: "deal_strategy",
        description: "Strategic plan for advancing a deal",
        arguments: [
          { name: "company", description: "Prospect company", required: true },
          { name: "stage", description: "Current deal stage", required: true },
          { name: "blockers", description: "Current blockers", required: false },
        ],
      },
      {
        name: "competitive_battle_card",
        description: "Generate a competitive battle card",
        arguments: [
          { name: "competitor", description: "Competitor name", required: true },
          { name: "product", description: "Your product", required: true },
        ],
      },
      {
        name: "account_strategy",
        description: "Full account strategy with stakeholder mapping and multi-channel outreach plan",
        arguments: [
          { name: "company", description: "Target account name", required: true },
          { name: "industry", description: "Company's industry", required: true },
          { name: "product", description: "What you're selling", required: true },
          { name: "deal_size", description: "Expected deal size", required: false },
        ],
      },
      {
        name: "competitive_deal_workflow",
        description: "Full competitive deal strategy when facing a known competitor",
        arguments: [
          { name: "company", description: "Prospect company", required: true },
          { name: "competitor", description: "Competitor you're facing", required: true },
          { name: "product", description: "Your product", required: true },
          { name: "deal_stage", description: "Current stage of the deal", required: true },
        ],
      },
      {
        name: "reengagement_workflow",
        description: "Strategy to re-engage a cold or stalled opportunity",
        arguments: [
          { name: "company", description: "Prospect company", required: true },
          { name: "contact_name", description: "Primary contact name", required: true },
          { name: "last_interaction", description: "What happened last", required: true },
          { name: "days_since_contact", description: "Days since last contact", required: true },
        ],
      },
      {
        name: "enterprise_expansion",
        description: "Strategy to expand within an existing account",
        arguments: [
          { name: "company", description: "Customer company name", required: true },
          { name: "current_product", description: "What they currently use from you", required: true },
          { name: "expansion_target", description: "What you want to sell them next", required: true },
          { name: "champion", description: "Your internal champion name/title", required: false },
        ],
      },
      {
        name: "full_sales_cycle",
        description: "End-to-end sales cycle orchestration from cold to close",
        arguments: [
          { name: "company", description: "Target company", required: true },
          { name: "persona", description: "Target persona/title", required: true },
          { name: "product", description: "What you're selling", required: true },
          { name: "pain_point", description: "Primary pain point to address", required: true },
        ],
      },
      {
        name: "objection_battlecard",
        description: "Comprehensive objection handling playbook for a specific deal",
        arguments: [
          { name: "company", description: "Prospect company", required: true },
          { name: "product", description: "What you're selling", required: true },
          { name: "deal_context", description: "Context about the deal", required: true },
        ],
      },
    ],
  };
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "prospecting_workflow":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Run a complete prospecting workflow for ${args?.company || "[COMPANY]"}.

Target persona: ${args?.persona || "[PERSONA]"}
Product: ${args?.product || "[PRODUCT]"}

Execute these steps:
1. Research the company (use research_company tool)
2. Identify key contacts to reach
3. Research the primary contact (use research_lead tool)
4. Draft a personalized cold email (use draft_cold_email tool)
5. Draft a LinkedIn connection request (use draft_linkedin_message tool)
6. Generate discovery questions for when they respond

Provide a complete prospecting package I can execute.`,
            },
          },
        ],
      };

    case "deal_strategy":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a deal strategy for ${args?.company || "[COMPANY]"}.

Current stage: ${args?.stage || "[STAGE]"}
Known blockers: ${args?.blockers || "None specified"}

Analyze the situation and provide:
1. Current deal health assessment
2. Key risks and mitigation strategies
3. Stakeholder map and engagement plan
4. Next best actions with timeline
5. Resources/support needed
6. Competitive positioning if relevant`,
            },
          },
        ],
      };

    case "competitive_battle_card":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a competitive battle card for ${args?.competitor || "[COMPETITOR]"}.

Your product: ${args?.product || "[PRODUCT]"}

Include:
1. Competitor overview (what they do, positioning)
2. Their strengths (be honest)
3. Their weaknesses (opportunities for us)
4. Common objections when competing against them
5. Landmine questions to plant with prospects
6. Win themes and talk tracks
7. When to walk away (bad fit indicators)`,
            },
          },
        ],
      };

    case "account_strategy":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a comprehensive account strategy for ${args?.company || "[COMPANY]"}.

Industry: ${args?.industry || "[INDUSTRY]"}
Product: ${args?.product || "[PRODUCT]"}
${args?.deal_size ? `Expected deal size: ${args.deal_size}` : ""}

Execute this multi-step workflow:

## Phase 1: Account Intelligence
1. Use research_company to deeply research ${args?.company || "[COMPANY]"}
2. Identify their strategic priorities and challenges
3. Map their technology stack and current solutions

## Phase 2: Stakeholder Mapping
Create a power map with:
- Economic Buyer (who controls budget)
- Technical Buyer (who evaluates capabilities)
- User Buyer (who uses the product)
- Champion (who will advocate internally)
- Blocker (who might resist)

For each stakeholder, identify:
- Name and title
- Their priorities and pain points
- How our product benefits them specifically
- Potential concerns they might have

## Phase 3: Multi-Channel Engagement Plan
For each key stakeholder:
1. Draft personalized cold email (use draft_cold_email tool)
2. Draft LinkedIn approach (use draft_linkedin_message tool)
3. Generate discovery questions specific to their role

## Phase 4: Account Timeline
Create a 30-day engagement sequence:
- Week 1: Initial outreach to champion
- Week 2: Expand to second stakeholder
- Week 3: Multi-thread to economic buyer
- Week 4: Consolidate and book group meeting

## Phase 5: Success Metrics
Define:
- Key milestones for this account
- Warning signs of stalled deal
- Resources needed to win

Provide a complete, actionable account strategy.`,
            },
          },
        ],
      };

    case "competitive_deal_workflow":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a competitive deal strategy for winning against ${args?.competitor || "[COMPETITOR]"} at ${args?.company || "[COMPANY]"}.

Your product: ${args?.product || "[PRODUCT]"}
Current deal stage: ${args?.deal_stage || "[STAGE]"}

Execute this workflow:

## Step 1: Competitive Intelligence
Use analyze_competitor to build a detailed competitive profile:
- Their positioning and messaging
- Where they typically win/lose
- Pricing model and approach
- Customer complaints and weaknesses

## Step 2: Deal Positioning Strategy
Based on the competitive analysis:
1. Identify your key differentiation points
2. Craft talk tracks that highlight your advantages
3. Prepare responses for "why not ${args?.competitor || "[COMPETITOR]"}?"

## Step 3: Landmine Questions
Create questions to plant with the prospect that will:
- Expose ${args?.competitor || "[COMPETITOR]"}'s weaknesses
- Highlight your strengths
- Get the prospect thinking about criteria that favor you

## Step 4: Objection Preparation
Use handle_objection for common scenarios:
- "We like ${args?.competitor || "[COMPETITOR]"}'s approach"
- "They're cheaper"
- "We already use them for X"
- "Our team knows them"

## Step 5: Champion Enablement
Create materials to help your internal champion:
- One-page comparison guide
- ROI calculator talking points
- Success stories vs. ${args?.competitor || "[COMPETITOR]"} switches

## Step 6: Win Plan
- Key actions to take this week
- Resources to deploy
- Executive support needed
- Timeline to decision

Build a complete competitive playbook for this deal.`,
            },
          },
        ],
      };

    case "reengagement_workflow":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a re-engagement strategy for ${args?.company || "[COMPANY]"}.

Contact: ${args?.contact_name || "[CONTACT]"}
Last interaction: ${args?.last_interaction || "[LAST INTERACTION]"}
Days since contact: ${args?.days_since_contact || "[DAYS]"}

Execute this workflow:

## Step 1: Situation Analysis
Assess why the deal may have stalled:
- Was it timing, budget, priority, or something else?
- What signals indicated interest before?
- What might have changed?

## Step 2: Fresh Research
Use research_company to find:
- Recent news about ${args?.company || "[COMPANY]"}
- New trigger events (funding, hiring, leadership changes)
- Industry changes that might create urgency
- New pain points they might be experiencing

## Step 3: New Angle Development
Based on research, identify:
- A new reason to reach out (not just "following up")
- Fresh value you can offer
- Different stakeholder to approach
- Updated positioning based on market changes

## Step 4: Multi-Touch Re-engagement Sequence
Use create_follow_up_sequence to build:
- Email 1: New insight or trigger-based outreach
- Email 2: Value-add resource sharing
- Email 3: Different angle or ask
- Email 4: Break-up email (creates urgency)

## Step 5: Alternative Channels
- Draft LinkedIn message with new approach
- Plan phone call strategy
- Consider warm introduction paths

## Step 6: If No Response Plan
- When to mark as truly cold
- How to set up future triggers
- Whether to approach different stakeholders

Provide a complete re-engagement playbook with specific messaging.`,
            },
          },
        ],
      };

    case "enterprise_expansion":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create an enterprise expansion strategy for ${args?.company || "[COMPANY]"}.

Current product: ${args?.current_product || "[CURRENT PRODUCT]"}
Expansion target: ${args?.expansion_target || "[EXPANSION TARGET]"}
${args?.champion ? `Champion: ${args.champion}` : ""}

Execute this workflow:

## Step 1: Current Account Health
Assess:
- How happy are they with current product?
- Who are the power users?
- What results have they achieved?
- Any outstanding issues or concerns?

## Step 2: Expansion Opportunity Analysis
- Why would they benefit from ${args?.expansion_target || "[EXPANSION TARGET]"}?
- What pain points does it solve?
- How does it complement what they already have?
- What's the expected ROI?

## Step 3: Stakeholder Expansion
Identify new stakeholders for expansion:
- Who owns the budget for this new area?
- Who would use the new product?
- Who might block expansion?
- Who can champion internally?

For each new stakeholder:
- Use research_lead to understand their priorities
- Draft personalized outreach

## Step 4: Champion Enablement
Help your champion sell internally:
- Business case document outline
- Talk tracks for internal conversations
- Objection responses for internal stakeholders
- Success metrics to highlight

## Step 5: Value Proposition Tailoring
Use build_value_proposition to create:
- Expansion-specific messaging
- Cross-sell vs. upsell positioning
- Bundle pricing justification
- Integration benefits

## Step 6: Expansion Discovery
Generate discovery questions to:
- Understand new department's specific needs
- Identify decision-making process for expansion
- Uncover potential blockers
- Quantify the opportunity

## Step 7: Expansion Timeline
- Week 1-2: Champion alignment
- Week 3-4: New stakeholder outreach
- Week 5-6: Discovery with new team
- Week 7-8: Proposal and negotiation

Provide a complete expansion playbook.`,
            },
          },
        ],
      };

    case "full_sales_cycle":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Orchestrate a complete sales cycle for ${args?.company || "[COMPANY]"}.

Target persona: ${args?.persona || "[PERSONA]"}
Product: ${args?.product || "[PRODUCT]"}
Pain point: ${args?.pain_point || "[PAIN POINT]"}

Execute the full GTM workflow:

## PHASE 1: PROSPECTING

### 1.1 Account Research
Use research_company to gather:
- Company overview and recent news
- Technology stack and current solutions
- Growth trajectory and priorities
- Potential pain points matching ${args?.pain_point || "[PAIN POINT]"}

### 1.2 Contact Research
Use research_lead for the ${args?.persona || "[PERSONA]"}:
- Background and career history
- Recent activity and interests
- Personalization hooks

### 1.3 Initial Outreach
- Draft cold email (use draft_cold_email) - 3 versions
- Draft LinkedIn connection request
- Create cold call script (use generate_cold_call_script)

---

## PHASE 2: DISCOVERY

### 2.1 Discovery Preparation
Use generate_discovery_questions for:
- Opening rapport questions
- Pain point exploration
- Impact quantification
- Decision process mapping

### 2.2 Value Proposition
Use build_value_proposition to create:
- Persona-specific messaging
- Differentiator talk tracks
- Proof points to share

---

## PHASE 3: EVALUATION

### 3.1 Competitive Positioning
If competitors are involved, use analyze_competitor for:
- Competitive strengths/weaknesses
- Landmine questions
- Win themes

### 3.2 Objection Preparation
Use handle_objection for common objections:
- Price concerns
- Timing/priority
- Competitive comparison
- Risk/change management

---

## PHASE 4: NEGOTIATION & CLOSE

### 4.1 Proposal Strategy
- Value summary tied to their stated pain points
- ROI framework
- Risk mitigation approaches

### 4.2 Closing Plan
- Timeline to decision
- Stakeholder alignment check
- Final objections to address
- Negotiation boundaries

---

## PHASE 5: FOLLOW-UP

### 5.1 If Stalled
Use create_follow_up_sequence for re-engagement

### 5.2 If Won
- Handoff to customer success
- Reference request timeline
- Expansion opportunity identification

Provide complete materials for each phase of the sales cycle.`,
            },
          },
        ],
      };

    case "objection_battlecard":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a comprehensive objection handling battlecard for selling to ${args?.company || "[COMPANY]"}.

Product: ${args?.product || "[PRODUCT]"}
Deal context: ${args?.deal_context || "[CONTEXT]"}

Generate responses for ALL common objections:

## PRICE OBJECTIONS
Use handle_objection for:
1. "It's too expensive"
2. "We don't have budget this quarter"
3. "Competitor X is cheaper"
4. "Can you give us a discount?"

## TIMING OBJECTIONS
Use handle_objection for:
5. "This isn't a priority right now"
6. "We're too busy to implement"
7. "Let's revisit next quarter"
8. "We just bought something else"

## AUTHORITY OBJECTIONS
Use handle_objection for:
9. "I need to talk to my boss"
10. "This would need board approval"
11. "Our IT team needs to evaluate this"
12. "Let me check with the team"

## NEED OBJECTIONS
Use handle_objection for:
13. "We're happy with our current solution"
14. "We built something in-house"
15. "We don't really have this problem"
16. "It's not broken, why fix it?"

## TRUST OBJECTIONS
Use handle_objection for:
17. "I've never heard of your company"
18. "Do you have customers in our industry?"
19. "What if you go out of business?"
20. "That sounds too good to be true"

## COMPETITIVE OBJECTIONS
Use handle_objection for:
21. "We're looking at other options"
22. "Your competitor has better reviews"
23. "We have a relationship with [competitor]"
24. "We've used [competitor] before"

For each objection, provide:
- Empathetic acknowledgment
- Clarifying questions to ask
- Reframe response
- Proof points to share
- When to walk away

Create a complete objection handling playbook.`,
            },
          },
        ],
      };

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
});

// Tool implementation functions
function generateCompanyResearch(companyName: string, industry?: string, focusAreas?: string[]): string {
  const focus = focusAreas?.length ? focusAreas.join(", ") : "general overview";

  return `# Company Research: ${companyName}

## Research Framework
To research ${companyName}${industry ? ` (${industry})` : ""}, gather information on:

### 1. Company Overview
- What does ${companyName} do? (products/services)
- Company size (employees, revenue if public)
- Funding/ownership status
- Headquarters and key locations
- Growth trajectory

### 2. Recent News & Signals
- Search for recent press releases
- Leadership changes
- Product launches
- Funding announcements
- Partnership news
- Hiring trends (check job postings)

### 3. Pain Point Indicators
Based on ${industry || "their industry"}, look for:
- Challenges mentioned in earnings calls (if public)
- Glassdoor reviews mentioning process issues
- Job postings indicating gaps
- Industry-wide challenges affecting them

### 4. Technology Stack
- Check BuiltWith, Wappalyzer, or similar
- Look at job postings for tech requirements
- Check integrations they advertise

### 5. Key Stakeholders
- Executive team (LinkedIn)
- Department heads relevant to your sale
- Recent hires in target department

### 6. Outreach Angles
${focusAreas?.length ? `Focused on: ${focus}` : "General angles to explore"}

**Action Items:**
1. Search "[${companyName}] news" for recent signals
2. Check their LinkedIn company page for updates
3. Review their careers page for hiring patterns
4. Look up key contacts on LinkedIn
5. Check G2/Capterra if they're a software company

Use these findings to personalize your outreach.`;
}

function generateLeadResearch(name: string, company: string, title?: string, linkedinUrl?: string): string {
  return `# Lead Research: ${name}

## Profile Summary
- **Name:** ${name}
- **Title:** ${title || "Unknown - find on LinkedIn"}
- **Company:** ${company}
${linkedinUrl ? `- **LinkedIn:** ${linkedinUrl}` : ""}

## Research Checklist

### 1. Professional Background
- [ ] Current role and tenure at ${company}
- [ ] Previous companies and roles
- [ ] Career progression pattern
- [ ] Education background

### 2. LinkedIn Activity
- [ ] Recent posts or articles
- [ ] Comments on others' posts
- [ ] Shared content themes
- [ ] Groups they're in

### 3. Mutual Connections
- [ ] Check for shared connections
- [ ] Alumni connections
- [ ] Industry peer connections

### 4. Public Presence
- [ ] Conference speaking
- [ ] Podcast appearances
- [ ] Published articles
- [ ] Twitter/X presence

### 5. Personalization Hooks
Based on research, identify:
- Shared interests or background
- Recent accomplishments to congratulate
- Content they've engaged with
- Challenges their role typically faces

### 6. Conversation Starters
Ideas for opening lines:
- Reference their recent post/content
- Mention mutual connection
- Congratulate on company news
- Industry trend relevant to their role

## Outreach Notes
- Best channel: LinkedIn (if active) or email
- Timing: Check timezone from location
- Tone: Match their LinkedIn presence

Use these insights to craft personalized outreach.`;
}

function generateColdEmail(params: z.infer<typeof DraftColdEmailSchema>): string {
  const { recipientName, recipientTitle, company, painPoint, yourProduct, signal, tone } = params;

  return `# Cold Email Draft

**To:** ${recipientName}, ${recipientTitle} at ${company}

---

## Version 1: Direct Approach

**Subject:** ${painPoint.split(" ").slice(0, 4).join(" ")} at ${company}?

Hi ${recipientName.split(" ")[0]},

${signal ? `Noticed ${signal} - ` : ""}${recipientTitle}s at companies like ${company} often struggle with ${painPoint.toLowerCase()}.

We help with ${yourProduct}. [SPECIFIC RESULT FROM SIMILAR COMPANY] saw [METRIC] improvement in [TIMEFRAME].

Worth a 15-minute call to see if relevant?

[YOUR NAME]

---

## Version 2: Insight-Led

**Subject:** Quick thought on ${company}'s [AREA]

${recipientName.split(" ")[0]},

${signal ? `Saw that ${company} ${signal.toLowerCase()}. ` : ""}I've been researching how ${recipientTitle}s handle ${painPoint.toLowerCase()}.

One pattern I've noticed: [INSIGHT ABOUT THE PROBLEM].

We've helped [SIMILAR COMPANY TYPE] with ${yourProduct}. Happy to share what's working if useful.

[YOUR NAME]

---

## Version 3: Question-Based

**Subject:** Question about ${company}

Hi ${recipientName.split(" ")[0]},

Quick question: How is ${company} currently handling ${painPoint.toLowerCase()}?

Asking because we help ${recipientTitle}s with ${yourProduct}, and I'm curious if it's a priority for you right now.

If not the right time, no worries - just trying to be helpful, not salesy.

[YOUR NAME]

---

## Customization Notes
- **Tone selected:** ${tone || "professional"}
- **Personalize with:** Research about ${recipientName} and ${company}
- **Before sending:** Verify their email and check for recent news
- **Best time:** Tuesday-Thursday, 8-10am their timezone`;
}

function generateLinkedInMessage(params: z.infer<typeof DraftLinkedInMessageSchema>): string {
  const { recipientName, recipientTitle, company, connectionReason, messageType, mutualConnection } = params;
  const firstName = recipientName.split(" ")[0];

  if (messageType === "connection_request") {
    return `# LinkedIn Connection Request

**Character limit:** 300 characters

---

## Version 1: Shared Interest
${firstName}, noticed we're both in [INDUSTRY/SPACE]. ${connectionReason}. Would love to connect and follow your insights on ${company}'s journey.

(~150 chars)

---

## Version 2: Mutual Connection
${firstName}${mutualConnection ? `, saw we're both connected to ${mutualConnection}` : ""}. ${connectionReason}. Always looking to connect with sharp ${recipientTitle}s.

(~140 chars)

---

## Version 3: Value-First
${firstName}, been following ${company}'s [SPECIFIC THING]. ${connectionReason}. Happy to share some insights on [RELEVANT TOPIC] if helpful.

(~160 chars)

---

**Tips:**
- Don't pitch in connection request
- Be specific about why them
- Keep it under 200 chars for best acceptance
- Send 8-10am their time, Tue-Thu`;
  }

  return `# LinkedIn ${messageType === "inmail" ? "InMail" : "Follow-Up Message"}

**To:** ${recipientName}, ${recipientTitle} at ${company}

---

## Message Draft

Hi ${firstName},

${messageType === "follow_up" ? "Thanks for connecting! " : ""}${connectionReason}

${mutualConnection ? `I see we're both connected to ${mutualConnection} - small world. ` : ""}

[PERSONALIZED INSIGHT ABOUT THEIR COMPANY/ROLE]

Would you be open to a quick chat about [SPECIFIC TOPIC]? Happy to share what we're seeing work for other ${recipientTitle}s.

No pressure either way - I know your inbox is probably slammed.

Best,
[YOUR NAME]

---

## Alternative: Shorter Version

${firstName}, ${connectionReason.toLowerCase()}.

Curious how ${company} is thinking about [RELEVANT TOPIC]?

---

**Tips:**
- Keep under 500 chars for better response
- Reference something specific about them
- Give them an easy out
- Include one clear ask`;
}

function generateObjectionResponse(params: z.infer<typeof HandleObjectionSchema>): string {
  const { objection, context, yourProduct, competitorMentioned } = params;

  return `# Objection Response Framework

**Objection:** "${objection}"
**Context:** ${context}
${competitorMentioned ? `**Competitor mentioned:** ${competitorMentioned}` : ""}

---

## Step 1: Acknowledge & Empathize

Don't dismiss their concern. Show you understand:

"I appreciate you sharing that. [EMPATHETIC STATEMENT ABOUT THEIR CONCERN]."

---

## Step 2: Clarifying Questions

Before responding, understand better:

1. "Help me understand - what's driving that concern?"
2. "When you say [KEY WORD FROM OBJECTION], what specifically do you mean?"
3. "What would need to be true for this to not be a concern?"
4. "Is this the main thing holding you back, or are there other factors?"

---

## Step 3: Reframe Response

**Direct Response:**
"What I'm hearing is [THEIR CONCERN]. Here's how other ${context.includes("customers") ? "customers" : "companies"} in similar situations have thought about it: [REFRAME]."

**Proof Point:**
"[SIMILAR CUSTOMER] had the same concern. Here's what they found: [SPECIFIC OUTCOME]."

**Redirect:**
"That's fair. Let me ask - if we could address [THEIR CONCERN], would ${yourProduct} be something worth exploring further?"

---

## Step 4: If It's a Real Block

Sometimes objections are valid. If this is genuinely not a fit:

"It sounds like the timing/fit isn't right. I'd rather be upfront about that than waste your time. Would it make sense to revisit in [TIMEFRAME], or should I just leave you alone?"

---

## Specific Responses by Objection Type

${generateObjectionSpecificResponses(objection, yourProduct, competitorMentioned)}

---

## What NOT to Do
- Don't argue or get defensive
- Don't dismiss their concern
- Don't immediately pitch harder
- Don't bad-mouth competitors
- Don't promise things you can't deliver`;
}

function generateObjectionSpecificResponses(objection: string, product: string, competitor?: string): string {
  const lowerObjection = objection.toLowerCase();

  if (lowerObjection.includes("price") || lowerObjection.includes("expensive") || lowerObjection.includes("budget")) {
    return `**Price/Budget Objection Response:**
- "Totally understand. Help me understand what you were expecting?"
- "What's the cost of NOT solving [THEIR PAIN POINT]?"
- "If price weren't a factor, would this be something you'd move forward with?"
- "Let's look at the ROI - [CUSTOMER] saw [X] return in [TIMEFRAME]"`;
  }

  if (lowerObjection.includes("think about it") || lowerObjection.includes("get back to you")) {
    return `**Stall/Think About It Response:**
- "Of course. What specifically do you need to think through?"
- "Is there something I haven't addressed that's giving you pause?"
- "What would you need to see to feel confident moving forward?"
- "Would it help if I sent over [SPECIFIC RESOURCE] to review?"`;
  }

  if (lowerObjection.includes("competitor") || competitor) {
    return `**Competitive Response:**
- "Good - you should evaluate options. What criteria are most important to you?"
- "${competitor || "They"}'re solid at [THEIR STRENGTH]. Where we differ is [YOUR DIFFERENTIATION]"
- "What's your timeline for making a decision?"
- "Happy to do a side-by-side comparison on the criteria that matter most to you"`;
  }

  if (lowerObjection.includes("not a priority") || lowerObjection.includes("busy")) {
    return `**Priority/Timing Response:**
- "Makes sense. What IS the top priority right now?"
- "When would be a better time to revisit this?"
- "Out of curiosity, what would make this a priority?"
- "Is it not a priority, or not a priority right now?"`;
  }

  return `**General Response Framework:**
- Acknowledge: "I hear you. That's a fair concern."
- Probe: "Can you tell me more about what's behind that?"
- Reframe: "Here's how others have looked at it..."
- Test: "If we could address that, would you want to continue the conversation?"`;
}

function generateColdCallScript(params: z.infer<typeof GenerateColdCallScriptSchema>): string {
  const { targetTitle, company, painPoint, yourProduct, callObjective } = params;

  return `# Cold Call Script

**Target:** ${targetTitle} at ${company}
**Objective:** ${callObjective.replace("_", " ")}
**Pain Point:** ${painPoint}

---

## Opening (First 10 Seconds)

**Pattern Interrupt Opener:**
"Hi [NAME], this is [YOUR NAME] from [COMPANY]. Did I catch you at an okay time?"

*If yes:* "Great, I'll be brief..."
*If no:* "No problem - is there a better time I could call back?"

---

## Permission-Based Pivot (Next 20 Seconds)

"The reason I'm calling - I work with ${targetTitle}s who are dealing with ${painPoint.toLowerCase()}.

Before I take any more of your time, is that something that's even on your radar right now?"

*If yes:* Continue to discovery
*If no:* "Fair enough. Out of curiosity, what IS the top priority for you right now?" (Might uncover different angle)

---

## Quick Discovery (30-60 Seconds)

If they engage, ask 1-2 questions:

1. "How are you handling [PAIN POINT] today?"
2. "What's that costing you in terms of [TIME/MONEY/RISK]?"

Listen more than you talk.

---

## Bridge to ${callObjective.replace("_", " ")}

${callObjective === "book_meeting" ? `
"Based on what you're sharing, I think it'd be worth a 15-minute conversation to see if we can help. I don't want to pitch you on this call - just want to understand your situation better and see if there's a fit.

Do you have your calendar handy? I'm looking at [DATE/TIME] or [DATE/TIME]."` : ""}

${callObjective === "qualify" ? `
"Thanks for sharing that. A few quick questions to see if we might be a fit:
- What's your timeline for addressing this?
- Who else would be involved in a decision like this?
- Is there budget allocated for this type of solution?"` : ""}

${callObjective === "discovery" ? `
"This is really helpful. I'd love to understand more about:
- What you've tried before to solve this
- What a good solution would look like for you
- How this fits with your other priorities this quarter"` : ""}

---

## Handling "Not Interested"

**Response 1:** "Totally fair. Out of curiosity, is it because you've got a solution that's working, or it's just not a priority?"

**Response 2:** "No problem at all. Before I let you go - is there someone else at ${company} who might be dealing with this more directly?"

**Response 3:** "Understood. Would it be okay if I sent you something via email in case things change?"

---

## Handling "Send Me Information"

"Happy to. So I send you something relevant, what specifically would you want to see?"

*This qualifies their interest level*

---

## Voicemail Script (Under 20 Seconds)

"Hi [NAME], this is [YOUR NAME] from [COMPANY]. I'm calling because I work with ${targetTitle}s dealing with ${painPoint.toLowerCase()}.

If that's relevant, I'd love to chat briefly. My number is [NUMBER] - again, [NUMBER].

Have a great day."

---

## Post-Call Actions
- [ ] Log call in CRM
- [ ] Send follow-up email if they asked for info
- [ ] Schedule next touch if no answer
- [ ] Note any intel gathered`;
}

function generateDiscoveryQuestions(params: z.infer<typeof GenerateDiscoveryQuestionsSchema>): string {
  const { prospect, industry, yourProduct, dealStage, knownPainPoints } = params;

  return `# Discovery Questions

**Prospect:** ${prospect}
**Industry:** ${industry}
**Stage:** ${dealStage}
${knownPainPoints?.length ? `**Known Pain Points:** ${knownPainPoints.join(", ")}` : ""}

---

## Opening Questions (Build Rapport)

1. "Before we dive in, can you give me a quick overview of your role and what your team is focused on right now?"

2. "What prompted you to take this meeting / respond to my outreach?"

3. "What would make this conversation valuable for you today?"

---

## Current State Questions

4. "Walk me through how you're currently handling [RELEVANT PROCESS] today."

5. "What tools or systems are you using for this?"

6. "How long have you been doing it this way?"

7. "What's working well with your current approach?"

---

## Pain Discovery Questions

8. "What's NOT working as well as you'd like?"

9. "If you could wave a magic wand and fix one thing about [PROCESS], what would it be?"

10. "What happens when [PROCESS] breaks down or doesn't work?"

11. "How often does that happen?"

---

## Impact Quantification

12. "When [PROBLEM] occurs, what's the impact on [TEAM/BUSINESS]?"

13. "Can you put a number on that? In terms of time, money, or risk?"

14. "How does this compare to other priorities on your plate?"

15. "What's the cost of doing nothing / staying with the current approach?"

---

## Future State Questions

16. "What does success look like if you solve this problem?"

17. "How would you measure if a solution is working?"

18. "What would be different for your team in 6-12 months?"

---

## Decision Process Questions

19. "Who else would be involved in evaluating a solution like this?"

20. "What's the typical process for making a decision like this at ${prospect}?"

21. "Have you tried to solve this before? What happened?"

22. "What would need to be true for you to move forward?"

23. "What's your timeline for addressing this?"

---

## Budget Questions (Tactful)

24. "Is there budget allocated for solving this, or would we need to build a case?"

25. "What's the process for getting budget approved for something like this?"

26. "What other investments are you weighing against this?"

---

## Closing the Discovery

27. "Based on everything we've discussed, here's what I'm hearing: [SUMMARY]. Did I get that right?"

28. "What questions do you have for me?"

29. "What would be a good next step from here?"

---

## Questions to AVOID

- "What's your budget?" (too direct, too early)
- "Who's the decision maker?" (insulting if they're senior)
- "When can you buy?" (presumptuous)
- Leading questions that push them toward your answer

---

## Pro Tips

- Listen 70%, talk 30%
- Take notes they can see (shows you care)
- Summarize back what you hear
- Don't rush to pitch - understand first
- Silence is okay - let them think`;
}

function generateFollowUpSequence(params: z.infer<typeof CreateFollowUpSequenceSchema>): string {
  const { recipientName, company, lastInteraction, daysSinceContact, dealValue } = params;
  const firstName = recipientName.split(" ")[0];

  return `# Follow-Up Sequence

**Contact:** ${recipientName} at ${company}
**Last interaction:** ${lastInteraction}
**Days since contact:** ${daysSinceContact}
${dealValue ? `**Deal value:** ${dealValue}` : ""}

---

## Email 1: Day ${daysSinceContact + 1} (Soft Check-In)

**Subject:** Following up - ${company}

Hi ${firstName},

Wanted to follow up on our conversation about ${lastInteraction.toLowerCase()}.

I know things get busy - just checking if you had any questions or if there's anything I can clarify.

Let me know if it makes sense to reconnect, or if priorities have shifted.

[YOUR NAME]

---

## Email 2: Day ${daysSinceContact + 4} (Add Value)

**Subject:** Thought you might find this useful

${firstName},

While you're thinking things over, I wanted to share [RELEVANT RESOURCE/CASE STUDY] - it covers how [SIMILAR COMPANY] approached [RELEVANT CHALLENGE].

No pressure to respond - just thought it might be helpful given what we discussed.

[YOUR NAME]

---

## Email 3: Day ${daysSinceContact + 7} (Different Angle)

**Subject:** Quick question

${firstName},

I've been thinking about ${company}'s situation with [PAIN POINT FROM CONVERSATION].

Out of curiosity - is this still something you're looking to address this quarter, or have priorities shifted?

Either way, I'd rather know than keep following up if the timing isn't right.

[YOUR NAME]

---

## Email 4: Day ${daysSinceContact + 10} (Breakup)

**Subject:** Should I close your file?

${firstName},

I've reached out a few times and haven't heard back, so I'm guessing the timing isn't right.

I don't want to be that salesperson who won't take a hint, so I'll assume this isn't a priority right now.

If things change, you know where to find me. Wishing you and the ${company} team well.

[YOUR NAME]

P.S. If I'm wrong and you've just been swamped, just reply "still interested" and we can pick up where we left off.

---

## Alternative: Phone + Email Combo

**Day ${daysSinceContact + 2}:** Call attempt + leave voicemail
**Day ${daysSinceContact + 3}:** Email referencing voicemail
**Day ${daysSinceContact + 6}:** Call attempt (no voicemail)
**Day ${daysSinceContact + 7}:** LinkedIn touch
**Day ${daysSinceContact + 10}:** Final email (breakup)

---

## If They Respond "Bad Timing"

"Thanks for letting me know. When would be a better time to reconnect - [MONTH] or [MONTH]?"

Then set a calendar reminder and follow up exactly when they said.

---

## Re-Engagement Triggers

Set alerts for:
- ${company} in the news
- ${recipientName} job change
- ${recipientName} LinkedIn activity
- Industry trigger events`;
}

function generateValueProposition(params: z.infer<typeof BuildValuePropositionSchema>): string {
  const { yourProduct, targetPersona, painPoints, differentiators, proofPoints } = params;

  return `# Value Proposition Framework

**Product:** ${yourProduct}
**Target:** ${targetPersona}
**Pain Points:** ${painPoints.join(", ")}
**Differentiators:** ${differentiators.join(", ")}
${proofPoints?.length ? `**Proof Points:** ${proofPoints.join(", ")}` : ""}

---

## One-Liner (10 words max)

"We help ${targetPersona}s ${painPoints[0]?.toLowerCase() || "solve their biggest challenge"}."

---

## Elevator Pitch (30 seconds)

"${targetPersona}s often struggle with ${painPoints.slice(0, 2).join(" and ").toLowerCase()}.

${yourProduct} helps by [HOW YOU SOLVE IT].

Unlike other solutions, we ${differentiators[0]?.toLowerCase() || "differentiate through X"}.

${proofPoints?.[0] ? `Companies like [CUSTOMER] have seen ${proofPoints[0]}.` : "Our customers typically see [RESULT] within [TIMEFRAME]."}"

---

## Email Opening Line

"${targetPersona}s at companies like yours often tell me ${painPoints[0]?.toLowerCase() || "they struggle with X"} is costing them [TIME/MONEY/OPPORTUNITY]."

---

## Cold Call Hook

"I'm calling because I work with ${targetPersona}s who are dealing with ${painPoints[0]?.toLowerCase() || "X challenge"}. Is that something on your radar?"

---

## Value Props by Persona

### For the Economic Buyer (CFO, CEO)
- Focus on: ROI, cost savings, revenue impact, risk reduction
- Lead with: "${proofPoints?.[0] || "[X]% improvement in [METRIC]"}"
- Language: Investment, return, bottom line, strategic

### For the Technical Buyer (IT, Engineering)
- Focus on: Integration, security, scalability, maintenance
- Lead with: "${differentiators[0] || "How it works technically"}"
- Language: Architecture, API, compliance, infrastructure

### For the User Buyer (End User, Manager)
- Focus on: Ease of use, time savings, daily workflow
- Lead with: "Saves [X] hours per week on ${painPoints[0]?.toLowerCase() || "repetitive tasks"}"
- Language: Simple, intuitive, automated, seamless

### For the Champion (Internal Advocate)
- Focus on: Making them look good, easy to justify internally
- Lead with: "Here's how to position this to your leadership"
- Language: Business case, stakeholder buy-in, quick wins

---

## Differentiator Talk Tracks

${differentiators.map((d, i) => `
### Differentiator ${i + 1}: ${d}

"Unlike [ALTERNATIVE], we ${d.toLowerCase()}. This matters because [REASON]."

Proof: ${proofPoints?.[i] || "[Add customer example]"}
`).join("")}

---

## Handling "Why You?"

"Great question. Three things make us different:

1. ${differentiators[0] || "[Differentiator 1]"}
2. ${differentiators[1] || "[Differentiator 2]"}
3. ${proofPoints?.[0] ? `Results: ${proofPoints[0]}` : "[Differentiator 3]"}

But honestly, the best way to see it is [DEMO/TRIAL/REFERENCE CALL]."

---

## What NOT to Say

- Don't lead with features (lead with outcomes)
- Don't use jargon the persona doesn't use
- Don't claim to be "the best" without proof
- Don't trash competitors directly`;
}

function generateCompetitorAnalysis(params: z.infer<typeof AnalyzeCompetitorSchema>): string {
  const { competitor, yourProduct, dealContext } = params;

  return `# Competitive Analysis: ${competitor}

**Your Product:** ${yourProduct}
${dealContext ? `**Deal Context:** ${dealContext}` : ""}

---

## Research Checklist

### Gather Intel On ${competitor}

- [ ] Website and positioning
- [ ] G2/Capterra reviews (strengths and weaknesses)
- [ ] Glassdoor (internal issues that affect customers)
- [ ] Case studies (who they serve)
- [ ] Pricing (if public)
- [ ] Recent news and product updates
- [ ] Job postings (what they're building)

---

## Competitive Positioning Framework

### Where ${competitor} is STRONG (Be Honest)

Research and list their genuine strengths:
1. [Strength 1]
2. [Strength 2]
3. [Strength 3]

*Don't dismiss these - acknowledge them when prospects bring them up*

### Where ${competitor} is WEAK (Opportunities)

Research and list their weaknesses:
1. [Weakness 1]
2. [Weakness 2]
3. [Weakness 3]

*Focus your positioning here*

### Where YOU Win

Your advantages over ${competitor}:
1. [Your advantage 1]
2. [Your advantage 2]
3. [Your advantage 3]

---

## Landmine Questions

Questions to ask prospects that expose ${competitor}'s weaknesses:

1. "Have you asked ${competitor} about [THEIR KNOWN WEAKNESS]?"

2. "How important is [YOUR STRENGTH] to your evaluation?"

3. "What's been your experience with [AREA WHERE THEY STRUGGLE]?"

4. "Have you talked to any ${competitor} customers about [PAIN POINT]?"

5. "How are you planning to handle [THING THEY DON'T DO WELL]?"

---

## Objection Responses

### "We're also looking at ${competitor}"

"Good - you should evaluate options. What criteria are most important to you? ... Interesting. Let me share how we approach [CRITERIA THEY MENTIONED]."

### "${competitor} is cheaper"

"They might be. Out of curiosity, are you comparing total cost of ownership, or just the sticker price? [DISCUSS HIDDEN COSTS, IMPLEMENTATION, LONG-TERM VALUE]"

### "${competitor} has [FEATURE]"

"They do. We approached that differently because [REASON]. What's most important to you about that capability?"

### "I've heard good things about ${competitor}"

"They've done well in [THEIR STRONG AREA]. Where we differ is [YOUR DIFFERENTIATION]. What matters most in your situation?"

---

## Win Themes Against ${competitor}

When competing with ${competitor}, lead with these themes:

1. **Theme 1:** [Your key advantage]
   - Talk track: "..."
   - Proof point: [Customer example]

2. **Theme 2:** [Your key advantage]
   - Talk track: "..."
   - Proof point: [Customer example]

3. **Theme 3:** [Your key advantage]
   - Talk track: "..."
   - Proof point: [Customer example]

---

## When to Walk Away

Signs this might be a better fit for ${competitor}:

1. [Scenario where they're better fit]
2. [Scenario where they're better fit]
3. [Evaluation criteria that favors them]

*It's better to qualify out early than fight a losing battle*

---

## Competitive Dos and Don'ts

**DO:**
- Acknowledge their strengths
- Focus on customer fit
- Ask questions before positioning
- Let the customer draw conclusions
- Use neutral language

**DON'T:**
- Trash talk or FUD
- Lie about their capabilities
- Be defensive if they're ahead
- Assume you know why they're evaluating them
- Ignore them in the conversation`;
}

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GTM MCP Server running on stdio");
}

main().catch(console.error);
