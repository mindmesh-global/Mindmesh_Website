import { Metadata } from 'next';
import DocsPageClient from './DocsPageClient';

export const metadata: Metadata = {
  title: 'Docs',
  description:
    'MindMesh documentation, FAQ, Privacy Policy and Terms. Learn how to connect email, calendar and use AI features.',
  openGraph: {
    title: 'MindMesh Docs — Documentation & FAQ',
    description:
      'Documentation, FAQ, privacy and terms. Everything you need to get started.',
    url: 'https://mindmesh.global/docs',
  },
};

export default function DocsPage() {
  return <DocsPageClient />;
}
