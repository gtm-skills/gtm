import React, { useState, useEffect } from 'react';
import {
  Card,
  Text,
  Link,
  Flex,
  Box,
  Divider,
  LoadingSpinner,
  Tag,
  Button,
  hubspot,
} from '@hubspot/ui-extensions';

// Agent definitions
const agents = {
  scout: { name: 'Scout', icon: '🔍', color: 'blue', role: 'Research' },
  writer: { name: 'Writer', icon: '✍️', color: 'yellow', role: 'Copy' },
  rep: { name: 'Rep', icon: '📧', color: 'green', role: 'Outreach' },
  closer: { name: 'Closer', icon: '🎯', color: 'purple', role: 'Deals' },
};

// Get recommendations based on context
function getRecommendations(objectType, dealStage, jobTitle) {
  const stageLower = (dealStage || '').toLowerCase();
  const isExecutive = jobTitle?.toLowerCase()?.match(/ceo|cto|cfo|coo|vp|director|head|chief/);

  if (objectType === 'contacts') {
    const recs = [
      { agent: 'scout', action: 'Research Contact', url: '/agents?agent=scout' },
      { agent: 'writer', action: 'Write Cold Email', url: '/agents?agent=writer' },
      { agent: 'rep', action: 'Create Sequence', url: '/agents?agent=rep' },
    ];
    if (isExecutive) {
      recs.unshift({ agent: 'writer', action: 'Executive Email', url: '/free-tools/tonalities/executive-briefing' });
    }
    return recs.slice(0, 4);
  }

  // Deal stage recommendations
  if (stageLower.includes('qualified') || stageLower.includes('scheduled')) {
    return [
      { agent: 'scout', action: 'Account Research', url: '/agents?agent=scout' },
      { agent: 'writer', action: 'Discovery Questions', url: '/methodology/spin-selling' },
      { agent: 'rep', action: 'Meeting Prep', url: '/agents?agent=rep' },
    ];
  }

  if (stageLower.includes('demo') || stageLower.includes('presentation')) {
    return [
      { agent: 'writer', action: 'Demo Follow-up', url: '/agents?agent=writer' },
      { agent: 'closer', action: 'MEDDPICC Check', url: '/methodology/meddic' },
      { agent: 'writer', action: 'ROI Business Case', url: '/agents?agent=writer' },
    ];
  }

  if (stageLower.includes('proposal') || stageLower.includes('negotiation')) {
    return [
      { agent: 'closer', action: 'Write Proposal', url: '/agents?agent=closer' },
      { agent: 'closer', action: 'Handle Objections', url: '/free-tools/tonalities/chris-voss' },
      { agent: 'writer', action: 'Urgency Email', url: '/agents?agent=writer' },
    ];
  }

  // Default
  return [
    { agent: 'scout', action: 'Research Account', url: '/agents?agent=scout' },
    { agent: 'writer', action: 'Write Follow-up', url: '/agents?agent=writer' },
    { agent: 'closer', action: 'Deal Strategy', url: '/agents?agent=closer' },
  ];
}

hubspot.extend(({ context, actions }) => {
  return (
    <GtmSkillsCard context={context} actions={actions} />
  );
});

const GtmSkillsCard = ({ context, actions }) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  const objectType = context?.crm?.objectType || 'deals';
  const objectId = context?.crm?.objectId;

  useEffect(() => {
    // Get deal stage or contact info from context
    const dealStage = context?.crm?.properties?.dealstage;
    const jobTitle = context?.crm?.properties?.jobtitle;

    const recs = getRecommendations(objectType, dealStage, jobTitle);
    setRecommendations(recs);
    setLoading(false);
  }, [context]);

  if (loading) {
    return (
      <Card>
        <Flex justify="center" align="center">
          <LoadingSpinner />
        </Flex>
      </Card>
    );
  }

  return (
    <Card>
      {/* Header */}
      <Flex direction="row" justify="between" align="center">
        <Text variant="heading">GTM Skills</Text>
        <Tag>
          {objectType === 'contacts' ? '📧 Outreach' : '🎯 Deal'}
        </Tag>
      </Flex>

      <Text variant="body">
        Your agentic sales team
      </Text>

      <Divider />

      {/* Recommendations */}
      <Text variant="heading-2">Recommended Actions</Text>

      <Flex direction="column" gap="sm">
        {recommendations.map((rec, index) => {
          const agent = agents[rec.agent];
          return (
            <Box key={index}>
              <Link href={`https://gtm-skills.com${rec.url}&utm_source=hubspot`}>
                <Flex direction="row" align="center" gap="xs">
                  <Text>{agent.icon}</Text>
                  <Text variant="body">{rec.action}</Text>
                </Flex>
              </Link>
            </Box>
          );
        })}
      </Flex>

      <Divider />

      {/* Agent Links */}
      <Text variant="heading-2">Your Sales Team</Text>

      <Flex direction="row" wrap="wrap" gap="xs">
        {Object.entries(agents).map(([key, agent]) => (
          <Link
            key={key}
            href={`https://gtm-skills.com/api/v1/agents/${key}/skill?utm_source=hubspot`}
          >
            <Tag>{agent.icon} {agent.name}</Tag>
          </Link>
        ))}
      </Flex>

      <Divider />

      {/* CTA */}
      <Flex justify="center">
        <Button
          variant="primary"
          onClick={() => {
            actions.openPanel(`https://gtm-skills.com/agents?objectType=${objectType}&objectId=${objectId}&utm_source=hubspot`);
          }}
        >
          Open GTM Skills
        </Button>
      </Flex>
    </Card>
  );
};

export default GtmSkillsCard;
