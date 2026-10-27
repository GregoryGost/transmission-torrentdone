import { defineConfig } from 'tsup';

export default defineConfig({
  outDir: 'dist',
  entry: ['src/index.ts'],
  target: 'node26',
  format: ['cjs'],
  // Runtime packages must be bundled because deployed dist/index.js runs without node_modules.
  noExternal: ['log4js', 'nconf'],
  minify: true,
  treeshake: true,
  clean: true,
  splitting: false,
  sourcemap: false,
  dts: false
});
