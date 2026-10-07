'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';

type Cycle = 'monthly' | 'yearly';

const FREE_PLAN_FEATURES = [
  'Connect up to 2 email accounts (Gmail, Outlook, or SMTP)',
  'Unified inbox — see all your mail in one view',
  'Calendar view — see your schedule at a glance',
  'Meeting notifications — reminders before your calendar meetings',
  'Works with Gmail, Outlook, and any SMTP provider',
] as const;

const PRO_PLAN_FEATURES = [
  'Attention Board — what needs you now, later today, and what was already handled',
  'Unlimited email accounts, calendars, Slack workspaces, and Jira sites — all in one place',
  'Unlimited AI enrichments — no daily caps on any feature',
  'All apps sync every 30 seconds — always stay up to date',
  'Yesterday Narrative — a recap of what happened yesterday',
  'Notifications — reminders for meetings, travel, bills, Slack follow-ups, and Jira due dates',
  'Calendar clash detection so you never double-book',
  'Sensor Bar — intuitive command bar for quick tasks',
  'Everything stored locally on your device',
] as const;

function FeatureCheck({ white = false }: { white?: boolean }) {
  return (
    <span
      className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
        white ? 'bg-white/25' : 'bg-blue-100 dark:bg-blue-900/50'
      }`}
      aria-hidden
    >
      <Check
        className={`h-2.5 w-2.5 ${white ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}
        strokeWidth={3}
      />
    </span>
  );
}

export default function BillingPlansClient() {
  const [cycle, setCycle] = useState<Cycle>('monthly');

  return (
    <>
      {/* Billing cycle toggle */}
      <div className="mb-8 flex justify-center sm:mb-10">
        <div
          className="inline-flex gap-1 rounded-full border border-mm-outline-variant/60 bg-mm-surface-container p-1"
          role="group"
          aria-label="Billing cycle"
        >
          {(['monthly', 'yearly'] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCycle(c)}
              aria-pressed={cycle === c}
              className={`min-w-[88px] rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 sm:min-w-[100px] sm:px-5 sm:py-2.5 ${
                cycle === c
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-mm-on-surface-variant hover:text-mm-on-background'
              }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Cards — side by side */}
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {/* Free */}
        <article className="flex flex-col rounded-2xl border border-mm-outline-variant/60 bg-mm-surface-container p-6 shadow-md">
          <h2 className="text-xl font-bold text-mm-on-background">Free</h2>
          <p className="mt-2 text-sm text-mm-on-surface-variant">
            Connect your email and calendar in one place.
          </p>
          <ul className="mt-6 flex-1 space-y-3">
            {FREE_PLAN_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-mm-on-surface-variant">
                <FeatureCheck />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-mm-outline-variant/40 pt-5">
            <p className="text-2xl font-bold tracking-tight text-mm-on-background">
              $0 <span className="text-sm font-semibold text-mm-on-surface-variant">/ month</span>
            </p>
          </div>
        </article>

        {/* Pro */}
        <article className="relative flex flex-col rounded-2xl border border-transparent bg-gradient-to-b from-blue-300 to-blue-500 p-6 shadow-xl dark:from-blue-400 dark:to-blue-600">
<h2 className="text-xl font-bold text-white">Pro</h2>
          <p className="mt-2 text-sm text-white/90">
            Your AI-powered email assistant that reads, remembers, and briefs you.
          </p>
          <ul className="mt-6 flex-1 space-y-3">
            {PRO_PLAN_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white">
                <FeatureCheck white />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-white/30 pt-5">
            <p className="text-2xl font-bold tracking-tight text-white">
              {cycle === 'monthly' ? '$598 / month' : '$499 / month'}
            </p>
          </div>
        </article>

        {/* Enterprise */}
        <article className="flex flex-col rounded-2xl border border-mm-outline-variant/60 bg-mm-surface-container p-6 shadow-md">
          <h2 className="text-xl font-bold text-mm-on-background">Enterprise</h2>
          <p className="mt-2 text-sm text-mm-on-surface-variant">
            Everything in Pro, plus custom integrations, SSO, and dedicated support.
          </p>
          <div className="mt-8 flex flex-1 flex-col items-center justify-center gap-2 py-8 text-center">
            <p className="text-2xl font-bold tracking-tight text-mm-on-background">
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

      {/* Billing notes */}
      <section className="mt-12 grid gap-6 md:grid-cols-2" aria-label="Billing notes">
        <div className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6">
          <h2 className="font-display text-lg font-semibold text-mm-on-background">
            How billing works
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mm-on-surface-variant">
            Manage your plan directly in the MindMesh app after{' '}
            <Link
              href={MARKETING_CTA_HREF}
              className="font-medium text-mm-primary underline underline-offset-2 hover:text-mm-primary-dim"
            >
              downloading
            </Link>
            . Free plan is always available; Pro unlocks when you upgrade inside the app.
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
