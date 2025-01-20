import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts()],
  publicDir: resolve(__dirname, './src/assets'),
  build: {
    target: ['es2022'],
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'Altrone',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'vitest/*.tsx',
        '@fontsource',
      ],
      output: {
        banner: `'use client';`,
      },
    },
  },
  test: {
    environment: 'jsdom',
    exclude: ['old_src/**/*', 'node_modules', 'tests'],
    include: ['vitest/**/*'],
    setupFiles: ['./vitest/vitest.setup.ts'],
    globals: true,
    resolve: {
      alias: {
        components: resolve(__dirname, './src/components'),
        hooks: resolve(__dirname, './src/hooks'),
        types: resolve(__dirname, './src/types'),
        utils: resolve(__dirname, './src/utils'),
        locales: resolve(__dirname, './src/locales'),
      },
    },
  },
});
