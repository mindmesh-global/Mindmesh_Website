'use client';

import React, { useId, useMemo, useRef, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// GradientHoneycomb — fixed ambient lights that react to cursor proximity
//
// PHILOSOPHY
// ──────────
// Lights are fixed in the scene at specific positions — like studio lights
// mounted to the ceiling. They don't follow the cursor.
//
// The cursor acts as an attractor:
//   • Proximity to cursor makes a light brighter (PROX_BOOST)
//   • Lights far from the cursor dim slightly (SHADOW_DIM) — as if energy
//     is being drawn toward the nearest light
//   • Light positions drift a tiny amount toward the cursor (MAX_DRIFT 3%)
//     You feel the tension. You don't see the movement.
//
// Color lives in the CSS broad-glow divs, never on the hex edges.
// Hex edges catch neutral white light only — chamfer physics.
// ─────────────────────────────────────────────────────────────────────────────

type Variant = 'silver' | 'space-gray' | 'gold' | 'midnight';

interface HoneycombProps extends React.HTMLAttributes<HTMLDivElement> {
  hexSize?: number;
  variant?: Variant;
  gap?: number;
}

// Light definition: [anchorX%, anchorY%, hue, sat%, lightness%, baseOpacity, radiusFraction]
type LightDef = [number, number, number, number, number, number, number];

const VARIANTS: Record<Variant, {
  bg: string;
  litFull: string;
  litPartial: string;
  grazing: string;
  lights: LightDef[];
}> = {
  silver: {
    bg: 'linear-gradient(158deg,#1d1f24 0%,#17181c 55%,#131418 100%)',
    litFull:    'rgba(255,255,255,0.70)',
    litPartial: 'rgba(215,228,245,0.35)',
    grazing:    'rgba(175,195,220,0.14)',
    lights: [
      [18, 22, 210, 32, 72, 0.13, 0.55],
      [82, 18, 195, 28, 68, 0.10, 0.48],
      [75, 80, 225, 30, 65, 0.09, 0.52],
      [20, 75, 205, 25, 70, 0.08, 0.50],
    ],
  },
  'space-gray': {
    bg: 'linear-gradient(158deg,#111214 0%,#0d0e10 55%,#0a0b0c 100%)',
    litFull:    'rgba(195,210,230,0.62)',
    litPartial: 'rgba(155,175,200,0.28)',
    grazing:    'rgba(115,138,165,0.11)',
    lights: [
      [15, 20, 220, 25, 68, 0.11, 0.52],
      [85, 15, 215, 22, 65, 0.09, 0.46],
      [78, 82, 228, 26, 62, 0.08, 0.50],
      [18, 78, 218, 20, 66, 0.07, 0.48],
    ],
  },
  gold: {
    bg: 'linear-gradient(158deg,#1a1409 0%,#130f07 55%,#0e0b05 100%)',
    litFull:    'rgba(255,222,130,0.72)',
    litPartial: 'rgba(235,192,95,0.34)',
    grazing:    'rgba(190,155,72,0.13)',
    lights: [
      [20, 18, 38, 42, 75, 0.14, 0.54],
      [80, 20, 45, 38, 72, 0.11, 0.48],
      [72, 82, 30, 35, 68, 0.09, 0.50],
      [22, 78, 42, 30, 72, 0.08, 0.48],
    ],
  },
  midnight: {
    bg: 'linear-gradient(158deg,#0e1017 0%,#090b10 55%,#06070b 100%)',
    litFull:    'rgba(148,188,255,0.65)',
    litPartial: 'rgba(110,155,232,0.30)',
    grazing:    'rgba(72,115,190,0.12)',
    lights: [
      [16, 20, 228, 38, 68, 0.12, 0.54],
      [84, 16, 218, 35, 65, 0.10, 0.48],
      [76, 80, 235, 40, 62, 0.09, 0.52],
      [18, 76, 222, 32, 66, 0.08, 0.50],
    ],
  },
};

const INFLUENCE_RADIUS = 0.55;
const PROX_BOOST       = 0.9;
const SHADOW_DIM       = 0.25;
const MAX_DRIFT_FACTOR = 8;
const LERP_POS         = 0.035;
const LERP_MOUSE       = 0.08;

type Vec2 = [number, number];

function hexVerts(r: number, cx: number, cy: number): Vec2[] {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
}

function edgePath(verts: Vec2[], edges: [number, number][]): string {
  let d = '';
  for (let i = 0; i < edges.length; i++) {
    const [fi, ti] = edges[i];
    const [x0, y0] = verts[fi];
    const [x1, y1] = verts[ti];
    const prevTo = i > 0 ? edges[i - 1][1] : -1;
    if (prevTo !== fi) d += `M${x0.toFixed(2)} ${y0.toFixed(2)} `;
    d += `L${x1.toFixed(2)} ${y1.toFixed(2)} `;
  }
  return d.trim();
}

const EDGES_LIT_FULL:    [number, number][] = [[3, 4], [4, 5]];
const EDGES_LIT_PARTIAL: [number, number][] = [[2, 3]];
const EDGES_GRAZING:     [number, number][] = [[5, 0]];

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}
function rgbaHsl(h: number, s: number, l: number, a: number): string {
  const [r, g, b] = hslToRgb(h, s, l);
  return `rgba(${r},${g},${b},${a.toFixed(4)})`;
}

export function GradientHoneycomb({
  hexSize = 28,
  variant = 'silver',
  gap = 1.5,
  className,
  ...props
}: HoneycombProps) {
  const uid       = useId().replace(/[^a-zA-Z0-9]/g, '');
  const patternId = `hcp${uid}`;
  const noiseId   = `hcn${uid}`;

  const v = VARIANTS[variant] ?? VARIANTS.silver;
  const numLights = v.lights.length;

  const r     = hexSize - gap / 2;
  const tileH = Math.sqrt(3) * hexSize;
  const tileW = 3 * hexSize;

  const centers = useMemo<Vec2[]>(
    () => [
      [hexSize, tileH / 2],
      [2.5 * hexSize, 0],
      [2.5 * hexSize, tileH],
    ],
    [hexSize, tileH],
  );

  const hexPaths = useMemo(
    () => centers.map(([cx, cy]) => {
      const verts = hexVerts(r, cx, cy);
      return {
        litFull:    edgePath(verts, EDGES_LIT_FULL),
        litPartial: edgePath(verts, EDGES_LIT_PARTIAL),
        grazing:    edgePath(verts, EDGES_GRAZING),
      };
    }),
    [r, centers],
  );

  // Refs
  const containerRef  = useRef<HTMLDivElement>(null);
  const mouseRef      = useRef({ x: 0.5, y: 0.5, inside: false });
  const smoothRef     = useRef({ x: 0.5, y: 0.5 });
  const rafRef        = useRef<number>(0);
  // Per-light smoothed positions
  const lightPosRef   = useRef<{ x: number; y: number }[] | null>(null);

  // DOM refs — one per light
  const lightDivRefs  = useRef<(HTMLDivElement | null)[]>(Array(numLights).fill(null));
  const edgeGradRefs  = useRef<(SVGRadialGradientElement | null)[]>(Array(numLights).fill(null));

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      inside: true,
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current.inside = false;
  }, []);

  const animate = useCallback(() => {
    const el = containerRef.current;
    if (!el) { rafRef.current = requestAnimationFrame(animate); return; }

    const W = el.offsetWidth;
    const H = el.offsetHeight;
    const diag = Math.sqrt(W * W + H * H);
    const vc = v;

    // Init light positions
    if (!lightPosRef.current) {
      lightPosRef.current = vc.lights.map(([ax, ay]) => ({ x: ax / 100, y: ay / 100 }));
    }

    const m = mouseRef.current;
    const sm = smoothRef.current;
    const lk = m.inside ? LERP_MOUSE : 0.02;
    sm.x += (m.x - sm.x) * lk;
    sm.y += (m.y - sm.y) * lk;

    // Proximity of cursor to each light
    const proxies = vc.lights.map((_, i) => {
      const lp = lightPosRef.current![i];
      const dx = (sm.x - lp.x) * W;
      const dy = (sm.y - lp.y) * H;
      const dist = Math.sqrt(dx * dx + dy * dy) / diag;
      return Math.max(0, 1 - dist / INFLUENCE_RADIUS);
    });

    const maxProx = Math.max(...proxies);
    const maxIdx  = proxies.indexOf(maxProx);

    vc.lights.forEach(([ax, ay, h, s, l, baseOp, radiusFrac], i) => {
      const anchor = { x: ax / 100, y: ay / 100 };
      const prox   = proxies[i];
      const boost  = 1 + prox * PROX_BOOST;
      const dim    = i === maxIdx ? 1 : 1 - maxProx * SHADOW_DIM;
      const intens = baseOp * boost * dim * (m.inside ? 1 : 0.7);

      // Drift position toward cursor
      const lp = lightPosRef.current![i];
      const tx = anchor.x + (sm.x - anchor.x) * prox * MAX_DRIFT_FACTOR * 0.01;
      const ty = anchor.y + (sm.y - anchor.y) * prox * MAX_DRIFT_FACTOR * 0.01;
      lp.x += (tx - lp.x) * LERP_POS;
      lp.y += (ty - lp.y) * LERP_POS;

      const px = lp.x * 100;
      const py = lp.y * 100;
      const rPct = radiusFrac * 100;

      // CSS broad glow
      const div = lightDivRefs.current[i];
      if (div) {
        const c0 = rgbaHsl(h, s, l, intens);
        const c1 = rgbaHsl(h, s, l, intens * 0.35);
        div.style.background = `radial-gradient(
          ellipse ${rPct}% ${rPct * 0.88}% at ${px.toFixed(2)}% ${py.toFixed(2)}%,
          ${c0} 0%, ${c1} 45%, transparent 72%
        )`;
      }

      // SVG edge glow — neutral white only
      const eg = edgeGradRefs.current[i];
      if (eg) {
        const epx = lp.x * W;
        const epy = lp.y * H;
        const er  = radiusFrac * diag * 0.55;
        eg.setAttribute('cx', epx.toFixed(1));
        eg.setAttribute('cy', epy.toFixed(1));
        eg.setAttribute('fx', epx.toFixed(1));
        eg.setAttribute('fy', epy.toFixed(1));
        eg.setAttribute('r',  er.toFixed(1));
        const stops = eg.querySelectorAll('stop');
        stops[0]?.setAttribute('stop-color', `rgba(255,255,255,${(intens * 0.65).toFixed(3)})`);
        stops[1]?.setAttribute('stop-color', 'rgba(255,255,255,0)');
      }
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [v]);

  useEffect(() => {
    // Reset light positions when variant changes
    lightPosRef.current = null;
  }, [variant]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove, onMouseLeave, animate]);

  // Generate unique gradient IDs per light
  const edgeGradIds = useMemo(
    () => v.lights.map((_, i) => `hceg${uid}${i}`),
    [uid, v.lights],
  );

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className ?? ''}`}
      {...props}
    >
      {/* 1. Background */}
      <div className="absolute inset-0" style={{ background: v.bg }} aria-hidden />

      {/* 2. Fixed light divs — one per light source */}
      {v.lights.map((_, i) => (
        <div
          key={i}
          ref={el => { lightDivRefs.current[i] = el; }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        />
      ))}

      {/* 3. SVG hex grid + edge glows */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{ display: 'block' }}
        aria-hidden
      >
        <defs>
          <filter id={noiseId} x="0%" y="0%" width="100%" height="100%"
            colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.65"
              numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
            <feBlend in="SourceGraphic" in2="grey" mode="soft-light" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>

          {/* Per-light edge glow gradients — neutral white */}
          {edgeGradIds.map((gid, i) => (
            <radialGradient
              key={gid}
              id={gid}
              ref={el => { edgeGradRefs.current[i] = el; }}
              gradientUnits="userSpaceOnUse"
              cx="0" cy="0" r="1"
            >
              <stop offset="0%"   stopColor="rgba(255,255,255,0.5)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          ))}

          <pattern id={patternId} width={tileW} height={tileH}
            patternUnits="userSpaceOnUse">
            {hexPaths.map((ep, i) => (
              <g key={i}>
                <path d={ep.grazing}    fill="none" stroke={v.grazing}    strokeWidth={1} strokeLinecap="round" />
                <path d={ep.litPartial} fill="none" stroke={v.litPartial} strokeWidth={1} strokeLinecap="round" />
                <path d={ep.litFull}    fill="none" stroke={v.litFull}    strokeWidth={1} strokeLinecap="round" />
              </g>
            ))}
          </pattern>
        </defs>

        {/* Hex grid */}
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />

        {/* Edge glow — one rect per light, neutral white */}
        {edgeGradIds.map(gid => (
          <rect key={gid} width="100%" height="100%" fill={`url(#${gid})`} />
        ))}

        {/* Noise */}
        <rect width="100%" height="100%" fill="none"
          filter={`url(#${noiseId})`} opacity="0.35" />
      </svg>

      {/* 4. Specular stripe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg,
            transparent 30%, rgba(255,255,255,0.022) 44%,
            rgba(255,255,255,0.038) 50%, rgba(255,255,255,0.022) 56%,
            transparent 68%)`,
        }}
        aria-hidden
      />
    </div>
  );
}