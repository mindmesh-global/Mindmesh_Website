import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import { Manrope } from 'next/font/google';
import Link from 'next/link';
import SiteNav from '../../components/layout/SiteNav';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const faqs = [
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
    question: 'What is the Sensor Bar?',
    answer:
      'Sensor is the always-available command bar that lets you ask questions, move around the product, and get to the right information fast.',
  },
  {
    question: 'What is Mascot?',
    answer:
      'Mascot is the conversational, proactive assistant layer inside MindMesh that helps surface what matters in a more human way.',
  },
  {
    question: "What is Yesterday's Narrative?",
    answer:
      'It is a quick recap of the previous day that helps you remember what happened and reconnect with unfinished threads.',
  },
  {
    question: 'Which apps can I connect?',
    answer:
      'MindMesh supports Gmail, Google Calendar, Outlook Email, Outlook Calendar, and SMTP mailbox connections.',
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
] as const;

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers about MindMesh privacy, permissions, features, and how the product works.',
  openGraph: {
    title: 'MindMesh FAQ',
    description:
      'Answers about privacy, permissions, features, and how MindMesh helps you stay on top of work.',
    url: 'https://mindmesh.global/faq',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh FAQ',
    description:
      'Answers about privacy, permissions, features, and how MindMesh helps you stay on top of work.',
    images: [OG_IMAGE_URL],
  },
};

export default function FaqPage() {
  return (
    <main
      className={`${manrope.className} min-h-screen overflow-x-hidden px-0 pb-24 pt-32 text-[#dee5ff] selection:bg-[#0e69dc] selection:text-white`}
      style={{ backgroundColor: '#060e20' }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html,
            body {
              background: #060e20 !important;
              color: #dee5ff !important;
              font-family: 'Manrope', sans-serif;
            }

            details > summary::-webkit-details-marker {
              display: none;
            }

            .faq-page-shell {
              background: #060e20;
            }
          `,
        }}
      />

      <div className="faq-page-shell">
      <SiteNav activeHref="/faq" navBackgroundColor="#060e20" />

      <section className="relative mx-auto mb-24 max-w-7xl px-8">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#0e69dc]/10 blur-[120px]" />
        <div className="relative z-10 max-w-4xl text-center md:text-left">
          <h1 className="mb-10 text-5xl font-semibold leading-[1.1] tracking-tighter text-[#dee5ff] md:text-7xl">
            Everything you would ask before trusting AI with your workday.
          </h1>
          <p className="mb-10 max-w-3xl text-xl font-medium leading-relaxed text-[#99aad9]">
            Clear answers about privacy, permissions, features, and how MindMesh helps you stay on
            top of work without staying buried in it.
          </p>
         
        </div>
      </section>

      <section className="mx-auto mb-32 max-w-4xl px-8">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl bg-[#081734] shadow-[0_12px_28px_-20px_rgba(0,0,0,0.95)] ring-1 ring-[#9ec0ff]/10 transition-all duration-300 hover:bg-[#0b1d42] hover:ring-[#9ec0ff]/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-6">
                <h2 className="text-lg font-extrabold tracking-[-0.01em] text-[#f4f7ff]">
                  {faq.question}
                </h2>
                <ChevronDown className="h-5 w-5 text-[#c6d8ff] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 pt-0 leading-relaxed text-[#99aad9]">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-8 pb-24 text-center">
        <div
          className="relative overflow-hidden rounded-[2.5rem] border border-[#364770]/20 p-16"
          style={{ background: 'linear-gradient(to bottom, #0a1836, #060e20)' }}
        >
          <div className="absolute inset-0 bg-[#adc6ff]/5 blur-[80px]" />
          <div className="relative z-10">
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
              Still evaluating it? Start with the product built around clarity and control.
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
              <Link
                href="/waitlist"
                className="inline-flex w-full items-center justify-center rounded-full px-12 py-5 text-xl font-bold text-[#0e2d63] shadow-[0_14px_40px_-14px_rgba(173,198,255,0.9),inset_0_1px_0_rgba(255,255,255,0.95)] transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] md:w-auto"
                style={{
                  background:
                    'linear-gradient(90deg, #4c8deb 0%, #7fb0ff 45%,rgba(240, 241, 242, 0.76) 75%,rgba(216, 212, 212, 0.86) 100%)',
                }}
              >
                Try MindMesh
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
    </main>
  );
}
