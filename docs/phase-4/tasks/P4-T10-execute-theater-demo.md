# P4-T10: `ExecuteTheaterDemo` + Beat Animation

**Task ID:** P4-T10  
**Status:** done  
**Type:** Client component + scroll animation  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P4-T05, P4-T08, P4-T09  
**Blocks:** P4-T11

---

## Goal

Client component composing priority carry-over, draft typing, calendar block, Jira row, and success banner with full Execute beat sheet (P1-T08).

---

## Implementation

### `ExecuteTheaterDemo`

[`components/marketing/theater/demos/ExecuteTheaterDemo.tsx`](../../../components/marketing/theater/demos/ExecuteTheaterDemo.tsx)

- Reads `progress`, `step`, `isPaused` from `useTheaterScroll()`
- Composes:
  - `MarketingPriorityCard` (compact, Focus carry-over)
  - `MarketingDraftPanel` (scroll-scrubbed typing)
  - `MarketingCalendarBlock` (slide-in)
  - `MarketingJiraRow` (checkbox check)
  - `MarketingExecuteSuccess` (banner + done chips)

### Scroll helpers

[`getExecuteVisualStateFromProgress`](../../../lib/marketing-theater-scroll.ts) in `lib/marketing-theater-scroll.ts`:

| Progress | Beat | Visual state |
|----------|------|--------------|
| 0.00–0.12 | Priority pinned | Compact card + "Your priority." label |
| 0.12–0.22 | CTA pulse | "MindMesh acts →" + scale pulse |
| 0.22–0.50 | Draft typing | Draft panel cross-fades in; scroll-scrubbed chars |
| 0.50–0.68 | Calendar block | Calendar slides in; draft cross-fades out |
| 0.68–0.82 | Jira check | Jira row cross-fades in; checkbox animates |
| 0.82–0.92 | Success banner | Green check on priority; success fades in |
| 0.92–1.00 | Hold | All panels stacked (draft + calendar + Jira + success) |

Also exported: `ExecuteVisualState`, panel cross-fade via `executePanelFade`.

Animation uses **transform and opacity only**. Pause when `isPaused` (progress frozen). Reduced motion jumps to progress **0.92** via `useScrollSection`.

---

## Layout

```
┌─────────────────────────────────┐
│  [Your priority.]               │
│  Priority card (compact)        │
│  MindMesh acts → (pulse beat)   │
│                                 │
│  [ Action slot: cross-fade ]    │
│    draft → calendar → jira      │
│    success banner (bottom)      │
│                                 │
│  OR hold stack (0.92+):         │
│    draft + calendar + jira +    │
│    success (vertical)           │
└─────────────────────────────────┘
```

---

## Checklist

- [x] `ExecuteTheaterDemo` client component
- [x] Full P1-T08 beat sheet via scroll helpers
- [x] Composes P4-T05, P4-T08, P4-T09 components
- [x] `transform` / `opacity` only
- [x] Pauses when `isPaused`
- [x] Hold stack shows all three completed actions at 0.92+
- [x] Wired into `ProductTheaterExecute` (P4-T11)

---

## Next steps

- **P4-T11:** Replace inline stub in `ProductTheaterExecute` with `<ExecuteTheaterDemo />`
