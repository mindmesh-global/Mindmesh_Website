'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, useDragControls } from 'framer-motion';
import { Home, FileText, Mail, BookOpen, Calculator, FolderOpen, Sparkles } from 'lucide-react';
import MindMeshUI from './mindmeshui';
import { useUIOverlay, type ActiveWindowType } from '@/context/UIOverlayContext';
import FeaturesWindow from './FeaturesWindow';
import DocsWindow from './DocsWindow';
import SocialWindow from './SocialWindow';
import PricingWindow from './PricingWindow';
import ContactWindow from './ContactWindow';
import AppDirectoryWindow from './AppDirectoryWindow';
import WaitlistModal from './WaitlistModal';
import DesktopNav from './layout/DesktopNav';

const AnimatedBackground = dynamic(
  () => import('@/components/layout/AnimatedBackground'),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-black" /> }
);

type WindowType = 'home' | 'features' | 'docs' | 'social' | 'subscription' | 'contact' | 'appDirectory';
interface OpenWindowItem {
  id: string;
  type: WindowType;
}

const CASCADE_OFFSET = 28; // px offset per window for stacked look (like Windows/macOS)
const BASE_Z = 20;

type DragConstraints = React.RefObject<HTMLElement | null>;

const WINDOW_LABELS: Record<WindowType, string> = {
  home: 'MindMesh',
  features: 'Features',
  docs: 'Docs',
  social: 'Social',
  subscription: 'Subscription',
  contact: 'Contact Us',
  appDirectory: 'App Directory',
};

function StackedWindow({
  item,
  stackIndex,
  onFocus,
  onClose,
  onMinimize,
  dragConstraintsRef,
}: {
  item: OpenWindowItem;
  stackIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  dragConstraintsRef: DragConstraints;
}) {
  const dragControls = useDragControls();
  const offset = stackIndex * CASCADE_OFFSET;
  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={dragConstraintsRef}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      onPointerDown={onFocus}
      whileDrag={{ cursor: 'grabbing' }}
      className="absolute w-full max-w-5xl px-4"
      style={{
        left: `calc(50% + ${offset}px)`,
        top: `calc(50% + ${offset}px)`,
        x: '-50%',
        y: '-50%',
        zIndex: BASE_Z + stackIndex,
        height: 'min(80vh, calc(100vh - 7rem))',
        maxHeight: 'calc(100vh - 7rem)',
      }}
    >
      <div 
        className="bg-gray-900/90 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden flex flex-col h-full min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'home' && (
          <MindMeshUI dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
        {item.type === 'features' && (
          <FeaturesWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
        {item.type === 'docs' && (
          <DocsWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
        {item.type === 'social' && (
          <SocialWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
        {item.type === 'subscription' && (
          <PricingWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
        {item.type === 'contact' && (
          <ContactWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
        {item.type === 'appDirectory' && (
          <AppDirectoryWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const uiOverlay = useUIOverlay();

  const sectionRef = useRef<HTMLElement>(null);

  // Multiple windows stack (last in array = on top, like Windows/macOS)
  // On load/refresh, home.mdx window is open by default
  const [openWindows, setOpenWindows] = useState<OpenWindowItem[]>(() => [
    { id: 'home-default', type: 'home' },
  ]);

  const openWindow = useCallback((type: WindowType) => {
    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.type === type);
      if (existing) {
        return [...prev.filter((w) => w.id !== existing.id), existing];
      }
      return [...prev, { id: `${type}-${Date.now()}`, type }];
    });
  }, []);

  const bringToFront = (id: string) => {
    setOpenWindows((prev) => {
      const w = prev.find((x) => x.id === id);
      if (!w || prev[prev.length - 1]?.id === id) return prev;
      return [...prev.filter((x) => x.id !== id), w];
    });
  };

  const [minimizedIds, setMinimizedIds] = useState<Set<string>>(new Set());

  const minimizeWindow = (id: string) => {
    setMinimizedIds((prev) => new Set([...prev, id]));
  };

  const restoreWindow = (id: string) => {
    setMinimizedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    bringToFront(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setMinimizedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // Update active window type for tooltip visibility (tooltips only when MindMesh 'home' is on top)
  useEffect(() => {
    if (!uiOverlay) return;
    const visible = openWindows.filter((w) => !minimizedIds.has(w.id));
    const top = visible[visible.length - 1];
    uiOverlay.setActiveWindowType((top?.type ?? null) as ActiveWindowType);
  }, [openWindows, minimizedIds, uiOverlay]);

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  useEffect(() => {
    const open = searchParams.get('open');
    if (open === 'download') {
      setIsWaitlistOpen(true);
      router.replace('/');
    } else if (open === 'subscription') {
      openWindow('subscription');
      router.replace('/');
    } else if (open === 'contact') {
      openWindow('contact');
      router.replace('/');
    }
  }, [searchParams, router, openWindow]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
      {/* Lazy-loaded background — never blocks SSR; Google sees content first */}
      <div className="absolute inset-0">
        <AnimatedBackground />
      </div>

      {/* Desktop Nav — next/link for all 9 icons */}
      <DesktopNav activeHref="/" />

      {/* Stacked windows (Windows/macOS style – multiple open, click to bring to front) */}
      {openWindows
        .filter((item) => !minimizedIds.has(item.id))
        .map((item, index) => (
          <StackedWindow
            key={item.id}
            item={item}
            stackIndex={index}
            onFocus={() => bringToFront(item.id)}
            onClose={() => closeWindow(item.id)}
            onMinimize={() => minimizeWindow(item.id)}
            dragConstraintsRef={sectionRef}
          />
        ))}

      {/* Single dock for all minimized windows - shifts left on smaller viewports */}
      {minimizedIds.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-3 left-3 md:left-1/2 md:-translate-x-1/2 z-[100] flex flex-wrap gap-1.5 justify-start md:justify-center max-w-[calc(100vw-2rem)] md:max-w-[90vw]"
        >
          {openWindows
            .filter((w) => minimizedIds.has(w.id))
            .map((w) => (
              <button
                key={w.id}
                onClick={() => restoreWindow(w.id)}
                className="group/btn bg-gray-800/95 backdrop-blur-xl border border-white/10 rounded-lg px-2.5 py-1.5 flex items-center gap-2 hover:bg-gray-700/95 hover:border-white/20 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
                title={`Restore ${WINDOW_LABELS[w.type]}`}
              >
                <div className="w-5 h-5 rounded-md bg-gray-600/90 group-hover/btn:bg-gray-500/90 flex items-center justify-center shrink-0">
                  {w.type === 'home' && <Home className="w-3 h-3 text-blue-400" strokeWidth={2.5} />}
                  {w.type === 'features' && <FileText className="w-3 h-3 text-green-400" strokeWidth={2.5} />}
                  {w.type === 'subscription' && <Calculator className="w-3 h-3 text-purple-400" strokeWidth={2.5} />}
                  {w.type === 'docs' && <BookOpen className="w-3 h-3 text-cyan-400" strokeWidth={2.5} />}
                  {w.type === 'social' && <Sparkles className="w-3 h-3 text-teal-400" strokeWidth={2.5} />}
                  {w.type === 'contact' && <Mail className="w-3 h-3 text-orange-400" strokeWidth={2.5} />}
                  {w.type === 'appDirectory' && <FolderOpen className="w-3 h-3 text-indigo-400" strokeWidth={2.5} />}
                </div>
                <span className="text-xs font-medium text-gray-300 group-hover/btn:text-white">{WINDOW_LABELS[w.type]}</span>
              </button>
            ))}
        </motion.div>
      )}

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </section>
  );
}

