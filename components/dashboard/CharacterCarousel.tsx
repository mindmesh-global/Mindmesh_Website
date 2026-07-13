'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
  accent: string;
  speed?: number;
};

const CHARACTER_SLIDES: CharacterSlide[] = [
  {
    id: '1',
    name: 'Sherpa',
    src: SHERPA_LOTTIE_URL,
    glow: 'rgba(96,165,250,0.38)',
    accent: '#60a5fa',
    speed: 1,
  },
  {
    id: '2',
    name: 'Robo',
    src: ROBO_LOTTIE_URL,
    glow: 'rgba(59,130,246,0.34)',
    accent: '#3b82f6',
    speed: 1,
  },
  {
    id: '3',
    name: 'Boy',
    src: BOY_LOTTIE_URL,
    glow: 'rgba(129,140,248,0.32)',
    accent: '#818cf8',
    speed: 1,
  },
  {
    id: '5',
    name: 'Girl',
    src: GIRL_LOTTIE_URL,
    glow: 'rgba(168,85,247,0.3)',
    accent: '#a855f7',
    speed: 1,
  },
  {
    id: '6',
    name: 'Luna',
    src: LUNA_LOTTIE_URL,
    glow: 'rgba(56,189,248,0.32)',
    accent: '#38bdf8',
    speed: 1,
  },
  {
    id: '7',
    name: 'Mini',
    src: MINI_LOTTIE_URL,
    glow: 'rgba(99,102,241,0.3)',
    accent: '#6366f1',
    speed: 1,
  },
  {
    id: 'cat',
    name: 'Whiskers',
    src: WHISKERS_LOTTIE_URL,
    glow: 'rgba(244,114,182,0.28)',
    accent: '#f472b6',
    speed: 1,
  },
];

const HEX_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100L0 84L0 50L28 66L56 50L56 84L28 100Z' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E\")";

const slideCount = CHARACTER_SLIDES.length;

function wrapIndex(index: number) {
  return ((index % slideCount) + slideCount) % slideCount;
}

function getSlideDirection(from: number, to: number) {
  const diff = to - from;
  if (diff === 0) return 0;
  if (Math.abs(diff) <= slideCount / 2) return diff > 0 ? 1 : -1;
  return diff > 0 ? -1 : 1;
}

function SideMascot({
  character,
  onClick,
  position,
  reduceMotion,
}: {
  character: CharacterSlide;
  onClick: () => void;
  position: 'left' | 'right';
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Show ${character.name}`}
      initial={false}
      animate={{
        opacity: 0.45,
        scale: 0.62,
        x: position === 'left' ? -8 : 8,
      }}
      whileHover={reduceMotion ? undefined : { opacity: 0.75, scale: 0.68 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group absolute top-1/2 z-[1] hidden h-24 w-24 -translate-y-1/2 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-2 transition-colors hover:border-white/10 hover:bg-white/[0.06] sm:flex md:h-28 md:w-28 lg:h-32 lg:w-32 ${
        position === 'left' ? 'left-2 md:left-6 lg:left-10' : 'right-2 md:right-6 lg:right-10'
      }`}
    >
      <span
        className="flex h-full w-full items-center justify-center rounded-xl text-2xl font-bold opacity-80 transition-opacity group-hover:opacity-100 md:text-3xl"
        style={{ color: character.accent }}
        aria-hidden
      >
        {character.name.charAt(0)}
      </span>
    </motion.button>
  );
}

export default function CharacterCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const isEngagedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px', threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeCharacter = CHARACTER_SLIDES[activeIndex];
  const previousCharacter = CHARACTER_SLIDES[wrapIndex(activeIndex - 1)];
  const nextCharacter = CHARACTER_SLIDES[wrapIndex(activeIndex + 1)];

  const goToIndex = useCallback((index: number) => {
    const next = wrapIndex(index);
    setActiveIndex((current) => {
      if (current === next) return current;
      setDirection(getSlideDirection(current, next));
      return next;
    });
  }, []);

  const goPrev = useCallback(() => goToIndex(activeIndex - 1), [activeIndex, goToIndex]);
  const goNext = useCallback(() => goToIndex(activeIndex + 1), [activeIndex, goToIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isEngagedRef.current) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goPrev, goNext]);

  const progressPercent = ((activeIndex + 1) / slideCount) * 100;

  const centerVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: reduceMotion ? 1 : 0.9,
      x: reduceMotion ? 0 : dir * 48,
    }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      scale: reduceMotion ? 1 : 0.94,
      x: reduceMotion ? 0 : dir * -48,
    }),
  };

  return (
    <div
      ref={rootRef}
      className="group/carousel relative w-full max-w-[36rem] outline-none"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="MindMesh mascots"
      onMouseEnter={() => {
        isEngagedRef.current = true;
      }}
      onMouseLeave={() => {
        isEngagedRef.current = false;
      }}
      onFocusCapture={() => {
        isEngagedRef.current = true;
      }}
      onBlurCapture={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) {
          isEngagedRef.current = false;
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start == null) return;
        const end = event.changedTouches[0]?.clientX;
        if (end == null) return;
        const delta = end - start;
        if (Math.abs(delta) < 48) return;
        if (delta > 0) goPrev();
        else goNext();
      }}
    >
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] p-1 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.75)]"
        style={{
          background:
            'linear-gradient(165deg, rgba(28, 32, 44, 0.92) 0%, rgba(14, 16, 24, 0.96) 55%, rgba(10, 12, 18, 0.98) 100%)',
          boxShadow: `0 25px 60px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 80px -20px ${activeCharacter.glow}`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            backgroundImage: HEX_PATTERN,
            backgroundSize: '56px 100px',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 35%, ${activeCharacter.glow} 0%, transparent 68%)`,
          }}
          aria-hidden
        />

        <div className="relative z-10 flex flex-col items-center gap-6 px-4 py-8 sm:px-6 sm:py-10">
          <div className="relative flex h-[17rem] w-full items-center justify-center sm:h-[19rem] md:h-[21rem]">
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 transition hover:border-white/20 hover:bg-black/75 hover:text-white sm:hidden"
              aria-label={`Previous: ${previousCharacter.name}`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 transition hover:border-white/20 hover:bg-black/75 hover:text-white sm:hidden"
              aria-label={`Next: ${nextCharacter.name}`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>

            <SideMascot
              character={previousCharacter}
              onClick={goPrev}
              position="left"
              reduceMotion={!!reduceMotion}
            />
            <SideMascot
              character={nextCharacter}
              onClick={goNext}
              position="right"
              reduceMotion={!!reduceMotion}
            />

            <div className="relative flex h-52 w-52 items-center justify-center sm:h-56 sm:w-56 md:h-60 md:w-60">
              <motion.div
                className="absolute inset-6 rounded-[1.75rem] blur-3xl"
                animate={{
                  background: `radial-gradient(circle at center, ${activeCharacter.glow} 0%, transparent 70%)`,
                }}
                transition={{ duration: 0.5 }}
                aria-hidden
              />
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeCharacter.id}
                  custom={direction}
                  variants={centerVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 h-full w-full"
                >
                  <DotLottieReact
                    src={activeCharacter.src}
                    loop
                    autoplay={inView && !reduceMotion}
                    speed={activeCharacter.speed}
                    className="h-full w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                    aria-hidden
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex w-full max-w-sm flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCharacter.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
                className="text-center"
              >
                <p className="text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
                  {activeCharacter.name}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="w-full max-w-xs sm:max-w-sm">
              <div
                className="relative h-2 overflow-hidden rounded-full border border-white/10 bg-zinc-950/80"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={slideCount}
                aria-valuenow={activeIndex + 1}
                aria-label={`Mascot ${activeIndex + 1} of ${slideCount}`}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  animate={{
                    width: `${progressPercent}%`,
                    background: `linear-gradient(90deg, ${activeCharacter.accent} 0%, ${activeCharacter.accent}99 100%)`,
                    boxShadow: `0 0 20px ${activeCharacter.glow}`,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 flex">
                  {CHARACTER_SLIDES.map((character, index) => (
                    <button
                      key={character.id}
                      type="button"
                      onClick={() => goToIndex(index)}
                      className="h-full flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400/60"
                      aria-label={`Show ${character.name}`}
                      aria-current={index === activeIndex ? 'true' : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.32em] text-zinc-500">
              <span className="tabular-nums text-white">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="h-px w-8 bg-white/20" aria-hidden />
              <span className="tabular-nums">{String(slideCount).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
