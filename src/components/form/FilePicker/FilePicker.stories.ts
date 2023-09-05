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
      description: 'Url to upload'
    },
    name: {
      description: 'Name which will be used in request body'
    },
    variant: {
      description: 'Variant of the FilePicker',
      control: 'select'
    },
    maxFiles: {
      description: 'Maximum number of the files'
    },
    defaultValue: {
      description: 'Default array of uploaded files to the server'
    },
    onSuccess: {
      description: 'Callback is called when user successfully uploaded file to the server'
    },
    onDelete: {
      description: 'Callback is called when user deleted file'
    },
    extensions: {
      description: 'Allowed extensions or group of extensions'
    },
    surface: {
      description: 'Surface of the FileZone'
    },
    className: {
      description: 'Custom className'
    },
    getFileNameFunc: {
      description: 'This function transforms response from uploading request into filename'
    },
    method: {
      description: 'Method of the url',
      control: 'select',
      defaultValue: 'post',
      options: ['get', 'post', 'put', 'delete']
    }
  }
};

export default meta;
