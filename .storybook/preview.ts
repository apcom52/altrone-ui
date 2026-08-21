import type { Preview } from '@storybook/react';
import '../src/global/storybook/preview.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: 'color(display-p3 0.113 0.125 0.14)' },
        light: { name: 'Light', value: 'color(display-p3 0.988 0.988 0.992)' },
        amber: { name: 'Amber', value: 'color(display-p3 1 0.77 0.26)' },
        indigo: { name: 'Indigo', value: 'color(display-p3 0.357 0.357 0.81)' },
        mountains: {
          name: 'El Capitan',
          value:
            'url(https://c4.wallpaperflare.com/wallpaper/169/459/748/apple-mac-os-x-el-capitan-wallpaper-preview.jpg)',
        },
        darkImage: {
          name: 'Deep space',
          value:
            'url(https://wallpapercat.com/w/full/5/3/f/194354-3840x2160-desktop-4k-outer-space-background.jpg)',
        },
        neutralImage: {
          name: 'Tahoe',
          value:
            'url(https://images.unsplash.com/photo-1552083375-1447ce886485?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFrZSUyMHRhaG9lfGVufDB8fDB8fHww)',
        },
        brightImage: {
          name: 'Abstract',
          value:
            'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuR0Yx-WLk4Wm8BXqYsffDPMlMsWIwfHs_Iw&s)',
        },
      },
    },
  },
  globalTypes: {
    theme: {
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    lang: {
      description: 'Language',
      defaultValue: 'EN',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: ['EN', 'RU', 'FR', 'GE', 'SP'],
        dynamicTitle: true,
      },
    },
    loading: {
      description: 'Loading',
      defaultValue: 'Default',
      toolbar: {
        icon: 'hourglass',
        title: 'Loading',
        items: ['Loading', 'Default'],
        dynamicTitle: true,
      },
    },
    accent: {
      description: 'Accent color',
      defaultValue: 'blue',
      toolbar: {
        icon: 'palette',
        title: 'Accent',
        items: [
          { title: 'Red', value: 'red' },
          { title: 'Orange', value: 'orange' },
          { title: 'Amber', value: 'amber' },
          { title: 'Green', value: 'green' },
          { title: 'Teal', value: 'teal' },
          { title: 'Blue', value: 'blue' },
          { title: 'Indigo', value: 'indigo' },
          { title: 'Purple', value: 'purple' },
          { title: 'Pink', value: 'pink' },
          { title: 'Brown', value: 'brown' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
};

export default preview;
