import { Metadata } from 'next';
import AppDirectoryPageClient from './AppDirectoryPageClient';

export const metadata: Metadata = {
  title: 'App Directory',
  description:
    'Connect Gmail, Outlook, Google Calendar, Outlook Calendar and SMTP to MindMesh. Sync emails, events and tasks in one AI-powered workspace.',
  openGraph: {
    title: 'MindMesh App Directory — Integrations',
    description:
      'Connect your email and calendar. Gmail, Outlook, Google Calendar and more.',
    url: 'https://mindmesh.global/app-directory',
  },
};

export default function AppDirectoryPage() {
  return <AppDirectoryPageClient />;
}
