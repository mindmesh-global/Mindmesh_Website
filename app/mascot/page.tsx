import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { ProductTheaterMascot } from '@/components/marketing/sections/ProductTheaterMascot';
import { ProductTheaterMascotAttachment } from '@/components/marketing/sections/ProductTheaterMascotAttachment';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Mascot',
  description:
    'Mascot lives at the edge of your desktop, connected to your email, calendar, and memory. Ask it anything, let it act — always with your approval.',
  openGraph: {
    title: 'MindMesh | Mascot',
    description:
      'Mascot lives at the edge of your desktop, connected to your email, calendar, and memory. Ask it anything, let it act — always with your approval.',
    url: 'https://mindmesh.global/mascot',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Mascot',
    description:
      'Mascot lives at the edge of your desktop, connected to your email, calendar, and memory. Ask it anything, let it act — always with your approval.',
    images: [OG_IMAGE_URL],
  },
};

const howItWorksSteps = [
  {
    number: '01',
    title: 'Lives on your desktop',
    description:
      'Mascot sits as a floating character at the corner of your screen — always accessible, never in the way. No tab to open, no app to switch to.',
  },
  {
    number: '02',
    title: 'Already read everything',
    description:
      'From the moment you connect your apps, Mascot builds memory from your email, Slack, calendar, and tasks. When you ask, it already knows.',
  },
  {
    number: '03',
    title: 'Asks, answers, and acts',
    description:
      "Mascot doesn't just answer questions — it drafts replies, blocks calendar time, and follows through. Everything waits for your sign-off.",
  },
] as const;

const capabilityCards = [
  {
    title: 'Always there, never in the way',
    description:
      'Mascot lives at the corner of your desktop as a floating character. Click to open a conversation, close it when done. It stays out of your flow until you need it.',
  },
  {
    title: 'Knows what you left open',
    description:
      "Ask 'What did I leave open with Acme?' and get specific answers — open threads, pending decisions, outstanding replies — across all your connected clients.",
  },
  {
    title: 'Acts, with your sign-off',
    description:
      "When Mascot drafts a reply, blocks prep time, or stages a calendar update, nothing happens until you confirm it. It prepares, you decide.",
  },
  {
    title: 'LLM reasoning + your memory',
    description:
      'Mascot combines broad AI knowledge with the specific context of your actual work. Ask general questions or deeply specific ones — it handles both.',
  },
] as const;

export default function MascotPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Mascot"
      title="The companion that already knows your work."
      subtitle="Mascot lives at the edge of your desktop, connected to your email, calendar, and memory. Ask it anything, let it act — always with your approval."
    >
      {/* Coming Soon banner */}
      <div className="mm-content pt-8">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
            Coming Soon — Mascot is currently in development.
          </span>
        </div>
      </div>

      {/* How it works */}
      <section className="bg-mm-background pb-10 pt-10 lg:pb-12 lg:pt-12">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            More than a chatbot.
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

      <ProductTheaterMascot />
      <ProductTheaterMascotAttachment />

      {/* Capabilities */}
      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low pb-10 pt-10 lg:pb-12 lg:pt-12">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Built to act, not just answer.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Mascot knows what landed, what changed, and what's still open — because it reads from the same local context that powers MindMesh.
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

      {/* Sensor vs Mascot — same two-card layout as Sensor page */}
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
                boxShadow:
                  '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
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
              <div className="mt-5">
                <Link
                  href="/sensor"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                >
                  Explore Sensor →
                </Link>
              </div>
            </div>

            {/* Mascot card */}
            <div
              data-light-window=""
              className="rounded-xl p-6"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.18)',
                boxShadow:
                  '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
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
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low pb-10 pt-10 lg:pb-12 lg:pt-12">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <p className="text-base text-mm-on-surface-variant lg:text-lg">
            Mascot reads from your locally-indexed MindMesh memory. Answers are grounded in context that lives on your device — nothing leaves your machine unless you use a cloud AI key.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Learn about security
            </Link>
            <Link
              href={MARKETING_CTA_HREF}
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Download MindMesh
            </Link>
          </div>
        </div>
      </section>

    </MarketingDepthLayout>
  );
}
