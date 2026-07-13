# P1-T23: Product Theater Reuse Map (Static* Components)

**Task ID:** P1-T23  
**Status:** done  
**Type:** Strategy and documentation (Phase 3–4 implementation guide)  
**Completed:** 2026-07-03  
**Parent:** [phase-1-tasks.md](../phase-1-tasks.md) | [phase-1-foundation.md](../phase-1-foundation.md) §5.2  
**Depends on:** [P1-T06-theater-connect.md](./P1-T06-theater-connect.md), [P1-T07-theater-focus.md](./P1-T07-theater-focus.md), [P1-T08-theater-execute.md](./P1-T08-theater-execute.md)  
**Blocks:** Phase 3 scroll kit, Phase 4 theater components

---

## Quick reference

| Theater | Anchor | Primary reuse | New build | Refactor effort |
|---------|--------|---------------|-----------|-----------------|
| **Connect** | `#connect` | `StaticConnectedApps` | `ProductFrame`, 7-app cards | **M** |
| **Focus** | `#focus` | `StaticInboxList`, `StaticCalendarEvents` | `MarketingPriorityCard`, signal chips | **M–L** |
| **Execute** | `#execute` | `TypingText`, `MarketingPriorityCard` | Draft, calendar, Jira panels | **M** |

**Shared:** `lib/marketing-demo-data.ts` (fixtures), `ProductFrame.tsx`, `useScrollSection` (Phase 3)

**Not used in theaters:** `StaticWeatherCard`, `StaticDailySummaryPanel` (wrong UX shape)

---

## Master matrix: theater × component

| Theater | Scroll progress | Existing component | Action | New props / API | Refactor |
|---------|-----------------|-------------------|--------|-----------------|----------|
| **Connect** | 0.0–0.15 | `StaticConnectedApps` | Empty grid | `step={0}`, `variant="marketing"`, `apps=[]` | M |
| **Connect** | 0.15–0.55 | `StaticConnectedApps` | Apps 1→7 fly-in | `step={1}`, `visibleCount={n}` or `progress` | M |
| **Connect** | 0.55–0.90 | `StaticConnectedApps` | All connected badges | `step={2}`, `showConnectedBadge` | M |
| **Connect** | 0.90–1.0 | `StaticConnectedApps` | Hold + sync banner | `step={3}`, `showSyncBanner` | M |
| **Focus** | 0.0–0.35 | `StaticInboxList` | Noisy inbox | `variant="marketing"`, `messages`, `maxRows={3}`, `interactive={false}` | M |
| **Focus** | 0.0–0.35 | `StaticCalendarEvents` | Two events | `variant="marketing"`, `events`, `hideJoinButtons` | S |
| **Focus** | 0.18–0.35 | *(new)* `MarketingSignalChips` | Slack + Jira toasts | `chips={SIGNAL_FIXTURES}`, `opacity` from scroll | M |
| **Focus** | 0.35–0.50 | Inbox + calendar | Cross-highlight | `highlightIds={['dana','client-call','prod-142']}` optional CSS class | S |
| **Focus** | 0.50–1.0 | Inbox + calendar | Dimmed background | `dimmed={true}`, `opacity={0.35}` | S |
| **Focus** | 0.50–1.0 | *(new)* `MarketingPriorityCard` | Single priority | `priority={PRIORITY_FIXTURE_ACME}`, `emphasis` from scroll | L |
| **Execute** | 0.0–0.22 | `MarketingPriorityCard` | Compact carry-over | `compact`, same `priority` fixture | S |
| **Execute** | 0.22–0.50 | *(new)* `MarketingDraftPanel` + `TypingText` | Gmail compose typing | `draft={DRAFT_FIXTURE}`, `scrollProgress` or `charIndex` | M |
| **Execute** | 0.50–0.68 | *(new)* `MarketingCalendarBlock` | Prep block insert | `event={CALENDAR_PREP_FIXTURE}`, `visible` | S |
| **Execute** | 0.68–0.82 | *(new)* `MarketingJiraRow` | PROD-142 checked | `task={JIRA_FIXTURE}`, `checked={scrollStep >= n}` | S |
| **Execute** | 0.82–1.0 | *(new)* `MarketingExecuteSuccess` | Banner + checkmarks | `message="Done. Ready for your 2pm call."` | S |

---

## Refactor scope (S / M / L)

| Component / module | Size | Work summary |
|--------------------|------|--------------|
| `ProductFrame.tsx` | **M** | New shared sticky-frame chrome; `--mm-surface-raised`, optional left rail |
| `useScrollSection` hook | **M** | Phase 3; maps `scrollYProgress` → step index + pause off-screen |
| `StaticConnectedApps` | **M** | 7 apps, marketing theme, `step`/`variant`, remove dashboard context deps |
| `StaticInboxList` | **M** | External fixtures, marketing variant, disable expand/dropdown |
| `StaticCalendarEvents` | **S** | External fixtures, hide join buttons, marketing tokens |
| `MarketingPriorityCard` | **L** | **New file**; no suitable Static* equivalent |
| `MarketingSignalChips` | **M** | **New file**; small overlay chips |
| `MarketingDraftPanel` | **M** | **New file**; compose chrome + scroll-driven text |
| `MarketingCalendarBlock` | **S** | **New file**; single event row |
| `MarketingJiraRow` | **S** | **New file**; checkbox row |
| `MarketingExecuteSuccess` | **S** | **New file**; banner + three done indicators |
| `TypingText` | **S** | Add optional `progress?: number` (0–1) for scroll-scrubbed reveal; or wrapper only |
| `StaticDailyNarrativeCard` | **—** | Not used (wrong content model) |
| `StaticDailySummaryPanel` | **—** | Not used (multi-widget dashboard; not one priority) |
| `StaticWeatherCard` | **—** | Not used |
| `HoverTypingTooltip` | **—** | Strip from all marketing variants |
| `lib/marketing-demo-data.ts` | **M** | Central fixtures; shared Acme persona |

---

## Per-theater detail

### Connect (`ProductTheaterConnect.tsx`)

**Brief:** [P1-T06](./P1-T06-theater-connect.md)

| Item | Detail |
|------|--------|
| **Reuse** | [`StaticConnectedApps.tsx`](../../../components/dashboard/StaticConnectedApps.tsx) |
| **Frame** | `ProductFrame` → connected apps grid |
| **Wrapper** | `min-h-[220vh]` / `min-h-[120vh]` mobile |

**Proposed props (`StaticConnectedApps`):**

```ts
type StaticConnectedAppsProps = {
  variant?: 'dashboard' | 'marketing'; // default dashboard
  apps?: ConnectedAppFixture[];
  step?: 0 | 1 | 2 | 3;
  visibleAppCount?: number; // 0–7 for stagger animation
  showSyncBanner?: boolean;
  className?: string;
};
```

**Gaps before animation:**

- Add Outlook Calendar, Slack, Jira cards ([P1-T20](./P1-T20-integrations-audit.md))
- Replace gradient SVG icons with `public/images/icons/*` PNGs
- Remove `useSectionHover` / `HoverTypingTooltip` when `variant="marketing"`
- Dark theme: `bg-mm-surface-container`, `border-mm-outline-variant`

---

### Focus (`ProductTheaterFocus.tsx`)

**Brief:** [P1-T07](./P1-T07-theater-focus.md)

| Item | Detail |
|------|--------|
| **Reuse** | `StaticInboxList`, `StaticCalendarEvents` |
| **New** | `MarketingPriorityCard`, `MarketingSignalChips` |
| **Skip** | `StaticDailySummaryPanel` |

**Proposed props (`StaticInboxList`):**

```ts
type StaticInboxListProps = {
  variant?: 'dashboard' | 'marketing';
  messages?: InboxMessage[];
  maxRows?: number;
  interactive?: boolean; // false in theater
  dimmed?: boolean;
  className?: string;
};
```

**Proposed props (`StaticCalendarEvents`):**

```ts
type StaticCalendarEventsProps = {
  variant?: 'dashboard' | 'marketing';
  events?: CalendarEventFixture[];
  hideJoinButtons?: boolean;
  dimmed?: boolean;
  className?: string;
};
```

**`MarketingPriorityCard` (new):**

```ts
type MarketingPriorityCardProps = {
  priority: PriorityFixture;
  compact?: boolean; // Execute carry-over
  emphasized?: boolean;
  className?: string;
};
```

---

### Execute (`ProductTheaterExecute.tsx`)

**Brief:** [P1-T08](./P1-T08-theater-execute.md)

| Item | Detail |
|------|--------|
| **Reuse** | `TypingText`, `MarketingPriorityCard` (from Focus) |
| **New** | `MarketingDraftPanel`, `MarketingCalendarBlock`, `MarketingJiraRow`, `MarketingExecuteSuccess` |
| **Skip** | `StaticDailyNarrativeCard` (optional styling reference only) |

**Scroll-synced typing (recommended pattern):**

```tsx
// Wrapper avoids changing TypingText timer logic initially
function ScrollSyncedDraft({ text, progress }: { text: string; progress: number }) {
  const charIndex = Math.floor(progress * text.length);
  return <span>{text.slice(0, charIndex)}</span>;
}
```

Phase 4 can later add `progress?: number` to `TypingText` directly (**S** refactor).

---

## `lib/marketing-demo-data.ts` (Phase 4 prep)

Single source for Acme Co. persona across Connect, Focus, Execute, and optional dashboard alignment.

### Exports

| Export | Used by | Content |
|--------|---------|---------|
| `MARKETING_INTEGRATIONS` | Connect, `#integrations` | 7 apps ([P1-T10](./P1-T10-integrations.md)) |
| `CONNECTED_APP_FIXTURES_ACME` | Connect theater | 7 apps + account labels |
| `INBOX_FIXTURES_ACME` | Focus theater | Dana thread + 2 noise rows |
| `CALENDAR_FIXTURES_ACME` | Focus theater | Standup 11am + client call 2pm |
| `SIGNAL_FIXTURES_ACME` | Focus theater | Slack #product-updates, Jira PROD-142 |
| `PRIORITY_FIXTURE_ACME` | Focus + Execute | Canonical priority (locked P1-T07) |
| `DRAFT_FIXTURE_ACME` | Execute theater | Email to Dana (full body P1-T08) |
| `CALENDAR_PREP_FIXTURE_ACME` | Execute theater | 1:30–2:00 prep block |
| `JIRA_FIXTURE_ACME` | Focus chips + Execute row | PROD-142 |
| `EXECUTE_SUCCESS_COPY` | Execute theater | "Done. Ready for your 2pm call." |

### Canonical priority (cross-theater)

```ts
export const PRIORITY_FIXTURE_ACME = {
  id: 'priority-acme-2pm',
  title: 'Prepare for 2pm client call',
  reason:
    "Dana's unread thread needs a reply before your call, and PROD-142 is still open in Jira.",
  sources: ['Gmail', 'Google Calendar', 'Jira'] as const,
} as const;
```

### Connected apps (7)

```ts
export const CONNECTED_APP_FIXTURES_ACME = [
  { id: 'gmail', name: 'Gmail', category: 'Email', accountLabel: 'alex@acme.co', iconSrc: '/images/icons/gmail.png' },
  { id: 'google-calendar', name: 'Google Calendar', category: 'Calendar', accountLabel: 'alex@acme.co', iconSrc: '/images/icons/google-calendar.png' },
  { id: 'outlook-email', name: 'Outlook Email', category: 'Email', accountLabel: 'alex@outlook.com', iconSrc: '/images/icons/outlook.png' },
  { id: 'outlook-calendar', name: 'Outlook Calendar', category: 'Calendar', accountLabel: 'alex@outlook.com', iconSrc: '/images/icons/outlook-calendar.png' },
  { id: 'smtp', name: 'SMTP Mailbox', category: 'Email', accountLabel: 'mail@acme.co', iconSrc: '/images/icons/smtp.png' },
  { id: 'slack', name: 'Slack', category: 'Messaging', accountLabel: 'Acme Workspace', iconSrc: '/images/icons/slack.png' },
  { id: 'jira', name: 'Jira', category: 'Tasks', accountLabel: 'acme.atlassian.net', iconSrc: '/images/icons/jira.png' },
] as const;
```

Slack/Jira icon paths depend on [P1-T21](../phase-1-tasks.md#p1-t21--source-slack-and-jira-brand-assets-for-marketing).

### Inbox (Focus noise + Dana)

```ts
export const INBOX_FIXTURES_ACME = [
  {
    id: 'dana',
    from: 'Dana Reyes',
    subject: 'Re: Q2 rollout timeline',
    preview: 'Can we confirm scope before the 2pm call?',
    unread: true,
    highlight: true,
  },
  // + 2 low-priority noise rows (newsletter, internal FYI)
] as const;
```

### Calendar (Focus)

```ts
export const CALENDAR_FIXTURES_ACME = [
  { id: 'standup', title: 'Team standup', time: '11:00 AM', source: 'Google Calendar' },
  { id: 'client-call', title: 'Client call — Acme x ClientCo', time: '2:00 PM', source: 'Google Calendar', highlight: true },
] as const;
```

### Execute draft (excerpt)

Full body in [P1-T08](./P1-T08-theater-execute.md). Export as single string `DRAFT_BODY_ACME` for scroll typing.

---

## New components file plan (Phase 4)

```
components/marketing/theater/
  ProductFrame.tsx              # Phase 3
  MarketingPriorityCard.tsx
  MarketingSignalChips.tsx
  MarketingDraftPanel.tsx
  MarketingCalendarBlock.tsx
  MarketingJiraRow.tsx
  MarketingExecuteSuccess.tsx
components/marketing/sections/
  ProductTheaterConnect.tsx     # dynamic import
  ProductTheaterFocus.tsx
  ProductTheaterExecute.tsx
lib/
  marketing-demo-data.ts
hooks/
  useScrollSection.ts           # Phase 3
```

Dashboard `Static*` files stay in `components/dashboard/`; marketing variants live behind `variant` prop or thin wrappers in `components/marketing/theater/`.

---

## Shared infrastructure (Phase 3)

| Module | Role |
|--------|------|
| `ProductFrame.tsx` | Sticky inner chrome: rounded-lg, `--mm-surface-raised`, padding, optional fake nav rail |
| `useScrollSection` | Returns `{ progress, step, isInView }`; respects reduced motion → final step |
| `ProductTheater*.tsx` | Compose frame + Static*/Marketing* per beat sheet |

**Reduced motion:** Each theater jumps to final step (Connect 0.90, Focus 0.85, Execute 0.92) per briefs.

---

## Dashboard compatibility rules

When refactoring `Static*` components:

1. **Default props** preserve current dashboard behavior (`variant="dashboard"`).
2. Do not import `SectionHoverContext` in marketing code paths.
3. Do not break [`DashboardDesktopShell.tsx`](../../../components/dashboard/view-shells/DashboardDesktopShell.tsx) imports.
4. Long term: dashboard should also show 7 apps ([P1-T20](./P1-T20-integrations-audit.md) Phase 5/6).

---

## Gaps requiring refactor before animation

| Gap | Blocker for | Fix phase |
|-----|-------------|-----------|
| Only 4 apps in `StaticConnectedApps` | Connect theater | Phase 4 (+ P1-T21 icons) |
| Hardcoded inbox/calendar copy | Focus theater | Phase 4 fixtures |
| No priority card component | Focus + Execute | Phase 4 new build |
| `TypingText` timer-only API | Execute scroll scrub | Phase 4 wrapper or prop |
| Light-theme-only panels | All theaters | `variant="marketing"` theme branch |
| `SectionHoverContext` coupling | Marketing perf/clarity | Remove in marketing variant |

---

## Acceptance criteria checklist

- [x] Matrix: theater sequence × component × required props
- [x] Fixture list for `lib/marketing-demo-data.ts`
- [x] Gaps and refactor needs documented
- [x] Each theater has at least one identified reuse target
- [x] Refactor scope estimated (S/M/L) per component

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Approved reuse map and Phase 3/4 split | 2026-07-03 |

**P1-T23 status:** Done. Phase 3 builds frame + scroll hook; Phase 4 implements theaters using this map.

---

## Downstream handoff

| Consumer | Uses from this doc |
|----------|-------------------|
| Phase 3 | `ProductFrame`, `useScrollSection` |
| Phase 4 | All three `ProductTheater*` composers |
| P1-T21 | Slack/Jira icons in `CONNECTED_APP_FIXTURES_ACME` |
| P1-T20 | StaticConnectedApps 7-app alignment |
