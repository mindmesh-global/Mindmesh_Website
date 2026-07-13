# P3-T03: `usePrefersReducedMotion` Hook

**Task ID:** P3-T03  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P1-T06–08  
**Blocks:** P3-T04, P3-T12

---

## Quick reference

| Field | Value |
|-------|-------|
| **Hook** | [`hooks/usePrefersReducedMotion.ts`](../../../hooks/usePrefersReducedMotion.ts) |
| **Media query** | `(prefers-reduced-motion: reduce)` |
| **SSR default** | `false` (motion allowed until client hydrates) |

---

## Implementation

Uses React `useSyncExternalStore` to subscribe to `matchMedia` changes without hydration mismatch.

| Behavior | Detail |
|----------|--------|
| Returns `true` | OS "Reduce motion" enabled |
| Listens | `change` on media query list |
| SSR / first paint | `false` via `getServerSnapshot` |
| Client | Reads live `matchMedia(...).matches` |

---

## Consumers (planned)

| Consumer | Usage |
|----------|-------|
| `useScrollSection` (P3-T04) | Pin progress to `REDUCED_MOTION_FINAL_PROGRESS` |
| Theater sections (P3-T12 QA) | Static final frame without scroll animation |

Pair with [`getReducedMotionFinalProgress`](../lib/marketing-theater-scroll.ts) from P3-T01.

---

## Acceptance criteria

- [x] Returns `true` when `(prefers-reduced-motion: reduce)`
- [x] Listens for media query changes on client
- [x] SSR-safe default documented (`false`)

---

## Next step

**P3-T04:** `useScrollSection` consumes this hook for `isPaused` and pinned progress.
