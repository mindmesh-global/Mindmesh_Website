import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { ProductTheaterSensor } from '@/components/marketing/sections/ProductTheaterSensor';
import { ProductTheaterSensorCalc } from '@/components/marketing/sections/ProductTheaterSensorCalc';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sensor',
  description:
    'Universal command bar for work and everyday tasks. Type what you need and act without leaving your flow.',
  openGraph: {
    title: 'MindMesh | Sensor',
    description:
      'Universal command bar for work and everyday tasks. Type what you need and act without leaving your flow.',
    url: 'https://mindmesh.global/sensor',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Sensor',
    description:
      'Universal command bar for work and everyday tasks. Type what you need and act without leaving your flow.',
    images: [OG_IMAGE_URL],
  },
};

const howItWorksSteps = [
  {
    number: '01',
    title: 'Open Sensor',
    description: 'Call up the bar from anywhere in MindMesh with a single shortcut.',
  },
  {
    number: '02',
    title: 'Type what you need',
    description: 'Short commands or plain-English questions: open, find, convert, ask.',
  },
  {
    number: '03',
    title: 'Confirm and go',
    description: "Pick a result and MindMesh acts. No tab hunt, no context switch.",
  },
] as const;

const capabilityCards = [
  {
    title: 'Open and jump',
    description: 'Launch apps, emails, calendar events, and Jira tickets from one bar — without touching the mouse or opening a new tab.',
  },
  {
    title: 'Quick answers',
    description: 'Calculations, unit conversions, and short factual lookups — answered instantly without leaving your flow.',
  },
  {
    title: 'Find in your connected context',
    description: "Search across emails, meetings, and tasks that MindMesh already knows about. \"Find the email from Dana about the Q2 rollout\" just works.",
  },
  {
    title: 'Stay in flow',
    description: 'Sensor is designed to answer and close. You act, return to what you were doing, and keep the mental stack you built.',
  },
] as const;

export default function SensorPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Sensor"
      title="Your universal command bar."
      subtitle="Type what you need from anywhere in MindMesh — open apps, find emails, calculate, convert, ask. No tab switching."
    >
      {/* How it works */}
      <section className="bg-mm-background pb-10 pt-10 lg:pb-12 lg:pt-12">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            How Sensor works.
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {howItWorksSteps.map((step) => (
              <li key={step.number} className="min-w-0">
                <p className="font-display text-sm font-semibold tabular-nums text-mm-on-surface-variant">
                  {step.number}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-mm-on-background">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProductTheaterSensor />
      <ProductTheaterSensorCalc />

      {/* Capabilities */}
      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low pb-10 pt-10 lg:pb-12 lg:pt-12">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            What Sensor can do.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Sensor is built for the kind of task that takes 30 seconds to do and 3 minutes to recover from — because you had to leave what you were working on to do it.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {capabilityCards.map(({ title, description }) => (
              <div
                key={title}
                data-light-window=""
                className="rounded-xl p-6"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.18)',
                  boxShadow:
                    '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
                }}
              >
                <h3 className="font-display text-lg font-semibold text-mm-on-background">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sensor vs Mascot */}
      <section className="bg-mm-background pb-10 pt-10 lg:pb-12 lg:pt-12">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Two companion surfaces. Different jobs.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Sensor is for the 30-second task. Mascot is for the conversation that needs context. Together they handle everything between.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {/* Sensor card */}
            <div
              data-light-window=""
              className="rounded-xl p-6"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.18)',
                boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-mm-primary">Sensor</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-mm-on-background">Instant action.</h3>
              <p className="mt-3 text-sm leading-relaxed text-mm-on-surface-variant">
                For commands and jumps that need to happen in seconds — open apps, calculate, find a file, search your emails — without needing to build context first.
              </p>
              <ul className="mt-4 space-y-2">
                {['"Open Calendar"', '"15% of 240"', '"Find emails from Dana"'].map((ex) => (
                  <li key={ex} className="flex items-center gap-2 text-sm text-mm-on-surface-variant">
                    <span className="text-mm-primary">→</span>
                    <span className="font-mono text-xs">{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mascot card */}
            <div
              data-light-window=""
              className="rounded-xl p-6"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.18)',
                boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-mm-primary">Mascot</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-mm-on-background">Grounded conversation.</h3>
              <p className="mt-3 text-sm leading-relaxed text-mm-on-surface-variant">
                For questions that need your actual work context — what happened yesterday, what's been left open, what should you focus on next.
              </p>
              <ul className="mt-4 space-y-2">
                {['"What should I focus on?"', '"Did Dana reply to my email?"', '"Summarise yesterday"'].map((ex) => (
                  <li key={ex} className="flex items-center gap-2 text-sm text-mm-on-surface-variant">
                    <span className="text-mm-primary">→</span>
                    <span className="font-mono text-xs">{ex}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Link
                  href="/mascot"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                >
                  Explore Mascot →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low pb-10 pt-10 lg:pb-12 lg:pt-12">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <p className="text-base text-mm-on-surface-variant lg:text-lg">
            Sensor works from the same local-first MindMesh layer. Everything it finds is already indexed on your device — nothing new is uploaded when you search.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Learn about security
            </Link>
          </div>
        </div>
      </section>

    </MarketingDepthLayout>
  );
}
