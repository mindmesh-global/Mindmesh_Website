# P11-T02: Product Overview Narrative + Scene Beat Sheet

**Task ID:** P11-T02  
**Status:** done  
**Type:** Strategy / documentation (code in P11-T03–T12)  
**Completed:** 2026-07-10  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T01](./P11-T01-product-inventory.md)  
**Blocks:** P11-T05 (with P11-T03 + P11-T04); informs P11-T06–T10, P11-T12  
**Blocker:** Yes

---

## Goal

Freeze the product-led story that sits directly under the homepage hero: one coherent Acme workday told through four scenes inside a persistent MindMesh desktop shell. Lock headlines, supporting copy, visual finals, progress timing, and mobile / reduced-motion contracts.

No UI in this task. Fixtures land in P11-T03; frame chrome in P11-T04; shell in P11-T05.

---

## Quick reference

| Field | Value |
|-------|-------|
| Overview id | `productOverview` |
| Placement | Immediately after `HeroSection`, before `ProblemSection` |
| Story | One workday for Alex @ Acme: Attention → Inbox/Calendar → Narrative/Apps → Companions |
| Shell | One persistent desktop app frame; sidebar highlights the active scene |
| Desktop runway | Target **180vh** (tune within 170–190vh in P11-T05 / P11-T14) |
| Mobile | Normal document flow; four stacked scene cards; no sticky scrub |
| Reduced-motion jump | **0.90** (start of hold; all four scenes represented in final collage or last scene complete + nav showing all visited) |
| Motion | `transform` + `opacity` only |
| Persona | Acme / Alex (`MARKETING_PERSONA_ACME`) |
| Product truth | [P11-T01](./P11-T01-product-inventory.md) |
| Fixtures module | `lib/marketing-product-overview-data.ts` (P11-T03) |

---

## Narrative spine

**Through-line:** MindMesh is already open on Alex's desktop. Before the 2pm client call, the product shows what needs attention, where the evidence lives, what yesterday left open, and how Sensor and Mascot help without leaving the desk.

This is an **overview**, not a replacement for Connect / Focus / Execute. Those theaters still tell the deeper connect → prioritize → act story later on the page. The overview must not contradict them, and it must not collapse Attention into "one priority."

### Section chrome (above the frame)

| Field | Locked copy |
|-------|-------------|
| Eyebrow | Inside MindMesh |
| Title | See the desktop product in one pass. |
| Subtitle | Attention, inbox, calendar, yesterday's narrative, connected sources, Sensor, and Mascot, shown as they ship today. |

### Frame caption (below the frame, updates per scene)

| Scene | Caption |
|-------|---------|
| 1 | Attention ranks what needs you now, later today, and what was quietly handled. |
| 2 | Inbox and upcoming events stay in one desktop shell, ready before 2pm. |
| 3 | Yesterday's narrative and seven connected sources explain the context. |
| 4 | Sensor and Mascot sit beside the desk as separate companion surfaces. |

### Progress nav labels (sidebar / dots)

| Scene | Nav label | Product tab truth |
|-------|-----------|-------------------|
| 1 | Attention | `attention` (default) |
| 2 | Inbox & events | `inbox` + `upcoming-events` |
| 3 | Narrative & apps | `narrative` + `apps` |
| 4 | Companions | Separate Sensor + Mascot windows |

---

## Locked progress steps (`PRODUCT_OVERVIEW_PROGRESS_STEPS`)

Implement as `TheaterProgressStep[]` (or overview-local equivalent) in P11-T05. Contiguous steps; last ends at `1.0`.

| index | id | progressStart | progressEnd | Active scene | UI state | Motion |
|------:|----|--------------:|------------:|--------------|----------|--------|
| 0 | `overview-enter` | 0.00 | 0.06 | 1 | Shell + sidebar visible; Attention selected; board fading in | Frame `opacity 0→1`, slight `translateY(12→0)` |
| 1 | `overview-attention` | 0.06 | 0.28 | 1 | Full Attention Board: Now, Later Today, Quietly Handled, overlap chip | Cards stage in with opacity / Y |
| 2 | `overview-attention-hold` | 0.28 | 0.34 | 1 | Board held; sidebar still on Attention | Static |
| 3 | `overview-inbox` | 0.34 | 0.52 | 2 | Sidebar moves to Email; main shows inbox + focused Dana thread + upcoming events rail | Crossfade main pane; nav highlight slides |
| 4 | `overview-inbox-hold` | 0.52 | 0.56 | 2 | Inbox / events held | Static |
| 5 | `overview-narrative` | 0.56 | 0.72 | 3 | Sidebar on Narrative then Apps cue; main shows yesterday recap + connected sources strip | Crossfade; apps grid fades in |
| 6 | `overview-narrative-hold` | 0.72 | 0.76 | 3 | Narrative + apps held | Static |
| 7 | `overview-companions` | 0.76 | 0.90 | 4 | Main pane shows Sensor calc result + Mascot attachment hit; companions treated as overlays / side panels, not dashboard tabs | Crossfade; Sensor + Mascot opacity in |
| 8 | `overview-hold` | 0.90 | 1.00 | 4 | Full companions state held | Static |

**Timing invariants**

- No scene owns more than ~0.22 of progress.
- Hold beats are short (0.04–0.10) so the next scene appears before the visitor feels stuck.
- Target desktop runway **180vh**; if QA feels rushed, prefer trimming motion, not adding dead scroll.
- `getProductOverviewScene(progress)` → `1 | 2 | 3 | 4`.
- Reduced motion pins to **0.90**.

---

## Scene 1: Attention Board

### Purpose

Prove the default MindMesh workspace: a ranked board, not a single hero priority card.

### Copy

| Field | Locked |
|-------|--------|
| Scene headline (in-frame or caption support) | Here's what needs your attention. |
| Supporting line | Ranked for Alex before the 2pm client call. |
| Caption | Attention ranks what needs you now, later today, and what was quietly handled. |

### Final visual state

- Sidebar: **Attention** selected
- Header: "Here's what needs your attention."
- **Now** (2 cards visible):
  1. Prepare for 2pm client call (sources: Gmail, Google Calendar, Jira; why-now ties Dana's unread reply + PROD-142)
  2. Reply to Dana on Q2 rollout (source: Gmail; why-now: unread, blocks the call)
- **Later Today** (1 card, lower weight): Review standup notes (Calendar)
- **Quietly Handled** (1–2 rows): Product Weekly digest grouped as handled
- Optional overlap chip: Standup and client-call prep conflict signal (decorative, product-true)
- Multiple ranked items always visible; never only one card

### Fixture intent (P11-T03)

Reuse Acme / Dana / 2pm / PROD-142 continuity from `marketing-demo-data.ts`, expanded into board sections.

### Claims allowed / forbidden

| Allowed | Forbidden |
|---------|-----------|
| Multiple ranked items | "The one thing" / single priority as the whole product |
| Why-now reasoning from connected sources | Live attention-engine language or scores |
| Overlap as a signal | Implying the board auto-resolves conflicts |

---

## Scene 2: Email + Upcoming Events

### Purpose

Show communication and schedule inside the same desktop shell, with folder hierarchy that matches the product.

### Copy

| Field | Locked |
|-------|--------|
| Scene headline | Inbox and upcoming events, together. |
| Supporting line | Dana's thread and the 2pm call stay in context. |
| Caption | Inbox and upcoming events stay in one desktop shell, ready before 2pm. |

### Final visual state

- Sidebar: **Email** expanded; **Inbox** selected (All / Sent / Drafts visible as decorative siblings with counts)
- Main: thread list with Dana highlighted + unread; newsletter and internal FYI present
- Detail / focus strip: Dana · Re: Q2 rollout timeline · "Can we lock scope before the 2pm call?"
- Right or lower rail: **Upcoming events** with Team standup + Client call (2pm)
- Any compose / send affordance, if shown, is labeled as **Needs approval** or omitted (decorative list only preferred)

### Fixture intent

Extend `INBOX_FIXTURES_ACME` + `CALENDAR_FIXTURES_ACME`. Add folder counts. Do not invent live send.

### Claims allowed / forbidden

| Allowed | Forbidden |
|---------|-----------|
| Unified inbox folders | Live OAuth / sync |
| Focused message context | Auto-send or auto-schedule |
| Upcoming events as read context | "Join meeting" as a functional control |

---

## Scene 3: Yesterday Narrative + Connected Apps

### Purpose

Show reflection and source coverage: why MindMesh has context for today's board.

### Copy

| Field | Locked |
|-------|--------|
| Scene headline | Yesterday, explained. Sources, connected. |
| Supporting line | An actionable recap plus the seven apps MindMesh reads. |
| Caption | Yesterday's narrative and seven connected sources explain the context. |

### Final visual state

- Sidebar: **Yesterday narrative** selected (Connected apps may show a secondary highlight or adjacent panel cue)
- Main left: narrative card with:
  - Summary: Alex closed the Q2 scope thread and left PROD-142 open before EOD
  - Stats row (synthetic): e.g. 12 emails · 3 events · 2 open loops
  - Evidence chips: Gmail · Calendar · Jira
  - One highlight + one open loop visible without expanding every section
- Main right or below: connected apps strip/grid of **seven** sources, all connected, with a calm sync / connected badge (not a live OAuth flow)

### Fixture intent

New narrative fixture in P11-T03. Reuse `CONNECTED_APP_FIXTURES_ACME` / `MARKETING_INTEGRATIONS`.

### Claims allowed / forbidden

| Allowed | Forbidden |
|---------|-----------|
| Actionable yesterday recap | Live brain / Qdrant generation |
| Seven read sources | Automatic Slack or Jira writes |
| Connected + sync visual states | "Add app" as a working OAuth control |

---

## Scene 4: Sensor + Mascot

### Purpose

Show the two companion surfaces as distinct from the dashboard, without embedding Tauri windows or Lottie.

### Copy

| Field | Locked |
|-------|--------|
| Scene headline | Companions at the edge of the desk. |
| Supporting line | Sensor for instant answers. Mascot for grounded conversation. |
| Caption | Sensor and Mascot sit beside the desk as separate companion surfaces. |

### Final visual state

- Dashboard shell remains visible but dimmed or pushed back slightly (`opacity` only)
- **Sensor** panel (foreground left or top): query `15% of 240` resolved to result card **36** (reuse calc story; clearer in a compact frame than Open Cal)
- **Mascot** panel (foreground right or bottom): local companion still (default **Sherpa**) + short thread:
  - Ask: `Find the attachment from Acme last year`
  - Reply + hit: `Acme_Q3_Plan.pdf` from Dana (reuse attachment fixtures)
- No live Lottie; no separate sticky runway for each companion
- Optional depth links in caption footer area: Explore Sensor → `/sensor`, Explore Mascot → `/mascot` (P11-T11 wiring)

### Fixture intent

Reuse `SENSOR_CALC_THEATER_FIXTURES` + `MASCOT_ATTACHMENT_THEATER_FIXTURES` + `MASCOT_ICON_SKINS` stills. Do not load product Lottie URLs.

### Claims allowed / forbidden

| Allowed | Forbidden |
|---------|-----------|
| Sensor and Mascot as separate companions | Companions as dashboard tabs |
| Deterministic calc + attachment hit | Live brain / Qdrant / streaming |
| Local mascot still | Live Lottie on the homepage |

---

## Desktop / mobile / reduced-motion contracts

### Desktop (`md+`, `prefers-reduced-motion: no-preference`)

- Sticky product frame inside ~**180vh** wrapper
- Sidebar + main pane persist; only main content and nav highlight change
- Scene changes are crossfades (`opacity` + small `translateY`), not page jumps
- Off-screen: pause progress-driven updates when overview leaves viewport
- No sticky overlap with Problem section (isolate stacking; follow Phase 10 visible-flow lessons)

### Mobile (`< md`)

- No sticky scrub; normal document flow
- Section title + subtitle once
- Four stacked scene cards, each showing that scene's **final visual state**
- Compact app chrome per card (simplified sidebar strip or scene label)
- Captions sit under each card
- No horizontal page scroll; touch targets ≥ existing marketing contract

### Reduced motion (`prefers-reduced-motion: reduce`)

| Field | Value |
|-------|-------|
| Final progress | **0.90** |
| Expected UI | Companions scene complete (Sensor result + Mascot hit visible); nav shows all four scenes as available; desktop may also show a compact four-dot progress with scene 4 selected |
| Mobile | Same as mobile final cards; no scrub dependency |
| Pause | `isPaused: true` while reduced-motion |

Alternative accepted in P11-T12 if clearer in QA: a single static "tour" of all four finals inside the frame at 0.90, with scene 4 visually primary. Prefer one complete companions state over a busy collage if space is tight.

---

## Helper contracts (for P11-T05 / P11-T10)

| Need | Contract |
|------|----------|
| Step from progress | `getTheaterStep('productOverview', progress)` or local overview helper |
| Active scene | `getProductOverviewScene(progress)` → `1 \| 2 \| 3 \| 4` |
| Scene local 0→1 | `getProductOverviewSceneLocalProgress(progress, scene)` |
| Main pane motion | `getProductOverviewPaneMotion(progress)` → `{ opacity, translateY }` per scene layer |
| Sidebar highlight | Derived from active scene |
| Caption | `PRODUCT_OVERVIEW_SCENE_CAPTIONS[scene]` |
| Reduced motion | `REDUCED_MOTION_FINAL_PROGRESS.productOverview = 0.9` |
| Wrapper VH | Start `desktop: 180, mobile: auto / stacked` (no 220–240vh) |

**Visual state aggregator (recommended):**

```ts
getProductOverviewVisualStateFromProgress(progress) → {
  scene: 1 | 2 | 3 | 4;
  sidebarTab: 'attention' | 'inbox' | 'narrative' | 'companions';
  paneMotion: { opacity: number; translateY: number };
  showOverlapChip: boolean;
  showApprovalHint: boolean; // scene 2 only if used
  sensorVisible: boolean;
  mascotVisible: boolean;
  caption: string;
}
```

---

## Relationship to the rest of the homepage

```text
Hero
  └─ Product overview (this beat sheet)     ← what the product is
Problem
How it works
Connect / Focus / Execute theaters         ← deeper connect → act story
Features / Integrations / Trust / CTA
```

Rules:

- Overview does **not** replace Connect, Focus, or Execute.
- Overview Scene 1 is the **Attention Board**; Focus theater may still tell a later "narrow to what matters for 2pm" story without claiming the whole product is one card.
- Execute theater copy that overstates automatic writes remains a **P11-T13** concern; overview Scene 2 stays approval-aware / read-first.

---

## Acceptance checklist

- [x] Each scene has a purpose, headline, supporting copy, and final visual state
- [x] The sequence explains one coherent workday rather than a feature collage
- [x] Scene timing avoids long idle scroll ranges (short holds; ~180vh target)
- [x] Desktop, mobile, and reduced-motion states are specified
- [x] Claims match the P11-T01 source-of-truth map

---

## Unblocks

- **P11-T03** - fixtures for each scene's final state
- **P11-T04** - frame + sidebar chrome matching this nav model
- **P11-T05** - shell + `productOverview` progress orchestration
- **P11-T06–T09** - scene implementations against locked finals
- **P11-T10** - transitions using the progress table above
- **P11-T12** - mobile + reduced-motion from the contracts above
