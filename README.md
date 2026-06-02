# Impruvu Capital Advisory - Client Portal

Per-client portal for Impruvu capital advisory engagements. Mobile-first, dark theme, orange brand. No backend yet. Modeled on the proven OpFix portal architecture, mapped to the capital advisory model.

---

## Quick Start

Open `index.html` in a browser. It redirects to `hub.html` (the home screen). Click around all 6 screens via the bottom tab bar (mobile) or top nav (desktop >=768px).

Every page uses sample data for **Reyes Holdings / Marcus Reyes / Day 58 of 180 / Phase 2 Execution**.

---

## File Structure

```
impruvu-portal/
  index.html        <- root redirect to hub
  hub.html          <- home: Capital Score + phase + sessions + your actions
  position.html     <- Capital Score: Now / Over Time / By Pillar (5-pillar factor drill-down)
  roadmap.html      <- engagement phase timeline (90/180) + calendar slot
  actions.html      <- For You / Delivered (no "owed by us" - clients don't watch our work)
  vault.html        <- deliverable archive + Capital Playbook capstone, type filter + search
  retain.html       <- locked ongoing-counsel screen, unlocks at engagement completion
  shared/
    portal.css       <- all design tokens + nav + common components
    portal-nav.js    <- top bar + bottom tab bar partial (data-active driven)
    portal-demo.js   <- demo mode: banner, toasts, notif/menu dropdowns, link interception
    logo.svg/.png    <- Impruvu logo (orange)
```

---

## The Model (what this portal reflects)

- **Capital Score** out of 1000. The portal analog of the Capital Plan diagnostic.
- **Five pillars** (locked order): Credit, Debt, Funding, Structure, Balance. Each scored /200.
  - Balance = inflow, outflow, ratios, liabilities (personal + business).
- **Engagement phases**: 90-day (Standard) or 180-day (Advanced). Sample shows 180/4-phase.
- **The Capital Playbook**: the capstone deliverable, featured in the Vault.
- **Actions**: only "For You" and "Delivered." We never show clients a live feed of our work in progress.
- **Retain**: the ongoing-counsel (retainer) view, locked until the engagement completes.

---

## What's Wired vs Mocked

### Wired (works as built):
- Navigation between all 6 pages.
- View switcher on Position (Now / Over Time / By Pillar).
- Pillar tile clicks on Position -> jump to factor drill-down in By Pillar.
- Phase expand/collapse on Roadmap (Phase 2 open by default).
- Tab + chip filtering on Actions (For You / Delivered x pillar).
- Type filter + live search on Vault.
- Notifications + account dropdowns (top right).
- Demo banner, demo toasts on any unbuilt-backend click.
- Retain tab styled as locked but clickable for preview.

### Mocked (waiting for backend):
- All score data, actions, deliverables, sessions - hardcoded sample.
- Google Calendar embed on Roadmap - placeholder, ready for iframe.
- File downloads, uploads, sign-offs - toast only.

---

## How To Wire It

### Nav flags
`shared/portal-nav.js` top:
```js
const HAS_ACTIONS_ALERT = true;   // true if open actions exist
const RETAIN_UNLOCKED   = false;  // true when engagement completes
```

### Active page indicator
Each page: `<div id="portal-nav" data-active="hub"></div>`
Values: `hub | position | roadmap | actions | vault | retain`

### Disabling demo mode for prod
- Remove the `shared/portal-demo.js` script tag from each page.
- Replace dead `href="#"` links with real handlers.
- Wire the `.icon-btn` notification + account buttons to real logic.

---

## Design Tokens (in shared/portal.css :root)

- **Brand orange:** `#FF8A0A` (gradient gold `#FFC40E` -> deep `#FF6A00`, sampled from logo)
- **Background:** `#0B0B0D` (near-black, dark theme)
- **Pillars:** Credit `#FF8A0A` · Debt `#E5484D` · Funding `#30A46C` · Structure `#8E7BEF` · Balance `#0EA5E9`
- Fonts: Space Grotesk 700 (display), DM Sans (body), JetBrains Mono (data)
- **No em dashes anywhere.** Hyphens only.

---

## Notes

- Pure HTML/CSS/JS. No build step. No dependencies. No `<form>` tags.
- Mobile breakpoint 768px. Below = bottom tab bar, above = top nav.
- All animations respect `prefers-reduced-motion`.
- This is a V1 internal reference / demo. Structure is faithful to the OpFix portal so it's familiar to wire.
