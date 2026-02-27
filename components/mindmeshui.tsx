'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Cat, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardPage from '@/app/dashboard/page';
import { useUIOverlay } from '@/context/UIOverlayContext';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

interface MindMeshUIProps {
  /** When set, title bar becomes drag handle to move the window (used in Hero) */
  dragControls?: DragControls;
  /** Called when the user closes the window (red button); used to hide window so it can be reopened from desktop icon */
  onClose?: () => void;
  /** When set (e.g. in Hero with multiple windows), minimize is handled by parent and this window uses the shared dock */
  onMinimize?: () => void;
}

export default function MindMeshUI({ dragControls, onClose, onMinimize }: MindMeshUIProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const uiOverlay = useUIOverlay();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isOverlayDropdownOpen, setIsOverlayDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        setIsOverlayDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsClosed(true);
    onClose?.();
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
      return;
    }
    setIsMinimized(true);
  };

  const handleRestoreFromDock = () => {
    setIsMinimized(false);
  };

  const handleFullscreen = async () => {
    if (!windowRef.current) return;

    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        await windowRef.current.requestFullscreen();
      } else {
        // Exit fullscreen
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  // Listen for fullscreen changes (user might exit fullscreen via ESC key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // If closed, don't render anything
  if (isClosed) {
    return null;
  }

  // If minimized and no parent dock (standalone), show own dock icon
  if (isMinimized && !onMinimize) {
    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={handleRestoreFromDock}
          className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-700/90 transition-all duration-200 shadow-lg"
          title="Restore window"
        >
          <div className="w-4 h-4 rounded bg-gray-600"></div>
          <span className="text-sm text-gray-300">home.mdx</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-0 flex-1 flex flex-col ">
      {/* Mac Window Container - centered vertically */}
      <div
        ref={windowRef}
        className={`w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none max-w-none h-screen' : 'max-w-[1600px] min-h-0 flex-1'
        }`}
      >
        {/* Title bar - drag handle when dragControls provided */}
        <div
          className={`bg-gray-800/80 border-b border-gray-700/50 px-4 py-3 flex items-center gap-2 flex-shrink-0 select-none ${dragControls ? 'cursor-grab active:cursor-grabbing' : ''}`}
          onPointerDown={dragControls ? (e) => { if ((e.target as HTMLElement).closest('button')) return; dragControls.start(e); } : undefined}
          style={dragControls ? { touchAction: 'none' } : undefined}
        >
          {/* Traffic Light Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors active:scale-90"
              title="Close"
              aria-label="Close window"
            />
            <button
              onClick={handleMinimize}
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
          {/* Title + Overlay dropdown */}
          <div className="flex-1 flex items-center justify-center gap-1">
            <span className="text-sm text-gray-400 font-medium">home.mdx</span>
            {uiOverlay && (
              <div className="relative" ref={overlayRef}>
                <button
                  type="button"
                  onClick={() => setIsOverlayDropdownOpen(!isOverlayDropdownOpen)}
                  className="p-0.5 rounded hover:bg-gray-700/60 transition-colors text-gray-500 hover:text-gray-300"
                  title="Overlays"
                  aria-label="Toggle overlays menu"
                  aria-expanded={isOverlayDropdownOpen}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOverlayDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOverlayDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                    >
                      <button
                        type="button"
                        onClick={() => uiOverlay.setShowMascot(!uiOverlay.showMascot)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700/80 transition-colors"
                      >
                        <Cat className="w-4 h-4 text-amber-400" />
                        Mascot
                        {uiOverlay.showMascot && (
                          <span className="ml-auto text-[10px] text-green-400">On</span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => uiOverlay.setShowSensorBar(!uiOverlay.showSensorBar)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700/80 transition-colors"
                      >
                        <Sun className="w-4 h-4 text-amber-400" />
                        Sensor Bar
                        {uiOverlay.showSensorBar && (
                          <span className="ml-auto text-[10px] text-green-400">On</span>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className={`flex-1 min-h-0 overflow-y-auto ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          <DashboardPage />
        </div>
      </div>
    </div>
  );
}
