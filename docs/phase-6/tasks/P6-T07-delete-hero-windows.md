# P6-T07: Delete Hero + Windows + Route Config

**Task ID:** P6-T07  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P6-T06](./P6-T06-clean-hero-route-lists.md)  
**Blocks:** P6-T15

---

## Goal

Remove the macOS Hero surface and its window pack. Keep dashboard / sensor overlays via a slim legacy route helper. Redirects from P6-T02 / P6-T04 remain the only traffic path for old Hero URLs.

---

## Deleted

| Path | Role |
|------|------|
| `components/Hero.tsx` | macOS Hero shell |
| `components/FeaturesWindow.tsx` | Hero window |
| `components/DocsWindow.tsx` | Hero window |
| `components/SocialWindow.tsx` | Hero window |
| `components/PricingWindow.tsx` | Hero window |
| `components/ContactWindow.tsx` | Hero window (form lives in marketing `ContactForm`) |
| `components/AppDirectoryWindow.tsx` | Hero window |
| `components/MovieWindow.tsx` | Hero window |
| `components/layout/DesktopNav.tsx` | Hero dock |
| `components/layout/AnimatedBackground.tsx` | Hero backdrop |
| `components/mindmeshui.tsx` | Hero-only UI chrome |
| `context/SplitViewContext.tsx` | Hero split view |
| `components/Logo.tsx` | Floating Hero wordmark |
| `lib/mindmesh-hero-routes.ts` | Replaced by legacy helper |
| `app/features/page.tsx` | Redirect-only (`/#features`) |
| `app/docs/page.tsx` | Redirect-only (`/faq`) |
| `app/app-directory/page.tsx` | Redirect-only (`/connected-apps`) |
| `app/demo/page.tsx` | Redirect-only (`/`) |
| `app/subscription/page.tsx` | Redirect-only (`/billing`) |
| `app/social/page.tsx` | Redirect-only (`/`) |

Also removed unused Asul logo font from [`app/layout.tsx`](../../../app/layout.tsx) and dropped `logoFontClassName` from root / legacy shells.

---

## Kept

| Path | Why |
|------|-----|
| `components/marketing/sections/HeroSection.tsx` | Marketing homepage hero |
| `components/WaitlistModal.tsx` | Dashboard waitlist |
| `components/ui/ViewSwitcherButton.tsx` | Dashboard view mode |
| `app/dashboard/**` | Product demo |
| `app/sensor&mascot/**` | Sensor / mascot page |
| `next.config.js` redirects + `middleware.ts` hash redirects | Legacy URL traffic |

---

## Replacements

| File | Change |
|------|--------|
| [`lib/mindmesh-legacy-routes.ts`](../../../lib/mindmesh-legacy-routes.ts) | `isMindmeshDashboardChromeRoute`, `isMindmeshOverlayRoute` |
| [`ConditionalOverlays.tsx`](../../../components/ConditionalOverlays.tsx) | Uses legacy overlay routes |
| [`DashboardFullBleedPortal.tsx`](../../../components/DashboardFullBleedPortal.tsx) | Dashboard chrome gate only |
| [`GlobalSiteFooter.tsx`](../../../components/layout/GlobalSiteFooter.tsx) | Dropped Hero scrollable hide path |
| [`LegacyAppShell.tsx`](../../../components/layout/LegacyAppShell.tsx) / [`RootAppShell.tsx`](../../../components/layout/RootAppShell.tsx) | No Logo / font prop |

---

## Acceptance criteria

- [x] `Hero.tsx` and `*Window.tsx` deleted
- [x] `mindmesh-hero-routes.ts` deleted; dashboard helpers live in `mindmesh-legacy-routes.ts`
- [x] Redirected Hero `app/*/page.tsx` stubs removed
- [x] Source grep clean for deleted modules
- [x] Redirects still 308 without page files
- [x] `/`, `/dashboard`, `/contact`, `/billing` return 200
- [x] `tsc --noEmit` passes
- [x] Marketing `HeroSection`, `WaitlistModal`, `ViewSwitcherButton` retained

---

## Verification

```text
308 /features → /#features
308 /docs → /faq
308 /app-directory → /connected-apps
308 /waitlist → /#cta
200 /, /dashboard, /contact, /billing
rg deleted modules → no source hits
tsc --noEmit → ok
verify-marketing-routes → ok
```

---

## Next steps

- **P6-T08:** Homepage LCP display-font / H1 strategy
- Optional: P6-T13 FAQ / privacy marketing shell
