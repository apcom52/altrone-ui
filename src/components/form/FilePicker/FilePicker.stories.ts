import { Meta } from '@storybook/react';
import { FilePicker, FilePickerVariant } from './index';
import { Surface } from '../../../types';

export { DefaultFilePicker, BlockFilePicker, FileIconStory } from './stories';

const meta: Meta<typeof FilePicker> = {
  component: FilePicker,
  title: 'Forms/FilePicker',
  tags: ['autodocs'],
  args: {
    url: 'http://localhost:8000/api/cloud/upload',
    name: 'files',
    method: 'post',
    maxFiles: 10,
    defaultValue: []
  },
  argTypes: {
    method: {
      control: 'select',
      defaultValue: 'post',
      options: ['get', 'post', 'put', 'delete']
    }
  }
};

export default meta;
