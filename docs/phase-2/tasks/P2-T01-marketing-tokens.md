# P2-T01: Wire Marketing Tokens in `globals.css`

**Task ID:** P2-T01  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-03  
**Parent:** [phase-2-tasks.md](../phase-2-tasks.md) | [phase-2-shell.md](../phase-2-shell.md)  
**Depends on:** [P1-T16-token-reference.md](../phase-1/tasks/P1-T16-token-reference.md)  
**Blocks:** P2-T03, all `components/marketing/*`

---

## Quick reference

| Field | Value |
|-------|-------|
| **File changed** | [`app/globals.css`](../../../app/globals.css) |
| **Scope selector** | `[data-marketing-theme='dark']` |
| **Background** | `--mm-bg` → `#060e20` |
| **Legacy body** | `#0a0a14` unchanged on `html, body` |

---

## What was added

Semantic marketing tokens copied from [P1-T16 § Phase 2 globals block](../phase-1/tasks/P1-T16-token-reference.md#phase-2-full-globalscss-block):

| Category | Count | Notes |
|----------|-------|-------|
| Color (baseline) | 7 | bg, surface, border, text, accent |
| Color (extended) | 10 | hover, outline, input, error states |
| Typography | 2 | `--font-display`, `--font-body` |
| Layout | 10 | max width, section padding, radius, nav, theater |
| Utilities | 2 | `.font-display`, anchor `scroll-margin-top` |

**Total color tokens:** 17 (matches P1-T13 / P1-T16)

---

## Usage

Wrap marketing pages in an element with `data-marketing-theme="dark"` (see P2-T03 `MarketingLayout`):

```tsx
<div data-marketing-theme="dark" className="min-h-screen bg-mm-background text-mm-on-background">
  {/* sections */}
</div>
```

### CSS variables vs Tailwind

Both are valid under the marketing theme:

| Intent | CSS variable | Tailwind (existing in `tailwind.config.ts`) |
|--------|--------------|---------------------------------------------|
| Page background | `var(--mm-bg)` | `bg-mm-background` |
| Surface card | `var(--mm-surface)` | `bg-mm-surface-container` |
| Primary text | `var(--mm-text)` | `text-mm-on-background` |
| Muted text | `var(--mm-text-muted)` | `text-mm-on-surface-variant` |
| Primary button | `var(--mm-accent-strong)` | `bg-mm-primary-fixed` |

Tailwind `mm-*` colors are hardcoded in config and match P1-T13 hex values. Semantic `--mm-*` vars apply inside the theme scope for custom CSS and future token-driven overrides.

---

## Typography note

`--font-display` and `--font-body` resolve via `--font-manrope` / `--font-inter` on `<html>` ([P2-T02](./P2-T02-manrope-font.md)).

---

## Legacy isolation

| Surface | Background | Changed? |
|---------|------------|----------|
| `html, body` | `#0a0a14` | No |
| `.mindmesh-marketing-root` | `#0a0a14` | No |
| `[data-marketing-theme='dark']` | `#060e20` | Yes (new) |

Legacy Hero and non-marketing routes keep existing canvas until Phase 6.

---

## Acceptance criteria checklist

- [x] 17 semantic tokens defined under `[data-marketing-theme="dark"]`
- [x] `--mm-bg` resolves to `#060e20`
- [x] No new colors invented beyond P1-T13 map
- [x] Legacy `#0a0a14` unchanged outside marketing scope
- [x] `.font-display` and section anchor scroll offset included

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Marketing tokens wired in globals.css | 2026-07-03 |

**P2-T01 status:** Done. Proceed to [P2-T02](./P2-T02-manrope-font.md) or [P2-T03](./P2-T03-marketing-layout.md).

---

## Downstream handoff

| Task | Uses from this work |
|------|---------------------|
| P2-T03 | `data-marketing-theme="dark"` on `MarketingLayout` root |
| P2-T08+ | Section shells use `bg-mm-background`, semantic vars |
| P2-T02 | Wire `--font-manrope` on `html` for display font |
