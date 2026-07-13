# P8-T14: Implement Legacy Redirect + Overlay Allowlist

**Task ID:** P8-T14  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [P8-T02](./P8-T02-legacy-redirect-plan.md)  
**Depends on:** P8-T02, P8-T08, P8-T10, P8-T12  
**Blocks:** P8-T19  
**Blocker:** Yes

---

## Goal

Replace the legacy `/sensor&mascot` product page with a hash-aware client redirect shim, drop the path from the overlay allowlist, and point internal links at `/sensor` and `/mascot`.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/sensor&mascot/page.tsx`](../../../app/sensor&mascot/page.tsx) | Minimal noindex shim + no-JS fallback links |
| [`components/marketing/LegacySensorMascotRedirect.tsx`](../../../components/marketing/LegacySensorMascotRedirect.tsx) | `#mascot` → `/mascot`; else → `/sensor` |
| Deleted | `app/sensor&mascot/sensor&mascot.module.css` |
| [`lib/mindmesh-legacy-routes.ts`](../../../lib/mindmesh-legacy-routes.ts) | `MINDMESH_OVERLAY_ROUTES = ['/dashboard']` only |
| [`components/layout/SiteFooter.tsx`](../../../components/layout/SiteFooter.tsx) | Links → `/sensor`, `/mascot` |
| [`components/dashboard/view-shells/DashboardDesktopShell.tsx`](../../../components/dashboard/view-shells/DashboardDesktopShell.tsx) | Links → `/sensor`, `/mascot` |
| [`next.config.js`](../../../next.config.js) | Comment: no competing config 308 for this path |

Sitemap / robots still exclude `/sensor&mascot` (P7-T11). No config 308 (preserves hash branching).

---

## Redirect matrix

| Browser URL | Final |
|-------------|-------|
| `/sensor&mascot` | `/sensor` |
| `/sensor&mascot#sensor` | `/sensor` |
| `/sensor&mascot#mascot` | `/mascot` |
| `/sensor&mascot#other` | `/sensor` |

---

## Overlay allowlist

| Path | Live overlays |
|------|----------------|
| `/dashboard` | Yes |
| `/sensor`, `/mascot` | No (scroll theaters; marketing funnel) |
| `/sensor&mascot` | Shim only; not in allowlist |

---

## Acceptance

- [x] Client shim + no-JS fallback  
- [x] Legacy CSS / product chrome removed  
- [x] Overlay allowlist dashboard-only  
- [x] Internal product links updated (footer + dashboard shell)  
- [x] No competing `next.config` 308  
- [x] Still noindex; not in funnel / sitemap  
- [x] `tsc --noEmit` clean  

---

## Handoff

| Next | Work |
|------|------|
| P8-T15 | Local demo assets check |
| P8-T16 | Theater QA |
| P8-T19 | Sign-off (legacy redirect checklist) |
