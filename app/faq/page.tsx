import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const integrationNames = MARKETING_INTEGRATIONS.map((app) => app.displayName).join(', ');

type FaqItem = {
  question: string;
  answer: string;
  learnMore?: { label: string; href: string };
};

const faqs: readonly FaqItem[] = [
  // ── The basics ───────────────────────────────────────────────────────────
  {
    question: 'What is MindMesh?',
    answer:
      'MindMesh is a proactive attention layer for fractional leaders and consultants. It reads your email, Slack, Jira, and calendars across every client, ranks what needs your attention, and prepares actions — all without being prompted.',
  },
  {
    question: "How long does setup take? I don't have time to configure another tool.",
    answer:
      "Connecting your first account takes about five minutes — standard OAuth, same as connecting any app. The initial sync runs in the background. You don't configure rules or define priorities upfront. MindMesh starts reading immediately and gets more accurate as you use it and correct it. There's no week-long onboarding.",
  },
  {
    question: 'I already use Notion, Slack, and Jira. Do I have to change how I work?',
    answer:
      "No. MindMesh reads the tools you already use — it doesn't replace them. Your clients still message you in Slack, your tasks still live in Jira, your emails still go through Gmail or Outlook. MindMesh sits above those tools and reads them as sources. You keep working exactly as you do now. The difference is you also get one ranked view of what needs you across all of them, without switching between tabs.",
  },
  {
    question: 'Which apps can I connect?',
    answer: `MindMesh supports ${integrationNames}. Each source is read as context — ranked, grouped, and surfaced to you without replacing the tools your clients already use.`,
    learnMore: { label: 'View connected apps', href: '/connected-apps' },
  },
  {
    question: 'Is this just another AI tool that looks good in the demo but breaks in real use?',
    answer:
      "Fair scepticism. MindMesh is in active development and early access — there are rough edges. What we can say is that the core functionality (reading your sources, ranking what's urgent, preparing actions with your approval) works in production for the professionals currently using it. The demos on this site show the actual app. If something breaks, you'll see it — and there's a direct line to the team.",
  },

  // ── How it works ─────────────────────────────────────────────────────────
  {
    question: 'How does MindMesh decide what is important for me?',
    answer:
      "MindMesh uses a multi-stage attention engine — not a simple time-based sort. It first detects relationships between items across sources: an unread email from a client, a Slack thread about the same project, and an open Jira ticket all get grouped into one attention object. It then scores each group using signals like urgency, recency, sender context, and pending actions. Every item that surfaces in Now comes with a plain-English reason so you can see exactly why it ranked there. And if it gets something wrong — you move an item or dismiss a priority — MindMesh learns from that correction and adjusts future rankings accordingly.",
  },
  {
    question: 'Can I tell MindMesh what is important to me?',
    answer:
      "Yes. Through instruction profiles — you can set named profiles with custom instructions and response preferences that shape how MindMesh reads and prioritises your context. You can also dismiss items you don't want surfaced again. The ranking learns over time as the product matures, but the most direct way to shape it today is through instruction profiles.",
  },
  {
    question: 'What happens when it gets a priority wrong?',
    answer:
      "You move it. If MindMesh ranks something as Now and it doesn't belong there, move it to Later or Quietly Handled — and it learns from that correction for similar items in the future. Nothing is locked. You can open Quietly Handled at any time to inspect what it sorted away. Every ranked item comes with a reason so you can see the logic, disagree with it, and correct it.",
  },
  {
    question: "Won't this just give me more notifications and more to manage?",
    answer:
      "The opposite. MindMesh is built to surface less, not more. Instead of every notification from every app competing for your attention, you get one ranked view of what actually needs you — and everything else is quietly handled. The goal is to replace the compulsion to check Gmail, Slack, and Jira separately with one clear answer: here's what needs you right now, and here's where everything else went.",
  },
  {
    question: 'What if MindMesh misses an email or event?',
    answer:
      "MindMesh syncs continuously and uses a checkpoint system — if a sync is interrupted, it resumes from where it left off rather than starting over. When a provider API fails (rate limit, network error), the sync retries automatically with exponential backoff. Every item that arrives is placed somewhere: Now, Later Today, or Quietly Handled — nothing is silently discarded. If you suspect something is missing, open Quietly Handled to inspect everything that came in. Nothing disappears without a record.",
  },

  // ── Actions & automation ─────────────────────────────────────────────────
  {
    question: 'Can it automate things for me?',
    answer:
      "MindMesh prepares actions — it doesn't take them autonomously. When something needs a reply, it drafts it. When a meeting needs blocking, it stages the calendar event. When a Jira ticket needs updating, it queues the change. Everything waits in an approval queue until you confirm it. This is intentional: for professionals handling confidential client work, an AI that acts without asking is a liability, not a feature. MindMesh gives you the leverage of automation with the control of a human decision at every step.",
  },
  {
    question: 'Can MindMesh send emails or edit my calendar?',
    answer:
      'Connected apps use read-only permissions where it matters. MindMesh can prepare a draft reply or a calendar block, but nothing sends or changes until you approve it explicitly.',
  },

  // ── Why not just use X ───────────────────────────────────────────────────
  {
    question: "What's the advantage of MindMesh over Claude? I can do the same thing on Claude.",
    answer:
      "You can — if you're willing to do all the work. Claude is reactive: you notice a problem, you gather the relevant emails and threads, you write a prompt, and then it answers. That's three steps before you get value, and it only works for the things you thought to check. MindMesh is proactive — it reads your email, Slack, Jira, and calendars continuously, notices what needs your attention before you do, and surfaces it with a reason. It also handles multiple clients simultaneously, keeps your data on your device (not on Anthropic's servers), and holds every action for your approval. Claude answers questions. MindMesh watches your work.",
  },

  // ── Privacy & data ───────────────────────────────────────────────────────
  {
    question: 'Where is my data stored?',
    answer:
      'Your work context and vector memory stay on your device by default. MindMesh uses local-first architecture so your emails, messages, and client context are indexed locally, not uploaded to a cloud server.',
  },
  {
    question: "You say you're local-first, but you use AI models. Isn't that sending my data to the cloud?",
    answer:
      "Fair challenge — and the honest answer is: it depends on the feature. Your index, vector memory, and work context are stored locally on your device. That part is genuinely local-first. AI enrichments — summaries, prioritisation signals, context extraction — do involve API calls, which means content is sent to a cloud AI provider for processing. If you use BYOK (Bring Your Own Key), those calls go through your own account rather than MindMesh's infrastructure, so you control whose cloud processes your data. Without BYOK, enrichment calls route through MindMesh's infrastructure with standard API data-handling terms. We're not claiming zero cloud involvement — we're claiming that storage, memory, and context live on your machine, and that you have control over the AI processing layer.",
  },
  {
    question: 'Does MindMesh train on my data?',
    answer:
      'No. Your inbox, messages, and client context are never used for model training — by MindMesh or any third party.',
  },
  {
    question: 'Can I use my own API key?',
    answer:
      "Yes. MindMesh supports Bring Your Own Key (BYOK) — connect your own API key so AI enrichments run through your account, not ours. Your data never passes through MindMesh's AI infrastructure when you do.",
  },
  {
    question: 'Who at MindMesh can see my emails and messages?',
    answer:
      "Nobody at MindMesh has access to your emails, messages, or client context. Your work context is indexed locally on your device — it never passes through MindMesh infrastructure. The only content that involves MindMesh's servers is AI enrichment calls (summaries, prioritisation signals), and that only applies if you're not using BYOK. Using your own API key routes those calls through your own account entirely.",
  },
  {
    question: "Can my clients' data get mixed up with each other?",
    answer:
      "No. In the desktop app you tag each connected source — Gmail account, Slack workspace, Jira site — to a specific client. MindMesh always knows which client an item belongs to, and when it prepares a draft or an action, the context used is scoped to that client only. One client's communications never inform an action for another. Every backend query is also scoped by user ID at the database level, so cross-user and cross-client data access isn't possible in the query patterns.",
  },
  {
    question: 'Do you still hold my data once I remove my account?',
    answer:
      "For local data — your indexed context, vector memory, and enriched content stored on your device — deleting MindMesh removes it from your machine entirely. That data was never ours to hold. For server-side data — your account credentials, sync state, and any backend records — we delete this when you remove your account. We don't retain your work context after you leave. For the full legal terms on data retention, deletion timelines, and your rights, read the Privacy Policy.",
    learnMore: { label: 'Privacy policy', href: '/privacy' },
  },

  // ── Compliance ───────────────────────────────────────────────────────────
  {
    question: 'Is MindMesh SOC 2 compliant?',
    answer:
      "Not yet. MindMesh does not currently hold SOC 2, HIPAA, or ISO 27001 certification. We're being direct about this rather than hedging. What we do have is a local-first architecture that means your work context never lives on a cloud server in the first place — which provides a different kind of protection than a certified cloud tool that stores everything centrally. For individual fractional professionals, this is often a stronger practical guarantee than a certification. SOC 2 is on our roadmap as we grow toward enterprise customers who require it. Until then, see the Trust and Security pages for what we can verify today.",
  },
  {
    question: 'What if I work in a regulated industry — legal, finance, healthcare?',
    answer:
      "MindMesh doesn't currently hold SOC 2, HIPAA, or industry-specific compliance certifications. If your firm has data handling requirements mandated by regulation, check with your compliance team before connecting client accounts. The local-first architecture means indexed data stays on your device rather than in a shared cloud database, which addresses some concerns — but we won't represent ourselves as a compliance tool for regulated environments. We'd rather you make an informed decision than a regretted one.",
  },

];

const pageDescription =
  'Straight answers about MindMesh — storage, permissions, training, BYOK, and how the product works.';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MarketingDepthLayout
        eyebrow="FAQ"
        title="Straight answers."
        subtitle="On storage, permissions, training, and BYOK — no hedging, no endorsement language beyond what we can verify."
        backHref="/"
        backLabel="Back to homepage"
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
        <div className="mx-auto w-full max-w-[720px] px-6">
          <p className="mb-8 text-sm text-mm-on-surface-variant">
            We&apos;ve tried to answer most questions here. For anything else, email us at{' '}
            <a
              href="mailto:support@mindmesh.global"
              className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              support@mindmesh.global
            </a>
          </p>
          <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              data-light-window=""
            className="group rounded-xl transition-colors"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.18)',
              boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
            }}
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
                      className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-4 py-2 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
                    >
                      {faq.learnMore.label}
                    </Link>
                  </p>
                ) : null}
              </div>
            </details>
          ))}
          </div>
        </div>
      </section>

      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mx-auto max-w-[720px] px-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Learn about security
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Trust page
            </Link>
          </div>
        </div>
      </section>
      </MarketingDepthLayout>
    </>
  );
}
