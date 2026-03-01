'use client';

import { useRef, useEffect, useState } from 'react';
import { FileText, ChevronDown, ChevronRight, Shield, Scale, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

interface DocsWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

type DocId = 'faq' | 'privacy' | 'terms';

const docItems: { id: DocId; label: string; icon: typeof Shield }[] = [
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'privacy', label: 'Privacy Policy', icon: Shield },
  { id: 'terms', label: 'Terms and Conditions', icon: Scale },
];

const accordionItems: { title: string; content: React.ReactNode }[] = [
  {
    title: 'What does Mindmesh do?',
    content: (
      <>
        <p className="mb-3">Mindmesh is a cognitive OS layer that works on top of your email, calendar, and other apps. It:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Fetches emails from Gmail & Outlook</li>
          <li>Fetches events from Google Calendar & Outlook Calendar</li>
          <li>Uses AI enrichment to understand emails and events (TODOs, inferred facts, summaries)</li>
          <li>Stores your email and calendar info in AI memory</li>
          <li>Lets you search your emails and events in natural language via semantic search</li>
          <li>Gives you a daily summary with Today&apos;s Overview</li>
          <li>Shows Daily Narrative—&quot;what mattered yesterday&quot;</li>
          <li>Lets you ask questions in natural language through the Mascot & Sensor Bar AI assistant</li>
        </ul>
      </>
    ),
  },
  {
    title: 'What problem does Mindmesh solve?',
    content: (
      <>
        <p className="font-medium text-gray-800 mb-1">Problem:</p>
        <p className="mb-2">People use 50+ apps (Gmail, Outlook, Slack, Calendar, Notion, Jira, etc.), which leads to:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          <li>Information scattered across many tools</li>
          <li>Too many notifications</li>
          <li>No single memory of what actually mattered</li>
          <li>Important things slipping through the cracks</li>
          <li>Mental overload and constant context switching</li>
        </ul>
        <p className="font-medium text-gray-800 mb-1">Mindmesh solution: One layer that</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Shows data from multiple apps in one place</li>
          <li>Remembers what actually matters</li>
          <li>Suggests what you need to do next</li>
          <li>Creates a continuous narrative of your life and work</li>
          <li>Lets you ask questions and get answers through the AI assistant</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Who is Mindmesh for?',
    content: (
      <>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li><strong>Busy professionals</strong>—who use multiple email accounts, calendars, and tools</li>
          <li><strong>Knowledge workers</strong>—who manage emails, meetings, and tasks</li>
          <li><strong>Remote workers</strong>—who want all important info in one place</li>
        </ul>
        <p className="mb-1">Anyone who wants to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Not miss important emails and events</li>
          <li>Get a daily summary and &quot;what mattered yesterday&quot;</li>
          <li>Search email and calendar in natural language</li>
          <li>Ask the AI assistant questions like &quot;What do I need to do now?&quot; or &quot;Prepare me for my next meeting&quot;</li>
        </ul>
      </>
    ),
  },
  {
    title: 'How is Mindmesh different from email clients?',
    content:
      'Mindmesh is not an email client. It\'s a cognitive layer that treats apps like Gmail and Calendar as data sources, surfaces only what matters (10–20 attention objects instead of hundreds of items), and gives you narratives instead of raw logs. The AI assistant is the main interface—you talk to your digital life instead of browsing folders and lists.',
  },
  {
    title: 'What are Mascot and Sensor Bar?',
    content:
      'Mascot is a chat-style AI assistant and Sensor Bar is a command palette. Both let you ask questions in natural language, such as "What do I need to do now?", "Summarize today", or "Prepare me for my next meeting." They use Mindmesh\'s memory and attention engine to give context-aware answers.',
  },
  {
    title: 'What is Today\'s Overview',
    content:
      'Today\'s Overview is your daily AI summary. It aggregates emails and calendar events from Gmail, Outlook, and calendars, and surfaces inferred facts, TODOs, time clashes, and a concise overview so you can start your day with clarity instead of digging through inboxes.',
  },
];

const privacyPolicyContent = (
  <div className="prose prose-sm prose-gray max-w-none">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
    <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">1. Information We Collect</h3>
    <p className="text-gray-600 mb-4">
      We collect information you provide directly (e.g., account details, support requests) and usage data to improve our services. We do not sell your personal information.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">2. How We Use Your Information</h3>
    <p className="text-gray-600 mb-4">
      Your data is used to deliver and improve MindMesh, personalize your experience, send updates, and ensure security. We use industry-standard encryption and store data locally when you choose local-first mode.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">3. Data Sharing</h3>
    <p className="text-gray-600 mb-4">
      We do not share your personal information with third parties for marketing. We may share data only as required by law or with your consent for service operations.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">4. Your Rights</h3>
    <p className="text-gray-600 mb-4">
      You can access, correct, or delete your data through your account settings or by contacting us. You may also opt out of marketing communications at any time.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">5. Contact</h3>
    <p className="text-gray-600">
      For privacy-related questions, contact us at privacy@mindmesh.example.com.
    </p>
  </div>
);

const termsContent = (
  <div className="prose prose-sm prose-gray max-w-none">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Terms and Conditions</h2>
    <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">1. Acceptance of Terms</h3>
    <p className="text-gray-600 mb-4">
      By accessing or using MindMesh, you agree to these Terms and Conditions. If you do not agree, please do not use our services.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">2. Use of Service</h3>
    <p className="text-gray-600 mb-4">
      You may use MindMesh for lawful purposes only. You are responsible for keeping your account secure and for all activity under your account. You may not misuse the service, attempt to gain unauthorized access, or interfere with other users.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">3. Intellectual Property</h3>
    <p className="text-gray-600 mb-4">
      MindMesh and its content, features, and functionality are owned by us and are protected by copyright, trademark, and other laws. You may not copy, modify, or create derivative works without permission.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">4. Limitation of Liability</h3>
    <p className="text-gray-600 mb-4">
      To the fullest extent permitted by law, MindMesh shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">5. Changes</h3>
    <p className="text-gray-600">
      We may update these terms from time to time. We will notify you of material changes by posting the new terms and updating the &quot;Last updated&quot; date. Continued use after changes constitutes acceptance.
    </p>
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
        <div className={`flex-1 min-h-0 flex overflow-hidden ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          {/* Sidebar */}
          <nav className="w-52 flex-shrink-0 bg-gray-800/50 border-r border-gray-700/50 p-3 flex flex-col gap-1">
            <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 text-xs font-medium uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              Documents
            </div>
            {docItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeDoc === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveDoc(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          {/* Document body */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-white">
            {activeDoc === 'faq' && (
              <div className="max-w-2xl mx-auto px-6 py-8">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-cyan-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Mindmesh FAQ</h2>
                </div>
                <div className="space-y-2">
                  {accordionItems.map((item, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{item.title}</span>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 shrink-0 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 shrink-0 text-gray-500" />
                          )}
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 py-3 border-t border-gray-200 bg-white text-gray-600 text-sm leading-relaxed">
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
              <div className="max-w-3xl mx-auto px-6 py-8">
                {privacyPolicyContent}
              </div>
            )}
            {activeDoc === 'terms' && (
              <div className="max-w-3xl mx-auto px-6 py-8">
                {termsContent}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
