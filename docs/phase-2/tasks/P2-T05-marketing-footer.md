# P2-T05: Build `MarketingFooter`

**Task ID:** P2-T05  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-03  
**Parent:** [phase-2-tasks.md](../phase-2-tasks.md)  
**Depends on:** [P2-T03](./P2-T03-marketing-layout.md)  
**Blocks:** none

---

## Quick reference

| Field | Value |
|-------|-------|
| **File** | [`components/marketing/MarketingFooter.tsx`](../../../components/marketing/MarketingFooter.tsx) |
| **Container** | `max-w-[1120px] px-6` ([P1-T15](../phase-1/tasks/P1-T15-layout-rules.md)) |
| **Replaces on `/`** | `GlobalSiteFooter` (via P2-T06 root layout branch) |

---

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  MindMesh                    Security  Privacy  Terms   │
│  The cognitive layer...      Contact                    │
│  © 2026 MindMesh. Vansh Group.                          │
└─────────────────────────────────────────────────────────┘
```

| Region | Content |
|--------|---------|
| **Brand column** | Wordmark, one-line tagline, copyright |
| **Link row** | Security, Privacy, Terms, Contact |

**Desktop:** two columns (`md:flex-row`). **Mobile:** stacked.

---

## Links (locked)

| Label | Route |
|-------|-------|
| Security | `/security` |
| Privacy | `/privacy` |
| Terms | `/terms` |
| Contact | `/contact` |

All internal `next/link` routes. No mascot, sensor, or social links on marketing homepage footer ([P1-T19](../phase-1/tasks/P1-T19-deprecation-reuse.md)).

---

## Styling

| Token | Usage |
|-------|-------|
| `bg-mm-background` | Footer canvas |
| `border-mm-outline-variant` | Top border |
| `text-mm-on-surface-variant` | Tagline, copyright, links |
| `text-mm-primary` | Link hover |
| `font-display` | MindMesh wordmark |
| `py-12 lg:py-16` | Footer vertical padding (lighter than section `py-24`) |

---

## vs legacy `SiteFooter`

| | `SiteFooter` | `MarketingFooter` |
|---|--------------|-------------------|
| Theme | Navy inline styles | `--mm-*` tokens |
| Columns | 6-col grid + Product/Social | Minimal 2-region |
| Mascot/Sensor links | Yes | **No** |
| Width | 1440px | 1120px |

---

## Acceptance criteria checklist

- [x] Renders inside `MarketingLayout` below `<main>`
- [x] Privacy, Terms, Contact, Security links
- [x] Copyright line
- [x] No mascot
- [x] Marketing tokens + `max-w-[1120px] px-6`

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Marketing footer approved | 2026-07-03 |

**P2-T05 status:** Done. Proceed to [P2-T06](./P2-T06-root-layout-marketing-branch.md).

---

## Downstream handoff

| Task | Note |
|------|------|
| P2-T06 | Hide `GlobalSiteFooter` on `/` via [`RootAppShell`](../../../components/layout/RootAppShell.tsx) |
| P2-T07 | Footer included via `MarketingLayout` |
