'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/components/layout/SiteFooter';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  ChevronDown,
  EyeOff,
  KeyRound,
  Lock,
  Monitor,
  ScrollText,
  Share2,
  Mail,
  ShieldCheck,
  Trash2,

} from 'lucide-react';
import { useDashboardViewMode } from '@/context/DashboardViewModeContext';
import WaitlistModal from '@/components/WaitlistModal';
import heroInboxMockup from '@/public/images/hero-inbox-mockup.jpg';
import upcomingEventsMockup from '@/public/images/upcoming-events-mockup.png';
import yesterdaysNarrativeMockup from '@/public/images/yesterdays-narrative-mockup.png';
import connectedAppsMockup from '@/public/images/connected-apps-mockup.png';
import mindmeshGemMark from '@/public/images/Logo/mindmesh-gem-mark.png';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const HERO_IMG = '/images/hero-dashboard-user.png';

const SHERPA_LOTTIE_URL =
  'https://lottie.host/225c420c-2766-4492-95e6-c5919c4b22ce/uUodXUtl4V.lottie';
const ROBO_LOTTIE_URL =
  'https://lottie.host/e0609cab-9f43-45bc-bb6a-7aca120370fd/53VP4mY0uR.lottie';
const BOY_LOTTIE_URL =
  'https://lottie.host/b1b961aa-0e9f-44da-ba76-8a6dd58fbc09/v6hQv7mXIq.lottie';
const GIRL_LOTTIE_URL =
  'https://lottie.host/a5b4e126-7cc7-4aac-9bdb-a3893082c5f3/W49fhgkrwT.lottie';
const LUNA_LOTTIE_URL =
  'https://lottie.host/018e4d06-8815-437d-bed0-5634ed59315c/HcMtWTaAMW.lottie';
const MINI_LOTTIE_URL =
  'https://lottie.host/972ee003-96b6-424d-aa08-1e0a0ebbc5a5/cuk1txLhrr.lottie';
const WHISKERS_LOTTIE_URL =
  'https://lottie.host/7ac5c67a-7983-42a0-b290-2e0429865911/uvdYl2wxbT.lottie';

type CharacterSlide = {
  id: string;
  name: string;
  src: string;
  glow: string;
  speed?: number;
};

const CHARACTER_SLIDES: CharacterSlide[] = [
  { id: '1', name: 'Sherpa', src: SHERPA_LOTTIE_URL, glow: 'rgba(96,165,250,0.32)', speed: 1 },
  { id: '2', name: 'Robo', src: ROBO_LOTTIE_URL, glow: 'rgba(59,130,246,0.28)', speed: 1 },
  { id: '3', name: 'Boy', src: BOY_LOTTIE_URL, glow: 'rgba(129,140,248,0.28)', speed: 1 },
  { id: '5', name: 'Girl', src: GIRL_LOTTIE_URL, glow: 'rgba(168,85,247,0.26)', speed: 1 },
  { id: '6', name: 'Luna', src: LUNA_LOTTIE_URL, glow: 'rgba(56,189,248,0.28)', speed: 1 },
  { id: '7', name: 'Mini', src: MINI_LOTTIE_URL, glow: 'rgba(99,102,241,0.26)', speed: 1 },
  { id: 'cat', name: 'Whiskers', src: WHISKERS_LOTTIE_URL, glow: 'rgba(244,114,182,0.24)', speed: 1 },
];

const VIBGYOR = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

/** Body / supporting copy (~#a1a1aa). */
const bodyMuted = 'text-zinc-400';
const bodyMutedSm = 'text-zinc-500';
/** Center nav: inactive = muted slate + medium; Product uses blue + semibold (same text-sm). */
const navLink =
  'text-sm font-medium tracking-normal text-gray-400 antialiased transition-colors duration-200 hover:text-gray-200';
/**
 * Glossy royal-blue CTA: vertical gradient + top inner highlight + blue outer glow.
 */
const glossyBlue =
  'bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 text-white shadow-[0_8px_32px_-4px_rgba(37,99,235,0.55),0_4px_16px_-4px_rgba(29,78,216,0.4),inset_0_1px_0_rgba(255,255,255,0.22)] transition-[transform,box-shadow,filter] duration-200 hover:brightness-105 hover:shadow-[0_12px_40px_-4px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.28)] active:scale-[0.98]';
const primaryBtn = `rounded-lg ${glossyBlue} px-8 py-3.5 text-sm font-bold`;
const primaryBtnLg = `rounded-lg ${glossyBlue} px-8 py-4 text-base font-bold`;
const earlyAccessBtn =
  'inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full px-5 py-5 text-white font-medium leading-none transition-[filter,transform] duration-200 hover:brightness-105 active:scale-[0.98]';
const earlyAccessBtnStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #4C8DEB 0%, #6FAFE0 50%, #5F97D6 100%)',
  borderRadius: '9999px',
};
const seeHowBtn =
  'inline-flex w-fit items-center justify-center whitespace-nowrap px-5 py-5 text-white font-medium leading-none transition-[filter,transform] duration-200 hover:brightness-105 active:scale-[0.98]';
const seeHowBtnStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg,rgb(11, 39, 77) 0%,rgb(19, 42, 79) 50%,rgb(17, 39, 82) 100%)',
  borderRadius: '9999px',
};
/** Compact glossy pill for navbar actions. */
const glossyNavBtn = `rounded-lg ${glossyBlue} px-4 py-2.5 text-sm font-bold sm:px-5`;
const outlineGhostBtn = `text-base ${primaryBtn}`;

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
    // Match marketing scrollport width so honeycomb does not extend past in-flow content (e.g. footer)
    // when a vertical scrollbar narrows the overlay vs window.innerWidth.
    const scrollRoot =
      typeof document !== 'undefined' ? document.getElementById('mindmesh-marketing-scroll') : null;
    const w = scrollRoot?.clientWidth ?? window.innerWidth;
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

    const scrollRoot = document.getElementById('mindmesh-marketing-scroll');
    const ro = scrollRoot ? new ResizeObserver(() => init()) : null;
    if (scrollRoot && ro) ro.observe(scrollRoot);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return () => {
        ro?.disconnect();
        window.removeEventListener('resize', init);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onTouch);
      };
    }

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
      ro?.disconnect();
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
  background: 'rgba(97, 89, 89, 0.5)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65)',
};

/** Inbox feature preview: frosted white plate behind the mockup (distinct from gray `glassPanel`). */
const inboxPreviewPanelStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.45)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65)',
  border: '1px solid rgba(255, 255, 255, 0.28)',
};

const PRODUCT_LINKS: { title: string; desc: string; href: string }[][] = [
  [
    // { title: 'Overview', desc: 'The big picture of your workspace', href: '/features' },
    { title: 'Dashboard', desc: 'Your daily mission control center', href: '/dashboard' },
    { title: 'Inbox', desc: 'Unified communication across apps', href: '/inbox' },
    { title: 'Connected Apps', desc: 'Seamless third-party integrations', href: '/connected-apps' },
  ],
  [
    { title: 'Sensor', desc: 'Instant system-wide command bar', href: '/sensor&mascot#sensor' },
    { title: 'Mascot', desc: 'Proactive human-like AI assistant', href: '/sensor&mascot#mascot' },
    { title: "Yesterday's Narrative", desc: 'Daily summary of past achievements', href: '/yesterdays-narrative' },
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
        className="group flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-400 outline-none transition-colors hover:text-gray-200 dark:text-blue-300"
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
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const [sliderInteractionNonce, setSliderInteractionNonce] = useState(0);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const inViewOpts = useMemo(
    () =>
      ({
        once: true,
        amount: 'some' as const,
        margin: '0px 0px -12% 0px',
      }) as const,
    []
  );

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
  const activeCharacter = CHARACTER_SLIDES[activeCharacterIndex];
  const previousCharacter =
    CHARACTER_SLIDES[(activeCharacterIndex - 1 + CHARACTER_SLIDES.length) % CHARACTER_SLIDES.length];
  const nextCharacter = CHARACTER_SLIDES[(activeCharacterIndex + 1) % CHARACTER_SLIDES.length];

  const handleCharacterSelect = useCallback((index: number) => {
    setActiveCharacterIndex(index);
    setSliderInteractionNonce((current) => current + 1);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${inter.className} relative z-10 flex min-h-screen flex-col overflow-x-hidden antialiased selection:bg-blue-500/25`}
      style={{ backgroundColor: '#0a0a14', color: '#a1a1aa' }}
      aria-label="MindMesh marketing"
    >
      <HoneycombCanvas />

      <nav
        className="fixed top-0 z-50 w-full border-b-0 bg-[#0a0a14]/90 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(6, 6, 29, 0.78)' }}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-4 tracking-tight sm:px-8">
          <Link href="/" className="flex min-w-0 shrink items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">MindMesh</span>
          </Link>
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-8 md:flex">
            <ProductMegaMenu />
            <Link href="/connected-apps" className={navLink}>
              Integrations
            </Link>
            <Link href="/security" className={navLink}>
              Security
            </Link>
            <Link href="/trust" className={navLink}>
              Trust
            </Link>
            <Link href="/faq" className={navLink}>
              FAQ
            </Link>
          </div>
          <div className="flex shrink-0 items-center justify-end">
            <button
              type="button"
              onClick={() => toggleViewMode()}
              className={`inline-flex items-center gap-2 ${glossyNavBtn}`}
              aria-label="Switch to macOS view"
            >
              <ScrollText className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
              <span className="hidden sm:inline">Scroll view</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-[1] flex-1">
        <section className="relative overflow-hidden pb-32 pt-44 md:pt-52 lg:pt-56">
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
              <button
                type="button"
                className={earlyAccessBtn}
                style={earlyAccessBtnStyle}
                onClick={() => setIsWaitlistOpen(true)}
              >
                Get Early Access
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

        <section className="border-y border-black/50 bg-black/25 py-12">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 md:gap-x-10 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-4">
              {[
                { Icon: Lock, label: 'Local-first by design' },
                { Icon: Monitor, label: 'Desktop-native experience' },
                { Icon: EyeOff, label: 'Read-only Google access' },
                { Icon: Brain, label: 'Privacy-conscious AI workflow' },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex min-w-0 items-center justify-center gap-3"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-blue-200" aria-hidden />
                  <span className="text-center text-xs uppercase leading-snug tracking-[0.03em] text-blue-200 sm:text-left sm:text-sm xl:text-center">
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
            >
<h2 className="mb-8 text-4xl font-semibold leading-tight tracking-tight text-blue-100 md:text-6xl">   
               Stay ahead with your upcoming events.
              </h2>
              <p className={`mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
                Track upcoming meetings and important events in one place, with the context you need to stay
                prepared.
              </p>
              <Link
                href="/upcoming-events"
                className={`group inline-flex items-center gap-2 ${primaryBtn}`}
              >
                Explore the upcoming events
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              <div
                className={`${glassPanel} relative overflow-hidden rounded-[2rem] p-3 sm:p-4`}
                style={glassPanelStyle}
              >
                <div className="overflow-hidden bg-white ">
                  <Image
                    src={upcomingEventsMockup}
                    alt="Upcoming Events panel showing multiple connected calendars and join meeting actions"
                    width={928}
                    height={384}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-14 px-6 sm:px-12 md:grid-cols-2 md:gap-20 lg:gap-24">
            <div className="relative order-2 min-w-0 w-full self-start md:order-1">
              <div
                className={`${glassPanel} relative w-full overflow-hidden rounded-2xl px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6`}
                style={inboxPreviewPanelStyle}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-white/25"
                  aria-hidden
                />
                <div className="relative z-[1] w-full overflow-hidden rounded-xl">
                  <Image
                    src={heroInboxMockup}
                    alt="MindMesh Inbox: unified email list with account filters, search, and message previews"
                    width={800}
                    height={600}
                    className="h-auto w-full object-contain object-left-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className={`absolute right-3 top-3 z-[2] rounded-xl p-3 shadow-lg sm:right-4 sm:top-4 sm:p-4 ${glassPanel}`}
                  style={glassPanelStyle}
                >
                  <Mail className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" aria-hidden />
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="order-1 min-w-0 md:order-2 md:self-center"
            >
<h2 className="mb-8 text-4xl font-semibold leading-tight tracking-tight text-blue-100 md:text-6xl">   
All your messages, one focused inbox.
              </h2>
              <p className={`mb-10 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
              Bring all your accounts together in one place and you can respond faster and never miss what matters.
              </p>
              <Link
                href="/inbox"
                className={`group inline-flex items-center gap-2 ${primaryBtn}`}
              >
                Explore the inbox
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="bg-black/20 py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-24 px-6 md:grid-cols-2 sm:px-12 ">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
<h2 className="mb-8 text-4xl font-semibold leading-tight tracking-tight text-blue-100 md:text-6xl">   
Your yesterday, neatly wrapped up.              </h2>
              <p className={`mb-10 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
              Instantly review the key meetings, emails, highlights, and decisions from yesterday so you know exactly where things stand.
              Review the key updates, conversations, and decisions from across your workspace without digging through tools.
              </p>
              <Link
                href="/yesterdays-narrative"
                className={`group inline-flex items-center gap-2 ${primaryBtn}`}
              >
                View Yesterday's Narrative <span aria-hidden>⚡</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              <div className="w-full max-w-xl md:max-w-none">
                <div
                  className={`${glassPanel} flex flex-col gap-5 overflow-hidden p-5 sm:p-6 md:flex-row md:items-stretch md:gap-6`}
                  style={glassPanelStyle}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-4">

                    <div className="h-12 w-full animate-pulse rounded-lg bg-blue-950/50" />
                  </div>
                  <div className="relative mx-auto aspect-[4/3] w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl md:mx-0 md:w-[min(100%,280px)] md:max-w-[45%]">
                    <Image
                      src={yesterdaysNarrativeMockup}
                      alt="Yesterday&apos;s Narrative summary: narrative text, stats, and activity highlights"
                      width={560}
                      height={420}
                      className="h-full w-full object-cover object-left-top"
                      sizes="(max-width: 768px) 280px, 320px"
                    />
                  </div>
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
              className="relative"
            >
              <div
                className={`${glassPanel} relative overflow-hidden rounded-[2rem] p-3 sm:p-4`}
                style={glassPanelStyle}
              >
                <div className="overflow-hidden rounded-[1.5rem] bg-[#1f2430]">
                  <Image
                    src={connectedAppsMockup}
                    alt="Connected Apps settings with linked Gmail, Google Calendar, Outlook, and SMTP Mailbox accounts"
                    width={938}
                    height={360}
                    className="block h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h2 className="mb-8 text-4xl font-semibold leading-tight tracking-tight text-blue-100 md:text-6xl">
                Bring your essential apps together.
              </h2>
              <p className={`mb-6 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
                Connect email, calendar, outlook , smtp and other key tools in one place so MindMesh can organize your workflow with less setup and more clarity.
              </p>
              <p className={`mb-10 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
                Link the tools you rely on every day and keep everything synced in one unified workspace.
              </p>
              <Link href="/connected-apps" className={`group inline-flex items-center gap-2 ${primaryBtn}`}>
                Explore connected apps
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
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
              className="order-2 relative flex justify-center md:order-2"
              style={{ backgroundColor: 'rgba(210, 210, 218, 0.54)', borderRadius: '2rem' }}
            >
              <div
                className="absolute h-[28rem] w-[28rem] animate-pulse rounded-full blur-3xl transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${activeCharacter.glow} 0%, rgba(99,102,241,0.12) 45%, transparent 72%)`,
                }}
              />
              <div
                style={glassPanelStyle}
                aria-hidden
              />
              <div className="relative z-10 mx-auto flex w-full max-w-[33rem] flex-col items-center gap-7 px-5 py-8 sm:px-8">
                <div className="relative flex w-full items-end justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      handleCharacterSelect(
                        (activeCharacterIndex - 1 + CHARACTER_SLIDES.length) % CHARACTER_SLIDES.length
                      )
                    }
                    className="group absolute left-20 top-1/2 hidden h-32 w-32 -translate-y-1/2 rounded-3xl bg-white/[0.03] p-3 backdrop-blur-sm transition hover:bg-white/[0.05] md:block"
                    aria-label={`Show ${previousCharacter.name}`}
                  >
                    <DotLottieReact
                      src={previousCharacter.src}
                      loop
                      autoplay
                      speed={previousCharacter.speed}
                      className="h-full w-full opacity-70 transition group-hover:opacity-100"
                      aria-hidden
                    />
                  </button>
                  <div
                    className="relative flex h-64 w-64 items-center justify-center rounded-[2rem] p-4 shadow-[0_0_50px_-10px_rgba(0,0,0,0.65)] backdrop-blur-md md:h-[300px] md:w-[300px]"
                  >
                    <div
                      className="absolute inset-4 rounded-[1.5rem] blur-2xl"
                      style={{ background: `radial-gradient(circle at center, ${activeCharacter.glow} 0%, transparent 72%)` }}
                    />
                    <div className="relative z-10 h-full w-full">
                      <DotLottieReact
                        key={activeCharacter.id}
                        src={activeCharacter.src}
                        loop
                        autoplay
                        speed={activeCharacter.speed}
                        className="h-full w-full"
                        aria-hidden
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCharacterSelect((activeCharacterIndex + 1) % CHARACTER_SLIDES.length)}
                    className="group absolute right-20 top-1/2 hidden h-32 w-32 -translate-y-1/2 rounded-3xl bg-white/[0.03] p-3 backdrop-blur-sm transition hover:bg-white/[0.05] md:block"
                    aria-label={`Show ${nextCharacter.name}`}
                  >
                    <DotLottieReact
                      src={nextCharacter.src}
                      loop
                      autoplay
                      speed={nextCharacter.speed}
                      className="h-full w-full opacity-70 transition group-hover:opacity-100"
                      aria-hidden
                    />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-2xl bg-zinc-950/55 px-5 py-3 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md">
                    <p className="text-3xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                      {activeCharacter.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-white/10 bg-zinc-950/50 px-4 py-3 backdrop-blur-md">
                    {CHARACTER_SLIDES.map((character, index) => {
                      const isActive = index === activeCharacterIndex;

                      return (
                        <button
                          key={character.id}
                          type="button"
                          onClick={() => handleCharacterSelect(index)}
                          className={`relative h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60 ${
                            isActive ? 'w-20 bg-white/10' : 'w-10 bg-transparent hover:bg-white/5'
                          }`}
                          aria-label={`Show ${character.name}`}
                          aria-pressed={isActive}
                        >
                          <span className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-white/20" />
                          <span
                            className={`absolute left-1/2 top-1/2 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                              isActive ? 'w-10 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)]' : 'w-3 bg-zinc-500'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="rounded-full bg-zinc-950/65 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-white shadow-[0_10px_24px_-14px_rgba(0,0,0,0.9)] backdrop-blur-md">
                    <div className="flex items-center gap-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                    <span className="text-white"> {String(activeCharacterIndex + 1).padStart(2, '0')}</span>
                    <span className="h-px w-10 bg-white/35" />
                    <span className="text-white">{String(CHARACTER_SLIDES.length).padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="order-1 md:order-1"
            >
<h2 className="mb-8 text-4xl font-semibold leading-tight tracking-tight text-blue-100 md:text-6xl">   
Built for focus, not noise.
              </h2>
              <p className={`mb-10 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
                Sensor gives you instant command-bar access. Mascot gives you a more human, proactive
                assistant experience. Together, they make MindMesh feel less like software you manage and
                more like a calm layer that helps you stay on top of work.
              </p>
              <Link href="/sensor&mascot" className={`group inline-flex items-center gap-2 ${outlineGhostBtn} px-8 py-3`}>
               Explore Sensor & Mascot <span aria-hidden>⚡</span>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden py-32">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle at center, rgba(65, 65, 70, 0) 0%, transparent 70%)',
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
              <div className="relative z-10">
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
                  <div className="max-w-2xl lg:max-w-none">
                    <div className={`mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${bodyMuted}`}>
                      <span aria-hidden>🛡️</span>
                      <span className="text-blue-400">PRIVACY</span>
                    </div>
                    <h2 className="mb-8 text-4xl font-black text-white md:text-5xl">
                      Privacy is built into MindMesh.
                    </h2>
                    <p className={`mb-10 text-lg leading-relaxed ${bodyMuted}`}>
                      Your notes, chats, and workspace data stay protected with secure infrastructure,
                      encrypted access, and transparent data practices. We never sell your data, and you
                      stay in control of what gets stored or deleted.
                    </p>
                    <Link href="/privacy" className={`inline-block ${primaryBtn}`}>
                      Read Privacy Policy
                    </Link>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inViewOpts}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
                    className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
                  >
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100%,420px)] w-[min(100%,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.12] blur-[80px]" />
                    <div className="relative flex min-h-[320px] flex-col justify-center gap-4 sm:min-h-[360px]">
                      <div className="relative z-[3] ml-0 rounded-2xl border border-white/10 bg-zinc-950/40 p-5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md sm:ml-4 sm:-rotate-1">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/25">
                            <KeyRound className="h-5 w-5" strokeWidth={2} aria-hidden />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Encrypted workspace</p>
                            <p className={`mt-1 text-sm leading-relaxed ${bodyMuted}`}>
                              Access and storage designed around strong protection for your notes and chats.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="relative z-[2] mr-0 rounded-2xl border border-white/10 bg-zinc-950/50 p-5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md sm:mr-6 sm:rotate-1">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-300/95 ring-1 ring-emerald-400/20">
                            <ShieldCheck className="h-5 w-5" strokeWidth={2} aria-hidden />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">No data resale</p>
                            <p className={`mt-1 text-sm leading-relaxed ${bodyMuted}`}>
                              We do not sell personal data. Your workspace is not a product we broker to
                              advertisers.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="relative z-[1] ml-0 rounded-2xl border border-white/10 bg-zinc-950/35 p-5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md sm:ml-8 sm:-rotate-1">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/12 text-violet-300/95 ring-1 ring-violet-400/20">
                            <Trash2 className="h-5 w-5" strokeWidth={2} aria-hidden />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">You own deletion</p>
                            <p className={`mt-1 text-sm leading-relaxed ${bodyMuted}`}>
                              Decide what stays in your workspace and remove it when you are ready—on your
                              terms.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-24 -right-16 hidden opacity-[0.07] lg:block">
                <Lock className="h-[280px] w-[280px]" strokeWidth={0.5} aria-hidden />
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
              <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-black/30 py-6 sm:py-8 md:py-10">
                <Image
                  src={mindmeshGemMark}
                  alt="MindMesh logo"
                  width={1024}
                  height={682}
                  quality={100}
                  className="relative z-10 h-auto w-full max-w-[min(100%,min(92vw,440px))] object-contain sm:max-w-[min(100%,520px)] md:max-w-none"
                  sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 640px"
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
              <h2 className="mb-8 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                Work with more control. End the day with less mental residue.
              </h2>
              <p className={`mb-10 text-lg leading-relaxed sm:text-xl ${bodyMuted}`}>
                MindMesh helps you spend less time checking, searching, and re-checking. That means fewer
                missed follow-ups, faster morning catch-up, and a cleaner mental shutdown when work is
                done.
              </p>
              <button
                type="button"
                className={primaryBtnLg}
                onClick={() => setIsWaitlistOpen(true)}
              >
                Get early access
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
              <h2 className="mb-8 max-w-4xl text-5xl font-semibold tracking-tight text-blue-100 md:text-6xl ">
                The desktop AI assistant built for people who value clarity and privacy.
              </h2>
              <p className={`mb-12 max-w-2xl text-lg sm:text-xl ${bodyMuted}`}>
                Bring your workday into focus without giving up control of your data.
              </p>
              <div className="flex flex-col gap-6 sm:flex-row">
                <button
                  type="button"
                  className={earlyAccessBtn}
                  style={earlyAccessBtnStyle}
                  onClick={() => setIsWaitlistOpen(true)}
                >
                  Get Early Access
                </button>
                <Link href="/billing" className={seeHowBtn} style={seeHowBtnStyle}>
                  View Billing & Plans
                </Link>
              </div>
              <p className={`mt-6 flex items-center gap-2 text-sm ${bodyMutedSm}`}>
                <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden />
                Available for macOS, Windows.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}

export default DashboardDesktopShell;
export { DashboardDesktopShell };
