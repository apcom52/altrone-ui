import { Meta } from '@storybook/react';
import { FilePicker, FilePickerVariant } from './index';
import { Surface } from '../../../types';

export { DefaultFilePicker, BlockFilePicker, FileIconStory } from './stories';

const meta: Meta<typeof FilePicker> = {
  component: FilePicker,
  title: 'Forms/FilePicker',
  tags: ['autodocs'],
  args: {},
  argTypes: {}
};

export default meta;
