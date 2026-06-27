# @animicons Developer Reference

## Installation

### Web (React)
```bash
npm install @animicons/react react-native-svg
```

### React Native
```bash
npm install @animicons/react-native react-native-svg react-native-reanimated
```

## Peer Dependencies

### @animicons/react
- `react` ^18.0.0
- `react-native-svg` ^14.0.0

### @animicons/react-native
- `react` ^18.0.0
- `react-native` ^0.72.0
- `react-native-svg` ^14.0.0
- `react-native-reanimated` ^3.0.0

## Framework Setup

### Next.js App Router
```tsx
// app/page.tsx
import { Bell, Loader } from '@animicons/react'
// Works out of the box — CSS animations, no config needed
```

### Expo
```bash
npx expo install react-native-svg react-native-reanimated
```
Add to `babel.config.js`:
```js
plugins: ['react-native-reanimated/plugin']
```

### Vite + React
```tsx
import { Bell, Loader } from '@animicons/react'
// Works out of the box
```

### Bare React Native
```bash
npm install react-native-svg react-native-reanimated
npx react-native link react-native-svg
```
Add `react-native-reanimated/plugin` to babel.config.js.

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `48` | Width and height in dp/px |
| `color` | `string` | icon default | Primary shorthand — sets stroke + fill |
| `strokeColor` | `string` | `color` | Explicit stroke override |
| `fillColor` | `string` | `color` | Explicit fill override |
| `secondaryColor` | `string` | auto | Background/glow colour (default: primary at 20% alpha) |
| `opacity` | `number` | `1` | Global opacity (0–1) |
| `strokeWidth` | `number` | icon default | Stroke thickness |
| `autoPlay` | `boolean` | `true` | Start animation on mount |
| `loop` | `boolean` | `true` | Repeat indefinitely |
| `speed` | `'slow'\|'normal'\|'fast'` | `'normal'` | Animation speed multiplier |
| `style` | `object` | — | Container style |
| `onAnimationEnd` | `() => void` | — | Fires at end of each animation cycle |

## Animation Control

```tsx
// Auto-play, loops forever
<Bell />

// Controlled — start on demand
<Loader autoPlay={isLoading} loop={true} />

// Play once, fire callback
<Check autoPlay={true} loop={false} onAnimationEnd={() => console.log('done')} />

// Speed control
<ECG speed="slow" />
<Loader speed="fast" />

// Color override
<Heart color="#ef4444" secondaryColor="#fce7f3" />
<Brain strokeColor="#6366f1" fillColor="#eef2ff" />
```

## Icon Catalog (104 icons)

### UI / System (8 icons)
`Pulse` `Check` `Loader` `Upload` `Wifi` `Bell` `Star` `Heart`

### Navigation & Structure (10 icons)
`Home` `Menu` `KebabMenu` `MoreHorizontal` `Back` `Forward` `ChevronDown` `Close` `Grid` `Search`

### Navigation Additions — Batch 1 (17 icons)
`ChevronUp` `ChevronLeft` `ChevronRight` `ArrowUp` `ArrowDown` `ArrowLeft` `SortAsc` `SortDesc` `ZoomIn` `ZoomOut` `AlertTriangle` `AlertCircle` `Calendar` `Clock` `Globe` `Flag` `Notification`

### Core Actions (12 icons)
`Add` `Edit` `Save` `Trash` `Share` `Download` `Refresh` `Sync` `Copy` `Pin` `Bookmark` `Filter`

### Actions Additions — Batch 1 (2 icons)
`Undo` `Redo`

### Communication & Social (10 icons)
`Mail` `Chat` `Phone` `Video` `User` `Users` `ThumbsUp` `Send` `Reaction` `Mention`

### Settings & Configuration (9 icons)
`Settings` `Sliders` `Lock` `Unlock` `Key` `Eye` `EyeOff` `Info` `Help`

### Settings Additions — Batch 1 (1 icon)
`Logout`

### File & Content (8 icons)
`Folder` `Document` `Image` `Attachment` `Cloud` `Link` `Archive` `Tag`

### Media Playback (8 icons)
`Play` `Pause` `Stop` `FastForward` `Rewind` `Volume` `Mute` `Microphone`

### Device & Hardware (6 icons)
`Battery` `Bluetooth` `Location` `CloudSync` `Camera` `Brightness`

### Healthcare (13 icons)
`ECG` `HeartRate` `Lungs` `Pill` `Thermometer` `DNA` `Syringe` `Brain` `BloodDrop` `Steps` `Sleep` `Oxygen` `Medkit`

## TypeScript

```tsx
import type { IconProps, AnimationSpeed } from '@animicons/react'
// or: from '@animicons/react-native'

function MyIcon(props: IconProps) {
  return <Bell {...props} />
}

const speed: AnimationSpeed = 'fast'
```

## Troubleshooting

**Reanimated "ReanimatedError: Reanimated 2 failed to create a worklet"**
Add `react-native-reanimated/plugin` to your `babel.config.js` plugins array. Clear Metro cache with `npx react-native start --reset-cache`.

**SVG not rendering on web**
Install `react-native-svg` and configure the web alias if using webpack: `'react-native-svg': 'react-native-svg/src/ReactNativeSVG.web'`

**Icons render but don't animate**
Check that `autoPlay` prop is not explicitly set to `false`. Default is `true`.
