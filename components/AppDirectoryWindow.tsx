'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSplitView } from '@/context/SplitViewContext';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

// Static imports ensure icons are bundled and always load
import gmailIcon from '@/public/images/icons/gmail.png';
import googleCalendarIcon from '@/public/images/icons/google-calendar.png';
import outlookIcon from '@/public/images/icons/outlook.png';
import outlookCalendarIcon from '@/public/images/icons/outlook-calendar.png';
import smtpIcon from '@/public/images/icons/smtp.png';

const CONNECTED_APPS = [
  { icon: gmailIcon, name: 'Gmail', description: 'Sync emails, labels, and threads', iconBg: 'bg-red-50' },
  { icon: googleCalendarIcon, name: 'Gmail Calendar', description: 'Sync events, meetings, and reminders', iconBg: 'bg-blue-50' },
  { icon: outlookIcon, name: 'Outlook', description: 'Microsoft 365 email integration', iconBg: 'bg-blue-50' },
  { icon: outlookCalendarIcon, name: 'Outlook Calendar', description: 'Sync Outlook events and meetings', iconBg: 'bg-blue-50' },
  { icon: smtpIcon, name: 'SMTP', description: 'Custom SMTP mailbox integration', iconBg: 'bg-green-50' },
];

interface AppDirectoryWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

export default function AppDirectoryWindow({ dragControls, onClose, onMinimize }: AppDirectoryWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isSplitView = useSplitView();

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
        className={`w-full bg-gray-900 overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none max-w-none h-screen' : isSplitView ? 'max-w-none min-h-0 flex-1 rounded-none' : 'max-w-[1400px] min-h-0 flex-1 rounded-lg'
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

        {/* Content - App Store style */}
        <div className={`flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          <div className="max-w-5xl mx-auto px-6">
            {/* Header */}
            <div className="text-center py-12 mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                App Directory
              </h1>
              <p className="text-gray-600">
                Apps that connect with MindMesh
              </p>
            </div>

            {/* Category label */}
            <div className="max-w-3xl mx-auto mb-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Connected Apps
              </h2>
            </div>

            {/* Icon grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 max-w-3xl mx-auto pb-16">
              {CONNECTED_APPS.map((app, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div
                    className={`w-20 h-20 rounded-2xl shadow-md border border-gray-100 flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 overflow-hidden p-3 ${app.iconBg}`}
                  >
                    {typeof app.icon === 'string' ? (
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-14 h-14 object-contain"
                      />
                    ) : (
                      <Image
                        src={app.icon}
                        alt={app.name}
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 mb-1">
                    {app.name}
                  </span>
                  <span className="text-xs text-gray-600 leading-tight max-w-[90px]">
                    {app.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
