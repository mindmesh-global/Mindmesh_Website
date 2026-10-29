import type { Metadata } from 'next';
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { ProductOverviewHome } from '@/components/marketing/product-overview/ProductOverviewHome';
import { HeroSection } from '@/components/marketing/sections/HeroSection';
import { ProblemSection } from '@/components/marketing/sections/ProblemSection';
import { HowItWorksSection } from '@/components/marketing/sections/HowItWorksSection';
import { ProductTheaterConnectWrapper } from '@/components/marketing/ProductTheaterConnectWrapper';
import { ProductTheaterFocusWrapper } from '@/components/marketing/ProductTheaterFocusWrapper';
import { ProductTheaterExecuteWrapper } from '@/components/marketing/ProductTheaterExecuteWrapper';
import { ComparisonSection } from '@/components/marketing/sections/ComparisonSection';
import { FeatureGridSection } from '@/components/marketing/sections/FeatureGridSection';
import { TrustSection } from '@/components/marketing/sections/TrustSection';
import { TestimonialsSection } from '@/components/marketing/sections/TestimonialsSection';
import { OG_IMAGE, OG_IMAGE_URL, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/seo';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MindMesh',
      url: 'https://mindmesh.global',
      description:
        'A proactive attention layer for fractional leaders and consultants. MindMesh reads email, Slack, Jira, and calendars across every client, ranks what needs attention, and prepares actions — all without prompting.',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'macOS, Windows',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'Organization',
      name: 'MindMesh',
      url: 'https://mindmesh.global',
      logo: 'https://mindmesh.global/icon.png',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How is MindMesh different from Claude and ChatGPT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Claude and ChatGPT are reactive — you prompt them and they respond, starting from zero context each time. MindMesh is proactive: it reads your email, Slack, Jira, and calendar continuously, ranks what needs your attention with a plain-English reason, and surfaces it without a single prompt.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is MindMesh different from Superhuman?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Superhuman makes email faster but sees only email. MindMesh reads email alongside Slack, Jira, and calendars — across every client you work with — and gives you one ranked view of everything that needs your attention regardless of where it came from.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is MindMesh different from Motion?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Motion schedules based on tasks and calendar events you tell it about. MindMesh reads the full context behind your work: it surfaces what's urgent from your messages, tells you why it matters now, and prepares replies, calendar blocks, and task updates — all waiting for your approval before anything sends or changes.",
          },
        },
        {
          '@type': 'Question',
          name: 'Who is MindMesh built for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MindMesh is built for fractional leaders and consultants who work across multiple clients at once — fractional CTOs, CFOs, CMOs, and independent operators who manage several Slack workspaces, email accounts, and project trackers simultaneously.',
          },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://mindmesh.global',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingLayout>
        <HeroSection />
        <ProductOverviewHome />
        <TestimonialsSection />
        <ProblemSection />
        <ProductTheaterConnectWrapper />
        <ProductTheaterFocusWrapper />
        <ProductTheaterExecuteWrapper />
        <HowItWorksSection />
        <ComparisonSection />
        <FeatureGridSection />
        <TrustSection />
      </MarketingLayout>
    </>
  );
}
