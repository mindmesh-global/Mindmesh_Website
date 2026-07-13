# P4-T08: `MarketingDraftPanel` + Scroll-Scrubbed Typing

**Task ID:** P4-T08  
**Status:** done  
**Type:** New component + TypingText extension  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P3-T11, [P1-T08](../../phase-1/tasks/P1-T08-theater-execute.md)  
**Blocks:** P4-T10

---

## Goal

Gmail compose chrome with draft body typed via scroll progress (Execute beat 0.22–0.50), not an independent timer.

---

## Implementation

### `MarketingDraftPanel`

[`components/marketing/theater/marketing/MarketingDraftPanel.tsx`](../../../components/marketing/theater/marketing/MarketingDraftPanel.tsx)

| Prop | Default | Purpose |
|------|---------|---------|
| `draft` | `DRAFT_FIXTURE_ACME` | To, subject, body |
| `scrollProgress` | — | Drives char index via `getExecuteDraftCharIndex` |
| `charIndex` | — | Explicit override for static/testing |
| `opacity` | `1` | Panel fade for P4-T10 |

UI: Gmail icon header, To/Subject fields, compose body with blinking cursor during scrub.

### `TypingText` extension

[`components/ui/TypingText.tsx`](../../../components/ui/TypingText.tsx)

New optional prop `charIndex?: number`. When set, renders `text.slice(0, charIndex)` with cursor and **no timer** (scroll-scrubbed mode). Timer-based behavior unchanged when `charIndex` is omitted.

### Helpers

- `getExecuteDraftCharIndex(progress, text)` in [`marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts)
- `DraftFixture` type exported from [`marketing-demo-data.ts`](../../../lib/marketing-demo-data.ts)
- Fixed `getScrollSyncedCharIndex` to return `0` when beat/text missing (was incorrectly returning full length)

---

## Beat mapping (P1-T08)

| Progress | Behavior |
|----------|----------|
| < 0.22 | `charIndex = 0` (empty body) |
| 0.22–0.50 | Characters reveal proportionally |
| ≥ 0.50 | Full draft body visible |

---

## Checklist

- [x] Gmail compose chrome (marketing dark theme)
- [x] `DRAFT_FIXTURE_ACME` wired
- [x] Scroll-scrubbed typing via `charIndex` / `scrollProgress`
- [x] Timer-based `TypingText` unchanged for tooltips
- [ ] Composed in `ExecuteTheaterDemo` (P4-T10)

---

## Next steps

- **P4-T10:** `ExecuteTheaterDemo` composes draft + calendar + Jira + success panels
