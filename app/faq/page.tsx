import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';
import { SENSOR_MASCOT_FAQ_LINKS } from '@/lib/marketing-sensor-mascot-content';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const integrationNames = MARKETING_INTEGRATIONS.map((app) => app.displayName).join(', ');

const sensorFaq = SENSOR_MASCOT_FAQ_LINKS[0];
const mascotFaq = SENSOR_MASCOT_FAQ_LINKS[1];

type FaqItem = {
  question: string;
  answer: string;
  learnMore?: { label: string; href: string };
};

const faqs: readonly FaqItem[] = [
  {
    question: 'What is MindMesh?',
    answer:
      'MindMesh is a privacy-first desktop AI assistant that helps you understand your inbox, calendar, daily priorities, and connected apps in one place.',
  },
  {
    question: 'Where is my data stored?',
    answer:
      'MindMesh is built around a local-first architecture designed to keep indexed work context handled close to the user for privacy.',
  },
  {
    question: 'Does MindMesh train on my data?',
    answer:
      'MindMesh is designed to help you work with your data, not turn it into a training asset.',
  },
  {
    question: 'Can MindMesh send emails for me?',
    answer:
      'Supported Gmail access is read-only in the standard connection flow, so MindMesh is focused on helping you search, summarize, and stay organized.',
  },
  {
    question: 'Can MindMesh edit my calendar?',
    answer:
      'Supported Google Calendar access is read-only in the standard connection flow.',
  },
  {
    question: sensorFaq.question,
    answer: sensorFaq.answer,
    learnMore: sensorFaq.learnMore,
  },
  {
    question: mascotFaq.question,
    answer: mascotFaq.answer,
    learnMore: mascotFaq.learnMore,
  },
  {
    question: "What is Yesterday's Narrative?",
    answer:
      'It is a quick recap of the previous day that helps you remember what happened and reconnect with unfinished threads.',
  },
  {
    question: 'Which apps can I connect?',
    answer: `MindMesh supports ${integrationNames}. See Connected apps for how each category fits Connect, Focus, and Execute.`,
    learnMore: { label: 'View connected apps →', href: '/connected-apps' },
  },
  {
    question: 'How does MindMesh help me stay on top of work without being online all day?',
    answer:
      'MindMesh reduces constant checking by bringing your inbox, meetings, summaries, and recaps into one desktop workspace.',
  },
  {
    question: 'How does MindMesh help with work-life balance?',
    answer:
      'By helping you catch up faster, reduce context switching, and close open loops sooner, MindMesh makes it easier to mentally switch off at the end of the day.',
  },
  {
    question: 'Is MindMesh a web app or a desktop app?',
    answer:
      'MindMesh is designed as a desktop-native experience for people who want a faster, more focused, more private way to manage work context.',
  },
];

const pageDescription =
  'Answers about MindMesh privacy, permissions, features, and how the product works.';

export const metadata: Metadata = {
  title: 'FAQ',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | FAQ',
    description: pageDescription,
    url: 'https://mindmesh.global/faq',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | FAQ',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

export default function FaqPage() {
  return (
    <MarketingDepthLayout
      eyebrow="FAQ"
      title="Everything you would ask before trusting AI with your workday"
      subtitle="Clear answers about privacy, permissions, features, and how MindMesh helps you stay on top of work without staying buried in it."
      backHref="/"
      backLabel="Back to homepage →"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            details > summary::-webkit-details-marker {
              display: none;
            }
          `,
        }}
      />

      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[720px] space-y-3 px-6">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container transition-colors open:border-mm-outline-variant hover:bg-mm-surface-container-high"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6">
                <h2 className="font-display text-base font-semibold tracking-tight text-mm-on-background md:text-lg">
                  {faq.question}
                </h2>
                <ChevronDown className="h-5 w-5 shrink-0 text-mm-on-surface-variant transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 pt-0 text-sm leading-relaxed text-mm-on-surface-variant md:px-6 md:pb-6 md:text-base">
                {faq.answer}
                {faq.learnMore ? (
                  <p className="mt-3">
                    <Link
                      href={faq.learnMore.href}
                      className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                    >
                      {faq.learnMore.label}
                    </Link>
                  </p>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mx-auto max-w-[720px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Still evaluating? Start with the product built around clarity and control.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant">
            Join the waitlist, or dig into security and privacy detail first.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={MARKETING_CTA_HREF}
              className="inline-flex items-center justify-center rounded-md bg-mm-primary-fixed px-6 py-3 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Join waitlist
            </Link>
            <Link
              href="/security"
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              Learn about security →
            </Link>
          </div>
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
