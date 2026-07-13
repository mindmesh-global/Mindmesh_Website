# P10-T09: Theater QA (Reduced-Motion + Off-Screen Pause)

**Task ID:** P10-T09  
**Status:** done  
**Type:** QA  
**Completed:** 2026-07-10  
**Parent:** [phase-10-tasks.md](../phase-10-tasks.md) | [phase-10-theater-upgrades.md](../phase-10-theater-upgrades.md)  
**Depends on:** [P10-T04](./P10-T04-wire-sensor-calc.md), [P10-T07](./P10-T07-wire-mascot-attachment.md), [P8-T16](../../phase-8/tasks/P8-T16-theater-qa.md)  
**Blocks:** P10-T10  
**Blocker:** Yes

---

## Goal

Confirm Phase 10 theaters on `/sensor` and `/mascot` meet the same bar as Phase 8: reduced-motion finals, off-screen pause, resume on re-enter, and no overlay / scroll-lock regressions. Covers **four** theaters: `sensor`, `sensorCalc`, `mascot`, `mascotAttachment`.

---

## Environment

| Item | Value |
|------|-------|
| Dev server | `http://localhost:3002` |
| Tooling | Chrome CDP via Cursor browser (`Emulation.setEmulatedMedia`, `Runtime.evaluate`) |
| Date | 2026-07-10 |

---

## Reduced motion

Emulated `prefers-reduced-motion: reduce`, then hard reload each page.

| Criterion | `sensor` | `sensorCalc` | `mascot` | `mascotAttachment` | Pass? |
|-----------|----------|--------------|----------|--------------------|-------|
| `data-reduced-motion="true"` | Yes | Yes | Yes | Yes | Yes |
| Progress pinned | **0.900** | **0.900** | **0.880** | **0.880** | Yes |
| Hold / final step | hold, step `5` | hold, step `5` | hold, step `5` | hold, step `6` | Yes |
| Wrapper not tall | `minHeight: 0px`, ~700px | same | same | same | Yes |
| Sticky frame off | none | none | none | none | Yes |
| `isPaused` | `true` | `true` | `true` | `true` | Yes |

### Final UI (snippets)

| Theater | Observed final content |
|---------|------------------------|
| `sensor` | Open Cal + Calendar / Calculator results + “Opening Calendar…” + caption |
| `sensorCalc` | `15% of 240` → result **36** + Open Calculator + caption |
| `mascot` | Ask + 3 reply paragraphs + Open inbox + caption |
| `mascotAttachment` | Acme ask + reply + `Acme_Q3_Plan.pdf` hit + Open attachment + caption |

---

## Off-screen pause (normal motion)

`prefers-reduced-motion: no-preference`. After the visible-flow correction, all four
depth wrappers use **170vh** on desktop (~1515px at the 891px QA viewport) and
120vh on mobile. Homepage theater heights are unchanged.

### `/sensor`

| Step | Theater | `inView` | `paused` | `progress` |
|------|---------|----------|----------|------------|
| Mid scrub | `sensor` | `true` | `false` | `0.544` → `0.777` |
| Mid scrub | `sensorCalc` | `true` | `false` | `0.544` |
| Sensor while on calc | `sensor` | `false` | `true` | `1.000` |
| Jump past both | both | `false` | `true` | `1.000` |
| Extra scroll off-screen | both | `false` | `true` | `1.000` (frozen) |
| Re-enter calc | `sensorCalc` | `true` | `false` | `0.466` |
| Re-enter sensor | `sensor` | `true` | `false` | `0.466` |

### `/mascot`

| Step | Theater | `inView` | `paused` | `progress` |
|------|---------|----------|----------|------------|
| Mid scrub | `mascot` | `true` | `false` | `0.527` → `0.749` |
| Mid scrub | `mascotAttachment` | `true` | `false` | `0.526` |
| Email-count while on attachment | `mascot` | `false` | `true` | `1.000` |
| Jump past both | both | `false` | `true` | `1.000` |
| Extra scroll off-screen | both | `false` | `true` | `1.000` (frozen) |
| Re-enter attachment | `mascotAttachment` | `true` | `false` | `0.452` |
| Re-enter email-count | `mascot` | `true` | `false` | `0.452` |

Shared kit: `useScrollSection` gates updates when `!isInView`; demos expose `data-*-theater-paused`.

---

## A11y + overlays

| Check | `/sensor` | `/mascot` | Pass? |
|-------|-----------|-----------|-------|
| Single `h1` | Yes | Yes | Yes |
| Body overflow (no scroll-lock) | `visible` | `visible` | Yes |
| Live `MascotChatbot` / spotlight | Absent | Absent | Yes |
| Icon showcase (stills only) | n/a | Present (`data-mascot-icon-showcase`) | Yes |
| Primary nav + footer | Present | Present | Yes |

### Post-QA visible-flow correction

Manual review found the original 220–240vh depth runways made replies feel delayed
and allowed adjacent sticky layers to compete visually. The correction:

- Shortens `sensor`, `sensorCalc`, `mascot`, and `mascotAttachment` to 170vh on desktop
- Keeps the existing 120vh mobile runways
- Isolates each depth theater section's sticky stacking context
- Leaves homepage Connect / Focus / Execute runways unchanged

Follow-up browser verification at the 891px viewport:

| Page | Theater midpoint | Next section |
|------|------------------|--------------|
| `/sensor` | Both theaters at progress ~0.93 with final content visible | ~933px below viewport top |
| `/mascot` | Both theaters at progress ~0.93 with final content visible | ~933px below viewport top |

This keeps the response and action visible before the following theater or companion
showcase enters.

---

## Acceptance

- [x] Reduced motion → finals for all four theaters (0.90 / 0.90 / 0.88 / 0.88)  
- [x] Leave / scroll away → demos pause (`isPaused`)  
- [x] Re-enter → progress matches scroll position  
- [x] No body scroll-lock; no live Lottie / chatbot on funnel pages  

---

## Handoff

| Next | Work |
|------|------|
| P10-T10 | Phase 10 sign-off checklist |
