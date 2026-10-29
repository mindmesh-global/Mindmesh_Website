'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, Send } from 'lucide-react';
import dynamic from 'next/dynamic';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { MASCOT_PAGE_CONTENT, MASCOT_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';

const MascotChatDemo = dynamic(
  () =>
    import('@/components/marketing/theater/demos/MascotChatDemo').then((mod) => ({
      default: mod.MascotChatDemo,
    })),
  { ssr: false }
);

const DOCK_APPS = [
  { src: '/images/icons/gmail.png',           alt: 'Gmail' },
  { src: '/images/icons/slack.png',           alt: 'Slack' },
  { src: '/images/icons/google-calendar.png', alt: 'Calendar' },
  { src: '/images/icons/jira.png',            alt: 'Jira' },
  { src: '/images/icons/outlook.png',         alt: 'Outlook' },
] as const;

function MacDesktop({ children }: { children: (isPaused: boolean) => React.ReactNode }) {
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
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, []);

  useEffect(() => {
    if (!inView) { setChatOpen(false); return; }
    const t = window.setTimeout(() => setChatOpen(true), 1600);
    return () => window.clearTimeout(t);
  }, [inView]);

  return (
    <div ref={ref}>
      <div className="relative overflow-hidden rounded-xl select-none"
        style={{ height: '580px', background: 'linear-gradient(145deg,#1e1b38 0%,#0d1125 40%,#1a1028 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 0 0.5px rgba(255,255,255,0.04),0 4px 16px rgba(0,0,0,0.55),0 20px 56px rgba(0,0,0,0.65)' }}>
        {/* Wallpaper glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden style={{ backgroundImage: 'radial-gradient(ellipse 70% 55% at 65% 55%,rgba(90,60,180,0.18) 0%,transparent 60%),radial-gradient(ellipse 50% 45% at 25% 35%,rgba(40,80,180,0.12) 0%,transparent 55%)' }} />
        {/* Desktop folder icons — top left */}
        <div className="pointer-events-none absolute left-3 top-10 z-10 grid grid-cols-2 gap-x-2 gap-y-4 select-none" aria-hidden>
          {[{l:'Acme Co',t:'folder'},{l:'Halcyon',t:'folder'},{l:'Brief.pdf',t:'file'},{l:'Q2 Review',t:'folder'},{l:'Contracts',t:'folder'},{l:'Notes',t:'file'}].map(({l,t})=>(
            <div key={l} className="flex flex-col items-center gap-1">
              {t==='folder'?(
                <svg viewBox="0 0 40 32" width="38" height="30"><path d="M2 8 Q2 4 6 4 L14 4 Q16 4 17 6 L18 8 L36 8 Q38 8 38 10 L38 28 Q38 30 36 30 L4 30 Q2 30 2 28 Z" fill="#5B8ADE" opacity="0.85"/><path d="M2 10 L38 10 L38 28 Q38 30 36 30 L4 30 Q2 30 2 28 Z" fill="#6B9DEF" opacity="0.9"/></svg>
              ):(
                <svg viewBox="0 0 30 38" width="26" height="32"><path d="M3 1 L20 1 L28 9 L28 36 Q28 38 26 38 L4 38 Q2 38 2 36 L2 3 Q2 1 3 1 Z" fill="rgba(240,244,255,0.85)"/><path d="M20 1 L20 9 L28 9 Z" fill="rgba(180,200,240,0.8)"/><rect x="7" y="15" width="14" height="1.5" rx="0.75" fill="rgba(100,140,220,0.5)"/><rect x="7" y="19" width="10" height="1.5" rx="0.75" fill="rgba(100,140,220,0.35)"/></svg>
              )}
              <span className="max-w-[52px] truncate text-center text-[9px] font-medium text-white/70" style={{textShadow:'0 1px 3px rgba(0,0,0,0.8)'}}>{l}</span>
            </div>
          ))}
        </div>
        {/* Menu bar */}
        <div className="relative z-10 flex h-6 items-center justify-between px-3" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
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
        {/* Whiskers */}
        <div className="absolute z-30" style={{ bottom: '52px', right: '16px', opacity: chatOpen ? 0 : 1, transform: chatOpen ? 'scale(0.8)' : 'scale(1)', transition: 'opacity 0.3s ease,transform 0.3s ease' }}>
          <Image src="/images/mascot-skins/whiskers-v2.png" alt="Whiskers" width={160} height={160} className="h-40 w-40 object-contain" style={{ animation: 'mascot-float 3s ease-in-out infinite' }} />
        </div>
        {/* Chat window */}
        <div className="absolute z-20 flex overflow-hidden rounded-2xl shadow-2xl" style={{ top: '34px', right: '10%', left: '10%', bottom: '60px', background: 'linear-gradient(to bottom,#ffffff,#f9fafb)', border: '2px solid rgba(209,213,219,0.8)', opacity: chatOpen ? 1 : 0, transform: chatOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(16px)', transition: 'opacity 0.4s ease,transform 0.4s cubic-bezier(0.16,1,0.3,1)', transformOrigin: 'bottom center', pointerEvents: chatOpen ? 'auto' : 'none' }}>
          {/* Sidebar */}
          <div className="flex w-44 shrink-0 flex-col border-r py-3" style={{ background: '#f8fafc', borderColor: 'rgba(229,231,235,0.8)' }}>
            <div className="flex items-center justify-between px-3 pb-2">
              <div className="flex items-center gap-1.5"><Image src="/images/Logo/mindmesh-logo-tight.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" /><span className="text-xs font-semibold text-gray-700">MindMesh</span></div>
              <span className="text-gray-400 text-[10px]">◀</span>
            </div>
            <div className="px-2 pb-2"><div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-600"><span className="text-blue-500 font-bold">+</span> New chat</div></div>
            <div className="px-2 pb-3"><div className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1"><span className="text-gray-400 text-[10px]">🔍</span><span className="text-[10px] text-gray-400">Search chats…</span></div></div>
            <div className="px-3 pb-1">
              <div className="flex items-center justify-between text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1"><span>Projects</span><span>▾</span></div>
              {['Acme Co','Halcyon','Marlowe & Co'].map((p) => (<div key={p} className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11px] text-gray-600"><span>📁</span>{p}</div>))}
            </div>
            <div className="mt-2 flex-1 overflow-hidden px-3">
              <div className="flex items-center justify-between text-[10px] font-semibold text-gray-500 uppercase tracking-wide pb-1"><span>Recent</span><span>▾</span></div>
              {['What happened yesterday?','Emails from Dana','Q2 scope summary','Client overlap'].map((r) => (<div key={r} className="truncate rounded-md px-1.5 py-1 text-[11px] text-gray-600">{r}</div>))}
            </div>
            <div className="mt-auto border-t px-3 pt-2" style={{ borderColor: 'rgba(229,231,235,0.6)' }}>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full" style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)' }}><Image src="/images/mascot-skins/whiskers-v2.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" /></div>
                <span className="text-[11px] font-medium text-gray-700">Alex</span>
              </div>
            </div>
          </div>
          {/* Main chat */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="relative flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3" style={{ borderColor: 'rgba(229,231,235,0.5)', background: 'linear-gradient(to right,#fff,rgba(239,246,255,0.3),rgba(245,243,255,0.3))' }}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl"><Image src="/images/Logo/mindmesh-logo-tight.png" alt="MindMesh" width={32} height={32} className="h-8 w-8 object-contain p-0.5" /></div>
                <div><h3 className="text-sm font-bold" style={{ background: 'linear-gradient(to right,#2563eb,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MindMesh Assistant</h3><p className="text-[10px] text-gray-500">Ask questions, get insights</p></div>
              </div>
              <button type="button" aria-hidden tabIndex={-1} className="flex h-7 w-7 items-center justify-center rounded-lg border text-gray-400" style={{ borderColor: 'rgba(229,231,235,0.8)', background: 'rgba(249,250,251,0.8)' }}><X className="h-3.5 w-3.5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {children(!chatOpen)}
            </div>
            <div className="shrink-0 border-t px-3 py-2.5" style={{ borderColor: 'rgba(229,231,235,0.5)' }}>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2" style={{ borderColor: 'rgba(209,213,219,0.8)', background: '#f9fafb' }}>
                <span className="flex-1 text-xs text-gray-400">Ask MindMesh...</span>
                <button type="button" aria-hidden tabIndex={-1} className="flex h-6 w-6 items-center justify-center rounded-lg text-white" style={{ background: 'linear-gradient(to right,#2563eb,#7c3aed)' }}><Send className="h-3 w-3" /></button>
              </div>
            </div>
          </div>
        </div>
        {/* Dock */}
        <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center" aria-hidden>
          <div className="flex items-end gap-2 rounded-2xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px) saturate(140%)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 2px 16px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.1)' }}>
            {DOCK_APPS.map(({ src, alt }) => (<div key={alt} className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}><Image src={src} alt={alt} width={36} height={36} className="h-9 w-9 object-contain rounded-xl" /></div>))}
            <div className="mx-1 h-8 w-px self-center" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <div className="flex h-9 w-9 items-center justify-center rounded-xl text-white/40" style={{ fontSize: '18px' }}>🗑</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductTheaterMascot() {
  const { theater } = MASCOT_PAGE_CONTENT;
  return (
    <MarketingSection id="mascot-theater" title={theater.title} subtitle={theater.subtitle} className="relative isolate" compactTop>
      <MacDesktop>
        {(isPaused) => <MascotChatDemo isPaused={isPaused} />}
      </MacDesktop>
      <div className="mm-content mt-6">
        <p className="text-sm text-mm-on-surface-variant">{MASCOT_THEATER_FIXTURES.caption}</p>
      </div>
    </MarketingSection>
  );
}
