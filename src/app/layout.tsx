import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

// JSON-LD structured data for SEO
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GTM Skills',
  url: 'https://gtm-skills.com',
  description: 'The most comprehensive GTM prompt library for Claude, ChatGPT, and any LLM. Industry packs, role playbooks, workflows, and methodologies. Free and open source.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://gtm-skills.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GTM Skills',
  url: 'https://gtm-skills.com',
  logo: 'https://gtm-skills.com/logo.svg',
  sameAs: [
    'https://github.com/gtm-skills/gtm',
  ],
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GTM Skills | 2,500+ AI Prompts for B2B Sales',
  description: 'The most comprehensive GTM prompt library for Claude, ChatGPT, and any LLM. Industry packs, role playbooks, workflows, and methodologies. Free and open source.',
  keywords: 'gtm skills, gtm prompts, sales prompts, ai sales, b2b sales prompts, chatgpt sales, claude prompts, llm prompts, meddic prompts, spin selling prompts, agentic bdr, ai sdr, agentic sales',
  authors: [{ name: 'Prospeda' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'GTM Skills | 2,500+ AI Prompts for B2B Sales',
    description: 'The most comprehensive GTM prompt library. Industry packs, role playbooks, workflows, and methodologies.',
    url: 'https://gtm-skills.com',
    siteName: 'GTM Skills',
    type: 'website',
    images: [
      {
        url: 'https://gtm-skills.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GTM Skills - 2,500+ AI Prompts for B2B Sales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTM Skills | 2,500+ AI Prompts for B2B Sales',
    description: 'The most comprehensive GTM prompt library. Industry packs, role playbooks, workflows, and methodologies.',
    images: ['https://gtm-skills.com/og-image.png'],
  },
  metadataBase: new URL('https://gtm-skills.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
