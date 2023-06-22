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
    uploadUrl: 'https://api.escuelajs.co/api/v1/files/upload'
  },
  argTypes: {
    value: { control: false },
    variant: { control: 'select' },
    maxFileSize: { control: 'number', description: 'in KB' }
  }
};

export default meta;
