import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F9FAFB',
        },
        {
          name: 'dark',
          value: '#111928',
        },
        {
          name: 'With background image',
          value: 'image',
        },
      ],
    },
  },
  globalTypes: {
    lang: {
      description: 'Current language of the app',
      defaultValue: 'EN',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: ['EN', 'RU'],
        dynamicTitle: true,
      },
    },
    loading: {
      control: 'check',
      description: 'If true then application is loading',
      toolbar: {
        title: 'Loading',
        items: [true, false],
      },
    },
  },
};

export default preview;
