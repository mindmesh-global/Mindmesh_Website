# P8-T06: Lock Mascot Theater Beat Sheet

**Task ID:** P8-T06  
**Status:** done  
**Type:** Strategy / documentation (code in P8-T07 + P8-T11)  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T03](./P8-T03-copy-decks.md), [P8-T04](./P8-T04-content-module.md), [P1-T07](../../phase-1/tasks/P1-T07-theater-focus.md) format  
**Blocks:** P8-T07, P8-T11  
**Blocker:** Yes

---

## Quick reference

| Field | Value |
|-------|-------|
| Theater id | `mascot` |
| Story | Companion ready → user ask → typing → grounded reply → Open inbox → hold |
| Wrapper | `min-h-[240vh]` desktop · `min-h-[120vh]` mobile |
| Sticky frame | Same as homepage theaters (`ProductFrame`) |
| Reduced-motion jump | **0.88** (start of `mascot-hold`) |
| Caption | Mascot answers from your connected inbox context in one calm thread. |
| User ask | `Did I get any emails today?` |
| Secondary control | Open inbox → `/inbox` |
| Persona | Acme / Alex |
| Fixtures module | [`MASCOT_THEATER_FIXTURES`](../../../lib/marketing-sensor-mascot-content.ts) |

Copy source: [P8-T03](./P8-T03-copy-decks.md). This task freezes **progress numbers**, **reply chunking**, and **helper contracts**.

---

## Locked progress steps (`MASCOT_PROGRESS_STEPS`)

Implement as `TheaterProgressStep[]` in [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts) (P8-T07).

| index | id | progressStart | progressEnd | UI state | Motion |
|------:|----|--------------:|------------:|----------|--------|
| 0 | `mascot-idle` | 0.00 | 0.10 | Chat shell empty / companion ready | Shell at rest |
| 1 | `mascot-user-ask` | 0.10 | 0.28 | User bubble with ask text | `translateY(8px→0)` + `opacity 0→1` |
| 2 | `mascot-typing` | 0.28 | 0.55 | Assistant typing indicator (3 dots) | Opacity pulse only |
| 3 | `mascot-reply` | 0.55 | 0.78 | Reply reveals in 3 paragraphs | Staged paragraph `opacity` (see chunking) |
| 4 | `mascot-action` | 0.78 | 0.88 | Secondary control: Open inbox | Button `opacity 0→1` |
| 5 | `mascot-hold` | 0.88 | 1.00 | Full thread + button held | Static |

**Adjustment vs early draft:** Hold starts at **0.88** (was 0.92) so reduced-motion jump equals the hold beat start, matching Sensor’s 0.90 pattern. Action is shortened to `0.78–0.88`.

**Invariants**

- Steps are contiguous; last step ends at `1.0`.
- `getTheaterStep('mascot', progress)` returns the active `index`.
- Reduced motion pins progress to **0.88**: full ask, full reply, Open inbox visible.

---

## Fixtures (from P8-T04)

| Field | Value |
|-------|-------|
| User ask | `Did I get any emails today?` |
| Reply P1 | Yes. You received 12 emails today. |
| Reply P2 | Breakdown: 7 work, 3 personal, 2 newsletters. |
| Reply P3 | Review all 12 in your MindMesh inbox. |
| `replyBody` | Paragraphs joined with blank lines (for optional char scrub) |
| Secondary | `{ label: 'Open inbox', href: '/inbox' }` |
| Caption | Mascot answers from your connected inbox context in one calm thread. |

Do not use legacy “Show mentions” as the primary action.

---

## Reply chunking rules

**Primary (required for P8-T11):** staged paragraphs by local progress inside `mascot-reply`.

| Local progress (within 0.55–0.78) | Visible |
|----------------------------------|---------|
| 0.00 – 0.33 | Paragraph 1 only |
| 0.33 – 0.66 | Paragraphs 1–2 |
| 0.66 – 1.00 | All three paragraphs |

Helper shape: `getMascotReplyVisibleCount(progress)` → `0 | 1 | 2 | 3` (0 before reply beat).

**Optional alternate:** `getScrollSyncedCharIndex(replyBody, 'mascot', progress, 'mascot-reply')` for continuous typing. Prefer paragraph staging for calmer motion and easier reduced-motion finals.

**Typing indicator (`mascot-typing`):** three dots; drive with `opacity` only (CSS pulse or scroll-local opacity). Hide when `progress >= 0.55`.

**User bubble:** fully opaque by end of `mascot-user-ask`; remains visible through hold.

---

## Helper contracts (P8-T07 / P8-T11)

| Need | Reuse / add |
|------|-------------|
| Step from progress | `getTheaterStep('mascot', progress)` |
| Local beat 0→1 | `getBeatLocalProgress('mascot', progress)` or beat-id helper |
| User bubble opacity / Y | `getMascotUserAskMotion(progress)` from `mascot-user-ask` |
| Typing visible | `progress` in `[0.28, 0.55)` |
| Reply paragraph count | `getMascotReplyVisibleCount(progress)` |
| Optional char scrub | `getScrollSyncedCharIndex(..., 'mascot-reply')` |
| Action button opacity | `getMascotActionOpacity(progress)` from `mascot-action` |
| Reduced motion | `REDUCED_MOTION_FINAL_PROGRESS.mascot = 0.88` |
| Wrapper | `THEATER_WRAPPER_VH.mascot = { desktop: 240, mobile: 120 }` |

**Visual state aggregator (recommended for P8-T11):**

```ts
getMascotVisualStateFromProgress(progress) → {
  showUserAsk,       // progress >= 0.10
  userAskMotion,     // opacity + translateY
  showTyping,        // 0.28 <= progress < 0.55
  replyVisibleCount, // 0–3
  actionOpacity,     // 0–1
  showHold,          // progress >= 0.88
}
```

Motion rule: **`transform` + `opacity` only**. No Lottie.

---

## Reduced motion

| Field | Value |
|-------|-------|
| Final progress | **0.88** |
| Expected UI | User ask visible; all three reply paragraphs; Open inbox fully opaque; no typing dots |
| Caption | Mascot answers from your connected inbox context in one calm thread. |
| Pause | `isPaused: true` while reduced-motion |

---

## Section chrome (from P8-T03; not reopened)

| Element | Copy |
|---------|------|
| Title | See Mascot in action. |
| Subtitle | One question becomes a calm, grounded answer you can act on. |
| Caption | Mascot answers from your connected inbox context in one calm thread. |
| Footer | Explore Sensor → `/sensor` |

---

## Implementation handoff

| Task | Work |
|------|------|
| P8-T07 | Register `mascot` on `TheaterId`, steps, VH, reduced-motion map, helpers above |
| P8-T11 | `MascotTheaterDemo` scrubbing this sheet |
| P8-T04 | Fixtures already exported; no content change required |

Do **not** change Connect / Focus / Execute or Sensor thresholds in this task.

---

## Acceptance

- [x] Six contiguous beats with frozen `progressStart` / `progressEnd`
- [x] Bubble copy, typing rules, reply chunking, action control locked
- [x] Reduced-motion **0.88** + caption
- [x] Helper reuse list specified for P8-T07 / P8-T11
- [x] Parent draft in phase-8-sensor-mascot.md updated to “locked”
