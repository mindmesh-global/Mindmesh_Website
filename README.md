# MindMesh Website

Marketing site and product surfaces for MindMesh ([mindmesh.global](https://mindmesh.global)).

## Getting Started

```bash
npm install
npm run dev
```

Dev server: `http://localhost:3002` (`npm run dev` binds port 3002).

```bash
npm run build
npm start
```

## What lives where

| Surface | Route / entry | Notes |
|---------|---------------|--------|
| Marketing homepage | `/` → `app/page.tsx` | Section composition under `components/marketing/` (Hero, theaters, features, CTA). Uses `MarketingLayout`. |
| Funnel pages | `/faq`, `/privacy`, `/terms`, … | Shared marketing chrome via `MarketingDepthLayout` where applicable. |
| Dashboard | `/dashboard` | Client product UI; legacy macOS-style shell is **not** the public homepage. |
| Sensor / Mascot (Phase 8) | Planned `/sensor`, `/mascot` | Scroll theaters; live Lottie overlays stay off marketing until that phase. |

The deleted desktop shell `components/Hero.tsx` is **gone**. Do not edit or reintroduce it for the live homepage. Homepage work belongs in `components/marketing/` and the Phase 1–7 / Phase 8 docs under `docs/`.

## Documentation

- **[Phase tasks](docs/phase-7-tasks.md)**: current polish / CWV / cleanup trackers (see also `docs/phase-1-tasks.md` … `docs/phase-8-tasks.md`).
- **[Naming: layouts vs pages vs dashboard shells](docs/naming-and-folders.md)**: why several files sound similar and what each one is for.
- **[Dashboard view switcher](docs/dashboard-view-switcher.md)**: dual view on `/dashboard`, state, files, and embedding notes.
- **[README-MIGRATION.md](README-MIGRATION.md)**: historical SEO / route migration notes (pre-marketing rebuild). Prefer phase docs for current architecture.

## Project structure (high level)

```
├── app/
│   ├── page.tsx                 # Marketing homepage composition
│   ├── layout.tsx               # Root layout (marketing vs legacy shell branch)
│   ├── globals.css
│   ├── dashboard/               # Product dashboard
│   ├── faq/ privacy/ terms/ …   # Marketing depth + legal
│   └── api/
├── components/
│   ├── marketing/               # Nav, footer, sections, product theaters
│   ├── dashboard/               # Dashboard UI (incl. marketing theater adapters)
│   ├── layout/                  # RootAppShell, LegacyAppShell, …
│   └── …
├── docs/                        # Phase plans, tasks, CWV runbooks
├── hooks/
├── lib/                         # seo, marketing-*, theater scroll, …
└── public/
```

## Customization

- Marketing copy and section order: `app/page.tsx` + `components/marketing/sections/`
- Design tokens: `app/globals.css`, `tailwind.config.ts`
- Site metadata defaults: `lib/seo.ts` + `app/layout.tsx`
- Dashboard / product UI: `app/dashboard/` and `components/dashboard/`

## Deployment

Standard Next.js app. On Vercel, import this repository (root is the app; there is no `apps/website` package in this repo).
