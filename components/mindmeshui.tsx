'use client';
import { useState, useRef, useEffect } from 'react';
import DashboardPage from '@/app/dashboard/page';

export default function MindMeshUI() {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    // Close the window by hiding it
    setIsClosed(true);
  };

  const handleMinimize = () => {
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

  // If minimized, show dock icon
  if (isMinimized) {
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
    <div className="w-full min-h-0 flex-1 flex flex-col">
      {/* Mac Window Container - centered vertically */}
      <div
        ref={windowRef}
        className={`w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none max-w-none h-screen' : 'max-w-[1600px] min-h-0 flex-1'
        }`}
      >
        {/* app dashboard ui */}
        <div className="bg-gray-800/80 border-b border-gray-700/50 px-4 py-3 flex items-center gap-2 flex-shrink-0">
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
          {/* Title */}
          <div className="flex-1 text-center">
            <span className="text-sm text-gray-400 font-medium">home.mdx</span>
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
