import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const pageDescription =
  'Your MindMesh workspace for connected apps, tasks, meetings, and daily focus.';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | Dashboard',
    description: pageDescription,
    url: 'https://mindmesh.global/dashboard',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Dashboard',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
