import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Link from 'next/link';
import SiteNav from '@/components/layout/SiteNav';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import styles from './billing.module.css';
import BillingPlansClient from './BillingPlansClient';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Billing & plans',
  description:
    'MindMesh plans: Free, Pro, and Enterprise. Compare features, monthly and yearly pricing, and how billing will work in the app.',
  openGraph: {
    title: 'Billing & plans | MindMesh',
    description: 'Compare MindMesh Free, Pro, and Enterprise. Secure checkout and clear billing when the app launches.',
    url: 'https://mindmesh.global/billing',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Billing & plans | MindMesh',
    description: 'Compare MindMesh plans and pricing for individuals and teams.',
    images: [OG_IMAGE_URL],
  },
};

export default function BillingPage() {
  return (
    <div className={`${manrope.variable} ${styles.page}`}>
      <SiteNav activeHref="/billing" navBackgroundColor="#060e20" />

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="billing-hero-heading">
          <p className={styles.kicker}>Plans &amp; billing</p>
          <h1 id="billing-hero-heading" className={styles.heroTitle}>
            Simple pricing for serious focus.
          </h1>
          <p className={styles.heroLead}>
            Pick a tier that fits how you work. Switch between monthly and yearly for Pro—Enterprise is tailored
            to your team.
          </p>
          <p className={styles.heroLead} style={{ marginTop: '0.75rem', fontSize: '0.92rem' }}>
            Prefer features first?{' '}
            <Link href="/features" style={{ color: '#93c5fd', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Explore the product
            </Link>
            .
          </p>
        </section>

        <BillingPlansClient />
      </main>
    </div>
  );
}
