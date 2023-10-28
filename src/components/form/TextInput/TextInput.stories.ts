import { Meta } from '@storybook/react';
import { TextInput } from './index';

export {
  DefaultTextInputStory,
  LeftIslandWithTextStory,
  RightIslandWithIconStory,
  BothIslandTextInputStory,
  TextInputSuggestionsStory,
  TextInputLiveSuggestionsStory
} from './stories';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'Forms/TextInput',
  tags: ['autodocs'],
  args: {
    placeholder: 'Type something'
  },
  argTypes: {
    value: { description: 'Inputed value' },
    onChange: { description: 'Callback is called when user changed the value in the text field' },
    leftIsland: { description: 'Left TextInput Island' },
    rightIsland: { description: 'Right TextInput Island' },
    prefix: { description: 'Shortcut for text TextInput Island on the left side' },
    suffix: { description: 'Shortcut for text TextInput Island on the right side' },
    leftIcon: { description: 'Shortcut for icon TextInput Island on the left side' },
    rightIcon: { description: 'Shortcut for icon TextInput Island on the left side' },
    errorText: { description: 'Error message for TextInput' },
    hintText: { description: 'Hint message for TextInput' },
    size: { description: 'Size of the text input' },
    disabled: { description: 'Marks input as disabled' },
    required: { description: 'Marks input as required' },
    Component: { description: 'Custom html input element' },
    placeholder: { description: 'Placeholder of the input' },
    suggestions: { description: 'List of suggestions for inputed value. ' },
    useLiveSuggestions: {
      description:
        'If true the first matching suggestion will be displayed directly in the input field'
    },
    loading: { description: 'If true Loading component will be used as right island' },
    surface: { description: 'Surface of the input' },
    elevation: { description: 'Shadows of the input' },
    classNames: { description: 'Custom CSS class' }
  }
};

export default meta;
