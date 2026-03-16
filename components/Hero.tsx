'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion, useDragControls } from 'framer-motion';
import { Home, FileText, Mail, BookOpen, Calculator, FolderOpen, Sparkles, Video } from 'lucide-react';
import MindMeshUI from './mindmeshui';
import { useUIOverlay, type ActiveWindowType } from '@/context/UIOverlayContext';
import FeaturesWindow from './FeaturesWindow';
import DocsWindow from './DocsWindow';
import SocialWindow from './SocialWindow';
import PricingWindow from './PricingWindow';
import ContactWindow from './ContactWindow';
import AppDirectoryWindow from './AppDirectoryWindow';
import MovieWindow from './MovieWindow';
import WaitlistModal from './WaitlistModal';
import DesktopNav from './layout/DesktopNav';

const AnimatedBackground = dynamic(
  () => import('@/components/layout/AnimatedBackground'),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-black" /> }
);

type WindowType = 'home' | 'features' | 'docs' | 'social' | 'subscription' | 'contact' | 'appDirectory' | 'demo';
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
  demo: 'Demo.mov',
};

const HREF_TO_WINDOW_TYPE: Record<string, WindowType> = {
  '/': 'home',
  '/subscription': 'subscription',
  '/features': 'features',
  '/app-directory': 'appDirectory',
  '/social': 'social',
  '/demo': 'demo',
  '/docs': 'docs',
  '/contact': 'contact',
};

const WINDOW_TYPE_TO_HREF: Record<WindowType, string> = {
  home: '/',
  subscription: '/subscription',
  features: '/features',
  appDirectory: '/app-directory',
  social: '/social',
  demo: '/demo',
  docs: '/docs',
  contact: '/contact',
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
        {item.type === 'demo' && (
          <MovieWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const uiOverlay = useUIOverlay();

  const sectionRef = useRef<HTMLElement>(null);

  // Multiple windows stack (last in array = on top, like Windows/macOS)
  // On load/refresh, home.mdx window is open by default
  const [openWindows, setOpenWindows] = useState<OpenWindowItem[]>(() => [
    { id: 'home-default', type: 'home' },
  ]);

  const updateUrl = useCallback((href: string, push = false) => {
    if (typeof window === 'undefined') return;
    const method = push ? 'pushState' : 'replaceState';
    window.history[method]({}, '', href);
  }, []);

  const openWindow = useCallback((type: WindowType) => {
    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.type === type);
      const isNew = !existing;
      queueMicrotask(() => updateUrl(WINDOW_TYPE_TO_HREF[type], isNew));
      if (existing) {
        return [...prev.filter((w) => w.id !== existing.id), existing];
      }
      return [...prev, { id: `${type}-${Date.now()}`, type }];
    });
  }, [updateUrl]);

  const bringToFront = useCallback((id: string, type: WindowType) => {
    setOpenWindows((prev) => {
      const w = prev.find((x) => x.id === id);
      if (!w || prev[prev.length - 1]?.id === id) return prev;
      return [...prev.filter((x) => x.id !== id), w];
    });
    updateUrl(WINDOW_TYPE_TO_HREF[type], false);
  }, [updateUrl]);

  const [minimizedIds, setMinimizedIds] = useState<Set<string>>(new Set());

  const minimizeWindow = (id: string) => {
    setMinimizedIds((prev) => new Set([...prev, id]));
  };

  const restoreWindow = useCallback((id: string, type: WindowType) => {
    setMinimizedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    bringToFront(id, type);
    updateUrl(WINDOW_TYPE_TO_HREF[type], false);
  }, [bringToFront, updateUrl]);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => {
      const next = prev.filter((w) => w.id !== id);
      const newFront = next.filter((w) => !minimizedIds.has(w.id)).pop();
      if (newFront && typeof window !== 'undefined') {
        window.history.replaceState({}, '', WINDOW_TYPE_TO_HREF[newFront.type]);
      }
      return next;
    });
    setMinimizedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, [minimizedIds]);

  // Update active window type for tooltip visibility (tooltips only when MindMesh 'home' is on top)
  useEffect(() => {
    if (!uiOverlay) return;
    const visible = openWindows.filter((w) => !minimizedIds.has(w.id));
    const top = visible[visible.length - 1];
    uiOverlay.setActiveWindowType((top?.type ?? null) as ActiveWindowType);
  }, [openWindows, minimizedIds, uiOverlay]);

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Open window from ?open= URL param (e.g. /?open=features)
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
    } else if (open === 'features') {
      openWindow('features');
      router.replace('/');
    } else if (open === 'docs') {
      openWindow('docs');
      router.replace('/');
    } else if (open === 'social') {
      openWindow('social');
      router.replace('/');
    } else if (open === 'app-directory') {
      openWindow('appDirectory');
      router.replace('/');
    } else if (open === 'demo') {
      openWindow('demo');
      router.replace('/');
    }
  }, [searchParams, router, openWindow]);

  // Open window from pathname (e.g. /features, /contact) — for SEO, direct links
  useEffect(() => {
    if (!pathname || pathname === '/') return;
    if (pathname === '/waitlist') {
      setIsWaitlistOpen(true);
      return;
    }
    const type = HREF_TO_WINDOW_TYPE[pathname];
    if (type) openWindow(type);
  }, [pathname, openWindow]);

  // Browser back button: close topmost window (URL already changed by browser)
  useEffect(() => {
    const handlePopState = () => {
      setOpenWindows((prev) => {
        if (prev.length <= 1) return prev;
        const visible = prev.filter((w) => !minimizedIds.has(w.id));
        if (visible.length <= 1) return prev;
        const toClose = visible[visible.length - 1];
        return prev.filter((w) => w.id !== toClose.id);
      });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [minimizedIds]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-visible bg-black pt-16">
      {/* Lazy-loaded background — never blocks SSR; Google sees content first */}
      <div className="absolute inset-0">
        <AnimatedBackground />
      </div>

      {/* Desktop Nav — opens Mac-style windows when on home */}
      <DesktopNav
        activeHref={(() => {
          const visible = openWindows.filter((w) => !minimizedIds.has(w.id));
          const front = visible[visible.length - 1];
          return front ? WINDOW_TYPE_TO_HREF[front.type] : '/';
        })()}
        useWindowMode
        onOpenWindow={(href) => {
          if (href === '/waitlist') {
            setIsWaitlistOpen(true);
          } else {
            const type = HREF_TO_WINDOW_TYPE[href];
            if (type) openWindow(type);
          }
        }}
      />

      {/* Stacked windows (Windows/macOS style – multiple open, click to bring to front) */}
      {openWindows
        .filter((item) => !minimizedIds.has(item.id))
        .map((item, index) => (
          <StackedWindow
            key={item.id}
            item={item}
            stackIndex={index}
            onFocus={() => bringToFront(item.id, item.type)}
            onClose={() => closeWindow(item.id)}
            onMinimize={() => minimizeWindow(item.id)}
            dragConstraintsRef={sectionRef}
          />
        ))}

      {/* Mac-style dock — shows ALL open windows; click to bring to front or restore */}
      {openWindows.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-14 left-3 md:left-1/2 md:-translate-x-1/2 z-[100] flex flex-wrap gap-1.5 justify-start md:justify-center max-w-[calc(100vw-2rem)] md:max-w-[90vw]"
        >
          {openWindows.map((w) => {
            const isMinimized = minimizedIds.has(w.id);
            const visible = openWindows.filter((x) => !minimizedIds.has(x.id));
            const isFront = visible[visible.length - 1]?.id === w.id;
            return (
              <button
                key={w.id}
                onClick={() => (isMinimized ? restoreWindow(w.id, w.type) : bringToFront(w.id, w.type))}
                className={`group/btn relative backdrop-blur-xl border rounded-lg px-2.5 py-1.5 flex items-center gap-2 transition-all duration-200 shadow-lg hover:scale-[1.03] active:scale-[0.98] ${
                  isFront
                    ? 'bg-gray-700/95 border-white/30 ring-1 ring-white/20'
                    : isMinimized
                      ? 'bg-gray-800/80 border-white/10 hover:bg-gray-700/90 hover:border-white/20'
                      : 'bg-gray-800/95 border-white/15 hover:bg-gray-700/95 hover:border-white/25'
                }`}
                title={isMinimized ? `Restore ${WINDOW_LABELS[w.type]}` : `Bring ${WINDOW_LABELS[w.type]} to front`}
              >
                <div className="w-5 h-5 rounded-md bg-gray-600/90 group-hover/btn:bg-gray-500/90 flex items-center justify-center shrink-0">
                  {w.type === 'home' && <Home className="w-3 h-3 text-blue-400" strokeWidth={2.5} />}
                  {w.type === 'features' && <FileText className="w-3 h-3 text-green-400" strokeWidth={2.5} />}
                  {w.type === 'subscription' && <Calculator className="w-3 h-3 text-purple-400" strokeWidth={2.5} />}
                  {w.type === 'docs' && <BookOpen className="w-3 h-3 text-cyan-400" strokeWidth={2.5} />}
                  {w.type === 'social' && <Sparkles className="w-3 h-3 text-teal-400" strokeWidth={2.5} />}
                  {w.type === 'contact' && <Mail className="w-3 h-3 text-orange-400" strokeWidth={2.5} />}
                  {w.type === 'appDirectory' && <FolderOpen className="w-3 h-3 text-indigo-400" strokeWidth={2.5} />}
                  {w.type === 'demo' && <Video className="w-3 h-3 text-amber-400" strokeWidth={2.5} />}
                </div>
                <span className="text-xs font-medium text-gray-300 group-hover/btn:text-white">{WINDOW_LABELS[w.type]}</span>
                {isFront && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-white/90" />}
              </button>
            );
          })}
        </motion.div>
      )}

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Trust & Compliance strip — fixed at very bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-6 flex-wrap py-3 px-6 bg-black/40 backdrop-blur-md z-10">
        <div className="flex items-center gap-2 text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          <span>🔒</span>
          <span>AES-256 Encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          <span>🛡</span>
          <span>TLS 1.2 Secure Transport</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          <span>✓</span>
          <span>Google API Limited Use Policy Compliant</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          <span>🚫</span>
          <span>We never sell your data</span>
        </div>
      </div>
    </section>
  );
}

