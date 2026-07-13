# MindMesh Website - Migration & SEO Summary (historical)

> **Status:** Historical record of an earlier SEO / multi-route migration.
> For the **current** marketing homepage and shell, use:
>
> - `README.md` and `QUICK_START.md`
> - `docs/phase-1-tasks.md` … `docs/phase-8-tasks.md`
> - Live homepage: `app/page.tsx` + `components/marketing/`
>
> The desktop shell `components/Hero.tsx` referenced below **no longer exists**. Public `/` is marketing, not the macOS window UI.

---

Summary of changes made to migrate the MindMesh website for SEO and Next.js best practices (pre–marketing rebuild).

---

## Overview

- **Project:** MindMesh website (mindmesh.global)
- **Stack:** Next.js, React, TypeScript, Tailwind CSS
- **Goal (then):** SEO-friendly structure with SSR, proper metadata, sitemap, and optimized loading

---

## Changes Summary

### 1. Route Structure (historical public pages)

This table describes routes as they existed in that migration. Several have since been redirected, removed, or rebuilt under the marketing funnel. Prefer `lib/marketing-routes.ts`, `next.config` redirects, and phase docs for what is live today.

| Route | Path | Description (at time of migration) |
|-------|------|-------------|
| MindMesh | `/` | Homepage |
| Join Waitlist | `/waitlist` | Waitlist signup form |
| Subscription | `/subscription` | Pricing plans |
| Features | `/features` | AI features overview |
| App Directory | `/app-directory` | Integrations |
| Social | `/social` | Social links |
| Demo.mov | `/demo` | Demo video placeholder |
| Docs | `/docs` | Documentation & FAQ |
| Contact Us | `/contact` | Contact form |

**Files created (historical):**

- `app/waitlist/page.tsx` + `WaitlistPageClient.tsx`
- `app/subscription/page.tsx` + `SubscriptionPageClient.tsx`
- `app/features/page.tsx` + `FeaturesPageClient.tsx`
- `app/app-directory/page.tsx` + `AppDirectoryPageClient.tsx`
- `app/social/page.tsx` + `SocialPageClient.tsx`
- `app/demo/page.tsx` + `DemoPageClient.tsx`
- `app/docs/page.tsx` + `DocsPageClient.tsx`
- `app/contact/page.tsx` + `ContactPageClient.tsx`

---

### 2. Root Layout Metadata (`app/layout.tsx`)

- `metadataBase`: `https://mindmesh.global`
- `title`: default + template `%s | MindMesh`
- `description`, `keywords`, `authors`, `creator`
- `openGraph` / `twitter` / `robots`

**Current defaults:** prefer `lib/seo.ts` (`SITE_TITLE`, `SITE_DESCRIPTION`) and Phase 7 metadata alignment (`P7-T01`).

---

### 3. Page-Level Metadata

Each public page had unique `title`, `description`, and `openGraph` fields.

---

### 4. JSON-LD Schema (Homepage)

Added to `app/page.tsx` at the time: SoftwareApplication + Organization. Confirm current markup in the live `app/page.tsx`.

---

### 5. Sitemap & Robots

**`next-sitemap.config.js`** (or equivalent) generated `public/sitemap.xml` and `public/robots.txt`. Build/postbuild may still run sitemap generation; verify against current `package.json`.

---

### 6. Animated Background Optimization

**`components/layout/AnimatedBackground.tsx`**

- Client component; lazy-loaded in the legacy shell era.

Still relevant for legacy / dashboard-adjacent chrome if referenced; not the primary marketing homepage background system.

---

### 7. Desktop Nav Component

**`components/layout/DesktopNav.tsx`**

Historic 9-icon navigation for the desktop shell routes. Marketing chrome today is `components/marketing/MarketingNav.tsx` (and footer/layout siblings).

---

### 8. Hero & Layout Updates (obsolete for `/`)

**`components/Hero.tsx` (deleted in Phase 6)**

Historical notes:

- Replaced inline background with lazy `AnimatedBackground`
- Used `DesktopNav` for icon navigation

**Today:** `/` is composed from marketing sections. Do not restore `Hero.tsx` as the homepage. See `docs/phase-6-tasks.md` (Hero deletion) and `docs/phase-2-tasks.md` (marketing shell).

**`components/layout/DesktopRouteLayout.tsx`**

Shared layout for historic route pages; superseded for marketing funnel by `MarketingLayout` / `MarketingDepthLayout`.

---

### 9. WaitlistModal Embedded Mode

**`components/WaitlistModal.tsx`**

- `embedded` prop for inline waitlist UI where still used.

Marketing waitlist patterns may also use `components/marketing/WaitlistForm.tsx`.

---

## Architecture Rules (then)

| Rule | Implementation |
|------|----------------|
| Public pages = Server Components | Page files without `'use client'`; client UI in `*Client.tsx` |
| Dashboard = Client heavy | `app/dashboard/` |
| Layout = No unnecessary `'use client'` on root |
| Internal navigation | `next/link` |
| Images | Prefer `next/image` |

Marketing homepage composition and theater rules: Phases 2–4 docs.

---

## Run Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build (+ sitemap if configured)
npm run start    # Start production server
```

---

## File Structure note

The tree below was accurate for the migration era (including `Hero.tsx`). It is **not** the current homepage structure. See `README.md` for the marketing-oriented map.
