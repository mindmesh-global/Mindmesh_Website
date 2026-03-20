import { Suspense } from 'react';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Subscription',
  description:
    'MindMesh subscription plans — Free, Pro and Enterprise. Unlimited AI meeting notes, task automation, calendar sync and Mascot AI assistant.',
  openGraph: {
    title: 'MindMesh Subscription — Free, Pro & Enterprise',
    description: 'Choose the right plan. AI meeting notes, unlimited accounts, Mascot assistant and more.',
    url: 'https://mindmesh.global/subscription',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh Subscription — Free, Pro & Enterprise',
    description: 'Choose the right plan. AI meeting notes, unlimited accounts, Mascot assistant and more.',
    images: [OG_IMAGE_URL],
  },
};

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen h-screen overflow-hidden bg-white">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Hero />
      </Suspense>
    </main>
  );
}
