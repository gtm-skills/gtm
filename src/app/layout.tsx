import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { CommandMenu } from '@/components/command-menu';
import './globals.css';

// JSON-LD structured data for SEO
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GTM Skills',
  url: 'https://gtm-skills.com',
  description: 'Installable GTM skills for Claude Code, Cursor, Codex and ChatGPT. Open-source core, premium skill kits for sales teams.',
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

export const metadata: Metadata = {
  title: 'GTM Skills | Installable Sales Skills for Claude Code, Cursor, Codex & ChatGPT',
  description: 'Agent skills that sell. Research, outreach, discovery, closing and RevOps skills for Claude Code, Cursor, Codex, Gemini CLI, OpenClaw and ChatGPT. Open-source core, premium kits.',
  keywords: 'gtm skills, claude code skills, gtm skill claude, sales skills for claude code, installable gtm workflows, gtm mcp server, agent skills sales, openclaw gtm',
  authors: [{ name: 'Prospeda' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'GTM Skills | Agent skills that sell',
    description: 'Installable GTM skills for Claude Code, Cursor, Codex and ChatGPT. Open-source core, premium kits.',
    url: 'https://gtm-skills.com',
    siteName: 'GTM Skills',
    type: 'website',
    images: [
      {
        url: 'https://gtm-skills.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GTM Skills - Agent skills that sell',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
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
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CommandMenu />
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
