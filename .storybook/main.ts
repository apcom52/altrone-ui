import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
const tsconfigPaths = require('vite-tsconfig-paths');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],

  framework: {
    name: '@storybook/react-vite',

    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },

  docs: {},

  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tsconfigPaths.default()],
    });
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
