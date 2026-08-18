import type { Metadata } from 'next';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import BillingPlansClient from './BillingPlansClient';

export const metadata: Metadata = {
  title: 'Billing & plans',
  robots: { index: false, follow: false },
  description:
    'MindMesh plans: Free, Pro, and Enterprise. Compare features, monthly and yearly pricing, and how billing will work in the app.',
  openGraph: {
    title: 'MindMesh | Billing & plans',
    description:
      'Compare MindMesh Free, Pro, and Enterprise. Secure checkout and clear billing when the app launches.',
    url: 'https://mindmesh.global/billing',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Billing & plans',
    description: 'Compare MindMesh plans and pricing for individuals and teams.',
    images: [OG_IMAGE_URL],
  },
};

export default function BillingPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Plans & billing"
      title="Simple pricing for serious focus."
      subtitle="Pick a tier that fits how you work. Switch between monthly and yearly for Pro; Enterprise is tailored to your team."
      backHref="/#features"
      backLabel="Explore the product →"
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">
          <BillingPlansClient />
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
