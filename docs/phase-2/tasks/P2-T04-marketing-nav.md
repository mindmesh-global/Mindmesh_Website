# P2-T04: Build `MarketingNav` (Sticky + Anchor Scroll)

**Task ID:** P2-T04  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-03  
**Parent:** [phase-2-tasks.md](../phase-2-tasks.md)  
**Depends on:** [P2-T03](./P2-T03-marketing-layout.md), [P1-T02 § Sticky nav](../phase-1/tasks/P1-T02-section-map.md#sticky-nav-spec-minimal-linear-style)  
**Blocks:** P2-T07

---

## Quick reference

| Label | Target |
|-------|--------|
| Product | `#connect` |
| Features | `#features` |
| Security | `#trust` |
| Join waitlist | `#cta` (primary button) |

**File:** [`components/marketing/MarketingNav.tsx`](../../../components/marketing/MarketingNav.tsx)

---

## Behavior

| Rule | Implementation |
|------|----------------|
| Sticky | `fixed inset-x-0 top-0 z-50 h-16` |
| Appears after hero | Hidden (`-translate-y-full`) while `#hero` is in view; slides in when scrolled past |
| No hero yet | Nav always visible (fallback for pre–P2-T07 dev) |
| Smooth scroll | `scrollIntoView({ behavior: 'smooth' })` + `html.scroll-smooth` |
| Hash URL | `history.replaceState` updates URL without jump |

---

## Mobile pattern

**Choice:** Hamburger menu below `md` (768px).

| Viewport | UI |
|----------|-----|
| `md+` | Horizontal links + primary CTA inline |
| `<md` | Menu icon toggles dropdown panel with same four items |

Panel closes on: link click, Escape key.

---

## Styling (P1-T16 cheat sheet)

| Element | Classes |
|---------|---------|
| Bar | `h-16 bg-mm-surface-container/90 backdrop-blur-md border-b border-mm-outline-variant/40` |
| Text links | `text-sm font-medium text-mm-on-surface-variant hover:text-mm-on-background` |
| Primary CTA | `rounded-md bg-mm-primary-fixed ... text-mm-on-primary-fixed hover:bg-mm-primary-fixed-dim` |

---

## Not in nav (locked)

- `#how-it-works` (scroll only)
- `#problem`, theaters except via Product → `#connect`
- Hero secondary CTA targets `#connect`, not `#how-it-works` ([P1-T02](./P1-T02-section-map.md))

---

## Acceptance criteria checklist

- [x] Four nav items: Product, Features, Security, Join waitlist
- [x] Targets: `#connect`, `#features`, `#trust`, `#cta`
- [x] Smooth scroll to section anchors
- [x] Nav height 64px (`h-16`); marketing surface tokens
- [x] Mobile hamburger pattern documented and implemented
- [x] Appears after scroll past `#hero`

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Marketing nav approved | 2026-07-03 |

**P2-T04 status:** Done. Proceed to [P2-T05](./P2-T05-marketing-footer.md) or [P2-T06](./P2-T06-root-layout-marketing-branch.md).

---

## Downstream handoff

| Task | Note |
|------|------|
| P2-T07 | Section `id`s must match nav targets |
| P2-T13 | Hero needs `id="hero"` for nav reveal observer |
