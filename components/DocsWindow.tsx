'use client';

import { useRef, useEffect, useState } from 'react';
import { FileText, Shield, Scale } from 'lucide-react';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

interface DocsWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

type DocId = 'privacy' | 'terms';

const docItems: { id: DocId; label: string; icon: typeof Shield }[] = [
  { id: 'privacy', label: 'Privacy Policy', icon: Shield },
  { id: 'terms', label: 'Terms and Conditions', icon: Scale },
];

const privacyPolicyContent = (
  <div className="prose prose-sm prose-gray max-w-none">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
    <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">1. Information We Collect</h3>
    <p className="text-gray-600 mb-4">
      We collect information you provide directly (e.g., account details, support requests) and usage data to improve our services. We do not sell your personal information.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">2. How We Use Your Information</h3>
    <p className="text-gray-600 mb-4">
      Your data is used to deliver and improve MindMesh, personalize your experience, send updates, and ensure security. We use industry-standard encryption and store data locally when you choose local-first mode.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">3. Data Sharing</h3>
    <p className="text-gray-600 mb-4">
      We do not share your personal information with third parties for marketing. We may share data only as required by law or with your consent for service operations.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">4. Your Rights</h3>
    <p className="text-gray-600 mb-4">
      You can access, correct, or delete your data through your account settings or by contacting us. You may also opt out of marketing communications at any time.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">5. Contact</h3>
    <p className="text-gray-600">
      For privacy-related questions, contact us at privacy@mindmesh.example.com.
    </p>
  </div>
);

const termsContent = (
  <div className="prose prose-sm prose-gray max-w-none">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Terms and Conditions</h2>
    <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">1. Acceptance of Terms</h3>
    <p className="text-gray-600 mb-4">
      By accessing or using MindMesh, you agree to these Terms and Conditions. If you do not agree, please do not use our services.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">2. Use of Service</h3>
    <p className="text-gray-600 mb-4">
      You may use MindMesh for lawful purposes only. You are responsible for keeping your account secure and for all activity under your account. You may not misuse the service, attempt to gain unauthorized access, or interfere with other users.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">3. Intellectual Property</h3>
    <p className="text-gray-600 mb-4">
      MindMesh and its content, features, and functionality are owned by us and are protected by copyright, trademark, and other laws. You may not copy, modify, or create derivative works without permission.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">4. Limitation of Liability</h3>
    <p className="text-gray-600 mb-4">
      To the fullest extent permitted by law, MindMesh shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.
    </p>
    <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">5. Changes</h3>
    <p className="text-gray-600">
      We may update these terms from time to time. We will notify you of material changes by posting the new terms and updating the &quot;Last updated&quot; date. Continued use after changes constitutes acceptance.
    </p>
  </div>
);

export default function DocsWindow({ dragControls, onClose, onMinimize }: DocsWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocId | null>(null);

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

  const content = activeDoc === 'privacy' ? privacyPolicyContent : activeDoc === 'terms' ? termsContent : null;

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
            <span className="text-sm text-gray-400 font-medium">Docs</span>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 min-h-0 flex overflow-hidden ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          {/* Sidebar */}
          <nav className="w-52 flex-shrink-0 bg-gray-800/50 border-r border-gray-700/50 p-3 flex flex-col gap-1">
            <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 text-xs font-medium uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              Legal
            </div>
            {docItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeDoc === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveDoc(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          {/* Document body */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-white">
            {content ? (
              <div className="max-w-3xl mx-auto px-6 py-8">
                {content}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6">
                <FileText className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-sm font-medium">Select a document</p>
                <p className="text-xs mt-1">Choose Privacy Policy or Terms and Conditions from the sidebar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
