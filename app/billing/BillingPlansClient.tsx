'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';

type Cycle = 'monthly' | 'yearly';

const freeFeatures = [
  'Connect up to 2 email accounts (Gmail or SMTP)',
  'Unified inbox: see all your mail in one view',
  'Calendar view: see your schedule at a glance',
  'Works with Gmail, Outlook, and any SMTP provider',
] as const;

const proFeatures = [
  'Unlimited email accounts: connect every inbox you have',
  'Inbox syncs every 5 minutes: always stay up to date',
  'Morning Juice: a daily briefing of what matters today',
  'Yesterday in 60 seconds: a quick recap of what happened',
  'Auto-extracted todos with priorities and deadlines',
  'Bills, orders, and shipments tracked automatically',
  'Calendar clash detection so you never double-book',
  'Search your emails in plain English: "invoices from Acme last month"',
  'Mascot: your desktop AI buddy that notifies you of what matters',
  'Choose your Mascot: pick from cat, dog, butler, or orb',
  'Sensor Bar: intuitive command bar for quick tasks (Cmd+Shift+M)',
  'Unlimited memory: your assistant never forgets anything, ever',
  'Everything encrypted and processed locally on your device',
] as const;

function FeatureCheck() {
  return (
    <span
      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mm-primary/20 text-mm-primary"
      aria-hidden
    >
      <Check className="h-2.5 w-2.5" strokeWidth={3} />
    </span>
  );
}

export default function BillingPlansClient() {
  const [cycle, setCycle] = useState<Cycle>('monthly');

  return (
    <>
      <div className="mb-8 flex justify-center">
        <div
          className="inline-flex gap-1 rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-1"
          role="group"
          aria-label="Billing cycle"
        >
          <button
            type="button"
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              cycle === 'monthly'
                ? 'bg-mm-primary-fixed text-mm-on-primary-fixed'
                : 'text-mm-on-surface-variant hover:text-mm-on-background'
            }`}
            onClick={() => setCycle('monthly')}
            aria-pressed={cycle === 'monthly'}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              cycle === 'yearly'
                ? 'bg-mm-primary-fixed text-mm-on-primary-fixed'
                : 'text-mm-on-surface-variant hover:text-mm-on-background'
            }`}
            onClick={() => setCycle('yearly')}
            aria-pressed={cycle === 'yearly'}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        <article className="flex flex-col rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6">
          <h2 className="font-display text-xl font-semibold text-mm-on-background">Free</h2>
          <p className="mt-2 text-sm text-mm-on-surface-variant">
            Connect your email and calendar in one place.
          </p>
          <ul className="mt-6 flex-1 space-y-3">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-mm-on-surface-variant">
                <FeatureCheck />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-mm-outline-variant/40 pt-5">
            <p className="font-display text-2xl font-bold tracking-tight text-mm-on-background">
              $0{' '}
              <span className="text-sm font-semibold text-mm-on-surface-variant">/ month</span>
            </p>
          </div>
        </article>

        <article className="relative flex flex-col rounded-lg border border-mm-primary/50 bg-mm-surface-container-high p-6 shadow-mm-elevated">
          <span className="absolute right-4 top-4 rounded-md bg-mm-primary-fixed px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-mm-on-primary-fixed">
            Most popular
          </span>
          <h2 className="font-display text-xl font-semibold text-mm-on-background">Pro</h2>
          <p className="mt-2 text-sm text-mm-on-surface-variant">
            Your AI-powered email assistant that reads, remembers, and briefs you.
          </p>
          <ul className="mt-6 flex-1 space-y-3">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-mm-on-surface-variant">
                <FeatureCheck />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-mm-outline-variant/40 pt-5">
            <p className="font-display text-2xl font-bold tracking-tight text-mm-on-background">
              {cycle === 'monthly' ? '$20 / month' : '$200 / year'}
            </p>
            {cycle === 'yearly' ? (
              <p className="mt-1 text-xs text-mm-on-surface-variant">
                Save with annual billing vs. twelve monthly payments.
              </p>
            ) : null}
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-mm-primary-fixed px-4 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Upgrade
            </button>
          </div>
        </article>

        <article className="flex flex-col rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6">
          <h2 className="font-display text-xl font-semibold text-mm-on-background">Enterprise</h2>
          <p className="mt-2 text-sm text-mm-on-surface-variant">
            Everything in Pro, plus custom integrations, SSO, and dedicated support.
          </p>
          <div className="mt-8 flex flex-1 flex-col items-center justify-center gap-2 py-8 text-center">
            <p className="font-display text-2xl font-bold tracking-tight text-mm-on-background">
              Let&apos;s talk
            </p>
            <p className="text-sm text-mm-on-surface-variant">
              Reach out to{' '}
              <a
                href="mailto:support@mindmesh.global?subject=Enterprise%20plan%20inquiry"
                className="font-medium text-mm-primary underline underline-offset-2 hover:text-mm-primary-dim"
              >
                support@mindmesh.global
              </a>
            </p>
          </div>
        </article>
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-2" aria-label="Billing notes">
        <div className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6">
          <h2 className="font-display text-lg font-semibold text-mm-on-background">
            How billing works
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mm-on-surface-variant">
            When MindMesh billing goes live, you&apos;ll manage your plan in the app. Until then, join
            the{' '}
            <Link
              href={MARKETING_CTA_HREF}
              className="font-medium text-mm-primary underline underline-offset-2 hover:text-mm-primary-dim"
            >
              waitlist
            </Link>{' '}
            to hear first about Pro availability and launch pricing.
          </p>
        </div>
        <div className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6">
          <h2 className="font-display text-lg font-semibold text-mm-on-background">
            Cancellations &amp; refunds
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mm-on-surface-variant">
            You can change or cancel your paid plan according to the terms in our{' '}
            <Link
              href="/terms"
              className="font-medium text-mm-primary underline underline-offset-2 hover:text-mm-primary-dim"
            >
              Terms of Service
            </Link>
            . We&apos;ll always give clear notice before renewal charges where required by law.
          </p>
        </div>
      </section>
    </>
  );
}
