# P7-T06: Developer Docs Hero Cleanup

**Task ID:** P7-T06  
**Status:** done  
**Type:** Documentation  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P6-T07](../../phase-6/tasks/P6-T07-delete-hero-windows.md)  
**Blocks:** P7-T12  
**Blocker:** Yes

---

## Goal

Stop developer entry docs from presenting the deleted macOS `Hero.tsx` shell as the live homepage. Point readers at marketing `app/page.tsx`, `components/marketing/`, and Phase docs.

---

## Scope

| In scope | Out of scope |
|----------|--------------|
| Top-level `README.md`, `QUICK_START.md`, `README-MIGRATION.md` | Historical Phase 1–6 task docs (intentional records) |
| Entry-relevant bits of `docs/naming-and-folders.md` | Rewriting every phase baseline that mentions Hero |

---

## Deliverables

| File | Change |
|------|--------|
| [`README.md`](../../../README.md) | Rewrote for marketing homepage; removed `apps/website` / `Hero.tsx` structure; linked Phase docs |
| [`QUICK_START.md`](../../../QUICK_START.md) | Customization table points at `app/page.tsx` + `components/marketing/`; explicit “no Hero.tsx” note |
| [`README-MIGRATION.md`](../../../README-MIGRATION.md) | Marked historical; status banner; Hero section labeled obsolete; kept migration narrative for archaeology |
| [`docs/naming-and-folders.md`](../../naming-and-folders.md) | Homepage note; removed `Hero.tsx` / window pack from tree; added `marketing/` + app shells |

---

## Verification

- [x] Grep of entry docs: no “edit `components/Hero.tsx`” guidance for the live homepage
- [x] `README` / `QUICK_START` describe `/` as marketing
- [x] Phase 1–6 task files left as historical records (not rewritten)

---

## Notes

Phase docs under `docs/phase-*` still mention `Hero.tsx` where they document deletion or baselines. That is expected. New contributors should start from `README.md` / `QUICK_START.md`.
