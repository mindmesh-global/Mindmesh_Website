# P4-T11: Wire Execute Demo into `ProductTheaterExecute`

**Task ID:** P4-T11  
**Status:** done  
**Type:** Integration  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P4-T10  
**Blocks:** P4-T12, P4-T13

---

## Goal

Replace the Phase 3 inline static stub with scroll-driven `ExecuteTheaterDemo` inside `TheaterScrollSection`.

---

## Change

[`ProductTheaterExecute.tsx`](../../../components/marketing/sections/ProductTheaterExecute.tsx)

**Before:** Static markup with priority, draft, calendar, Jira, and success fixtures.

**After:**

```tsx
<TheaterScrollSection theaterId="execute" caption="...">
  <ExecuteTheaterDemo />
</TheaterScrollSection>
```

Section copy, depth links, and `MarketingSection` wrapper unchanged per P1-T08.

---

## Checklist

- [x] `ExecuteTheaterDemo` renders inside `TheaterScrollSection`
- [x] Removed inline static stub + unused fixture imports
- [x] `#execute` anchor and section copy preserved
- [x] Reduced-motion caption still on `TheaterScrollSection`
- [x] Depth links to `/inbox` and `/upcoming-events` preserved

---

## Next steps

- **P4-T12:** Reduced-motion QA across all three animated theaters
- **P4-T13:** Off-screen pause + perf spot-check
