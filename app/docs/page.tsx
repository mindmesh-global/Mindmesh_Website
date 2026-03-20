import { Suspense } from 'react';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Docs',
  description:
    'MindMesh documentation, FAQ, Privacy Policy and Terms. Learn how to connect email, calendar and use AI features.',
  openGraph: {
    title: 'MindMesh Docs — Documentation & FAQ',
    description: 'Documentation, FAQ, privacy and terms. Everything you need to get started.',
    url: 'https://mindmesh.global/docs',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh Docs — Documentation & FAQ',
    description: 'Documentation, FAQ, privacy and terms. Everything you need to get started.',
    images: [OG_IMAGE_URL],
  },
};

export default function DocsPage() {
  return (
    <main className="min-h-screen h-screen overflow-hidden bg-white">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Hero />
      </Suspense>
    </main>
  );
}
