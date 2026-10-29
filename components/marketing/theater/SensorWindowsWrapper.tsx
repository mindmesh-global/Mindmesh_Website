'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { getTheaterStep } from '@/lib/marketing-theater-scroll';
import { TheaterScrollProvider } from './TheaterScrollContext';

type Props = { children: React.ReactNode };

const TASKBAR_APPS = [
  { src: '/images/icons/gmail.png',           alt: 'Gmail' },
  { src: '/images/icons/slack.png',           alt: 'Slack' },
  { src: '/images/icons/outlook.png',         alt: 'Outlook' },
  { src: '/images/icons/google-calendar.png', alt: 'Calendar' },
  { src: '/images/icons/jira.png',            alt: 'Jira' },
] as const;

const DESKTOP_ICONS = [
  { label: 'Client Files',  type: 'folder' },
  { label: 'Proposals',     type: 'folder' },
  { label: 'Notes.docx',    type: 'file'   },
  { label: 'Q2 Budget',     type: 'folder' },
  { label: 'Roadmap',       type: 'file'   },
  { label: 'Archive',       type: 'folder' },
] as const;

function WinFolderIcon() {
  return (
    <svg viewBox="0 0 40 34" width="38" height="30" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8 Q2 5 5 5 L15 5 Q17 5 18 7 L19 9 L36 9 Q38 9 38 11 L38 30 Q38 32 36 32 L4 32 Q2 32 2 30 Z" fill="#FFB900" opacity="0.9"/>
      <path d="M2 11 L38 11 L38 30 Q38 32 36 32 L4 32 Q2 32 2 30 Z" fill="#FFC832" opacity="0.95"/>
    </svg>
  );
}

function WinFileIcon() {
  return (
    <svg viewBox="0 0 30 38" width="26" height="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 1 L20 1 L28 9 L28 36 Q28 38 26 38 L4 38 Q2 38 2 36 L2 3 Q2 1 3 1 Z" fill="#e8f0fe"/>
      <path d="M20 1 L20 9 L28 9 Z" fill="#bcd0fa"/>
      <rect x="7" y="15" width="14" height="1.5" rx="0.75" fill="#93b4f8" opacity="0.7"/>
      <rect x="7" y="19" width="10" height="1.5" rx="0.75" fill="#93b4f8" opacity="0.5"/>
      <rect x="7" y="23" width="12" height="1.5" rx="0.75" fill="#93b4f8" opacity="0.5"/>
    </svg>
  );
}

function WindowsLogo() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="7" height="7" fill="white" opacity="0.9"/>
      <rect x="9" y="0" width="7" height="7" fill="white" opacity="0.9"/>
      <rect x="0" y="9" width="7" height="7" fill="white" opacity="0.9"/>
      <rect x="9" y="9" width="7" height="7" fill="white" opacity="0.9"/>
    </svg>
  );
}

export function SensorWindowsWrapper({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      setInView(bottom > 0 && top < window.innerHeight);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  const state = useMemo(
    () => ({
      ref,
      progress: 0,
      step: getTheaterStep('sensorCalc', 0),
      isInView: inView,
      isPaused: !inView,
    }),
    [inView]
  );

  return (
    <div ref={ref}>
      <TheaterScrollProvider value={state}>
        <div
          className="relative overflow-hidden rounded-xl select-none"
          style={{
            height: '480px',
            /* Windows 11 Bloom wallpaper feel — teal/blue/purple */
            background:
              'linear-gradient(135deg, #0b3a6e 0%, #0d1f4f 30%, #1a1060 60%, #0a2a5a 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow:
              '0 0 0 0.5px rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.55), 0 20px 56px rgba(0,0,0,0.65)',
          }}
        >
          {/* Windows 11 wallpaper bloom glow */}
          <div className="pointer-events-none absolute inset-0" aria-hidden style={{
            backgroundImage:
              'radial-gradient(ellipse 65% 55% at 50% 60%, rgba(0,120,215,0.22) 0%, transparent 60%), radial-gradient(ellipse 45% 40% at 20% 30%, rgba(100,60,200,0.15) 0%, transparent 55%), radial-gradient(ellipse 50% 45% at 80% 20%, rgba(0,160,200,0.12) 0%, transparent 50%)',
          }}/>

          {/* Desktop icons — left column */}
          <div className="absolute left-3 top-3 z-10 grid grid-cols-2 gap-x-2 gap-y-3" aria-hidden>
            {DESKTOP_ICONS.map(({ label, type }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                {type === 'folder' ? <WinFolderIcon /> : <WinFileIcon />}
                <span
                  className="max-w-[52px] truncate text-center text-[9px] font-medium text-white/80"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Sensor bar floating centered */}
          <div className="absolute inset-0 z-20 flex items-center justify-center" style={{ top: 0, bottom: '48px' }}>
            <div className="w-full max-w-md px-6">
              {children}
            </div>
          </div>

          {/* Windows 11 Taskbar */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 flex h-12 items-center justify-between px-3"
            style={{
              background: 'rgba(20,20,30,0.85)',
              backdropFilter: 'blur(20px) saturate(140%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
            aria-hidden
          >
            {/* Left: Start button */}
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/10">
                <WindowsLogo />
              </div>
            </div>

            {/* Center: App icons */}
            <div className="flex items-center gap-1">
              {TASKBAR_APPS.map(({ src, alt }) => (
                <div
                  key={alt}
                  className="flex h-9 w-9 items-center justify-center rounded-md"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <Image src={src} alt={alt} width={24} height={24} className="h-6 w-6 object-contain" />
                </div>
              ))}
            </div>

            {/* Right: System tray */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/50">● ▲ ⌨</span>
              <div className="text-right">
                <div className="text-[11px] font-medium text-white/80">10:42 AM</div>
                <div className="text-[9px] text-white/50">10/15/2026</div>
              </div>
            </div>
          </div>
        </div>
      </TheaterScrollProvider>
    </div>
  );
}
