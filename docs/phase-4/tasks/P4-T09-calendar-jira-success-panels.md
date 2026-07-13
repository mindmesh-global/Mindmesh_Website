# P4-T09: Calendar Block, Jira Row, Execute Success Panels

**Task ID:** P4-T09  
**Status:** done  
**Type:** New marketing micro-components  
**Completed:** 2026-07-04  
**Parent:** [phase-4-tasks.md](../phase-4-tasks.md)  
**Depends on:** P3-T11, [P1-T08](../../phase-1/tasks/P1-T08-theater-execute.md)  
**Blocks:** P4-T10

---

## Goal

Three Execute theater panels for beats 3–5: calendar prep slide-in, Jira checkbox check, success banner with done indicators.

---

## Implementation

### `MarketingCalendarBlock`

[`components/marketing/theater/marketing/MarketingCalendarBlock.tsx`](../../../components/marketing/theater/marketing/MarketingCalendarBlock.tsx)

| Prop | Default | Purpose |
|------|---------|---------|
| `event` | `CALENDAR_PREP_FIXTURE_ACME` | Title, time, note |
| `scrollProgress` | — | Drives opacity + slide via `getExecuteCalendarReveal` |
| `opacity` / `translateX` | — | Explicit overrides for static/testing |

Beat 3 (0.50–0.68): slides in from +16px with fade.

### `MarketingJiraRow`

[`components/marketing/theater/marketing/MarketingJiraRow.tsx`](../../../components/marketing/theater/marketing/MarketingJiraRow.tsx)

| Prop | Default | Purpose |
|------|---------|---------|
| `task` | `JIRA_FIXTURE_ACME` | Key, title, status |
| `scrollProgress` | — | Drives checkbox via `getExecuteJiraCheckProgress` |
| `checked` / `checkProgress` | — | Explicit overrides |
| `opacity` | `1` | Row fade for P4-T10 |

Beat 4 (0.68–0.82): checkbox scales and checkmark draws in.

### `MarketingExecuteSuccess`

[`components/marketing/theater/marketing/MarketingExecuteSuccess.tsx`](../../../components/marketing/theater/marketing/MarketingExecuteSuccess.tsx)

| Prop | Default | Purpose |
|------|---------|---------|
| `message` | `EXECUTE_SUCCESS_COPY` | Banner headline |
| `scrollProgress` | — | Fade via `getExecuteSuccessOpacity` |
| `opacity` | — | Explicit override |
| `showDoneIndicators` | `true` | Reply / prep / Jira chips |

Beat 5 (0.82–0.92): success banner fades in with three done indicators.

### Scroll helpers

[`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts)

- `getExecuteCalendarReveal(progress)` → `{ opacity, translateX }`
- `getExecuteJiraCheckProgress(progress)` → `0–1`
- `getExecuteSuccessOpacity(progress)` → `0–1`

### Types

[`lib/marketing-demo-data.ts`](../../../lib/marketing-demo-data.ts)

- `CalendarPrepFixture`
- `JiraTaskFixture`

### Exports

All three components exported from [`components/marketing/theater/index.ts`](../../../components/marketing/theater/index.ts).

---

## Beat mapping (P1-T08)

| Progress | Panel | Behavior |
|----------|-------|----------|
| 0.50–0.68 | Calendar | Slide + fade in |
| 0.68–0.82 | Jira | Checkbox check animation |
| 0.82–0.92 | Success | Banner + done chips fade in |

---

## Checklist

- [x] `MarketingCalendarBlock` with `CALENDAR_PREP_FIXTURE_ACME`
- [x] Slide/fade props + scroll helper (beat 0.50–0.68)
- [x] `MarketingJiraRow` with `JIRA_FIXTURE_ACME`
- [x] `checked` / `checkProgress` props (beat 0.68–0.82)
- [x] `MarketingExecuteSuccess` with `EXECUTE_SUCCESS_COPY`
- [x] Three done indicators (draft, calendar, Jira)
- [x] Exported from theater index
- [ ] Composed in `ExecuteTheaterDemo` (P4-T10) — done; wired in section (P4-T11) — done

---

## Next steps

- **P4-T10:** `ExecuteTheaterDemo` composes draft + calendar + Jira + success panels
