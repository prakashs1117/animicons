# @animicons v0.2 — Icon Catalog Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 63 new animated SVG icons across 7 categories to `@animicons/react` and `@animicons/react-native`, bumping both packages from 0.1.1 → 0.2.0.

**Architecture:** Mirrors v0.1 exactly — shared path files in `packages/shared/src/paths/<category>/`, CSS-keyframe React components in `packages/react/src/icons/<category>/`, Reanimated RN components in `packages/react-native/src/icons/<category>/`. All barrel files are additive-only.

**Tech Stack:** TypeScript, react-native-svg, CSS keyframes (web), react-native-reanimated v3 (RN), tsup

---

## Reference Patterns

**Canonical React component** — `packages/react/src/icons/ui/Bell.tsx`  
**Canonical RN component** — `packages/react-native/src/icons/ui/Bell.tsx`  
**Path file shape** — `packages/shared/src/paths/ui/Bell.ts`

Key utilities (already exist — reuse, never recreate):
- `packages/react/src/utils/resolveStyle.ts` → `resolveStyle(colorProps, PathDefaults)`
- `packages/react/src/utils/animDuration.ts` → `getAnimDuration(speed)`
- `packages/react-native/src/utils/resolveStyle.ts` (identical logic)
- `packages/react-native/src/utils/animDuration.ts` (identical logic)
- `packages/shared/src/tokens/timing.ts` → `DURATION`, `EASING_CSS`

---

## Phase Overview (execute one phase at a time)

| Phase | What | Files touched |
|-------|------|---------------|
| **1** | Shared path files — all 7 categories | `packages/shared/src/paths/` |
| **2** | React components — ui additions + actions + communication | `packages/react/src/icons/` |
| **3** | React components — settings + files + media + device | `packages/react/src/icons/` |
| **4** | React Native components — ui additions + actions + communication | `packages/react-native/src/icons/` |
| **5** | React Native components — settings + files + media + device | `packages/react-native/src/icons/` |
| **6** | Barrel updates, version bump, playground update, publish | All `index.ts` files, package.json, docs/index.html |

---

## Phase 1 — Shared Path Files (63 files)

**Goal:** Create all SVG path data files in `packages/shared/src/paths/`. No React code yet. Type-check passes at end.

### Task 1.1 — Navigation & Structure paths (10 files added to `ui/`)

**Files:**
- Create: `packages/shared/src/paths/ui/Home.ts`
- Create: `packages/shared/src/paths/ui/Menu.ts`
- Create: `packages/shared/src/paths/ui/KebabMenu.ts`
- Create: `packages/shared/src/paths/ui/MoreHorizontal.ts`
- Create: `packages/shared/src/paths/ui/Back.ts`
- Create: `packages/shared/src/paths/ui/Forward.ts`
- Create: `packages/shared/src/paths/ui/ChevronDown.ts`
- Create: `packages/shared/src/paths/ui/Close.ts`
- Create: `packages/shared/src/paths/ui/Grid.ts`
- Create: `packages/shared/src/paths/ui/Search.ts`
- Modify: `packages/shared/src/paths/ui/index.ts` — add 10 re-exports

- [ ] **Step 1: Create path files**

```ts
// Home.ts
export const HomePaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  house: 'M8 24 L24 8 L40 24 L40 40 L8 40 Z',
  door:  'M18 40 L18 30 L30 30 L30 40',
  roof:  'M24 8 L24 4',
} as const;

// Menu.ts
export const MenuPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 3,
  top:    'M10 18 L38 18',
  middle: 'M10 24 L38 24',
  bottom: 'M10 30 L38 30',
} as const;

// KebabMenu.ts
export const KebabMenuPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  dot1: 'M24 14 a2.5 2.5 0 1 0 0.01 0',
  dot2: 'M24 24 a2.5 2.5 0 1 0 0.01 0',
  dot3: 'M24 34 a2.5 2.5 0 1 0 0.01 0',
} as const;

// MoreHorizontal.ts
export const MoreHorizontalPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  dot1: 'M14 24 a2.5 2.5 0 1 0 0.01 0',
  dot2: 'M24 24 a2.5 2.5 0 1 0 0.01 0',
  dot3: 'M34 24 a2.5 2.5 0 1 0 0.01 0',
} as const;

// Back.ts
export const BackPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  arrow: 'M30 12 L14 24 L30 36',
  shaft: 'M14 24 L38 24',
} as const;

// Forward.ts
export const ForwardPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  arrow: 'M18 12 L34 24 L18 36',
  shaft: 'M10 24 L34 24',
} as const;

// ChevronDown.ts
export const ChevronDownPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  chevron: 'M12 18 L24 30 L36 18',
} as const;

// Close.ts
export const ClosePaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  line1: 'M14 14 L34 34',
  line2: 'M34 14 L14 34',
} as const;

// Grid.ts
export const GridPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  tl: 'M8 8 L22 8 L22 22 L8 22 Z',
  tr: 'M26 8 L40 8 L40 22 L26 22 Z',
  bl: 'M8 26 L22 26 L22 40 L8 40 Z',
  br: 'M26 26 L40 26 L40 40 L26 40 Z',
} as const;

// Search.ts
export const SearchPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  lens:   'M20 8 a12 12 0 1 0 0.01 0',
  handle: 'M29 29 L40 40',
} as const;
```

- [ ] **Step 2: Update `packages/shared/src/paths/ui/index.ts`** — append 10 exports:

```ts
export { HomePaths }         from './Home';
export { MenuPaths }         from './Menu';
export { KebabMenuPaths }    from './KebabMenu';
export { MoreHorizontalPaths } from './MoreHorizontal';
export { BackPaths }         from './Back';
export { ForwardPaths }      from './Forward';
export { ChevronDownPaths }  from './ChevronDown';
export { ClosePaths }        from './Close';
export { GridPaths }         from './Grid';
export { SearchPaths }       from './Search';
```

- [ ] **Step 3: Type check**

```bash
npm run typecheck -w packages/shared
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/paths/ui/
git commit -m "feat(shared): add 10 Navigation & Structure path files"
```

---

### Task 1.2 — Actions paths (12 files, new `actions/` folder)

**Files:**
- Create: `packages/shared/src/paths/actions/Add.ts`
- Create: `packages/shared/src/paths/actions/Edit.ts`
- Create: `packages/shared/src/paths/actions/Save.ts`
- Create: `packages/shared/src/paths/actions/Trash.ts`
- Create: `packages/shared/src/paths/actions/Share.ts`
- Create: `packages/shared/src/paths/actions/Download.ts`
- Create: `packages/shared/src/paths/actions/Refresh.ts`
- Create: `packages/shared/src/paths/actions/Sync.ts`
- Create: `packages/shared/src/paths/actions/Copy.ts`
- Create: `packages/shared/src/paths/actions/Pin.ts`
- Create: `packages/shared/src/paths/actions/Bookmark.ts`
- Create: `packages/shared/src/paths/actions/Filter.ts`
- Create: `packages/shared/src/paths/actions/index.ts`

- [ ] **Step 1: Create path files**

```ts
// Add.ts
export const AddPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  horiz: 'M10 24 L38 24',
  vert:  'M24 10 L24 38',
} as const;

// Edit.ts
export const EditPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body:  'M10 34 L14 38 L38 14 L34 10 Z',
  tip:   'M10 34 L14 38',
  line:  'M30 10 L38 18',
  trace: 'M10 40 L38 40',
} as const;

// Save.ts
export const SavePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body:   'M8 8 L8 40 L40 40 L40 14 L34 8 Z',
  slot:   'M16 8 L16 20 L32 20 L32 8',
  check:  'M16 30 L22 36 L34 26',
} as const;

// Trash.ts
export const TrashPaths = {
  viewBox: '0 0 48 48', defaultColor: '#ef4444', defaultStrokeWidth: 2.5,
  lid:    'M8 14 L40 14',
  handle: 'M18 14 L18 10 Q18 8 20 8 L28 8 Q30 8 30 10 L30 14',
  body:   'M12 14 L13 40 Q13 42 16 42 L32 42 Q35 42 35 40 L36 14',
  lines:  'M20 20 L20 36 M24 20 L24 36 M28 20 L28 36',
} as const;

// Share.ts
export const SharePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  center: 'M24 24 a4 4 0 1 0 0.01 0',
  node1:  'M12 14 a4 4 0 1 0 0.01 0',
  node2:  'M36 14 a4 4 0 1 0 0.01 0',
  node3:  'M24 38 a4 4 0 1 0 0.01 0',
  line1:  'M20 22 L16 18',
  line2:  'M28 22 L32 18',
  line3:  'M24 28 L24 34',
} as const;

// Download.ts
export const DownloadPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  arrow: 'M24 8 L24 32 M14 22 L24 32 L34 22',
  bar:   'M10 40 L38 40',
} as const;

// Refresh.ts
export const RefreshPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  arc:    'M24 8 a16 16 0 1 1 -11.3 4.7',
  arrow1: 'M24 8 L18 14',
  arrow2: 'M24 8 L30 14',
} as const;

// Sync.ts
export const SyncPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  arc1:   'M14 24 a10 10 0 0 1 20 0',
  head1:  'M34 20 L34 28 L26 28',
  arc2:   'M34 24 a10 10 0 0 1 -20 0',
  head2:  'M14 28 L14 20 L22 20',
} as const;

// Copy.ts
export const CopyPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  back:   'M18 12 L38 12 L38 36 L18 36 Z',
  front:  'M10 18 L30 18 L30 40 L10 40 Z',
} as const;

// Pin.ts
export const PinPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body:  'M24 6 a10 10 0 0 1 10 10 C34 22 28 28 24 32 C20 28 14 22 14 16 a10 10 0 0 1 10 -10 Z',
  inner: 'M24 12 a4 4 0 1 0 0.01 0',
  stem:  'M24 32 L24 42',
} as const;

// Bookmark.ts
export const BookmarkPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body: 'M12 6 L36 6 L36 42 L24 34 L12 42 Z',
} as const;

// Filter.ts
export const FilterPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  funnel: 'M8 10 L20 26 L20 40 L28 36 L28 26 L40 10 Z',
  line1:  'M14 16 L34 16',
  line2:  'M18 22 L30 22',
} as const;
```

- [ ] **Step 2: Create `packages/shared/src/paths/actions/index.ts`**

```ts
export { AddPaths }      from './Add';
export { EditPaths }     from './Edit';
export { SavePaths }     from './Save';
export { TrashPaths }    from './Trash';
export { SharePaths }    from './Share';
export { DownloadPaths } from './Download';
export { RefreshPaths }  from './Refresh';
export { SyncPaths }     from './Sync';
export { CopyPaths }     from './Copy';
export { PinPaths }      from './Pin';
export { BookmarkPaths } from './Bookmark';
export { FilterPaths }   from './Filter';
```

- [ ] **Step 3: Type check + commit**

```bash
npm run typecheck -w packages/shared
git add packages/shared/src/paths/actions/
git commit -m "feat(shared): add 12 Actions path files"
```

---

### Task 1.3 — Communication paths (10 files)

**Files:** `packages/shared/src/paths/communication/` — 10 files + `index.ts`

- [ ] **Step 1: Create path files**

```ts
// Mail.ts
export const MailPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body:    'M6 12 L42 12 L42 38 L6 38 Z',
  flap:    'M6 12 L24 26 L42 12',
  letter:  'M14 22 L14 32 L34 32 L34 18',
} as const;

// Chat.ts
export const ChatPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  bubble: 'M6 8 Q6 6 8 6 L40 6 Q42 6 42 8 L42 32 Q42 34 40 34 L18 34 L8 42 L8 34 Q6 34 6 32 Z',
  dot1: 'M17 20 a2.5 2.5 0 1 0 0.01 0',
  dot2: 'M24 20 a2.5 2.5 0 1 0 0.01 0',
  dot3: 'M31 20 a2.5 2.5 0 1 0 0.01 0',
} as const;

// Phone.ts
export const PhonePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body: 'M14 6 Q12 6 12 8 L12 40 Q12 42 14 42 L34 42 Q36 42 36 40 L36 8 Q36 6 34 6 Z',
  screen: 'M16 12 L32 12 L32 34 L16 34 Z',
  home: 'M22 38 L26 38',
} as const;

// Video.ts
export const VideoPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body:     'M4 14 L30 14 L30 34 L4 34 Z',
  playhead: 'M30 18 L44 12 L44 36 L30 30',
  dot:      'M8 18 a3 3 0 1 0 0.01 0',
} as const;

// User.ts
export const UserPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  head: 'M24 10 a9 9 0 1 0 0.01 0',
  body: 'M8 42 Q8 30 24 30 Q40 30 40 42',
} as const;

// Users.ts
export const UsersPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  head1: 'M18 10 a7 7 0 1 0 0.01 0',
  body1: 'M4 42 Q4 32 18 32 Q24 32 28 35',
  head2: 'M30 10 a7 7 0 1 0 0.01 0',
  body2: 'M20 42 Q22 32 30 32 Q44 32 44 42',
} as const;

// ThumbsUp.ts
export const ThumbsUpPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  thumb: 'M16 22 L22 10 Q24 6 28 8 L28 18 L38 18 Q42 18 42 22 L40 36 Q40 40 36 40 L16 40 Z',
  palm:  'M16 40 L16 22',
  grip:  'M10 22 L16 22 L16 40 L10 40 Z',
} as const;

// Send.ts
export const SendPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  plane: 'M6 6 L42 24 L6 42 L12 24 Z',
  fold:  'M12 24 L42 24',
} as const;

// Reaction.ts
export const ReactionPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  face:  'M24 6 a18 18 0 1 0 0.01 0',
  eye1:  'M17 20 a2 2 0 1 0 0.01 0',
  eye2:  'M31 20 a2 2 0 1 0 0.01 0',
  mouth: 'M16 28 Q24 36 32 28',
} as const;

// Mention.ts
export const MentionPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  ring:  'M38 24 a14 14 0 1 0 -2 8',
  inner: 'M24 16 a8 8 0 1 0 0.01 0',
  tail:  'M36 32 L38 38',
} as const;
```

- [ ] **Step 2: Create `packages/shared/src/paths/communication/index.ts`**

```ts
export { MailPaths }      from './Mail';
export { ChatPaths }      from './Chat';
export { PhonePaths }     from './Phone';
export { VideoPaths }     from './Video';
export { UserPaths }      from './User';
export { UsersPaths }     from './Users';
export { ThumbsUpPaths }  from './ThumbsUp';
export { SendPaths }      from './Send';
export { ReactionPaths }  from './Reaction';
export { MentionPaths }   from './Mention';
```

- [ ] **Step 3: Type check + commit**

```bash
npm run typecheck -w packages/shared
git add packages/shared/src/paths/communication/
git commit -m "feat(shared): add 10 Communication path files"
```

---

### Task 1.4 — Settings paths (9 files)

**Files:** `packages/shared/src/paths/settings/` — 9 files + `index.ts`

- [ ] **Step 1: Create path files**

```ts
// Settings.ts
export const SettingsPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  gear: 'M24 16 a8 8 0 1 0 0.01 0',
  rays: 'M24 6 L24 10 M24 38 L24 42 M6 24 L10 24 M38 24 L42 24 M11.5 11.5 L14.3 14.3 M33.7 33.7 L36.5 36.5 M11.5 36.5 L14.3 33.7 M33.7 14.3 L36.5 11.5',
} as const;

// Sliders.ts
export const SlidersPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  track1: 'M6 14 L42 14',
  knob1:  'M18 14 a4 4 0 1 0 0.01 0',
  track2: 'M6 24 L42 24',
  knob2:  'M28 24 a4 4 0 1 0 0.01 0',
  track3: 'M6 34 L42 34',
  knob3:  'M16 34 a4 4 0 1 0 0.01 0',
} as const;

// Lock.ts
export const LockPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body:    'M10 22 L38 22 L38 42 L10 42 Z',
  shackle: 'M16 22 L16 16 a8 8 0 0 1 16 0 L32 22',
  knob:    'M24 30 a3 3 0 1 0 0.01 0',
  stem:    'M24 33 L24 37',
} as const;

// Unlock.ts
export const UnlockPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body:    'M10 22 L38 22 L38 42 L10 42 Z',
  shackle: 'M16 22 L16 16 a8 8 0 0 1 16 0',
  open:    'M32 16 L36 10',
  knob:    'M24 30 a3 3 0 1 0 0.01 0',
} as const;

// Key.ts
export const KeyPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  ring:   'M18 10 a10 10 0 1 0 0.01 0',
  shaft:  'M26 18 L42 34',
  teeth1: 'M34 28 L34 34',
  teeth2: 'M38 32 L38 36',
} as const;

// Eye.ts
export const EyePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  lids:  'M4 24 Q24 8 44 24 Q24 40 4 24 Z',
  iris:  'M24 16 a8 8 0 1 0 0.01 0',
  pupil: 'M24 20 a4 4 0 1 0 0.01 0',
} as const;

// EyeOff.ts
export const EyeOffPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  lids:  'M4 24 Q24 8 44 24',
  iris:  'M24 16 a8 8 0 1 0 0.01 0',
  slash: 'M6 6 L42 42',
} as const;

// Info.ts
export const InfoPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  circle: 'M24 6 a18 18 0 1 0 0.01 0',
  dot:    'M24 18 a2 2 0 1 0 0.01 0',
  stem:   'M24 24 L24 36',
} as const;

// Help.ts
export const HelpPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  circle: 'M24 6 a18 18 0 1 0 0.01 0',
  mark:   'M18 18 Q18 12 24 12 Q30 12 30 18 Q30 24 24 24 L24 28',
  dot:    'M24 34 a2 2 0 1 0 0.01 0',
} as const;
```

- [ ] **Step 2: Create `packages/shared/src/paths/settings/index.ts`**

```ts
export { SettingsPaths } from './Settings';
export { SlidersPaths }  from './Sliders';
export { LockPaths }     from './Lock';
export { UnlockPaths }   from './Unlock';
export { KeyPaths }      from './Key';
export { EyePaths }      from './Eye';
export { EyeOffPaths }   from './EyeOff';
export { InfoPaths }     from './Info';
export { HelpPaths }     from './Help';
```

- [ ] **Step 3: Type check + commit**

```bash
npm run typecheck -w packages/shared
git add packages/shared/src/paths/settings/
git commit -m "feat(shared): add 9 Settings path files"
```

---

### Task 1.5 — Files paths (8 files)

**Files:** `packages/shared/src/paths/files/` — 8 files + `index.ts`

- [ ] **Step 1: Create path files**

```ts
// Folder.ts
export const FolderPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body: 'M4 16 L44 16 L44 40 L4 40 Z',
  tab:  'M4 16 L4 10 L20 10 L24 16',
} as const;

// Document.ts
export const DocumentPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  page:  'M10 6 L32 6 L38 12 L38 42 L10 42 Z',
  fold:  'M32 6 L32 12 L38 12',
  line1: 'M16 20 L32 20',
  line2: 'M16 26 L32 26',
  line3: 'M16 32 L28 32',
} as const;

// Image.ts
export const ImagePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  frame:    'M4 8 L44 8 L44 40 L4 40 Z',
  mountain: 'M4 32 L16 18 L28 30 L34 24 L44 40 L4 40 Z',
  sun:      'M36 14 a5 5 0 1 0 0.01 0',
} as const;

// Attachment.ts
export const AttachmentPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  clip: 'M32 20 L32 34 Q32 42 24 42 Q16 42 16 34 L16 16 Q16 6 24 6 Q32 6 32 14 L32 34',
} as const;

// Cloud.ts
export const CloudPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  cloud: 'M12 32 Q4 32 4 24 Q4 16 12 16 Q12 8 20 8 Q28 8 28 16 Q34 16 36 22 Q42 22 42 28 Q42 34 36 34 Z',
  arrow: 'M24 22 L24 36 M18 30 L24 36 L30 30',
} as const;

// Link.ts
export const LinkPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  link1: 'M18 30 Q10 38 10 28 L10 20 Q10 10 18 10 L28 10 Q38 10 38 20',
  link2: 'M30 18 Q38 10 38 20 L38 28 Q38 38 30 38 L20 38 Q10 38 10 28',
} as const;

// Archive.ts
export const ArchivePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  box:    'M6 18 L42 18 L42 42 L6 42 Z',
  lid:    'M4 10 L44 10 L44 18 L4 18 Z',
  item:   'M18 28 L24 22 L30 28 M24 22 L24 36',
} as const;

// Tag.ts
export const TagPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  tag:  'M24 8 L38 8 L44 14 L44 28 L30 42 L14 28 L8 28 L8 14 Z',
  hole: 'M32 16 a3 3 0 1 0 0.01 0',
  string: 'M24 8 L24 4',
} as const;
```

- [ ] **Step 2: Create `packages/shared/src/paths/files/index.ts`**

```ts
export { FolderPaths }     from './Folder';
export { DocumentPaths }   from './Document';
export { ImagePaths }      from './Image';
export { AttachmentPaths } from './Attachment';
export { CloudPaths }      from './Cloud';
export { LinkPaths }       from './Link';
export { ArchivePaths }    from './Archive';
export { TagPaths }        from './Tag';
```

- [ ] **Step 3: Type check + commit**

```bash
npm run typecheck -w packages/shared
git add packages/shared/src/paths/files/
git commit -m "feat(shared): add 8 Files path files"
```

---

### Task 1.6 — Media paths (8 files)

**Files:** `packages/shared/src/paths/media/` — 8 files + `index.ts`

- [ ] **Step 1: Create path files**

```ts
// Play.ts
export const PlayPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  triangle: 'M12 8 L40 24 L12 40 Z',
} as const;

// Pause.ts
export const PausePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  bar1: 'M14 10 L14 38',
  bar2: 'M26 10 L26 38',  // Note: bars are wide via strokeWidth
  // Use rects instead for cleaner pause icon
  rect1: 'M12 10 L20 10 L20 38 L12 38 Z',
  rect2: 'M28 10 L36 10 L36 38 L28 38 Z',
} as const;

// Stop.ts
export const StopPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  square: 'M12 12 L36 12 L36 36 L12 36 Z',
} as const;

// FastForward.ts
export const FastForwardPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  chev1: 'M6 12 L22 24 L6 36',
  chev2: 'M22 12 L38 24 L22 36',
  end:   'M42 12 L42 36',
} as const;

// Rewind.ts
export const RewindPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  chev1: 'M42 12 L26 24 L42 36',
  chev2: 'M26 12 L10 24 L26 36',
  end:   'M6 12 L6 36',
} as const;

// Volume.ts
export const VolumePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  speaker: 'M8 18 L8 30 L16 30 L28 40 L28 8 L16 18 Z',
  wave1:   'M33 18 Q38 24 33 30',
  wave2:   'M37 13 Q45 24 37 35',
} as const;

// Mute.ts
export const MutePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  speaker: 'M8 18 L8 30 L16 30 L28 40 L28 8 L16 18 Z',
  slash:   'M34 14 L44 34',
} as const;

// Microphone.ts
export const MicrophonePaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  capsule: 'M18 6 Q18 2 24 2 Q30 2 30 6 L30 22 Q30 30 24 30 Q18 30 18 22 Z',
  stand:   'M12 24 Q12 38 24 38 Q36 38 36 24',
  stem:    'M24 38 L24 44',
  base:    'M18 44 L30 44',
  ring1:   'M14 20 a10 10 0 0 0 20 0',
  ring2:   'M10 20 a14 14 0 0 0 28 0',
} as const;
```

- [ ] **Step 2: Create `packages/shared/src/paths/media/index.ts`**

```ts
export { PlayPaths }        from './Play';
export { PausePaths }       from './Pause';
export { StopPaths }        from './Stop';
export { FastForwardPaths } from './FastForward';
export { RewindPaths }      from './Rewind';
export { VolumePaths }      from './Volume';
export { MutePaths }        from './Mute';
export { MicrophonePaths }  from './Microphone';
```

- [ ] **Step 3: Type check + commit**

```bash
npm run typecheck -w packages/shared
git add packages/shared/src/paths/media/
git commit -m "feat(shared): add 8 Media path files"
```

---

### Task 1.7 — Device paths (6 files)

**Files:** `packages/shared/src/paths/device/` — 6 files + `index.ts`

- [ ] **Step 1: Create path files**

```ts
// Battery.ts
export const BatteryPaths = {
  viewBox: '0 0 48 48', defaultColor: '#22c55e', defaultStrokeWidth: 2.5,
  body:  'M4 16 L40 16 L40 32 L4 32 Z',
  cap:   'M40 20 L44 20 L44 28 L40 28',
  level: 'M7 19 L7 29 L0 29 L0 19 Z',  // animated width
  bolt:  'M23 20 L20 25 L24 25 L21 32',
} as const;

// Bluetooth.ts
export const BluetoothPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  symbol: 'M18 14 L30 24 L18 34 L18 10 L30 24 L18 38',
  ring1:  'M34 18 Q40 24 34 30',
  ring2:  'M38 13 Q46 24 38 35',
} as const;

// Location.ts
export const LocationPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  pin:    'M24 6 a12 12 0 0 1 0 24 a12 12 0 0 1 0 -24 Z',
  inner:  'M24 12 a6 6 0 1 0 0.01 0',
  stem:   'M24 30 L24 44',
  shadow: 'M18 45 Q24 43 30 45 Q24 47 18 45',
} as const;

// CloudSync.ts
export const CloudSyncPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  cloud: 'M14 30 Q6 30 6 22 Q6 14 14 14 Q14 8 22 8 Q30 8 30 14 Q36 14 38 20 Q42 20 42 26 Q42 32 36 32 L14 32 Z',
  arc:   'M22 22 a8 8 0 1 1 4 0',
  arrow: 'M26 22 L22 18 M26 22 L30 18',
} as const;

// Camera.ts
export const CameraPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  body:  'M6 14 L42 14 L42 40 L6 40 Z',
  notch: 'M16 14 L19 8 L29 8 L32 14',
  lens:  'M24 20 a8 8 0 1 0 0.01 0',
  inner: 'M24 24 a4 4 0 1 0 0.01 0',
} as const;

// Brightness.ts
export const BrightnessPaths = {
  viewBox: '0 0 48 48', defaultColor: '#6366f1', defaultStrokeWidth: 2.5,
  sun:  'M24 14 a10 10 0 1 0 0.01 0',
  rays: 'M24 4 L24 8 M24 40 L24 44 M4 24 L8 24 M40 24 L44 24 M8.6 8.6 L11.4 11.4 M36.6 36.6 L39.4 39.4 M8.6 39.4 L11.4 36.6 M36.6 11.4 L39.4 8.6',
} as const;
```

- [ ] **Step 2: Create `packages/shared/src/paths/device/index.ts`**

```ts
export { BatteryPaths }    from './Battery';
export { BluetoothPaths }  from './Bluetooth';
export { LocationPaths }   from './Location';
export { CloudSyncPaths }  from './CloudSync';
export { CameraPaths }     from './Camera';
export { BrightnessPaths } from './Brightness';
```

- [ ] **Step 3: Update `packages/shared/src/index.ts`** — add 6 new export lines:

```ts
export * from './paths/actions';
export * from './paths/communication';
export * from './paths/settings';
export * from './paths/files';
export * from './paths/media';
export * from './paths/device';
```

- [ ] **Step 4: Type check all + commit**

```bash
npm run typecheck
git add packages/shared/src/paths/device/ packages/shared/src/index.ts
git commit -m "feat(shared): add 6 Device paths + update shared barrel — Phase 1 complete"
```

---

## Phase 2 — React Components (Navigation + Actions + Communication)

**Goal:** 32 CSS-keyframe React components. Each imports from `@animicons/shared`, uses `resolveStyle` + `getAnimDuration`, injects scoped `<style>` block, wires `autoPlay`/`loop`/`onAnimationEnd`.

### Task 2.1 — React: Navigation & Structure (10 components added to `ui/`)

**Files:** `packages/react/src/icons/ui/` — 10 new `.tsx` + update `index.ts`

- [ ] **Step 1: Create Home, Menu, KebabMenu, MoreHorizontal**

```tsx
// Home.tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { HomePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Home: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HomePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-home-bounce-${uid} {
          0%, 100% { transform: translateY(0); }
          40%      { transform: translateY(-6px); }
          60%      { transform: translateY(-3px); }
        }
        .ai-home-body-${uid} {
          animation: ai-home-bounce-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 28px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={HomePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-home-body-${uid}` } as any)}
          d={HomePaths.house} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-home-body-${uid}` } as any)}
          d={HomePaths.door} stroke={s.stroke} strokeWidth={s.strokeWidth}
          strokeLinejoin="round" fill="none" opacity={s.opacity} />
        <Path d={HomePaths.roof} stroke={s.stroke} strokeWidth={s.strokeWidth}
          strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

```tsx
// Menu.tsx — morph hamburger → X
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { MenuPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Menu: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MenuPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-menu-top-${uid} {
          0%,40%  { transform: translateY(0) rotate(0deg); }
          60%,100%{ transform: translateY(6px) rotate(45deg); }
        }
        @keyframes ai-menu-mid-${uid} {
          0%,40%  { opacity: 1; }
          60%,100%{ opacity: 0; }
        }
        @keyframes ai-menu-bot-${uid} {
          0%,40%  { transform: translateY(0) rotate(0deg); }
          60%,100%{ transform: translateY(-6px) rotate(-45deg); }
        }
        .ai-menu-top-${uid} {
          animation: ai-menu-top-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 18px;
        }
        .ai-menu-mid-${uid} {
          animation: ai-menu-mid-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-menu-bot-${uid} {
          animation: ai-menu-bot-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 30px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={MenuPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-menu-top-${uid}` } as any)}
          d={MenuPaths.top} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-menu-mid-${uid}` } as any)}
          d={MenuPaths.middle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-menu-bot-${uid}` } as any)}
          d={MenuPaths.bottom} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

```tsx
// KebabMenu.tsx — staggered dot pulse
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { KebabMenuPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const KebabMenu: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, KebabMenuPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-keb-pulse-${uid} {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.4); }
        }
        .ai-keb-d1-${uid} {
          animation: ai-keb-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: 0ms;
          transform-origin: 24px 14px;
        }
        .ai-keb-d2-${uid} {
          animation: ai-keb-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger}ms;
          transform-origin: 24px 24px;
        }
        .ai-keb-d3-${uid} {
          animation: ai-keb-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger * 2}ms;
          transform-origin: 24px 34px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={KebabMenuPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-keb-d1-${uid}` } as any)} d={KebabMenuPaths.dot1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-keb-d2-${uid}` } as any)} d={KebabMenuPaths.dot2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-keb-d3-${uid}` } as any)} d={KebabMenuPaths.dot3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

```tsx
// MoreHorizontal.tsx — same staggered pulse, horizontal
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { MoreHorizontalPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const MoreHorizontal: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MoreHorizontalPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-more-pulse-${uid} {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.4); }
        }
        .ai-more-d1-${uid} { animation: ai-more-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; transform-origin: 14px 24px; }
        .ai-more-d2-${uid} { animation: ai-more-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; transform-origin: 24px 24px; }
        .ai-more-d3-${uid} { animation: ai-more-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; transform-origin: 34px 24px; }
      `}</style>
      <Svg width={size} height={size} viewBox={MoreHorizontalPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-more-d1-${uid}` } as any)} d={MoreHorizontalPaths.dot1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-more-d2-${uid}` } as any)} d={MoreHorizontalPaths.dot2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-more-d3-${uid}` } as any)} d={MoreHorizontalPaths.dot3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 2: Create Back, Forward, ChevronDown, Close, Grid, Search**

```tsx
// Back.tsx
export const Back: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BackPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-back-slide-${uid} {
          0%, 100% { transform: translateX(0); }
          40%      { transform: translateX(-6px); }
          70%      { transform: translateX(2px); }
        }
        .ai-back-body-${uid} {
          animation: ai-back-slide-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={BackPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-back-body-${uid}` } as any)}
          d={BackPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
        <Path {...({ className: `ai-back-body-${uid}` } as any)}
          d={BackPaths.shaft} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

```tsx
// Forward.tsx — same as Back but slides right
export const Forward: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ForwardPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-fwd-slide-${uid} {
          0%, 100% { transform: translateX(0); }
          40%      { transform: translateX(6px); }
          70%      { transform: translateX(-2px); }
        }
        .ai-fwd-body-${uid} {
          animation: ai-fwd-slide-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ForwardPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-fwd-body-${uid}` } as any)}
          d={ForwardPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
        <Path {...({ className: `ai-fwd-body-${uid}` } as any)}
          d={ForwardPaths.shaft} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

```tsx
// ChevronDown.tsx
export const ChevronDown: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ChevronDownPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-chev-bounce-${uid} {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
        .ai-chev-body-${uid} {
          animation: ai-chev-bounce-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ChevronDownPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-chev-body-${uid}` } as any)}
          d={ChevronDownPaths.chevron} stroke={s.stroke} strokeWidth={s.strokeWidth}
          strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

```tsx
// Close.tsx — rotate+scale pop (loop=once by spec)
export const Close: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ClosePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-close-pop-${uid} {
          0%   { transform: rotate(-45deg) scale(0.5); opacity: 0; }
          60%  { transform: rotate(5deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        .ai-close-body-${uid} {
          animation: ai-close-pop-${uid} ${d.short}ms ${EASING_CSS.spring} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ClosePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-close-body-${uid}` } as any)}
          d={ClosePaths.line1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-close-body-${uid}` } as any)}
          d={ClosePaths.line2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

```tsx
// Grid.tsx — staggered pop-in (loop=once by spec)
export const Grid: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, GridPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-grid-pop-${uid} {
          0%   { transform: scale(0); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .ai-grid-tl-${uid} { animation: ai-grid-pop-${uid} ${d.medium}ms ${EASING_CSS.spring} ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; transform-origin: 15px 15px; }
        .ai-grid-tr-${uid} { animation: ai-grid-pop-${uid} ${d.medium}ms ${EASING_CSS.spring} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; transform-origin: 33px 15px; }
        .ai-grid-bl-${uid} { animation: ai-grid-pop-${uid} ${d.medium}ms ${EASING_CSS.spring} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; transform-origin: 15px 33px; }
        .ai-grid-br-${uid} { animation: ai-grid-pop-${uid} ${d.medium}ms ${EASING_CSS.spring} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 3}ms; transform-origin: 33px 33px; }
      `}</style>
      <Svg width={size} height={size} viewBox={GridPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-grid-tl-${uid}` } as any)} d={GridPaths.tl} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-grid-tr-${uid}` } as any)} d={GridPaths.tr} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-grid-bl-${uid}` } as any)} d={GridPaths.bl} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-grid-br-${uid}` } as any)} d={GridPaths.br} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

```tsx
// Search.tsx
export const Search: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SearchPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';
  return (
    <>
      <style>{`
        @keyframes ai-srch-pulse-${uid} {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.1); }
        }
        @keyframes ai-srch-scan-${uid} {
          0%   { transform: translate(-4px, -4px); }
          100% { transform: translate(4px, 4px); }
        }
        .ai-srch-lens-${uid} {
          animation: ai-srch-pulse-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 20px 20px;
        }
        .ai-srch-scan-${uid} {
          animation: ai-srch-scan-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount} alternate;
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={SearchPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-srch-lens-${uid}` } as any)}
          d={SearchPaths.lens} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-srch-scan-${uid}` } as any)}
          d={SearchPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 3: Update `packages/react/src/icons/ui/index.ts`** — append:

```ts
export { Home }           from './Home';
export { Menu }           from './Menu';
export { KebabMenu }      from './KebabMenu';
export { MoreHorizontal } from './MoreHorizontal';
export { Back }           from './Back';
export { Forward }        from './Forward';
export { ChevronDown }    from './ChevronDown';
export { Close }          from './Close';
export { Grid }           from './Grid';
export { Search }         from './Search';
```

- [ ] **Step 4: Type check + commit**

```bash
npm run typecheck -w packages/react
git add packages/react/src/icons/ui/
git commit -m "feat(react): add 10 Navigation & Structure components"
```

---

### Task 2.2 — React: Actions (12 components, new `actions/` folder)

**Files:** `packages/react/src/icons/actions/` — 12 `.tsx` + `index.ts`

- [ ] **Step 1: Create Add, Edit, Save, Trash**

Follow the Bell.tsx pattern exactly. Key animation details:

```tsx
// Add.tsx — spring scale pop (loop=tap → default loop=false)
// @keyframes ai-add-pop: 0%{transform:scale(1)} 50%{transform:scale(1.3) rotate(45deg)} 100%{transform:scale(1)}
// duration: d.short, easing: spring, transform-origin: 24px 24px

// Edit.tsx — pencil stroke draw (stroke-dashoffset)
// @keyframes ai-edit-draw: 0%{stroke-dashoffset:40} 100%{stroke-dashoffset:0}
// Apply to the `trace` path. strokeDasharray="40" on trace path. duration: d.long, linear

// Save.tsx — slide down + checkmark draw (loop=once)
// @keyframes ai-save-slide: 0%{transform:translateY(-8px);opacity:0} 100%{transform:translateY(0);opacity:1}
// @keyframes ai-save-check: 0%{stroke-dashoffset:30} 100%{stroke-dashoffset:0}
// duration: d.medium, easeOut

// Trash.tsx — shake body
// @keyframes ai-trash-shake: 0%,100%{transform:rotate(0)} 20%{transform:rotate(-8deg)} 40%{transform:rotate(8deg)} 60%{transform:rotate(-5deg)} 80%{transform:rotate(5deg)}
// Apply to group of body+lines. duration: d.long, transform-origin: 24px 26px
```

Full component implementations follow the same structure as Bell.tsx. Import path-specific Paths object from `@animicons/shared`. Use `resolveStyle` and `getAnimDuration`. Wire up `autoPlay`, `loop`, `iterCount`, `playState`.

- [ ] **Step 2: Create Share, Download, Refresh, Sync**

```tsx
// Share.tsx — center dot bursts to 3 satellites
// @keyframes ai-share-pop: 0%,100%{transform:scale(1)} 30%{transform:scale(1.4)} 50%{transform:scale(0.9)}
// @keyframes ai-share-d1: 0%,100%{opacity:0;transform:translate(0,0)} 40%,60%{opacity:1;transform:translate(-10px,-8px)}
// @keyframes ai-share-d2: same but translate(10px,-8px)
// @keyframes ai-share-d3: same but translate(0,12px)
// transform-origins at 24px 24px for all

// Download.tsx — arrow bounces down + bar fills (stroke-dashoffset)
// @keyframes ai-dl-arrow: 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)}
// @keyframes ai-dl-bar: 0%{stroke-dashoffset:28} 50%{stroke-dashoffset:0} 100%{stroke-dashoffset:28}
// strokeDasharray="28" on bar path. duration: d.medium

// Refresh.tsx — full 360 spin
// @keyframes ai-refresh-spin: from{transform:rotate(0)} to{transform:rotate(360deg)}
// duration: d.medium, linear, transform-origin: 24px 24px

// Sync.tsx — two arcs rotate in opposite directions
// @keyframes ai-sync-fwd: from{transform:rotate(0)} to{transform:rotate(360deg)}
// @keyframes ai-sync-rev: from{transform:rotate(0)} to{transform:rotate(-360deg)}
// duration: d.long, linear, transform-origin: 24px 24px for both
```

- [ ] **Step 3: Create Copy, Pin, Bookmark, Filter**

```tsx
// Copy.tsx — top page lifts + stamps (loop=tap → default loop=false)
// @keyframes ai-copy-lift: 0%,100%{transform:translate(0,0)} 40%{transform:translate(-4px,-6px)} 70%{transform:translate(0,0)}
// Apply to `front` path. duration: d.medium

// Pin.tsx — drop with bounce (loop=once)
// @keyframes ai-pin-drop: 0%{transform:translateY(-20px);opacity:0} 60%{transform:translateY(4px)} 80%{transform:translateY(-2px)} 100%{transform:translateY(0);opacity:1}
// duration: d.short, easeOut

// Bookmark.tsx — slide down (loop=tap → default loop=false)
// @keyframes ai-bkmk-slide: 0%{transform:translateY(-12px);opacity:0} 60%{transform:translateY(2px)} 100%{transform:translateY(0);opacity:1}
// duration: d.short, easeOut

// Filter.tsx — funnel pulse + lines slide in from top
// @keyframes ai-filter-pulse: 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)}
// @keyframes ai-filter-line: 0%,100%{stroke-dashoffset:18} 50%{stroke-dashoffset:0}
// strokeDasharray="18" on both line paths. duration: d.long
```

- [ ] **Step 4: Create `packages/react/src/icons/actions/index.ts`**

```ts
export { Add }      from './Add';
export { Edit }     from './Edit';
export { Save }     from './Save';
export { Trash }    from './Trash';
export { Share }    from './Share';
export { Download } from './Download';
export { Refresh }  from './Refresh';
export { Sync }     from './Sync';
export { Copy }     from './Copy';
export { Pin }      from './Pin';
export { Bookmark } from './Bookmark';
export { Filter }   from './Filter';
```

- [ ] **Step 5: Type check + commit**

```bash
npm run typecheck -w packages/react
git add packages/react/src/icons/actions/
git commit -m "feat(react): add 12 Actions components"
```

---

### Task 2.3 — React: Communication (10 components, new `communication/` folder)

**Files:** `packages/react/src/icons/communication/` — 10 `.tsx` + `index.ts`

- [ ] **Step 1: Create Mail, Chat, Phone, Video, User, Users**

```tsx
// Mail.tsx — envelope opens, letter rises
// @keyframes ai-mail-open: 0%,100%{transform:rotate(0)} 50%{transform:rotateX(-30deg)}
// @keyframes ai-mail-letter: 0%,100%{transform:translateY(0);opacity:1} 30%{transform:translateY(-8px);opacity:1} 60%,70%{transform:translateY(-8px);opacity:0.8}
// Apply flap to open animation, letter to letter animation. duration: d.long

// Chat.tsx — bubble pops + typing dots pulse staggered
// @keyframes ai-chat-pop: 0%,100%{transform:scale(1)} 20%{transform:scale(1.08)} 40%{transform:scale(0.96)}
// @keyframes ai-chat-dot: 0%,60%,100%{opacity:0.3;transform:translateY(0)} 30%{opacity:1;transform:translateY(-3px)}
// dot1 delay: 0ms, dot2 delay: stagger, dot3 delay: stagger*2. duration: d.medium for dots

// Phone.tsx — handset vibrates (ring)
// @keyframes ai-phone-ring: 0%,100%{transform:rotate(0)} 20%{transform:rotate(-15deg)} 40%{transform:rotate(15deg)} 60%{transform:rotate(-10deg)} 80%{transform:rotate(10deg)}
// duration: d.medium, transform-origin: 24px 24px

// Video.tsx — record dot blinks red
// @keyframes ai-video-blink: 0%,100%{opacity:1} 50%{opacity:0.1}
// Apply to `dot` path. duration: d.long. Use fill="red" for the dot.

// User.tsx — subtle scale breathe
// @keyframes ai-user-breathe: 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)}
// Apply to whole group. duration: d.long, transform-origin: 24px 24px

// Users.tsx — two figures bounce in staggered
// @keyframes ai-users-bounce: 0%{transform:translateY(0)} 40%{transform:translateY(-5px)} 100%{transform:translateY(0)}
// figure1 (head1+body1): delay 0ms. figure2 (head2+body2): delay stagger. duration: d.long
```

- [ ] **Step 2: Create ThumbsUp, Send, Reaction, Mention**

```tsx
// ThumbsUp.tsx — bounces up (loop=tap → default loop=false)
// @keyframes ai-thumb-bounce: 0%{transform:translateY(0) scale(1)} 40%{transform:translateY(-10px) scale(1.1)} 100%{transform:translateY(0) scale(1)}
// duration: d.short, spring, transform-origin: 24px 24px

// Send.tsx — plane launches diagonally + fades
// @keyframes ai-send-launch: 0%{transform:translate(0,0);opacity:1} 70%{transform:translate(18px,-18px);opacity:0} 71%{transform:translate(-18px,18px);opacity:0} 100%{transform:translate(0,0);opacity:1}
// Apply to whole group. duration: d.medium

// Reaction.tsx — mouth curves from flat to smile
// @keyframes ai-react-smile: 0%,100%{d:path("M16 28 L32 28")} 50%{d:path("M16 28 Q24 36 32 28")}
// NOTE: CSS d:path() has limited support. Alternative: use opacity toggle between two path elements
// mouth-neutral: opacity toggle 1→0→1, mouth-smile: opacity toggle 0→1→0. duration: d.long

// Mention.tsx — circle draws in via stroke-dashoffset
// @keyframes ai-mention-draw: 0%{stroke-dashoffset:88} 100%{stroke-dashoffset:0}
// strokeDasharray="88" on ring path. duration: d.medium, linear
```

- [ ] **Step 3: Create `packages/react/src/icons/communication/index.ts`**

```ts
export { Mail }      from './Mail';
export { Chat }      from './Chat';
export { Phone }     from './Phone';
export { Video }     from './Video';
export { User }      from './User';
export { Users }     from './Users';
export { ThumbsUp }  from './ThumbsUp';
export { Send }      from './Send';
export { Reaction }  from './Reaction';
export { Mention }   from './Mention';
```

- [ ] **Step 4: Type check + commit**

```bash
npm run typecheck -w packages/react
git add packages/react/src/icons/communication/
git commit -m "feat(react): add 10 Communication components"
```

---

## Phase 3 — React Components (Settings + Files + Media + Device)

### Task 3.1 — React: Settings (9 components)

**Files:** `packages/react/src/icons/settings/` — 9 `.tsx` + `index.ts`

- [ ] **Step 1: Create Settings, Sliders, Lock, Unlock, Key**

```tsx
// Settings.tsx — gear rotates continuously
// @keyframes ai-settings-spin: from{transform:rotate(0)} to{transform:rotate(360deg)}
// Apply to whole group (gear + rays). duration: d.long, linear, transform-origin: 24px 24px

// Sliders.tsx — 3 knobs move independently staggered
// @keyframes ai-sliders-k1: 0%,100%{transform:translateX(0)} 50%{transform:translateX(10px)}
// @keyframes ai-sliders-k2: 0%,100%{transform:translateX(0)} 50%{transform:translateX(-8px)}
// @keyframes ai-sliders-k3: 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)}
// k1 delay: 0, k2 delay: stagger, k3 delay: stagger*2. duration: d.long

// Lock.tsx — body bounces + shackle lifts briefly
// @keyframes ai-lock-bounce: 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)}
// @keyframes ai-lock-shackle: 0%,100%{transform:translateY(0)} 30%,50%{transform:translateY(-6px)}
// duration: d.long, easeInOut

// Unlock.tsx — shackle swings open (loop=once)
// @keyframes ai-unlock-swing: 0%{transform:rotate(0) translateY(0)} 100%{transform:rotate(-60deg) translateY(-4px)}
// Apply to shackle+open paths. duration: d.medium, easeOut, transform-origin: 24px 22px

// Key.tsx — rotates 360°
// @keyframes ai-key-spin: from{transform:rotate(0)} to{transform:rotate(360deg)}
// Apply to whole group. duration: d.long, linear, transform-origin: 24px 24px
```

- [ ] **Step 2: Create Eye, EyeOff, Info, Help**

```tsx
// Eye.tsx — blinks (lid closes and opens)
// @keyframes ai-eye-blink: 0%,100%{transform:scaleY(1)} 45%,55%{transform:scaleY(0.05)}
// Apply to `lids` path. duration: d.long, easeInOut, transform-origin: 24px 24px

// EyeOff.tsx — slash draws across (loop=once)
// @keyframes ai-eyeoff-slash: 0%{stroke-dashoffset:54} 100%{stroke-dashoffset:0}
// strokeDasharray="54" on slash path. duration: d.short, linear

// Info.tsx — circle pulses + i bounces
// @keyframes ai-info-pulse: 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)}
// @keyframes ai-info-bounce: 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)}
// circle + dot: pulse. stem: bounce. duration: d.long

// Help.tsx — ? floats gently
// @keyframes ai-help-float: 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)}
// Apply to mark+dot paths. duration: d.long, easeInOut
```

- [ ] **Step 3: Create `packages/react/src/icons/settings/index.ts`**

```ts
export { Settings } from './Settings';
export { Sliders }  from './Sliders';
export { Lock }     from './Lock';
export { Unlock }   from './Unlock';
export { Key }      from './Key';
export { Eye }      from './Eye';
export { EyeOff }   from './EyeOff';
export { Info }     from './Info';
export { Help }     from './Help';
```

- [ ] **Step 4: Type check + commit**

```bash
npm run typecheck -w packages/react
git add packages/react/src/icons/settings/
git commit -m "feat(react): add 9 Settings components"
```

---

### Task 3.2 — React: Files (8 components)

**Files:** `packages/react/src/icons/files/` — 8 `.tsx` + `index.ts`

- [ ] **Step 1: Create Folder, Document, Image, Attachment**

```tsx
// Folder.tsx — tab lifts open and closes
// @keyframes ai-folder-open: 0%,100%{transform:rotate(0) translateY(0)} 40%{transform:rotate(-10deg) translateY(-4px)}
// Apply to `tab` path. duration: d.long, easeInOut, transform-origin: 4px 14px

// Document.tsx — 3 text lines draw in staggered (stroke-dashoffset)
// @keyframes ai-doc-line: 0%{stroke-dashoffset:18} 100%{stroke-dashoffset:0}
// strokeDasharray="18" on each line. line1 delay:0, line2 delay:stagger, line3 delay:stagger*2. duration: d.long

// Image.tsx — sun rises + opacity brightens
// @keyframes ai-img-sun: 0%,100%{transform:translateY(4px)} 50%{transform:translateY(0)}
// @keyframes ai-img-fade: 0%,100%{opacity:0.4} 50%{opacity:1}
// Apply sun to sun path. Apply fade to mountain + sun. duration: d.long

// Attachment.tsx — clip swings/rotates
// @keyframes ai-attach-swing: 0%,100%{transform:rotate(0)} 25%{transform:rotate(15deg)} 75%{transform:rotate(-15deg)}
// Apply to whole path. duration: d.long, easeInOut, transform-origin: 24px 8px
```

- [ ] **Step 2: Create Cloud, Link, Archive, Tag**

```tsx
// Cloud.tsx — arrow pulses upward
// @keyframes ai-cloud-arrow: 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)}
// Apply to `arrow` path. duration: d.medium, easeInOut

// Link.tsx — two links slide together
// @keyframes ai-link-connect: 0%,100%{transform:translate(0,0)} 50%{transform:translate(4px,0)}
// Apply link1 with translate(-4px). Apply link2 with translate(4px). duration: d.medium

// Archive.tsx — lid opens, item drops in
// @keyframes ai-arch-lid: 0%,100%{transform:rotate(0) translateY(0)} 30%,70%{transform:rotate(-15deg) translateY(-6px)}
// @keyframes ai-arch-item: 0%,30%{transform:translateY(-10px);opacity:0} 60%{transform:translateY(0);opacity:1} 100%{transform:translateY(0);opacity:1}
// duration: d.long

// Tag.tsx — swings on string
// @keyframes ai-tag-swing: 0%,100%{transform:rotate(0)} 25%{transform:rotate(12deg)} 75%{transform:rotate(-12deg)}
// Apply to whole path group. duration: d.long, easeInOut, transform-origin: 24px 4px
```

- [ ] **Step 3: Create `packages/react/src/icons/files/index.ts`**

```ts
export { Folder }     from './Folder';
export { Document }   from './Document';
export { Image }      from './Image';
export { Attachment } from './Attachment';
export { Cloud }      from './Cloud';
export { Link }       from './Link';
export { Archive }    from './Archive';
export { Tag }        from './Tag';
```

- [ ] **Step 4: Type check + commit**

```bash
npm run typecheck -w packages/react
git add packages/react/src/icons/files/
git commit -m "feat(react): add 8 Files components"
```

---

### Task 3.3 — React: Media (8 components)

**Files:** `packages/react/src/icons/media/` — 8 `.tsx` + `index.ts`

- [ ] **Step 1: Create Play, Pause, Stop, FastForward, Rewind**

```tsx
// Play.tsx — spring scale pop (loop=tap → default loop=false)
// @keyframes ai-play-pop: 0%{transform:scale(0.8)} 60%{transform:scale(1.15)} 100%{transform:scale(1)}
// duration: d.short, spring, transform-origin: 24px 24px

// Pause.tsx — bars shrink/grow rhythmically
// @keyframes ai-pause-breathe: 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.6)}
// rect1 delay: 0, rect2 delay: stagger. duration: d.medium, easeInOut, transform-origin bottom

// Stop.tsx — pulses once then holds (loop=once)
// @keyframes ai-stop-pulse: 0%{transform:scale(1)} 40%{transform:scale(1.15)} 100%{transform:scale(1)}
// duration: d.short, spring, transform-origin: 24px 24px

// FastForward.tsx — chevrons slide right in sequence
// @keyframes ai-ff-chev: 0%,100%{transform:translateX(0)} 50%{transform:translateX(8px)}
// chev1 delay: 0, chev2 delay: stagger. duration: d.medium

// Rewind.tsx — chevrons slide left in sequence
// @keyframes ai-rw-chev: 0%,100%{transform:translateX(0)} 50%{transform:translateX(-8px)}
// chev1 delay: 0, chev2 delay: stagger. duration: d.medium
```

- [ ] **Step 2: Create Volume, Mute, Microphone**

```tsx
// Volume.tsx — waves pulse outward staggered
// @keyframes ai-vol-wave: 0%,100%{opacity:0.3} 50%{opacity:1}
// wave1 delay: 0, wave2 delay: stagger. duration: d.medium

// Mute.tsx — slash draws across (loop=once)
// @keyframes ai-mute-slash: 0%{stroke-dashoffset:24} 100%{stroke-dashoffset:0}
// strokeDasharray="24" on slash path. duration: d.short, linear

// Microphone.tsx — sound rings pulse outward
// @keyframes ai-mic-ring: 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)}
// ring1 delay: 0, ring2 delay: stagger. duration: d.medium, easeInOut, transform-origin: 24px 18px
```

- [ ] **Step 3: Create `packages/react/src/icons/media/index.ts`**

```ts
export { Play }        from './Play';
export { Pause }       from './Pause';
export { Stop }        from './Stop';
export { FastForward } from './FastForward';
export { Rewind }      from './Rewind';
export { Volume }      from './Volume';
export { Mute }        from './Mute';
export { Microphone }  from './Microphone';
```

- [ ] **Step 4: Type check + commit**

```bash
npm run typecheck -w packages/react
git add packages/react/src/icons/media/
git commit -m "feat(react): add 8 Media components"
```

---

### Task 3.4 — React: Device (6 components)

**Files:** `packages/react/src/icons/device/` — 6 `.tsx` + `index.ts`

- [ ] **Step 1: Create Battery, Bluetooth, Location, CloudSync, Camera, Brightness**

```tsx
// Battery.tsx — level bar fills + bolt flashes
// @keyframes ai-bat-fill: 0%{width:0} 80%,100%{width:30px}
// Use an animated rect. Tricky: CSS width animation on SVG rect.
// Alternative: use clipPath or stroke-dashoffset on a rect outline.
// Use strokeDasharray approach: strokeDasharray="30" on a horizontal line.
// @keyframes ai-bat-line: 0%{stroke-dashoffset:30} 80%{stroke-dashoffset:0} 100%{stroke-dashoffset:0}
// @keyframes ai-bat-bolt: 0%,70%{opacity:0} 80%,90%{opacity:1} 100%{opacity:0}
// duration: d.long for both

// Bluetooth.tsx — rings pulse from center
// @keyframes ai-bt-ring: 0%,100%{opacity:0.2} 50%{opacity:1}
// ring1 delay: 0, ring2 delay: stagger. duration: d.long

// Location.tsx — pin drops with bounce + shadow scales
// @keyframes ai-loc-pin: 0%{transform:translateY(-20px);opacity:0} 60%{transform:translateY(4px)} 80%{transform:translateY(-2px)} 100%{transform:translateY(0);opacity:1}
// @keyframes ai-loc-shadow: 0%{transform:scale(0.3);opacity:0} 100%{transform:scale(1);opacity:0.4}
// pin: easeOut, shadow: easeOut. duration: d.medium. Loop repeats.

// CloudSync.tsx — arrow orbits around cloud
// @keyframes ai-cloudsync-spin: from{transform:rotate(0)} to{transform:rotate(360deg)}
// Apply to arc+arrow. duration: d.long, linear, transform-origin: 24px 20px

// Camera.tsx — lens blinks + flash burst
// @keyframes ai-cam-blink: 0%,85%,100%{opacity:1} 90%,95%{opacity:0.2}
// @keyframes ai-cam-flash: 0%,80%,100%{opacity:0} 85%{opacity:0.9}
// Apply blink to `lens` and `inner`. Apply flash to a white rect overlay. duration: d.long

// Brightness.tsx — rays extend/retract rhythmically
// @keyframes ai-bright-rays: 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)}
// Apply to `rays` path. Sun stays fixed. duration: d.long, easeInOut, transform-origin: 24px 24px
```

- [ ] **Step 2: Create `packages/react/src/icons/device/index.ts`**

```ts
export { Battery }    from './Battery';
export { Bluetooth }  from './Bluetooth';
export { Location }   from './Location';
export { CloudSync }  from './CloudSync';
export { Camera }     from './Camera';
export { Brightness } from './Brightness';
```

- [ ] **Step 3: Update `packages/react/src/index.ts`** — add 6 new lines:

```ts
export * from './icons/actions';
export * from './icons/communication';
export * from './icons/settings';
export * from './icons/files';
export * from './icons/media';
export * from './icons/device';
```

- [ ] **Step 4: Build + type check + commit**

```bash
npm run typecheck -w packages/react
npm run build:web
git add packages/react/src/icons/device/ packages/react/src/index.ts
git commit -m "feat(react): add 6 Device components + update barrel — Phase 3 complete"
```

---

## Phase 4 — React Native Components (Navigation + Actions + Communication)

Same icon set as Phase 2, using Reanimated instead of CSS keyframes. Follow Bell.tsx (RN) pattern exactly.

### Task 4.1 — RN: Navigation & Structure (10 components)

**Files:** `packages/react-native/src/icons/ui/` — 10 `.tsx` + update `index.ts`

- [ ] **Step 1: Create all 10 RN navigation components**

Each follows this pattern (Bell RN as reference):
```tsx
import { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, cancelAnimation, Easing } from 'react-native-reanimated';

// Home — useSharedValue(0) for translateY
// autoPlay: rotation.value = withRepeat(withSequence(withTiming(-6,{duration:d.medium*0.4}), withTiming(-3,{duration:d.medium*0.2}), withTiming(0,{duration:d.medium*0.4})), loop ? -1 : 1)
// Animated.View wraps house+door paths

// Menu — useSharedValue(0) topRot, useSharedValue(1) midOpacity, useSharedValue(0) botRot
// topRot: withRepeat(withSequence(withTiming(0,{dur:d.long*0.4}), withTiming(45,{dur:d.long*0.2}), withTiming(45,{dur:d.long*0.4})), loop?-1:1)
// midOpacity: withRepeat(withSequence(withTiming(1,{dur:d.long*0.4}), withTiming(0,{dur:d.long*0.2}), withTiming(0,{dur:d.long*0.4})), loop?-1:1)
// Animated.View per line with animated style

// KebabMenu / MoreHorizontal — useSharedValue(0.3) × 3, stagger via withDelay
// withRepeat(withSequence(withTiming(1,{dur:d.medium*0.5}), withTiming(0.3,{dur:d.medium*0.5})), loop?-1:1)
// dot2: startValue = same but wrap in withDelay(d.stagger, ...)
// dot3: wrap in withDelay(d.stagger*2, ...)

// Back — useSharedValue(0) translateX
// withRepeat(withSequence(withTiming(-6,{dur:d.medium*0.4}), withTiming(2,{dur:d.medium*0.3}), withTiming(0,{dur:d.medium*0.3})), loop?-1:1)

// Forward — same but positive translateX

// ChevronDown — useSharedValue(0) translateY
// withRepeat(withSequence(withTiming(6,{dur:d.medium*0.5}), withTiming(0,{dur:d.medium*0.5})), loop?-1:1)

// Close — useSharedValue(0) rotate + scale (loop=false default)
// withTiming(0, {dur:d.short}) after spring to full scale

// Grid — 4 shared values for scale (pop in staggered) with withDelay

// Search — lens scale shared value + handle translate shared value
```

- [ ] **Step 2: Update `packages/react-native/src/icons/ui/index.ts`** — same 10 exports as react version

- [ ] **Step 3: Type check + commit**

```bash
npm run typecheck -w packages/react-native
git add packages/react-native/src/icons/ui/
git commit -m "feat(react-native): add 10 Navigation & Structure components"
```

---

### Task 4.2 — RN: Actions (12 components)

**Files:** `packages/react-native/src/icons/actions/` — 12 `.tsx` + `index.ts`

- [ ] **Step 1: Create all 12 RN action components**

Mirror Phase 2 Task 2.2 animations, translated to Reanimated:
- `Add` — scale spring: `withSpring(1.3)` then `withSpring(1)`
- `Edit` — stroke-dashoffset not available in RN; use translateX on tip path instead
- `Save` — translateY + opacity for slide-in; separate value for check draw
- `Trash` — rotation shake sequence
- `Share` — center scale + 3 translate shared values
- `Download` — translateY for arrow + separate opacity fade for bar
- `Refresh` — continuous rotation via `withRepeat(withTiming(360, {duration:d.medium, easing:Easing.linear}), -1, false)`
- `Sync` — two rotation shared values spinning in opposite directions
- `Copy` — translate for top page
- `Pin` — translateY drop with bounce sequence
- `Bookmark` — translateY slide with bounce
- `Filter` — scale pulse + opacity for lines

- [ ] **Step 2: Create `packages/react-native/src/icons/actions/index.ts`** (same exports as react)

- [ ] **Step 3: Type check + commit**

```bash
npm run typecheck -w packages/react-native
git add packages/react-native/src/icons/actions/
git commit -m "feat(react-native): add 12 Actions components"
```

---

### Task 4.3 — RN: Communication (10 components)

**Files:** `packages/react-native/src/icons/communication/` — 10 `.tsx` + `index.ts`

- [ ] **Step 1: Create all 10 RN communication components**

Mirror Phase 2 Task 2.3 animations:
- `Mail` — rotateX not available on SVG path; use scaleY on flap to simulate open
- `Chat` — scale for bubble, translateY for dots staggered
- `Phone` — rotation shake
- `Video` — opacity blink for dot (use red fill in stroke color)
- `User` — scale breathe
- `Users` — translateY bounce staggered
- `ThumbsUp` — translateY + scale spring
- `Send` — translate diagonal sequence
- `Reaction` — rotate/scale smile (use separate neutral/smile paths with opacity toggle)
- `Mention` — rotate the ring (stroke-dashoffset not in RN; use rotate instead)

- [ ] **Step 2: Create `packages/react-native/src/icons/communication/index.ts`** (same exports)

- [ ] **Step 3: Type check + commit**

```bash
npm run typecheck -w packages/react-native
git add packages/react-native/src/icons/communication/
git commit -m "feat(react-native): add 10 Communication components"
```

---

## Phase 5 — React Native Components (Settings + Files + Media + Device)

### Task 5.1 — RN: Settings, Files, Media, Device (32 components)

**Files:** 4 new category folders in `packages/react-native/src/icons/`

- [ ] **Step 1: Settings (9 components)** — mirror Phase 3 Task 3.1 with Reanimated
  - `Settings` — continuous rotation
  - `Sliders` — 3 translateX shared values staggered
  - `Lock` — translateY bounce + separate shackle translateY
  - `Unlock` — rotate + translateY for shackle (loop=once)
  - `Key` — continuous rotation
  - `Eye` — scaleY blink sequence
  - `EyeOff` — opacity 0→1 for slash (loop=once, use stroke progress via opacity)
  - `Info` — scale for circle + translateY for i stem
  - `Help` — translateY float

- [ ] **Step 2: Files (8 components)** — mirror Phase 3 Task 3.2 with Reanimated
  - `Folder` — rotate for tab
  - `Document` — opacity stagger for lines
  - `Image` — translateY for sun + opacity for scene
  - `Attachment` — rotation swing
  - `Cloud` — translateY for arrow
  - `Link` — translateX for both link pieces (converge)
  - `Archive` — rotate for lid + translateY for item
  - `Tag` — rotation swing

- [ ] **Step 3: Media (8 components)** — mirror Phase 3 Task 3.3 with Reanimated
  - `Play` — scale spring
  - `Pause` — scaleY for bars staggered
  - `Stop` — scale pulse (loop=once)
  - `FastForward` — translateX staggered
  - `Rewind` — translateX negative staggered
  - `Volume` — opacity pulse staggered
  - `Mute` — opacity 0→1 for slash (loop=once)
  - `Microphone` — scale + opacity for rings

- [ ] **Step 4: Device (6 components)** — mirror Phase 3 Task 3.4 with Reanimated
  - `Battery` — translateX for fill line + opacity for bolt
  - `Bluetooth` — opacity for rings staggered
  - `Location` — translateY drop sequence + scale for shadow
  - `CloudSync` — continuous rotation for arc
  - `Camera` — opacity blink for lens + opacity flash
  - `Brightness` — scale for rays

- [ ] **Step 5: Create all 4 `index.ts` files + update root barrel**

```ts
// packages/react-native/src/icons/settings/index.ts
export { Settings } from './Settings'; export { Sliders } from './Sliders';
export { Lock } from './Lock'; export { Unlock } from './Unlock';
export { Key } from './Key'; export { Eye } from './Eye';
export { EyeOff } from './EyeOff'; export { Info } from './Info';
export { Help } from './Help';

// packages/react-native/src/icons/files/index.ts
export { Folder } from './Folder'; export { Document } from './Document';
export { Image } from './Image'; export { Attachment } from './Attachment';
export { Cloud } from './Cloud'; export { Link } from './Link';
export { Archive } from './Archive'; export { Tag } from './Tag';

// packages/react-native/src/icons/media/index.ts
export { Play } from './Play'; export { Pause } from './Pause';
export { Stop } from './Stop'; export { FastForward } from './FastForward';
export { Rewind } from './Rewind'; export { Volume } from './Volume';
export { Mute } from './Mute'; export { Microphone } from './Microphone';

// packages/react-native/src/icons/device/index.ts
export { Battery } from './Battery'; export { Bluetooth } from './Bluetooth';
export { Location } from './Location'; export { CloudSync } from './CloudSync';
export { Camera } from './Camera'; export { Brightness } from './Brightness';
```

Update `packages/react-native/src/index.ts` — add 6 new lines:
```ts
export * from './icons/actions';
export * from './icons/communication';
export * from './icons/settings';
export * from './icons/files';
export * from './icons/media';
export * from './icons/device';
```

- [ ] **Step 6: Build + type check + commit**

```bash
npm run typecheck -w packages/react-native
npm run build:rn
git add packages/react-native/src/
git commit -m "feat(react-native): add 32 components (settings/files/media/device) — Phase 5 complete"
```

---

## Phase 6 — Barrel Updates, Version Bump, Playground, Publish

### Task 6.1 — Version bump + CHANGELOG

- [ ] **Step 1: Bump versions**

In `packages/react/package.json`:
```json
"version": "0.2.0"
```

In `packages/react-native/package.json`:
```json
"version": "0.2.0"
```

- [ ] **Step 2: Update CHANGELOG.md** — prepend:

```markdown
## [0.2.0] — 2026-05-29

### Added

- **Navigation & Structure (10 icons):** `Home`, `Menu`, `KebabMenu`, `MoreHorizontal`, `Back`, `Forward`, `ChevronDown`, `Close`, `Grid`, `Search`
- **Core Actions & Operations (12 icons):** `Add`, `Edit`, `Save`, `Trash`, `Share`, `Download`, `Refresh`, `Sync`, `Copy`, `Pin`, `Bookmark`, `Filter`
- **Communication & Social (10 icons):** `Mail`, `Chat`, `Phone`, `Video`, `User`, `Users`, `ThumbsUp`, `Send`, `Reaction`, `Mention`
- **Settings & Configuration (9 icons):** `Settings`, `Sliders`, `Lock`, `Unlock`, `Key`, `Eye`, `EyeOff`, `Info`, `Help`
- **File & Content Management (8 icons):** `Folder`, `Document`, `Image`, `Attachment`, `Cloud`, `Link`, `Archive`, `Tag`
- **Media Playback (8 icons):** `Play`, `Pause`, `Stop`, `FastForward`, `Rewind`, `Volume`, `Mute`, `Microphone`
- **Device & Hardware (6 icons):** `Battery`, `Bluetooth`, `Location`, `CloudSync`, `Camera`, `Brightness`
- Total library size: 21 → 84 icons
- Zero breaking changes — all v0.1.x imports continue to work unchanged
```

- [ ] **Step 3: Commit**

```bash
git add packages/react/package.json packages/react-native/package.json CHANGELOG.md
git commit -m "chore: bump versions to 0.2.0, update CHANGELOG"
```

---

### Task 6.2 — Update playground (docs/index.html)

- [ ] **Step 1: Add 7 new category sections to the playground**

The `docs/index.html` file already has a working playground structure with dark/light theme, color picker, speed control. Add each new category following the exact same pattern as existing UI/Healthcare sections.

For each new category, add:
1. A category header section
2. Icon tiles using the same `icon-tile` class and inline SVG + CSS animation pattern used for existing icons
3. Wire the tiles to the existing `updateColor`, `updateSpeed` controls

The inline SVGs in the playground use CSS class-based animations identical to the React package components, so copy the keyframes from the React components directly.

- [ ] **Step 2: Verify playground**

```bash
open docs/index.html
```

Visually verify all 84 icons render and animate. Check dark/light toggle. Check color picker. Check speed control.

- [ ] **Step 3: Commit**

```bash
git add docs/index.html
git commit -m "docs: add 63 new icons to playground (v0.2.0)"
```

---

### Task 6.3 — Full build + smoke test + publish

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: both `packages/react/dist/` and `packages/react-native/dist/` rebuild cleanly.

- [ ] **Step 2: Smoke test exports**

```bash
node -e "const m = require('./packages/react/dist/index.js'); console.log(Object.keys(m).length + ' exports'); console.log(Object.keys(m).slice(0,10))"
```
Expected: 84+ exports. First items should include existing icons + new ones.

```bash
node -e "const m = require('./packages/react-native/dist/index.js'); console.log(Object.keys(m).length + ' exports')"
```
Expected: same count.

- [ ] **Step 3: Publish**

```bash
npm run publish:web
npm run publish:rn
```

- [ ] **Step 4: Push to GitHub**

```bash
git push
```

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: @animicons v0.2.0 — 63 new icons across 7 categories"
git push
```

---

## Verification Checklist

After all phases complete:

- [ ] `npm run typecheck` passes with 0 errors
- [ ] `npm run build` produces dist in both packages
- [ ] `node -e "require('./packages/react/dist/index.js')"` lists 84+ named exports
- [ ] `packages/react/dist/index.d.ts` includes all new icon names
- [ ] `packages/react-native/dist/index.js` matches same count
- [ ] `docs/index.html` shows all 7 categories with working animations
- [ ] `npm view @animicons/react version` shows `0.2.0`
- [ ] `npm view @animicons/react-native version` shows `0.2.0`
- [ ] `CHANGELOG.md` has `[0.2.0]` entry
- [ ] GitHub is up to date
