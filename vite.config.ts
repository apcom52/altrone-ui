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
    globals: true,
    environment: 'jsdom',
    exclude: ['old_src/**/*', 'node_modules', 'tests'],
    setupFiles: ['./vitest/vitest.setup.ts'],
  },
});
