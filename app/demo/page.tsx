import { Metadata } from 'next';
import DemoPageClient from './DemoPageClient';

export const metadata: Metadata = {
  title: 'Demo',
  description:
    'Watch the MindMesh demo — see AI meeting notes, task automation, calendar intelligence and Mascot Chat in action.',
  openGraph: {
    title: 'MindMesh Demo — See It In Action',
    description:
      'Watch how MindMesh automates notes, tasks and meetings with AI.',
    url: 'https://mindmesh.global/demo',
  },
};

export default function DemoPage() {
  return <DemoPageClient />;
}
