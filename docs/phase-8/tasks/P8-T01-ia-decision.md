# P8-T01: IA Decision - Split Routes + Feature-Grid Policy

**Task ID:** P8-T01  
**Status:** done  
**Type:** Decision (documentation; no product UI in this task)  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P1-T09](../../phase-1/tasks/P1-T09-feature-grid.md), [P1-T01](../../phase-1/tasks/P1-T01-narrative.md), [P7-T12](../../phase-7/tasks/P7-T12-sign-off.md)  
**Blocks:** P8-T02, P8-T03, P8-T13  
**Blocker:** Yes

---

## Verdict

| Decision | Choice |
|----------|--------|
| Primary routes | **Split:** `/sensor` and `/mascot` (separate depth pages) |
| Combined hub as primary | **No** (legacy URL only until redirect) |
| Homepage feature grid | **Add** Sensor + Mascot cards (5 → **7**) |
| Homepage narrative lead | **Unchanged** (hero / problem / how-it-works / Connect-Focus-Execute theaters do not lead with Sensor or Mascot) |
| Shell | Both pages use `MarketingDepthLayout` + marketing funnel gate |
| Live overlays on new pages | **Forbidden** (scroll theaters only) |

This supersedes the P1-T09 “exclude Sensor & mascot from the feature grid” rule for **discovery cards only**. The P1-T01 rule that the homepage must not **lead** with these surfaces remains in force.

---

## 1. Route IA (locked)

| Route | Role | Shell | In sitemap (P8-T17) |
|-------|------|-------|---------------------|
| `/sensor` | Sensor product depth + scroll theater | `MarketingDepthLayout` | Yes |
| `/mascot` | Mascot product depth + scroll theater | `MarketingDepthLayout` | Yes |
| `/sensor&mascot` | Legacy combined page | Redirect away (P8-T02 / P8-T14) | No (already excluded + noindex in P7-T11) |

### Why split (not a permanent hub)

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **A. Split `/sensor` + `/mascot`** | Clear jobs; independent theaters; matches product definitions | Two URLs to maintain | **Chosen** |
| B. Keep combined hub only | One URL | Forces one scroll story for two products; weak SEO | Rejected as primary |
| C. Split + permanent hub | Soft landing for bookmarks | Extra page; dilutes depth | Hub only if P8-T02 chooses Option C |

Default legacy redirect target remains **`/sensor`** per [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md); P8-T02 may confirm A/B/C and hash handling.

### Overlay allowlist (confirm for P8-T14)

| Path | Live Sensor / Mascot overlays |
|------|-------------------------------|
| `/dashboard` | Allowed |
| `/sensor`, `/mascot` | **No** |
| `/sensor&mascot` | Redirected |

---

## 2. Feature-grid policy (locked)

### Decision: **include** Sensor and Mascot cards

P1-T09 excluded them when the only destination was a combined legacy page and the funnel was still forming. Phase 8 ships dedicated depth pages with scroll theaters, so the grid should discover them without making them the homepage story.

| Field | Policy |
|-------|--------|
| Card count | **7** (existing 5 + Sensor + Mascot) |
| Placement | After Upcoming events, before Security |
| Homepage lead | Still Connect → Prioritize → Execute theaters above the fold of the story; grid stays mid-page discovery |
| Implementation | **P8-T13** (not this task) |

### Locked display order

1. Connected apps → `/connected-apps`  
2. Inbox → `/inbox`  
3. Daily narrative → `/yesterdays-narrative`  
4. Upcoming events → `/upcoming-events`  
5. **Sensor** → `/sensor` *(new)*  
6. **Mascot** → `/mascot` *(new)*  
7. Security → `/security`  

Rationale: Keep Connect / Prioritize cards first; introduce companion surfaces next; end on trust before Integrations / Trust sections.

### Card stubs (copy finalized in P8-T03 / P8-T13)

| Title | One-line intent (draft for P8-T03) | Href | Link label (draft) |
|-------|-------------------------------------|------|--------------------|
| Sensor | Command bar for work and everyday tasks, without leaving flow. | `/sensor` | Explore Sensor |
| Mascot | Conversational companion grounded in your connected context. | `/mascot` | Explore Mascot |

Exact strings ship with P8-T03 / P8-T13. Do not change hero or theater section map in P8-T13.

### What does **not** change on `/`

- Hero element order (P1-T03)  
- Problem / How it works / Connect / Focus / Execute section map  
- Sticky nav primary links (Product / Features / Security)  
- No live Sensor or Mascot overlays on marketing funnel  

---

## 3. FAQ discovery (direction for P8-T13)

Existing FAQ entries already explain Sensor and Mascot. Phase 8 should add “Learn more →” links to `/sensor` and `/mascot` on those answers (implementation in P8-T13). No new FAQ IA required in this task.

---

## 4. Relationship to later tasks

| Task | Uses this decision |
|------|--------------------|
| P8-T02 | Legacy redirect options assume split URLs exist |
| P8-T03 | Copy decks for two pages, not one hub |
| P8-T08 | Funnel paths include `/sensor` and `/mascot` |
| P8-T13 | Feature grid 7 cards + FAQ links |
| P8-T14 | Redirect + overlay allowlist |
| P8-T17 | Sitemap includes both; legacy stays out |

---

## Acceptance

- [x] `/sensor` + `/mascot` locked as primary routes  
- [x] Feature-grid policy: **add** both cards; order locked  
- [x] Homepage must not lead with Sensor / Mascot (reaffirmed)  
- [x] P1-T09 grid exclusion superseded for discovery cards only  
- [x] Downstream tasks unblocked (P8-T02, P8-T03, P8-T13)
