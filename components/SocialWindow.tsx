'use client';

import { useRef, useEffect, useState } from 'react';
import { useSplitView } from '@/context/SplitViewContext';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

interface SocialWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

const LINKEDIN_URL = 'https://www.linkedin.com/company/mindmesh';

export default function SocialWindow({ dragControls, onClose, onMinimize }: SocialWindowProps) {
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
            <span className="text-sm text-gray-400 font-medium">Social</span>
          </div>
        </div>

        {/* Content - full page layout */}
        <div className={`flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          <div className="min-h-full bg-white">
            {/* HERO SECTION - gradient top */}
            <div className="bg-gradient-to-b from-purple-50 to-white px-8 pt-10 pb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Stay in the loop
              </h1>
              <p className="text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
                Follow MindMesh for product updates, tips, and behind the scenes
              </p>
            </div>

            <div className="px-6 pb-10 max-w-lg mx-auto">
              {/* LINKEDIN CARD - big and prominent */}
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">
                Follow us
              </p>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl text-white hover:opacity-95 transition-all duration-200 group shadow-lg shadow-blue-200 mb-8"
                style={{ backgroundColor: '#0A66C2' }}
              >
                <div className="w-14 h-14 bg-white/25 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 font-bold text-white">
                  in
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base mb-0.5 text-white">LinkedIn</div>
                  <div className="text-white/95 text-xs">@mindmesh — Follow for updates</div>
                </div>
                <span className="text-white/80 group-hover:translate-x-1 transition-transform text-lg flex-shrink-0">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
