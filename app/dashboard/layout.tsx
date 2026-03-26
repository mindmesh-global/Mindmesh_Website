import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Your personal productivity hub — tasks, meetings, and smart insights.',
  openGraph: {
    title: 'MindMesh Dashboard',
    description:
      'Your personal productivity hub — tasks, meetings, and smart insights.',
    images: ['/og-image.png'],
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
