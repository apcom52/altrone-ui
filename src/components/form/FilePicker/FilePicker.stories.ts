import { Meta } from '@storybook/react';
import { FilePicker, FilePickerVariant } from './index';
import { Surface } from '../../../types';

export { DefaultFilePicker, BlockFilePicker, FileIconStory } from './stories';

const meta: Meta<typeof FilePicker> = {
  component: FilePicker,
  title: 'Forms/FilePicker',
  tags: ['autodocs'],
  args: {
    url: '',
    name: 'files',
    method: 'POST',
    maxFiles: 1,
    defaultValue: []
  },
  argTypes: {}
};

export default meta;
