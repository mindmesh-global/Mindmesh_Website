import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalOverlays from '@/components/ConditionalOverlays';
import Logo from '@/components/Logo';
import { HomeSectionProvider } from '@/context/HomeSectionContext';
import { UIOverlayProvider } from '@/context/UIOverlayContext';
import { OnboardingTourProvider } from '@/context/OnboardingTourContext';

const inter = Inter({ subsets: ['latin'] });

function ThemeScript() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {`(function(){var d=document.documentElement,m=window.matchMedia('(prefers-color-scheme: dark)');function s(){d.classList.toggle('dark',m.matches);}s();m.addEventListener('change',s);})();`}
    </Script>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://mindmesh.global'),
  title: {
    default: 'MindMesh — AI-Powered Productivity Assistant',
    template: '%s | MindMesh',
  },
  description:
    'MindMesh automates your meeting notes, tasks and calendar using AI. Join thousands of professionals saving 2+ hours daily.',
  keywords: [
    'AI productivity',
    'meeting notes',
    'task automation',
    'AI assistant',
    'MindMesh',
  ],
  authors: [{ name: 'MindMesh' }],
  creator: 'MindMesh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindmesh.global',
    siteName: 'MindMesh',
    title: 'MindMesh — AI-Powered Productivity Assistant',
    description: 'Automate notes, tasks & meetings with AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MindMesh AI Productivity Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh — AI Productivity Assistant',
    description: 'Automate notes, tasks & meetings with AI',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} text-gray-900 bg-white dark:text-slate-100 dark:bg-slate-950 antialiased`}>
        <ThemeScript />
        <HomeSectionProvider>
          <UIOverlayProvider>
            <OnboardingTourProvider>
            <Logo />
            {children}
            <ConditionalOverlays />
            </OnboardingTourProvider>
          </UIOverlayProvider>
        </HomeSectionProvider>
      </body>
    </html>
  );
}

