import { Meta } from '@storybook/react';
import { PhotoViewer } from './index';

export { DefaultPhotoViewer } from './stories';

const meta: Meta<typeof PhotoViewer> = {
  component: PhotoViewer,
  title: 'Containers/PhotoViewer',
  tags: ['autodocs'],
  args: {
    url: 'https://cdn.wallpapersafari.com/19/1/OAEcXu.jpg'
  },
  argTypes: {}
};

export default meta;
