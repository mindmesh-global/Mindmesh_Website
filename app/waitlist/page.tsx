import { Suspense } from 'react';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Join Waitlist',
  description:
    'Join the MindMesh waitlist for early access. Be among the first to experience AI-powered meeting notes, smart task automation and calendar intelligence.',
  openGraph: {
    title: 'Join MindMesh Waitlist — Early Access',
    description:
      'Get early access to MindMesh. AI-powered productivity for meeting notes, tasks and calendar.',
    url: 'https://mindmesh.global/waitlist',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join MindMesh Waitlist — Early Access',
    description: 'Get early access to MindMesh. AI-powered productivity for meeting notes, tasks and calendar.',
    images: [OG_IMAGE_URL],
  },
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen h-screen overflow-hidden bg-white">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Hero />
      </Suspense>
    </main>
  );
}
