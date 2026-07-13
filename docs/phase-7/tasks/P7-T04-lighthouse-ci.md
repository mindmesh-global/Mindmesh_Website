# P7-T04: Lighthouse CI Sketch

**Task ID:** P7-T04  
**Status:** done  
**Type:** Tooling / documentation  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P1-T18](../../phase-1/tasks/P1-T18-perf-workflow.md), [P6-T09](../../phase-6/tasks/P6-T09-homepage-lighthouse-rebaseline.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Optional Lighthouse CI sketch for homepage `/`: assert CLS ≤ 0.1 (hard fail), record LCP with a **soft** warn while the P6-T09 lab exception stands (median 2.93s vs &lt; 2.5s).

---

## Deliverables

| File | Role |
|------|------|
| [`lighthouserc.cjs`](../../../lighthouserc.cjs) | Collect × 3 on `/`; assert CLS error, LCP warn ≤ 3500ms, score warn ≥ 0.85 |
| [`.github/workflows/lighthouse.yml`](../../../.github/workflows/lighthouse.yml) | PR + `workflow_dispatch`; build then `lhci autorun` |
| [`package.json`](../../../package.json) | `npm run lhci` helper |
| [`.gitignore`](../../../.gitignore) | Ignore `.lighthouseci/` |

`@lhci/cli` is **not** pinned as a dependency; CI and the npm script use `npx --yes @lhci/cli@0.14.0`.

---

## Assert policy (while P6 exception stands)

| Assertion | Level | Threshold | Rationale |
|-----------|-------|-----------|-----------|
| `cumulative-layout-shift` | **error** | ≤ 0.1 | Hard product gate ([P1-T17](../../phase-1/tasks/P1-T17-performance-budget.md)) |
| `largest-contentful-paint` | **warn** | ≤ 3500ms | Soft regression ceiling above P6 median 2.93s; not the &lt; 2.5s target |
| `categories:performance` | **warn** | ≥ 0.85 | Advisory floor from Phase 6 baselines |

When the LCP exception closes, change LCP to:

```js
'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
```

---

## Local run

```bash
npm run build
npm run lhci
# reports under .lighthouseci/
```

Requires a free port **3002** (`npm run start`). Stop any `next dev` on that port first.

With `output: 'standalone'`, `next start` prints a warning but still serves for lab checks (same as P6 baselines). Prefer standalone for image-optimizer fidelity if CI flakes on `/_next/image`.

---

## GitHub Action

- Triggers: PRs that touch marketing/app/config; also manual `workflow_dispatch`
- Steps: `npm ci` → `npm run build` → `lhci autorun`
- Uploads `.lighthouseci` as an artifact (14 days)

**Note:** First enable of Actions on the repo must allow workflows. Soft LCP means a warn may not fail the job depending on LHCI version defaults; CLS errors will fail.

---

## Acceptance criteria

- [x] `lighthouserc` exists with CLS hard fail + soft LCP
- [x] GitHub Action sketch present
- [x] Local command documented (`npm run lhci`)
- [x] Linked to P6-T09 exception / P1-T17 targets

---

## Explicit non-goals

- Enforcing LCP &lt; 2.5s in CI while the P6 exception is open
- Depth-route matrix in CI (manual / spot-check only)
- Temporary public server upload of LHCI reports

---

## Next steps

- **P7-T05:** Field CWV / CrUX note (pair lab CI with real-user data)
- After exception closes: tighten LCP assert to 2500ms error
