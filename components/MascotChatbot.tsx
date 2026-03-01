'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { usePathname } from 'next/navigation';
import { useHomeSection } from '@/context/HomeSectionContext';
import type { HomeSectionId } from '@/context/HomeSectionContext';
import {
  X,
  Trash2,
  Sparkles,
  Send,
  ChevronRight,
} from 'lucide-react';

const SECTION_ORDER: HomeSectionId[] = [
  'time_clash',
  'inferred_facts',
  'todos',
  'events',
  'upcoming_events',
  'inbox',
  'daily_narrative',
  'connected_apps',
];

function getNextSection(current: HomeSectionId | null): HomeSectionId {
  if (!current) return SECTION_ORDER[0];
  const idx = SECTION_ORDER.indexOf(current);
  const nextIdx = idx < SECTION_ORDER.length - 1 ? idx + 1 : 0;
  return SECTION_ORDER[nextIdx];
}

function getSectionIndex(section: HomeSectionId | null): number {
  if (!section) return 0;
  const idx = SECTION_ORDER.indexOf(section);
  return idx >= 0 ? idx + 1 : 0;
}

const LOTTIE_CAT_URL =
  'https://lottie.host/7ac5c67a-7983-42a0-b290-2e0429865911/uvdYl2wxbT.lottie';

const DRAG_THRESHOLD = 5;
const COLLAPSED_SIZE = 300;
const CHAT_WIDTH = 1360;
const CHAT_HEIGHT = 930;
const CHAT_MIN_WIDTH = 800;
const CHAT_MIN_HEIGHT = 600;

export interface MascotChatbotProps {
  showTooltip?: boolean;
}

export default function MascotChatbot({ showTooltip: showTooltipProp = true }: MascotChatbotProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const homeSection = useHomeSection();
  const activeSection = homeSection?.activeSection ?? null;
  const sectionConfig = homeSection?.sectionConfig;
  const setActiveSection = homeSection?.setActiveSection;
  const [userDismissed, setUserDismissed] = useState(false);
  const isDashboard = pathname === '/dashboard';
  const displaySection = userDismissed ? null : (isDashboard && !activeSection ? SECTION_ORDER[0] : activeSection);
  const activeInfo = showTooltipProp && displaySection && sectionConfig ? sectionConfig[displaySection] : null;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number; cx: number; cy: number } | null>(null);
  const dragControls = useDragControls();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const updateLine = useCallback(() => {
    if (!displaySection || !tooltipRef.current) {
      setLineCoords(null);
      return;
    }
    const sectionEl = document.querySelector(`[data-home-section="${displaySection}"]`);
    if (!sectionEl) {
      setLineCoords(null);
      return;
    }
    const sectionRect = sectionEl.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const x1 = sectionRect.right;
    const y1 = sectionRect.top + sectionRect.height / 2;
    const x2 = tooltipRect.left;
    const y2 = tooltipRect.top + tooltipRect.height / 2;
    const cx = (x1 + x2) / 2 + 40;
    const cy = (y1 + y2) / 2;
    setLineCoords({ x1, y1, x2, y2, cx, cy });
  }, [displaySection]);

  useEffect(() => {
    if (!activeInfo) {
      setLineCoords(null);
      return;
    }
    const run = () => requestAnimationFrame(updateLine);
    const t = setTimeout(run, 120);
    window.addEventListener('scroll', run, true);
    window.addEventListener('resize', run);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', run, true);
      window.removeEventListener('resize', run);
    };
  }, [displaySection, activeInfo, updateLine]);

  const scrollToSection = useCallback((sectionId: HomeSectionId) => {
    const el = document.querySelector(`[data-home-section="${sectionId}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const handleTooltipNext = useCallback(() => {
    if (!setActiveSection) return;
    const idx = displaySection ? SECTION_ORDER.indexOf(displaySection) : -1;
    if (idx >= 0 && idx === SECTION_ORDER.length - 1) {
      setUserDismissed(true);
      setActiveSection(null);
      return;
    }
    const nextSection = getNextSection(displaySection);
    setActiveSection(nextSection);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection(nextSection));
    });
  }, [displaySection, setActiveSection, scrollToSection]);

  const handleTooltipSkip = useCallback(() => {
    if (!setActiveSection) return;
    setUserDismissed(true);
    setActiveSection(null);
  }, [setActiveSection]);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const pointerDownRef = useRef<{ x: number; y: number } | null>(null);
  const hasMovedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const toggleChat = useCallback(() => {
    setIsExpanded((prev) => !prev);
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isExpanded]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerDownRef.current = { x: e.clientX, y: e.clientY };
    hasMovedRef.current = false;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!pointerDownRef.current) return;
    const dx = e.clientX - pointerDownRef.current.x;
    const dy = e.clientY - pointerDownRef.current.y;
    if (Math.abs(dx) >= DRAG_THRESHOLD || Math.abs(dy) >= DRAG_THRESHOLD) {
      hasMovedRef.current = true;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!hasMovedRef.current && pointerDownRef.current) {
      toggleChat();
    }
    pointerDownRef.current = null;
  }, [toggleChat]);

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInputValue('');
    // Placeholder response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm your MindMesh assistant! How can I help you today?",
        },
      ]);
    }, 500);
  }, [inputValue]);

  const handleClearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const currentStep = getSectionIndex(displaySection);
  const totalSteps = SECTION_ORDER.length;

  const content = (
    <>
      {/* Connector line (when tooltip visible) */}
      {!isExpanded && lineCoords && (
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 2147483646, width: '100vw', height: '100vh' }}
          aria-hidden
        >
          <path
            d={`M ${lineCoords.x1} ${lineCoords.y1} Q ${lineCoords.cx} ${lineCoords.cy} ${lineCoords.x2} ${lineCoords.y2}`}
            fill="none"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Collapsed: Mascot + Tooltip */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            key="mascot-collapsed"
            className="mascot-root fixed flex flex-col items-end justify-end select-none pointer-events-none"
            style={{
              zIndex: 2147483647,
              width: COLLAPSED_SIZE,
              height: COLLAPSED_SIZE,
              bottom: 10,
              right: 80,
              left: 'auto',
              top: 'auto',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex flex-col items-center">
              {/* Tooltip - absolutely positioned above mascot */}
              <AnimatePresence mode="wait">
                {activeInfo && (
                  <motion.div
                    ref={tooltipRef}
                    key={activeInfo.id}
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    className="absolute bottom-full left-0 mb-2 rounded-2xl overflow-visible text-left pointer-events-auto bg-white border-2 border-black shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
                    style={{
                      width: '220px',
                      minWidth: '200px',
                      maxWidth: '240px',
                      marginLeft: '-30px',
                    }}
                  >
                    <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-gray-500">{currentStep} / {totalSteps}</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-black">{activeInfo.title}</h3>
                        {activeInfo.summary && (
                          <p className="text-xs text-gray-700 leading-relaxed">{activeInfo.summary}</p>
                        )}
                      </div>
                      {'inferredFacts' in activeInfo && Array.isArray(activeInfo.inferredFacts) && activeInfo.inferredFacts.length > 0 && (
                        <div className="space-y-2 pt-1 border-t border-gray-200">
                          <span className="text-[11px] font-semibold text-black uppercase tracking-wide">Inferred Facts</span>
                          <p className="text-[11px] text-gray-600 leading-snug">Key insights from emails, calendar & tasks.</p>
                          <ul className="space-y-1.5">
                            {activeInfo.inferredFacts.map((fact, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-gray-800 leading-relaxed">
                                <span className="text-amber-600 mt-0.5 flex-shrink-0">💡</span>
                                <span>{fact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={handleTooltipSkip}
                          className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg border-2 border-black bg-white hover:bg-gray-100 active:scale-[0.98] text-black text-xs font-semibold transition-all duration-200"
                        >
                          <X className="w-3.5 h-3.5" />
                          Skip
                        </button>
                        <button
                          type="button"
                          onClick={handleTooltipNext}
                          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg border-2 border-black bg-black hover:bg-gray-800 active:scale-[0.98] text-white text-xs font-semibold transition-all duration-200"
                        >
                          <ChevronRight className="w-4 h-4" />
                          Next
                        </button>
                      </div>
                    </div>
                    <div
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
                      style={{ borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '14px solid black' }}
                      aria-hidden
                    />
                    <div
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0"
                      style={{ borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '12px solid white' }}
                      aria-hidden
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mascot - always at bottom, fixed position */}
              <div className="flex-shrink-0 flex items-center justify-center pointer-events-none" aria-hidden>
              <div
                className="flex items-center justify-center cursor-pointer pointer-events-auto"
                style={{ width: 260, height: 180, minWidth: 260, minHeight: 180 }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={() => {
                  if (pointerDownRef.current) hasMovedRef.current = true;
                }}
              >
                <DotLottieReact
                  src={LOTTIE_CAT_URL}
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded: Modal overlay + Chat */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={modalRef}
            key="mascot-chat-modal"
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 mascot-root"
            style={{ zIndex: 2147483647 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              drag
              dragControls={dragControls}
              dragListener={false}
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={modalRef}
              className="mascot-chatbox flex flex-col rounded-2xl border-2 border-gray-300 dark:border-gray-600 shadow-2xl backdrop-blur-xl overflow-hidden bg-gradient-to-b from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
              style={{
                width: 'min(1000px, calc(100vw - 2rem))',
                maxWidth: '1000px',
                minHeight: '400px',
                height: 'min(750px, 85vh)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              whileDrag={{ cursor: 'grabbing' }}
            >
              {/* Decorative top overlay */}
              <div
                className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"
                aria-hidden
              />

              {/* Header bar - drag handle */}
              <div
                className="relative flex-shrink-0 flex items-center justify-between gap-4 p-5 bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => {
                  if (!(e.target as HTMLElement).closest('button')) {
                    dragControls.start(e);
                  }
                }}
                style={{ touchAction: 'none' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                    aria-hidden
                  >
                    <img
                      src="/images/Logo/mindmesh-logo-tight.png"
                      alt="MindMesh"
                      className="w-full h-full object-contain p-1 pointer-events-none"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      MindMesh Assistant
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Ask questions, get insights, manage tasks
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClearChat}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-950/50 border border-gray-200 hover:border-red-200 dark:border-gray-700 dark:hover:border-red-900/50 text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear chat
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    title="Close"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div
                data-mascot-scroll
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6 space-y-4"
              >
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-purple-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm">
                      Hi! I&apos;m your MindMesh assistant. Ask me anything about your schedule,
                      tasks, or get quick insights.
                    </p>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200/50 dark:border-gray-700/50'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="flex-shrink-0 p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50">
                <div className="flex gap-3 max-w-4xl mx-auto">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type your message..."
                    rows={1}
                    className="flex-1 min-h-[44px] max-h-32 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(content, document.body);
}
