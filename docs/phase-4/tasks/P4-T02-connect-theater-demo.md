# P4-T02: `ConnectTheaterDemo` + Beat Animation

**Task ID:** P4-T02  
**Status:** done  
**Type:** Client component + scroll animation  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P4-T01, P3-T11  
**Blocks:** P4-T03

---

## Goal

Client component that consumes `useTheaterScroll` progress and drives the Connect beat sheet (0→1) via `StaticConnectedApps` marketing variant.

---

## Implementation

### `ConnectTheaterDemo`

[`components/marketing/theater/demos/ConnectTheaterDemo.tsx`](../../../components/marketing/theater/demos/ConnectTheaterDemo.tsx)

- Reads `progress`, `step`, `isPaused` from `useTheaterScroll()`
- Renders `<StaticConnectedApps variant="marketing" scrollProgress={progress} />`
- QA attrs: `data-connect-theater-demo`, `data-connect-theater-paused`, `data-connect-theater-step`

Exported from [`theater/index.ts`](../../../components/marketing/theater/index.ts).

### Scroll-scrub helpers

Added to [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts):

| Helper | Beat | Effect |
|--------|------|--------|
| `getConnectCardMotion(progress, index, total)` | Fly-in 0.15–0.55 | Per-card `opacity` + `translateY(12px→0)` |
| `getConnectBadgeOpacity(progress)` | Badges 0.55–0.75 | Badge fade-in |
| `getConnectSyncBannerOpacity(progress)` | Banner 0.75–0.90 | Sync banner fade-in |

### `StaticConnectedApps` extension

New prop: `scrollProgress?: number`. When set, marketing panel uses scroll-scrub helpers instead of discrete step props. Animation uses **transform and opacity only** (`will-change` on cards during scrub).

### Pause behavior

When `isPaused` (off-screen or reduced motion), `useScrollSection` stops updating `progress`, so the demo holds the last frame. Reduced motion jumps to progress **0.90** (final connected state).

---

## Beat sheet coverage

| Progress | UI state | Driver |
|----------|----------|--------|
| 0.00–0.15 | Empty panel, Add App highlight | `showEmpty` |
| 0.15–0.55 | 7-app stagger fly-in | `getConnectCardMotion` |
| 0.55–0.75 | Connected badges fade in | `getConnectBadgeOpacity` |
| 0.75–0.90 | Sync banner fade in | `getConnectSyncBannerOpacity` |
| 0.90–1.00 | Hold final state | All at 1 |

---

## Checklist

- [x] `ConnectTheaterDemo` client component
- [x] `useTheaterScroll` + `scrollProgress` wiring
- [x] Full beat sheet 0→1
- [x] `transform` / `opacity` only
- [x] Pauses when `isPaused` (progress frozen)
- [x] Wired into `ProductTheaterConnect` (P4-T03)

---

## Next steps

- **P4-T03:** Replace inline grid in `ProductTheaterConnect` with `<ConnectTheaterDemo />`
