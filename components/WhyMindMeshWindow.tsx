'use client';

import { useRef, useEffect, useState } from 'react';
import { Sparkles, Shield, Zap, Brain, Lock } from 'lucide-react';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

const reasons = [
  {
    icon: Brain,
    title: 'One place for your mind',
    description: 'Email, calendar, tasks, and notes in a single AI-powered workspace. No more switching tabs or losing context.',
    iconBg: 'bg-blue-600',
    iconColor: 'text-white',
  },
  {
    icon: Shield,
    title: 'Privacy first',
    description: 'Your data stays on your device. Local-first means no cloud mining, no selling your information—just your productivity.',
    iconBg: 'bg-green-600',
    iconColor: 'text-white',
  },
  {
    icon: Zap,
    title: 'Built for speed',
    description: 'Instant search, real-time sync, and a lightweight app that gets out of your way so you can focus on what matters.',
    iconBg: 'bg-purple-600',
    iconColor: 'text-white',
  },
  {
    icon: Lock,
    title: 'You stay in control',
    description: 'Choose what to sync, what to keep local, and how your AI assistant helps—without locking you into someone else\'s cloud.',
    iconBg: 'bg-indigo-600',
    iconColor: 'text-white',
  },
];

interface WhyMindMeshWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

export default function WhyMindMeshWindow({ dragControls, onClose, onMinimize }: WhyMindMeshWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
            <span className="text-sm text-gray-400 font-medium">Why MindMesh?</span>
          </div>
        </div>

        {/* Content - Why MindMesh only */}
        <div className={`flex-1 min-h-0 overflow-y-auto bg-white ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          <div className="bg-black px-6 py-10 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-xl border-2 border-white flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white text-center mb-2">Why MindMesh?</h1>
            <p className="text-gray-400 text-center max-w-lg">
              One AI-powered assistant that keeps your work in one place—without giving up your privacy.
            </p>
          </div>
          <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="space-y-8">
              {reasons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-5 p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <div className={`w-12 h-12 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <Icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
