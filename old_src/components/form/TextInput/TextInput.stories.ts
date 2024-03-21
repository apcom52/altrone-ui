import { Meta } from '@storybook/react';
import { TextInput } from './index';
import { TextInputProps } from './TextInput.types';
import { Elevation, Surface } from '../../../types';

export {
  DefaultTextInputStory,
  LeftIslandWithTextStory,
  RightIslandWithIconStory,
  BothIslandTextInputStory,
  TextInputSuggestionsStory,
  TextInputLiveSuggestionsStory
} from './stories';

const meta: Meta<TextInputProps> = {
  component: TextInput,
  title: 'Forms/TextInput',
  tags: ['autodocs'],
  args: {},
  argTypes: {
    value: { description: 'Inputed value' },
    onChange: { description: 'Callback is called when user changed the value in the text field' },
    errorText: { description: 'Error message for TextInput' },
    hintText: { description: 'Hint message for TextInput' },
    size: { description: 'Size of the text input' },
    disabled: { description: 'Marks input as disabled' },
    required: { description: 'Marks input as required' },
    Component: { description: 'Custom html input element' },
    placeholder: { control: 'text', description: 'Placeholder of the input' },
    suggestions: { description: 'List of suggestions for inputed value. ' },
    useLiveSuggestions: {
      description:
        'If true the first matching suggestion will be displayed directly in the input field'
    },
    loading: { description: 'If true Loading component will be used as right island' },
    surface: {
      control: 'select',
      description: 'Surface of the input',
      options: [Surface.none, Surface.transparent, Surface.solid, Surface.glass, Surface.metal]
    },
    elevation: {
      control: 'select',
      description: 'Shadows of the input',
      options: [
        Elevation.flat,
        Elevation.convex,
        Elevation.raised,
        Elevation.floating,
        Elevation.flying
      ]
    },
    classNames: { description: 'Custom CSS class' }
  }
};

export default meta;
