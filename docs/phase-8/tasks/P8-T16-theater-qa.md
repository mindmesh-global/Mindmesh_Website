# P8-T16: Reduced-Motion + Off-Screen Pause + A11y QA

**Task ID:** P8-T16  
**Status:** done  
**Type:** QA  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T10](./P8-T10-sensor-page.md), [P8-T12](./P8-T12-mascot-page.md), [P8-T15](./P8-T15-local-assets.md), [P3-T12](../../phase-3/tasks/P3-T12-reduced-motion-qa.md), [P3-T13](../../phase-3/tasks/P3-T13-off-screen-pause-qa.md)  
**Blocks:** P8-T19  
**Blocker:** Yes

---

## Goal

Confirm `/sensor` and `/mascot` theaters meet the same bar as homepage Connect / Focus / Execute: reduced-motion finals, off-screen pause, resume on re-enter, basic a11y, and no legacy overlay scroll-lock.

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

| Criterion | `/sensor` | `/mascot` | Pass? |
|-----------|-----------|-----------|-------|
| `data-reduced-motion="true"` | Yes | Yes | Yes |
| Progress pinned | **0.900** | **0.880** | Yes |
| Demo hold / final step | hold `true`, step `5` | hold `true`, step `5` | Yes |
| Wrapper not tall | `minHeight: 0px`, ~724px content | same | Yes |
| Sticky frame off | no sticky frame | no sticky frame | Yes |
| Final UI | `Open Cal` + 3 results + confirm chip | ask + 3 reply paras + Open inbox (opacity 1); typing off | Yes |
| Caption | Sensor finds Calendar… | Mascot answers from your connected inbox… | Yes |
| `isPaused` | `true` | `true` | Yes |

---

## Off-screen pause (normal motion)

`prefers-reduced-motion: no-preference`. Tall wrappers restored (sensor ~2035px, mascot ~2220px); sticky frames on.

### Sensor

| Step | `inView` | `paused` | `progress` |
|------|----------|----------|------------|
| Mid scrub | `true` | `false` | ~0.49–0.62 (advances with scroll) |
| Jump past theater to CTA | `false` | `true` | `1.000` |
| Extra scroll while off-screen | `false` | `true` | `1.000` (frozen) |
| Re-enter mid theater | `true` | `false` | ~0.49–0.54 (re-synced) |

### Mascot

| Step | `inView` | `paused` | `progress` |
|------|----------|----------|------------|
| Mid scrub | `true` | `false` | `0.594` |
| Scroll fully past | `false` | `true` | `1.000` |
| Extra scroll while off-screen | `false` | `true` | `1.000` (frozen) |
| Re-enter | `true` / progress re-sync observed in prior mid pass | | Yes |

Shared kit: `useScrollSection` gates updates when `!isInView`; demos expose `data-*-theater-paused`.

---

## A11y + overlays

| Check | Sensor | Mascot | Pass? |
|-------|--------|--------|-------|
| Single `h1` | Yes | Yes | Yes |
| Heading hierarchy (H1 → H2 → H3) | Present | Present | Yes |
| Primary nav + footer links keyboard-reachable | Snapshot interactive links | Same | Yes |
| Body overflow (no scroll-lock) | `visible` | `visible` | Yes |
| Live `MascotChatbot` / `SensorBarSpotlight` | Absent | Absent | Yes |
| Overlay allowlist | `/dashboard` only (P8-T14); funnel pages slim shell | | Yes |
| Contrast spot-check | H1 `rgb(222,229,255)` on dark bg | Same tokens | Advisory pass |

Legacy mascot tooltip wheel-lock lives only in `ConditionalOverlays` when overlays mount; those components do not mount on `/sensor` or `/mascot`.

---

## Acceptance

- [x] Reduced motion → final frames + captions (0.90 / 0.88)  
- [x] Leave / scroll away → demos pause (`isPaused`)  
- [x] Re-enter → progress matches scroll position  
- [x] Keyboard / headings / contrast spot-check  
- [x] No body scroll-lock from legacy mascot tooltip behavior  

No code fixes required during this QA.

---

## Handoff

| Next | Work |
|------|------|
| P8-T17 | Sitemap / metadata / OG |
| P8-T18 | Lighthouse spot-check |
| P8-T19 | Sign-off |
