import { Suspense } from 'react';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact the MindMesh team. Get support, request a demo or ask about enterprise plans and custom integrations.',
  openGraph: {
    title: 'Contact MindMesh — Get In Touch',
    description: 'Contact us for support, demos or enterprise inquiries.',
    url: 'https://mindmesh.global/contact',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact MindMesh — Get In Touch',
    description: 'Contact us for support, demos or enterprise inquiries.',
    images: [OG_IMAGE_URL],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen h-screen overflow-hidden bg-white">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Hero />
      </Suspense>
    </main>
  );
}
