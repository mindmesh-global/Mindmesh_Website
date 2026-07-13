# P11-T12: Mobile + Reduced-Motion Experience

**Task ID:** P11-T12  
**Status:** done  
**Type:** Implementation + QA  
**Completed:** 2026-07-12  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T11](./P11-T11-homepage-placement.md)  
**Blocks:** P11-T14  
**Blocker:** Yes

---

## Goal

Ensure visitors on small viewports or with `prefers-reduced-motion: reduce` get a complete, non-scrubbed product overview: all four scenes readable, no sticky dependency, no clipped overflow, and touch-friendly controls.

---

## What shipped

### Routing (CSS-first)

| Audience | Experience |
|----------|------------|
| `< md` | Stacked static tour (`ProductOverviewMobile`) |
| `md+` + motion OK | Sticky scrub (`ProductOverviewDesktop`) |
| Any + `prefers-reduced-motion: reduce` | Stacked static tour (same Mobile body), scrub hidden via `motion-reduce:!hidden` |

Implemented in `ProductOverviewInteractive.tsx` so reduced-motion desktop users see **all four** finals without hydration flash of a scene-4-only scrub.

### Mobile / static tour polish

- Normal document flow; captions under each card
- Sticky progress nav with IntersectionObserver active scene
- Jump scroll uses `behavior: 'auto'` when reduced motion
- `overflow-x-clip` / `max-w-full` on tour containers
- Depth links and progress tabs use **min-h-11** (44px) touch targets
- Quiet-row expand control uses **min-h-11**
- Reduced-motion CSS lifts frame `max-height` so stacked cards are not clipped

### Desktop motion

- `ProductOverviewDesktop` returns `null` under reduced motion (no scrub listeners)
- Motion path unchanged for `prefers-reduced-motion: no-preference`

---

## QA checklist

| Check | Result |
|-------|--------|
| Mobile normal flow (no sticky scrub) | Pass (stacked cards) |
| All four scenes understandable | Pass (Attention, Inbox/Events, Narrative/Apps, Companions) |
| Reduced motion avoids scrub | Pass (CSS hide + Desktop null) |
| Reduced motion complete content | Pass (full static tour, not scene-4 only) |
| No horizontal page scroll / clipped controls | Pass (`overflow-x-clip`, max-height override) |
| Touch targets ≥ 44px on nav / key controls | Pass (`min-h-11`) |

---

## Acceptance checklist

- [x] Mobile uses normal document flow
- [x] All four product stories remain understandable
- [x] `prefers-reduced-motion: reduce` avoids scroll scrubbing
- [x] Reduced-motion state shows complete representative content
- [x] No clipped controls, horizontal page scroll, or text overflow
- [x] Touch targets meet the existing marketing-site contract
