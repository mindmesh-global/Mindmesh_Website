# P3-T15: Mobile Theater Scroll QA (`<md`)

**Task ID:** P3-T15  
**Status:** done  
**Type:** QA + CSS fix  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P3-T06–T08, P1-T15

---

## Goal

Verify product theaters meet P1-T15 mobile rules: **120vh** scroll wrappers, **60vh** sticky frames, readable content without horizontal scroll.

---

## Fix applied during QA

Tailwind arbitrary `min-h-[120vh]` classes on wrappers (defined in `lib/marketing-theater-scroll.ts`) were not applying reliably (`minHeight: 0px` in DevTools).

**Solution:** Moved vh dimensions to scoped CSS in [`app/globals.css`](../../../app/globals.css):

| Selector | Mobile (`<768px`) | Desktop (`≥768px`) |
|----------|------------------|-------------------|
| `[data-theater='connect'|'execute']` | `min-height: 120vh` | `220vh` |
| `[data-theater='focus']` | `120vh` | `240vh` |
| `.theater-sticky-frame` | `min-height: 60vh`, `max-height: 560px` | `70vh`, `720px` |

[`ProductFrame.tsx`](../../../components/marketing/theater/ProductFrame.tsx) uses `.theater-sticky-frame` class. [`TheaterScrollSection.tsx`](../../../components/marketing/theater/TheaterScrollSection.tsx) uses `relative` + CSS-driven wrapper height.

Values mirror [`THEATER_WRAPPER_VH`](../../../lib/marketing-theater-scroll.ts) and P1-T15 tables.

---

## Test environment

| Field | Value |
|-------|-------|
| **Date** | 2026-07-04 |
| **URL** | `http://localhost:3002/` |
| **Viewport** | 390 × 844 (iPhone-class, CDP mobile emulation) |
| **Breakpoint** | `<md` (768px) confirmed |
| **Reduce motion** | off |

---

## Results (all three theaters)

| Check | Connect | Focus | Execute | Pass? |
|-------|---------|-------|---------|-------|
| Wrapper `min-height` ≈ 120vh | 1013px (120vh) | 1013px | 1013px | **Yes** |
| Frame `min-height` ≈ 60vh | 506px (60vh) | 506px | 506px | **Yes** |
| Frame `position: sticky` | sticky | sticky | sticky | **Yes** |
| Horizontal overflow | none (390=390) | none | none | **Yes** |
| Sticky pins at ~80px while scrolling | observed at `top: 80px` | — | — | **Yes** |

Content readable: Connect 2-col app grid, Focus priority card, Execute draft/calendar/Jira stack all fit within frame width at 390px.

---

## iOS Safari note

Real **iOS Safari** not tested in this pass (CDP mobile emulation only). P1-T15 allows **static final frame fallback** if sticky jank appears on iOS. No jank observed in emulated mobile Chrome; reduced-motion path already bypasses sticky + tall wrapper ([P3-T12](./P3-T12-reduced-motion-qa.md)).

Re-test on physical iOS before Phase 4 if scroll animations are added.

---

## Checklist

- [x] Wrapper uses `min-h-[120vh]` on mobile (via CSS `120vh`)
- [x] Sticky frame `min-h-[60vh]`, readable without horizontal scroll
- [x] Fallback documented: static final frame via reduced motion; iOS re-test deferred

---

## Next steps

- **P3-T17:** Phase 4 entry doc
- **P3-T18:** Phase 3 sign-off
