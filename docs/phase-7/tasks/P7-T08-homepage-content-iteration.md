# P7-T08: Homepage Content Iteration Pass

**Task ID:** P7-T08  
**Status:** done  
**Type:** Content  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P1-T01](../../phase-1/tasks/P1-T01-narrative.md), [P1-T03](../../phase-1/tasks/P1-T03-hero-copy.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Optional product-led copy polish on sections **2–3** and **7–10** without changing locked hero element order (P1-T03). Spot-check CLS after edits.

---

## Scope

| In | Out |
|----|-----|
| `#problem`, `#how-it-works`, `#features`, `#integrations`, `#trust`, `#cta` | Hero structure / copy order (P1-T03) |
| Soften repetition; tighten card CTAs | Theater captions / fixtures (P7-T09) |
| Trust subhead in `lib/marketing-trust-content.ts` | Waitlist form field microcopy (P7-T10) |
| | Section map / new sections |

---

## Changes

### Section 2 · Problem (`ProblemSection.tsx`)

| Element | Before | After |
|---------|--------|-------|
| Pain line 2 | Hours disappear switching tabs instead of doing the work. | Hours vanish switching tabs instead of finishing the work. |

Headline, lede, wedge, other pains, and close unchanged (still aligned with P1-T04 structure).

### Section 3 · How it works (`HowItWorksSection.tsx`)

| Step | Change |
|------|--------|
| 01 | Prefer "Connect" / "reads them as sources" over repeated "Plug in… without replacing them" |
| 02 | Lead with action; keep **"single most important thing right now"** |
| 03 | Shorter execute line; same draft / schedule / task acts |

### Section 7 · Features (`FeatureGridSection.tsx`)

- Shorter one-line card descriptions
- Per-card link labels (match P1-T09 intent) instead of generic "Explore"
- Subtitle: depth-pages framing

### Section 8 · Integrations (`IntegrationsSection.tsx`)

- Subtitle tightened; footer "More connectors added regularly."
- Depth CTA label unchanged

### Section 9 · Trust (`lib/marketing-trust-content.ts`)

- Subhead tightened; NVIDIA member line, disclaimer, security line, links, waitlist line unchanged

### Section 10 · Final CTA (`FinalCTASection.tsx`)

- Subtitle: "Get early access…" (headline / eyebrow / form unchanged)

### Hero

**Untouched.** Locked H1, era lines, thesis, and CTA order remain.

---

## CLS spot-check

| Check | Result |
|-------|--------|
| Section count / ids | Unchanged (`problem` … `cta`) |
| Card count / image count | Unchanged (5 feature cards; 7 integration icons) |
| Layout primitives | Same grids / spacing tokens |
| Risk | **Low** (text-only; no media swap, no sticky math) |

No Lighthouse rebaseline required for this copy-only pass. Re-run LH if a later PR changes layout or images.

---

## Acceptance

- [x] Hero element order not changed
- [x] Sections 2–3 and 7–10 copy polished
- [x] Narrative pillars (Connect → Prioritize → Execute) preserved
- [x] CLS risk spot-checked (structure stable)
- [x] No em dashes in new copy
