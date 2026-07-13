# P1-T18: Performance Measurement Workflow

**Task ID:** P1-T18  
**Status:** done  
**Type:** Strategy and documentation (tooling wired in Phase 2 first perf PR)  
**Completed:** 2026-07-03  
**Parent:** [phase-1-tasks.md](../phase-1-tasks.md) | [P1-T17-performance-budget.md](./P1-T17-performance-budget.md)  
**Depends on:** [P1-T17-performance-budget.md](./P1-T17-performance-budget.md)  
**Blocks:** Phase 2+ PR perf checks, [P1-T24](../phase-1-tasks.md#p1-t24--phase-1-sign-off-checklist)

---

## Quick reference

| Decision | Choice |
|----------|--------|
| **Lighthouse** | **Manual before merge** (Phase 2–5); Lighthouse CI optional Phase 6 |
| **Bundle analyzer** | **Yes** — add `@next/bundle-analyzer` in Phase 2 |
| **Baseline** | Legacy `/` before Phase 2 swap — [homepage-legacy-lighthouse.md](../baselines/homepage-legacy-lighthouse.md) |
| **Budget authority** | [P1-T17](./P1-T17-performance-budget.md) CWV targets |

---

## Decision: manual Lighthouse vs Lighthouse CI

**Choice: Manual Lighthouse before merge (Phase 2 through Phase 5).**

| Option | Verdict | Rationale |
|--------|---------|-----------|
| **Manual Lighthouse** | ✅ Default | No CI infra today (no `.github/workflows`); author runs locally on production build; paste scores in PR |
| **Lighthouse CI** | ⏸ Phase 6 optional | Add when homepage stabilizes; avoids flaky CI during rapid Phase 2–4 iteration |
| **Chrome UX Report only** | ❌ | Too slow for PR feedback; use for production monitoring later |

### When to run manual Lighthouse

| Trigger | Required |
|---------|----------|
| PR touches `app/page.tsx` or `components/marketing/**` | **Yes** |
| PR adds/changes `next/dynamic` or Framer Motion imports | **Yes** |
| PR touches fonts or root layout | **Yes** |
| Copy-only markdown/docs | No |
| Feature pages unrelated to `/` | No (unless shared layout) |

### Phase 6 optional: Lighthouse CI sketch

If adopted later, use [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) with:

- `lighthouserc.json` asserting LCP ≤ 2500ms, CLS ≤ 0.1 on `/`
- GitHub Action on PR to `main` against `next start` preview or static export
- Not in scope for Phase 1; revisit in Phase 6 polish

---

## Decision: `@next/bundle-analyzer`

**Choice: Yes — add in Phase 2.**

| Field | Value |
|-------|-------|
| Package | `@next/bundle-analyzer` (devDependency) |
| When | First Phase 2 PR that adds `components/marketing/` |
| Purpose | Verify theaters, Lottie, and Framer Motion are **not** in the main `/` chunk ([P1-T17 block list](./P1-T17-performance-budget.md)) |

### Phase 2 wiring (copy when implementing)

**1. Install**

```bash
npm install -D @next/bundle-analyzer
```

**2. [`next.config.js`](../../../next.config.js)**

```js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
};

module.exports = withBundleAnalyzer(nextConfig);
```

**3. [`package.json`](../../../package.json) script**

```json
"analyze": "ANALYZE=true npm run build"
```

**4. Review checklist after analyze**

- Open treemap for route `/`
- Confirm separate async chunks for `ProductTheater*` and lazy sections
- Search treemap for `dotlottie`, `lottie`, `Hero.tsx` — should be absent from `/` entry

---

## Local workflow (anyone on the team)

### Prerequisites

- Node 18+ (match local dev)
- Chrome installed
- Repo dependencies: `npm install`

**Known build blocker:** `next build` may require env vars for API routes (Resend on `/api/contact`). For perf runs only, set placeholders in `.env.local` or skip contact route init. Fix properly in Phase 2 if needed.

### Step 1 — Production build

```bash
cd /path/to/Mindmesh_Website
npm install
npm run build
```

Fix build errors before measuring. Perf scores on broken builds are invalid.

### Step 2 — Start production server

```bash
npm run start
# Serves http://localhost:3002
```

Keep this terminal open.

### Step 3 — Lighthouse (mobile)

New terminal:

```bash
npx lighthouse http://localhost:3002 \
  --preset=perf \
  --form-factor=mobile \
  --throttling-method=simulate \
  --output=html \
  --output=json \
  --output-path=./lighthouse-home
```

Produces `lighthouse-home.report.html` and `lighthouse-home.report.json`.

**Run 3 times.** Record **median** LCP, CLS, TBT, Performance score.

### Step 4 — Compare to budget

| Metric | Median | Pass? ([P1-T17](./P1-T17-performance-budget.md)) |
|--------|--------|--------------------------------------------------|
| LCP | ___ s | < 2.5s |
| CLS | ___ | < 0.1 |
| INP | ___ ms (field or lab proxy) | < 200ms |

If fail: fix before merge or document approved budget revision.

### Step 5 — Bundle analysis (homepage PRs)

```bash
npm run analyze
```

Browser opens treemap. Screenshot or note largest modules in PR.

### Step 6 — Paste in PR

Use template from [P1-T17 PR checklist](./P1-T17-performance-budget.md#pr-review-checklist-copy-into-phase-2-prs) plus:

```markdown
## Lighthouse (mobile, prod build, median of 3)

| Metric | Value |
|--------|-------|
| LCP | s |
| CLS | |
| Performance | |

## Bundle

- [ ] `/` entry excludes theater + Lottie (analyze treemap)
```

---

## Baseline capture plan

**Goal:** One legacy Hero measurement before Phase 2 replaces [`app/page.tsx`](../../../app/page.tsx).

| Item | Detail |
|------|--------|
| **When** | Before merging first marketing homepage to `/` |
| **What** | Legacy page with [`Hero.tsx`](../../../components/Hero.tsx) |
| **Where to record** | [docs/phase-1/baselines/homepage-legacy-lighthouse.md](../baselines/homepage-legacy-lighthouse.md) |
| **JSON artifact** | Optional: `docs/phase-1/baselines/homepage-legacy-lighthouse.json` |
| **After Phase 2** | Duplicate baseline doc as `homepage-marketing-lighthouse.md` |

### Baseline status (2026-07-03)

| Field | Status |
|-------|--------|
| Workflow documented | ✅ |
| Baseline template created | ✅ |
| Numbers recorded | ✅ [homepage-legacy-lighthouse.md](../baselines/homepage-legacy-lighthouse.md) (captured 2026-07-03, P2-T25) |
| Owner | Run Steps 1–3 locally, fill baseline table, commit JSON optional |

**Expected legacy profile (qualitative):** Heavy JS (Framer Motion, Hero windows), poor mobile LCP vs marketing target. New homepage should beat this median.

---

## npm scripts summary (Phase 2 PR)

Add to [`package.json`](../../../package.json):

| Script | Command | Use |
|--------|---------|-----|
| `analyze` | `ANALYZE=true npm run build` | Bundle treemap |
| `perf:lighthouse` | See below | Convenience wrapper |

Optional `perf:lighthouse` script (requires `lighthouse` devDependency or `npx`):

```json
"perf:lighthouse": "lighthouse http://localhost:3002 --preset=perf --form-factor=mobile --throttling-method=simulate --output=html --output-path=./lighthouse-home"
```

Do **not** add Lighthouse CI to `package.json` until Phase 6 decision.

---

## INP measurement (when needed)

Lighthouse lab INP is limited. For scroll/nav interactions:

1. Chrome DevTools → **Performance** → record while scrolling hero → `#connect` → `#cta`
2. Or **Performance insights** → check interaction duration
3. Target: **< 200ms** for primary interactions ([P1-T17](./P1-T17-performance-budget.md))

Document INP checks for Phase 3+ theater PRs.

---

## Acceptance criteria checklist

- [x] Decision: manual Lighthouse before merge (Lighthouse CI deferred Phase 6)
- [x] Decision: `@next/bundle-analyzer` yes, with wiring instructions
- [x] Baseline capture plan documented
- [x] Documented steps anyone on the team can run locally
- [x] Baseline template created; numbers pending local capture (env/build blocker noted)

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Manual Lighthouse + bundle analyzer workflow approved | 2026-07-03 |

**P1-T18 status:** Done. Run baseline locally before Phase 2 homepage merge; wire analyzer in first marketing PR.

---

## Downstream handoff

| Consumer | Action |
|----------|--------|
| Phase 2 first PR | Add `@next/bundle-analyzer`, `analyze` script, `next.config.js` wrap |
| Author before merge | Run Lighthouse 3x, paste medians in PR |
| Pre–Phase 2 | Fill [homepage-legacy-lighthouse.md](../baselines/homepage-legacy-lighthouse.md) |
| Post–Phase 2 | Capture marketing baseline for comparison |
| P1-T24 | Perf workflow complete |
