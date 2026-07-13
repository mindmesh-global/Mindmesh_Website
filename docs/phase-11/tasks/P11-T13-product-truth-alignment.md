# P11-T13: Homepage Product-Truth Alignment

**Task ID:** P11-T13  
**Status:** done  
**Type:** Copy / fixture correction  
**Completed:** 2026-07-12  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T01](./P11-T01-product-inventory.md), P11-T06–P11-T09  
**Blocks:** P11-T14  
**Blocker:** Yes

---

## Goal

Correct homepage statements that conflict with the current desktop product (Attention Board, approval-aware actions, desktop-first), without a full-site rewrite.

Source list: [P11-T01 stale claims](./P11-T01-product-inventory.md#stale--unsupported-claims-for-p11-t13).

---

## Corrections

### Attention is multi-item, not "one thing"

| Location | Before | After |
|----------|--------|-------|
| `HeroSection.tsx` | "finds the one thing… gets it done for you" | "ranks what needs your attention… helps you act with approval" |
| `HowItWorksSection.tsx` title | "Three steps to one clear focus." | "Three steps from noise to action." |
| `HowItWorksSection.tsx` step 02 | "Find your one priority" / "single most important thing" | "See what needs attention" / ranked Attention Board framing |
| `ProductTheaterFocus.tsx` | "One thing. Right now." / "one priority" | "What matters for right now." / ranked signals → next focus |
| `FocusTheaterDemo.tsx` | "Your one focus." | "Your next focus." |
| Focus caption (`marketing-demo-data.ts`) | "One priority for 2pm…" | "A clear focus for 2pm…" |
| `FinalCTASection.tsx` | "Find what matters. Get it done." | "See what needs attention. Act with approval." |
| `lib/seo.ts` `SITE_DESCRIPTION` | "find what matters… get it done" | "see what needs attention, act with approval" |
| `app/page.tsx` JSON-LD description | singular "finds what matters" | "ranks what needs attention… act with approval" |

Focus theater still narrows to a next focus card. That is intentional: it is the Focus story after the overview Attention Board, not a claim that the whole product is one card.

### Approval-aware writes

| Location | Before | After |
|----------|--------|-------|
| `HowItWorksSection.tsx` step 03 | "MindMesh gets it done" / draft-block-update | "Act with approval" / prepare + you approve before send/write |
| `ProductTheaterExecute.tsx` | "It does it" / "without switching apps" | Prepare work; sends and writes wait for approval |
| Execute caption | "Reply drafted… PROD-142 done." | "Reply ready for approval… PROD-142 staged." |
| `EXECUTE_SUCCESS_COPY` | "Done. You are ready for 2pm." | "Ready for your approval before 2pm." |
| Execute success chips | "Reply drafted" / "PROD-142 done" | "Reply ready" / "PROD-142 staged" |

### Desktop-first

| Location | Before | After |
|----------|--------|-------|
| JSON-LD `operatingSystem` | `'Web'` | `'macOS, Windows'` |

---

## Left unchanged (accurate)

- `IntegrationsSection`: reads as sources
- `FeatureGridSection`: readable source layer
- Sensor/Mascot relationship copy
- Slack/Jira as Focus theater signal sources (read)
- Depth pages (`/connected-apps`, `/upcoming-events`, etc.): out of homepage scope

---

## Acceptance checklist

- [x] Attention Board descriptions reflect multiple ranked items
- [x] Email and calendar actions do not overstate automatic writes
- [x] Sensor, Mascot, Slack, and Jira claims match current behavior (kept as-is where accurate)
- [x] Existing narrative remains concise
- [x] Changes limited to product-truth corrections, not a full-site rewrite

---

## Unblocks

- **P11-T14** - Visual, accessibility, and performance QA
