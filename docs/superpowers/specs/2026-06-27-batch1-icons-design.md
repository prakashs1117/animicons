# Animicons Batch 1 — 20 Navigation-First Icons + Developer Docs

**Date:** 2026-06-27  
**Status:** Approved  
**Scope:** Add 20 new icons (navigation-first), overhaul README, add DEVELOPERS.md, update website playground

---

## Overview

Add 20 high-priority icons missing from the current 84-icon set. These cover universal UI chrome needed by any enterprise mobile or web application (navigation, alerts, time, global, auth). All icons follow the existing pattern: `shared` path data → `react` CSS keyframe component → `react-native` Reanimated component → website playground entry.

Deliver as a single atomic batch: icons + docs + website in one version bump (0.3.0).

---

## Batch 1 — Icon List

All 20 icons, their target category, and animation concept:

| # | Name | Category | Animation |
|---|------|----------|-----------|
| 1 | `ChevronUp` | `ui` | Bounce up nudge (mirrors existing ChevronDown) |
| 2 | `ChevronLeft` | `ui` | Nudge left |
| 3 | `ChevronRight` | `ui` | Nudge right |
| 4 | `ArrowUp` | `ui` | Bounce up, return |
| 5 | `ArrowDown` | `ui` | Bounce down, return |
| 6 | `SortAsc` | `ui` | 3 bars sequentially rise from bottom |
| 7 | `SortDesc` | `ui` | 3 bars sequentially drop from top |
| 8 | `ZoomIn` | `ui` | Magnifier glass pulses outward |
| 9 | `ZoomOut` | `ui` | Magnifier glass pulses inward |
| 10 | `Undo` | `actions` | Arc + arrowhead rotates CCW |
| 11 | `Redo` | `actions` | Arc + arrowhead rotates CW |
| 12 | `AlertTriangle` | `ui` | Shake left–right + exclamation pulse |
| 13 | `AlertCircle` | `ui` | Expanding ring pulse around circle |
| 14 | `Calendar` | `ui` | Date square highlight pulses |
| 15 | `Clock` | `ui` | Minute hand sweeps full rotation |
| 16 | `Globe` | `ui` | Meridian arc rotates (longitude lines spin) |
| 17 | `Flag` | `ui` | Flag cloth waves (path morph or translateX oscillation) |
| 18 | `Logout` | `settings` | Door opens (rotate) + arrow slides out right |
| 19 | `Notification` | `ui` | Badge dot pulses/scales (distinct from Bell) |
| 20 | `ChevronDown` already exists — **replace slot 20 with `ArrowLeft`** | `ui` | Nudge left (full arrow, distinct from ChevronLeft) |

> Slot 20 correction: `ChevronUp` was accidentally listed twice. Slot 20 is `ArrowLeft` (full arrow with shaft, different from `ChevronLeft` which is just the angle bracket).

**Final corrected list:**
`ChevronUp`, `ChevronLeft`, `ChevronRight`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `SortAsc`, `SortDesc`, `ZoomIn`, `ZoomOut`, `Undo`, `Redo`, `AlertTriangle`, `AlertCircle`, `Calendar`, `Clock`, `Globe`, `Flag`, `Logout`, `Notification`

---

## Architecture

### Strict no-regression rule
- No existing file is modified except: both `icons/<category>/index.ts` files (additive re-exports only) and `shared/src/paths/<category>/index.ts` (additive re-exports only).
- `typecheck` must pass before and after the batch.
- Each new icon is isolated — adding it cannot break existing icons.

### File additions per icon (4 files each)

```
packages/shared/src/paths/<cat>/<Name>.ts         ← path data + viewBox + defaults
packages/react/src/icons/<cat>/<Name>.tsx          ← CSS keyframe component
packages/react-native/src/icons/<cat>/<Name>.tsx   ← Reanimated component
```

Plus additive lines in:
```
packages/shared/src/paths/<cat>/index.ts           ← export { <Name>Paths } from './<Name>'
packages/react/src/icons/<cat>/index.ts            ← export { <Name> } from './<Name>'
packages/react-native/src/icons/<cat>/index.ts     ← export { <Name> } from './<Name>'
```

### Category routing
- `ui` category gets: `ChevronUp`, `ChevronLeft`, `ChevronRight`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `SortAsc`, `SortDesc`, `ZoomIn`, `ZoomOut`, `AlertTriangle`, `AlertCircle`, `Calendar`, `Clock`, `Globe`, `Flag`, `Notification`
- `actions` category gets: `Undo`, `Redo`
- `settings` category gets: `Logout`

### Animation pattern (unchanged from existing)
React: `useId()` scoped CSS `@keyframes`, `animation-play-state` for `autoPlay`, `iteration-count` for `loop`.  
React Native: `useSharedValue` + `withRepeat`/`withSequence`/`withTiming` via Reanimated v3. `cancelAnimation` + snap back to 0 when `autoPlay=false`.

### ViewBox
All new icons use `viewBox="0 0 48 48"` (matches entire library).

### Default colors
- Navigation/UI icons: `#6366f1` (indigo — matches existing ui icons)
- Alert icons: `#f59e0b` (amber for AlertTriangle), `#ef4444` (red for AlertCircle)
- Logout: `#64748b` (slate — neutral/destructive action)
- Notification badge: `#6366f1`

---

## Documentation deliverables

### 1. README.md overhaul (root)
- Update icon count (84 → 104)
- Add full icon catalog table listing all 104 icons grouped by category
- Add "Framework integration" section (Next.js, Expo, Vite, bare RN)
- Keep Props table, React Native setup section

### 2. DEVELOPERS.md (new file, root)
A standalone markdown file developers can copy-paste to start using the library. Contains:
- Install commands for both packages
- Peer dependency requirements
- Complete Props reference
- Full icon name catalog (all 104) grouped by category with import examples
- Framework-specific setup (Next.js App Router, Expo, Vite + React, bare React Native)
- Theming and color customization guide with code examples
- Animation control patterns (`autoPlay`, `loop`, `speed`, `onAnimationEnd`)
- TypeScript usage notes
- Troubleshooting (common Reanimated plugin issue, SVG on web)

### 3. packages/react/README.md + packages/react-native/README.md
- Update icon count
- Add full icon catalog section

### 4. docs/index.html (website playground)
- Add render functions for all 20 new icons (self-contained inline SVG + CSS animation, matching existing pattern)
- Add entries to `ICONS` map under correct categories
- Update hero badge from "84 icons" to "104 icons"
- Add `navigation` tag color for new ui icons (reuse existing `tag-ui`)
- No structural changes to the website

---

## Version bump
`packages/react/package.json` and `packages/react-native/package.json`: `0.2.2` → `0.3.0`  
Minor bump (new icons = new exports, additive, non-breaking).

---

## Verification checklist
1. `npm run typecheck` passes with zero errors
2. All 20 new components render in the website playground
3. No existing icon entry is modified in any index file (only appended)
4. Both platform READMEs list the correct icon count
5. `DEVELOPERS.md` is complete with no TBD sections

---

## Non-goals (this batch)
- No test suite (none exists today)
- No Storybook or other playground beyond the existing HTML page
- No new categories (all fit into existing `ui`, `actions`, `settings`)
- No animation API changes
