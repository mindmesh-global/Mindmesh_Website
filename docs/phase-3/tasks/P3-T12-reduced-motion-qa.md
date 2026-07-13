# P3-T12: Reduced-Motion QA (All 3 Theaters)

**Task ID:** P3-T12  
**Status:** done  
**Type:** QA + fix  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P3-T06–T08, P3-T03

---

## Goal

Verify all three product theaters show static final frames when OS **Reduce motion** is enabled, with no scroll-linked animation required.

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

## Fix applied during QA

**Issue:** Tall scroll wrappers (`220vh` / `240vh`) and sticky frames remained active under reduced motion. Content was visible, but users still had to scroll through long sticky runways.

**Change:** [`TheaterScrollSection.tsx`](../../../components/marketing/theater/TheaterScrollSection.tsx)

| Setting | Normal motion | Reduced motion |
|---------|---------------|----------------|
| Wrapper class | `THEATER_WRAPPER_CLASS` (120–240vh) | `THEATER_WRAPPER_CLASS_REDUCED_MOTION` (`relative` only) |
| `ProductFrame` sticky | `true` | `false` |
| `data-reduced-motion` | `"false"` | `"true"` |

Scroll hook behavior unchanged: `useScrollSection` pins progress to `REDUCED_MOTION_FINAL_PROGRESS` and sets `isPaused: true`.

---

## Checklist results (2026-07-04)

| Criterion | Connect `#connect` | Focus `#focus` | Execute `#execute` | Pass? |
|-----------|-------------------|----------------|-------------------|-------|
| Final frame visible without scroll animation | 7 app cards (Gmail–Jira) + caption | Priority card + caption | Draft, calendar, Jira, success banner + caption | **Yes** |
| Caption matches P1 brief | "All seven sources connected…" | "One priority: Prepare for the 2pm client call…" | "Reply drafted, prep block scheduled…" | **Yes** |
| `data-reduced-motion="true"` | Yes | Yes | Yes | **Yes** |
| Wrapper `minHeight` not inflated | `0px` | `0px` | `0px` | **Yes** |
| Frame not sticky | `position: relative` | `position: relative` | `position: relative` | **Yes** |
| No forced scroll to reveal content | Section flows normally | Same | Same | **Yes** |

### Pinned progress values (code review)

| Theater | `REDUCED_MOTION_FINAL_PROGRESS` | Final step index |
|---------|-----------------------------------|------------------|
| Connect | 0.90 | 4 (`connect-hold`) |
| Focus | 0.85 | 5 (`focus-final`) |
| Execute | 0.92 | 6 (`execute-hold`) |

Phase 3 static content matches final frames regardless of step; Phase 4 will use pinned progress + step for animation branching.

---

## Regression: normal motion

With `prefers-reduced-motion: no-preference`:

- `[data-reduced-motion="false"]` on wrappers
- Connect wrapper regains tall min-height (when Tailwind vh classes apply)
- Sticky frame behavior preserved for scroll kit (Phase 4)

---

## Acceptance criteria

- [x] Connect: 7 connected apps + caption, no scroll animation required
- [x] Focus: priority card final state
- [x] Execute: success state with banner copy
- [x] No scroll jank or forced scroll to see content

---

## Next steps

- **P3-T13:** Off-screen pause QA
- **P3-T14:** INP spot-check (nav anchor scroll)
