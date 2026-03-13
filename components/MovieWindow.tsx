'use client';

import { useRef, useEffect, useState } from 'react';
import { Video } from 'lucide-react';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

interface MovieWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

export default function MovieWindow({ dragControls, onClose, onMinimize }: MovieWindowProps) {
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
            <span className="text-sm text-gray-400 font-medium">Demo.mov</span>
          </div>
        </div>

        {/* Content - Demo video */}
        <div className={`flex-1 min-h-0 overflow-y-auto bg-black/50 flex items-center justify-center p-6 ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          <div className="w-full max-w-4xl aspect-video bg-black/70 rounded-lg flex flex-col items-center justify-center gap-4 border border-gray-700/50">
            <Video className="w-16 h-16 text-gray-500" strokeWidth={1.5} />
            <p className="text-gray-400 text-center">Demo video placeholder — add your demo.mov or video embed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
