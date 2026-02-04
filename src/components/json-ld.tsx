// JSON-LD structured data components for SEO and LLM discoverability

import { Prompt, PromptCategory } from '@/lib/prompts';

interface SoftwareSourceCodeJsonLdProps {
  name: string;
  description: string;
  url: string;
  category: string;
  promptCount: number;
  keywords?: string[];
}

export function SoftwareSourceCodeJsonLd({
  name,
  description,
  url,
  category,
  promptCount,
  keywords = [],
}: SoftwareSourceCodeJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description: `${promptCount}+ prompts. ${description}`,
    url,
    codeRepository: 'https://github.com/gtm-skills/gtm',
    programmingLanguage: 'Markdown',
    license: 'https://opensource.org/licenses/MIT',
    author: {
      '@type': 'Organization',
      name: 'Prospeda',
      url: 'https://prospeda.com',
    },
    dateCreated: '2025-01-27',
    dateModified: new Date().toISOString().split('T')[0],
    keywords: ['GTM', 'sales prompts', 'AI', 'B2B sales', category, ...keywords].join(', '),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}

export function HowToJsonLd({ name, description, steps }: HowToJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQJsonLdProps {
  questions: { question: string; answer: string }[];
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface DatasetJsonLdProps {
  name: string;
  description: string;
  url: string;
  category: string;
  promptCount: number;
}

export function DatasetJsonLd({
  name,
  description,
  url,
  category,
  promptCount,
}: DatasetJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url,
    license: 'https://opensource.org/licenses/MIT',
    creator: {
      '@type': 'Organization',
      name: 'Prospeda',
      url: 'https://prospeda.com',
    },
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: 'https://gtm-skills.com/prompts.json',
    },
    keywords: ['GTM prompts', 'sales AI', 'B2B sales', category],
    size: `${promptCount}+ prompts`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
