# P4-T12: Reduced-Motion QA (Animated Theaters)

**Task ID:** P4-T12  
**Status:** done  
**Type:** QA (re-run after Phase 4 animation)  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P4-T03, P4-T07, P4-T11  
**Prior pass:** [P3-T12-reduced-motion-qa.md](../../phase-3/tasks/P3-T12-reduced-motion-qa.md)

---

## Goal

Re-verify all three **animated** product theaters show static final frames when OS **Reduce motion** is enabled, with pinned progress and no scroll-linked state changes.

---

## How to reproduce

### macOS

System Settings → Accessibility → Display → **Reduce motion** → On

### Chrome DevTools (automated QA)

```js
// Emulation.setEmulatedMedia
{ features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }
```

Then reload `http://localhost:3002` and visit `#connect`, `#focus`, `#execute`.

---

## Infrastructure (unchanged from Phase 3)

| Layer | Reduced-motion behavior |
|-------|-------------------------|
| `useScrollSection` | Pins `progress` to `REDUCED_MOTION_FINAL_PROGRESS`; `isPaused: true` |
| `TheaterScrollSection` | `data-reduced-motion="true"`; no sticky frame; no tall wrapper vh |
| `globals.css` | Skips `[data-theater]` min-height when `data-reduced-motion="true"` |
| Demo components | Render final visual state from pinned progress (no scroll subscription) |

No code changes required during this QA pass.

---

## Checklist results (2026-07-04)

| Criterion | Connect `#connect` | Focus `#focus` | Execute `#execute` | Pass? |
|-----------|-------------------|----------------|-------------------|-------|
| Final animated frame visible | 7 app cards + sync banner | Priority card + "Your one focus." | Hold stack: draft + calendar + Jira + success | **Yes** |
| Pinned `data-theater-progress` | `0.900` | `0.850` | `0.920` | **Yes** |
| Demo step index | 4 (`connect-hold`) | 5 (`focus-final`) | 6 (`execute-hold`) | **Yes** |
| `data-theater-paused="true"` | Yes | Yes | Yes | **Yes** |
| Progress unchanged after scroll | Yes | Yes | Yes | **Yes** |
| Caption matches P1 brief | "All seven sources connected…" | "One priority: Prepare for the 2pm client call…" | "Reply drafted, prep block scheduled…" | **Yes** |
| `data-reduced-motion="true"` | Yes | Yes | Yes | **Yes** |
| Wrapper `minHeight` not inflated | `0px` | `0px` | `0px` | **Yes** |
| Frame not sticky | `position: relative` | Same | Same | **Yes** |

### Animated demo DOM checks (CDP)

| Theater | Key selectors / attrs | Expected | Observed |
|---------|----------------------|----------|----------|
| Connect | `data-connect-visible-count` | `7` | `7` |
| Connect | `data-connect-sync-banner` | present | present |
| Focus | `data-focus-theater-step` | `5` | `5` |
| Focus | `data-marketing-priority-card` | present | present |
| Execute | `data-execute-hold-stack` | `true` | `true` |
| Execute | `data-marketing-draft-panel` | full draft | char index `207` (full body) |
| Execute | `data-jira-checked` | `true` | `true` |
| Execute | `data-marketing-execute-success` | present | present |

### Pinned progress values

| Theater | `REDUCED_MOTION_FINAL_PROGRESS` | Final step | Final visual |
|---------|-----------------------------------|------------|--------------|
| Connect | 0.90 | 4 | All apps connected + sync banner |
| Focus | 0.85 | 5 | Priority card emphasized; background ghosted |
| Execute | 0.92 | 6 | Hold stack with all three actions + success banner |

---

## Regression: normal motion

With `prefers-reduced-motion: no-preference` (reloaded after QA):

| Criterion | Pass? |
|-----------|-------|
| `[data-reduced-motion="false"]` on all wrappers | **Yes** |
| Connect wrapper `minHeight` ~220vh (desktop) | **Yes** (`1960px` at 892px viewport) |
| Focus wrapper `minHeight` ~240vh | **Yes** |
| Execute wrapper `minHeight` ~220vh | **Yes** |
| Sticky frame `position: sticky` | **Yes** |
| Connect at `#connect` starts at progress `0.000` | **Yes** |
| Off-screen theaters `data-theater-paused="true"` | **Yes** (Focus, Execute when not in view) |

---

## Acceptance criteria

- [x] Connect: 7 connected apps + sync banner at pinned progress
- [x] Focus: priority card final state at step 5
- [x] Execute: hold stack (draft, calendar, Jira checked, success) at step 6
- [x] No scroll-linked progress updates under reduced motion
- [x] No tall wrapper / sticky runway under reduced motion
- [x] Normal-motion scroll kit unchanged

---

## Next steps

- **P4-T13:** Off-screen pause + perf spot-check — [done](./P4-T13-off-screen-pause-perf.md)
- **P4-T14:** Phase 4 sign-off
