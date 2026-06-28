# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] — 2026-06-27

### Added

- **Navigation & UI (20 icons):** `ChevronUp`, `ChevronLeft`, `ChevronRight`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `SortAsc`, `SortDesc`, `ZoomIn`, `ZoomOut`, `AlertTriangle`, `AlertCircle`, `Calendar`, `Clock`, `Globe`, `Flag`, `Logout`, `Notification`, `Undo`, `Redo`
- Total library size: 84 → 104 icons
- Zero breaking changes — all v0.2.x imports continue to work unchanged

## [0.2.0] — 2026-06-01

### Added

- 63 new animated SVG icons across 7 categories in both `@animicons/react` and `@animicons/react-native`
- **Navigation & UI** (added to `ui/`): `Home`, `Menu`, `KebabMenu`, `MoreHorizontal`, `Back`, `Forward`, `ChevronDown`, `Close`, `Grid`, `Search`
- **Actions** (`actions/`): `Add`, `Edit`, `Save`, `Trash`, `Share`, `Download`, `Refresh`, `Sync`, `Copy`, `Pin`, `Bookmark`, `Filter`
- **Communication** (`communication/`): `Mail`, `Chat`, `Phone`, `Video`, `User`, `Users`, `ThumbsUp`, `Send`, `Reaction`, `Mention`
- **Settings** (`settings/`): `Settings`, `Sliders`, `Lock`, `Unlock`, `Key`, `Eye`, `EyeOff`, `Info`, `Help`
- **Files** (`files/`): `Folder`, `Document`, `Image`, `Attachment`, `Cloud`, `Link`, `Archive`, `Tag`
- **Media** (`media/`): `Play`, `Pause`, `Stop`, `FastForward`, `Rewind`, `Volume`, `Mute`, `Microphone`
- **Device** (`device/`): `Battery`, `Bluetooth`, `Location`, `CloudSync`, `Camera`, `Brightness`
- Total icon count: 21 → 84

## [0.1.1] — 2026-05-29

### Fixed
- Added `repository`, `homepage`, `bugs`, `license`, and `keywords` to both package.json files
- Added README.md to published package files (now visible on npmjs.com)
- Added MIT LICENSE file

## [0.1.0] — 2026-05-29

### Added

- `@animicons/react` — 21 animated SVG icons for React web (CSS keyframes, no runtime JS during animation)
- `@animicons/react-native` — 21 animated SVG icons for React Native (react-native-reanimated, 60fps UI thread)
- **UI / System icons:** `Pulse`, `Check`, `Loader`, `Upload`, `Wifi`, `Bell`, `Star`, `Heart`
- **Healthcare icons:** `ECG`, `HeartRate`, `Lungs`, `Pill`, `Thermometer`, `DNA`, `Syringe`, `Brain`, `BloodDrop`, `Steps`, `Sleep`, `Oxygen`, `Medkit`
- Full colour customisation: `color`, `strokeColor`, `fillColor`, `secondaryColor`, `opacity`, `strokeWidth`
- Animation control: `autoPlay`, `loop`, `speed` (`slow` / `normal` / `fast`), `onAnimationEnd`
- Tree-shakeable — import only what you use
- TypeScript types exported: `IconProps`, `AnimationSpeed`
