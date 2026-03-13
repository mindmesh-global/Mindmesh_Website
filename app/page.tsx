import { Suspense } from 'react';
import Hero from '@/components/Hero';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MindMesh',
      url: 'https://mindmesh.global',
      description: 'AI-powered productivity assistant',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'Organization',
      name: 'MindMesh',
      url: 'https://mindmesh.global',
      logo: 'https://mindmesh.global/logo.png',
    },
  ],
};

export const metadata = {
  title: { absolute: 'MindMesh — AI-Powered Productivity Assistant' },
  description:
    'MindMesh automates your meeting notes, tasks and calendar using AI. Join thousands of professionals saving 2+ hours daily.',
  openGraph: {
    title: 'MindMesh — AI-Powered Productivity Assistant',
    description: 'Automate notes, tasks & meetings with AI',
    url: 'https://mindmesh.global',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Hero />
        </Suspense>
      </main>
    </>
  );
}

