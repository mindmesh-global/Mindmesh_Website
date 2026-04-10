'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSplitView } from '@/context/SplitViewContext';
import {
  Layers,
  MessageCircle,
  ScanSearch,
  Target,
  Link2,
  HardDrive,
  BookOpen,
  ClipboardList,
  MousePointerClick,
  Shield,
} from 'lucide-react';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

const features = [
  { icon: Layers, title: 'Your workflow finally has memory', description: 'MindMesh helps you capture context, surface what matters, and act faster across email, calendar, and everything in between.', color: 'from-blue-500 to-blue-600' },
  { icon: MessageCircle, title: 'Ask naturally, get useful answers', description: 'With Mascot Chat, Ask questions in plain language and get answers grounded in your actual context. MindMesh combines memory retrieval with live data when needed, so responses stay useful instead of generic.', color: 'from-purple-500 to-purple-600' },
  { icon: ScanSearch, title: 'Find the exact email or event fast', description: 'Search by meaning, not just keywords. MindMesh helps you surface the thread, meeting, or detail you need without digging through folders, tabs, or long histories.', color: 'from-pink-500 to-pink-600' },
  { icon: Target, title: 'Know what matters today', description: 'See the emails, meetings, and follow-ups that deserve attention now. MindMesh helps turn a busy inbox and calendar into a clearer picture of your day.', color: 'from-green-500 to-green-600' },
  { icon: Link2, title: 'Works across multiple accounts', description: 'Keep context across work and personal accounts without losing track of where something came from. MindMesh is built to retrieve the right memory with the right account scope.', color: 'from-yellow-500 to-yellow-600' },
  { icon: HardDrive, title: 'Local-first by design', description: 'MindMesh is designed to keep core data close to the user, with cloud services used selectively for sync, heavy compute, and AI features. That gives you more control without giving up useful intelligence.', color: 'from-indigo-500 to-indigo-600' },
  { icon: BookOpen, title: 'Start with the story, not the search', description: 'Yesterday’s Narrative gives you a clean recap of what happened, what changed, and what still needs attention.', color: 'from-cyan-500 to-cyan-600' },
  { icon: ClipboardList, title: 'Turn activity into action', description: 'MindMesh extracts inferred facts and to-dos from emails and meetings, so important details do not stay buried in threads and calendar events.', color: 'from-orange-500 to-orange-600' },
  { icon: MousePointerClick, title: 'Capture context instantly', description: 'Use the Sensor Bar to check, launch, ask, and capture things the moment they matter, without breaking your flow.', color: 'from-red-500 to-red-600' },
  { icon: Shield, title: 'Your privacy matters', description: 'MindMesh is built with privacy at its core. Your data stays under your control—encrypted locally, with clear choices about what gets synced. No selling your data, no hidden tracking.', color: 'from-gray-500 to-gray-600' },
];

// Bento layout: cardIndex -> { gridClass, bg, border, isDark, iconBg, iconColor, cardColor? }
const BENTO_LAYOUT = [
  { gridClass: 'md:col-span-2', bg: 'bg-purple-50', border: 'border-2 border-purple-200', isDark: false, iconBg: 'bg-purple-500', iconColor: '#8b5cf6' },
  { gridClass: 'md:col-span-1 md:row-span-2', bg: 'bg-gray-900', border: 'border-2 border-gray-600', isDark: true, iconBg: 'bg-violet-500', iconColor: '#8b5cf6' },
  { gridClass: 'md:col-span-1', bg: 'bg-cyan-50', border: 'border-2 border-cyan-200', isDark: false, iconBg: 'bg-pink-500', iconColor: '#ec4899' },
  { gridClass: 'md:col-span-1', bg: 'bg-green-50', border: 'border-2 border-green-200', isDark: false, iconBg: 'bg-green-500', iconColor: '#22c55e' },
  { gridClass: 'md:col-span-3', bg: 'bg-blue-50', border: 'border-2 border-blue-200', isDark: false, iconBg: 'bg-blue-500', iconColor: '#3b82f6' },
  { gridClass: 'md:col-span-1', bg: 'bg-orange-50', border: 'border-2 border-orange-200', isDark: false, iconBg: 'bg-amber-600', iconColor: '#d97706' },
  { gridClass: 'md:col-span-1', bg: 'bg-pink-50', border: 'border-2 border-pink-200', isDark: false, iconBg: 'bg-indigo-600', iconColor: '#4f46e5' },
  { gridClass: 'md:col-span-1', bg: 'bg-sky-50', border: 'border-2 border-blue-200', isDark: false, iconBg: 'bg-orange-600', iconColor: '#ea580c', cardColor: '#e0f2fe' },
  { gridClass: 'md:col-span-1', bg: 'bg-purple-50', border: 'border-2 border-purple-200', isDark: false, iconBg: 'bg-red-500', iconColor: '#ef4444', cardColor: '#f3e8ff' },
  { gridClass: 'md:col-span-2', bg: 'bg-gray-50', border: 'border-2 border-gray-200', isDark: false, iconBg: 'bg-gray-600', iconColor: '#475569', cardColor: '#f8fafc' },
];

// Per-icon infinite animations (pulse, float, bounce, etc.)
const ICON_ANIMATIONS = [
  { animate: { scale: [1, 1.08, 1] }, transition: { repeat: Infinity, duration: 2.2 } },
  { animate: { y: [0, -4, 0] }, transition: { repeat: Infinity, duration: 2.5 } },
  { animate: { rotate: [0, 5, -5, 0] }, transition: { repeat: Infinity, duration: 3 } },
  { animate: { scale: [1, 1.06, 1] }, transition: { repeat: Infinity, duration: 2 } },
  { animate: { opacity: [1, 0.7, 1] }, transition: { repeat: Infinity, duration: 2.5 } },
  { animate: { y: [0, -3, 0] }, transition: { repeat: Infinity, duration: 2.8 } },
  { animate: { rotate: [0, -3, 3, 0] }, transition: { repeat: Infinity, duration: 4 } },
  { animate: { scale: [1, 1.05, 1] }, transition: { repeat: Infinity, duration: 2.3 } },
  { animate: { y: [0, -2, 0] }, transition: { repeat: Infinity, duration: 1.8 } },
  { animate: { scale: [1, 1.04, 1] }, transition: { repeat: Infinity, duration: 2.4 } },
];

interface FeaturesWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

export default function FeaturesWindow({ dragControls, onClose, onMinimize }: FeaturesWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isSplitView = useSplitView();

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
        className={`w-full bg-gray-900 overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none max-w-none h-screen' : isSplitView ? 'max-w-none min-h-0 flex-1 rounded-none' : 'max-w-[1600px] min-h-0 flex-1 rounded-lg'
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
            <span className="text-sm text-gray-400 font-medium">Features</span>
          </div>
        </div>

        {/* Content — Bento grid, white background */}
        <div className={`flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          {/* Hero */}
          <section className="pt-12 pb-8 text-center max-w-4xl mx-auto px-6">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4"
            >
              Stop managing Tools.
              <br />
              <span className="text-[#7c3aed]">Start using Memory.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-500 max-w-2xl mx-auto"
            >
              MindMesh turns scattered activity into searchable context so you can find what matters, understand it faster, and decide what to do next.
            </motion.p>
          </section>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-6 pb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const layout = BENTO_LAYOUT[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + index * 0.04 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={layout.cardColor ? { backgroundColor: layout.cardColor } : undefined}
                  className={`${layout.cardColor ? '' : layout.bg} ${layout.border} rounded-[18px] p-6 shadow-md col-span-1 ${layout.gridClass} hover:shadow-lg transition-shadow duration-200`}
                >
                  <motion.div
                    animate={ICON_ANIMATIONS[index]?.animate}
                    transition={ICON_ANIMATIONS[index]?.transition}
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: layout.iconColor ?? '#6366f1' }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </motion.div>
                  <h3 className={`font-bold mb-2 text-base ${layout.isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${layout.isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
