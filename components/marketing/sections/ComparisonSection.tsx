'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MarketingSection } from '@/components/marketing/MarketingSection';

const competitors = [
  {
    name: 'Claude & ChatGPT',
    logo: '/images/icons/claude-logo.png',
    logo2: '/images/icons/openai-logo.svg',
    greatAt:
      'You can ask it anything. Summarise a document, draft an email, think through a complex problem. When you bring it the right context, it gives remarkable answers.',
    doesntDo:
      "It has no memory of your work and no awareness of what's urgent right now. Every conversation starts from zero — you have to notice the problem, decide it's worth asking, and craft the question before you get any value. The things you haven't thought to check still go unnoticed.",
    mindmeshFills:
      'MindMesh reads across your email, Slack, Jira, and calendar continuously. It notices what needs your attention before you do, ranks it by priority with a plain-English reason, and surfaces it without a single prompt.',
  },
  {
    name: 'Superhuman',
    logo: '/images/icons/superhuman-logo.svg',
    greatAt:
      "Superhuman makes email genuinely fast. The triage flow, keyboard shortcuts, instant search — it's the best email experience built. If inbox zero is your goal, it gets you there.",
    doesntDo:
      "Email is one channel. The message that actually needs you right now might be a Slack thread, a Jira comment, or a calendar conflict. Superhuman doesn't see any of that — and it has no concept of clients, so if you run four inboxes for four clients, you're managing each one separately with no view of what matters most.",
    mindmeshFills:
      'MindMesh reads email alongside Slack, Jira, and calendars — across every client — and gives you one ranked view of what needs your attention, regardless of where it came from.',
  },
  {
    name: 'Town',
    logo: '/images/icons/town-logo.png',
    greatAt:
      "Town builds a personalised AI agent — a Townie — that learns your working style, executes tasks autonomously, and handles recurring workflows across 50+ tools. If you want to delegate execution to AI, it's well-built for it.",
    doesntDo:
      "Town is built around a to-do list you give it. It doesn't continuously monitor your incoming messages across multiple client stacks to surface what needs your attention right now. And it executes autonomously — meaning it acts on your behalf without a review step at each decision. For fractionals handling confidential client work, that's a meaningful risk.",
    mindmeshFills:
      "MindMesh doesn't execute autonomously — it reads across every client's email, Slack, Jira, and calendar, surfaces what's urgent with a plain-English reason, and holds every action for your approval. The distinction between 'acts for you' and 'prepares for your approval' matters when one wrong move could affect a client relationship.",
  },
  {
    name: 'Motion',
    logo: '/images/icons/motion-logo.png',
    greatAt:
      'Motion schedules your week intelligently. It looks at your tasks and calendar and auto-blocks time so the right things get done. If getting the right things in your calendar is the problem, Motion solves it well.',
    doesntDo:
      "Motion doesn't read your messages. It doesn't know that a client just replied urgently, that a Slack thread is blocking your prep, or that a meeting conflict needs resolving before 2pm. It works with what you tell it — not what's actually happening across your client communications.",
    mindmeshFills:
      "MindMesh doesn't just schedule time — it reads the full context behind your work. It surfaces what's urgent from your messages, tells you why it matters now, and prepares the reply, the calendar block, and the task update — all waiting for your approval before anything sends.",
  },
] as const;

export function ComparisonSection() {
  const [active, setActive] = useState(0);
  const total = competitors.length;
  const prev = () => setActive((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setActive((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <MarketingSection
      id="comparison"
      title="Built differently from every tool you already use."
      subtitle="ChatGPT, Superhuman, Motion, and Town each solve one problem. MindMesh is the layer that connects all of them."
      subtitleClassName="hidden md:block"
      withDivider
      compactTop
    >
      <div className="mt-12 lg:mt-16">
        {/* All cards rendered in same grid cell — hidden ones hold height */}
        <div className="grid" aria-live="polite" aria-atomic="true">
          {competitors.map((c, i) => (
            <div
              key={c.name}
              className="col-start-1 row-start-1 transition-opacity duration-300"
              style={{ visibility: i === active ? 'visible' : 'hidden', opacity: i === active ? 1 : 0 }}
              aria-hidden={i !== active}
            >
              <div className="rounded-2xl border border-mm-outline-variant/40 bg-mm-surface-container/50 p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src={c.logo}
                      alt={c.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-xl object-contain"
                    />
                    {'logo2' in c && c.logo2 ? (
                      <Image
                        src={c.logo2}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-xl object-contain"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-mm-on-background">{c.name}</h3>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {/* Green */}
                  <div className="rounded-xl border border-green-600/30 bg-green-500/8 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-green-400">
                      What it&apos;s great at
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">{c.greatAt}</p>
                  </div>

                  {/* Red */}
                  <div className="rounded-xl border border-red-500/30 bg-red-500/8 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">
                      What it doesn&apos;t do
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">{c.doesntDo}</p>
                  </div>

                  {/* Blue */}
                  <div className="rounded-xl border border-mm-primary/30 bg-mm-primary/8 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-mm-primary">
                      Where MindMesh fills it
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">{c.mindmeshFills}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous competitor"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-mm-outline-variant/60 text-mm-on-surface-variant transition-colors hover:border-mm-outline hover:text-mm-on-surface"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Competitors">
            {competitors.map((c, i) => (
              <button
                key={c.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={c.name}
                onClick={() => setActive(i)}
                className={[
                  'rounded-full transition-all duration-200',
                  i === active
                    ? 'h-2.5 w-2.5 bg-mm-primary'
                    : 'h-2 w-2 bg-mm-outline-variant/60 hover:bg-mm-outline-variant',
                ].join(' ')}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next competitor"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-mm-outline-variant/60 text-mm-on-surface-variant transition-colors hover:border-mm-outline hover:text-mm-on-surface"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <p className="mt-12 mx-auto max-w-3xl text-center text-base leading-relaxed text-mm-on-surface-variant lg:mt-16">
        MindMesh isn&apos;t a faster inbox, a smarter chatbot, or a better scheduler. It&apos;s the
        layer that sits above all of them, reads the full context across every client, and tells you
        what to do next — with a reason why, and nothing sent without you.
      </p>
    </MarketingSection>
  );
}
