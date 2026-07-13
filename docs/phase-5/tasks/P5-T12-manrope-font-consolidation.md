# P5-T12: Manrope Font Consolidation

**Task ID:** P5-T12  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T02](./P5-T02-marketing-depth-layout.md), [P2-T02](../../phase-2/tasks/P2-T02-manrope-font.md)  
**Blocks:** P5-T13, P5-T15

---

## Goal

Load Manrope once from root `app/layout.tsx` (`--font-manrope`). Remove remaining per-page `Manrope` `@next/font` imports.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/billing/page.tsx`](../../../app/billing/page.tsx) | Dropped local Manrope; CSS module uses root `var(--font-manrope)` |
| [`app/faq/page.tsx`](../../../app/faq/page.tsx) | Dropped local Manrope; `font-display` on page shell |
| [`app/sensor&mascot/page.tsx`](../../../app/sensor&mascot/page.tsx) | Dropped local Manrope; `font-display` on page shell |

**Already clean (P5-T03–T08):** `/inbox`, `/trust`, `/security`, `/upcoming-events`, `/yesterdays-narrative`, `/connected-apps`

**Root source of truth:** [`app/layout.tsx`](../../../app/layout.tsx) Manrope 600/700 → `--font-manrope` on `<html>`

---

## Before → after

| Page | Before | After |
|------|--------|-------|
| Billing | Local Manrope 300–800 + `manrope.variable` | Root var only |
| FAQ | Local Manrope 200–800 + `manrope.className` | `font-display` |
| Sensor & Mascot | Local Manrope 200–800 + `manrope.className` | `font-display` |

---

## Acceptance criteria

- [x] No `Manrope(` / `from 'next/font/google'` Manrope imports outside `app/layout.tsx`
- [x] Funnel depth pages already use root fonts via `MarketingDepthLayout`
- [x] Billing CSS continues to resolve `var(--font-manrope)` from root
- [x] FAQ and Sensor pages render without local font loader
- [x] Typecheck clean

---

## Verification

```text
rg "Manrope\\(|from 'next/font/google'" app --glob '*.tsx'
→ only app/layout.tsx defines Manrope
200 /faq /billing
```

---

## Next steps

- **P5-T13:** Depth page token migration
