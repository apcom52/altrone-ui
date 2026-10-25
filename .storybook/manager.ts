import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'altrone.dev',
    brandImage: '/logo-dev.png',
    colorPrimary: '#3E63DD',
    colorSecondary: '#3E63DD',
  }),
});
