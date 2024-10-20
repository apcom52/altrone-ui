import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
const tsconfigPaths = require('vite-tsconfig-paths');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
  docs: {},
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tsconfigPaths.default()],
    });
  },
};
export default config;
