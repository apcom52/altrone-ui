import { Meta } from '@storybook/react';
import { PhotoViewer } from './index';

export { DefaultPhotoViewer } from './stories';

const meta: Meta<typeof PhotoViewer> = {
  component: PhotoViewer,
  title: 'Containers/PhotoViewer',
  tags: ['autodocs'],
  args: {},
  argTypes: {}
};

export default meta;
