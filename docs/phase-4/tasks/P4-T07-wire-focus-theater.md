# P4-T07: Wire Focus Demo into `ProductTheaterFocus`

**Task ID:** P4-T07  
**Status:** done  
**Type:** Integration  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P4-T06  
**Blocks:** P4-T12, P4-T13

---

## Goal

Replace the Phase 3 inline priority stub with scroll-driven `FocusTheaterDemo` inside `TheaterScrollSection`.

---

## Change

[`ProductTheaterFocus.tsx`](../../../components/marketing/sections/ProductTheaterFocus.tsx)

**Before:** Static `MarketingPriorityCard`-style markup with `PRIORITY_FIXTURE_ACME` only.

**After:**

```tsx
<TheaterScrollSection theaterId="focus" caption="...">
  <FocusTheaterDemo />
</TheaterScrollSection>
```

Section copy, depth link, and `MarketingSection` wrapper unchanged per P1-T07.

---

## Checklist

- [x] `FocusTheaterDemo` renders inside `TheaterScrollSection`
- [x] Removed inline priority stub + unused fixture import
- [x] `#focus` anchor and section copy preserved
- [x] Reduced-motion caption still on `TheaterScrollSection`

---

## Next steps

- **P4-T08:** Execute theater draft panel
- **P4-T12:** Re-run reduced-motion QA with animated Focus theater
