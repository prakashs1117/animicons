import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-native', 'react-native-svg', 'react-native-reanimated'],
  outExtension({ format }) {
    return { js: format === 'esm' ? '.esm.js' : '.js' };
  },
});
