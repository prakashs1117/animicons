# @animicons v0.2 — Icon Catalog Expansion Design Specification

**Date:** 2026-05-29
**Author:** Prakash
**Status:** Approved
**Version bump:** 0.1.1 → 0.2.0

---

## 1. Overview

Add 63 new animated SVG icons across 7 categories to `@animicons/react` and `@animicons/react-native`. This doubles the library's size from 21 to 84 icons.

All new icons follow the exact same patterns established in v0.1:
- SVG path data in `packages/shared/src/paths/<category>/`
- CSS keyframe components in `packages/react/src/icons/<category>/`
- Reanimated components in `packages/react-native/src/icons/<category>/`
- Same `IconProps` interface — all props optional, fully backwards-compatible
- Barrel exports only ever add lines — no existing exports removed

---

## 2. New Folder Structure

```
packages/shared/src/paths/
  ui/              ← 10 new files added to existing folder
  actions/         ← NEW — 12 files
  communication/   ← NEW — 10 files
  settings/        ← NEW — 9 files
  files/           ← NEW — 8 files
  media/           ← NEW — 8 files
  device/          ← NEW — 6 files

packages/react/src/icons/
  ui/              ← 10 new components
  actions/         ← NEW — 12 components + index.ts
  communication/   ← NEW — 10 components + index.ts
  settings/        ← NEW — 9 components + index.ts
  files/           ← NEW — 8 components + index.ts
  media/           ← NEW — 8 components + index.ts
  device/          ← NEW — 6 components + index.ts

packages/react-native/src/icons/
  (mirrors react structure exactly)
```

Root `packages/react/src/index.ts` and `packages/react-native/src/index.ts` get 6 new `export *` lines each.

---

## 3. Icon Catalog

### 3.1 Navigation & Structure (10 icons) — added to existing `ui/` folder

| Export | Description | Animation | Duration | Loop |
|--------|-------------|-----------|----------|------|
| `Home` | House shape | Bounces up/down gently | medium | infinite |
| `Menu` | 3 horizontal lines → X morph | Lines morph to X and back | long | infinite |
| `KebabMenu` | 3 vertical dots | Dots pulse staggered (opacity 0.3→1) | medium | infinite |
| `MoreHorizontal` | 3 horizontal dots | Dots pulse staggered (opacity 0.3→1) | medium | infinite |
| `Back` | Left arrow ← | Arrow slides left then springs back | medium | infinite |
| `Forward` | Right arrow → | Arrow slides right then springs back | medium | infinite |
| `ChevronDown` | Down chevron ∨ | Bounces downward | medium | infinite |
| `Close` | ✕ cross | Rotates 45° in with scale pop | short | once |
| `Grid` | 2×2 square grid | Squares pop in staggered (4 delays) | medium | once |
| `Search` | Magnifying glass | Lens pulses scale; handle scans side to side | long | infinite |

### 3.2 Core Actions & Operations (12 icons) — new `actions/` folder

| Export | Description | Animation | Duration | Loop |
|--------|-------------|-----------|----------|------|
| `Add` | Plus / + sign | Scale pop with spring ease | short | tap |
| `Edit` | Pencil drawing | Pencil tip traces a line (stroke-dashoffset) | long | infinite |
| `Save` | Floppy disk | Disk slides down into position, checkmark draws | medium | once |
| `Trash` | Trash can | Body shakes left-right | long | infinite |
| `Share` | 3-node share graph | Center node bursts to 3 satellite nodes | medium | infinite |
| `Download` | Arrow ↓ to baseline | Arrow bounces down; baseline bar fills | medium | infinite |
| `Refresh` | Single circular arrow ↻ | Rotates 360° continuously | medium | infinite |
| `Sync` | Two opposing circular arrows | Both arcs rotate in opposite directions | long | infinite |
| `Copy` | Two overlapping pages | Top page lifts up then stamps down | medium | tap |
| `Pin` | Thumbtack | Drops down with a bounce on impact | short | once |
| `Bookmark` | Ribbon bookmark | Slides down into position | short | tap |
| `Filter` | Funnel shape | Funnel pulses; filter lines slide in from top | long | infinite |

### 3.3 Communication & Social (10 icons) — new `communication/` folder

| Export | Description | Animation | Duration | Loop |
|--------|-------------|-----------|----------|------|
| `Mail` | Envelope | Envelope opens, letter rises out | long | infinite |
| `Chat` | Speech bubble | Bubble pops in, 3 typing dots pulse staggered | long | infinite |
| `Phone` | Phone handset | Handset vibrates left-right (ring) | medium | infinite |
| `Video` | Video camera | Record indicator dot blinks red | long | infinite |
| `User` | Single person silhouette | Subtle scale breathe (1→1.05→1) | long | infinite |
| `Users` | Two person group | Two figures bounce in with stagger | long | infinite |
| `ThumbsUp` | 👍 Thumb | Thumb bounces up with glow burst | short | tap |
| `Send` | Paper plane | Plane launches diagonally, trails and fades | medium | infinite |
| `Reaction` | Smiley face | Mouth curves from neutral to smile | long | infinite |
| `Mention` | @ symbol | Circle draws, @ strokes in (dash-offset) | medium | infinite |

### 3.4 Settings & Configuration (9 icons) — new `settings/` folder

| Export | Description | Animation | Duration | Loop |
|--------|-------------|-----------|----------|------|
| `Settings` | Gear / cogwheel | Rotates 360° continuously | long | infinite |
| `Sliders` | 3 adjustment sliders | Each slider moves independently with stagger | long | infinite |
| `Lock` | Closed padlock | Bounces; shackle lifts briefly | long | infinite |
| `Unlock` | Open padlock | Shackle swings open once | medium | once |
| `Key` | Key shape | Rotates 360° as if inserting into lock | long | infinite |
| `Eye` | Open eye | Eye blinks (lid closes and opens) | long | infinite |
| `EyeOff` | Eye with slash | Slash line draws across the eye | short | once |
| `Info` | ℹ️ circle + i | Circle pulses; i bounces | long | infinite |
| `Help` | ? in circle | ? mark floats up/down gently | long | infinite |

### 3.5 File & Content Management (8 icons) — new `files/` folder

| Export | Description | Animation | Duration | Loop |
|--------|-------------|-----------|----------|------|
| `Folder` | File folder | Folder opens (tab lifts) and closes | long | infinite |
| `Document` | Page with folded corner | 3 text lines draw in staggered | long | infinite |
| `Image` | Mountain landscape | Sun rises, scene brightens (opacity) | long | infinite |
| `Attachment` | Paperclip | Clip rotates/swings | long | infinite |
| `Cloud` | Cloud with upload arrow | Arrow pulses upward into cloud | medium | infinite |
| `Link` | Chain link (two ovals) | Two links slide together and connect | medium | infinite |
| `Archive` | Box with lid | Lid opens, item drops in | long | infinite |
| `Tag` | Price tag | Swings on a string (rotate around top) | long | infinite |

### 3.6 Media Playback (8 icons) — new `media/` folder

| Export | Description | Animation | Duration | Loop |
|--------|-------------|-----------|----------|------|
| `Play` | ▶ Triangle | Scale pop with spring ease | short | tap |
| `Pause` | ⏸ Two vertical bars | Bars shrink and grow rhythmically | medium | infinite |
| `Stop` | ■ Solid square | Square pulses once then holds | short | once |
| `FastForward` | ⏩ Two right chevrons | Chevrons slide rightward in sequence | medium | infinite |
| `Rewind` | ⏪ Two left chevrons | Chevrons slide leftward in sequence | medium | infinite |
| `Volume` | Speaker + 2 sound waves | Waves pulse outward staggered | medium | infinite |
| `Mute` | Speaker + slash | Slash line draws across speaker | short | once |
| `Microphone` | Mic body + stand | Sound rings pulse from mic capsule | medium | infinite |

### 3.7 Device & Hardware Status (6 icons) — new `device/` folder

| Export | Description | Animation | Duration | Loop |
|--------|-------------|-----------|----------|------|
| `Battery` | Battery + charging bolt | Level bar fills from 0→full; bolt flashes | long | infinite |
| `Bluetooth` | Bluetooth symbol | Signal rings pulse from center point | long | infinite |
| `Location` | Map pin / GPS | Pin drops from top with bounce; shadow scales | medium | infinite |
| `CloudSync` | Cloud + circular arrow | Arrow orbits around cloud | long | infinite |
| `Camera` | Camera body + lens | Lens blinks (aperture); flash burst on cycle | long | infinite |
| `Brightness` | Sun + 8 rays | Rays extend and retract rhythmically | long | infinite |

---

## 4. Animation Patterns Reference

All animations use the existing `getAnimDuration(speed)` tokens:

| Token | slow | normal | fast |
|-------|------|--------|------|
| `d.short` | 800ms | 400ms | 200ms |
| `d.medium` | 2000ms | 1000ms | 500ms |
| `d.long` | 4000ms | 2000ms | 1000ms |
| `d.stagger` | 600ms | 300ms | 150ms |

All animations use `EASING_CSS` tokens from `@animicons/shared`:
- Continuous loops → `easeInOut`
- Spin/orbit → `linear`
- Pop/spring → `spring`
- Slide in → `easeOut`

---

## 5. Component Pattern (identical to v0.1)

### Shared path file (`packages/shared/src/paths/<category>/<Name>.ts`)
```ts
export const HomePaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2.5,
  house: 'M8 24 L24 8 L40 24 L40 40 L8 40 Z',
  door: 'M18 40 L18 30 L30 30 L30 40',
  roof: 'M24 8 L24 4',
} as const;
```

### React component (`packages/react/src/icons/<category>/<Name>.tsx`)
```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { HomePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Home: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal',
  onAnimationEnd, style, ...colorProps
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
        }
      `}</style>
      <Svg width={size} height={size} viewBox={HomePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-home-body-${uid}` } as any)}
          d={HomePaths.house} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} strokeLinejoin="round" opacity={s.opacity} />
        <Path d={HomePaths.door} stroke={s.stroke} strokeWidth={s.strokeWidth}
          strokeLinejoin="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

### React Native component (`packages/react-native/src/icons/<category>/<Name>.tsx`)
Uses `useSharedValue` + `useAnimatedStyle` / `useAnimatedProps` + `withRepeat(withTiming(...))` — identical to v0.1 pattern. `onAnimationEnd` fired via `runOnJS`.

---

## 6. Exports & Barrel Updates

### `packages/shared/src/index.ts` — add 6 new lines:
```ts
export * from './paths/actions';
export * from './paths/communication';
export * from './paths/settings';
export * from './paths/files';
export * from './paths/media';
export * from './paths/device';
```
(existing `export * from './paths/ui'` kept — 10 new UI icons added to that barrel)

### `packages/react/src/index.ts` — add 6 new lines:
```ts
export * from './icons/actions';
export * from './icons/communication';
export * from './icons/settings';
export * from './icons/files';
export * from './icons/media';
export * from './icons/device';
```

### `packages/react-native/src/index.ts` — same 6 lines added.

---

## 7. Version & Release

- Bump `packages/react/package.json` version: `0.1.1` → `0.2.0`
- Bump `packages/react-native/package.json` version: `0.1.1` → `0.2.0`
- Update `CHANGELOG.md` with v0.2.0 entry listing all 63 new icons
- Update `docs/index.html` (playground) to include all new icons and categories
- Publish: `npm run publish:web && npm run publish:rn`

---

## 8. Backwards Compatibility Guarantee

- Zero existing exports removed
- Zero existing prop names changed
- All new exports are additive
- Consumers on v0.1.x who upgrade to v0.2.0 get 63 new icons with no code changes required

---

## 9. Out of Scope (future versions)

- Finance icons (v1.0 as per original roadmap)
- Accessibility props (`accessibilityLabel`, `reduceMotion`)
- Dark mode tokens / theming
- Custom animation hooks
- Icon builder CLI
