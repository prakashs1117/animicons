# @animicons

Animated SVG icon library for React and React Native. 84 icons across 9 categories. 60fps animations. Full colour customisation. Tree-shakeable.

## Preview

<table>
  <tr>
    <th align="center">React Native</th>
    <th align="center">Web (React)</th>
  </tr>
  <tr>
    <td align="center">
      <img src="./assets/demo-react-native.gif" width="260" alt="React Native demo" />
    </td>
    <td align="center">
      <img src="./assets/demo-web.gif" width="480" alt="Web demo" />
    </td>
  </tr>
</table>

**[Live Web Playground →](https://prakashs1117.github.io/animicons/)**

## Packages

| Package | Platform | Version | Install |
|---------|----------|---------|---------|
| `@animicons/react` | React (web) | `0.2.2` | `npm install @animicons/react react-native-svg` |
| `@animicons/react-native` | React Native | `0.2.2` | `npm install @animicons/react-native react-native-svg react-native-reanimated` |

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
4. Add `export { NewIcon } from './NewIcon'` to each `icons/<category>/index.ts`
5. Bump minor version in both `package.json` files
6. `npm run build && npm run publish:web && npm run publish:rn`

Existing consumers are never affected — all exports are additive.

## License

MIT
