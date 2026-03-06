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
  title: 'MindMesh - Your AI-Powered Assistant',
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

