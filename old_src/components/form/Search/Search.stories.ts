import { Search } from './index';
import { Meta } from '@storybook/react';

export { DefaultSearch, SearchSuggestions } from './stories';

const meta: Meta<typeof Search> = {
  component: Search,
  title: 'Forms/Search',
  tags: ['autodocs'],
  args: {
    value: undefined,
    onChange: undefined
  },
  argTypes: {
    value: { control: false, description: 'Inputed value' },
    onChange: {
      control: false,
      description: 'Callback is called when user changed the value in the text field'
    },
    placeholder: { description: 'Placeholder of the input' },
    errorText: { description: 'Error message for Search' },
    hintText: { description: 'Hint message for Search' },
    size: { control: 'select', description: 'Size of the text input' },
    disabled: { description: 'Marks input as disabled' },
    required: { description: 'Marks input as required' },
    Component: { description: 'Custom html input element' },
    suggestions: { description: 'List of suggestions for inputed value. ' },
    useLiveSuggestions: {
      description:
        'If true the first matching suggestion will be displayed directly in the input field'
    },
    loading: {
      description: 'If true Loading component will be used as right island'
    },
    surface: { control: 'select', description: 'Surface of the input' },
    elevation: { control: 'select', description: 'Shadows of the input' },
    classNames: { control: false, description: 'Custom CSS class' }
  }
};

export default meta;
