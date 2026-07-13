# P3-T11: Step Index Helpers + Demo-Data Coupling

**Task ID:** P3-T11  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P3-T01, P2-T11

---

## Summary

Extended Acme fixtures for Focus theater and added Phase 4 helpers that couple scroll step indices with demo data and sub-beat progress.

---

## `lib/marketing-demo-data.ts`

### New exports

| Export | Used by |
|--------|---------|
| `MARKETING_PERSONA_ACME` | Shared Alex / Acme Co. persona |
| `INBOX_FIXTURES_ACME` | Focus theater (Dana + 2 noise rows) |
| `CALENDAR_FIXTURES_ACME` | Focus theater (standup + client call) |
| `SIGNAL_FIXTURES_ACME` | Focus theater (Slack + Jira chips) |
| `DRAFT_FIXTURE_ACME` | Execute theater (to / subject / body) |
| `THEATER_DEMO_FIXTURES` | Per-theater fixture bundles |
| `getTheaterDemoFixtures(theaterId)` | Phase 4 entry point |

Existing exports unchanged: `PRIORITY_FIXTURE_ACME`, `DRAFT_BODY_ACME`, `CONNECTED_APP_FIXTURES_ACME`, etc.

### Cross-theater persona

Focus and Execute both reference the same `PRIORITY_FIXTURE_ACME` object inside `THEATER_DEMO_FIXTURES`:

```ts
THEATER_DEMO_FIXTURES.focus.priority === THEATER_DEMO_FIXTURES.execute.priority // true
```

Title locked to P1-T07: **"Prepare for 2pm client call"**.

---

## `lib/marketing-theater-scroll.ts`

### New helpers

| Function | Purpose |
|----------|---------|
| `getTheaterStep(theaterId, progress)` | Integer beat index (P3-T01, used by `useScrollSection`) |
| `getTheaterStepDefinition(theaterId, stepIndex)` | Beat metadata by index |
| `getTheaterStepAtProgress(theaterId, progress)` | Active beat metadata at progress |
| `getBeatLocalProgress(theaterId, progress)` | 0–1 within current beat (stagger / scrub) |
| `getConnectVisibleAppCount(progress, totalApps?)` | Connect fly-in visible app count |
| `getScrollSyncedCharIndex(text, theaterId, progress, beatId?)` | Execute draft typing scrub |

### Phase 4 usage sketch

```tsx
const { step, progress } = useTheaterScroll();
const fixtures = getTheaterDemoFixtures('connect');
const visibleApps = fixtures.apps.slice(0, getConnectVisibleAppCount(progress));

const draft = getTheaterDemoFixtures('execute').draft;
const typed = draft.body.slice(
  0,
  getScrollSyncedCharIndex(draft.body, 'execute', progress)
);
```

---

## Acceptance criteria

- [x] `getTheaterStep(theaterId, progress)` returns integer step index
- [x] Acme persona unchanged across Focus + Execute

---

## Next steps

- **P3-T12:** Reduced-motion QA
- **Phase 4:** Wire helpers into animated theater components
