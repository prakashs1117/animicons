# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build all packages
npm run build

# Build individual packages
npm run build:web       # packages/react only
npm run build:rn        # packages/react-native only

# Type checking
npm run typecheck                        # all packages
npm run typecheck -w packages/react      # single package

# Publish (after building)
npm run publish:web     # @animicons/react
npm run publish:rn      # @animicons/react-native
```

No test suite exists yet. Type checking (`npm run typecheck`) is the primary correctness check.

## Architecture

This is an **npm workspace monorepo** with three packages:

```
packages/
  shared/       — @animicons/shared (private, never published)
  react/        — @animicons/react  (published, web)
  react-native/ — @animicons/react-native (published, RN)
```

### Data flow

**`shared`** is the single source of truth for path data and tokens. Both `react` and `react-native` depend on it at the source level (not built — `"main": "src/index.ts"`).

- `shared/src/paths/<category>/<Icon>.ts` — SVG `d` attribute strings, viewBox, defaultColor, defaultStrokeWidth
- `shared/src/tokens/timing.ts` — `DURATION` (slow/normal/fast × short/medium/long/stagger) and `EASING_CSS`
- `shared/src/types/IconProps.ts` — the single `IconProps` interface used by both platforms

### Animation approach differs by platform

| Platform | Animation engine | Mechanism |
|----------|-----------------|-----------|
| `react` | CSS `@keyframes` via `<style>` injection | `useId()` scopes class names to avoid collisions |
| `react-native` | `react-native-reanimated` v3 shared values | `useAnimatedProps` drives SVG path props on the JS thread |

Both packages expose identical `IconProps` — consumers can swap imports between platforms with no API changes.

### Icon component structure (both platforms)

Each icon component:
1. Calls `getAnimDuration(speed)` → `DurationSet` from shared timing tokens
2. Calls `resolveStyle(colorProps, PathDefaults)` → resolves `color`/`strokeColor`/`fillColor`/`secondaryColor`/`opacity`/`strokeWidth` with sensible fallbacks (secondary defaults to `${base}33` — 20% alpha)
3. Renders `<Svg>` from `react-native-svg` (used by both packages)

### Adding a new icon

1. `packages/shared/src/paths/<category>/NewIcon.ts` — export a `const NewIconPaths = { viewBox, defaultColor, defaultStrokeWidth, ...svgData }`
2. `packages/shared/src/paths/<category>/index.ts` — add re-export
3. `packages/react/src/icons/<category>/NewIcon.tsx` — implement with CSS keyframes
4. `packages/react-native/src/icons/<category>/NewIcon.tsx` — implement with Reanimated shared values
5. Both `icons/<category>/index.ts` files — add re-export
6. Bump minor version in `packages/react/package.json` and `packages/react-native/package.json`
7. `npm run build && npm run publish:web && npm run publish:rn`

### Build output

`tsup` produces CJS + ESM for each published package. The RN package marks `react`, `react-native`, `react-native-svg`, and `react-native-reanimated` as external peers. The web package marks `react` and `react-native-svg` as external peers.

`@animicons/shared` is never built — it's consumed directly from source via TypeScript path resolution.
