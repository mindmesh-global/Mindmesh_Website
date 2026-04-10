import { Suspense } from 'react';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Demo',
  description:
    'Watch the MindMesh demo — see AI meeting notes, task automation, calendar intelligence and Mascot Chat in action.',
  openGraph: {
    title: 'MindMesh Demo — See It In Action',
    description: 'Watch how MindMesh automates notes, tasks and meetings with AI.',
    url: 'https://mindmesh.global/demo',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh Demo — See It In Action',
    description: 'Watch how MindMesh automates notes, tasks and meetings with AI.',
    images: [OG_IMAGE_URL],
  },
};

export default function DemoPage() {
  return (
    <main className="min-h-screen h-screen overflow-hidden bg-[#0a0a14]">
      <Suspense fallback={<div className="min-h-screen h-screen bg-[#0a0a14]" aria-hidden />}>
        <Hero />
      </Suspense>
    </main>
  );
}
