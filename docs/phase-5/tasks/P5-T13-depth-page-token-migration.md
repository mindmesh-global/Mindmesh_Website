# P5-T13: Depth Page Token Migration

**Task ID:** P5-T13  
**Status:** done  
**Type:** Implementation / audit  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T12](./P5-T12-manrope-font-consolidation.md), [P1-T16](../../phase-1/tasks/P1-T16-token-reference.md), P5-T03–T08  
**Blocks:** P5-T15

---

## Goal

Confirm P5-T03–T08 depth pages use marketing semantic tokens (`mm-*` / `[data-marketing-theme="dark"]`) instead of page-local CSS vars, and close remaining raw elevation values.

---

## Audit (P5-T03–T08)

| Route | CSS module | Local CSS vars | Color utilities | Notes |
|-------|------------|----------------|-----------------|-------|
| `/connected-apps` | Deleted (T03) | None | `mm-*` only | Clean |
| `/inbox` | Deleted (T04) | None | `mm-*` + elevated shadow | Shadow tokenized |
| `/yesterdays-narrative` | Deleted (T05) | None | `mm-*` + elevated shadow | Shadow tokenized |
| `/upcoming-events` | Deleted (T06) | None | `mm-*` + elevated shadow | Shadow tokenized |
| `/security` | Deleted (T07) | None | `mm-*` only | Clean |
| `/trust` | Deleted (T08) | None | `mm-*` only | Clean |

All six pages render under `MarketingDepthLayout` → `data-marketing-theme="dark"`, so `--mm-*` from [`app/globals.css`](../../../app/globals.css) apply.

**No `--inbox-bg` / page-local color vars remain** on these routes (removed with CSS modules in T03–T08).

---

## Deliverables this task

| File | Change |
|------|--------|
| [`app/globals.css`](../../../app/globals.css) | Added `--mm-shadow-elevated` under marketing theme |
| [`tailwind.config.ts`](../../../tailwind.config.ts) | Added `shadow-mm-elevated` utility |
| [`app/inbox/page.tsx`](../../../app/inbox/page.tsx) | Mockup frame → `shadow-mm-elevated` |
| [`app/upcoming-events/page.tsx`](../../../app/upcoming-events/page.tsx) | Same |
| [`app/yesterdays-narrative/page.tsx`](../../../app/yesterdays-narrative/page.tsx) | Same |
| [`ProductFrame.tsx`](../../../components/marketing/theater/ProductFrame.tsx) | Same (homepage theaters stay consistent) |

---

## Token map used on depth pages

| Role | Utility |
|------|---------|
| Page / section canvas | `bg-mm-background` |
| Raised section | `bg-mm-surface-container-low` |
| Cards / mockup chrome | `bg-mm-surface-container`, `border-mm-outline-variant` |
| Headings | `text-mm-on-background` + `font-display` |
| Body / muted | `text-mm-on-surface-variant` |
| Links | `text-mm-primary` / `hover:text-mm-primary-dim` |
| Primary CTA | `bg-mm-primary-fixed` / `text-mm-on-primary-fixed` |
| Elevated frame | `shadow-mm-elevated` |

---

## Out of scope (per task)

- Full CSS module deletion on non-funnel pages (`/faq`, `/privacy`, `/billing`, …)
- Replacing layout literals like `max-w-[1120px]` (matches homepage; `--mm-layout-max` already 70rem)
- Homepage section refactors beyond ProductFrame shadow alignment

---

## Acceptance criteria

- [x] P5-T03–T08 pages audited for local CSS vars
- [x] No page-local color CSS modules on funnel depth routes
- [x] Remaining raw mockup shadows replaced with `shadow-mm-elevated`
- [x] Theme scope remains `[data-marketing-theme="dark"]`
- [x] HTTP 200 on sample depth routes

---

## Verification

```text
No CSS modules under app/{inbox,connected-apps,yesterdays-narrative,upcoming-events,security,trust}/
No shadow-[0_8px_32px...] on those pages
shadow-mm-elevated present on inbox / upcoming-events / yesterdays-narrative
200 on depth routes
```

---

## Next steps

- **P5-T14:** Depth page Lighthouse spot-check (non-blocker)
- **P5-T15:** Phase 5 sign-off
