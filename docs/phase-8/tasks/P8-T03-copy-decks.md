# P8-T03: Copy Decks - Sensor + Mascot

**Task ID:** P8-T03  
**Status:** done  
**Type:** Strategy / documentation (no page UI in this task)  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T01](./P8-T01-ia-decision.md)  
**Blocks:** P8-T04, P8-T05, P8-T06  
**Blocker:** Yes

---

## Goal

Approve page copy for `/sensor` and `/mascot`: depth hero, how-it-works, theater captions, capabilities, comparison strip, privacy note, CTAs, metadata, and feature-grid stubs. No em dashes. Seeds from [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md), legacy `/sensor&mascot`, and FAQ.

---

## Shared relationship line (both pages)

> Sensor is for **instant action**. Mascot is for **ongoing conversation**. Together they reduce hunting, tabs, and context switching, without replacing Connect / Focus / Execute as the homepage story.

Use this (or the shorter comparison rows below) in the “When to use” strip on both pages.

---

## Shared comparison strip

| | Sensor | Mascot |
|---|--------|--------|
| Best for | Instant commands and jumps | Questions that need context |
| Feels like | A command bar | A calm conversation |
| Example | “Open Calendar” | “Did I get any emails today?” |
| Sibling CTA | Explore Mascot → `/mascot` | Explore Sensor → `/sensor` |

---

## Shared privacy note

**Line:** Sensor and Mascot work from the same local-first MindMesh layer. Read-only connections where it matters.

**Link:** Learn about security → `/security`

---

## Shared CTA block

| Element | Copy |
|---------|------|
| Headline | Connect your apps. Find what matters. Get it done. |
| Body | Join the waitlist for early access to MindMesh. |
| Primary | Join waitlist → `/#cta` |
| Secondary (Sensor page) | Explore Mascot → `/mascot` |
| Secondary (Mascot page) | Explore Sensor → `/sensor` |

---

# `/sensor` copy deck

## Metadata

| Field | Copy |
|-------|------|
| Title | Sensor |
| Description | Universal command bar for work and everyday tasks. Type what you need and act without leaving your flow. |
| OG title | MindMesh \| Sensor |
| OG description | Same as description |

## Depth hero (`MarketingDepthLayout`)

| Element | Copy |
|---------|------|
| Eyebrow | Sensor |
| H1 | Your universal command bar for work and everyday tasks. |
| Subtitle | Type what you need: open apps, calculate, convert, ask quick questions, and jump without leaving flow. |
| Back link | Back to homepage → `/` |

## How it works (3 steps)

| # | Title | Description |
|---|-------|-------------|
| 01 | Open Sensor | Call up the bar from anywhere in MindMesh. |
| 02 | Type an intent | Short commands or questions: open, find, convert, ask. |
| 03 | Confirm and go | Pick a result and MindMesh acts without a tab hunt. |

## Theater (section chrome + caption)

| Element | Copy |
|---------|------|
| Section title | See Sensor in action. |
| Section subtitle | A short command becomes a clear result, then an action you can trust. |
| Caption (reduced motion) | Sensor finds Calendar from a short command without leaving your flow. |
| Depth footer link | Explore Mascot → `/mascot` |

**Primary demo query:** `Open Cal`  
**Alternate prompts (chips / fixtures):**  
`Do I have meetings tomorrow?` · `Find invoices from Acme` · `Open Calculator`

**Confirm chip:** Opening Calendar…

Beat sheet motion locks in P8-T05; strings above are the copy source.

## Capabilities (4)

| Title | Description |
|-------|-------------|
| Open and jump | Launch apps and destinations from one bar. |
| Quick answers | Spelling, conversions, and short facts without a new tab. |
| Find in context | Pull meetings, files, or threads MindMesh already knows. |
| Stay in flow | Act and return without rebuilding your mental stack. |

## Feature-grid card (homepage, P8-T13)

| Field | Copy |
|-------|------|
| Title | Sensor |
| Description | Command bar for work and everyday tasks, without leaving flow. |
| Href | `/sensor` |
| Link label | Explore Sensor |

---

# `/mascot` copy deck

## Metadata

| Field | Copy |
|-------|------|
| Title | Mascot |
| Description | Conversational companion on top of MindMesh memory. Ask what changed, what matters, or what is next. |
| OG title | MindMesh \| Mascot |
| OG description | Same as description |

## Depth hero (`MarketingDepthLayout`)

| Element | Copy |
|---------|------|
| Eyebrow | Mascot |
| H1 | Your conversational companion on top of MindMesh memory. |
| Subtitle | Ask what changed, what matters, or what is next. Get answers grounded in connected email, calendar, and local context. |
| Back link | Back to homepage → `/` |

## How it works (3 steps)

| # | Title | Description |
|---|-------|-------------|
| 01 | Ask in plain language | Talk like you would to a teammate who already has context. |
| 02 | Grounded reply | Mascot answers from email, calendar, and MindMesh memory. |
| 03 | Take the next step | Jump to inbox, events, or a follow-up without re-explaining. |

## Theater (section chrome + caption)

| Element | Copy |
|---------|------|
| Section title | See Mascot in action. |
| Section subtitle | One question becomes a calm, grounded answer you can act on. |
| Caption (reduced motion) | Mascot answers from your connected inbox context in one calm thread. |
| Depth footer link | Explore Sensor → `/sensor` |

**User ask:** Did I get any emails today?

**Assistant reply (tightened; Acme-aligned):**

```text
Yes. You received 12 emails today.

Breakdown: 7 work, 3 personal, 2 newsletters.

Review all 12 in your MindMesh inbox.
```

**Secondary control:** Open inbox

Beat sheet motion locks in P8-T06; strings above are the copy source.

## Capabilities (4)

| Title | Description |
|-------|-------------|
| Catch up fast | Ask what landed today without scanning every account. |
| What matters | Surface priorities and open loops in plain language. |
| What is next | Get a calm read on meetings and unfinished threads. |
| Stay human | Conversation instead of another dashboard to decode. |

## Feature-grid card (homepage, P8-T13)

| Field | Copy |
|-------|------|
| Title | Mascot |
| Description | Conversational companion grounded in your connected context. |
| Href | `/mascot` |
| Link label | Explore Mascot |

---

## FAQ answer polish (direction for P8-T13)

Keep existing questions; append learn-more links. Suggested answer bodies:

| Question | Answer body |
|----------|-------------|
| What is the Sensor Bar? | Sensor is the always-available command bar for opening apps, quick calculations, conversions, and short questions without breaking your flow. Learn more → `/sensor` |
| What is Mascot? | Mascot is the conversational companion on top of MindMesh memory. Ask what changed, what matters, or what is next. Learn more → `/mascot` |

---

## Explicit non-copy (do not ship on these pages)

- Legacy combined H1 “Ask faster. Act faster. Stay calmer.” as the primary depth H1 (too hub-like; relationship line covers the pair)
- Remote Googleusercontent hero images
- Live overlay / Lottie CTAs (“See Sensor and Mascot” button that opens chrome)
- Em dashes in any new string
- Claims that Sensor or Mascot replace Connect / Focus / Execute

---

## Downstream handoff

| Task | Consumes |
|------|----------|
| P8-T04 | All section strings + comparison + fixtures into `lib/marketing-sensor-mascot-content.ts` |
| P8-T05 | Sensor theater caption, query, confirm chip, prompts |
| P8-T06 | Mascot theater caption, ask, reply, secondary control |
| P8-T13 | Feature-grid cards + FAQ learn-more |

---

## Acceptance

- [x] Sensor and Mascot page decks approved (hero → CTA)
- [x] Theater captions + demo fixture strings locked for beat sheets
- [x] Comparison strip + privacy + shared CTA defined
- [x] Feature-grid stubs match P8-T01 order intent
- [x] No em dashes in new copy
