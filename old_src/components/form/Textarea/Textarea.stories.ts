import { Meta } from '@storybook/react';
import { Textarea } from './index';
import { Elevation, Size, Surface } from '../../../types';

export { DefaultTextareaStory } from './stories';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'Forms/Textarea',
  tags: ['autodocs'],
  args: {
    value: '',
    onChange: () => null,
    errorText: '',
    hintText: '',
    size: Size.medium,
    disabled: false,
    required: false,
    surface: Surface.paper,
    elevation: Elevation.convex,
    placeholder: 'Type your password'
  },
  argTypes: {
    value: { description: 'Inputed value' },
    onChange: { description: 'Callback is called when user changed the value in the text field' },
    errorText: { description: 'Error message for TextInput' },
    hintText: { description: 'Hint message for TextInput' },
    size: { control: 'select', description: 'Size of the text input' },
    disabled: { description: 'Marks input as disabled' },
    required: { description: 'Marks input as required' },
    surface: { control: 'select', description: 'Surface of the input' },
    elevation: { control: 'select', description: 'Shadows of the input' },
    placeholder: { description: 'Placeholder of the input' }
  }
};

export default meta;
