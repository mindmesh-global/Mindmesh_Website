# P3-T13: Off-Screen Pause QA

**Task ID:** P3-T13  
**Status:** done  
**Type:** QA  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P3-T04, P3-T06–T08

---

## Goal

Confirm scroll-driven theater state **freezes** when a section is off-screen and **resumes** from the current scroll position when re-entered.

---

## Implementation under test

[`hooks/useScrollSection.ts`](../../../hooks/useScrollSection.ts):

| Mechanism | Behavior |
|-----------|----------|
| `IntersectionObserver` | Sets `isInView` on wrapper |
| `scrollYProgress.on('change')` | Updates progress **only when** `isInViewRef.current === true` |
| Re-enter sync | `useEffect` on `isInView` calls `scrollYProgress.get()` when section returns |
| `isPaused` | `!isInView \|\| prefersReducedMotion` |

Phase 4 animation components **must** respect `isPaused` from `useTheaterScroll()` before applying scroll-driven transforms.

---

## QA harness

[`TheaterScrollSection.tsx`](../../../components/marketing/theater/TheaterScrollSection.tsx) exposes debug attributes:

| Attribute | Values |
|-----------|--------|
| `data-theater-in-view` | `true` / `false` |
| `data-theater-paused` | `true` / `false` |
| `data-theater-progress` | `0.000` – `1.000` |

---

## Automated browser QA (2026-07-04)

**URL:** `http://localhost:3002` · Chrome CDP · `prefers-reduced-motion: no-preference`

### Test 1: Progress updates while in view

Scroll slowly through `#connect`:

| State | `inView` | `paused` | `progress` |
|-------|----------|----------|------------|
| Mid-scroll | `true` | `false` | `0.701` |

Progress advances with scroll while section is visible.

### Test 2: Freeze when off-screen

Jump to `#features` (all theaters above viewport):

| Theater | `inView` | `paused` | `progress` |
|---------|----------|----------|------------|
| connect | `false` | `true` | `1.000` |
| focus | `false` | `true` | (frozen) |
| execute | `false` | `true` | (frozen) |

Additional scrolling at `#features` did **not** change connect progress (`1.000` → `1.000`).

### Test 3: Resume on re-enter

Scroll back to `#connect` top:

| State | `inView` | `paused` | `progress` |
|-------|----------|----------|------------|
| Re-entered | `true` | `false` | `0.504` |

Progress re-synced to current scroll position (not stuck at off-screen frozen value).

---

## Performance note (Framer Motion)

Framer `useScroll` registers a passive window scroll listener per theater chunk. That listener remains active off-screen, but **`setScrollProgress` is gated** so React state and Phase 4 consumers do not update while `isPaused`.

Phase 4 beat animations should early-return when `isPaused` to avoid unnecessary transform work. No runaway React re-renders observed during fast scroll-past in devtools spot-check.

---

## Checklist

- [x] Scroll past theater quickly: progress frozen; no React state churn while off-screen
- [x] Re-enter section: `isPaused` clears; progress resumes from current scroll position
- [x] All three theaters pause when off-screen (`connect`, `focus`, `execute`)

---

## Manual repro

1. Open `/` with Reduce motion **off**
2. DevTools → Elements → find `[data-theater="connect"]`
3. Scroll through connect: watch `data-theater-progress` change
4. Jump to Features: `data-theater-paused="true"`, progress stops changing
5. Scroll back to connect: `data-theater-paused="false"`, progress updates again

---

## Next steps

- **P3-T14:** INP spot-check (nav anchor scroll)
- **Phase 4:** Guard all scroll-driven animations with `!isPaused`
