import type { Metadata } from 'next';
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { MarketingTheaterSections } from '@/components/marketing/MarketingTheaterSections';
import { ProductOverviewHome } from '@/components/marketing/product-overview/ProductOverviewHome';
import { HeroSection } from '@/components/marketing/sections/HeroSection';
import { ProblemSection } from '@/components/marketing/sections/ProblemSection';
import { HowItWorksSection } from '@/components/marketing/sections/HowItWorksSection';
import { FeatureGridSection } from '@/components/marketing/sections/FeatureGridSection';
import { TrustSection } from '@/components/marketing/sections/TrustSection';
import { FinalCTASection } from '@/components/marketing/sections/FinalCTASection';
import { OG_IMAGE, OG_IMAGE_URL, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/seo';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MindMesh',
      url: 'https://mindmesh.global',
      description:
        'A cognitive orchestration layer that connects your apps, ranks what needs attention, and helps you act with approval.',
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
        <ProblemSection />
        <HowItWorksSection />
        <MarketingTheaterSections />
        <FeatureGridSection />
        <TrustSection />
        <FinalCTASection />
      </MarketingLayout>
    </>
  );
}
