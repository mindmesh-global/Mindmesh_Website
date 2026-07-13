# P4-T06: `FocusTheaterDemo` + Beat Animation

**Task ID:** P4-T06  
**Status:** done  
**Type:** Client component + scroll animation  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P4-T04, P4-T05  
**Blocks:** P4-T07

---

## Goal

Client component composing inbox, calendar, signal chips, and priority card with full Focus beat sheet (P1-T07).

---

## Implementation

### `FocusTheaterDemo`

[`components/marketing/theater/demos/FocusTheaterDemo.tsx`](../../../components/marketing/theater/demos/FocusTheaterDemo.tsx)

- Reads `progress`, `step`, `isPaused` from `useTheaterScroll()`
- Composes:
  - `StaticInboxList` + `StaticCalendarEvents` (marketing, 50/50 grid)
  - `MarketingSignalChips` (overlay on inbox)
  - `MarketingPriorityCard` (bottom overlay on emerge)

### Scroll helpers

[`getFocusVisualStateFromProgress`](../../../lib/marketing-theater-scroll.ts) in `lib/marketing-theater-scroll.ts`:

| Progress | Beat | Visual state |
|----------|------|--------------|
| 0.00–0.18 | Noisy panels | Full-opacity inbox + calendar |
| 0.18–0.35 | Signal chips | Chips fade/slide in (`translateY` + `opacity`) |
| 0.35–0.50 | Cross-highlight | `highlightIds`: `dana`, `client-call`, `jira-prod-142` |
| 0.50–0.65 | Priority emerge | Background → 0.35 opacity; card scale 0.92→1 |
| 0.65–0.85 | Priority hold | Full card + emphasized ring + CTA |
| 0.85–1.00 | Final | Background ghost (0.12); "Your one focus." label |

Also exported: `FOCUS_CROSS_HIGHLIGHT_IDS`, `FocusVisualState`.

Animation uses **transform and opacity only**. Pause when `isPaused` (progress frozen). Reduced motion jumps to progress **0.85** via `useScrollSection`.

---

## Layout

```
┌─────────────────────────────────┐
│  Inbox (left)  │  Calendar (right) │
│  [signal chips overlay]          │
│                                  │
│     [ Priority card overlay ]    │
└─────────────────────────────────┘
```

---

## Checklist

- [x] `FocusTheaterDemo` client component
- [x] Full P1-T07 beat sheet via scroll helpers
- [x] Composes P4-T04 + P4-T05 components
- [x] `transform` / `opacity` only
- [x] Pauses when `isPaused`
- [x] Wired into `ProductTheaterFocus` (P4-T07)

---

## Next steps

- **P4-T07:** Replace inline priority stub in `ProductTheaterFocus`
