import { Metadata } from 'next';
import SocialPageClient from './SocialPageClient';

export const metadata: Metadata = {
  title: 'Social',
  description:
    'Follow MindMesh on LinkedIn and social media. Stay updated on AI productivity tips, product updates and community news.',
  openGraph: {
    title: 'MindMesh Social — Connect With Us',
    description:
      'Follow MindMesh for AI productivity updates, tips and community.',
    url: 'https://mindmesh.global/social',
  },
};

export default function SocialPage() {
  return <SocialPageClient />;
}
