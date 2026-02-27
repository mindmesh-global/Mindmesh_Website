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
  Settings, 
  BookOpen, 
  MessageSquare,
  Download,
  Play,
  Calculator,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import MindMeshUI from './mindmeshui';
import FeaturesWindow from './FeaturesWindow';
import DownloadWindow from './DownloadWindow';
import DocsWindow from './DocsWindow';
import WhyMindMeshWindow from './WhyMindMeshWindow';

interface IconPosition {
  x: number;
  y: number;
}

type WindowType = 'home' | 'features' | 'download' | 'docs' | 'why';
interface OpenWindowItem {
  id: string;
  type: WindowType;
}

const CASCADE_OFFSET = 28; // px offset per window for stacked look (like Windows/macOS)
const BASE_Z = 20;

type DragConstraints = React.RefObject<HTMLElement | null>;

const WINDOW_LABELS: Record<WindowType, string> = {
  home: 'home.mdx',
  features: 'features',
  download: 'Download',
  docs: 'Docs',
  why: 'Why MindMesh?',
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
        {item.type === 'download' && (
          <DownloadWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
        {item.type === 'docs' && (
          <DocsWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
        {item.type === 'why' && (
          <WhyMindMeshWindow dragControls={dragControls} onClose={onClose} onMinimize={onMinimize} />
        )}
      </div>
    </motion.div>
  );
}

export const OPEN_WINDOW_EVENT = 'mindmesh-open-window';

export default function Hero() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const leftIcons = [
    { icon: Home, label: 'home.mdx', color: 'text-blue-400' },
    { icon: Download, label: 'Sign up', color: 'text-teal-400' },
    { icon: Calculator, label: 'Pricing', color: 'text-purple-400' },
    { icon: FileText, label: 'features', color: 'text-green-400' },
    { icon: Play, label: 'demo.mov', color: 'text-red-400' },
    { icon: BookOpen, label: 'Docs', color: 'text-cyan-400' },
    { icon: Mail, label: 'Talk to a human', color: 'text-orange-400' },
  ];

  const rightIcons = [
    { icon: Sparkles, label: 'Why MindMesh?', color: 'text-teal-400' },
    { icon: Download, label: 'Download', color: 'text-yellow-400' },
    { icon: BookOpen, label: 'Company handbook', color: 'text-blue-400' },
    { icon: Settings, label: 'Work here', color: 'text-purple-400' },
    { icon: MessageSquare, label: 'Ask a question', color: 'text-pink-400' },
    { icon: Trash2, label: 'Trash', color: 'text-green-400' },
  ];

  const allIcons = [...leftIcons, ...rightIcons];

  // Initialize positions - left icons on left, right icons on right
  // Icons are arranged in perfect vertical columns with consistent spacing
  const getInitialPosition = (index: number, isLeft: boolean): IconPosition => {
    // Each icon takes: icon box (48px) + gap (8px) + text (~20px) = ~76px total
    // Using 90px spacing for proper visual gap between icons
    const iconSpacing = 90;
    const startY = 96; // top-24 = 96px from top
    const leftX = 32; // left-8 = 32px from left edge
    
    if (isLeft) {
      // All left icons perfectly aligned at x=32, evenly spaced vertically
      return { x: leftX, y: startY + index * iconSpacing };
    } else {
      // All right icons perfectly aligned, evenly spaced vertically
      // Icon container is 80px wide, so position at window width - 80px - 32px margin = window width - 112px
      const rightX = typeof window !== 'undefined' ? window.innerWidth - 112 : 1200;
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

  // Listen for open-window from Navbar (when on home) and handle ?open= URL param
  useEffect(() => {
    const handleOpen = (e: CustomEvent<WindowType>) => {
      openWindow(e.detail);
    };
    window.addEventListener(OPEN_WINDOW_EVENT, handleOpen as EventListener);
    return () => window.removeEventListener(OPEN_WINDOW_EVENT, handleOpen as EventListener);
  }, [openWindow]);

  useEffect(() => {
    const open = searchParams.get('open');
    if (open === 'download') {
      openWindow('download');
      router.replace('/');
    }
  }, [searchParams, router, openWindow]);

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

  const handleIconTap = (label: string) => {
    if (label === 'home.mdx') openWindow('home');
    if (label === 'features') openWindow('features');
    if (label === 'Download') openWindow('download');
    if (label === 'Docs') openWindow('docs');
    if (label === 'Why MindMesh?') openWindow('why');
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
      if (label === 'home.mdx') openWindow('home');
      if (label === 'features') openWindow('features');
      if (label === 'Download') openWindow('download');
      if (label === 'Docs') openWindow('docs');
      if (label === 'Why MindMesh?') openWindow('why');
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
          src="/images/herosec-bg.png"
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            className="absolute z-10 flex flex-col items-center gap-2 group pointer-events-auto"
            style={{
              left: position.x ? `${position.x + dragOffset.x}px` : '0px',
              top: position.y ? `${position.y + dragOffset.y}px` : '0px',
              width: '80px', // Fixed width for consistent alignment
            }}
          >
            <div className="w-12 h-12 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center group-hover:bg-gray-700/50 transition-all duration-200 shadow-lg flex-shrink-0">
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <span className="text-xs text-gray-300 group-hover:text-white transition-colors text-center max-w-[80px] whitespace-nowrap leading-tight">
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

      {/* Single dock for all minimized windows */}
      {minimizedIds.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-wrap gap-2 justify-center max-w-[90vw]"
        >
          {openWindows
            .filter((w) => minimizedIds.has(w.id))
            .map((w) => (
              <button
                key={w.id}
                onClick={() => restoreWindow(w.id)}
                className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-700/90 transition-all duration-200 shadow-lg"
                title={`Restore ${WINDOW_LABELS[w.type]}`}
              >
                <div className="w-4 h-4 rounded bg-gray-600" />
                <span className="text-sm text-gray-300">{WINDOW_LABELS[w.type]}</span>
              </button>
            ))}
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-gray-400/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-gray-400/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

