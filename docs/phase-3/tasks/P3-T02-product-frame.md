# P3-T02: Upgrade Sticky `ProductFrame`

**Task ID:** P3-T02  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P2-T08, P1-T15, P1-T16, P3-T01  
**Blocks:** P3-T05, P3-T06–T08

---

## Quick reference

| Field | Value |
|-------|-------|
| **Component** | [`components/marketing/theater/ProductFrame.tsx`](../../../components/marketing/theater/ProductFrame.tsx) |
| **Re-export** | [`components/marketing/ProductFrame.tsx`](../../../components/marketing/ProductFrame.tsx) |
| **Sticky top** | `THEATER_STICKY_TOP_PX` (80px) from P3-T01 |

---

## P1-T15 dimensions

| Property | Desktop | Mobile |
|----------|---------|--------|
| `position` | `sticky` | `sticky` |
| `top` | 80px | 80px |
| Min height | 70vh | 60vh |
| Max height | 720px | 560px |
| Padding (inner) | `p-8` (`md:p-8`) | `p-4` |
| Border / surface | `--mm-border` / `--mm-surface-raised` | same |
| Radius | `rounded-lg` | same |

Tailwind mapping: `bg-mm-surface-container-high` (`#0f1e3f`), `border-mm-outline-variant` (`#364770`).

---

## API

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `children` | `ReactNode` | required | Demo content inside frame |
| `caption` | `string?` | — | Text below frame |
| `sidebar` | `ReactNode?` | — | Connect left rail (Phase 4) |
| `sticky` | `boolean` | `true` | Toggle sticky chrome |
| `className` | `string?` | — | Outer wrapper |

---

## Acceptance criteria

- [x] Sticky `top: 80px` via `THEATER_STICKY_TOP_PX`
- [x] Min/max heights per P1-T15 (60/70vh, 560/720px)
- [x] Marketing tokens only (`mm-surface-container-high`, `mm-outline-variant`)
- [x] Existing theater sections import unchanged path (`@/components/marketing/ProductFrame`)
- [x] Optional `sidebar` slot for Connect theater

---

## Next step

**P3-T05:** `TheaterScrollSection` composes sticky `ProductFrame` inside scroll wrapper.
