# @animicons/react-native

Animated SVG icon library for React Native. 60fps animations powered by `react-native-reanimated`. Full colour customisation. Tree-shakeable.

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
plugins: ['react-native-reanimated/plugin']
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

### Healthcare
`ECG` `HeartRate` `Lungs` `Pill` `Thermometer` `DNA` `Syringe` `Brain` `BloodDrop` `Steps` `Sleep` `Oxygen` `Medkit`

## License

MIT
