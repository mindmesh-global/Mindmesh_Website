# P10-T05: Lock Mascot Attachment-Search Beat Sheet + Fixtures

**Task ID:** P10-T05  
**Status:** done  
**Type:** Strategy / documentation (code in P10-T06–T07)  
**Completed:** 2026-07-10  
**Parent:** [phase-10-tasks.md](../phase-10-tasks.md) | [phase-10-theater-upgrades.md](../phase-10-theater-upgrades.md)  
**Depends on:** [P8-T06](../../phase-8/tasks/P8-T06-mascot-beat-sheet.md), [P8-T11](../../phase-8/tasks/P8-T11-mascot-theater-demo.md)  
**Blocks:** P10-T06  
**Blocker:** Yes

---

## Goal

Freeze scrub beats for **attachment search**: user asks for an Acme file from last year → grounded hit card → open affordance. Stronger product signal than email-count alone.

No page UI in this task. Story mode locked below (same pattern as Sensor Mode A).

---

## Story mode (locked)

**Mode A: second theater section on `/mascot`.**

Keep the existing email-count scrub (`theaterId="mascot"`). Add a **second** scroll theater for attachment search. Do **not** replace the Phase 8 story. Do **not** ship a toggle mode.

| Field | Value |
|-------|-------|
| Existing theater | Keep `ProductTheaterMascot` / `mascot` / email-count fixtures |
| New theater id | **`mascotAttachment`** |
| Section `id` | `mascot-attachment-theater` |
| Page order | How it works → email-count theater → **attachment theater** → capabilities → … |
| Wrapper VH | Same as Mascot: desktop `240`, mobile `120` |
| Reduced-motion final | **0.88** |

Rationale matches [P10-T02](./P10-T02-sensor-story-mode.md): two proofs (catch-up vs find a file), isolated beat sheets, clearer reduced-motion finals.

---

## Quick reference

| Field | Value |
|-------|-------|
| Story | Companion ready → user ask → typing → grounded hit → Open attachment → hold |
| User ask | `Find the attachment from Acme last year` |
| Hit | `Acme_Q3_Plan.pdf` · from Dana Reyes · Mar 12, 2025 · Gmail |
| Secondary | Open attachment (affordance; marketing demo, no live download) |
| Caption | Mascot finds the Acme attachment from last year without you hunting folders. |
| Persona | Acme / Alex |
| Motion | `transform` + `opacity` only |

---

## Locked progress steps (`MASCOT_ATTACHMENT_PROGRESS_STEPS`)

Implement as `TheaterProgressStep[]` (P10-T06). Register under `TheaterId` **`mascotAttachment`**.

| index | id | progressStart | progressEnd | UI state | Motion |
|------:|----|--------------:|------------:|----------|--------|
| 0 | `mascot-att-idle` | 0.00 | 0.10 | Chat shell empty / companion ready | Shell at rest |
| 1 | `mascot-att-user-ask` | 0.10 | 0.28 | User bubble with ask text | `translateY(8px→0)` + `opacity 0→1` |
| 2 | `mascot-att-typing` | 0.28 | 0.48 | Assistant typing indicator | Opacity pulse only |
| 3 | `mascot-att-reply` | 0.48 | 0.68 | Short grounded reply (1–2 lines) | Staged `opacity` |
| 4 | `mascot-att-hit` | 0.68 | 0.82 | Attachment hit card appears | Card `translateY(8px→0)` + `opacity` |
| 5 | `mascot-att-action` | 0.82 | 0.88 | Open attachment control | Button `opacity 0→1` |
| 6 | `mascot-att-hold` | 0.88 | 1.00 | Full thread + hit + button held | Static |

**Invariants**

- Steps are contiguous; last step ends at `1.0`.
- Reduced motion pins progress to **0.88**: ask, reply, hit card, and Open attachment visible; no typing dots.
- Do not mutate existing `MASCOT_PROGRESS_STEPS`.

---

## Fixtures (Acme)

### Chat

| Field | Value |
|-------|-------|
| User ask | `Find the attachment from Acme last year` |
| Reply line 1 | Found it. One matching file from Dana last March. |
| Reply line 2 | Grounded in your connected Gmail. |
| Typing | Three dots; hide when `progress >= 0.48` |

### Attachment hit card

| Field | Value |
|-------|-------|
| Filename | `Acme_Q3_Plan.pdf` |
| From | Dana Reyes |
| Date | Mar 12, 2025 |
| Source | Gmail |
| Icon cue | File / PDF (coded Lucide or local asset; no remote CDN) |

### Secondary action

| Field | Value |
|-------|-------|
| Label | Open attachment |
| Href | `#` or `/inbox` (demo affordance only; do not invent a live file URL) |
| Visible from | `progress >= 0.82` (full by 0.88) |

### Caption

Mascot finds the Acme attachment from last year without you hunting folders.

---

## Reply + hit chunking

| Beat | Rule |
|------|------|
| `mascot-att-reply` | Local 0–0.5 → line 1; 0.5–1 → lines 1–2. Helper: `getMascotAttachmentReplyVisibleCount` → `0 \| 1 \| 2` |
| `mascot-att-hit` | Single card; `getMascotAttachmentHitMotion` → `{ opacity, translateY }` |
| `mascot-att-action` | `getMascotAttachmentActionOpacity` from local 0→1 |

Prefer staged lines over char scrub for calmer motion.

---

## Helper contracts (P10-T06)

| Need | Approach |
|------|----------|
| Step from progress | `getTheaterStep('mascotAttachment', progress)` |
| User bubble | Mirror `getMascotUserAskMotion` pattern on attachment steps |
| Typing visible | `0.28 <= progress < 0.48` |
| Reply line count | `getMascotAttachmentReplyVisibleCount(progress)` |
| Hit card motion | `getMascotAttachmentHitMotion(progress)` |
| Action opacity | `getMascotAttachmentActionOpacity(progress)` |
| Reduced motion | `REDUCED_MOTION_FINAL_PROGRESS.mascotAttachment = 0.88` |
| Wrapper | Same classes as `mascot` (240 / 120) |

**Visual state aggregator:**

```ts
getMascotAttachmentVisualStateFromProgress(progress) → {
  showUserAsk,
  userAskMotion,
  showTyping,
  replyVisibleCount, // 0–2
  hitMotion,
  actionOpacity,
  showHold, // progress >= 0.88
}
```

---

## Reduced motion

| Field | Value |
|-------|-------|
| Final progress | **0.88** |
| Expected UI | Ask visible; both reply lines; hit card fully opaque; Open attachment visible; no typing |
| Caption | Mascot finds the Acme attachment from last year without you hunting folders. |
| Pause | `isPaused: true` while reduced-motion |

---

## Section chrome (second section)

| Element | Copy |
|---------|------|
| Title | Find the file without the hunt. |
| Subtitle | Ask for an attachment in plain language and get a grounded hit you can open. |
| Caption | Mascot finds the Acme attachment from last year without you hunting folders. |
| Footer | Explore Sensor → `/sensor` |

Email-count section chrome stays as Phase 8 (“See Mascot in action.”).

---

## Content module handoff

Export in P10-T06, for example:

```ts
MASCOT_ATTACHMENT_THEATER_FIXTURES = {
  userAsk: 'Find the attachment from Acme last year',
  replyLines: [
    'Found it. One matching file from Dana last March.',
    'Grounded in your connected Gmail.',
  ],
  hit: {
    filename: 'Acme_Q3_Plan.pdf',
    from: 'Dana Reyes',
    date: 'Mar 12, 2025',
    source: 'Gmail',
  },
  secondary: { label: 'Open attachment', href: '/inbox' },
  caption: 'Mascot finds the Acme attachment from last year without you hunting folders.',
}
```

---

## Out of scope

- Implementing demo / wiring `/mascot` (P10-T06, P10-T07)  
- Replacing email-count theater  
- Live file download / API  
- Mascot icon skins (P10-T08)  

---

## Acceptance

- [x] Seven contiguous beats with frozen ranges  
- [x] Ask, reply lines, hit card, action, RM **0.88** + caption locked  
- [x] Mode A + `mascotAttachment` TheaterId locked  
- [x] Helper contracts specified for P10-T06  
- [x] No em dashes in locked copy  

---

## Next

**P10-T06:** Implement Mascot attachment-search theater demo + scroll kit registration.
