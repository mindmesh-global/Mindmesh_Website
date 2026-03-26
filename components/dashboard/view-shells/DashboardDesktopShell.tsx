'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Brain,
  ChevronDown,
  EyeOff,
  LayoutDashboard,
  LayoutTemplate,
  Lock,
  Monitor,
  Share2,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useDashboardViewMode } from '@/context/DashboardViewModeContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida/ADBb0ui-jxbNRruNiF4w1SifRFnv9mUZR9Tcs2TGq9-U3Er4cw5eqoQv9g0qujPNGhLB75HPeY8sy7AuaLl3-LFiWFF8qvX9y4dqoFIzDsq_LhvAa9u9b2TeakTtAmy2hQt9WZPhWUVh92BI4AD8toreGFONkc0GDPLzCdak3Y2q4qROfnHRVxf74BaYDXWm7lleYwzOHs7lL1GxZZo7cvad1K_cgu0QJP64a3-VXygFUdm83UQBozT1PBYvKd5Vv0SsJmhNXhjhPtDhbQ';

const SECTION1_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA0-zdlZHnLgYehLUos6Ii4HTGgD-nDlHnMej-km80sImNiYpKBnkWCcgbUGdbS02vA7_pk02e6xi0xHlZ1uqKbSse3CqfDQpQT7PPdexunu7Njd4tEaa7fjFf_SVx_23lcYEWjn2U1wwUpNJjafgokOm_S6333D7IO6wyaSXy4OETyNEB_EH6GpnUlxm_PKzJtUQ7AsUICGN60CqmjsDdJIVDKuxFEFvpT8s3x7HAWM8rPJEywBb_XyORp-RuryRJM4ntmEwcU39o';

const SECTION5_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCsoR8ru2cKC1w2gLrjbQvuQihA2VfyuZVUJZPbPQBZQiyhbHeisvRqizbQcYFvsvP-mbHqloOvbWrosB9QjDx6_8gSblShx8M9ttIm8SKz4Q1NTEVx_Fud3mnsfHID4Kfv356NBCPHk3EETkPCW6muoZD7GolOWNfS_Ob-YPBdoPB1Nok8nj5v_bzFjCuCjq8yRZQSV3vM6C2kkvJu9Wc3FPIT82vAIKXoZfMiYGhcaIPT-f9SVNY3gouRo7cd08R3B0fYSgXca54';

const VIBGYOR = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

/** Display headings: white + Georgia (reference design). */
const displaySerif: React.CSSProperties = { fontFamily: 'Georgia, serif' };
/** Body / supporting copy (~#a1a1aa). */
const bodyMuted = 'text-zinc-400';
const bodyMutedSm = 'text-zinc-500';
/** Center nav: inactive = muted slate + medium; Product uses blue + semibold (same text-sm). */
const navLink =
  'text-sm font-medium tracking-normal text-slate-400 antialiased transition-colors duration-200 hover:text-slate-200';
/**
 * Glossy royal-blue CTA: vertical gradient + top inner highlight + blue outer glow.
 */
const glossyBlue =
  'bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 text-white shadow-[0_8px_32px_-4px_rgba(37,99,235,0.55),0_4px_16px_-4px_rgba(29,78,216,0.4),inset_0_1px_0_rgba(255,255,255,0.22)] transition-[transform,box-shadow,filter] duration-200 hover:brightness-105 hover:shadow-[0_12px_40px_-4px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.28)] active:scale-[0.98]';
const primaryBtn = `rounded-lg ${glossyBlue} px-8 py-3.5 text-sm font-bold`;
const primaryBtnLg = `rounded-lg ${glossyBlue} px-8 py-4 text-base font-bold`;
/** Compact glossy pill for navbar actions. */
const glossyNavBtn = `rounded-lg ${glossyBlue} px-4 py-2.5 text-sm font-bold sm:px-5`;
/** Secondary pill: thin blue edge, no white ring (reference UI). */
const outlineGhostBtn =
  'rounded-full border border-blue-500/40 bg-zinc-950/30 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-blue-400/55 hover:bg-blue-500/10 active:scale-[0.98]';
const outlineGhostBtnLg =
  'rounded-full border border-blue-500/40 bg-zinc-950/30 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:border-blue-400/55 hover:bg-blue-500/10 active:scale-[0.98]';

function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-lg ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600" />
      <span className="relative flex h-full w-full items-center justify-center text-sm font-black text-white">M</span>
    </div>
  );
}

type HexCell = {
  centerX: number;
  centerY: number;
  brightness: number;
  offsetY: number;
  hueIndex: number;
};

function HoneycombCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const hexesRef = useRef<HexCell[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, cols: 0, rows: 0, hexW: 46, hexH: 0 });

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const hexWidth = 46;
    const hexHeight = Math.sqrt(3) * (hexWidth / 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const columns = Math.ceil(w / (hexWidth * 0.75)) + 1;
    const rows = Math.ceil(h / hexHeight) + 1;
    const hexes: HexCell[] = [];
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * (hexWidth * 0.75);
        const y = j * hexHeight + (i % 2 === 0 ? 0 : hexHeight / 2);
        hexes.push({
          centerX: x,
          centerY: y,
          brightness: 0,
          offsetY: 0,
          hueIndex: (i + j) % VIBGYOR.length,
        });
      }
    }
    hexesRef.current = hexes;
    sizeRef.current = { w, h, cols: columns, rows, hexW: hexWidth, hexH: hexHeight };
  }, []);

  useEffect(() => {
    init();

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return () => {};

    const drawHex = (
      x: number,
      y: number,
      size: number,
      brightness: number,
      offset: number,
      hueIndex: number
    ) => {
      const baseOpacity = 0.04;
      const pulseOpacity = brightness * 0.8;
      if (brightness > 0.05) {
        ctx.strokeStyle = VIBGYOR[hueIndex];
        ctx.shadowBlur = brightness * 15;
        ctx.shadowColor = VIBGYOR[hueIndex];
        ctx.globalAlpha = baseOpacity + pulseOpacity;
      } else {
        ctx.strokeStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.globalAlpha = baseOpacity;
      }
      ctx.lineWidth = 1 + brightness * 1.5;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = x + size * Math.cos(angle);
        const py = y + offset + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      if (brightness > 0.01) {
        ctx.fillStyle = VIBGYOR[hueIndex];
        ctx.globalAlpha = brightness * 0.08;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      timeRef.current += 0.01;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const time = timeRef.current;
      const hexWidth = sizeRef.current.hexW;
      const hexes = hexesRef.current;
      const maxDist = 300;

      hexes.forEach((hex) => {
        const dx = mouse.x - hex.centerX;
        const dy = mouse.y - hex.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const targetBrightness = Math.pow(1 - dist / maxDist, 2);
          hex.brightness += (targetBrightness - hex.brightness) * 0.15;
          const wave = Math.sin(dist / 40 - time * 4) * 8;
          hex.offsetY += (wave * (1 - dist / maxDist) - hex.offsetY) * 0.1;
          if (Math.random() > 0.98) hex.hueIndex = (hex.hueIndex + 1) % VIBGYOR.length;
        } else {
          hex.brightness *= 0.92;
          hex.offsetY *= 0.92;
        }
        drawHex(hex.centerX, hex.centerY, hexWidth / 2, hex.brightness, hex.offsetY, hex.hueIndex);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}

const glassPanel = 'rounded-2xl backdrop-blur-xl shadow-2xl shadow-black/50';

const glassPanelStyle: React.CSSProperties = {
  background: 'rgba(0, 0, 0, 0.5)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65)',
};

const PRODUCT_LINKS: { title: string; desc: string; href: string }[][] = [
  [
    { title: 'Overview', desc: 'The big picture of your workspace', href: '/features' },
    { title: 'Dashboard', desc: 'Your daily mission control center', href: '/dashboard' },
    { title: 'Inbox', desc: 'Unified communication across apps', href: '#' },
    { title: 'Connected Apps', desc: 'Seamless third-party integrations', href: '/app-directory' },
  ],
  [
    { title: 'Sensor', desc: 'Instant system-wide command bar', href: '#' },
    { title: 'Mascot', desc: 'Proactive human-like AI assistant', href: '#' },
    { title: "Yesterday's Narrative", desc: 'Daily summary of past achievements', href: '#' },
  ],
];

const PRODUCT_MENU_PANEL_ID = 'mindmesh-product-mega-menu-panel';

function ProductMegaMenu() {
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuBox, setMenuBox] = useState({ top: 0, left: 0, width: 600 });

  useEffect(() => setPortalReady(true), []);

  const updateMenuPosition = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const maxW = Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 32 : 600);
    let left = r.left;
    if (left + maxW > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - 16 - maxW);
    }
    if (left < 16) left = 16;
    setMenuBox({ top: r.bottom + 12, left, width: maxW });
  }, []);

  useEffect(() => {
    if (!open) return;
    updateMenuPosition();
    const onWin = () => updateMenuPosition();
    window.addEventListener('resize', onWin);
    window.addEventListener('scroll', onWin, true);
    return () => {
      window.removeEventListener('resize', onWin);
      window.removeEventListener('scroll', onWin, true);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t)) return;
      if (document.getElementById(PRODUCT_MENU_PANEL_ID)?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const panel =
    open && portalReady ? (
      <div
        id={PRODUCT_MENU_PANEL_ID}
        role="menu"
        className="fixed z-[220000] rounded-2xl p-5 backdrop-blur-xl sm:p-6"
        style={{
          top: menuBox.top,
          left: menuBox.left,
          width: menuBox.width,
          maxHeight: 'min(70vh, 520px)',
          overflowY: 'auto',
          background: 'rgba(6, 8, 16, 0.88)',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.75)',
        }}
      >
        <div
          className={`grid gap-5 sm:gap-6 ${menuBox.width >= 520 ? 'grid-cols-2' : 'grid-cols-1'}`}
        >
          {PRODUCT_LINKS.map((col, ci) => (
            <div key={ci} className="flex min-w-0 flex-col gap-1">
              {col.map(({ title, desc, href }) => (
                <Link
                  key={title}
                  href={href}
                  role="menuitem"
                  className="group block min-w-0 rounded-xl p-3 transition-colors hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  <div className="font-semibold text-white transition-colors group-hover:text-blue-300">
                    {title}
                  </div>
                  <div
                    className={`mt-0.5 text-xs leading-snug ${bodyMuted}`}
                    style={{ color: '#a1a1aa' }}
                  >
                    {desc}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div ref={wrapRef} className="relative shrink-0 py-2">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => {
            const next = !v;
            if (next) {
              queueMicrotask(() => updateMenuPosition());
            }
            return next;
          });
        }}
        className="group flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-400 outline-none transition-colors hover:text-slate-200 dark:text-blue-300"
      >
        Product
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {typeof document !== 'undefined' && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}

function DashboardDesktopShell() {
  const { toggleViewMode } = useDashboardViewMode();
  const rootRef = useRef<HTMLDivElement>(null);
  const marketingScrollRootRef = useRef<Element | null>(null);
  const [, setScrollRootReady] = useState(0);

  const inViewOpts = useMemo(
    () =>
      ({
        once: true,
        amount: 0.2,
        margin: '0px 0px -12% 0px',
        root: marketingScrollRootRef,
      }) as const,
    []
  );

  useEffect(() => {
    marketingScrollRootRef.current = document.getElementById('mindmesh-marketing-scroll');
    setScrollRootReady((n) => n + 1);
  }, []);

  useEffect(() => {
    const start = rootRef.current;
    if (!start) return;
    let el: HTMLElement | null = start.parentElement;
    while (el && el !== document.body) {
      const style = getComputedStyle(el);
      const oy = style.overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) {
        el.scrollTop = 0;
        break;
      }
      el = el.parentElement;
    }
  }, []);

  const heroStagger = [0, 0.1, 0.2, 0.3, 0.4, 0.5] as const;

  return (
    <div
      ref={rootRef}
      className={`${inter.className} relative z-10 min-h-full overflow-x-hidden antialiased selection:bg-blue-500/25`}
      style={{ backgroundColor: '#0a0a14', color: '#a1a1aa' }}
      aria-label="MindMesh marketing"
    >
      <HoneycombCanvas />

      <nav
        className="fixed top-0 z-50 w-full border-b-0 bg-[#0a0a14]/90 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(10, 10, 20, 0.88)' }}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-4 tracking-tight sm:px-8">
          <Link href="/" className="flex min-w-0 shrink items-center gap-2.5">
            <LogoMark />
            <span className="text-lg font-bold tracking-tight text-white sm:text-xl">MindMesh</span>
          </Link>
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-8 md:flex">
            <ProductMegaMenu />
            <Link href="/app-directory" className={navLink}>
              Integrations
            </Link>
            <Link href="/privacy" className={navLink}>
              Security
            </Link>
            <Link href="/docs" className={navLink}>
              FAQ
            </Link>
          </div>
          <div className="flex shrink-0 items-center justify-end">
            <button
              type="button"
              onClick={() => toggleViewMode()}
              className={`inline-flex items-center gap-2 ${glossyNavBtn}`}
              aria-label="Switch to scrollable dashboard view"
            >
              <LayoutTemplate className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
              <span className="hidden sm:inline">Scroll view</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-[1]">
        <section className="relative overflow-hidden pb-32 pt-36 md:pt-44">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(circle at top center, rgba(14, 105, 220, 0.15) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center px-6 text-center sm:px-12">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: heroStagger[1], ease: 'easeOut' }}
              className="mb-8 max-w-4xl font-sans text-5xl font-bold leading-[1.1] tracking-tight text-blue-100 md:text-7xl"
            >
              Your private AI{' '}
              <span className="bg-gradient-to-r from-blue-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                command center
              </span>{' '}
              for work.
            </motion.h1>
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: heroStagger[2], ease: 'easeOut' }}
              className={`text-blue-100 mb-10 max-w-3xl text-lg leading-relaxed sm:text-xl ${bodyMuted}`}
            >
              MindMesh brings your inbox, calendar, daily summary, and connected apps into one futuristic
              desktop workspace, so you can stay caught up without staying online all day.
            </motion.p>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: heroStagger[3], ease: 'easeOut' }}
              className="mb-20 flex flex-col gap-4 sm:flex-row"
            >
              <button type="button" className={primaryBtnLg}>
                Get Early Access
              </button>
              <button type="button" className={`${outlineGhostBtn} px-8 py-4`}>
                See How It Works
              </button>
            </motion.div>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: heroStagger[4], ease: 'easeOut' }}
              className="group relative w-full max-w-5xl"
            >
              <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/20 opacity-30 blur-[120px] transition-opacity duration-700 group-hover:opacity-50" />
              <div className="rounded-2xl bg-gradient-to-b from-blue-600/20 to-transparent p-1">
                <Image
                  src={HERO_IMG}
                  alt="MindMesh Dashboard interface showing Today's Overview, Inferred Facts, and Todos"
                  width={1280}
                  height={720}
                  className="w-full rounded-xl object-contain shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-black/50 bg-black/25 py-16">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { Icon: Lock, label: 'Local-first by design' },
                { Icon: Monitor, label: 'Desktop-native experience' },
                { Icon: EyeOff, label: 'Read-only Google access' },
                { Icon: Brain, label: 'Privacy-conscious AI workflow' },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-3 md:justify-start"
                >
                  <Icon className="h-5 w-5 shrink-0 text-blue-400" aria-hidden />
                  <span className={`text-sm font-medium uppercase tracking-wide ${bodyMuted}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-24 px-6 md:grid-cols-2 sm:px-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative order-2 md:order-1"
            >
              <div
                className={`${glassPanel} aspect-[4/3] overflow-hidden`}
                style={glassPanelStyle}
              >
                <Image
                  src={SECTION1_IMG}
                  alt="One unified workspace preview"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover opacity-80"
                />
              </div>
              <div
                className={`absolute -right-6 -top-6 rounded-xl p-4 ${glassPanel}`}
                style={glassPanelStyle}
              >
                <Share2 className="h-6 w-6 text-blue-400" aria-hidden />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="order-1 md:order-2"
            >
              <h2
                style={displaySerif}
                className="mb-8 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl"
              >
                One place for the work that keeps pulling you in.
              </h2>
              <p className={`mb-10 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
                Stop bouncing between email, calendar, tabs, and scattered notes. MindMesh gives you a
                single desktop workspace to see what matters, ask questions in plain English, and move
                through your day with more clarity.
              </p>
              <button
                type="button"
                className="group inline-flex items-center gap-2 text-base font-semibold text-blue-400 transition-colors hover:text-blue-300"
              >
                Explore the product
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </section>

        <section className="bg-black/20 py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-24 px-6 md:grid-cols-2 sm:px-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h2
                style={displaySerif}
                className="mb-8 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl"
              >
                Catch up faster. Think less. Miss less.
              </h2>
              <p className={`mb-10 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
                Open MindMesh and instantly see your Dashboard, consolidated inbox, upcoming meetings,
                Yesterday&apos;s Narrative, and Connected Apps. It is designed to reduce cognitive load so
                you can get oriented in minutes instead of spending your morning triaging tools.
              </p>
              <button
                type="button"
                className={`group inline-flex items-center gap-2 ${primaryBtn}`}
              >
                View Core Features <span aria-hidden>⚡</span>
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className={`${glassPanel} flex flex-col gap-4 p-6`} style={glassPanelStyle}>
                  <Sparkles className="h-8 w-8 text-blue-400" />
                  <h4 className="font-semibold text-white">Yesterday&apos;s Narrative</h4>
                  <div className="h-12 w-full animate-pulse rounded-lg bg-blue-950/50" />
                </div>
                <div
                  className={`${glassPanel} mt-8 flex flex-col gap-4 p-6`}
                  style={glassPanelStyle}
                >
                  <LayoutDashboard className="h-8 w-8 text-indigo-400" />
                  <h4 className="font-semibold text-white">Dashboard</h4>
                  <div className="h-12 w-full rounded-lg bg-blue-950/50" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-24 px-6 md:grid-cols-2 sm:px-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex justify-center"
            >
              <div className="absolute h-80 w-80 animate-pulse rounded-full bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-transparent blur-3xl" />
              <div className="relative z-10 text-center">
                <Bot
                  className="mx-auto h-40 w-40 text-blue-400/50 drop-shadow-[0_0_30px_rgba(96,165,250,0.35)] md:h-[160px] md:w-[160px]"
                  strokeWidth={1}
                  aria-hidden
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h2
                style={displaySerif}
                className="mb-8 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl"
              >
                Built for focus, not noise.
              </h2>
              <p className={`mb-10 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
                Sensor gives you instant command-bar access. Mascot gives you a more human, proactive
                assistant experience. Together, they make MindMesh feel less like software you manage and
                more like a calm layer that helps you stay on top of work.
              </p>
              <button type="button" className={`group inline-flex items-center gap-2 ${outlineGhostBtn} px-8 py-3`}>
                How it works and features <span aria-hidden>⚡</span>
              </button>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden py-32">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle at center, rgba(129,140,248,0.05) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={`${glassPanel} relative overflow-hidden rounded-[2rem] p-12 md:p-20`}
              style={glassPanelStyle}
            >
              <div className="relative z-10 max-w-2xl">
                <div className={`mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${bodyMuted}`}>
                  <span aria-hidden>🛡️</span>
                  <span className="text-blue-400">Privacy by design</span>
                </div>
                <h2
                  style={displaySerif}
                  className="mb-8 text-4xl font-black text-white md:text-5xl"
                >
                  Privacy is not a footer link. It is the product philosophy.
                </h2>
                <p className={`mb-10 text-lg leading-relaxed ${bodyMuted}`}>
                  MindMesh is built around a local-first architecture designed for privacy. Supported Gmail
                  and Google Calendar connections use read-only access, and key security paths use modern
                  protections including AES-256-GCM for sensitive token handling and some encrypted local
                  storage.
                </p>
                <Link href="/privacy" className={`inline-block ${primaryBtn}`}>
                  Our Privacy and Security
                </Link>
              </div>
              <div className="pointer-events-none absolute -bottom-20 -right-20 hidden opacity-5 lg:block">
                <Lock className="h-[400px] w-[400px]" strokeWidth={0.5} aria-hidden />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-black/20 py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-24 px-6 md:grid-cols-2 sm:px-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative order-2 md:order-1"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={SECTION5_IMG}
                  alt="Person enjoying a quiet, focused workspace"
                  fill
                  className="object-cover grayscale opacity-50"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, #0a0a14, transparent)' }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="order-1 md:order-2"
            >
              <h2
                style={displaySerif}
                className="mb-8 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl"
              >
                Work with more control. End the day with less mental residue.
              </h2>
              <p className={`mb-10 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
                MindMesh helps you spend less time checking, searching, and re-checking. That means fewer
                missed follow-ups, faster morning catch-up, and a cleaner mental shutdown when work is
                done.
              </p>
              <button
                type="button"
                className={`rounded-lg ${glossyBlue} px-10 py-4 text-base font-bold`}
              >
                Start with MindMesh
              </button>
            </motion.div>
          </div>
        </section>

        <section className="bg-gradient-to-t from-blue-950/20 to-transparent py-40">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center text-center"
            >
              <h2
                style={displaySerif}
                className="mb-8 max-w-4xl text-5xl font-black tracking-tight text-white md:text-6xl"
              >
                The desktop AI assistant built for people who value clarity and privacy.
              </h2>
              <p className={`mb-12 max-w-2xl text-lg sm:text-xl ${bodyMuted}`}>
                Bring your workday into focus without giving up control of your data.
              </p>
              <div className="flex flex-col gap-6 sm:flex-row">
                <button
                  type="button"
                  className={`rounded-lg ${glossyBlue} px-10 py-5 text-lg font-bold`}
                >
                  Get Early Access
                </button>
                <button type="button" className={outlineGhostBtnLg}>
                  View Pricing &amp; Core Features
                </button>
              </div>
              <p className={`mt-16 flex items-center gap-2 text-sm ${bodyMutedSm}`}>
                <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden />
                Available for macOS, Windows, and Linux.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer
        className="mt-auto w-full border-t border-black/50 bg-[#0a0a14]/95 py-10 pt-20 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(10, 10, 20, 0.92)' }}
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 text-sm leading-relaxed sm:px-12 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <LogoMark className="h-7 w-7" />
              <span className="text-lg font-bold text-white">MindMesh</span>
            </div>
            <p className={`mb-8 max-w-xs ${bodyMuted}`}>
              Elevating productivity through architectural privacy and ambient intelligence.
            </p>
            <p className={bodyMutedSm}>© {new Date().getFullYear()} MindMesh. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">Product</h5>
            <Link href="/features" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              Features
            </Link>
            <Link href="/waitlist" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              Waitlist
            </Link>
            <Link href="/privacy" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              Security
            </Link>
            <Link href="#" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              Status
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">Company</h5>
            <Link href="/about" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              About
            </Link>
            <Link href="/blog" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              Blog
            </Link>
            <Link href="/contact" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">Social</h5>
            <a href="https://twitter.com" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              X / Twitter
            </a>
            <a href="https://linkedin.com" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              LinkedIn
            </a>
            <a href="https://github.com" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              GitHub
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">Legal</h5>
            <Link href="/privacy" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              Privacy
            </Link>
            <Link href="/terms" className={`${bodyMutedSm} transition-colors hover:text-white`}>
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardDesktopShell;
export { DashboardDesktopShell };
