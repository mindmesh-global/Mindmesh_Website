'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { X, Send } from 'lucide-react';
import { getTheaterStep } from '@/lib/marketing-theater-scroll';
import { TheaterScrollProvider } from './TheaterScrollContext';

type Props = { children: React.ReactNode; theaterId?: string };

const TASKBAR_APPS = [
  { src: '/images/icons/outlook.png',         alt: 'Outlook' },
  { src: '/images/icons/slack.png',           alt: 'Slack' },
  { src: '/images/icons/google-calendar.png', alt: 'Calendar' },
  { src: '/images/icons/jira.png',            alt: 'Jira' },
  { src: '/images/icons/gmail.png',           alt: 'Gmail' },
] as const;

function WindowsLogo() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="7" height="7" fill="white" opacity="0.9" />
      <rect x="9" y="0" width="7" height="7" fill="white" opacity="0.9" />
      <rect x="0" y="9" width="7" height="7" fill="white" opacity="0.9" />
      <rect x="9" y="9" width="7" height="7" fill="white" opacity="0.9" />
    </svg>
  );
}

export function MascotWindowsDesktopWrapper({ children, theaterId = 'mascotAttachment' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

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

  useEffect(() => {
    if (!inView) { setChatOpen(false); return; }
    const t = window.setTimeout(() => setChatOpen(true), 1600);
    return () => window.clearTimeout(t);
  }, [inView]);

  const state = useMemo(
    () => ({
      ref,
      progress: 0,
      step: getTheaterStep(theaterId as Parameters<typeof getTheaterStep>[0], 0),
      isInView: chatOpen,
      isPaused: !chatOpen,
    }),
    [chatOpen, theaterId]
  );

  return (
    <div ref={ref}>
      <TheaterScrollProvider value={state}>
        <div
          className="relative overflow-hidden rounded-xl select-none"
          style={{
            height: '580px',
            background: 'linear-gradient(135deg, #0b3a6e 0%, #0d1f4f 30%, #1a1060 60%, #0a2a5a 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 0 0.5px rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.55), 0 20px 56px rgba(0,0,0,0.65)',
          }}
        >
          {/* Windows 11 wallpaper glow */}
          <div className="pointer-events-none absolute inset-0" aria-hidden style={{
            backgroundImage: 'radial-gradient(ellipse 65% 55% at 35% 55%, rgba(0,120,215,0.2) 0%, transparent 60%), radial-gradient(ellipse 45% 40% at 75% 30%, rgba(100,60,200,0.14) 0%, transparent 55%)',
          }} />

          {/* Whiskers — fades out when chat opens */}
          <div
            className="absolute z-30"
            style={{
              bottom: '48px',
              right: '16px',
              opacity: chatOpen ? 0 : 1,
              transform: chatOpen ? 'scale(0.8)' : 'scale(1)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            <div style={{ width: '160px', height: '160px' }}>
              <Image
                src="/images/mascot-skins/whiskers-v2.png"
                alt="Whiskers"
                width={160}
                height={160}
                className="h-40 w-40 object-contain"
                style={{ animation: 'mascot-float 3s ease-in-out infinite' }}
              />
            </div>
          </div>

          {/* Full chatbot — two panels */}
          <div
            className="absolute z-20 flex overflow-hidden rounded-2xl shadow-2xl"
            style={{
              top: '10px', right: '10%', left: '10%', bottom: '56px',
              background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
              border: '2px solid rgba(209,213,219,0.8)',
              opacity: chatOpen ? 1 : 0,
              transform: chatOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(16px)',
              transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              transformOrigin: 'bottom center',
              pointerEvents: chatOpen ? 'auto' : 'none',
            }}
          >
            {/* LEFT SIDEBAR */}
            <div className="flex w-44 shrink-0 flex-col border-r py-3" style={{ background: '#f8fafc', borderColor: 'rgba(229,231,235,0.8)' }}>
              <div className="flex items-center justify-between px-3 pb-2">
                <div className="flex items-center gap-1.5">
                  <Image src="/images/Logo/mindmesh-logo-tight.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" aria-hidden />
                  <span className="text-xs font-semibold text-gray-700">MindMesh</span>
                </div>
                <span className="text-gray-400 text-[10px]">◀</span>
              </div>
              <div className="px-2 pb-2">
                <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-600 cursor-default">
                  <span className="text-blue-500 font-bold">+</span> New chat
                </div>
              </div>
              <div className="px-2 pb-3">
                <div className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1">
                  <span className="text-gray-400 text-[10px]">🔍</span>
                  <span className="text-[10px] text-gray-400">Search chats…</span>
                </div>
              </div>
              <div className="px-3 pb-1">
                <div className="flex items-center justify-between text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  <span>Projects</span><span>▾</span>
                </div>
                {['Acme Co', 'Halcyon', 'Marlowe & Co'].map((p) => (
                  <div key={p} className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11px] text-gray-600 cursor-default">
                    <span>📁</span>{p}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex-1 overflow-hidden px-3">
                <div className="flex items-center justify-between text-[10px] font-semibold text-gray-500 uppercase tracking-wide pb-1">
                  <span>Recent</span><span>▾</span>
                </div>
                {['What happened yesterday?', 'Emails from Dana', 'Q2 scope summary', 'Client overlap'].map((r) => (
                  <div key={r} className="truncate rounded-md px-1.5 py-1 text-[11px] text-gray-600 cursor-default">{r}</div>
                ))}
              </div>
              <div className="mt-auto border-t px-3 pt-2" style={{ borderColor: 'rgba(229,231,235,0.6)' }}>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full" style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)' }}>
                    <Image src="/images/mascot-skins/whiskers-v2.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" aria-hidden />
                  </div>
                  <span className="text-[11px] font-medium text-gray-700">Alex</span>
                </div>
              </div>
            </div>

            {/* RIGHT MAIN AREA */}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="pointer-events-none absolute right-0 top-0 h-16 rounded-tr-2xl" aria-hidden
                style={{ left: '176px', background: 'linear-gradient(135deg,rgba(59,130,246,0.04),rgba(147,51,234,0.04),rgba(236,72,153,0.04))' }} />
              <div className="relative flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3"
                style={{ borderColor: 'rgba(229,231,235,0.5)', background: 'linear-gradient(to right,#fff,rgba(239,246,255,0.3),rgba(245,243,255,0.3))' }}>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl">
                    <Image src="/images/Logo/mindmesh-logo-tight.png" alt="MindMesh" width={32} height={32} className="h-8 w-8 object-contain p-0.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ background: 'linear-gradient(to right,#2563eb,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      MindMesh Assistant
                    </h3>
                    <p className="text-[10px] text-gray-500">Ask questions, get insights</p>
                  </div>
                </div>
                <button type="button" aria-hidden tabIndex={-1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border text-gray-400"
                  style={{ borderColor: 'rgba(229,231,235,0.8)', background: 'rgba(249,250,251,0.8)' }}>
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3" data-light-window="">{children}</div>
              <div className="shrink-0 border-t px-3 py-2.5" style={{ borderColor: 'rgba(229,231,235,0.5)' }}>
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2" style={{ borderColor: 'rgba(209,213,219,0.8)', background: '#f9fafb' }}>
                  <span className="flex-1 text-xs text-gray-400">Ask MindMesh...</span>
                  <button type="button" aria-hidden tabIndex={-1}
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-white"
                    style={{ background: 'linear-gradient(to right,#2563eb,#7c3aed)' }}>
                    <Send className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Windows 11 Taskbar */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 flex h-12 items-center justify-between px-3"
            style={{ background: 'rgba(20,20,30,0.88)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
            aria-hidden
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <WindowsLogo />
            </div>
            <div className="flex items-center gap-1">
              {TASKBAR_APPS.map(({ src, alt }) => (
                <div key={alt} className="flex h-9 w-9 items-center justify-center rounded-md"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <Image src={src} alt={alt} width={22} height={22} className="h-5 w-5 object-contain" />
                </div>
              ))}
            </div>
            <div className="text-right">
              <div className="text-[11px] font-medium text-white/80">10:42 AM</div>
              <div className="text-[9px] text-white/50">10/15/2026</div>
            </div>
          </div>
        </div>
      </TheaterScrollProvider>
    </div>
  );
}
