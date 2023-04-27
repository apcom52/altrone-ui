import { Meta } from '@storybook/react';
import { FilePicker, FilePickerVariant } from './index';
import { Surface } from '../../../types';

export { DefaultFilePicker, BlockFilePicker } from './stories';

const meta: Meta<typeof FilePicker> = {
  component: FilePicker,
  title: 'Forms/FilePicker',
  tags: ['autodocs'],
  args: {
    value: undefined,
    onChange: undefined,
    variant: FilePickerVariant.default,
    surface: Surface.glass,
    multiple: false,
    maxFileSize: 1024
  },
  argTypes: {
    value: { control: false },
    variant: { control: 'select' },
    maxFileSize: { control: 'number', description: 'in KB' }
  }
};

export default meta;
