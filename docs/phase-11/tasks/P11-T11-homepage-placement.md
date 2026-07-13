# P11-T11: Homepage Placement + Dynamic Loading

**Task ID:** P11-T11  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-12  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T10](./P11-T10-scene-transitions.md)  
**Blocks:** P11-T12  
**Blocker:** Yes

---

## Goal

Mount the product overview directly under the homepage hero with a server-rendered section shell and a dynamically loaded interactive body, without changing the hero LCP path.

---

## What shipped

| Piece | Detail |
|-------|--------|
| Homepage order | Hero → Product Overview → Problem → … |
| Mount | [`app/page.tsx`](../../../app/page.tsx) via `ProductOverviewHome` |
| SSR chrome | Section eyebrow / title / subtitle from `PRODUCT_OVERVIEW_SECTION` |
| Dynamic body | `ProductOverviewInteractive` loads Desktop / Mobile with `ssr: false` |
| Skeleton | `ProductOverviewSkeleton` reserves desktop `180vh` + frame chrome; mobile stacks four frames |

### Files

- `components/marketing/product-overview/ProductOverviewHome.tsx`
- `components/marketing/product-overview/ProductOverviewInteractive.tsx`
- `components/marketing/product-overview/ProductOverviewSkeleton.tsx`
- `app/page.tsx`

Hero H1 / CTA / LCP path unchanged. No `mindmesh_app` imports on the homepage.

---

## Acceptance checklist

- [x] Order is Hero, Product Overview, Problem
- [x] Interactive body is dynamically loaded below the hero
- [x] A dimensionally stable server-rendered shell or fallback is present
- [x] Hero H1, CTA, and LCP path are unchanged
- [x] Existing homepage sections remain in their current order
- [x] No authenticated product dependency reaches the homepage bundle
