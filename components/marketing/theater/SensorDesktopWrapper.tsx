'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { getTheaterStep } from '@/lib/marketing-theater-scroll';
import { TheaterScrollProvider } from './TheaterScrollContext';

type Props = { children: React.ReactNode };

const DOCK_APPS = [
  { src: '/images/icons/gmail.png',             alt: 'Gmail' },
  { src: '/images/icons/slack.png',             alt: 'Slack' },
  { src: '/images/icons/google-calendar.png',   alt: 'Calendar' },
  { src: '/images/icons/jira.png',              alt: 'Jira' },
  { src: '/images/icons/outlook.png',           alt: 'Outlook' },
] as const;

const DESKTOP_ICONS = [
  { label: 'Acme Co',    type: 'folder' },
  { label: 'Q2 Review',  type: 'folder' },
  { label: 'Brief.pdf',  type: 'file'   },
  { label: 'Marlowe',    type: 'folder' },
  { label: 'Notes',      type: 'file'   },
  { label: 'Contracts',  type: 'folder' },
] as const;

function FolderIcon() {
  return (
    <svg viewBox="0 0 40 32" width="40" height="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8 Q2 4 6 4 L14 4 Q16 4 17 6 L18 8 L36 8 Q38 8 38 10 L38 28 Q38 30 36 30 L4 30 Q2 30 2 28 Z" fill="#5B8ADE" opacity="0.85"/>
      <path d="M2 10 L38 10 L38 28 Q38 30 36 30 L4 30 Q2 30 2 28 Z" fill="#6B9DEF" opacity="0.9"/>
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 32 40" width="28" height="34" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2 L22 2 L30 10 L30 38 Q30 40 28 40 L4 40 Q2 40 2 38 L2 4 Q2 2 4 2 Z" fill="#f0f0f5"/>
      <path d="M22 2 L22 10 L30 10 Z" fill="#c8c8d8"/>
      <rect x="8" y="16" width="16" height="1.5" rx="0.75" fill="#aaaacc" opacity="0.7"/>
      <rect x="8" y="20" width="12" height="1.5" rx="0.75" fill="#aaaacc" opacity="0.5"/>
      <rect x="8" y="24" width="14" height="1.5" rx="0.75" fill="#aaaacc" opacity="0.5"/>
    </svg>
  );
}

export function SensorDesktopWrapper({ children }: Props) {
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

  const sensorState = useMemo(
    () => ({
      ref,
      progress: 0,
      step: getTheaterStep('sensor', 0),
      isInView: inView,
      isPaused: !inView,
    }),
    [inView]
  );

  return (
    <div ref={ref}>
      <TheaterScrollProvider value={sensorState}>
        <div
          className="relative overflow-hidden rounded-xl select-none"
          style={{
            height: '480px',
            background: 'linear-gradient(145deg, #1e1b38 0%, #0d1125 40%, #1a1028 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow:
              '0 0 0 0.5px rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.55), 0 20px 56px rgba(0,0,0,0.65)',
          }}
        >
          {/* Wallpaper ambient glow */}
          <div className="pointer-events-none absolute inset-0" aria-hidden style={{
            backgroundImage: 'radial-gradient(ellipse 70% 55% at 30% 60%, rgba(90,60,180,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 45% at 75% 30%, rgba(40,80,180,0.14) 0%, transparent 55%)',
          }}/>

          {/* macOS menu bar */}
          <div className="relative z-10 flex h-6 items-center justify-between px-3"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-white/70"></span>
              <span className="text-[11px] font-semibold text-white/80">MindMesh</span>
              <span className="text-[11px] text-white/40">File</span>
              <span className="text-[11px] text-white/40">Edit</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/50">●  ▲  ⌨</span>
              <span className="text-[11px] font-medium text-white/70">10:42</span>
            </div>
          </div>

          {/* Desktop icons grid — top right */}
          <div className="absolute right-4 top-10 z-10 grid grid-cols-2 gap-x-3 gap-y-4" aria-hidden>
            {DESKTOP_ICONS.map(({ label, type }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                {type === 'folder' ? <FolderIcon /> : <FileIcon />}
                <span
                  className="max-w-[52px] truncate text-center text-[9px] font-medium text-white/70"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Sensor bar floating centered */}
          <div className="absolute inset-0 z-20 flex items-center justify-center" style={{ top: '24px', bottom: '52px' }}>
            <div className="w-full max-w-md px-6">
              {children}
            </div>
          </div>

          {/* macOS Dock */}
          <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center" aria-hidden>
            <div
              className="flex items-end gap-2 rounded-2xl px-3 py-2"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px) saturate(140%)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {DOCK_APPS.map(({ src, alt }) => (
                <div key={alt} className="flex flex-col items-center gap-0.5">
                  <div className="h-9 w-9 overflow-hidden rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    <Image src={src} alt={alt} width={36} height={36} className="h-9 w-9 object-contain" />
                  </div>
                </div>
              ))}
              {/* Divider + trash */}
              <div className="mx-1 h-8 w-px self-center" style={{ background: 'rgba(255,255,255,0.15)' }}/>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl text-white/40" style={{ fontSize: '18px' }}>
                🗑
              </div>
            </div>
          </div>
        </div>
      </TheaterScrollProvider>
    </div>
  );
}
