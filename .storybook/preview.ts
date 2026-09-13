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
        solid: { name: 'Solid', value: 'var(--background-1)' },
        amber: { name: 'Amber', value: 'color(display-p3 1 0.77 0.26)' },
        indigo: { name: 'Indigo', value: 'color(display-p3 0.357 0.357 0.81)' },
        /* Token-based patterns. `StorybookDecorator` stamps `data-altrone-root`
           / `data-altrone-accent` onto `<html>` (theme is already mirrored
           there), so `--gray-*` / `--background-*` / `--accent-*` and their
           dark overrides resolve on `<body>`, where these are painted. */
        accentPattern: {
          name: 'Accent color pattern',
          value:
            'radial-gradient(var(--accent-4) 17%, var(--accent-3) 18% 35%, transparent 36.5%) -20px -20px / 80px 80px, radial-gradient(var(--accent-4) 17%, var(--accent-3) 18% 35%, transparent 36.5%) 20px 20px / 80px 80px, radial-gradient(var(--accent-3) 34%, var(--accent-4) 36% 68%, transparent 70%) 0 0 / 40px 40px, repeating-linear-gradient(45deg, var(--accent-4) -12.5% 12.5%, var(--accent-3) 0 37.5%) 0 0 / 80px 80px var(--accent-2)',
        },
        gridPattern: {
          name: 'Grid',
          value:
            'linear-gradient(var(--gray-a6) 1px, transparent 1px) -1px -1px / 50px 50px, linear-gradient(90deg, var(--gray-a6) 1px, transparent 1px) -1px -1px / 50px 50px, linear-gradient(var(--gray-a4) 0.5px, transparent 0.5px) -0.5px -0.5px / 10px 10px, linear-gradient(90deg, var(--gray-a4) 0.5px, var(--background-1) 0.5px) -0.5px -0.5px / 10px 10px var(--background-1)',
        },
        wavyPattern: {
          name: 'Wavy',
          value:
            'repeating-radial-gradient(circle at 0 0, transparent 0, var(--background-1) 10px), repeating-linear-gradient(var(--accent-a6), var(--accent-9)) var(--background-1)',
        },
        chessPattern: {
          name: 'Chess',
          value:
            'linear-gradient(45deg, var(--gray-a4) 25%, transparent 25%, transparent 75%, var(--gray-a4) 75%) 0 0 / 20px 20px, linear-gradient(-45deg, var(--gray-a4) 25%, transparent 25%, transparent 75%, var(--gray-a4) 75%) 0 0 / 20px 20px var(--background-1)',
        },
        dotsGridPattern: {
          name: 'Dots Grid',
          value:
            'radial-gradient(circle, var(--gray-a6) 1.2px, transparent 1.2px) 0 0 / 15px 15px var(--background-1)',
        },
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
    reduceMotion: {
      description: 'Simulate prefers-reduced-motion',
      defaultValue: 'off',
      toolbar: {
        title: 'Motion',
        icon: 'lightning',
        items: [
          { value: 'off', icon: 'lightning', title: 'Motion' },
          { value: 'on', icon: 'lightningoff', title: 'Reduced motion' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    reduceMotion: 'off',
  },
};

export default preview;
