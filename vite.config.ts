import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    /**
     * `?react` import of an .svg yields a React component (inline <svg>), a plain
     * import still yields the asset URL. svgo is off so the Figma export (blur
     * filters, foreignObject) is preserved verbatim.
     */
    svgr({ include: '**/*.svg?react', svgrOptions: { svgo: false } }),
    react(),
    tsconfigPaths(),
    dts({
      copyDtsFiles: false,
      /**
       * The generated `logos/index.d.ts` imports `*.svg?react` specifiers that
       * only resolve with vite-plugin-svgr present. Replace it with a standalone
       * declaration (component + URL per logo) derived from its own export list.
       */
      beforeWriteFile(filePath, content) {
        if (!filePath.endsWith('/logos/index.d.ts')) return;

        const names = [...content.matchAll(/export \{ (\w+), (\w+) \};/g)];
        const body = names
          .map(
            ([, Component, url]) =>
              `export declare const ${Component}: LogoComponent;\n` +
              `export declare const ${url}: string;`,
          )
          .join('\n');

        return {
          filePath,
          content:
            "import type { FunctionComponent, ComponentProps } from 'react';\n\n" +
            "type LogoComponent = FunctionComponent<ComponentProps<'svg'> & { title?: string }>;\n\n" +
            body +
            '\n',
        };
      },
    }),
  ],
  publicDir: resolve(__dirname, './src/assets'),
  build: {
    target: ['es2022'],
    lib: {
      entry: {
        index: resolve(__dirname, './src/index.ts'),
        logos: resolve(__dirname, './src/logos/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'vitest/*.tsx',
        '@fontsource',
      ],
      output: {},
    },
  },
  test: {
    environment: 'jsdom',
    exclude: ['old_src/**/*', 'node_modules', 'tests'],
    include: ['vitest/**/*.test.{ts,tsx}'],
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
