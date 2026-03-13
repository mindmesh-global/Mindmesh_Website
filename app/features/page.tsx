import { Suspense } from 'react';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Discover MindMesh AI features — automated meeting notes, smart task management, calendar conflict detection, semantic search and Mascot Chat.',
  openGraph: {
    title: 'MindMesh Features — AI Productivity Tools',
    description:
      'Automated meeting notes, task extraction, calendar intelligence, natural language search and more.',
    url: 'https://mindmesh.global/features',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh Features — AI Productivity Tools',
    description: 'Automated meeting notes, task extraction, calendar intelligence, natural language search and more.',
    images: [OG_IMAGE_URL],
  },
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Hero />
      </Suspense>
    </main>
  );
}
