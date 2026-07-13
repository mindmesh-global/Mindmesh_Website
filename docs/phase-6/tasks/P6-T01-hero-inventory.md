# P6-T01: Inventory Remaining Hero Routes + Callers

**Task ID:** P6-T01  
**Status:** done  
**Type:** Inventory / documentation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P5-T15](../../phase-5/tasks/P5-T15-sign-off.md), [P1-T19](../../phase-1/tasks/P1-T19-deprecation-reuse.md)  
**Blocks:** P6-T02, P6-T03, P6-T04, P6-T06, P6-T07, P6-T12

---

## Goal

Document every live consumer of `Hero`, `*Window`, `MINDMESH_HERO_*`, and related legacy chrome. Produce a delete-order checklist for Phase 6.

---

## Verdict

| Finding | Detail |
|---------|--------|
| Pages that still mount `<Hero />` | **8** (all HTTP 200) |
| Stale list entry | `/` is still in `MINDMESH_HERO_COMPONENT_ROUTES` but `app/page.tsx` uses marketing `HeroSection`, not `Hero` |
| Window components | **7** files; **only imported by `Hero.tsx`** |
| Safe to delete after redirects + contact/waitlist migration | Hero, windows, DesktopNav, AnimatedBackground, SplitView (if unused), route config |
| Must keep | `WaitlistModal` (dashboard), `ViewSwitcherButton` (dashboard), marketing `HeroSection`, `/dashboard`, `/sensor&mascot` |

---

## A. Route config vs reality

Source: [`lib/mindmesh-hero-routes.ts`](../../../lib/mindmesh-hero-routes.ts)

### `MINDMESH_HERO_COMPONENT_ROUTES` (claimed Hero pages)

| Path | `page.tsx` mounts | Live? | Phase 6 disposition |
|------|-------------------|-------|---------------------|
| `/` | **Marketing** `HeroSection` (not `Hero`) | Yes | **P6-T06:** remove from list (stale) |
| `/features` | `<Hero />` | 200 | **P6-T02:** redirect → `/#features` |
| `/docs` | `<Hero />` | 200 | **P6-T02:** redirect → `/faq` |
| `/app-directory` | `<Hero />` | 200 | **P6-T02:** redirect → `/connected-apps` |
| `/demo` | `<Hero />` | 200 | **P6-T02:** redirect → `/` |
| `/subscription` | `<Hero />` | 200 | **P6-T02:** redirect → `/billing` |
| `/social` | `<Hero />` | 200 | **P6-T02:** redirect → `/` |
| `/contact` | `<Hero />` | 200 | **P6-T03:** plain marketing page, then drop from list |
| `/waitlist` | `<Hero />` | 200 | **P6-T04:** `/#cta` redirect or thin page |

### `MINDMESH_HERO_ROUTES` (= component routes + `/dashboard`)

| Path | Role | Phase 6 |
|------|------|---------|
| `/dashboard` | Product demo shell; uses `isMindmeshHeroRoute` for full-bleed portal | **Keep** (no redirect). May need a renamed helper after Hero deletion (P6-T06/T07) |

### Not in Hero lists (keep)

| Path | Notes |
|------|-------|
| `/sensor&mascot` | Dedicated mascot/sensor page; not Hero |
| Funnel depth (`/inbox`, …) | Marketing shell via `isMarketingRoute` |
| `/billing`, `/faq`, `/privacy` | Plain / SiteNav; not Hero |

---

## B. Direct `<Hero />` page callers

All follow the same pattern: `Suspense` + `import Hero from '@/components/Hero'`.

| File | Route |
|------|-------|
| [`app/features/page.tsx`](../../../app/features/page.tsx) | `/features` |
| [`app/docs/page.tsx`](../../../app/docs/page.tsx) | `/docs` |
| [`app/app-directory/page.tsx`](../../../app/app-directory/page.tsx) | `/app-directory` |
| [`app/demo/page.tsx`](../../../app/demo/page.tsx) | `/demo` |
| [`app/subscription/page.tsx`](../../../app/subscription/page.tsx) | `/subscription` |
| [`app/social/page.tsx`](../../../app/social/page.tsx) | `/social` |
| [`app/contact/page.tsx`](../../../app/contact/page.tsx) | `/contact` |
| [`app/waitlist/page.tsx`](../../../app/waitlist/page.tsx) | `/waitlist` |

**Not a Hero caller:** [`app/page.tsx`](../../../app/page.tsx) → `HeroSection` (marketing).

---

## C. `Hero.tsx` internal dependency graph

[`components/Hero.tsx`](../../../components/Hero.tsx) is the only importer of the window pack:

| Import | Path | Delete with Hero? |
|--------|------|-------------------|
| `FeaturesWindow` | `components/FeaturesWindow.tsx` | Yes |
| `DocsWindow` | `components/DocsWindow.tsx` | Yes |
| `SocialWindow` | `components/SocialWindow.tsx` | Yes |
| `PricingWindow` | `components/PricingWindow.tsx` | Yes |
| `ContactWindow` | `components/ContactWindow.tsx` | Yes (after P6-T03 extracts form if needed) |
| `AppDirectoryWindow` | `components/AppDirectoryWindow.tsx` | Yes |
| `MovieWindow` | `components/MovieWindow.tsx` | Yes |
| `DesktopNav` | `components/layout/DesktopNav.tsx` | Yes (Hero-only) |
| `AnimatedBackground` | `components/layout/AnimatedBackground.tsx` | Yes (Hero-only) |
| `WaitlistModal` | `components/WaitlistModal.tsx` | **No** (also used by dashboard) |
| `ViewSwitcherButton` | `components/ui/ViewSwitcherButton.tsx` | **No** (also used by `/dashboard`) |
| `mindmeshui` | `components/mindmeshui.tsx` | Likely yes if only windows use it; verify at P6-T07 |
| `SplitViewContext` | `context/SplitViewContext.tsx` | Likely yes if only Hero/windows |

Framer Motion drag/window chrome lives inside `Hero.tsx` (not marketing theaters).

---

## D. Callers of `mindmesh-hero-routes` helpers

| Consumer | API used | Why | Phase 6 action |
|----------|----------|-----|----------------|
| [`ConditionalOverlays.tsx`](../../../components/ConditionalOverlays.tsx) | `MINDMESH_HERO_ROUTES`, `isMindmeshHeroRoute` | Mascot/sensor only on “MindMesh pages”; hide overlays in desktop viewMode | Narrow list or replace with explicit allowlist (`/dashboard`, `/sensor&mascot` only) |
| [`DashboardFullBleedPortal.tsx`](../../../components/DashboardFullBleedPortal.tsx) | `isMindmeshHeroRoute` | Shows `DashboardDesktopShell` portal on Hero routes in `desktop` mode | Keep for `/dashboard`; stop treating legacy Hero URLs as portal hosts after redirects |
| [`Hero.tsx`](../../../components/Hero.tsx) | `isMindmeshHeroRoute` | Early-return placeholder when desktop viewMode | Goes away with Hero |
| [`Logo.tsx`](../../../components/Logo.tsx) | `isMindmeshHeroComponentRoute` | Maroon wordmark on scrollable Hero | Update after list shrinks |
| [`GlobalSiteFooter.tsx`](../../../components/layout/GlobalSiteFooter.tsx) | `isMindmeshHeroRoute` | Footer visibility on scrollable Hero | Update after list shrinks |

**Shell gate (already correct for funnel):** [`RootAppShell.tsx`](../../../components/layout/RootAppShell.tsx) uses `isMarketingRoute` (not Hero lists). Legacy providers only load via [`LegacyAppShell.tsx`](../../../components/layout/LegacyAppShell.tsx) for non-funnel paths (including all current Hero pages).

---

## E. Inbound links to Hero URLs (non-page)

| Source | Link | Note |
|--------|------|------|
| [`DesktopNav.tsx`](../../../components/layout/DesktopNav.tsx) | `/app-directory`, etc. | Dies with Hero |
| [`SiteNav.tsx`](../../../components/layout/SiteNav.tsx) | treats `/app-directory` as related to `/connected-apps` | Update active-href map in P6-T02/T06 |
| [`app/billing/page.tsx`](../../../app/billing/page.tsx) | `/features` | Point to `/#features` after redirect |
| [`app/faq/page.tsx`](../../../app/faq/page.tsx) | `/waitlist` | Point to `/#cta` after P6-T04 |
| [`BillingPlansClient.tsx`](../../../app/billing/BillingPlansClient.tsx) | `/waitlist` | Same |

---

## F. Delete-order checklist

Execute in this order (matches Phase 6 task IDs):

1. **P6-T01** (this doc) — inventory complete  
2. **P6-T02** — add redirects for `/features`, `/docs`, `/app-directory`, `/demo`, `/subscription`, `/social`  
3. **P6-T03** — rewrite `/contact` without Hero (extract form from `ContactWindow` if useful)  
4. **P6-T04** — retire `/waitlist` (redirect to `/#cta` preferred)  
5. **P6-T06** — shrink/rename `MINDMESH_HERO_*`; remove `/`; fix Logo / footer / overlays / portal gates  
6. **P6-T07** — delete files below; remove empty `app/*/page.tsx` that only existed for Hero (or leave redirect-only stubs if Next requires)  
7. Grep clean: `components/Hero`, `*Window`, `DesktopNav`, `AnimatedBackground`  
8. **P6-T12** can proceed in parallel after inventory (image config independent of Hero delete)

### Candidate delete set (P6-T07)

```text
components/Hero.tsx
components/FeaturesWindow.tsx
components/DocsWindow.tsx
components/SocialWindow.tsx
components/PricingWindow.tsx
components/ContactWindow.tsx
components/AppDirectoryWindow.tsx
components/MovieWindow.tsx
components/layout/DesktopNav.tsx
components/layout/AnimatedBackground.tsx
lib/mindmesh-hero-routes.ts   # or replace with dashboard-only helper
context/SplitViewContext.tsx  # if unused after Hero delete
components/mindmeshui.tsx     # if unused after window delete
```

### Do not delete

```text
components/marketing/sections/HeroSection.tsx
components/WaitlistModal.tsx
components/ui/ViewSwitcherButton.tsx
components/dashboard/** (product demo)
app/dashboard/**
app/sensor&mascot/**
```

---

## G. Provider / overlay notes for P6-T06

After Hero pages are gone, `LegacyAppShell` still wraps:

- `/dashboard`
- `/sensor&mascot`
- `/billing`, `/faq`, `/privacy`, `/terms`, … (non-funnel)

`ConditionalOverlays` today treats **all** `MINDMESH_HERO_ROUTES` as mascot/sensor pages. Post-cleanup recommendation:

- Allow overlays only on `/sensor&mascot` (and optionally never on `/dashboard` desktop portal)
- Stop using the Hero route list as a proxy for “MindMesh chrome pages”

---

## Acceptance criteria

- [x] All `MINDMESH_HERO_*` paths classified (live Hero vs stale vs keep)
- [x] All `app/**` files importing `Hero` listed
- [x] Window + chrome dependency graph documented
- [x] Callers of route helpers listed with Phase 6 actions
- [x] Delete-order checklist written
- [x] Keep vs delete sets explicit

---

## Next steps

- **P6-T02:** Implement redirects in `next.config.js`
- **P6-T03 / P6-T04:** Contact + waitlist (block Hero deletion)
- Then **P6-T06 → P6-T07**
