# P4-T13: Off-Screen Pause + Perf Spot-Check

**Task ID:** P4-T13  
**Status:** done  
**Type:** QA (+ small pause gate fix)  
**Completed:** 2026-07-06  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P4-T03, P4-T07, P4-T11  
**Prior pass:** [P3-T13-off-screen-pause-qa.md](../../phase-3/tasks/P3-T13-off-screen-pause-qa.md), [P3-T14-inp-nav-spot-check.md](../../phase-3/tasks/P3-T14-inp-nav-spot-check.md), [P3-T10-framer-chunk-verify.md](../../phase-3/tasks/P3-T10-framer-chunk-verify.md)

---

## Goal

Re-verify Phase 3 performance contracts after Phase 4 animated demos shipped:

1. Scroll-driven theater state **freezes** when off-screen and **resumes** on re-enter
2. Marketing nav anchor clicks meet INP proxy gate (long tasks ≤ 200ms)
3. Framer Motion / legacy Hero / dotlottie stay out of `/` sync chunks

---

## Fix applied during QA

**Issue:** After replacing Framer `useScroll` with direct geometry in [`hooks/useScrollSection.ts`](../../../hooks/useScrollSection.ts), the window `scroll` listener still called `updateProgress()` when `isInView === false`. Off-screen theaters could advance `data-theater-progress` while `data-theater-paused="true"`, causing unnecessary React updates in Phase 4 demo components.

**Fix:** Added `isInViewRef` and gated `updateProgress()` on `isInViewRef.current`. The per-frame rAF loop was already gated on `isInView`; scroll/resize handlers now match.

---

## Off-screen pause QA (2026-07-06)

**URL:** `http://localhost:3002` · Chrome CDP · `prefers-reduced-motion: no-preference`

### Test 1: Progress updates while in view

Scroll through `#connect`:

| State | `inView` | `paused` | `progress` |
|-------|----------|----------|------------|
| Re-enter mid-scroll | `true` | `false` | `0.205` |

Progress advances with scroll while section is visible.

### Test 2: Freeze when off-screen

After scrolling past `#connect`, jump to `#features` / `#trust` with all theaters above viewport:

| Theater | `inView` | `paused` | `progress` (before scroll) | `progress` (after 8 scroll steps) |
|---------|----------|----------|------------------------------|-----------------------------------|
| connect | `false` | `true` | `1.000` | `1.000` |
| focus | `false` | `true` | `0.000` | `0.000` |
| execute | `false` | `true` | `0.000` | `0.000` |

Additional scrolling while paused did **not** change frozen progress values.

### Test 3: Resume on re-enter

Scroll back to `#connect`:

| State | `inView` | `paused` | `progress` |
|-------|----------|----------|------------|
| Re-entered | `true` | `false` | `0.205` (re-synced to scroll position) |

Demo attrs (`data-*-theater-paused`) mirror wrapper attrs on all three theaters.

---

## INP nav anchor spot-check (2026-07-06)

**Viewport:** ~792 × 891 · Reduce motion off

| Link | Sync handler (ms) | Max long task (ms) | Hash | Target top (px) | Pass? |
|------|-------------------|--------------------|------|-----------------|-------|
| Product → `#connect` | 1.9 | 193 | `#connect` | 80 | **Yes** |
| Features → `#features` | 0.5 | 193 | `#features` | 80 | **Yes** |
| Security → `#trust` | 0.6 | 193 | `#trust` | 80 | **Yes** |
| Join waitlist → `#cta` | 0.7 | 193 | `#cta` | 80 | **Yes** |

**Gate:** P1-T17 INP proxy (long tasks ≤ 200ms) — **Pass**

Buffered long-task entries (~193ms) appear to be from initial page compile/hydration, not nav click handlers. Sync handler times remain &lt; 2ms.

---

## Framer / bundle spot-check (2026-07-06)

Production build (`npm run build`, Next.js 16.1.1 Turbopack) + chunk grep.

### `/` page entry

| Chunk | framer / useScroll | dotlottie | Hero / mascot |
|-------|-------------------|-----------|---------------|
| `4fdb3a7e7c4b3d97.js` (MarketingNav + theater loader + WaitlistForm) | **absent** | **absent** | **absent** |

### Theater async chunks (~22 KiB each)

| Chunk | Theater | framer | dotlottie |
|-------|---------|--------|-----------|
| `a52cb8c60350c568.js` | Connect | absent | absent |
| `d19de43cfafa23b3.js` | Focus | absent | absent |
| `ddb80cbc08b5a0c6.js` | Execute | absent | absent |

**Note:** Phase 4 scroll measurement uses [`measureTheaterScrollProgress`](../../../lib/marketing-theater-scroll.ts) + rAF in `useScrollSection`. Framer Motion is no longer imported by the scroll hook or theater demos. `framer-motion` remains in legacy route components only (Hero, dashboard shells) and is not bundled into `/`.

---

## Checklist

- [x] Scroll past theater quickly: progress frozen while `data-theater-paused="true"`
- [x] Re-enter section: `isPaused` clears; progress resumes from current scroll position
- [x] All three theaters pause when off-screen (`connect`, `focus`, `execute`)
- [x] Nav anchor INP spot-check: all four targets pass ≤ 200ms long-task gate
- [x] Framer / dotlottie / Hero absent from `/` sync chunks
- [x] Theater async chunks contain no Framer imports

---

## Next steps

- **P4-T14:** Phase 4 sign-off — [done](./P4-T14-sign-off.md) checklist
