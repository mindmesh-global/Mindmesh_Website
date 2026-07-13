# P6-T06: Clean Stale Hero Route Lists

**Task ID:** P6-T06  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P6-T02](./P6-T02-legacy-hero-redirects.md), [P6-T03](./P6-T03-contact-marketing-page.md), [P6-T04](./P6-T04-waitlist-retirement.md)  
**Blocks:** P6-T07

---

## Goal

Stop treating marketing (and retired Hero) paths as Hero chrome hosts. Remove `/` and other stale entries from `MINDMESH_HERO_*`. Keep `/dashboard` full-bleed / view-mode behavior intentional. Point overlays at an explicit allowlist.

---

## Deliverables

| File | Change |
|------|--------|
| [`lib/mindmesh-hero-routes.ts`](../../../lib/mindmesh-hero-routes.ts) | Empty `MINDMESH_HERO_COMPONENT_ROUTES`; `MINDMESH_HERO_ROUTES` = `/dashboard` only; add `MINDMESH_OVERLAY_ROUTES` + `isMindmeshOverlayRoute` |
| [`ConditionalOverlays.tsx`](../../../components/ConditionalOverlays.tsx) | Gate mascot/sensor on overlay routes, not Hero list |

No changes required in `Logo`, `GlobalSiteFooter`, `DashboardFullBleedPortal`, or `Hero` (they already call the helpers).

---

## Before → after

| List / helper | Before | After |
|---------------|--------|-------|
| `MINDMESH_HERO_COMPONENT_ROUTES` | `/`, features, docs, app-directory, demo, subscription, social, contact, waitlist | `[]` |
| `MINDMESH_HERO_ROUTES` | component routes + `/dashboard` | `/dashboard` only |
| Overlay allowlist | Same as `MINDMESH_HERO_ROUTES` | `/dashboard`, `/sensor&mascot` |
| Marketing `/` | Stale Hero list entry | Not listed; marketing shell via `isMarketingRoute` |

---

## Caller impact

| Consumer | Behavior after P6-T06 |
|----------|------------------------|
| `DashboardFullBleedPortal` | Portal only on `/dashboard` |
| `ConditionalOverlays` | Mascot/sensor only on `/dashboard` and `/sensor&mascot`; still hidden in desktop viewMode on Hero routes (`/dashboard`) |
| `Logo` | Floating maroon wordmark never shows (`COMPONENT_ROUTES` empty) |
| `GlobalSiteFooter` | Hero scrollable hide path unused for deleted routes; `/` and `/dashboard` still early-return |
| `Hero.tsx` | Desktop placeholder only if somehow on `/dashboard` (dashboard does not mount Hero); removed in P6-T07 |

---

## Acceptance criteria

- [x] `/` removed from Hero component routes
- [x] Redirected + migrated paths (`/features`, `/contact`, `/waitlist`, …) removed from Hero lists
- [x] `/dashboard` remains in `MINDMESH_HERO_ROUTES`
- [x] Overlays no longer keyed off the full Hero list
- [x] Marketing funnel paths never appear in Hero / overlay lists
- [x] Typecheck passes

---

## Verification

```text
MINDMESH_HERO_COMPONENT_ROUTES = []
MINDMESH_HERO_ROUTES includes only /dashboard
MINDMESH_OVERLAY_ROUTES = /dashboard, /sensor&mascot
tsc --noEmit → ok
```

---

## Next steps

- **P6-T07:** Delete `Hero.tsx`, `*Window.tsx`, related chrome, and this module (or fold dashboard helpers into a dashboard-only file)
