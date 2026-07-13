# P4-T03: Wire Connect Demo into `ProductTheaterConnect`

**Task ID:** P4-T03  
**Status:** done  
**Type:** Integration  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P4-T02  
**Blocks:** P4-T12, P4-T13

---

## Goal

Replace the Phase 3 inline static app grid with scroll-driven `ConnectTheaterDemo` inside `TheaterScrollSection`.

---

## Change

[`ProductTheaterConnect.tsx`](../../../components/marketing/sections/ProductTheaterConnect.tsx)

**Before:** Inline `Image` grid mapping `CONNECTED_APP_FIXTURES_ACME` (static final frame only).

**After:**

```tsx
<TheaterScrollSection theaterId="connect" caption="...">
  <ConnectTheaterDemo />
</TheaterScrollSection>
```

Section copy, depth link, and `MarketingSection` wrapper unchanged per P1-T06.

---

## Checklist

- [x] `ConnectTheaterDemo` renders inside `TheaterScrollSection`
- [x] Removed inline static grid + unused imports
- [x] `#connect` anchor and section copy preserved
- [x] Reduced-motion caption still on `TheaterScrollSection`

---

## Next steps

- **P4-T04:** Focus theater marketing variants
- **P4-T12:** Re-run reduced-motion QA with animated Connect theater
