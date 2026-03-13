import { Suspense } from 'react';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Social',
  description:
    'Follow MindMesh on LinkedIn and social media. Stay updated on AI productivity tips, product updates and community news.',
  openGraph: {
    title: 'MindMesh Social — Connect With Us',
    description: 'Follow MindMesh for AI productivity updates, tips and community.',
    url: 'https://mindmesh.global/social',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh Social — Connect With Us',
    description: 'Follow MindMesh for AI productivity updates, tips and community.',
    images: [OG_IMAGE_URL],
  },
};

export default function SocialPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Hero />
      </Suspense>
    </main>
  );
}
