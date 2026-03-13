import { Metadata } from 'next';
import SubscriptionPageClient from './SubscriptionPageClient';

export const metadata: Metadata = {
  title: 'Subscription',
  description:
    'MindMesh subscription plans — Free, Pro and Enterprise. Unlimited AI meeting notes, task automation, calendar sync and Mascot AI assistant.',
  openGraph: {
    title: 'MindMesh Subscription — Free, Pro & Enterprise',
    description:
      'Choose the right plan. AI meeting notes, unlimited accounts, Mascot assistant and more.',
    url: 'https://mindmesh.global/subscription',
  },
};

export default function SubscriptionPage() {
  return <SubscriptionPageClient />;
}
