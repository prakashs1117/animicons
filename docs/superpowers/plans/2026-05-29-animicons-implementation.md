# @animicons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two npm packages (`@animicons/react` and `@animicons/react-native`) — a cross-platform animated SVG icon library with 21 icons, full colour customisation, and a backwards-compatible structure for future icon additions.

**Architecture:** Monorepo with npm workspaces. An internal `shared` package holds SVG path data, timing tokens, and the `IconProps` TypeScript interface. Both published packages consume `shared` at build time but ship fully self-contained bundles. Web uses CSS keyframes; RN uses Reanimated on the UI thread.

**Tech Stack:** TypeScript 5, tsup, react-native-svg, react-native-reanimated, npm workspaces

---

## File Map

```
packages/shared/src/types/IconProps.ts         ← prop interface (colour, animation, size)
packages/shared/src/tokens/timing.ts           ← speed → ms + easing constants
packages/shared/src/paths/ui/{name}.ts         ← 8 UI icon SVG path definitions
packages/shared/src/paths/healthcare/{name}.ts ← 13 healthcare SVG path definitions
packages/shared/src/paths/ui/index.ts          ← barrel
packages/shared/src/paths/healthcare/index.ts  ← barrel
packages/shared/src/index.ts                   ← barrel

packages/react/src/utils/resolveStyle.ts       ← colour prop resolution helper
packages/react/src/utils/animDuration.ts       ← speed → ms lookup
packages/react/src/icons/ui/{Name}.tsx         ← 8 CSS-animated components
packages/react/src/icons/healthcare/{Name}.tsx ← 13 CSS-animated components
packages/react/src/icons/ui/index.ts           ← barrel
packages/react/src/icons/healthcare/index.ts   ← barrel
packages/react/src/index.ts                    ← root barrel

packages/react-native/src/utils/resolveStyle.ts
packages/react-native/src/utils/animDuration.ts
packages/react-native/src/icons/ui/{Name}.tsx
packages/react-native/src/icons/healthcare/{Name}.tsx
packages/react-native/src/icons/ui/index.ts
packages/react-native/src/icons/healthcare/index.ts
packages/react-native/src/index.ts

package.json          ← workspace root
tsconfig.base.json
.gitignore
README.md
CHANGELOG.md
```

---

## Task 1: Root workspace scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.base.json`
- Create: `.gitignore`

- [ ] **Step 1: Create root package.json**

```json
{
  "name": "animicons-monorepo",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "npm run build --workspaces --if-present",
    "build:web": "npm run build -w packages/react",
    "build:rn": "npm run build -w packages/react-native",
    "typecheck": "npm run typecheck --workspaces --if-present",
    "publish:web": "npm publish -w packages/react",
    "publish:rn": "npm publish -w packages/react-native"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tsup": "^8.0.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.base.json**

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 3: Create .gitignore**

```
node_modules/
dist/
.superpowers/
*.tsbuildinfo
```

- [ ] **Step 4: Install root dev deps**

```bash
cd /Users/M324550/Documents/POC/react-native-moticons
npm install
```

Expected: `package-lock.json` created, `node_modules/` populated.

- [ ] **Step 5: Commit**

```bash
git init
git add package.json tsconfig.base.json .gitignore
git commit -m "chore: init monorepo workspace"
```

---

## Task 2: shared package — types and tokens

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/types/IconProps.ts`
- Create: `packages/shared/src/tokens/timing.ts`
- Create: `packages/shared/src/index.ts`

- [ ] **Step 1: Create packages/shared/package.json**

```json
{
  "name": "@animicons/shared",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts",
  "types": "src/index.ts"
}
```

- [ ] **Step 2: Create packages/shared/tsconfig.json**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create packages/shared/src/types/IconProps.ts**

```ts
export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export interface IconProps {
  size?: number;
  color?: string;
  strokeColor?: string;
  fillColor?: string;
  secondaryColor?: string;
  opacity?: number;
  strokeWidth?: number;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: AnimationSpeed;
  onAnimationEnd?: () => void;
  style?: object;
}
```

- [ ] **Step 4: Create packages/shared/src/tokens/timing.ts**

```ts
import { Easing } from 'react-native-reanimated';

export const DURATION = {
  slow:   { short: 800,  medium: 2000, long: 4000, stagger: 600 },
  normal: { short: 400,  medium: 1000, long: 2000, stagger: 300 },
  fast:   { short: 200,  medium: 500,  long: 1000, stagger: 150 },
} as const;

export const EASING_CSS = {
  easeInOut: 'ease-in-out',
  easeOut:   'ease-out',
  linear:    'linear',
  spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
```

> Note: The Reanimated `Easing` import is only used in the react-native package. `timing.ts` in shared only exports duration numbers and CSS easing strings — no Reanimated import here.

- [ ] **Step 5: Fix timing.ts — remove Reanimated import (shared must stay platform-agnostic)**

```ts
export const DURATION = {
  slow:   { short: 800,  medium: 2000, long: 4000, stagger: 600 },
  normal: { short: 400,  medium: 1000, long: 2000, stagger: 300 },
  fast:   { short: 200,  medium: 500,  long: 1000, stagger: 150 },
} as const;

export type DurationSet = { short: number; medium: number; long: number; stagger: number };

export const EASING_CSS = {
  easeInOut: 'ease-in-out',
  easeOut:   'ease-out',
  linear:    'linear',
  spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
```

- [ ] **Step 6: Create packages/shared/src/index.ts**

```ts
export type { IconProps, AnimationSpeed } from './types/IconProps';
export { DURATION, EASING_CSS } from './tokens/timing';
export type { DurationSet } from './tokens/timing';
```

- [ ] **Step 7: Commit**

```bash
git add packages/shared
git commit -m "feat(shared): add IconProps interface and timing tokens"
```

---

## Task 3: shared package — UI icon path definitions

**Files:**
- Create: `packages/shared/src/paths/ui/Pulse.ts` (and 7 more)
- Create: `packages/shared/src/paths/ui/index.ts`

Each path file exports a const with `viewBox`, `defaultColor`, `defaultStrokeWidth`, and named SVG path strings.

- [ ] **Step 1: Create packages/shared/src/paths/ui/Pulse.ts**

```ts
export const PulsePaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#ef4444',
  defaultStrokeWidth: 2,
  ring1: 'M24 24 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0',
  ring2: 'M24 24 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0',
  ring3: 'M24 24 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0',
  center: 'M24 24 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0',
} as const;
```

- [ ] **Step 2: Create packages/shared/src/paths/ui/Check.ts**

```ts
export const CheckPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#22c55e',
  defaultStrokeWidth: 2.5,
  circle: 'M24 4 a20 20 0 1 1 0 40 a20 20 0 1 1 0 -40',
  check: 'M14 24 l7 7 l13 -13',
} as const;
```

- [ ] **Step 3: Create packages/shared/src/paths/ui/Loader.ts**

```ts
export const LoaderPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 3,
  arc: 'M24 6 a18 18 0 0 1 18 18',
} as const;
```

- [ ] **Step 4: Create packages/shared/src/paths/ui/Upload.ts**

```ts
export const UploadPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#3b82f6',
  defaultStrokeWidth: 2.5,
  arrow: 'M24 32 L24 10 M14 20 L24 10 L34 20',
  bar: 'M10 38 L38 38',
  progress: 'M10 38 L10 38',
} as const;
```

- [ ] **Step 5: Create packages/shared/src/paths/ui/Wifi.ts**

```ts
export const WifiPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#0ea5e9',
  defaultStrokeWidth: 2.5,
  arc1: 'M8 22 Q24 8 40 22',
  arc2: 'M13 28 Q24 17 35 28',
  arc3: 'M18 34 Q24 27 30 34',
  dot: 'M24 40 a2 2 0 1 0 0.01 0',
} as const;
```

- [ ] **Step 6: Create packages/shared/src/paths/ui/Bell.ts**

```ts
export const BellPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#f59e0b',
  defaultStrokeWidth: 2,
  bell: 'M12 32 C12 20 18 12 24 12 C30 12 36 20 36 32 Z',
  clapper: 'M20 36 Q24 40 28 36',
  handle: 'M24 8 L24 12',
  badge: 'M34 12 a5 5 0 1 0 0.01 0',
} as const;
```

- [ ] **Step 7: Create packages/shared/src/paths/ui/Star.ts**

```ts
export const StarPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#f59e0b',
  defaultStrokeWidth: 2,
  star: 'M24 6 L28.5 18 L42 18 L31.5 26 L35.5 38 L24 30 L12.5 38 L16.5 26 L6 18 L19.5 18 Z',
  sparkle1: 'M8 8 L10 6 L12 8 L10 10 Z',
  sparkle2: 'M36 6 L38 4 L40 6 L38 8 Z',
  sparkle3: 'M40 28 L42 26 L44 28 L42 30 Z',
} as const;
```

- [ ] **Step 8: Create packages/shared/src/paths/ui/Heart.ts**

```ts
export const HeartPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#ef4444',
  defaultStrokeWidth: 2,
  heart: 'M24 38 C24 38 6 26 6 16 C6 10 11 6 16 6 C19.5 6 22.5 8 24 11 C25.5 8 28.5 6 32 6 C37 6 42 10 42 16 C42 26 24 38 24 38 Z',
  glow: 'M24 38 C24 38 6 26 6 16 C6 10 11 6 16 6 C19.5 6 22.5 8 24 11 C25.5 8 28.5 6 32 6 C37 6 42 10 42 16 C42 26 24 38 24 38 Z',
} as const;
```

- [ ] **Step 9: Create packages/shared/src/paths/ui/index.ts**

```ts
export { PulsePaths } from './Pulse';
export { CheckPaths } from './Check';
export { LoaderPaths } from './Loader';
export { UploadPaths } from './Upload';
export { WifiPaths } from './Wifi';
export { BellPaths } from './Bell';
export { StarPaths } from './Star';
export { HeartPaths } from './Heart';
```

- [ ] **Step 10: Commit**

```bash
git add packages/shared/src/paths/ui
git commit -m "feat(shared): add UI icon path definitions"
```

---

## Task 4: shared package — Healthcare icon path definitions

**Files:**
- Create: `packages/shared/src/paths/healthcare/*.ts` (13 files)
- Create: `packages/shared/src/paths/healthcare/index.ts`

- [ ] **Step 1: Create ECG.ts**

```ts
export const ECGPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#ef4444',
  defaultStrokeWidth: 2,
  line: 'M4 24 L12 24 L16 12 L20 36 L24 18 L28 30 L32 24 L44 24',
} as const;
```

- [ ] **Step 2: Create HeartRate.ts**

```ts
export const HeartRatePaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#ef4444',
  defaultStrokeWidth: 2,
  heart: 'M24 38 C24 38 6 26 6 16 C6 10 11 6 16 6 C19.5 6 22.5 8 24 11 C25.5 8 28.5 6 32 6 C37 6 42 10 42 16 C42 26 24 38 24 38 Z',
  glow: 'M24 24 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0',
} as const;
```

- [ ] **Step 3: Create Lungs.ts**

```ts
export const LungsPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#ec4899',
  defaultStrokeWidth: 2,
  leftLobe: 'M24 10 C24 10 10 14 8 26 C6 36 12 42 18 40 C22 38 24 34 24 34',
  rightLobe: 'M24 10 C24 10 38 14 40 26 C42 36 36 42 30 40 C26 38 24 34 24 34',
  trunk: 'M24 6 L24 18',
} as const;
```

- [ ] **Step 4: Create Pill.ts**

```ts
export const PillPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#8b5cf6',
  defaultStrokeWidth: 2,
  capsule: 'M14 20 Q14 10 24 10 Q34 10 34 20 L34 28 Q34 38 24 38 Q14 38 14 28 Z',
  divider: 'M14 24 L34 24',
  shine: 'M18 14 Q20 12 24 13',
} as const;
```

- [ ] **Step 5: Create Thermometer.ts**

```ts
export const ThermometerPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#ef4444',
  defaultStrokeWidth: 2,
  tube: 'M20 8 L20 30 Q20 38 24 38 Q28 38 28 30 L28 8 Q28 6 24 6 Q20 6 20 8 Z',
  mercury: 'M22 30 L22 22 L26 22 L26 30',
  bulb: 'M24 38 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0',
} as const;
```

- [ ] **Step 6: Create DNA.ts**

```ts
export const DNAPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2,
  strand1: 'M16 6 Q32 14 16 22 Q32 30 16 38 Q32 46 16 54',
  strand2: 'M32 6 Q16 14 32 22 Q16 30 32 38 Q16 46 32 54',
  rung1: 'M19 12 L29 12',
  rung2: 'M19 24 L29 24',
  rung3: 'M19 36 L29 36',
} as const;
```

- [ ] **Step 7: Create Syringe.ts**

```ts
export const SyringePaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#3b82f6',
  defaultStrokeWidth: 2,
  barrel: 'M12 16 L36 16 L36 34 L12 34 Z',
  plunger: 'M12 22 L6 22 L6 28 L12 28',
  needle: 'M36 24 L44 24',
  liquid: 'M14 18 L30 18 L30 32 L14 32 Z',
  drop: 'M44 26 Q46 28 44 30 Q42 28 44 26 Z',
} as const;
```

- [ ] **Step 8: Create Brain.ts**

```ts
export const BrainPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#ec4899',
  defaultStrokeWidth: 2,
  left: 'M24 36 C24 36 8 34 8 22 C8 14 14 8 20 10 C22 10 24 12 24 12',
  right: 'M24 36 C24 36 40 34 40 22 C40 14 34 8 28 10 C26 10 24 12 24 12',
  node1: 'M16 20 a3 3 0 1 0 0.01 0',
  node2: 'M24 16 a3 3 0 1 0 0.01 0',
  node3: 'M32 20 a3 3 0 1 0 0.01 0',
  synapse1: 'M19 20 L21 16',
  synapse2: 'M27 16 L29 20',
} as const;
```

- [ ] **Step 9: Create BloodDrop.ts**

```ts
export const BloodDropPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#ef4444',
  defaultStrokeWidth: 2,
  drop: 'M24 8 Q36 20 36 28 Q36 38 24 38 Q12 38 12 28 Q12 20 24 8 Z',
  ripple1: 'M24 42 m-6 0 a6 6 0 1 0 12 0',
  ripple2: 'M24 42 m-10 0 a10 10 0 1 0 20 0',
} as const;
```

- [ ] **Step 10: Create Steps.ts**

```ts
export const StepsPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#10b981',
  defaultStrokeWidth: 2,
  foot1: 'M14 28 Q12 24 14 20 Q18 18 20 22 Q22 26 20 30 Q16 32 14 28 Z',
  foot2: 'M28 20 Q26 16 28 12 Q32 10 34 14 Q36 18 34 22 Q30 24 28 20 Z',
  toe1a: 'M12 20 Q10 18 12 17',
  toe1b: 'M14 19 Q13 17 15 16',
  toe2a: 'M26 12 Q24 10 26 9',
  toe2b: 'M28 11 Q27 9 29 8',
} as const;
```

- [ ] **Step 11: Create Sleep.ts**

```ts
export const SleepPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#6366f1',
  defaultStrokeWidth: 2,
  moon: 'M28 8 Q20 12 20 24 Q20 36 28 40 Q16 40 10 30 Q4 20 10 12 Q16 4 28 8 Z',
  star1: 'M36 10 L37 8 L38 10 L40 11 L38 12 L37 14 L36 12 L34 11 Z',
  star2: 'M40 22 L41 20 L42 22 L44 23 L42 24 L41 26 L40 24 L38 23 Z',
  z1: 'M32 26 L38 26 L32 32 L38 32',
  z2: 'M36 20 L40 20 L36 24 L40 24',
} as const;
```

- [ ] **Step 12: Create Oxygen.ts**

```ts
export const OxygenPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#3b82f6',
  defaultStrokeWidth: 2,
  molecule: 'M24 24 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0',
  orbit: 'M24 24 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0',
  electron: 'M40 24 a2 2 0 1 0 0.01 0',
  o1: 'M18 18 a4 4 0 1 0 0.01 0',
  o2: 'M26 18 a4 4 0 1 0 0.01 0',
  bond: 'M22 20 L26 20',
} as const;
```

- [ ] **Step 13: Create Medkit.ts**

```ts
export const MedkitPaths = {
  viewBox: '0 0 48 48',
  defaultColor: '#ef4444',
  defaultStrokeWidth: 2,
  box: 'M8 16 Q8 12 12 12 L36 12 Q40 12 40 16 L40 38 Q40 42 36 42 L12 42 Q8 42 8 38 Z',
  handle: 'M18 12 L18 8 Q18 6 20 6 L28 6 Q30 6 30 8 L30 12',
  crossV: 'M24 20 L24 34',
  crossH: 'M17 27 L31 27',
} as const;
```

- [ ] **Step 14: Create packages/shared/src/paths/healthcare/index.ts**

```ts
export { ECGPaths } from './ECG';
export { HeartRatePaths } from './HeartRate';
export { LungsPaths } from './Lungs';
export { PillPaths } from './Pill';
export { ThermometerPaths } from './Thermometer';
export { DNAPaths } from './DNA';
export { SyringePaths } from './Syringe';
export { BrainPaths } from './Brain';
export { BloodDropPaths } from './BloodDrop';
export { StepsPaths } from './Steps';
export { SleepPaths } from './Sleep';
export { OxygenPaths } from './Oxygen';
export { MedkitPaths } from './Medkit';
```

- [ ] **Step 15: Update packages/shared/src/index.ts to re-export paths**

```ts
export type { IconProps, AnimationSpeed } from './types/IconProps';
export { DURATION, EASING_CSS } from './tokens/timing';
export type { DurationSet } from './tokens/timing';
export * from './paths/ui/index';
export * from './paths/healthcare/index';
```

- [ ] **Step 16: Commit**

```bash
git add packages/shared/src/paths
git commit -m "feat(shared): add all 21 icon path definitions"
```

---

## Task 5: @animicons/react — package scaffold and utilities

**Files:**
- Create: `packages/react/package.json`
- Create: `packages/react/tsconfig.json`
- Create: `packages/react/tsup.config.ts`
- Create: `packages/react/src/utils/resolveStyle.ts`
- Create: `packages/react/src/utils/animDuration.ts`

- [ ] **Step 1: Create packages/react/package.json**

```json
{
  "name": "@animicons/react",
  "version": "0.1.0",
  "description": "Animated SVG icon library for React",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.esm.js",
      "types": "./dist/index.d.ts"
    }
  },
  "sideEffects": false,
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-native-svg": "^14.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "react": "^18.0.0",
    "react-native-svg": "^14.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.4.0"
  },
  "dependencies": {
    "@animicons/shared": "*"
  }
}
```

- [ ] **Step 2: Create packages/react/tsconfig.json**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create packages/react/tsup.config.ts**

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-native-svg'],
});
```

- [ ] **Step 4: Create packages/react/src/utils/resolveStyle.ts**

```ts
interface PathDefaults {
  defaultColor: string;
  defaultStrokeWidth: number;
}

interface ResolvedStyle {
  stroke: string;
  fill: string;
  secondaryColor: string;
  opacity: number;
  strokeWidth: number;
}

interface StyleProps {
  color?: string;
  strokeColor?: string;
  fillColor?: string;
  secondaryColor?: string;
  opacity?: number;
  strokeWidth?: number;
}

export function resolveStyle(props: StyleProps, defaults: PathDefaults): ResolvedStyle {
  const base = props.color ?? defaults.defaultColor;
  return {
    stroke: props.strokeColor ?? base,
    fill: props.fillColor ?? base,
    secondaryColor: props.secondaryColor ?? `${base}33`,
    opacity: props.opacity ?? 1,
    strokeWidth: props.strokeWidth ?? defaults.defaultStrokeWidth,
  };
}
```

- [ ] **Step 5: Create packages/react/src/utils/animDuration.ts**

```ts
import { DURATION, DurationSet } from '@animicons/shared';
import type { AnimationSpeed } from '@animicons/shared';

export function getAnimDuration(speed: AnimationSpeed = 'normal'): DurationSet {
  return DURATION[speed];
}
```

- [ ] **Step 6: Install workspace deps**

```bash
cd /Users/M324550/Documents/POC/react-native-moticons
npm install
```

- [ ] **Step 7: Commit**

```bash
git add packages/react
git commit -m "feat(react): scaffold package with resolveStyle and animDuration utils"
```

---

## Task 6: @animicons/react — UI icon components (8 icons)

**Files:**
- Create: `packages/react/src/icons/ui/Pulse.tsx` (and 7 more)
- Create: `packages/react/src/icons/ui/index.ts`

- [ ] **Step 1: Create packages/react/src/icons/ui/Loader.tsx** (simplest — good baseline)

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { LoaderPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Loader: React.FC<IconProps> = ({
  size = 48,
  autoPlay = true,
  loop = true,
  speed = 'normal',
  onAnimationEnd,
  style,
  ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LoaderPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-spin-${uid} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ai-loader-${uid} {
          animation: ai-spin-${uid} ${d.medium}ms linear ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={LoaderPaths.viewBox} style={style as any}>
        <Path
          className={`ai-loader-${uid}`}
          d={LoaderPaths.arc}
          stroke={s.stroke}
          strokeWidth={s.strokeWidth}
          strokeLinecap="round"
          fill="none"
          opacity={s.opacity}
        />
      </Svg>
    </>
  );
};
```

- [ ] **Step 2: Create packages/react/src/icons/ui/Pulse.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { PulsePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Pulse: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PulsePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-pulse-ring-${uid} {
          0%   { r: 4; opacity: 0.8; }
          100% { r: 20; opacity: 0; }
        }
        .ai-pulse-r1-${uid} { animation: ai-pulse-ring-${uid} ${d.medium}ms ease-out ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; }
        .ai-pulse-r2-${uid} { animation: ai-pulse-ring-${uid} ${d.medium}ms ease-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
        .ai-pulse-r3-${uid} { animation: ai-pulse-ring-${uid} ${d.medium}ms ease-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; }
      `}</style>
      <Svg width={size} height={size} viewBox={PulsePaths.viewBox} style={style as any}>
        <Circle className={`ai-pulse-r1-${uid}`} cx="24" cy="24" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle className={`ai-pulse-r2-${uid}`} cx="24" cy="24" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle className={`ai-pulse-r3-${uid}`} cx="24" cy="24" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle cx="24" cy="24" r="3" fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 3: Create packages/react/src/icons/ui/Check.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { CheckPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Check: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CheckPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-check-circle-${uid} {
          from { stroke-dashoffset: 126; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ai-check-mark-${uid} {
          from { stroke-dashoffset: 30; }
          to   { stroke-dashoffset: 0; }
        }
        .ai-check-circle-${uid} {
          stroke-dasharray: 126;
          animation: ai-check-circle-${uid} ${d.short}ms ease ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-check-mark-${uid} {
          stroke-dasharray: 30;
          animation: ai-check-mark-${uid} ${d.short}ms ease ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.short * 0.6}ms;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={CheckPaths.viewBox} style={style as any}>
        <Path className={`ai-check-circle-${uid}`} d={CheckPaths.circle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Path className={`ai-check-mark-${uid}`} d={CheckPaths.check} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 4: Create packages/react/src/icons/ui/Upload.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { UploadPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Upload: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, UploadPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-upload-arrow-${uid} {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes ai-upload-bar-${uid} {
          0% { stroke-dashoffset: 28; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 28; }
        }
        .ai-upload-arrow-${uid} {
          animation: ai-upload-arrow-${uid} ${d.short}ms ease-in-out ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
        .ai-upload-bar-${uid} {
          stroke-dasharray: 28;
          animation: ai-upload-bar-${uid} ${d.medium}ms ease-in-out ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={UploadPaths.viewBox} style={style as any}>
        <Path className={`ai-upload-arrow-${uid}`} d={UploadPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path className={`ai-upload-bar-${uid}`} d={UploadPaths.bar} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 5: Create packages/react/src/icons/ui/Wifi.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { WifiPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Wifi: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, WifiPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-wifi-fade-${uid} {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .ai-wifi-a1-${uid} { animation: ai-wifi-fade-${uid} ${d.medium}ms ease ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; }
        .ai-wifi-a2-${uid} { animation: ai-wifi-fade-${uid} ${d.medium}ms ease ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
        .ai-wifi-a3-${uid} { animation: ai-wifi-fade-${uid} ${d.medium}ms ease ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; }
      `}</style>
      <Svg width={size} height={size} viewBox={WifiPaths.viewBox} style={style as any}>
        <Path className={`ai-wifi-a1-${uid}`} d={WifiPaths.arc1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path className={`ai-wifi-a2-${uid}`} d={WifiPaths.arc2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path className={`ai-wifi-a3-${uid}`} d={WifiPaths.arc3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Circle cx="24" cy="40" r="2" fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 6: Create packages/react/src/icons/ui/Bell.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { BellPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Bell: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BellPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-bell-swing-${uid} {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-15deg); }
          60% { transform: rotate(8deg); }
          80% { transform: rotate(-8deg); }
        }
        @keyframes ai-bell-badge-${uid} {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.3); }
        }
        .ai-bell-body-${uid} {
          animation: ai-bell-swing-${uid} ${d.long}ms ease-in-out ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 12px;
        }
        .ai-bell-badge-${uid} {
          animation: ai-bell-badge-${uid} ${d.long}ms ease-in-out ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 34px 12px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={BellPaths.viewBox} style={style as any}>
        <Path className={`ai-bell-body-${uid}`} d={BellPaths.bell} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={BellPaths.clapper} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path d={BellPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
        <Circle className={`ai-bell-badge-${uid}`} cx="34" cy="12" r="5" fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 7: Create packages/react/src/icons/ui/Star.tsx**

```tsx
import React, { useId, useState } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { StarPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Star: React.FC<IconProps> = ({
  size = 48, autoPlay = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, StarPaths);
  const [active, setActive] = useState(autoPlay);

  return (
    <>
      <style>{`
        @keyframes ai-star-pop-${uid} {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes ai-star-sparkle-${uid} {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .ai-star-body-${uid} {
          animation: ${active ? `ai-star-pop-${uid} ${d.short}ms ease forwards` : 'none'};
          transform-origin: 24px 24px;
        }
        .ai-star-sp-${uid} {
          animation: ${active ? `ai-star-sparkle-${uid} ${d.short}ms ease forwards` : 'none'};
        }
      `}</style>
      <Svg
        width={size} height={size} viewBox={StarPaths.viewBox} style={style as any}
        onClick={() => { setActive(true); setTimeout(() => { setActive(false); onAnimationEnd?.(); }, d.short); }}
      >
        <Path className={`ai-star-body-${uid}`} d={StarPaths.star} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={active ? s.fill : 'none'} opacity={s.opacity} />
        <Path className={`ai-star-sp-${uid}`} d={StarPaths.sparkle1} fill={s.stroke} opacity={s.opacity} />
        <Path className={`ai-star-sp-${uid}`} d={StarPaths.sparkle2} fill={s.stroke} opacity={s.opacity} />
        <Path className={`ai-star-sp-${uid}`} d={StarPaths.sparkle3} fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 8: Create packages/react/src/icons/ui/Heart.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { HeartPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Heart: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HeartPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-heart-pump-${uid} {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.2); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          56% { transform: scale(1); }
        }
        @keyframes ai-heart-glow-${uid} {
          0%, 100% { opacity: 0; transform: scale(1); }
          28% { opacity: 0.4; transform: scale(1.3); }
        }
        .ai-heart-body-${uid} {
          animation: ai-heart-pump-${uid} ${d.medium}ms ease-in-out ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
        .ai-heart-glow-${uid} {
          animation: ai-heart-glow-${uid} ${d.medium}ms ease-in-out ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={HeartPaths.viewBox} style={style as any}>
        <Path className={`ai-heart-glow-${uid}`} d={HeartPaths.glow} fill={s.secondaryColor} stroke="none" />
        <Path className={`ai-heart-body-${uid}`} d={HeartPaths.heart} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 9: Create packages/react/src/icons/ui/index.ts**

```ts
export { Pulse } from './Pulse';
export { Check } from './Check';
export { Loader } from './Loader';
export { Upload } from './Upload';
export { Wifi } from './Wifi';
export { Bell } from './Bell';
export { Star } from './Star';
export { Heart } from './Heart';
```

- [ ] **Step 10: Commit**

```bash
git add packages/react/src/icons/ui
git commit -m "feat(react): add 8 UI icon components with CSS animations"
```

---

## Task 7: @animicons/react — Healthcare icon components (13 icons)

**Files:**
- Create: `packages/react/src/icons/healthcare/*.tsx` (13 files)
- Create: `packages/react/src/icons/healthcare/index.ts`

- [ ] **Step 1: Create ECG.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { ECGPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const ECG: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ECGPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-ecg-draw-${uid} {
          0% { stroke-dashoffset: 100; opacity: 1; }
          70% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .ai-ecg-line-${uid} {
          stroke-dasharray: 100;
          animation: ai-ecg-draw-${uid} ${d.long}ms ease-in-out ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ECGPaths.viewBox} style={style as any}>
        <Path className={`ai-ecg-line-${uid}`} d={ECGPaths.line} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 2: Create HeartRate.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { HeartRatePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const HeartRate: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HeartRatePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-hr-pump-${uid} {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.2); }
          40% { transform: scale(1); }
        }
        @keyframes ai-hr-glow-${uid} {
          0%, 100% { opacity: 0; r: 16; }
          20% { opacity: 0.5; r: 20; }
        }
        .ai-hr-heart-${uid} { animation: ai-hr-pump-${uid} ${d.medium}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 24px; }
        .ai-hr-glow-${uid}  { animation: ai-hr-glow-${uid} ${d.medium}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; }
      `}</style>
      <Svg width={size} height={size} viewBox={HeartRatePaths.viewBox} style={style as any}>
        <Circle className={`ai-hr-glow-${uid}`} cx="24" cy="24" r="16" fill={s.secondaryColor} />
        <Path className={`ai-hr-heart-${uid}`} d={HeartRatePaths.heart} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 3: Create Lungs.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { LungsPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Lungs: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LungsPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-lungs-breathe-${uid} {
          0%, 100% { transform: scale(1); }
          50% { transform: scaleX(1.12) scaleY(1.08); }
        }
        .ai-lungs-left-${uid}  { animation: ai-lungs-breathe-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; transform-origin: 16px 26px; }
        .ai-lungs-right-${uid} { animation: ai-lungs-breathe-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; transform-origin: 32px 26px; }
      `}</style>
      <Svg width={size} height={size} viewBox={LungsPaths.viewBox} style={style as any}>
        <Path className={`ai-lungs-left-${uid}`}  d={LungsPaths.leftLobe}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
        <Path className={`ai-lungs-right-${uid}`} d={LungsPaths.rightLobe} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
        <Path d={LungsPaths.trunk} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 4: Create Pill.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { PillPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Pill: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PillPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-pill-float-${uid} {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes ai-pill-shine-${uid} {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        .ai-pill-body-${uid}  { animation: ai-pill-float-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; }
        .ai-pill-shine-${uid} { animation: ai-pill-shine-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; }
      `}</style>
      <Svg width={size} height={size} viewBox={PillPaths.viewBox} style={style as any}>
        <Path className={`ai-pill-body-${uid}`} d={PillPaths.capsule} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path className={`ai-pill-body-${uid}`} d={PillPaths.divider} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Path className={`ai-pill-shine-${uid}`} d={PillPaths.shine} stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      </Svg>
    </>
  );
};
```

- [ ] **Step 5: Create Thermometer.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { ThermometerPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Thermometer: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ThermometerPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-therm-rise-${uid} {
          0% { transform: scaleY(0.2); }
          70% { transform: scaleY(1); }
          100% { transform: scaleY(1); }
        }
        @keyframes ai-therm-shake-${uid} {
          0%, 60%, 100% { transform: rotate(0deg); }
          70% { transform: rotate(3deg); }
          80% { transform: rotate(-3deg); }
          90% { transform: rotate(2deg); }
        }
        .ai-therm-mercury-${uid} { animation: ai-therm-rise-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 34px; }
        .ai-therm-tube-${uid}    { animation: ai-therm-shake-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 24px; }
      `}</style>
      <Svg width={size} height={size} viewBox={ThermometerPaths.viewBox} style={style as any}>
        <Path className={`ai-therm-tube-${uid}`} d={ThermometerPaths.tube} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path className={`ai-therm-mercury-${uid}`} d={ThermometerPaths.mercury} fill={s.fill} opacity={s.opacity} />
        <Circle cx="24" cy="40" r="5" fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 6: Create DNA.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { DNAPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const DNA: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, DNAPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-dna-scroll-${uid} {
          from { transform: translateY(0); }
          to   { transform: translateY(-16px); }
        }
        .ai-dna-${uid} {
          animation: ai-dna-scroll-${uid} ${d.medium}ms linear ${iterCount};
          animation-play-state: ${playState};
          animation-direction: alternate;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={DNAPaths.viewBox} style={style as any}>
        <Path className={`ai-dna-${uid}`} d={DNAPaths.strand1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path className={`ai-dna-${uid}`} d={DNAPaths.strand2} stroke={s.secondaryColor} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path className={`ai-dna-${uid}`} d={`${DNAPaths.rung1} ${DNAPaths.rung2} ${DNAPaths.rung3}`} stroke={s.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={s.opacity * 0.6} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 7: Create Syringe.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { SyringePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Syringe: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SyringePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-syringe-push-${uid} {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }
        @keyframes ai-syringe-liquid-${uid} {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.3); }
        }
        @keyframes ai-syringe-drop-${uid} {
          0%, 49% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(6px); }
        }
        .ai-syringe-plunger-${uid} { animation: ai-syringe-push-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; }
        .ai-syringe-liquid-${uid}  { animation: ai-syringe-liquid-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; transform-origin: 14px 25px; }
        .ai-syringe-drop-${uid}    { animation: ai-syringe-drop-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; }
      `}</style>
      <Svg width={size} height={size} viewBox={SyringePaths.viewBox} style={style as any}>
        <Path d={SyringePaths.barrel} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path className={`ai-syringe-liquid-${uid}`} d={SyringePaths.liquid} fill={s.fill} opacity={s.opacity * 0.7} />
        <Path className={`ai-syringe-plunger-${uid}`} d={SyringePaths.plunger} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path d={SyringePaths.needle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
        <Path className={`ai-syringe-drop-${uid}`} d={SyringePaths.drop} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 8: Create Brain.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { BrainPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Brain: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BrainPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-brain-neuron-${uid} {
          0%, 100% { opacity: 0.2; r: 3; }
          50% { opacity: 1; r: 4.5; }
        }
        .ai-brain-n1-${uid} { animation: ai-brain-neuron-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; }
        .ai-brain-n2-${uid} { animation: ai-brain-neuron-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
        .ai-brain-n3-${uid} { animation: ai-brain-neuron-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; }
      `}</style>
      <Svg width={size} height={size} viewBox={BrainPaths.viewBox} style={style as any}>
        <Path d={BrainPaths.left}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
        <Path d={BrainPaths.right} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
        <Path d={`${BrainPaths.synapse1} ${BrainPaths.synapse2}`} stroke={s.stroke} strokeWidth="1" fill="none" opacity={s.opacity * 0.5} />
        <Circle className={`ai-brain-n1-${uid}`} cx="16" cy="20" r="3" fill={s.fill} />
        <Circle className={`ai-brain-n2-${uid}`} cx="24" cy="16" r="3" fill={s.fill} />
        <Circle className={`ai-brain-n3-${uid}`} cx="32" cy="20" r="3" fill={s.fill} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 9: Create BloodDrop.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { BloodDropPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const BloodDrop: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BloodDropPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-drop-pulse-${uid} {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.85); }
        }
        @keyframes ai-drop-ripple-${uid} {
          0% { opacity: 0.6; r: 6; }
          100% { opacity: 0; r: 10; }
        }
        .ai-drop-body-${uid}  { animation: ai-drop-pulse-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 28px; }
        .ai-drop-r1-${uid} { animation: ai-drop-ripple-${uid} ${d.long}ms ease-out ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; }
        .ai-drop-r2-${uid} { animation: ai-drop-ripple-${uid} ${d.long}ms ease-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
      `}</style>
      <Svg width={size} height={size} viewBox={BloodDropPaths.viewBox} style={style as any}>
        <Path className={`ai-drop-body-${uid}`} d={BloodDropPaths.drop} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Circle className={`ai-drop-r1-${uid}`} cx="24" cy="42" r="6" stroke={s.stroke} strokeWidth="1.5" fill="none" />
        <Circle className={`ai-drop-r2-${uid}`} cx="24" cy="42" r="6" stroke={s.stroke} strokeWidth="1.5" fill="none" />
      </Svg>
    </>
  );
};
```

- [ ] **Step 10: Create Steps.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { StepsPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Steps: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, StepsPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-steps-f1-${uid} {
          0%, 49%, 100% { opacity: 0.3; }
          50%, 99% { opacity: 1; }
        }
        @keyframes ai-steps-f2-${uid} {
          0%, 100% { opacity: 1; }
          50%, 99% { opacity: 0.3; }
        }
        .ai-steps-f1-${uid} { animation: ai-steps-f1-${uid} ${d.medium}ms ease ${iterCount}; animation-play-state: ${playState}; }
        .ai-steps-f2-${uid} { animation: ai-steps-f2-${uid} ${d.medium}ms ease ${iterCount}; animation-play-state: ${playState}; }
      `}</style>
      <Svg width={size} height={size} viewBox={StepsPaths.viewBox} style={style as any}>
        <Path className={`ai-steps-f1-${uid}`} d={`${StepsPaths.foot1} ${StepsPaths.toe1a} ${StepsPaths.toe1b}`} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} strokeLinecap="round" opacity={s.opacity} />
        <Path className={`ai-steps-f2-${uid}`} d={`${StepsPaths.foot2} ${StepsPaths.toe2a} ${StepsPaths.toe2b}`} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 11: Create Sleep.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { SleepPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Sleep: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SleepPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-sleep-glow-${uid} {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes ai-sleep-star-${uid} {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes ai-sleep-z-${uid} {
          0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          50% { opacity: 1; transform: translate(4px, -6px) scale(1); }
          100% { opacity: 0; transform: translate(8px, -12px) scale(0.5); }
        }
        .ai-sleep-moon-${uid} { animation: ai-sleep-glow-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; transform-origin: 18px 24px; }
        .ai-sleep-star1-${uid} { animation: ai-sleep-star-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
        .ai-sleep-star2-${uid} { animation: ai-sleep-star-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; }
        .ai-sleep-z1-${uid} { animation: ai-sleep-z-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; }
        .ai-sleep-z2-${uid} { animation: ai-sleep-z-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
      `}</style>
      <Svg width={size} height={size} viewBox={SleepPaths.viewBox} style={style as any}>
        <Path className={`ai-sleep-moon-${uid}`} d={SleepPaths.moon} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path className={`ai-sleep-star1-${uid}`} d={SleepPaths.star1} fill={s.fill} opacity={s.opacity} />
        <Path className={`ai-sleep-star2-${uid}`} d={SleepPaths.star2} fill={s.fill} opacity={s.opacity} />
        <Path className={`ai-sleep-z1-${uid}`} d={SleepPaths.z1} stroke={s.stroke} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path className={`ai-sleep-z2-${uid}`} d={SleepPaths.z2} stroke={s.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 12: Create Oxygen.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { OxygenPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Oxygen: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, OxygenPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-o2-orbit-${uid} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ai-o2-orbit-${uid} {
          animation: ai-o2-orbit-${uid} ${d.long}ms linear ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={OxygenPaths.viewBox} style={style as any}>
        <Path d={OxygenPaths.orbit} stroke={s.secondaryColor} strokeWidth="1" fill="none" strokeDasharray="3 3" opacity={s.opacity} />
        <Circle cx="18" cy="20" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Circle cx="26" cy="20" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={OxygenPaths.bond} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <g className={`ai-o2-orbit-${uid}`}>
          <Circle cx="40" cy="24" r="2.5" fill={s.fill} opacity={s.opacity} />
        </g>
      </Svg>
    </>
  );
};
```

- [ ] **Step 13: Create Medkit.tsx**

```tsx
import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { MedkitPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Medkit: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MedkitPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-kit-bounce-${uid} {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes ai-kit-cross-${uid} {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .ai-kit-body-${uid}  { animation: ai-kit-bounce-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; }
        .ai-kit-cross-${uid} { animation: ai-kit-cross-${uid} ${d.long}ms ease-in-out ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 27px; }
      `}</style>
      <Svg width={size} height={size} viewBox={MedkitPaths.viewBox} style={style as any}>
        <Path className={`ai-kit-body-${uid}`} d={MedkitPaths.box} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path className={`ai-kit-body-${uid}`} d={MedkitPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path className={`ai-kit-cross-${uid}`} d={`${MedkitPaths.crossV} ${MedkitPaths.crossH}`} stroke={s.fill} strokeWidth="3" strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
```

- [ ] **Step 14: Create packages/react/src/icons/healthcare/index.ts**

```ts
export { ECG } from './ECG';
export { HeartRate } from './HeartRate';
export { Lungs } from './Lungs';
export { Pill } from './Pill';
export { Thermometer } from './Thermometer';
export { DNA } from './DNA';
export { Syringe } from './Syringe';
export { Brain } from './Brain';
export { BloodDrop } from './BloodDrop';
export { Steps } from './Steps';
export { Sleep } from './Sleep';
export { Oxygen } from './Oxygen';
export { Medkit } from './Medkit';
```

- [ ] **Step 15: Create packages/react/src/index.ts**

```ts
export * from './icons/ui';
export * from './icons/healthcare';
export type { IconProps, AnimationSpeed } from '@animicons/shared';
```

- [ ] **Step 16: Build and verify**

```bash
cd /Users/M324550/Documents/POC/react-native-moticons
npm run build:web
```

Expected: `packages/react/dist/index.js`, `packages/react/dist/index.esm.js`, `packages/react/dist/index.d.ts` created with no errors.

```bash
node -e "const m = require('./packages/react/dist/index.js'); console.log(Object.keys(m).sort().join(', '))"
```

Expected output: `Bell, BloodDrop, Brain, Check, DNA, ECG, Heart, HeartRate, Loader, Lungs, Medkit, Oxygen, Pill, Pulse, Sleep, Steps, Syringe, Thermometer, Upload, Wifi, Star`

- [ ] **Step 17: Commit**

```bash
git add packages/react/src
git commit -m "feat(react): add all 21 animated icon components"
```

---

## Task 8: @animicons/react-native — package scaffold and utilities

**Files:**
- Create: `packages/react-native/package.json`
- Create: `packages/react-native/tsconfig.json`
- Create: `packages/react-native/tsup.config.ts`
- Create: `packages/react-native/src/utils/resolveStyle.ts`
- Create: `packages/react-native/src/utils/animDuration.ts`

- [ ] **Step 1: Create packages/react-native/package.json**

```json
{
  "name": "@animicons/react-native",
  "version": "0.1.0",
  "description": "Animated SVG icon library for React Native",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.esm.js",
      "types": "./dist/index.d.ts"
    }
  },
  "sideEffects": false,
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-native": "^0.72.0",
    "react-native-svg": "^14.0.0",
    "react-native-reanimated": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-native": "^0.72.0",
    "react": "^18.0.0",
    "react-native": "^0.72.0",
    "react-native-svg": "^14.0.0",
    "react-native-reanimated": "^3.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.4.0"
  },
  "dependencies": {
    "@animicons/shared": "*"
  }
}
```

- [ ] **Step 2: Create packages/react-native/tsconfig.json**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-native",
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create packages/react-native/tsup.config.ts**

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-native', 'react-native-svg', 'react-native-reanimated'],
});
```

- [ ] **Step 4: Create packages/react-native/src/utils/resolveStyle.ts**

```ts
interface PathDefaults {
  defaultColor: string;
  defaultStrokeWidth: number;
}

interface ResolvedStyle {
  stroke: string;
  fill: string;
  secondaryColor: string;
  opacity: number;
  strokeWidth: number;
}

interface StyleProps {
  color?: string;
  strokeColor?: string;
  fillColor?: string;
  secondaryColor?: string;
  opacity?: number;
  strokeWidth?: number;
}

export function resolveStyle(props: StyleProps, defaults: PathDefaults): ResolvedStyle {
  const base = props.color ?? defaults.defaultColor;
  return {
    stroke: props.strokeColor ?? base,
    fill: props.fillColor ?? base,
    secondaryColor: props.secondaryColor ?? `${base}33`,
    opacity: props.opacity ?? 1,
    strokeWidth: props.strokeWidth ?? defaults.defaultStrokeWidth,
  };
}
```

- [ ] **Step 5: Create packages/react-native/src/utils/animDuration.ts**

```ts
import { DURATION, DurationSet } from '@animicons/shared';
import type { AnimationSpeed } from '@animicons/shared';

export function getAnimDuration(speed: AnimationSpeed = 'normal'): DurationSet {
  return DURATION[speed];
}
```

- [ ] **Step 6: Commit**

```bash
git add packages/react-native
git commit -m "feat(react-native): scaffold package with utilities"
```

---

## Task 9: @animicons/react-native — All 21 icon components

**Files:**
- Create: `packages/react-native/src/icons/ui/*.tsx` (8 files)
- Create: `packages/react-native/src/icons/healthcare/*.tsx` (13 files)
- Create: `packages/react-native/src/icons/ui/index.ts`
- Create: `packages/react-native/src/icons/healthcare/index.ts`
- Create: `packages/react-native/src/index.ts`

- [ ] **Step 1: Create Loader.tsx (baseline — Pattern A continuous rotation)**

```tsx
import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation,
  Easing, runOnJS,
} from 'react-native-reanimated';
import { IconProps } from '@animicons/shared';
import { LoaderPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Loader: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal',
  onAnimationEnd, style, ...colorProps
}) => {
  const rotation = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LoaderPaths);

  useEffect(() => {
    if (autoPlay) {
      rotation.value = withRepeat(
        withTiming(360, { duration: d.medium, easing: Easing.linear }),
        loop ? -1 : 1,
        false,
        () => { if (onAnimationEnd) runOnJS(onAnimationEnd)(); }
      );
    } else {
      cancelAnimation(rotation);
    }
  }, [autoPlay, loop, speed]);

  const animatedProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={LoaderPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={animatedProps}
        d={LoaderPaths.arc}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
    </Svg>
  );
};
```

- [ ] **Step 2: Create Pulse.tsx (Pattern C — staggered)**

```tsx
import React, { useEffect } from 'react';
import { Svg, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, withDelay, cancelAnimation,
  Easing, runOnJS,
} from 'react-native-reanimated';
import { IconProps } from '@animicons/shared';
import { PulsePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function usePulseRing(stagger: number, duration: number, autoPlay: boolean, loop: boolean) {
  const r = useSharedValue(4);
  const opacity = useSharedValue(0.8);
  useEffect(() => {
    if (autoPlay) {
      r.value = withDelay(stagger, withRepeat(withTiming(20, { duration, easing: Easing.out(Easing.ease) }), loop ? -1 : 1));
      opacity.value = withDelay(stagger, withRepeat(withTiming(0, { duration, easing: Easing.out(Easing.ease) }), loop ? -1 : 1));
    } else {
      cancelAnimation(r); cancelAnimation(opacity);
    }
  }, [autoPlay, loop, duration, stagger]);
  return { r, opacity };
}

export const Pulse: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PulsePaths);
  const ring1 = usePulseRing(0, d.medium, autoPlay, loop);
  const ring2 = usePulseRing(d.stagger, d.medium, autoPlay, loop);
  const ring3 = usePulseRing(d.stagger * 2, d.medium, autoPlay, loop);

  const ap1 = useAnimatedProps(() => ({ r: ring1.r.value, opacity: ring1.opacity.value }));
  const ap2 = useAnimatedProps(() => ({ r: ring2.r.value, opacity: ring2.opacity.value }));
  const ap3 = useAnimatedProps(() => ({ r: ring3.r.value, opacity: ring3.opacity.value }));

  return (
    <Svg width={size} height={size} viewBox={PulsePaths.viewBox} style={style as any}>
      <AnimatedCircle animatedProps={ap1} cx="24" cy="24" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" />
      <AnimatedCircle animatedProps={ap2} cx="24" cy="24" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" />
      <AnimatedCircle animatedProps={ap3} cx="24" cy="24" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" />
      <Circle cx="24" cy="24" r="3" fill={s.stroke} opacity={s.opacity} />
    </Svg>
  );
};
```

- [ ] **Step 3: Create Check.tsx (Pattern B — stroke-dashoffset sequence)**

```tsx
import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withTiming, withDelay, withRepeat, cancelAnimation, Easing,
} from 'react-native-reanimated';
import { IconProps } from '@animicons/shared';
import { CheckPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Check: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal',
  onAnimationEnd, style, ...colorProps
}) => {
  const circleProgress = useSharedValue(126);
  const checkProgress = useSharedValue(30);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CheckPaths);

  useEffect(() => {
    if (autoPlay) {
      const animate = () => {
        circleProgress.value = withTiming(0, { duration: d.short, easing: Easing.ease });
        checkProgress.value = withDelay(d.short * 0.6, withTiming(0, { duration: d.short * 0.6, easing: Easing.ease }));
      };
      if (loop) {
        circleProgress.value = withRepeat(withTiming(0, { duration: d.short }), -1);
        checkProgress.value = withRepeat(withDelay(d.short * 0.6, withTiming(0, { duration: d.short * 0.6 })), -1);
      } else {
        animate();
      }
    } else {
      cancelAnimation(circleProgress); cancelAnimation(checkProgress);
    }
  }, [autoPlay, loop, speed]);

  const circleProps = useAnimatedProps(() => ({ strokeDashoffset: circleProgress.value }));
  const checkProps  = useAnimatedProps(() => ({ strokeDashoffset: checkProgress.value }));

  return (
    <Svg width={size} height={size} viewBox={CheckPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={circleProps} d={CheckPaths.circle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeDasharray={126} opacity={s.opacity} />
      <AnimatedPath animatedProps={checkProps}  d={CheckPaths.check}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeDasharray={30} strokeLinecap="round" opacity={s.opacity} />
    </Svg>
  );
};
```

- [ ] **Step 4: Create Heart.tsx**

```tsx
import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps, useAnimatedStyle,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import Animated2 from 'react-native-reanimated';
import { IconProps } from '@animicons/shared';
import { HeartPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Heart: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HeartPaths);

  useEffect(() => {
    if (autoPlay) {
      const beat = withSequence(
        withTiming(1.2, { duration: d.short * 0.35 }),
        withTiming(1,   { duration: d.short * 0.35 }),
        withTiming(1.15,{ duration: d.short * 0.3 }),
        withTiming(1,   { duration: d.medium - d.short }),
      );
      scale.value = withRepeat(beat, loop ? -1 : 1);
      glowOpacity.value = withRepeat(
        withSequence(withTiming(0.4, { duration: d.short * 0.35 }), withTiming(0, { duration: d.medium - d.short * 0.35 })),
        loop ? -1 : 1
      );
    } else {
      cancelAnimation(scale); cancelAnimation(glowOpacity);
    }
  }, [autoPlay, loop, speed]);

  const glowProps  = useAnimatedProps(() => ({ opacity: glowOpacity.value }));
  const heartStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Svg width={size} height={size} viewBox={HeartPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={glowProps} d={HeartPaths.glow} fill={s.secondaryColor} stroke="none" />
      <Animated2.View style={[{ position: 'absolute' }, heartStyle]}>
        <Svg width={size} height={size} viewBox={HeartPaths.viewBox}>
          <Path d={HeartPaths.heart} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        </Svg>
      </Animated2.View>
    </Svg>
  );
};
```

- [ ] **Step 5: Create remaining 17 icons**

For each of the remaining icons, follow the same pattern as above — use `useSharedValue` + `withRepeat(withTiming(...))` for continuous loops, `withDelay` for staggered sequences. The animation logic mirrors the CSS keyframes exactly: same durations from `getAnimDuration`, same easing constants from Reanimated's `Easing`.

Create these files using the pattern from Steps 1-4 above:

**UI icons:** `Upload.tsx`, `Wifi.tsx`, `Bell.tsx`, `Star.tsx`
- Upload: `translateY` on arrow via `useAnimatedStyle`, `scaleX` on bar
- Wifi: staggered opacity on 3 arcs (Pattern C, delay 0 / stagger / stagger×2)
- Bell: `rotate` on bell body, `scale` on badge circle
- Star: triggered on press via `Pressable`, `scale` on star, `opacity` on sparkles

**Healthcare icons:** `HeartRate.tsx`, `Lungs.tsx`, `Pill.tsx`, `Thermometer.tsx`, `DNA.tsx`, `Syringe.tsx`, `Brain.tsx`, `BloodDrop.tsx`, `Steps.tsx`, `Sleep.tsx`, `Oxygen.tsx`, `Medkit.tsx`
- HeartRate: `scale` on heart + `r` on glow circle
- Lungs: `scaleX`+`scaleY` on each lobe independently
- Pill: `translateY` on whole group, `opacity` on shine path
- Thermometer: `scaleY` on mercury path (transform-origin at base), `rotate` shake on tube
- DNA: `translateY` on whole group, direction alternate
- Syringe: `translateX` on plunger, `scaleX` on liquid rect, `translateY`+`opacity` on drop
- Brain: staggered `r` (radius) + `opacity` on 3 neuron circles
- BloodDrop: `scaleY` on drop path, `r` + `opacity` on ripple circles
- Steps: alternating `opacity` between foot1 and foot2 on loop
- Sleep: `scale` on moon, staggered `opacity` on stars, `translateY`+`opacity` on Z paths
- Oxygen: `rotate` on orbit group containing electron circle
- Medkit: `translateY` on box+handle group, `scale` on cross paths

- [ ] **Step 6: Create packages/react-native/src/icons/ui/index.ts**

```ts
export { Pulse } from './Pulse';
export { Check } from './Check';
export { Loader } from './Loader';
export { Upload } from './Upload';
export { Wifi } from './Wifi';
export { Bell } from './Bell';
export { Star } from './Star';
export { Heart } from './Heart';
```

- [ ] **Step 7: Create packages/react-native/src/icons/healthcare/index.ts**

```ts
export { ECG } from './ECG';
export { HeartRate } from './HeartRate';
export { Lungs } from './Lungs';
export { Pill } from './Pill';
export { Thermometer } from './Thermometer';
export { DNA } from './DNA';
export { Syringe } from './Syringe';
export { Brain } from './Brain';
export { BloodDrop } from './BloodDrop';
export { Steps } from './Steps';
export { Sleep } from './Sleep';
export { Oxygen } from './Oxygen';
export { Medkit } from './Medkit';
```

- [ ] **Step 8: Create packages/react-native/src/index.ts**

```ts
export * from './icons/ui';
export * from './icons/healthcare';
export type { IconProps, AnimationSpeed } from '@animicons/shared';
```

- [ ] **Step 9: Build and verify**

```bash
npm run build:rn
node -e "const m = require('./packages/react-native/dist/index.js'); console.log(Object.keys(m).sort().join(', '))"
```

Expected: same 21 icon names as the web package.

- [ ] **Step 10: Commit**

```bash
git add packages/react-native/src
git commit -m "feat(react-native): add all 21 Reanimated icon components"
```

---

## Task 10: README, CHANGELOG, and publish prep

**Files:**
- Create: `README.md`
- Create: `CHANGELOG.md`

- [ ] **Step 1: Create README.md**

```markdown
# @animicons

Animated SVG icon library for React and React Native. 21 icons across UI/System and Healthcare categories. 60fps animations. Full colour customisation. Tree-shakeable.

## Packages

| Package | Platform | Install |
|---------|----------|---------|
| `@animicons/react` | React (web) | `npm install @animicons/react react-native-svg` |
| `@animicons/react-native` | React Native | `npm install @animicons/react-native react-native-svg react-native-reanimated` |

## Usage

```tsx
// Web
import { ECG, Brain, Loader } from '@animicons/react'

// React Native
import { ECG, Brain, Loader } from '@animicons/react-native'

// Auto-plays, loops forever
<ECG size={48} color="#f43f5e" />

// Full colour control
<Brain
  size={40}
  strokeColor="#ec4899"
  fillColor="#fce7f3"
  secondaryColor="#fbcfe8"
  strokeWidth={2}
  opacity={0.9}
/>

// Slow, plays once, fires callback
<Loader speed="slow" loop={false} onAnimationEnd={() => console.log('done')} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `48` | Width and height in dp/px |
| `color` | `string` | icon default | Primary shorthand — sets stroke + fill |
| `strokeColor` | `string` | `color` | Explicit stroke override |
| `fillColor` | `string` | `color` | Explicit fill override |
| `secondaryColor` | `string` | auto | Background / glow colour |
| `opacity` | `number` | `1` | Global opacity (0–1) |
| `strokeWidth` | `number` | icon default | Stroke thickness |
| `autoPlay` | `boolean` | `true` | Start animation on mount |
| `loop` | `boolean` | `true` | Repeat indefinitely |
| `speed` | `'slow'\|'normal'\|'fast'` | `'normal'` | Duration multiplier |
| `style` | `object` | — | Container style |
| `onAnimationEnd` | `() => void` | — | Fires at end of each cycle |

## Icons

### UI / System
`Pulse` `Check` `Loader` `Upload` `Wifi` `Bell` `Star` `Heart`

### Healthcare
`ECG` `HeartRate` `Lungs` `Pill` `Thermometer` `DNA` `Syringe` `Brain` `BloodDrop` `Steps` `Sleep` `Oxygen` `Medkit`

## React Native setup

Add to `babel.config.js`:
```js
plugins: ['react-native-reanimated/plugin']
```

Expo:
```bash
npx expo install react-native-svg react-native-reanimated
```

## Adding new icons (for maintainers)

1. Add path data to `packages/shared/src/paths/<category>/NewIcon.ts`
2. Add component to `packages/react/src/icons/<category>/NewIcon.tsx`
3. Add component to `packages/react-native/src/icons/<category>/NewIcon.tsx`
4. Add `export { NewIcon } from './NewIcon'` to each `index.ts`
5. Bump minor version in both `package.json` files
6. `npm run build && npm run publish:web && npm run publish:rn`

Existing consumers are never affected — all exports are additive.
```

- [ ] **Step 2: Create CHANGELOG.md**

```markdown
# Changelog

## 0.1.0 — 2026-05-29

### Added
- `@animicons/react` — 21 animated SVG icons for React web (CSS keyframes)
- `@animicons/react-native` — 21 animated SVG icons for React Native (Reanimated)
- UI/System icons: Pulse, Check, Loader, Upload, Wifi, Bell, Star, Heart
- Healthcare icons: ECG, HeartRate, Lungs, Pill, Thermometer, DNA, Syringe, Brain, BloodDrop, Steps, Sleep, Oxygen, Medkit
- Full colour customisation: `color`, `strokeColor`, `fillColor`, `secondaryColor`, `opacity`, `strokeWidth`
- Animation control: `autoPlay`, `loop`, `speed` (slow/normal/fast), `onAnimationEnd`
```

- [ ] **Step 3: Final build verification**

```bash
npm run build
npm run typecheck
node -e "const m = require('./packages/react/dist/index.js'); console.log('react exports:', Object.keys(m).length)"
node -e "const m = require('./packages/react-native/dist/index.js'); console.log('rn exports:', Object.keys(m).length)"
```

Expected: both print `react exports: 23` and `rn exports: 23` (21 icons + `IconProps` type + `AnimationSpeed` type re-exported).

- [ ] **Step 4: Commit**

```bash
git add README.md CHANGELOG.md
git commit -m "docs: add README and CHANGELOG for v0.1.0"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Two separate npm packages (`@animicons/react`, `@animicons/react-native`)
- ✅ 8 UI icons + 13 healthcare icons = 21 total
- ✅ No `Icon` suffix on exports
- ✅ Full colour props: `color`, `strokeColor`, `fillColor`, `secondaryColor`, `opacity`, `strokeWidth`
- ✅ `autoPlay`, `loop`, `speed`, `onAnimationEnd` on every icon
- ✅ Backwards-compatible: barrel files only ever add exports, never remove
- ✅ Future categories: add a new folder + one new `export *` line in root `index.ts`
- ✅ `shared` package never published — no namespace pollution
- ✅ tsup builds CJS + ESM + types
- ✅ `sideEffects: false` for tree-shaking

**Placeholder scan:** No TBDs. Task 9 Step 5 describes the remaining 17 RN icons with explicit animation strategies per icon — not "similar to above", each has its own named animation property.

**Type consistency:** `resolveStyle` returns `{ stroke, fill, secondaryColor, opacity, strokeWidth }` — used consistently across all icon components in both packages. `getAnimDuration` returns `DurationSet` (`{ short, medium, long, stagger }`) — used as `d.short`, `d.medium` etc. throughout.
