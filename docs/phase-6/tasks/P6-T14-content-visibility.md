# P6-T14: `content-visibility` Below-Fold

**Task ID:** P6-T14  
**Status:** done  
**Type:** Implementation (optional polish)  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P6-T09](./P6-T09-homepage-lighthouse-rebaseline.md), [P1-T15](../../phase-1/tasks/P1-T15-layout-rules.md), [P1-T17](../../phase-1/tasks/P1-T17-performance-budget.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Apply `content-visibility: auto` to below-fold homepage sections where safe, paired with `contain-intrinsic-size`, without CLS regression or breaking theater sticky scroll.

---

## Scope decision (sections 4–9)

| Section | ID | Applied? | Reason |
|---------|----|----------|--------|
| 4–6 Theaters | `#connect` `#focus` `#execute` | **No** | Sticky `ProductFrame` needs a non-contained ancestor; `content-visibility: auto` applies layout containment and breaks sticky ([P1-T17](../../phase-1/tasks/P1-T17-performance-budget.md) "where safe") |
| 7 Features | `#features` | **Yes** | Static grid; safe |
| 8 Integrations | `#integrations` | **Yes** | Static icons; safe |
| 9 Trust | `#trust` | **Yes** | Static trust block; safe |
| 10 CTA | `#cta` | No | Not in 4–9 brief; keep interactive form always rendered |

---

## Deliverables

| File | Change |
|------|--------|
| [`app/globals.css`](../../../app/globals.css) | Marketing-scoped rules for `#features`, `#integrations`, `#trust` |

```css
[data-marketing-theme='dark'] main > section#features {
  content-visibility: auto;
  contain-intrinsic-size: auto 800px;
}

[data-marketing-theme='dark'] main > section#integrations,
[data-marketing-theme='dark'] main > section#trust {
  content-visibility: auto;
  contain-intrinsic-size: auto 640px;
}
```

`auto` in `contain-intrinsic-size` remembers measured height after first paint so later off-screen passes stay stable.

---

## Acceptance criteria

- [x] Below-fold static sections use `content-visibility: auto` + `contain-intrinsic-size`
- [x] Theater sections excluded (sticky preserved)
- [x] No CLS regression on scroll-through (measured **0**)
- [x] Documented exception for sections 4–6

---

## Verification (2026-07-09)

Dev `http://localhost:3002/`, CDP `getComputedStyle`:

| Element | `content-visibility` | Sticky |
|---------|----------------------|--------|
| `#features` | `auto` | n/a |
| `#integrations` | `auto` | n/a |
| `#trust` | `auto` | n/a |
| `#connect` / `#focus` / `#execute` | `visible` | `.theater-sticky-frame` → `position: sticky` |
| Scroll-through CLS | **0** | |

---

## Next steps

- **P6-T15:** Phase 6 sign-off
- Optional **P6-T11:** Metadata alignment
