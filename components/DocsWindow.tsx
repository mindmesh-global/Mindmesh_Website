'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

interface DocsWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

type DocId = 'faq' | 'privacy' | 'terms';

const navItems: { id: DocId; label: string; icon: string; title: string; subtitle: string }[] = [
  { id: 'faq', label: 'FAQ', icon: '?', title: 'MindMesh FAQ', subtitle: 'Frequently asked questions' },
  { id: 'privacy', label: 'Privacy Policy', icon: '🔒', title: 'Privacy Policy', subtitle: 'How we collect, use, and protect your information' },
  { id: 'terms', label: 'Terms & Conditions', icon: '📋', title: 'Terms and Conditions', subtitle: 'Terms of service for MindMesh' },
];

const accordionItems: { title: string; content: React.ReactNode }[] = [
  {
    title: 'What does MindMesh do?',
    content: (
      <>
        <p className="mb-3">
          MindMesh connects your email, calendar, and activity into one AI-powered memory. It
          helps you find things faster, understand what matters, and turn scattered information
          into clear next steps. It can:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Pull in email and calendar data from Gmail, Outlook, Google Calendar, Outlook Calendar and any other Mail Provider in real time</li>
          <li>Enrich messages and events with summaries, inferred facts, and to-dos</li>
          <li>Let you search and ask questions in natural language</li>
          <li>Show Today's Overview for what needs attention now</li>
          <li>Generate Yesterday’s Narrative so you can catch up quickly</li>
          <li>Support fast, contextual help through Mascot Chat and the Sensor Bar</li>
        </ul>
      </>
    ),
  },
  {
    title: 'What problem does MindMesh solve?',
    content: (
      <>
        <p className="font-medium text-gray-800 mb-1">Problem:</p>
        <p className="mb-2">
          The problem is not just too many apps. It is that the context between them gets lost.
          Important details live across email, calendar, notes, and other tools, but there is no
          shared memory connecting them. That leads to missed follow-ups, constant context
          switching, and the feeling that you are always reconstructing what happened.
        </p>
        <p className="mb-2">
          MindMesh solves this by adding a memory layer on top of your workflow. It pulls context
          from the tools you use, keeps track of what matters, builds a continuous narrative over
          time, and helps you decide what to do next through AI-powered search and assistant
          workflows.
        </p>
      </>
    ),
  },
  {
    title: 'Who is MindMesh for?',
    content: (
      <>
        <p className="mb-3">
          MindMesh is for people who live in their inbox, calendar, and browser all day and need a
          better way to keep context together. It is built for busy professionals and knowledge
          workers who manage multiple accounts, high message volume, and meeting-heavy schedules,
          and who want help understanding what matters, what needs action, and what comes next.
        </p>
        <p className="mb-1">It is especially valuable if you want to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Keep important emails and events from slipping through the cracks</li>
          <li>Start the day with a clear summary instead of a backlog</li>
          <li>Review what mattered yesterday without reconstructing it manually</li>
          <li>Search and ask questions across your workflow in plain language</li>
        </ul>
      </>
    ),
  },
  {
    title: 'How do I know MindMesh is safe to install and connect?',
    content: (
      <>
        <p className="mb-3">
          MindMesh is built to be trustworthy at both the account and desktop level. Our
          integrations are verified with major platforms where required, and the desktop app is
          distributed with platform signing so you can install it with confidence.
        </p>
        <p className="mb-2">That includes:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Google verification for supported Google integrations</li>
          <li>Microsoft verification for supported Microsoft integrations</li>
          <li>Apple Developer signing and notarization for macOS distribution</li>
          <li>Windows code signing through a trusted certificate authority</li>
        </ul>
        <p className="mb-2">
          MindMesh is also built with a local-first approach, so core memory stays close to the
          user while external services are used selectively for connected features and AI
          functionality.
        </p>
      </>
    ),
  },
  {
    title: 'How is MindMesh different from email clients?',
    content:
      'Email clients help you manage messages. MindMesh helps you manage context. It treats tools like Gmail, Outlook, and Calendar as sources of information, then filters, enriches, and connects that information so you can focus on what actually matters. Instead of sorting through raw activity, you get summaries, narratives, semantic search, and an AI assistant that helps you understand and act on your day.',
  },
  {
    title: 'What is Mascot?',
    content: (
      <>
        <p className="mb-3">
          Mascot is MindMesh&apos;s chat-style AI assistant that lives on your Desktop and can be launched with a single click. It gives you a dedicated conversational
          interface where you can ask questions about your email, calendar, and saved memory in
          natural language.
        </p>
        <p className="mb-3">
          Unlike a simple chat box, Mascot is built for ongoing context. It keeps conversation
          continuity across follow-up questions, can ask clarifying questions when your request is
          ambiguous, and uses MindMesh&apos;s memory and retrieval pipeline to return answers
          grounded in your actual workflow.
        </p>
        <p className="mb-2">You can use Mascot to do things like:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>ask what needs your attention right now</li>
          <li>summarize your day</li>
          <li>find important emails or meetings</li>
          <li>prepare for upcoming events</li>
          <li>follow up on earlier questions without starting over</li>
        </ul>
      </>
    ),
  },
  {
    title: 'What is Sensor Bar?',
    content: (
      <>
        <p className="mb-3">
          Sensor Bar is MindMesh&apos;s fast command layer for quick queries and actions. It can
          surface email and calendar context, launch installed apps, and use built-in plugins for
          things like dictionary lookups, currency conversion, timezone conversion, math, and unit
          conversion.
        </p>
        <p className="mb-2">
          It is designed for lightweight, high-speed interactions, so you can get an answer,
          preview key information, or trigger an action without opening a full chat flow.
        </p>
      </>
    ),
  },
  {
    title: "What is Today's Overview?",
    content: (
      <>
        <p className="mb-3">
          Today&apos;s Overview is your daily AI briefing in MindMesh. It aggregates relevant
          email and calendar activity, highlights inferred facts, to-dos, and scheduling conflicts,
          and gives you a concise summary of what deserves attention today. This is the first thing you see when you open MindMesh and keeps refreshing as the day progreses.
        </p>
        <p className="mb-2">
          Instead of digging through inboxes and events one by one, you get a clearer picture of
          your day in one place.
        </p>
      </>
    ),
  },
  {
    title: 'What does MindMesh actually remember?',
    content: (
      <>
        <p className="mb-3">
          MindMesh remembers the parts of your digital life that are most useful later: email
          activity, calendar events, key details, inferred facts, to-dos, summaries, and daily
          narratives.
        </p>
        <p className="mb-2">
          Instead of just storing raw messages and events, it builds searchable memory from them,
          so you can find what happened, understand what mattered, and ask questions about it later
          in natural language.
        </p>
      </>
    ),
  },
  {
    title: 'Where is my data stored, and how private is it?',
    content: (
      <>
        <p className="mb-3">
          MindMesh is local-first. Core memory stays close to you on-device, while some cloud
          services may be used selectively for sync, heavy compute, and AI features.
        </p>
        <p className="mb-2">
          It is designed to be privacy-conscious and to give you more control over your data than
          a typical cloud-only workflow tool.
        </p>
      </>
    ),
  },
  {
    title: 'Do I need to trust MindMesh with my inbox?',
    content: (
      <>
        <p className="mb-3">
          Yes, if you connect your inbox, you are trusting MindMesh with access to that data.
          MindMesh is designed to handle that responsibility with a local-first architecture and a
          more privacy-conscious model than a typical cloud-only productivity tool.
        </p>
        <p className="mb-2">
          In practice, that means keeping core memory close to the user, using external services
          selectively, and only accessing inbox data to power features like search, summaries,
          inferred action items, and assistant workflows.
        </p>
      </>
    ),
  },
  {
    title: 'Is MindMesh a desktop app or a web app?',
    content: (
      <>
        <p className="mb-3">
          MindMesh is a desktop app that you install on your computer. It is designed to run as a
          local-first application, with core memory and context kept close to the user rather than
          living entirely in a browser tab.
        </p>
        <p className="mb-2">
          Some connected services and AI features may still rely on cloud APIs, but the product
          itself is built as an installed desktop experience, not a typical web app.
        </p>
      </>
    ),
  },
  {
    title: "How does Yesterday's Narrative work?",
    content: (
      <>
        <p className="mb-3">
          Yesterday&apos;s Narrative takes the previous day&apos;s activity and turns it into a
          concise story. MindMesh uses the emails, meetings, inferred facts, and to-dos associated
          with that day to generate highlights, priorities, and a summary you can review quickly.
        </p>
        <p className="mb-2">
          The goal is to help you understand the shape of the day after the fact, not just scroll
          through a log of messages and events.
        </p>
      </>
    ),
  },
];

const privacyPolicySections = [
  { id: 'collect', title: '1. Information We Collect', content: 'We collect information you provide directly (e.g., account details, support requests) and usage data to improve our services. We do not sell your personal information.' },
  { id: 'use', title: '2. How We Use Your Information', content: 'Your data is used to deliver and improve MindMesh, personalize your experience, send updates, and ensure security. We use industry-standard encryption and store data locally when you choose local-first mode.' },
  { id: 'sharing', title: '3. Data Sharing', content: 'We do not share your personal information with third parties for marketing. We may share data only as required by law or with your consent for service operations.' },
  { id: 'rights', title: '4. Your Rights', content: 'You can access, correct, or delete your data through your account settings or by contacting us. You may also opt out of marketing communications at any time.' },
  { id: 'contact', title: '5. Contact', content: 'For privacy-related questions, contact us at privacy@mindmesh.example.com.' },
];

const privacyPolicyContent = (
  <div className="prose prose-sm max-w-none">
    <p className="text-sm text-gray-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
    <div className="space-y-0">
      {privacyPolicySections.map((section) => (
        <div key={section.id} className="border-b border-gray-50 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">
            {section.title}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const termsSections = [
  { id: 'acceptance', title: '1. Acceptance of Terms', content: 'By accessing or using MindMesh, you agree to these Terms and Conditions. If you do not agree, please do not use our services.' },
  { id: 'use', title: '2. Use of Service', content: 'You may use MindMesh for lawful purposes only. You are responsible for keeping your account secure and for all activity under your account. You may not misuse the service, attempt to gain unauthorized access, or interfere with other users.' },
  { id: 'ip', title: '3. Intellectual Property', content: 'MindMesh and its content, features, and functionality are owned by us and are protected by copyright, trademark, and other laws. You may not copy, modify, or create derivative works without permission.' },
  { id: 'liability', title: '4. Limitation of Liability', content: 'To the fullest extent permitted by law, MindMesh shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.' },
  { id: 'changes', title: '5. Changes', content: 'We may update these terms from time to time. We will notify you of material changes by posting the new terms and updating the "Last updated" date. Continued use after changes constitutes acceptance.' },
];

const termsContent = (
  <div className="prose prose-sm max-w-none">
    <p className="text-sm text-gray-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
    <div className="space-y-0">
      {termsSections.map((section) => (
        <div key={section.id} className="border-b border-gray-50 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">
            {section.title}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default function DocsWindow({ dragControls, onClose, onMinimize }: DocsWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocId>('faq');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleClose = () => {
    onClose?.();
  };

  const handleFullscreen = async () => {
    if (!windowRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await windowRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="w-full min-h-0 flex-1 flex flex-col">
      <div
        ref={windowRef}
        className={`w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none max-w-none h-screen' : 'max-w-[1600px] min-h-0 flex-1'
        }`}
      >
        {/* Title bar */}
        <div
          className={`bg-gray-800/80 border-b border-gray-700/50 px-4 py-3 flex items-center gap-2 flex-shrink-0 select-none ${dragControls ? 'cursor-grab active:cursor-grabbing' : ''}`}
          onPointerDown={dragControls ? (e) => { if ((e.target as HTMLElement).closest('button')) return; dragControls.start(e); } : undefined}
          style={dragControls ? { touchAction: 'none' } : undefined}
        >
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors active:scale-90"
              title="Close"
              aria-label="Close window"
            />
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 transition-colors active:scale-90"
              title="Minimize"
              aria-label="Minimize window"
            />
            <button
              onClick={handleFullscreen}
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 transition-colors active:scale-90"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            />
          </div>
          <div className="flex-1 text-center">
            <span className="text-sm text-gray-400 font-medium">Docs</span>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 min-h-0 flex overflow-hidden bg-white ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          {/* Sidebar */}
          <aside className="w-48 bg-gray-50 border-r-2 border-gray-200 py-6 flex-shrink-0 min-h-full flex flex-col">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
              Documents
            </p>
            {navItems.map((item) => {
              const isActive = activeDoc === item.id;
              return (
                <div key={item.id} className="relative border-b border-gray-100 last:border-b-0">
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-600 rounded-r-full" />
                  )}
                  <button
                    onClick={() => setActiveDoc(item.id)}
                    className={`
                      w-full text-left px-4 py-3
                      flex items-center gap-3
                      text-sm transition-all duration-150
                      ${isActive
                        ? 'bg-purple-50 text-purple-700 font-semibold pl-5'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 font-normal'
                      }
                    `}
                  >
                    <div className={`
                      w-6 h-6 rounded-md flex items-center
                      justify-center text-xs flex-shrink-0
                      ${isActive
                        ? 'bg-purple-200 text-purple-700'
                        : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {item.icon}
                    </div>
                    {item.label}
                  </button>
                </div>
              );
            })}
          </aside>
          {/* Document body */}
          <main className="flex-1 overflow-y-auto px-8 pt-6 pb-4">
            {(() => {
              const currentSection = navItems.find((i) => i.id === activeDoc)!;
              return (
                <>
                  <h1 className="text-xl font-bold text-gray-900 mb-1">
                    {currentSection.title}
                  </h1>
                  <p className="text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100">
                    {currentSection.subtitle}
                  </p>
                  {activeDoc === 'faq' && (
                    <div className="max-w-2xl">
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden px-4">
                        {accordionItems.map((item, index) => {
                          const isOpen = expandedIndex === index;
                          const toggleItem = () => setExpandedIndex(isOpen ? null : index);
                          return (
                            <div key={index} className="border-b border-gray-100 last:border-b-0">
                              <button
                                onClick={toggleItem}
                                className="w-full text-left py-4 px-2 flex items-center justify-between text-sm font-medium text-gray-800 hover:text-purple-700 transition-colors"
                              >
                                <span>{item.title}</span>
                                <span className={`text-gray-400 text-xs transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                                  ▼
                                </span>
                              </button>
                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pb-4 px-2 text-sm text-gray-500 leading-relaxed">
                                      {item.content}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {activeDoc === 'privacy' && (
                    <div className="max-w-2xl">
                      {privacyPolicyContent}
                    </div>
                  )}
                  {activeDoc === 'terms' && (
                    <div className="max-w-2xl">
                      {termsContent}
                    </div>
                  )}
                </>
              );
            })()}
          </main>
        </div>
      </div>
    </div>
  );
}
