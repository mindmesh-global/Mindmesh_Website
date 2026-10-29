'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';

type OrbitPlanet = {
  id: string;
  label: string;
  iconSrc: string;
  /** Distance from center as % of the figure's half-size. */
  radiusPct: number;
  durationSec: number;
  startAngleDeg: number;
  notifyDelayMs: number;
  color: { bg: string; ring: string };
};

function iconFor(id: string) {
  return MARKETING_INTEGRATIONS.find((item) => item.id === id)?.iconSrc ?? '';
}

const PLANETS: readonly OrbitPlanet[] = [
  {
    id: 'gmail',
    label: 'Gmail',
    iconSrc: iconFor('gmail'),
    radiusPct: 32,
    durationSec: 22,
    startAngleDeg: 15,
    notifyDelayMs: 0,
    color: { bg: 'rgba(234,67,53,0.28)', ring: 'rgba(234,67,53,0.55)' },
  },
  {
    id: 'slack',
    label: 'Slack',
    iconSrc: iconFor('slack'),
    radiusPct: 40,
    durationSec: 28,
    startAngleDeg: 90,
    notifyDelayMs: 1600,
    color: { bg: 'rgba(129,140,248,0.28)', ring: 'rgba(129,140,248,0.55)' },
  },
  {
    id: 'jira',
    label: 'Jira',
    iconSrc: iconFor('jira'),
    radiusPct: 48,
    durationSec: 34,
    startAngleDeg: 165,
    notifyDelayMs: 3200,
    color: { bg: 'rgba(67,136,253,0.28)', ring: 'rgba(67,136,253,0.55)' },
  },
  {
    id: 'outlook-email',
    label: 'Outlook',
    iconSrc: iconFor('outlook-email'),
    radiusPct: 36,
    durationSec: 26,
    startAngleDeg: 240,
    notifyDelayMs: 4800,
    color: { bg: 'rgba(0,120,212,0.28)', ring: 'rgba(0,120,212,0.55)' },
  },
  {
    id: 'google-calendar',
    label: 'Calendar',
    iconSrc: iconFor('google-calendar'),
    radiusPct: 44,
    durationSec: 31,
    startAngleDeg: 300,
    notifyDelayMs: 6400,
    color: { bg: 'rgba(52,168,83,0.28)', ring: 'rgba(52,168,83,0.55)' },
  },
] as const;

const OUTER_ORBIT_DIAMETER_PCT = Math.max(...PLANETS.map((p) => p.radiusPct)) * 2;

type Pulse = {
  id: number;
  angle: number;
  radiusPct: number;
};

/**
 * FIG 0.5 — MindMesh as the sun; connected apps orbit like planets.
 * Mouse proximity drives a speaker-style tremor from the logo. Each app
 * occasionally pops a red notification that feeds a sensory pulse back into
 * the center.
 */
export function MindMeshOrbitFigure() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [tremor, setTremor] = useState(0);
  const [corePulse, setCorePulse] = useState(0);
  const [activeNotify, setActiveNotify] = useState<string | null>(null);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const pulseIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const tremorTargetRef = useRef(0);
  const mountedAtRef = useRef(0);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const tickTremor = useCallback(() => {
    setTremor((current) => {
      const next = current + (tremorTargetRef.current - current) * 0.2;
      if (Math.abs(next - tremorTargetRef.current) < 0.012) {
        rafRef.current = null;
        return tremorTargetRef.current;
      }
      rafRef.current = window.requestAnimationFrame(tickTremor);
      return next;
    });
  }, []);

  const scheduleTremor = useCallback(
    (target: number) => {
      tremorTargetRef.current = Math.max(0, Math.min(1, target));
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(tickTremor);
      }
    },
    [tickTremor]
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const dist = Math.min(1, Math.hypot(dx, dy));
      const proximity = Math.max(0, 1 - dist);
      scheduleTremor(0.2 + proximity * 0.8);
    },
    [prefersReducedMotion, scheduleTremor]
  );

  const handlePointerLeave = useCallback(() => {
    scheduleTremor(0);
  }, [scheduleTremor]);

  const fireNotification = useCallback(
    (planet: OrbitPlanet) => {
      if (prefersReducedMotion) return;
      setActiveNotify(planet.id);
      const id = ++pulseIdRef.current;
      const elapsedSec = (Date.now() - mountedAtRef.current) / 1000;
      const angle =
        planet.startAngleDeg + (elapsedSec / planet.durationSec) * 360;
      setPulses((prev) => [
        ...prev,
        { id, angle, radiusPct: planet.radiusPct },
      ]);
      setCorePulse((n) => n + 1);
      scheduleTremor(1);

      window.setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== id));
      }, 900);
      window.setTimeout(() => {
        setActiveNotify((current) => (current === planet.id ? null : current));
        scheduleTremor(0.12);
      }, 1100);
    },
    [prefersReducedMotion, scheduleTremor]
  );

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const timers: number[] = [];
    const cycleMs = 9000;

    PLANETS.forEach((planet) => {
      const run = () => fireNotification(planet);
      timers.push(window.setTimeout(run, 1400 + planet.notifyDelayMs));
      timers.push(window.setInterval(run, cycleMs));
    });

    return () => {
      for (const id of timers) {
        window.clearTimeout(id);
        window.clearInterval(id);
      }
    };
  }, [fireNotification, prefersReducedMotion]);

  useEffect(
    () => () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const tremorPx = tremor * 2.6;
  const tremorScale = 1 + tremor * 0.045;
  const auraOpacity = 0.32 + tremor * 0.5;

  return (
    <div
      ref={rootRef}
      data-problem-figure
      data-mindmesh-orbit=""
      className="relative aspect-square w-full max-w-[36rem] select-none overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Background glow aura */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--mm-accent-strong, #4388fd) 20%, transparent) 0%, transparent 70%)',
          opacity: auraOpacity,
          filter: `blur(${30 + tremor * 14}px)`,
        }}
        aria-hidden
      />

      {/* Orbit ring paths */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        {PLANETS.map((planet) => (
          <circle
            key={`ring-${planet.id}`}
            cx="50"
            cy="50"
            r={planet.radiusPct}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.4"
            strokeDasharray="1.5 3"
          />
        ))}
      </svg>

      {/* Heartbeat waves from MindMesh */}
      {!prefersReducedMotion ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {[0, 1, 2].map((wave) => (
            <span
              key={wave}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: `${OUTER_ORBIT_DIAMETER_PCT}%`,
                height: `${OUTER_ORBIT_DIAMETER_PCT}%`,
                animation: 'problem-orbit-heartbeat 3.2s ease-in-out infinite',
                animationDelay: `${wave * 1.05}s`,
                borderColor: 'rgba(67,136,253,0.55)',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            />
          ))}
        </div>
      ) : null}

      {!prefersReducedMotion && tremor > 0.08 ? (
        <>
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-mm-primary/45"
            style={{
              width: `${16 + tremor * 30}%`,
              height: `${16 + tremor * 30}%`,
              transform: 'translate(-50%, -50%)',
              opacity: tremor * 0.6,
            }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-mm-primary/25"
            style={{
              width: `${26 + tremor * 42}%`,
              height: `${26 + tremor * 42}%`,
              transform: 'translate(-50%, -50%)',
              opacity: tremor * 0.32,
            }}
            aria-hidden
          />
        </>
      ) : null}

      {pulses.map((pulse) => (
        <div
          key={pulse.id}
          className="pointer-events-none absolute inset-0"
          style={{ transform: `rotate(${pulse.angle}deg)` }}
          aria-hidden
        >
          <span
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mm-error shadow-[0_0_14px_color-mix(in_srgb,var(--mm-error)_75%,transparent)] [animation:problem-orbit-feed-in_900ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
            style={{
              ['--orbit-feed-start' as string]: `${50 - pulse.radiusPct}%`,
            }}
          />
        </div>
      ))}

      {PLANETS.map((planet) => {
        const notifying = activeNotify === planet.id;
        const delay = `-${(planet.startAngleDeg / 360) * planet.durationSec}s`;
        return (
          <div
            key={planet.id}
            className="absolute inset-0"
            style={
              prefersReducedMotion
                ? { transform: `rotate(${planet.startAngleDeg}deg)` }
                : {
                    animation: `problem-orbit-spin ${planet.durationSec}s linear infinite`,
                    animationDelay: delay,
                    transformOrigin: '50% 50%',
                  }
            }
            aria-hidden
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${50 - planet.radiusPct}%` }}
            >
              <div
                className="relative flex h-11 w-11 items-center justify-center rounded-full shadow-mm-elevated"
                style={{
                  background: planet.color.bg,
                  border: `1px solid ${planet.color.ring}`,
                  ...(prefersReducedMotion
                    ? { transform: `rotate(-${planet.startAngleDeg}deg)` }
                    : {
                        animation: `problem-orbit-spin ${planet.durationSec}s linear infinite reverse`,
                        animationDelay: delay,
                      }),
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={planet.iconSrc} alt="" className="h-5 w-5" />
                <span
                  className={[
                    'absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-mm-error ring-2 ring-mm-background',
                    notifying
                      ? 'scale-125 opacity-100 [animation:problem-orbit-badge-pop_1.1s_ease-out]'
                      : 'opacity-70',
                  ].join(' ')}
                />
                <span
                  className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-medium"
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    background: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(4px)',
                  }}
                  aria-hidden
                >
                  {planet.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Core */}
      <div
        className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 items-center justify-center md:h-28 md:w-28"
        style={{
          transform: `translate(-50%, -50%) translate(${tremorPx * (corePulse % 2 === 0 ? 1 : -1)}px, ${tremorPx * 0.55}px) scale(${tremorScale})`,
          transition: prefersReducedMotion ? undefined : 'transform 50ms linear',
        }}
        data-orbit-core={corePulse}
        aria-hidden
      >
        <div
          className="absolute inset-[-35%] rounded-full"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--mm-accent) 50%, transparent) 0%, transparent 72%)',
            filter: `blur(${18 + tremor * 12}px)`,
            opacity: 0.55 + tremor * 0.4,
            animation: prefersReducedMotion
              ? undefined
              : 'problem-orbit-core-aura 3.6s ease-in-out infinite',
          }}
        />
        <div
          className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-mm-outline-variant/40 shadow-mm-elevated"
          style={{ background: 'radial-gradient(circle at 40% 35%, #0f1e40, #030810)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Logo/mindmesh-logo-tight.png"
            alt=""
            className="h-[78%] w-[78%] object-contain"
          />
        </div>
      </div>

      <span className="sr-only">
        MindMesh at the center with connected apps orbiting around it. Notifications
        from each app feed back into MindMesh.
      </span>
    </div>
  );
}
