'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useDragControls, useSpring } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { usePathname } from 'next/navigation';
import { useHomeSection } from '@/context/HomeSectionContext';
import { useOnboardingTour } from '@/context/OnboardingTourContext';
import { useUIOverlay } from '@/context/UIOverlayContext';
import type { HomeSectionId } from '@/context/HomeSectionContext';
import {
  X,
  Trash2,
  Sparkles,
  Send,
  ChevronRight,
} from 'lucide-react';
import { HoverTypingTooltip } from '@/components/ui/HoverTypingTooltip';

const MASCOT_INTRO = {
  id: 'mascot_intro',
  title: 'Your MindMesh Assistant Mascot ',
  summary: 'This is your AI assistant. Click on it anytime to open the chat and ask questions about your schedule, tasks, or get quick insights. Use Next to explore the dashboard sections.',
};

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

const TOTAL_STEPS = SECTION_ORDER.length + 1; // +1 for mascot intro

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
const COLLAPSED_SIZE = 280;
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
  const onboarding = useOnboardingTour();
  const uiOverlay = useUIOverlay();
  const activeSection = homeSection?.activeSection ?? null;
  const sectionConfig = homeSection?.sectionConfig;
  const setActiveSection = homeSection?.setActiveSection;
  const [userDismissed, setUserDismissed] = useState(false);
  const [mascotIntroShown, setMascotIntroShown] = useState(false);
  const isDashboard = pathname === '/dashboard';
  const displaySection = userDismissed ? null : (isDashboard && !activeSection ? SECTION_ORDER[0] : activeSection);
  const activeInfo = showTooltipProp
    ? !mascotIntroShown
      ? MASCOT_INTRO
      : displaySection && sectionConfig
        ? sectionConfig[displaySection]
        : null
    : null;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [spotlightRect, setSpotlightRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const springConfig = { stiffness: 300, damping: 30 };
  const spotlightX = useSpring(0, springConfig);
  const spotlightY = useSpring(0, springConfig);
  const spotlightW = useSpring(0, springConfig);
  const spotlightH = useSpring(0, springConfig);
  const dragControls = useDragControls();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mascotHovered, setMascotHovered] = useState(false);

  const PADDING = 12;

  const updateSpotlight = useCallback(() => {
    if (!mascotIntroShown || !displaySection) {
      setSpotlightRect(null);
      return;
    }
    const sectionEl = document.querySelector(`[data-home-section="${displaySection}"]`);
    if (!sectionEl) {
      setSpotlightRect(null);
      return;
    }
    const sectionRect = sectionEl.getBoundingClientRect();
    setSpotlightRect({
      x: sectionRect.left - PADDING,
      y: sectionRect.top - PADDING,
      w: sectionRect.width + PADDING * 2,
      h: sectionRect.height + PADDING * 2,
    });
  }, [mascotIntroShown, displaySection]);

  useEffect(() => {
    if (!activeInfo) {
      setSpotlightRect(null);
      return;
    }
    const run = () => requestAnimationFrame(updateSpotlight);
    const t = setTimeout(run, 120);
    window.addEventListener('scroll', run, true);
    window.addEventListener('resize', run);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', run, true);
      window.removeEventListener('resize', run);
    };
  }, [mascotIntroShown, displaySection, activeInfo, updateSpotlight]);

  // Sync spotlight rect to springs for smooth animation
  useEffect(() => {
    if (spotlightRect) {
      spotlightX.set(spotlightRect.x);
      spotlightY.set(spotlightRect.y);
      spotlightW.set(spotlightRect.w);
      spotlightH.set(spotlightRect.h);
    }
  }, [spotlightRect, spotlightX, spotlightY, spotlightW, spotlightH]);

  const scrollToSection = useCallback((sectionId: HomeSectionId) => {
    const el = document.querySelector(`[data-home-section="${sectionId}"]`);
    if (!el) return;
    // Prefer MindMesh scroll container (on home page); fallback to scrollIntoView (works for /dashboard body scroll)
    const scrollRoot = document.querySelector('[data-mindmesh-scroll]') as HTMLElement | null;
    if (scrollRoot) {
      const rect = el.getBoundingClientRect();
      const rootRect = scrollRoot.getBoundingClientRect();
      const elementTopInContent = scrollRoot.scrollTop + (rect.top - rootRect.top);
      const scrollTop = elementTopInContent - rootRect.height / 2 + rect.height / 2;
      scrollRoot.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleTooltipNext = useCallback(() => {
    if (!setActiveSection) return;
    // Mascot intro step: transition to section tour
    if (!mascotIntroShown) {
      setMascotIntroShown(true);
      setActiveSection(SECTION_ORDER[0]);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(SECTION_ORDER[0]));
      });
      return;
    }
    const idx = displaySection ? SECTION_ORDER.indexOf(displaySection) : -1;
    if (idx >= 0 && idx === SECTION_ORDER.length - 1) {
      setUserDismissed(true);
      setActiveSection(null);
      uiOverlay?.setShowSensorBar(true);
      onboarding?.setMascotTourCompleted();
      return;
    }
    const nextSection = getNextSection(displaySection);
    setActiveSection(nextSection);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection(nextSection));
    });
  }, [mascotIntroShown, displaySection, setActiveSection, scrollToSection, onboarding, uiOverlay]);

  const handleTooltipSkip = useCallback(() => {
    if (!setActiveSection) return;
    setUserDismissed(true);
    setActiveSection(null);
    onboarding?.setMascotTourCompleted();
    uiOverlay?.setShowSensorBar(true);
  }, [setActiveSection, onboarding, uiOverlay]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock MindMesh window scroll when mascot tooltip is visible
  useEffect(() => {
    const visible = Boolean(!isExpanded && activeInfo);
    uiOverlay?.setMascotTooltipVisible(visible);
    return () => uiOverlay?.setMascotTooltipVisible(false);
  }, [isExpanded, activeInfo, uiOverlay]);
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

  const handleMascotMouseEnter = useCallback(() => setMascotHovered(true), []);
  const handleMascotMouseLeave = useCallback(() => setMascotHovered(false), []);

  const currentStep = mascotIntroShown ? getSectionIndex(displaySection) + 1 : 1;
  const totalSteps = TOTAL_STEPS;

  const content = (
    <>
      {/* Mascot hover dim overlay - full dim, mascot + tooltip stay on top */}
      {!isExpanded && mascotHovered && (
        <div
          className="fixed inset-0 pointer-events-none transition-opacity duration-200"
          style={{ zIndex: 2147483645, backgroundColor: 'rgba(0,0,0,0.65)' }}
          aria-hidden
        />
      )}

      {/* Spotlight overlay - mascot intro: full dark overlay, mascot + tooltip on top (no cutout = no white area) */}
      {!isExpanded && !mascotIntroShown && activeInfo && (
        <div
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{
            zIndex: 2147483644,
            backgroundColor: 'rgba(0,0,0,0.85)',
          }}
          aria-hidden
        />
      )}

      {/* Spotlight overlay - section tour: dim all, highlight section */}
      {!isExpanded && mascotIntroShown && activeInfo && spotlightRect && (
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 2147483644, width: '100vw', height: '100vh' }}
          aria-hidden
        >
          <defs>
            <mask id="mascot-spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              <motion.rect
                x={spotlightX}
                y={spotlightY}
                width={spotlightW}
                height={spotlightH}
                rx="8"
                ry="8"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.4)"
            mask="url(#mascot-spotlight-mask)"
          />
          <motion.rect
            x={spotlightX}
            y={spotlightY}
            width={spotlightW}
            height={spotlightH}
            rx="8"
            ry="8"
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
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
              bottom: 40,
              right: 60,
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
                    className="absolute bottom-full left-0 mb-2 rounded-2xl overflow-visible text-left pointer-events-auto"
                    style={{
                      width: '240px',
                      minWidth: '220px',
                      maxWidth: '260px',
                      marginLeft: '-30px',
                      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f0a1e 100%)',
                      boxShadow: '0 0 0 1px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.35), 0 0 80px rgba(126,34,206,0.2)',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-30"
                      style={{
                        backgroundImage: `radial-gradient(2px 2px at 15px 25px, rgba(255,255,255,0.8), transparent),
                          radial-gradient(2px 2px at 35px 60px, rgba(255,255,255,0.6), transparent),
                          radial-gradient(2px 2px at 45px 120px, rgba(255,255,255,0.7), transparent),
                          radial-gradient(2px 2px at 80px 35px, rgba(255,255,255,0.5), transparent),
                          radial-gradient(2px 2px at 120px 90px, rgba(255,255,255,0.6), transparent)`,
                      }}
                    />
                    <div className="relative p-4 space-y-3 max-h-[300px] overflow-y-auto">
                      {mascotIntroShown && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-white">{currentStep} / {totalSteps}</span>
                        </div>
                      )}
                      <div className="space-y-2">
                        <h3 className="text-lg font-extrabold text-white">{activeInfo.title}</h3>
                        {activeInfo.summary && (
                          <p className="text-xs text-white leading-relaxed">{activeInfo.summary}</p>
                        )}
                      </div>
                      {'inferredFacts' in activeInfo && Array.isArray(activeInfo.inferredFacts) && activeInfo.inferredFacts.length > 0 && (
                        <div className="space-y-2 pt-1 border-t border-white/20">
                          <span className="text-[11px] font-semibold text-white uppercase tracking-wide">Inferred Facts</span>
                          <p className="text-[11px] text-white leading-snug">Key insights from emails, calendar & tasks.</p>
                          <ul className="space-y-1.5">
                            {activeInfo.inferredFacts.map((fact, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-white leading-relaxed">
                                <span className="text-amber-400 mt-0.5 flex-shrink-0">💡</span>
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
                          className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-transparent border border-violet-400/70 hover:bg-violet-500/10 active:scale-[0.98] text-white text-xs font-semibold transition-all duration-200"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                          Skip
                        </button>
                        <button
                          type="button"
                          onClick={handleTooltipNext}
                          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg active:scale-[0.98] text-white text-xs font-semibold transition-all duration-200"
                          style={{
                            background: 'linear-gradient(180deg, #6d28d9 0%, #8b5cf6 50%, #a78bfa 100%)',
                            boxShadow: '0 0 20px rgba(139,92,246,0.5), 0 2px 8px rgba(0,0,0,0.2)',
                          }}
                        >
                          Next
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mascot - always at bottom, fixed position */}
              <div className="flex-shrink-0 flex items-center justify-center pointer-events-none" aria-hidden>
              <div
                onMouseEnter={handleMascotMouseEnter}
                onMouseLeave={handleMascotMouseLeave}
                className="pointer-events-auto"
              >
                <HoverTypingTooltip
                  text="Your MindMesh AI assistant. Click to open chat — ask questions."
                  showHint={false}
                  variant="dark"
                  placement="top"
                  wrap
                  className=""
                >
                  <div
                    className="relative flex items-center justify-center cursor-pointer"
                    style={{ width: 260, height: 180, minWidth: 260, minHeight: 180 }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={() => {
                      if (pointerDownRef.current) hasMovedRef.current = true;
                    }}
                  >
                    <div className="w-full h-full relative z-10">
                      <DotLottieReact
                        src={LOTTIE_CAT_URL}
                        loop
                        autoplay
                        speed={0.3}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </HoverTypingTooltip>
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
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center min-h-[200px] px-4 pt-28 pb-8">
                    <div className="flex flex-col items-center max-w-md text-center">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-blue-500/20 dark:from-emerald-500/15 dark:via-teal-500/15 dark:to-blue-500/15 border border-emerald-200/60 dark:border-emerald-500/30">
                        <span className="text-2xl">🔒</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        Your privacy matters
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        MindMesh does not use your data to train any AI or LLM models. All your data is encrypted at rest (AES-256) and in transit (TLS 1.2+). We are fully compliant with Google API Limited Use requirements.
                      </p>
                    </div>
                  </div>
                ) : (
                messages.map((msg, i) => (
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
                ))
                )}
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
