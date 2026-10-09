'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type OS = 'mac' | 'windows';

function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'mac';
  return navigator.userAgent.toLowerCase().includes('win') ? 'windows' : 'mac';
}

const WindowsIcon = () => (
  <svg viewBox="0 0 88 88" className="h-14 w-14" fill="none">
    <rect x="0"  y="0"  width="42" height="42" fill="#0078D4" rx="2" />
    <rect x="46" y="0"  width="42" height="42" fill="#0078D4" rx="2" />
    <rect x="0"  y="46" width="42" height="42" fill="#0078D4" rx="2" />
    <rect x="46" y="46" width="42" height="42" fill="#0078D4" rx="2" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 64 78" className="h-14 w-14" fill="white" style={{ transform: 'scale(1.35)' }}>
    <path d="M52.6 40.6c-.1-8 6.5-11.8 6.8-12-3.7-5.4-9.5-6.1-11.6-6.2-4.9-.5-9.6 2.9-12.1 2.9-2.5 0-6.4-2.8-10.5-2.7-5.4.1-10.4 3.1-13.2 7.9-5.6 9.8-1.5 24.4 4 32.3 2.7 3.9 5.9 8.2 10.1 8 4.1-.2 5.6-2.6 10.5-2.6s6.3 2.6 10.6 2.5c4.4-.1 7.1-3.9 9.8-7.8 3.1-4.5 4.4-8.8 4.5-9-.1-.1-8.8-3.4-8.9-13.3zM44.5 14.8C46.8 12 48.3 8.2 47.9 4.4c-3.3.1-7.3 2.2-9.7 5-2.1 2.4-4 6.4-3.5 10.1 3.7.3 7.5-1.9 9.8-4.7z" />
  </svg>
);

const PLATFORMS = [
  {
    key: 'windows' as OS,
    name: 'Windows',
    subtitle: 'Windows 10, 11',
    primaryLabel: '.exe',
    href: 'https://mindmesh-downloads.s3.ap-southeast-2.amazonaws.com/installers/windows/338/MindMesh_0.3.2_x64-setup.exe',
    icon: <WindowsIcon />,
  },
  {
    key: 'mac' as OS,
    name: 'Mac',
    subtitle: 'macOS 12.0+',
    primaryLabel: '.dmg',
    href: 'https://mindmesh-downloads.s3.ap-southeast-2.amazonaws.com/installers/macos/338/MindMesh_0.3.2_universal.dmg',
    icon: <AppleIcon />,
  },
];

export function DownloadModal({ onClose, source = 'unknown' }: { onClose: () => void; source?: string }) {
  const [os, setOS] = useState<OS>('mac');

  useEffect(() => { setOS(detectOS()); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f1623] px-8 py-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-500 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="mb-1 text-center text-xl font-bold text-white">Download MindMesh</h3>
        <p className="mb-8 text-center text-sm text-gray-400">
          The cognitive layer for modern work.
        </p>

        <div className="grid grid-cols-2 gap-6">
          {PLATFORMS.map((p) => (
            <div key={p.key} className="flex flex-col items-center gap-4">
              {/* Big OS icon */}
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden">
                {p.icon}
              </div>

              {/* Primary download button — VS Code style */}
              <a
                href={p.href}
                download
                onClick={() => {
                  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
                    (window as any).gtag('event', 'download_click', { os: p.key, source });
                  }
                  onClose();
                }}
                className={`flex w-full flex-col items-center rounded-lg px-4 py-3 font-bold transition-colors ${
                  p.key === os
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-[#1c2a3a] text-white hover:bg-[#243547]'
                }`}
              >
                <span className="flex items-center gap-2 text-base">
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 11.5L3.5 7H6V2h4v5h2.5L8 11.5z"/>
                    <path d="M2 13h12v1.5H2z"/>
                  </svg>
                  {p.name}
                </span>
              </a>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
