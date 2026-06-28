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
- `react-native-svg` >=13.0.0

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
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'],
};
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
Add to `babel.config.js`:
```js
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

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

## Theming & Color Customization

All color props accept any valid CSS color string (hex, rgb, hsl, named colors).

### `color` — base color shorthand

Sets both stroke and fill in one prop. Use this for simple single-color icons.

```tsx
<Bell color="#3b82f6" />
<Loader color="rgb(99, 102, 241)" />
<Star color="gold" />
```

### `strokeColor` — override stroke independently

Overrides only the stroke (outline) color. Falls back to `color` when not specified.

```tsx
// Stroke in indigo, fill inherits from color
<Brain color="#e0e7ff" strokeColor="#6366f1" />

// Combine with fillColor for full two-tone control
<Heart strokeColor="#ef4444" fillColor="#fee2e2" />
```

### `fillColor` — override fill independently

Overrides only the fill color. Falls back to `color` when not specified.

```tsx
<Bookmark fillColor="#fbbf24" />
<Cloud strokeColor="#0ea5e9" fillColor="#e0f2fe" />
```

### `secondaryColor` — accent / glow fill

Used for background rings, glow effects, and accent layers. When omitted, defaults to the base color at **20% alpha** (`${base}33` in hex notation).

```tsx
// Explicit accent color
<Heart color="#ef4444" secondaryColor="#fce7f3" />

// Let it auto-derive (base at 20% alpha)
<ECG color="#f43f5e" />

// Transparent accent (remove glow entirely)
<Bell color="#3b82f6" secondaryColor="transparent" />
```

### `opacity` — whole-icon opacity

Applies to the entire icon container. Accepts `0`–`1`.

```tsx
<Wifi opacity={0.4} />           // dimmed / disabled appearance
<Notification opacity={0.85} />  // slightly transparent
```

### `strokeWidth` — line thickness override

Overrides the icon's built-in default stroke width.

```tsx
<Check strokeWidth={1} />    // thinner lines
<Loader strokeWidth={3} />   // bolder lines
```

### Combining props

```tsx
// Full two-tone with custom opacity and weight
<Brain
  strokeColor="#6366f1"
  fillColor="#eef2ff"
  secondaryColor="#c7d2fe"
  strokeWidth={1.5}
  opacity={0.95}
/>

// Danger-state bell with glow
<Bell
  color="#ef4444"
  secondaryColor="#fecaca"
  strokeWidth={2}
/>
```

## Icon Catalog (104 icons)

### UI / System (8 icons)

```ts
import { Pulse, Check, Loader, Bell, Heart, Star, Upload, Wifi } from '@animicons/react';
// or
import { Pulse, Check, Loader, Bell, Heart, Star, Upload, Wifi } from '@animicons/react-native';
```

`Pulse` `Check` `Loader` `Upload` `Wifi` `Bell` `Star` `Heart`

### Navigation & Structure (10 icons)

```ts
import { Home, Menu, KebabMenu, MoreHorizontal, Back, Forward, ChevronDown, Close, Grid, Search } from '@animicons/react';
// or
import { Home, Menu, KebabMenu, MoreHorizontal, Back, Forward, ChevronDown, Close, Grid, Search } from '@animicons/react-native';
```

`Home` `Menu` `KebabMenu` `MoreHorizontal` `Back` `Forward` `ChevronDown` `Close` `Grid` `Search`

### Navigation Additions — Batch 1 (17 icons)

```ts
import { ChevronUp, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ArrowLeft } from '@animicons/react';
// or
import { ChevronUp, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ArrowLeft } from '@animicons/react-native';
```

`ChevronUp` `ChevronLeft` `ChevronRight` `ArrowUp` `ArrowDown` `ArrowLeft` `SortAsc` `SortDesc` `ZoomIn` `ZoomOut` `AlertTriangle` `AlertCircle` `Calendar` `Clock` `Globe` `Flag` `Notification`

### Core Actions (12 icons)

```ts
import { Add, Edit, Save, Trash, Share, Download, Refresh, Sync, Copy, Pin, Bookmark, Filter } from '@animicons/react';
// or
import { Add, Edit, Save, Trash, Share, Download, Refresh, Sync, Copy, Pin, Bookmark, Filter } from '@animicons/react-native';
```

`Add` `Edit` `Save` `Trash` `Share` `Download` `Refresh` `Sync` `Copy` `Pin` `Bookmark` `Filter`

### Actions Additions — Batch 1 (2 icons)

```ts
import { Undo, Redo } from '@animicons/react';
// or
import { Undo, Redo } from '@animicons/react-native';
```

`Undo` `Redo`

### Communication & Social (10 icons)

```ts
import { Mail, Chat, Phone, Video, User, Users, ThumbsUp, Send, Reaction, Mention } from '@animicons/react';
// or
import { Mail, Chat, Phone, Video, User, Users, ThumbsUp, Send, Reaction, Mention } from '@animicons/react-native';
```

`Mail` `Chat` `Phone` `Video` `User` `Users` `ThumbsUp` `Send` `Reaction` `Mention`

### Settings & Configuration (9 icons)

```ts
import { Settings, Sliders, Lock, Unlock, Key, Eye, EyeOff, Info, Help } from '@animicons/react';
// or
import { Settings, Sliders, Lock, Unlock, Key, Eye, EyeOff, Info, Help } from '@animicons/react-native';
```

`Settings` `Sliders` `Lock` `Unlock` `Key` `Eye` `EyeOff` `Info` `Help`

### Settings Additions — Batch 1 (1 icon)

```ts
import { Logout } from '@animicons/react';
// or
import { Logout } from '@animicons/react-native';
```

`Logout`

### File & Content (8 icons)

```ts
import { Folder, Document, Image, Attachment, Cloud, Link, Archive, Tag } from '@animicons/react';
// or
import { Folder, Document, Image, Attachment, Cloud, Link, Archive, Tag } from '@animicons/react-native';
```

`Folder` `Document` `Image` `Attachment` `Cloud` `Link` `Archive` `Tag`

### Media Playback (8 icons)

```ts
import { Play, Pause, Stop, FastForward, Rewind, Volume, Mute, Microphone } from '@animicons/react';
// or
import { Play, Pause, Stop, FastForward, Rewind, Volume, Mute, Microphone } from '@animicons/react-native';
```

`Play` `Pause` `Stop` `FastForward` `Rewind` `Volume` `Mute` `Microphone`

### Device & Hardware (6 icons)

```ts
import { Battery, Bluetooth, Location, CloudSync, Camera, Brightness } from '@animicons/react';
// or
import { Battery, Bluetooth, Location, CloudSync, Camera, Brightness } from '@animicons/react-native';
```

`Battery` `Bluetooth` `Location` `CloudSync` `Camera` `Brightness`

### Healthcare (13 icons)

```ts
import { ECG, HeartRate, Brain, Pill, Thermometer, DNA, Syringe, BloodDrop, Steps, Sleep, Oxygen, Lungs, Medkit } from '@animicons/react';
// or
import { ECG, HeartRate, Brain, Pill, Thermometer, DNA, Syringe, BloodDrop, Steps, Sleep, Oxygen, Lungs, Medkit } from '@animicons/react-native';
```

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
