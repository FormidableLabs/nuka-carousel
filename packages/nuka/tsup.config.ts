import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  target: 'es6',
  injectStyle: true,
});
