# P7-T09: Theater Caption / Demo Micro-Copy Pass

**Task ID:** P7-T09  
**Status:** done  
**Type:** Content  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** Phase 4 theaters (P4-T01–T11)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Optional: tighten theater captions, depth-link labels, and Acme demo fixture copy. No scroll-kit / beat-sheet changes.

---

## Scope

| In | Out |
|----|-----|
| `lib/marketing-demo-data.ts` fixtures + theater captions | `lib/marketing-theater-scroll.ts` progress / step math |
| Connect / Focus / Execute section subheads + depth links | Sticky heights, `useScrollSection`, ProductFrame layout |
| Priority CTA, execute pulse label, success chips | Live API / dashboard non-marketing paths (except shared marketing banner string) |

---

## Changes

### Captions (single-sourced)

Section wrappers now read `THEATER_DEMO_FIXTURES.*.caption` instead of duplicating strings.

| Theater | Before | After |
|---------|--------|-------|
| Connect | All seven sources connected and syncing in MindMesh. | Seven sources connected. Syncing into one layer. |
| Focus | One priority: Prepare for the 2pm client call, backed by email, calendar, and Jira context. | One priority for 2pm, backed by email, calendar, and Jira. |
| Execute | Reply drafted, prep block scheduled, Jira task updated. | Reply drafted. Prep blocked. PROD-142 done. |

### Section subheads / depth links

| Surface | Change |
|---------|--------|
| Connect subtitle | Small comma for clarity; same meaning |
| Focus subtitle | Shorter; keeps “one priority” + trust reason |
| Execute subtitle | “update tasks” instead of “check off” |
| Execute depth links | `Open inbox →` / `Upcoming events →` |

### Fixtures (`marketing-demo-data.ts`)

- Priority reason shortened
- Inbox previews tightened; removed ellipsis glyph in newsletter
- Calendar event title: colon instead of em dash; prep time hyphen; shorter note
- Signal detail: “Moved to In Progress”
- Draft body slightly shorter (typing still scroll-scrubbed by length)
- Success: `Done. You are ready for 2pm.`

### In-frame microcopy

| Surface | After |
|---------|-------|
| Priority card CTA | Act on this → |
| Execute pulse | MindMesh handles this → |
| Success chip (calendar) | Prep blocked |
| Connect sync banner | `{n} sources connected` |

---

## Non-changes (intentional)

- Theater titles (H2)
- Persona / Acme story arc (2pm call, Dana, PROD-142)
- Beat counts, scroll distances, reduced-motion behavior
- `hooks/useScrollSection.ts` / ProductFrame structure

---

## Acceptance

- [x] Captions / fixtures / depth labels tightened
- [x] Captions single-sourced from demo fixtures
- [x] No scroll-kit edits
- [x] No em dashes in new fixture / caption copy
