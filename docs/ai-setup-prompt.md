# @animicons — AI Setup Prompt

> **How to use:** Copy everything inside the code block below and paste it as your first message into Claude, Cursor, Copilot, or any AI coding tool. It will scaffold a working sample app that shows all animicons with live animation.

---

````
You are setting up a working demo app for @animicons — an animated SVG icon library for React and React Native.
Follow every step below exactly. Do not skip any step.

---

## WHAT TO BUILD

A single-page React (Vite) demo app that:
- Shows all 104 @animicons icons in a grid, grouped by category
- Lets the user change color, size, and speed with controls
- Shows the import snippet when an icon is clicked
- Runs with `npm run dev`

---

## STEP 1 — Scaffold a new Vite + React + TypeScript project

```bash
npm create vite@latest animicons-demo -- --template react-ts
cd animicons-demo
```

---

## STEP 2 — Install dependencies

```bash
npm install @animicons/react react-native-svg
npm install
```

> `react-native-svg` is required as a peer dep even in web projects.

---

## STEP 3 — Create src/App.tsx

Replace the entire contents of `src/App.tsx` with the following:

```tsx
import React, { useState } from 'react';
import {
  // UI / System
  Pulse, Check, Loader, Upload, Wifi, Bell, Star, Heart,
  // Navigation & Structure
  Home, Menu, KebabMenu, MoreHorizontal, Back, Forward,
  ChevronDown, Close, Grid, Search,
  // Navigation Additions
  ChevronUp, ChevronLeft, ChevronRight,
  ArrowUp, ArrowDown, ArrowLeft,
  SortAsc, SortDesc, ZoomIn, ZoomOut,
  AlertTriangle, AlertCircle,
  Calendar, Clock, Globe, Flag, Notification,
  // Actions
  Add, Edit, Save, Trash, Share, Download,
  Refresh, Sync, Copy, Pin, Bookmark, Filter,
  Undo, Redo,
  // Communication
  Mail, Chat, Phone, Video, User, Users,
  ThumbsUp, Send, Reaction, Mention,
  // Settings
  Settings, Sliders, Lock, Unlock, Key,
  Eye, EyeOff, Info, Help, Logout,
  // Files
  Folder, Document, Image, Attachment,
  Cloud, Link, Archive, Tag,
  // Media
  Play, Pause, Stop, FastForward, Rewind,
  Volume, Mute, Microphone,
  // Device
  Battery, Bluetooth, Location, CloudSync, Camera, Brightness,
  // Healthcare
  ECG, HeartRate, Brain, Pill, Thermometer,
  DNA, Syringe, BloodDrop, Steps, Sleep, Oxygen, Lungs, Medkit,
} from '@animicons/react';
import type { IconProps } from '@animicons/react';

type Speed = 'slow' | 'normal' | 'fast';
type IconEntry = { name: string; component: React.FC<IconProps> };

const CATEGORIES: { label: string; icons: IconEntry[] }[] = [
  {
    label: 'UI / System',
    icons: [
      { name: 'Pulse', component: Pulse },
      { name: 'Check', component: Check },
      { name: 'Loader', component: Loader },
      { name: 'Upload', component: Upload },
      { name: 'Wifi', component: Wifi },
      { name: 'Bell', component: Bell },
      { name: 'Star', component: Star },
      { name: 'Heart', component: Heart },
    ],
  },
  {
    label: 'Navigation & Structure',
    icons: [
      { name: 'Home', component: Home },
      { name: 'Menu', component: Menu },
      { name: 'KebabMenu', component: KebabMenu },
      { name: 'MoreHorizontal', component: MoreHorizontal },
      { name: 'Back', component: Back },
      { name: 'Forward', component: Forward },
      { name: 'ChevronDown', component: ChevronDown },
      { name: 'Close', component: Close },
      { name: 'Grid', component: Grid },
      { name: 'Search', component: Search },
      { name: 'ChevronUp', component: ChevronUp },
      { name: 'ChevronLeft', component: ChevronLeft },
      { name: 'ChevronRight', component: ChevronRight },
      { name: 'ArrowUp', component: ArrowUp },
      { name: 'ArrowDown', component: ArrowDown },
      { name: 'ArrowLeft', component: ArrowLeft },
      { name: 'SortAsc', component: SortAsc },
      { name: 'SortDesc', component: SortDesc },
      { name: 'ZoomIn', component: ZoomIn },
      { name: 'ZoomOut', component: ZoomOut },
      { name: 'AlertTriangle', component: AlertTriangle },
      { name: 'AlertCircle', component: AlertCircle },
      { name: 'Calendar', component: Calendar },
      { name: 'Clock', component: Clock },
      { name: 'Globe', component: Globe },
      { name: 'Flag', component: Flag },
      { name: 'Notification', component: Notification },
    ],
  },
  {
    label: 'Actions',
    icons: [
      { name: 'Add', component: Add },
      { name: 'Edit', component: Edit },
      { name: 'Save', component: Save },
      { name: 'Trash', component: Trash },
      { name: 'Share', component: Share },
      { name: 'Download', component: Download },
      { name: 'Refresh', component: Refresh },
      { name: 'Sync', component: Sync },
      { name: 'Copy', component: Copy },
      { name: 'Pin', component: Pin },
      { name: 'Bookmark', component: Bookmark },
      { name: 'Filter', component: Filter },
      { name: 'Undo', component: Undo },
      { name: 'Redo', component: Redo },
    ],
  },
  {
    label: 'Communication',
    icons: [
      { name: 'Mail', component: Mail },
      { name: 'Chat', component: Chat },
      { name: 'Phone', component: Phone },
      { name: 'Video', component: Video },
      { name: 'User', component: User },
      { name: 'Users', component: Users },
      { name: 'ThumbsUp', component: ThumbsUp },
      { name: 'Send', component: Send },
      { name: 'Reaction', component: Reaction },
      { name: 'Mention', component: Mention },
    ],
  },
  {
    label: 'Settings',
    icons: [
      { name: 'Settings', component: Settings },
      { name: 'Sliders', component: Sliders },
      { name: 'Lock', component: Lock },
      { name: 'Unlock', component: Unlock },
      { name: 'Key', component: Key },
      { name: 'Eye', component: Eye },
      { name: 'EyeOff', component: EyeOff },
      { name: 'Info', component: Info },
      { name: 'Help', component: Help },
      { name: 'Logout', component: Logout },
    ],
  },
  {
    label: 'Files',
    icons: [
      { name: 'Folder', component: Folder },
      { name: 'Document', component: Document },
      { name: 'Image', component: Image },
      { name: 'Attachment', component: Attachment },
      { name: 'Cloud', component: Cloud },
      { name: 'Link', component: Link },
      { name: 'Archive', component: Archive },
      { name: 'Tag', component: Tag },
    ],
  },
  {
    label: 'Media',
    icons: [
      { name: 'Play', component: Play },
      { name: 'Pause', component: Pause },
      { name: 'Stop', component: Stop },
      { name: 'FastForward', component: FastForward },
      { name: 'Rewind', component: Rewind },
      { name: 'Volume', component: Volume },
      { name: 'Mute', component: Mute },
      { name: 'Microphone', component: Microphone },
    ],
  },
  {
    label: 'Device',
    icons: [
      { name: 'Battery', component: Battery },
      { name: 'Bluetooth', component: Bluetooth },
      { name: 'Location', component: Location },
      { name: 'CloudSync', component: CloudSync },
      { name: 'Camera', component: Camera },
      { name: 'Brightness', component: Brightness },
    ],
  },
  {
    label: 'Healthcare',
    icons: [
      { name: 'ECG', component: ECG },
      { name: 'HeartRate', component: HeartRate },
      { name: 'Brain', component: Brain },
      { name: 'Pill', component: Pill },
      { name: 'Thermometer', component: Thermometer },
      { name: 'DNA', component: DNA },
      { name: 'Syringe', component: Syringe },
      { name: 'BloodDrop', component: BloodDrop },
      { name: 'Steps', component: Steps },
      { name: 'Sleep', component: Sleep },
      { name: 'Oxygen', component: Oxygen },
      { name: 'Lungs', component: Lungs },
      { name: 'Medkit', component: Medkit },
    ],
  },
];

const COLORS = [
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Amber', value: '#f59e0b' },
  { label: 'Pink', value: '#ec4899' },
  { label: 'Sky', value: '#0ea5e9' },
];

export default function App() {
  const [color, setColor] = useState('#6366f1');
  const [size, setSize] = useState(48);
  const [speed, setSpeed] = useState<Speed>('normal');
  const [loop, setLoop] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const iconProps: IconProps = { color, size, speed, loop, autoPlay };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#0f172a', color: '#f1f5f9' }}>

      {/* Header */}
      <div style={{ padding: '24px 32px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: '#818cf8' }}>@animicons</h1>
        <span style={{ background: '#312e81', color: '#c4b5fd', fontSize: 11, padding: '2px 10px', borderRadius: 99 }}>v0.3.0</span>
        <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>104 icons · 60fps · React + React Native</span>
      </div>

      {/* Controls */}
      <div style={{ padding: '16px 32px', borderBottom: '1px solid #1e293b', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Color swatches */}
        <div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Color</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {COLORS.map(c => (
              <button key={c.value} onClick={() => setColor(c.value)}
                style={{ width: 28, height: 28, borderRadius: 8, background: c.value, border: color === c.value ? '2px solid white' : '2px solid transparent', cursor: 'pointer' }} />
            ))}
            <input type="color" value={color} onChange={e => setColor(e.target.value)}
              style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid #334155', cursor: 'pointer', padding: 1, background: '#1e293b' }} />
          </div>
        </div>

        {/* Size */}
        <div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Size — {size}px</div>
          <input type="range" min={24} max={80} value={size} onChange={e => setSize(+e.target.value)}
            style={{ width: 120, accentColor: '#6366f1' }} />
        </div>

        {/* Speed */}
        <div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Speed</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['slow', 'normal', 'fast'] as Speed[]).map(s => (
              <button key={s} onClick={() => setSpeed(s)}
                style={{ padding: '4px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12,
                  background: speed === s ? '#6366f1' : '#1e293b', color: speed === s ? 'white' : '#94a3b8' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Loop */}
        <div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Loop</div>
          <button onClick={() => setLoop(l => !l)}
            style={{ padding: '4px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12,
              background: loop ? '#6366f1' : '#1e293b', color: loop ? 'white' : '#94a3b8' }}>
            {loop ? 'On' : 'Off'}
          </button>
        </div>

        {/* AutoPlay */}
        <div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>AutoPlay</div>
          <button onClick={() => setAutoPlay(a => !a)}
            style={{ padding: '4px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12,
              background: autoPlay ? '#6366f1' : '#1e293b', color: autoPlay ? 'white' : '#94a3b8' }}>
            {autoPlay ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {/* Icon Grid */}
      <div style={{ padding: '32px' }}>
        {CATEGORIES.map(cat => (
          <div key={cat.label} style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 10 }}>
              {cat.label} — {cat.icons.length} icons
              <div style={{ flex: 1, height: 1, background: '#1e293b' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
              {cat.icons.map(({ name, component: Icon }) => (
                <div key={name} onClick={() => setSelected(selected === name ? null : name)}
                  style={{
                    background: selected === name ? '#1e293b' : '#131929',
                    border: `1px solid ${selected === name ? '#6366f1' : '#1e293b'}`,
                    borderRadius: 14, padding: '20px 12px 12px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: selected === name ? '0 0 0 3px rgba(99,102,241,0.2)' : 'none',
                  }}>
                  <Icon {...iconProps} />
                  <span style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', lineHeight: 1.3 }}>{name}</span>
                </div>
              ))}
            </div>

            {/* Inline snippet when icon is selected inside this category */}
            {cat.icons.some(i => i.name === selected) && (
              <div style={{ marginTop: 12, background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 11, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Import snippet — {selected}
                </div>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: 12.5, color: '#c4b5fd', lineHeight: 1.6, overflowX: 'auto' }}>{
`import { ${selected} } from '@animicons/react';
// or
import { ${selected} } from '@animicons/react-native';

// Usage
<${selected}
  color="${color}"
  size={${size}}
  speed="${speed}"
  loop={${loop}}
  autoPlay={${autoPlay}}
/>`
                }</pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '32px', borderTop: '1px solid #1e293b', color: '#475569', fontSize: 13 }}>
        @animicons v0.3.0 · MIT ·{' '}
        <a href="https://github.com/prakashs1117/animicons" target="_blank" style={{ color: '#818cf8' }}>GitHub</a>
        {' · '}
        <a href="https://www.npmjs.com/package/@animicons/react" target="_blank" style={{ color: '#818cf8' }}>npm</a>
      </div>
    </div>
  );
}
```

---

## STEP 4 — Clear the default Vite CSS

Replace `src/index.css` with:

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0f172a; }
```

---

## STEP 5 — Start the dev server

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

You will see all 104 @animicons icons animating in a dark-themed grid. Click any icon to see its import snippet. Use the controls at the top to change color, size, speed, loop, and autoPlay in real time.

---

## PROPS REFERENCE

All props are optional.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `48` | Width and height in px |
| `color` | `string` | icon default | Sets stroke + fill in one prop |
| `strokeColor` | `string` | `color` | Override stroke independently |
| `fillColor` | `string` | `color` | Override fill independently |
| `secondaryColor` | `string` | base @ 20% alpha | Accent/glow layer color |
| `opacity` | `number` | `1` | Whole-icon opacity (0–1) |
| `strokeWidth` | `number` | icon default | Line thickness |
| `autoPlay` | `boolean` | `true` | Start on mount |
| `loop` | `boolean` | `true` | Repeat forever |
| `speed` | `'slow'\|'normal'\|'fast'` | `'normal'` | Animation speed |
| `onAnimationEnd` | `() => void` | — | Fires when loop=false finishes |

---

## COMMON PATTERNS

```tsx
// Controlled loading state
<Loader autoPlay={isLoading} loop={true} />

// Play once and fire callback
<Check loop={false} onAnimationEnd={() => setDone(true)} />

// Two-tone coloring
<Heart strokeColor="#ef4444" fillColor="#fee2e2" secondaryColor="#fca5a5" />

// Override line weight
<Loader strokeWidth={3} />

// Dimmed / disabled
<Settings opacity={0.4} />
```

---

## FOR REACT NATIVE (Expo or bare RN)

Replace the import path and swap `<div>` / `<span>` for `<View>` / `<Text>`:

```tsx
import { Bell, Loader } from '@animicons/react-native';
```

Add to `babel.config.js` (required for Reanimated):

```js
module.exports = {
  presets: ['babel-preset-expo'], // or 'module:metro-react-native-babel-preset'
  plugins: ['react-native-reanimated/plugin'],
};
```

---

## FULL ICON LIST (104 icons)

**UI / System (8):** Pulse · Check · Loader · Upload · Wifi · Bell · Star · Heart

**Navigation & Structure (27):** Home · Menu · KebabMenu · MoreHorizontal · Back · Forward · ChevronDown · Close · Grid · Search · ChevronUp · ChevronLeft · ChevronRight · ArrowUp · ArrowDown · ArrowLeft · SortAsc · SortDesc · ZoomIn · ZoomOut · AlertTriangle · AlertCircle · Calendar · Clock · Globe · Flag · Notification

**Actions (14):** Add · Edit · Save · Trash · Share · Download · Refresh · Sync · Copy · Pin · Bookmark · Filter · Undo · Redo

**Communication (10):** Mail · Chat · Phone · Video · User · Users · ThumbsUp · Send · Reaction · Mention

**Settings (10):** Settings · Sliders · Lock · Unlock · Key · Eye · EyeOff · Info · Help · Logout

**Files (8):** Folder · Document · Image · Attachment · Cloud · Link · Archive · Tag

**Media (8):** Play · Pause · Stop · FastForward · Rewind · Volume · Mute · Microphone

**Device (6):** Battery · Bluetooth · Location · CloudSync · Camera · Brightness

**Healthcare (13):** ECG · HeartRate · Brain · Pill · Thermometer · DNA · Syringe · BloodDrop · Steps · Sleep · Oxygen · Lungs · Medkit
````
