import { Metadata } from 'next';
import FeaturesPageClient from './FeaturesPageClient';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Discover MindMesh AI features — automated meeting notes, smart task management, calendar conflict detection, semantic search and Mascot Chat.',
  openGraph: {
    title: 'MindMesh Features — AI Productivity Tools',
    description:
      'Automated meeting notes, task extraction, calendar intelligence, natural language search and more.',
    url: 'https://mindmesh.global/features',
  },
};

export default function FeaturesPage() {
  return <FeaturesPageClient />;
}
