'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, useDragControls } from 'framer-motion';
import { 
  Sparkles, 
  Home, 
  FileText, 
  Mail, 
  BookOpen, 
  Play,
  Download,
  Calculator,
  FolderOpen,
} from 'lucide-react';
import MindMeshUI from './mindmeshui';
import { useUIOverlay, type ActiveWindowType } from '@/context/UIOverlayContext';
import FeaturesWindow from './FeaturesWindow';
import DocsWindow from './DocsWindow';
import SocialWindow from './SocialWindow';
import PricingWindow from './PricingWindow';
import ContactWindow from './ContactWindow';
import AppDirectoryWindow from './AppDirectoryWindow';
import WaitlistModal from './WaitlistModal';

interface IconPosition {
  x: number;
  y: number;
}

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

export const OPEN_WINDOW_EVENT = 'mindmesh-open-window';

export default function Hero() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const uiOverlay = useUIOverlay();

  const leftIcons = [
    { icon: Home, label: 'MindMesh', color: 'text-blue-400', labelColor: 'text-white', glowColor: 'rgba(96,165,250,0.9)', logoSrc: '/images/Logo/mindmesh-logo-tight.png' },
    { icon: Download, label: 'Join Waitlist', color: 'text-teal-400', labelColor: 'text-white', glowColor: 'rgba(45,212,191,0.9)', iconSrc: '/images/join-waitlist-icon.png' },
    { icon: Calculator, label: 'Subscription', color: 'text-purple-400', labelColor: 'text-white', glowColor: 'rgba(192,132,252,0.9)', iconSrc: '/images/subscription-icon.png' },
    { icon: FileText, label: 'Features', color: 'text-green-400', labelColor: 'text-white', glowColor: 'rgba(74,222,128,0.9)', iconSrc: '/images/features-icon.png' },
    { icon: FolderOpen, label: 'App Directory', color: 'text-amber-400', labelColor: 'text-white', glowColor: 'rgba(251,191,36,0.95)' },
  ];

  const rightIcons = [
    { icon: Sparkles, label: 'Social', color: 'text-teal-400', labelColor: 'text-white', glowColor: 'rgba(45,212,191,0.9)', iconSrc: '/images/social-icon.png' },
    { icon: Play, label: 'Demo.mov', color: 'text-red-400', labelColor: 'text-white', glowColor: 'rgba(248,113,113,0.9)', iconSrc: '/images/demo-icon.png' },
    { icon: BookOpen, label: 'Docs', color: 'text-cyan-400', labelColor: 'text-white', glowColor: 'rgba(34,211,238,0.9)', iconSrc: '/images/docs-icon.png' },
    { icon: Mail, label: 'Contact Us', color: 'text-orange-400', labelColor: 'text-white', glowColor: 'rgba(251,146,60,0.9)', iconSrc: '/images/contact-us-icon.png' },
  ];

  const allIcons = [...leftIcons, ...rightIcons];

  // Initialize positions - left icons on left, right icons on right
  // Icons arranged in vertical columns with balanced spacing
  const getInitialPosition = (index: number, isLeft: boolean): IconPosition => {
    const iconSpacing = 110; // Spacing for larger icons
    const iconWidth = 96;
    const sideMargin = 48; // More margin from screen edges
    
    // Vertically center the icon columns in viewport
    const leftCount = leftIcons.length;
    const rightCount = rightIcons.length;
    const totalColumnHeight = Math.max(leftCount, rightCount) * iconSpacing;
    const startY = typeof window !== 'undefined' 
      ? Math.max(100, (window.innerHeight - totalColumnHeight) / 2)
      : 120;
    
    if (isLeft) {
      return { x: sideMargin, y: startY + index * iconSpacing };
    } else {
      const rightX = typeof window !== 'undefined' ? window.innerWidth - iconWidth - sideMargin : 1200;
      const rightIndex = index - leftIcons.length;
      return { x: rightX, y: startY + rightIndex * iconSpacing };
    }
  };

  const [iconPositions, setIconPositions] = useState<Record<string, IconPosition>>({});
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

  // Listen for open-window from Navbar (when on home) and handle ?open= URL param
  useEffect(() => {
    const handleOpen = (e: CustomEvent<WindowType>) => {
      openWindow(e.detail);
    };
    window.addEventListener(OPEN_WINDOW_EVENT, handleOpen as EventListener);
    return () => window.removeEventListener(OPEN_WINDOW_EVENT, handleOpen as EventListener);
  }, [openWindow]);

  // Initialize icon positions after mount (when window is available)
  useEffect(() => {
    const initializePositions = () => {
      const positions: Record<string, IconPosition> = {};
      leftIcons.forEach((item, index) => {
        positions[item.label] = getInitialPosition(index, true);
      });
      rightIcons.forEach((item, index) => {
        positions[item.label] = getInitialPosition(index + leftIcons.length, false);
      });
      setIconPositions(positions);
    };

    initializePositions();

    const handleResize = () => {
      const positions: Record<string, IconPosition> = {};
      leftIcons.forEach((item, index) => {
        positions[item.label] = getInitialPosition(index, true);
      });
      rightIcons.forEach((item, index) => {
        positions[item.label] = getInitialPosition(index + leftIcons.length, false);
      });
      setIconPositions(positions);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [dragOffsets, setDragOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

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

  const handleIconTap = (label: string) => {
    if (label === 'MindMesh') openWindow('home');
    if (label === 'Features') openWindow('features');
    if (label === 'Join Waitlist') setIsWaitlistOpen(true);
    if (label === 'Subscription') openWindow('subscription');
    if (label === 'App Directory') openWindow('appDirectory');
    if (label === 'Docs') openWindow('docs');
    if (label === 'Social') openWindow('social');
    if (label === 'Contact Us') openWindow('contact');
  };

  const handleDragStart = (label: string) => {
    setDragOffsets((prev) => ({ ...prev, [label]: { x: 0, y: 0 } }));
  };

  const handleDrag = (label: string, event: any, info: any) => {
    setDragOffsets((prev) => ({
      ...prev,
      [label]: { x: info.offset.x, y: info.offset.y },
    }));
  };

  const handleDragEnd = (label: string, event: any, info: any) => {
    const offset = dragOffsets[label] || { x: 0, y: 0 };
    const moved = Math.abs(offset.x) + Math.abs(offset.y);
    if (moved < 8) {
      if (label === 'MindMesh') openWindow('home');
      if (label === 'Features') openWindow('features');
      if (label === 'Join Waitlist') setIsWaitlistOpen(true);
      if (label === 'Subscription') openWindow('subscription');
      if (label === 'App Directory') openWindow('appDirectory');
      if (label === 'Docs') openWindow('docs');
      if (label === 'Social') openWindow('social');
      if (label === 'Contact Us') openWindow('contact');
    }
    const currentPos = iconPositions[label];
    const newX = currentPos.x + offset.x;
    const newY = currentPos.y + offset.y;
    
    // Constrain to viewport bounds
    const constrainedX = Math.max(0, Math.min(newX, typeof window !== 'undefined' ? window.innerWidth - 100 : newX));
    const constrainedY = Math.max(0, Math.min(newY, typeof window !== 'undefined' ? window.innerHeight - 100 : newY));
    
    setIconPositions((prev) => ({
      ...prev,
      [label]: { x: constrainedX, y: constrainedY },
    }));
    
    // Reset drag offset
    setDragOffsets((prev) => {
      const newOffsets = { ...prev };
      delete newOffsets[label];
      return newOffsets;
    });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
      {/* Hero Background Image - high quality */}
      <div className="absolute inset-0">
        <Image
          src="/images/mindmesh-bg.png"
          alt=""
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* Dark overlay for contrast & readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Draggable Icons */}
      {allIcons.map((item, index) => {
        const position = iconPositions[item.label] || { x: 0, y: 0 };
        const dragOffset = dragOffsets[item.label] || { x: 0, y: 0 };
        return (
          <motion.div
            key={item.label}
            drag
            dragMomentum={false}
            dragElastic={0}
            onTap={() => handleIconTap(item.label)}
            onDragStart={() => handleDragStart(item.label)}
            onDrag={(event, info) => handleDrag(item.label, event, info)}
            onDragEnd={(event, info) => handleDragEnd(item.label, event, info)}
            onHoverStart={() => setHoveredIcon(item.label)}
            onHoverEnd={() => setHoveredIcon(null)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            className="absolute z-20 flex flex-col items-center gap-2 group pointer-events-auto cursor-pointer"
            style={{
              left: position.x ? `${position.x + dragOffset.x}px` : '0px',
              top: position.y ? `${position.y + dragOffset.y}px` : '0px',
              width: '96px', // Fixed width for consistent alignment
            }}
          >
            <div
              className={`rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 relative w-11 h-11 min-w-[44px] min-h-[44px] group-hover:scale-105 ${
                ('logoSrc' in item && item.logoSrc) || ('iconSrc' in item && item.iconSrc)
                  ? 'overflow-visible' + (item.label === 'Social' ? ' ring-2 ring-teal-400/60 ring-offset-1 ring-offset-transparent' : '')
                  : 'bg-gray-800/50 backdrop-blur-sm group-hover:bg-gray-700/50 overflow-hidden shadow-lg' + (item.label === 'App Directory' ? '' : ' border border-gray-700/50')
              }`}
              style={('glowColor' in item && item.glowColor) ? {
                filter: `drop-shadow(0 0 6px ${item.glowColor}) drop-shadow(0 0 12px ${item.glowColor}) drop-shadow(0 0 20px ${item.glowColor})`,
              } : undefined}
            >
              {('logoSrc' in item && item.logoSrc) || ('iconSrc' in item && item.iconSrc) ? (
                <img
                  src={((item as { logoSrc?: string; iconSrc?: string }).logoSrc ?? (item as { iconSrc?: string }).iconSrc) as string}
                  alt={item.label}
                  width={44}
                  height={44}
                  className={`w-full h-full block min-w-[32px] min-h-[32px] ${item.label === 'Social' ? 'object-cover' : 'object-contain'}`}
                />
              ) : (
                <item.icon className={`w-8 h-8 ${item.color}`} />
              )}
            </div>
            <span
              className={`text-sm font-semibold transition-all duration-300 text-center max-w-[96px] whitespace-nowrap leading-tight group-hover:opacity-100 ${item.labelColor || 'text-slate-800'} group-hover:bg-black group-hover:px-2 group-hover:py-1 group-hover:rounded-md`}
              style={
                'glowColor' in item && item.glowColor && hoveredIcon === item.label
                  ? {
                      textShadow: `0 0 8px ${item.glowColor}, 0 0 16px ${item.glowColor}, 0 0 24px ${item.glowColor}`,
                      transition: 'text-shadow 0.3s ease, opacity 0.3s ease',
                    }
                  : {
                      textShadow: 'none',
                      transition: 'text-shadow 0.3s ease, opacity 0.3s ease',
                    }
              }
            >
              {item.label}
            </span>
          </motion.div>
        );
      })}

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

