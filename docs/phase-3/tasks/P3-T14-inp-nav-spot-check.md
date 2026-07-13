# P3-T14: INP Spot-Check (Nav Anchor Scroll)

**Task ID:** P3-T14  
**Status:** done  
**Type:** QA  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P2-T04, P3-T06–T08, P1-T17

---

## Goal

Verify marketing nav anchor clicks meet the P1-T17 INP proxy gate: **no long tasks > 200ms** on tap/click, smooth scroll to target sections.

---

## Nav targets ([`MarketingNav.tsx`](../../../components/marketing/MarketingNav.tsx))

| Link | Hash | Section id |
|------|------|------------|
| Product | `#connect` | Connect theater |
| Features | `#features` | Feature grid |
| Security | `#trust` | Trust |
| Join waitlist | `#cta` | Final CTA |

Handler: `scrollIntoView({ behavior: 'smooth', block: 'start' })` + `history.replaceState`.

---

## Test environment

| Field | Value |
|-------|-------|
| **Date** | 2026-07-04 |
| **URL** | `http://localhost:3002/` (Next.js dev) |
| **Browser** | Chrome (Cursor embedded / CDP) |
| **Viewport** | 792 × 891 |
| **Reduce motion** | off |

**Procedure:** Scroll past hero (nav visible) → click each nav link → wait 2s for smooth scroll → measure sync handler time + `PerformanceObserver` long tasks.

---

## Results

| Link | Sync handler (ms) | Max long task (ms) | Hash | Target top (px) | Pass? |
|------|-------------------|--------------------|------|-----------------|-------|
| Product → `#connect` | 1.7 | 0 | `#connect` | 80 | **Yes** |
| Features → `#features` | 1.1 | 0 | `#features` | 80 | **Yes** |
| Security → `#trust` | 0.6 | 0 | `#trust` | 80 | **Yes** |
| Join waitlist → `#cta` | 0.9 | 0 | `#cta` | 80 | **Yes** |

All targets landed ~80px from viewport top (fixed nav height). No long tasks observed in the 2s post-click window.

**Gate:** P1-T17 INP proxy (long tasks ≤ 200ms) — **Pass**

---

## Notes

- Click handlers are lightweight DOM ops; theater Framer chunks load asynchronously and did not block the click path.
- Smooth scroll runs on compositor/browser thread; not counted as sync INP but verified via `targetTop` after 2s.
- Re-test on production build before P3-T18 sign-off if desired ([P1-T18](../phase-1/tasks/P1-T18-perf-workflow.md)); dev spot-check sufficient for Phase 3 iteration.

---

## Checklist

- [x] Tap Product → `#connect`: smooth scroll, no long tasks > 200ms
- [x] Repeat for Features, Security, Join waitlist targets
- [x] Record note in sign-off doc (pass/fail + browser)

---

## Next steps

- **P3-T18:** Include this row in Phase 3 sign-off checklist
- **P3-T15:** Mobile theater scroll QA (optional)
