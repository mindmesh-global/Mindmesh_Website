export const colors = {
  bg: '#120912',
  surface: '#1d101d',
  border: '#2a1f2e',
  purple: '#863286',
  indigo: '#6366f1',
  violet: '#8b5cf6',
  white: '#fafaf9',
  muted: '#a8a29e',
  dim: '#78716c',
  success: '#22c55e',
  amber: '#f59e0b',
  gmail: '#ea4335',
  calendar: '#4285f4',
  outlook: '#0078d4',
  slack: '#4a154b',
  ms: '#00a4ef',
  local: '#22c55e',
} as const;

import { georgiaFontFamily, interFontFamily } from './fonts';

export const fonts = {
  ui: `${interFontFamily}, system-ui, sans-serif`,
  mono: '"SF Mono", "Fira Code", Consolas, monospace',
  brand: `${georgiaFontFamily}, "Times New Roman", serif`,
} as const;

export const SCENE_DURATIONS = {
  scene1: 120,
  scene2: 150,
  scene3: 160,
  scene4: 130,
  scene5: 140,
  scene6: 120,
  scene7: 180,
  scene8: 120,
} as const;

export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);
