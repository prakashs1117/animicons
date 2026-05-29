# Changelog

All notable changes to this project will be documented in this file.

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
