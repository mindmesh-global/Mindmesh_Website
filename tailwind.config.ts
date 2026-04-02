import type { Config } from 'tailwindcss';

/** MindMesh marketing / landing tokens (e.g. Upcoming Events page) — use mm-* utilities */
const mindMeshLanding = {
  'error-container': '#871f21',
  'surface-container-highest': '#11244c',
  'primary-dim': '#699cff',
  'on-tertiary': '#000b83',
  'inverse-on-surface': '#4d556b',
  'inverse-primary': '#005bc4',
  'secondary-dim': '#a9bad3',
  'primary-fixed': '#4388fd',
  'tertiary-fixed-dim': '#747fea',
  'on-primary': '#003d88',
  'surface-container': '#0a1836',
  'tertiary-dim': '#8a95ff',
  'error-dim': '#c54d4a',
  'on-secondary': '#314156',
  'surface-container-high': '#0f1e3f',
  surface: '#060e20',
  outline: '#6475a1',
  tertiary: '#919bff',
  'on-primary-container': '#ffffff',
  'on-background': '#dee5ff',
  'on-secondary-fixed-variant': '#4d5d73',
  'on-secondary-container': '#b0c0da',
  'on-tertiary-fixed-variant': '#000979',
  'on-surface': '#dee5ff',
  'on-primary-fixed-variant': '#001435',
  'on-tertiary-fixed': '#000000',
  'secondary-fixed': '#d3e4fe',
  'tertiary-container': '#818cf8',
  'secondary-fixed-dim': '#c5d6f0',
  'on-surface-variant': '#99aad9',
  secondary: '#b7c8e1',
  'primary-container': '#0e69dc',
  'on-primary-fixed': '#000000',
  'on-error': '#490006',
  'surface-tint': '#adc6ff',
  'primary-fixed-dim': '#317bef',
  primary: '#adc6ff',
  'surface-bright': '#182b52',
  error: '#fa746f',
  'on-tertiary-container': '#00055a',
  'on-secondary-fixed': '#314055',
  'surface-dim': '#060e20',
  background: '#060e20',
  'on-error-container': '#ff9993',
  'inverse-surface': '#faf8ff',
  'surface-container-low': '#06122c',
  'secondary-container': '#2d3c51',
  'outline-variant': '#364770',
  'surface-variant': '#11244c',
  'surface-container-lowest': '#000000',
  'tertiary-fixed': '#818cf8',
} as const;

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mm: mindMeshLanding,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;

