# Quick Start Guide

## Getting Started

### 1. Install Dependencies

From the repository root:

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3002`.

### 3. Customize Content (current homepage)

The live homepage is the **marketing** page, not a desktop window shell.

| Area | Where to edit |
|------|----------------|
| Homepage section order | `app/page.tsx` |
| Hero, problem, how-it-works, theaters, CTA, … | `components/marketing/sections/` and `components/marketing/` |
| Product theater demos | `components/marketing/theater/` |
| Colors / tokens | `tailwind.config.ts`, `app/globals.css` |
| Default SEO title / description | `lib/seo.ts` (also `app/layout.tsx` metadata) |

Do **not** look for `components/Hero.tsx`. That macOS-style shell was removed (Phase 6). Dashboard UI lives under `app/dashboard/` and `components/dashboard/`.

### 4. Phase docs

Architecture and task trackers live under `docs/` (`phase-1` … `phase-8`). Start from `docs/phase-7-tasks.md` for current polish work, or `docs/phase-8-tasks.md` for Sensor / Mascot product pages.

## Build for Production

```bash
npm run build
npm start
```

## Deploy

### Vercel (recommended)

1. Push to GitHub
2. Import the project in Vercel (repository root is the Next.js app)
3. Deploy

### Other options

- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting that supports Next.js

## Notes

- Framer Motion and sticky product theaters are intentional on the marketing page; see Phase 3–4 docs for scroll-kit behavior.
- Field CWV / Lighthouse: `docs/phase-7/tasks/P7-T05-field-cwv-monitoring.md` and `npm run lhci` (CI config in `lighthouserc.cjs`).
