# @animicons — Design Specification

**Date:** 2026-05-29  
**Author:** Prakash  
**Status:** Approved  

---

## 1. Overview

`@animicons` is a cross-platform animated SVG icon library published as two separate npm packages:

- **`@animicons/react`** — for React web applications
- **`@animicons/react-native`** — for React Native (iOS & Android) applications

Both packages expose an identical component API. The only difference for the developer is the import path and the peer dependencies they install. Animations are powered by CSS keyframes on web and `react-native-reanimated` on mobile — both targeting 60fps.

The library is tree-shakeable, fully typed with TypeScript, and ships 21 animated SVG icons in v1.

---

## 2. Repository Structure

One GitHub repository, two published npm packages.

```
animicons/
├── packages/
│   ├── shared/                    ← internal only, never published to npm
│   │   └── src/
│   │       ├── types/
│   │       │   └── IconProps.ts   ← shared prop interface & AnimationSpeed type
│   │       ├── tokens/
│   │       │   └── timing.ts      ← duration multipliers & easing constants
│   │       └── paths/
│   │           ├── ui/            ← SVG path data for 8 UI icons
│   │           └── healthcare/    ← SVG path data for 13 healthcare icons
│   ├── react/                     → published as @animicons/react
│   │   ├── src/
│   │   │   ├── icons/
│   │   │   │   ├── ui/            ← CSS keyframe animated SVG components
│   │   │   │   └── healthcare/
│   │   │   └── index.ts           ← all named exports
│   │   ├── tsup.config.ts
│   │   └── package.json
│   └── react-native/              → published as @animicons/react-native
│       ├── src/
│       │   ├── icons/
│       │   │   ├── ui/            ← Reanimated animated RN components
│       │   │   └── healthcare/
│       │   └── index.ts           ← all named exports
│       ├── tsup.config.ts
│       └── package.json
├── docs/
├── package.json                   ← npm workspaces root
└── tsconfig.json
```

---

## 3. Architecture

### Shared layer (internal)

The `shared` package is a workspace-internal package — never published. It provides:

- **`IconProps` interface** — single source of truth for all prop definitions
- **`timing.ts`** — speed multiplier tokens and easing reference constants
- **`paths/`** — SVG `d=` strings, viewBox dimensions, stroke widths per icon

Both `@animicons/react` and `@animicons/react-native` depend on `shared` at build time. No shared code is bundled into the published output — each package is fully self-contained.

### @animicons/react

- Renders SVG via `react-native-svg` web adapter
- Animates via CSS keyframes injected as `<style>` tags per component
- No JavaScript animation runtime — pure CSS, zero overhead
- Peer deps: `react ^18.0.0`, `react-native-svg ^14.0.0`

### @animicons/react-native

- Renders SVG via `react-native-svg`
- Animates via `react-native-reanimated` on the UI thread (60fps, no JS bridge)
- Peer deps: `react ^18.0.0`, `react-native ^0.72.0`, `react-native-svg ^14.0.0`, `react-native-reanimated ^3.0.0`

---

## 4. Component API

All icon components share a single prop interface. Every prop is optional with sensible defaults.

```ts
// packages/shared/src/types/IconProps.ts

export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export interface IconProps {
  size?:            number;          // default 48 — width & height in dp/px
  color?:           string;          // hex or rgba — primary stroke/fill color
  secondaryColor?:  string;          // bg / glow color, auto-derived if omitted
  autoPlay?:        boolean;         // default true — start animation on mount
  loop?:            boolean;         // default true — repeat indefinitely
  speed?:           AnimationSpeed;  // default 'normal'
  style?:           ViewStyle;       // container margin/position etc.
  onAnimationEnd?:  () => void;      // fires at end of each animation cycle
}
```

Every icon component is typed as `React.FC<IconProps>`.

### Speed → Duration mapping

| Token         | slow (2×) | normal (1×) | fast (0.5×) |
|---------------|-----------|-------------|-------------|
| Short         | 800ms     | 400ms       | 200ms       |
| Medium        | 2000ms    | 1000ms      | 500ms       |
| Long          | 4000ms    | 2000ms      | 1000ms      |
| Stagger delay | 600ms     | 300ms       | 150ms       |

### Usage

```tsx
// Web
import { ECG, Brain, Loader } from '@animicons/react'

// React Native
import { ECG, Brain, Loader } from '@animicons/react-native'

// Identical usage for both
<ECG size={48} color="#f43f5e" />
<Brain size={40} speed="slow" loop={false} onAnimationEnd={handleEnd} />
<Loader size={32} color="#3b82f6" />

// Type export
import type { IconProps } from '@animicons/react'
import type { IconProps } from '@animicons/react-native'
```

---

## 5. Icon Catalog — v1 (21 icons)

### 5.1 UI / System (8 icons)

| Export    | Description          | Animation                              | Duration | Easing      | Loop     |
|-----------|----------------------|----------------------------------------|----------|-------------|----------|
| `Pulse`   | Live Pulse           | Expanding rings from center            | 1.8s     | ease-out    | infinite |
| `Check`   | Success Check        | Circle draws, checkmark strokes in     | 0.8s     | ease        | once     |
| `Loader`  | Loader               | Arc rotates 360° continuously          | 1.0s     | linear      | infinite |
| `Upload`  | Upload               | Arrow bounces up, progress bar fills   | 1.2s+2s  | ease-in-out | infinite |
| `Wifi`    | Wifi Signal          | 3 arcs fade in sequentially            | 1.6s     | ease        | infinite |
| `Bell`    | Notification Bell    | Bell swings, badge pops                | 2.0s     | ease-in-out | infinite |
| `Star`    | Favorite Star        | Fill + sparkle burst on tap            | 0.4s     | ease        | on-tap   |
| `Heart`   | Heartbeat            | Double pump with glow halo             | 1.2s     | ease-in-out | infinite |

### 5.2 Healthcare (13 icons)

| Export        | Description       | Animation                              | Duration | Easing      | Loop              |
|---------------|-------------------|----------------------------------------|----------|-------------|-------------------|
| `ECG`         | ECG Monitor       | Line draws left→right, fades, repeats  | 2.0s     | ease-in-out | infinite          |
| `HeartRate`   | Heart Rate        | Pump with radial glow pulse            | 1.2s     | ease-in-out | infinite          |
| `Lungs`       | Breathing Lungs   | Both lobes expand/contract             | 3.0s     | ease-in-out | infinite          |
| `Pill`        | Medication Pill   | Capsule floats up/down with shine      | 2.0s     | ease-in-out | infinite          |
| `Thermometer` | Thermometer       | Mercury rises, body shakes at peak     | 3.0s     | ease-in-out | infinite          |
| `DNA`         | DNA Helix         | Nodes scroll vertically                | 1.5s     | linear      | infinite alternate|
| `Syringe`     | Vaccine Syringe   | Push in, liquid depletes, drop falls   | 2.5s     | ease-in-out | infinite          |
| `Brain`       | Brain Neurons     | 3 neurons fire in sequence + glow      | 2.0s     | ease-in-out | infinite          |
| `BloodDrop`   | Blood Drop        | Drop fills/deflates + ripple rings     | 2.0s     | ease-in-out | infinite          |
| `Steps`       | Activity Steps    | Footprints light up one by one         | 0.5s ea  | ease        | infinite          |
| `Sleep`       | Sleep Mode        | Moon glows, stars twinkle, Zs float    | 2.5s     | ease-in-out | infinite          |
| `Oxygen`      | SpO2 Oxygen       | Electron orbits O2 molecule            | 3.0s     | linear      | infinite          |
| `Medkit`      | Med Kit           | Kit bounces, cross pulses              | 2.0s     | ease-in-out | infinite          |

### 5.3 Finance (v2 — not in scope)

Reserved for a future release. No icons implemented in v1.

---

## 6. Animation Patterns

All icons use one of three Reanimated patterns (RN) or equivalent CSS keyframe patterns (web).

### Pattern A — Continuous loop
```ts
const progress = useSharedValue(0);
useEffect(() => {
  progress.value = withRepeat(withTiming(1, { duration, easing }), -1, true);
}, []);
```

### Pattern B — One-shot on mount or trigger
```ts
const opacity = useSharedValue(0);
useEffect(() => {
  opacity.value = withSequence(
    withTiming(1, { duration }),
    withDelay(400, withTiming(0, { duration }))
  );
}, [trigger]);
```

### Pattern C — Staggered sequence
```ts
const delays = [0, 300, 600]; // adjusted by speed multiplier
nodes.forEach((node, i) => {
  node.value = withDelay(delays[i], withRepeat(withTiming(1, { duration }), -1, true));
});
```

### Easing reference

| Easing      | Reanimated                        | CSS equivalent          | Best for                        |
|-------------|-----------------------------------|-------------------------|---------------------------------|
| ease-in-out | `Easing.inOut(Easing.ease)`       | `ease-in-out`           | Loops, breathing, float effects |
| ease-out    | `Easing.out(Easing.ease)`         | `ease-out`              | Ping rings, fade-out trails     |
| linear      | `Easing.linear`                   | `linear`                | Spinners, scrolls, orbits       |
| spring-like | `Easing.out(Easing.back(2))`      | `cubic-bezier(...)`     | Pop / bounce on tap             |

---

## 7. Build Configuration

### tsup (both packages share same config)

```ts
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry:     ['src/index.ts'],
  format:    ['cjs', 'esm'],
  dts:       true,
  clean:     true,
  treeshake: true,
  external: [
    'react', 'react-native',
    'react-native-svg',
    'react-native-reanimated',
  ],
});
```

### package.json key fields (both packages)

```json
{
  "main":    "dist/index.js",
  "module":  "dist/index.esm.js",
  "types":   "dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import":  "./dist/index.esm.js",
      "types":   "./dist/index.d.ts"
    }
  },
  "sideEffects": false,
  "files": ["dist"]
}
```

### Root workspace scripts

```json
{
  "scripts": {
    "build":       "npm run build --workspaces",
    "build:web":   "npm run build -w packages/react",
    "build:rn":    "npm run build -w packages/react-native",
    "typecheck":   "npm run typecheck --workspaces",
    "publish:web": "npm publish -w packages/react",
    "publish:rn":  "npm publish -w packages/react-native"
  }
}
```

---

## 8. Peer Dependencies

### @animicons/react
| Package          | Version   | Purpose                        |
|------------------|-----------|--------------------------------|
| `react`          | ^18.0.0   | React peer                     |
| `react-native-svg` | ^14.0.0 | SVG rendering on web           |

### @animicons/react-native
| Package                   | Version   | Purpose                            |
|---------------------------|-----------|------------------------------------|
| `react`                   | ^18.0.0   | React peer                         |
| `react-native`            | ^0.72.0   | RN peer                            |
| `react-native-svg`        | ^14.0.0   | SVG rendering on iOS/Android       |
| `react-native-reanimated` | ^3.0.0    | 60fps UI-thread animations         |

---

## 9. Installation

### Web (React)
```bash
npm install @animicons/react
npm install react-native-svg
```

### React Native
```bash
npm install @animicons/react-native
npm install react-native-svg react-native-reanimated
```

For Expo managed workflow:
```bash
npx expo install react-native-svg react-native-reanimated
```

Add Reanimated Babel plugin to `babel.config.js`:
```js
plugins: ['react-native-reanimated/plugin']
```

---

## 10. Release Roadmap

| Version | Scope                                                              |
|---------|--------------------------------------------------------------------|
| v0.1    | 21 icons, TypeScript, `@animicons/react` + `@animicons/react-native`, npm publish |
| v0.2    | Storybook docs, Expo Snack demos, animated README GIFs             |
| v0.3    | Dark mode tokens, size presets (xs/sm/md/lg/xl)                    |
| v0.4    | `accessibilityLabel`, `reduceMotion` support, focus rings          |
| v1.0    | 50+ icons, Finance category, Figma component kit                   |

---

## 11. Out of Scope (v1)

- Finance icon category
- Storybook setup
- Dark mode / theming tokens
- Accessibility props (`accessibilityLabel`, `reduceMotion`)
- Icon builder CLI
- Custom animation hooks
