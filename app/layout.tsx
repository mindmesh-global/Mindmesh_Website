import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Manrope } from 'next/font/google';
import { DeferredGoogleAnalytics } from '@/components/analytics/DeferredGoogleAnalytics';
import './globals.css';
import { RootAppShell } from '@/components/layout/RootAppShell';
import {
  OG_IMAGE,
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from '@/lib/seo';

/**
 * Body Inter: `optional` so late webfont paint does not hold LCP (P6-T08 / P3-T16).
 * Do not preload; Manrope for the hero H1 gets bandwidth priority.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'optional',
  preload: false,
  variable: '--font-inter',
  adjustFontFallback: true,
});

/** Display Manrope: preload + swap so hero H1 can become the LCP element. */
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-manrope',
  adjustFontFallback: true,
});

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
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'MindMesh',
    'cognitive layer',
    'cognitive orchestration',
    'AI productivity',
    'local-first',
    'work focus',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindmesh.global',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
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
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} bg-[#0a0a14] text-gray-100 antialiased`}>
        <ThemeScript />
        <RootAppShell>{children}</RootAppShell>
        <DeferredGoogleAnalytics gaId="G-NWRP4F6JWN" />
      </body>
    </html>
  );
}

