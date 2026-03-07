'use client';

import { useRef, useEffect, useState } from 'react';
import {
  Mail,
  Calendar,
  Brain,
  Lock,
  Zap,
  Cat,
  Clock,
  Search,
  Shield,
  Sparkles,
} from 'lucide-react';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

const features = [
  { icon: Mail, title: 'Your workflow finally has memory', description: 'MindMesh helps you capture context, surface what matters, and act faster across email, calendar, and everything in between.', color: 'from-blue-500 to-blue-600' },
  { icon: Calendar, title: 'Ask naturally, get useful answers', description: 'With Mascot Chat, Ask questions in plain language and get answers grounded in your actual context. MindMesh combines memory retrieval with live data when needed, so responses stay useful instead of generic.', color: 'from-purple-500 to-purple-600' },
  { icon: Brain, title: 'Find the exact email or event fast', description: 'Search by meaning, not just keywords. MindMesh helps you surface the thread, meeting, or detail you need without digging through folders, tabs, or long histories.', color: 'from-pink-500 to-pink-600' },
  { icon: Lock, title: 'Know what matters today', description: 'See the emails, meetings, and follow-ups that deserve attention now. MindMesh helps turn a busy inbox and calendar into a clearer picture of your day.', color: 'from-green-500 to-green-600' },
  { icon: Zap, title: 'Works across multiple accounts', description: 'Keep context across work and personal accounts without losing track of where something came from. MindMesh is built to retrieve the right memory with the right account scope.', color: 'from-yellow-500 to-yellow-600' },
  { icon: Search, title: 'Local-first by design', description: 'MindMesh is designed to keep core data close to the user, with cloud services used selectively for sync, heavy compute, and AI features. That gives you more control without giving up useful intelligence.', color: 'from-indigo-500 to-indigo-600' },
  { icon: Cat, title: 'Start with the story, not the search', description: 'Yesterday’s Narrative gives you a clean recap of what happened, what changed, and what still needs attention.', color: 'from-cyan-500 to-cyan-600' },
  { icon: Clock, title: 'Turn activity into action', description: 'MindMesh extracts inferred facts and to-dos from emails and meetings, so important details do not stay buried in threads and calendar events.', color: 'from-orange-500 to-orange-600' },
  { icon: Shield, title: 'Capture context instantly', description: 'Use the Sensor Bar to check, launch, ask, and capture things the moment they matter, without breaking your flow.', color: 'from-red-500 to-red-600' },
];

interface FeaturesWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

export default function FeaturesWindow({ dragControls, onClose, onMinimize }: FeaturesWindowProps) {
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
            <span className="text-sm text-gray-400 font-medium">Features</span>
          </div>
        </div>

        {/* Content - Features section */}
        <div className={`flex-1 min-h-0 overflow-y-auto bg-white ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          {/* Why MindMesh? - section header */}
          <div className="bg-black px-6 py-8 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-xl border-2 border-white flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-white text-center">Why MindMesh?</h2>
          </div>
          <div className="max-w-4xl mx-auto px-6 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Stop managing Tools.
              <br />
              <span className="gradient-text">Start using Memory.</span>
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
            MindMesh turns scattered activity into searchable context so you can find what matters, understand it faster, and decide what to do next.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isMascotChat = feature.title === 'Mascot Chat';
                return (
                  <div
                    key={index}
                    className="group p-5 bg-gray-50 rounded-xl hover:bg-white transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:shadow-lg"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${
                        isMascotChat ? 'bg-gray-100' : `bg-gradient-to-br ${feature.color}`
                      } flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-6 h-6 ${isMascotChat ? 'text-black' : 'text-white'}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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
