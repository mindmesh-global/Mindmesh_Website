import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MindMesh - Your AI-Powered Productivity Assistant',
  description: 'A local-first, AI-powered productivity assistant that helps you manage your emails, calendar, and tasks seamlessly.',
  keywords: ['productivity', 'AI assistant', 'email management', 'calendar', 'desktop app'],
  authors: [{ name: 'MindMesh Team' }],
  openGraph: {
    title: 'MindMesh - AI-Powered Productivity Assistant',
    description: 'Transform your workflow with AI-powered productivity tools',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

