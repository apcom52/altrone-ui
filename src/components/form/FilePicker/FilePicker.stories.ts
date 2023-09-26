import { Meta } from '@storybook/react';
import { FilePicker } from './index';

export { DefaultFilePicker, BlockFilePicker, FileIconStory } from './stories';

const meta: Meta<typeof FilePicker> = {
  component: FilePicker,
  title: 'Forms/FilePicker',
  tags: ['autodocs'],
  args: {
    url: '',
    name: 'files',
    method: 'post',
    maxFiles: 10,
    defaultValue: []
  },
  argTypes: {
    url: {
      description: 'API address to which the request will be sent'
    },
    name: {
      description: 'Body parameter name'
    },
    variant: {
      description: 'Variant of FilePicker',
      control: 'select'
    },
    maxFiles: {
      description: 'Maximum number of the files'
    },
    defaultValue: {
      description: 'Default list of the files'
    },
    onSuccess: {
      description: 'Callback is called when file was loaded successfully'
    },
    onDelete: {
      description: 'Callback is called when file was deleted successfully'
    },
    extensions: {
      description: 'Possible extensions of the files. If undefined user can upload any file'
    },
    surface: {
      description: 'Surface of the FileZone'
    },
    className: {
      description: 'Custom className'
    },
    getFileNameFunc: {
      description: 'Custom function of getting uploaded file src'
    },
    placeholder: {
      description: 'Placeholder of the input'
    },
    method: {
      description: 'API Method',
      control: 'select',
      defaultValue: 'post',
      options: ['get', 'post', 'put', 'delete']
    }
  }
};

export default meta;
