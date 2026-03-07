'use client';

import { useRef, useEffect, useState } from 'react';
import {
  Mail,
  Server,
  FolderOpen,
} from 'lucide-react';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

const CONNECTED_APPS = [
  { icon: Mail, name: 'Gmail', description: 'Sync emails, labels, and threads', color: 'from-red-500 to-red-600' },
  { icon: Mail, name: 'Outlook', description: 'Microsoft 365 email & calendar', color: 'from-indigo-500 to-indigo-600' },
  { icon: Server, name: 'SMTP', description: 'Custom SMTP mailbox integration', color: 'from-green-500 to-green-600' },
];

interface AppDirectoryWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

export default function AppDirectoryWindow({ dragControls, onClose, onMinimize }: AppDirectoryWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleClose = () => onClose?.();

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
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none max-w-none h-screen' : 'max-w-[1400px] min-h-0 flex-1'
        }`}
      >
        {/* Mac-style title bar */}
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
            <span className="text-sm text-gray-400 font-medium">App Directory</span>
          </div>
        </div>

        {/* Content - Connected apps */}
        <div className={`flex-1 min-h-0 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center mb-4">
                <FolderOpen className="w-8 h-8 text-indigo-500 dark:text-indigo-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">App Directory</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                Apps that connect with MindMesh
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONNECTED_APPS.map((app, index) => {
                const Icon = app.icon;
                return (
                  <div
                    key={index}
                    className="group p-4 rounded-xl border transition-all duration-200 bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{app.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                          {app.description}
                        </p>
                      </div>
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
