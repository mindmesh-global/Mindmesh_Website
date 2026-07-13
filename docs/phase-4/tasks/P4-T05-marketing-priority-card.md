# P4-T05: `MarketingPriorityCard`

**Task ID:** P4-T05  
**Status:** done  
**Type:** New component  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P3-T11, [P1-T07](../../phase-1/tasks/P1-T07-theater-focus.md), [P1-T23](../../phase-1/tasks/P1-T23-theater-reuse-map.md)  
**Blocks:** P4-T06, P4-T10

---

## Goal

New priority card component for Focus reveal (beat 0.50+) and Execute carry-over, using `PRIORITY_FIXTURE_ACME`.

---

## Component

[`MarketingPriorityCard.tsx`](../../../components/marketing/theater/marketing/MarketingPriorityCard.tsx)

### Props

| Prop | Default | Purpose |
|------|---------|---------|
| `priority` | `PRIORITY_FIXTURE_ACME` | Title, reason, source chips |
| `compact` | `false` | Smaller layout for Execute theater (P1-T08) |
| `emphasized` | `false` | Accent ring on hold beats |
| `opacity` | `1` | Scroll-driven emerge (0→1) |
| `scale` | `1` | Emerge scale (0.92→1 in P4-T06) |
| `showCta` | `false` | Visual "Review and act →" (not a link) |

### UI (P1-T07)

| Element | Content |
|---------|---------|
| Eyebrow | Your priority |
| Title | Prepare for 2pm client call |
| Body | Dana's unread thread… |
| Source chips | Gmail · Google Calendar · Jira |
| Left accent | `border-l-mm-primary-fixed` |
| Theme | `--mm-surface-container-high` |

### Types

`PriorityFixture` exported from [`lib/marketing-demo-data.ts`](../../../lib/marketing-demo-data.ts).

Barrel export: [`theater/index.ts`](../../../components/marketing/theater/index.ts).

---

## Checklist

- [x] Matches P1-T07 priority card spec
- [x] `compact` variant for Execute carry-over
- [x] `opacity` + `scale` for transform/opacity-only animation
- [x] `emphasized` + optional visual CTA
- [x] Composed in `FocusTheaterDemo` (P4-T06)
- [ ] Compact use in `ExecuteTheaterDemo` (P4-T10)

---

## Next steps

- **P4-T06:** `FocusTheaterDemo` with scroll-driven priority emerge
- **P4-T10:** Compact card at top of Execute sequence
