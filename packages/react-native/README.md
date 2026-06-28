# @animicons/react-native

Animated SVG icon library for React Native. 104 icons. 60fps animations powered by `react-native-reanimated`. Full colour customisation. Tree-shakeable.

## Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/prakashs1117/animicons/main/assets/demo-react-native.gif" width="280" alt="React Native demo" />
</p>

**[Web Playground →](https://prakashs1117.github.io/animicons/)**

## Install

```bash
npm install @animicons/react-native react-native-svg react-native-reanimated
```

Add to `babel.config.js`:
```js
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // or 'babel-preset-expo' for Expo
  plugins: ['react-native-reanimated/plugin'],
};
```

Expo:
```bash
npx expo install react-native-svg react-native-reanimated
```

## Usage

```tsx
import { ECG, Brain, Loader, Bell, Heart } from '@animicons/react-native'

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
| `size` | `number` | `48` | Width and height in dp |
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

### Navigation & Structure
`Home` `Menu` `KebabMenu` `MoreHorizontal` `Back` `Forward` `ChevronDown` `Close` `Grid` `Search` `ChevronUp` `ChevronLeft` `ChevronRight` `ArrowUp` `ArrowDown` `ArrowLeft` `SortAsc` `SortDesc` `ZoomIn` `ZoomOut` `AlertTriangle` `AlertCircle` `Calendar` `Clock` `Globe` `Flag` `Notification`

### Core Actions
`Add` `Edit` `Save` `Trash` `Share` `Download` `Refresh` `Sync` `Copy` `Pin` `Bookmark` `Filter` `Undo` `Redo`

### Communication & Social
`Mail` `Chat` `Phone` `Video` `User` `Users` `ThumbsUp` `Send` `Reaction` `Mention`

### Settings & Configuration
`Settings` `Sliders` `Lock` `Unlock` `Key` `Eye` `EyeOff` `Info` `Help` `Logout`

### File & Content
`Folder` `Document` `Image` `Attachment` `Cloud` `Link` `Archive` `Tag`

### Media Playback
`Play` `Pause` `Stop` `FastForward` `Rewind` `Volume` `Mute` `Microphone`

### Device & Hardware
`Battery` `Bluetooth` `Location` `CloudSync` `Camera` `Brightness`

### Healthcare
`ECG` `HeartRate` `Lungs` `Pill` `Thermometer` `DNA` `Syringe` `Brain` `BloodDrop` `Steps` `Sleep` `Oxygen` `Medkit`

## License

MIT
