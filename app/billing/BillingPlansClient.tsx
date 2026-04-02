'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import styles from './billing.module.css';

type Cycle = 'monthly' | 'yearly';

const freeFeatures = [
  'Connect up to 2 email accounts (Gmail or SMTP)',
  'Unified inbox — see all your mail in one view',
  'Calendar view — see your schedule at a glance',
  'Works with Gmail, Outlook, and any SMTP provider',
] as const;

const proFeatures = [
  'Unlimited email accounts — connect every inbox you have',
  'Inbox syncs every 5 minutes — always stay up to date',
  'Morning Juice — a daily briefing of what matters today',
  'Yesterday in 60 seconds — a quick recap of what happened',
  'Auto-extracted todos with priorities and deadlines',
  'Bills, orders, and shipments tracked automatically',
  'Calendar clash detection so you never double-book',
  'Search your emails in plain English — "invoices from Acme last month"',
  'Mascot — your desktop AI buddy that notifies you of what matters',
  'Choose your Mascot — pick from cat, dog, butler, or orb',
  'Sensor Bar — intuitive command bar for quick tasks (Cmd+Shift+M)',
  'Unlimited memory — your assistant never forgets anything, ever',
  'Everything encrypted and processed locally on your device',
] as const;

function FeatureCheck({ light }: { light?: boolean }) {
  return (
    <span className={light ? styles.checkWrapLight : styles.checkWrap} aria-hidden>
      <Check className="h-2.5 w-2.5" strokeWidth={3} />
    </span>
  );
}

export default function BillingPlansClient() {
  const [cycle, setCycle] = useState<Cycle>('monthly');

  return (
    <>
      <div className={styles.toggleWrap}>
        <div className={styles.toggle} role="group" aria-label="Billing cycle">
          <button
            type="button"
            className={`${styles.toggleBtn} ${cycle === 'monthly' ? styles.toggleBtnActive : ''}`}
            onClick={() => setCycle('monthly')}
            aria-pressed={cycle === 'monthly'}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${cycle === 'yearly' ? styles.toggleBtnActive : ''}`}
            onClick={() => setCycle('yearly')}
            aria-pressed={cycle === 'yearly'}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className={styles.plansGrid}>
        <article className={styles.planCard}>
          <h2 className={styles.planName}>Free</h2>
          <p className={styles.planDesc}>Connect your email and calendar in one place.</p>
          <ul className={styles.featureList}>
            {freeFeatures.map((f) => (
              <li key={f} className={styles.featureItem}>
                <FeatureCheck />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className={styles.planFooter}>
            <p className={styles.price}>
              $0 <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#8ea3d2' }}>/ month</span>
            </p>
          </div>
        </article>

        <article className={`${styles.planCard} ${styles.planFeatured}`}>
          <span className={styles.badgePopular}>MOST POPULAR</span>
          <h2 className={styles.planName}>Pro</h2>
          <p className={styles.planDesc}>
            Your AI-powered email assistant that reads, remembers, and briefs you.
          </p>
          <ul className={styles.featureList}>
            {proFeatures.map((f) => (
              <li key={f} className={styles.featureItem}>
                <FeatureCheck light />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className={styles.planFooter}>
            <p className={styles.price}>
              {cycle === 'monthly' ? '$20 / month' : '$200 / year'}
            </p>
            {cycle === 'yearly' ? (
              <p className={styles.priceNote}>Save with annual billing vs. twelve monthly payments.</p>
            ) : null}
            <button type="button" className={`${styles.planCta} ${styles.ctaPrimary}`}>
              Upgrade
            </button>
          </div>
        </article>

        <article className={styles.planCard}>
          <h2 className={styles.planName}>Enterprise</h2>
          <p className={styles.planDesc}>
            Everything in Pro, plus custom integrations, SSO, and dedicated support.
          </p>
          <div className={styles.enterpriseFill}>
            <p className={styles.enterpriseLetsTalk}>Let&apos;s talk</p>
            <p className={styles.enterpriseReach}>
              Reach out to{' '}
              <a
                href="mailto:support@mindmesh.global?subject=Enterprise%20plan%20inquiry"
                className={styles.enterpriseEmail}
              >
                support@mindmesh.global
              </a>
            </p>
          </div>
        </article>
      </div>

      <section className={styles.infoSection} aria-label="Billing notes">
        <div className={styles.infoCard}>
          <h2>How billing works</h2>
          <p>
            When MindMesh billing goes live, you&apos;ll manage your plan in the app. Until then, join the{' '}
            <Link href="/waitlist">waitlist</Link> to hear first about Pro availability and launch pricing.
          </p>
        </div>
        <div className={styles.infoCard}>
          <h2>Cancellations &amp; refunds</h2>
          <p>
            You can change or cancel your paid plan according to the terms in our{' '}
            <Link href="/terms">Terms of Service</Link>. We&apos;ll always give clear notice before renewal
            charges where required by law.
          </p>
        </div>
      </section>
    </>
  );
}
