import { Metadata } from 'next';
import WaitlistPageClient from './WaitlistPageClient';

export const metadata: Metadata = {
  title: 'Join Waitlist',
  description:
    'Join the MindMesh waitlist for early access. Be among the first to experience AI-powered meeting notes, smart task automation and calendar intelligence.',
  openGraph: {
    title: 'Join MindMesh Waitlist — Early Access',
    description:
      'Get early access to MindMesh. AI-powered productivity for meeting notes, tasks and calendar.',
    url: 'https://mindmesh.global/waitlist',
  },
};

export default function WaitlistPage() {
  return (
    <WaitlistPageClient />
  );
}
