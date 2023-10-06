import { Meta } from '@storybook/react';
import { NumberInput } from './index';
import { Elevation, Size, Surface } from '../../../types';

export { DefaultPasswordInputStory } from './stories';

const meta: Meta<typeof NumberInput> = {
  component: NumberInput,
  title: 'Forms/NumberInput',
  tags: ['autodocs'],
  args: {
    value: 0,
    onChange: () => null,
    leftIsland: undefined,
    rightIsland: undefined,
    prefix: '',
    suffix: '',
    leftIcon: undefined,
    rightIcon: undefined,
    errorText: '',
    hintText: '',
    size: Size.medium,
    disabled: false,
    required: false,
    showControls: true,
    Component: undefined,
    surface: Surface.paper,
    elevation: Elevation.convex,
    placeholder: 'Type your password'
  },
  argTypes: {
    value: { description: 'Inputed value' },
    onChange: { description: 'Callback is called when user changed the value in the text field' },
    leftIsland: { description: 'Left TextInput Island' },
    rightIsland: { description: 'Right TextInput Island. Do not work when showControls is true' },
    prefix: { description: 'Shortcut for text TextInput Island on the left side' },
    suffix: {
      description:
        'Shortcut for text TextInput Island on the right side. Do not work when showControls is true'
    },
    leftIcon: { description: 'Shortcut for icon TextInput Island on the left side' },
    rightIcon: {
      description:
        'Shortcut for icon TextInput Island on the left side. Do not work when showControls is true'
    },
    errorText: { description: 'Error message for TextInput' },
    hintText: { description: 'Hint message for TextInput' },
    size: { control: 'select', description: 'Size of the text input' },
    disabled: { description: 'Marks input as disabled' },
    required: { description: 'Marks input as required' },
    showControls: {
      description: 'Shows special actions for PasswordInput instead of right island'
    },
    Component: { description: 'Custom html input element' },
    surface: { control: 'select', description: 'Surface of the input' },
    elevation: { control: 'select', description: 'Shadows of the input' },
    classNames: { description: 'Custom CSS class' },
    placeholder: { description: 'Placeholder of the input' },
    allowNegative: { description: 'Allow to enter negative numbers to the input' },
    allowLeadingZeros: { description: 'Allow to enter leading zero' },
    decimalSeparator: { description: 'Separator between integer and decimal parts of the number' },
    digitsAfterDecimal: { description: 'Maximum number of digits after decimal' },
    min: { description: 'Minimum value' },
    max: { description: 'Maximum value' },
    step: { description: 'Step for increase and decrease buttons' }
  }
};

export default meta;
