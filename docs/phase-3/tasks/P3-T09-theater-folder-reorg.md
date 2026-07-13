# P3-T09: `components/marketing/theater/` Folder Reorg

**Task ID:** P3-T09  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P3-T02, P3-T05

---

## Summary

Consolidated scroll kit UI under `components/marketing/theater/` with a barrel export. Removed the Phase 2 legacy re-export at `components/marketing/ProductFrame.tsx`.

---

## Changes

| Action | Path |
|--------|------|
| Added | [`components/marketing/theater/index.ts`](../../../components/marketing/theater/index.ts) |
| Deleted | `components/marketing/ProductFrame.tsx` (re-export only) |
| Updated | `ProductTheaterConnect.tsx`, `ProductTheaterFocus.tsx`, `ProductTheaterExecute.tsx` |
| Updated | `TheaterScrollSection.tsx` (relative imports within `theater/`) |

---

## Barrel exports

```ts
export { ProductFrame, type ProductFrameProps } from './ProductFrame';
export { TheaterScrollSection, type TheaterScrollSectionProps } from './TheaterScrollSection';
export { TheaterScrollProvider, useTheaterScroll, useOptionalTheaterScroll } from './TheaterScrollContext';
```

Hooks (`useScrollSection`, `usePrefersReducedMotion`) remain in `hooks/` per [phase-3-scroll-kit.md](../phase-3-scroll-kit.md).

---

## Import convention

Theater sections import from the barrel:

```tsx
import { TheaterScrollSection } from '@/components/marketing/theater';
```

Phase 4 frame content may use:

```tsx
import { useTheaterScroll } from '@/components/marketing/theater';
```

---

## Acceptance criteria

- [x] No duplicate `ProductFrame` implementations
- [x] All theater sections import from `theater/`

---

## Next steps

- **P3-T10:** Verify Framer Motion only in theater chunks
- **P3-T11:** Step index helpers + demo-data coupling
