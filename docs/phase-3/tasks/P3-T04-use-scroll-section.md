# P3-T04: `useScrollSection` Hook

**Task ID:** P3-T04  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P3-T01, P3-T03, P1-T06–08  
**Blocks:** P3-T05, P3-T06–T08, P3-T13

---

## Quick reference

| Field | Value |
|-------|-------|
| **Hook** | [`hooks/useScrollSection.ts`](../../../hooks/useScrollSection.ts) |
| **Context** | [`components/marketing/theater/TheaterScrollContext.tsx`](../../../components/marketing/theater/TheaterScrollContext.tsx) |
| **Scroll offset** | `['start start', 'end start']` (default) |

---

## API

```tsx
const { ref, progress, step, isInView, isPaused } = useScrollSection({
  theaterId: 'connect',
});
```

| Return | Type | Description |
|--------|------|-------------|
| `ref` | `RefObject<HTMLDivElement>` | Attach to scroll wrapper |
| `progress` | `number` 0–1 | Pinned to reduced-motion final when applicable |
| `step` | `number` | Beat index via `getTheaterStep` |
| `isInView` | `boolean` | `IntersectionObserver` |
| `isPaused` | `boolean` | `!isInView` or reduced motion |

---

## Behavior

| Condition | Progress | Updates |
|-----------|----------|---------|
| Scrolling in view | `scrollYProgress` from Framer | Live |
| Off-screen | Last in-view value | Frozen (`isPaused`) |
| Reduced motion | `REDUCED_MOTION_FINAL_PROGRESS[theaterId]` | Pinned (`isPaused`) |

---

## State passing (P3-T05)

**Choice:** React context via `TheaterScrollProvider`.

`TheaterScrollSection` will call `useScrollSection`, attach `ref` to wrapper, and wrap `ProductFrame` children in `TheaterScrollProvider`. Phase 4 animation components use `useTheaterScroll()`.

---

## Acceptance criteria

- [x] Framer Motion `useScroll` on wrapper ref
- [x] `IntersectionObserver` for `isInView`
- [x] `isPaused` when off-screen or reduced motion
- [x] Reduced motion pins progress from P3-T01 constants
- [x] Returns `{ ref, progress, step, isInView, isPaused }`

---

## Next step

**P3-T05:** `TheaterScrollSection` composes hook + `ProductFrame` + context provider.
