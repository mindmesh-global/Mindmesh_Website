import { Suspense } from 'react';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'App Directory',
  description:
    'Connect Gmail, Outlook, Google Calendar, Outlook Calendar and SMTP to MindMesh. Sync emails, events and tasks in one AI-powered workspace.',
  openGraph: {
    title: 'MindMesh App Directory — Integrations',
    description: 'Connect your email and calendar. Gmail, Outlook, Google Calendar and more.',
    url: 'https://mindmesh.global/app-directory',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh App Directory — Integrations',
    description: 'Connect your email and calendar. Gmail, Outlook, Google Calendar and more.',
    images: [OG_IMAGE_URL],
  },
};

export default function AppDirectoryPage() {
  return (
    <main className="min-h-screen h-screen overflow-hidden bg-white">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Hero />
      </Suspense>
    </main>
  );
}
