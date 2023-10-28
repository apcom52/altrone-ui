import { Meta } from '@storybook/react';
import { Select } from './index';

export { DefaultSelect, SelectWithParents, SelectWithCustomOptions } from './stories';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Forms/Select',
  tags: ['autodocs'],
  args: {
    value: undefined,
    searchable: false,
    clearable: false
  },
  argTypes: {
    value: { control: 'text', description: 'Selected option' },
    options: { control: false, description: 'List of the options' },
    onChange: { control: false, description: 'Callback is called when user selects an option' },
    parents: { description: 'List of groups of the options' },
    searchable: { description: 'If true user can search throughout the list of options. ' },
    clearable: { description: 'If true user can select undefined option.' },
    searchFunc: { description: 'Custom search function (when searchable is true)' },
    ItemComponent: { control: false, description: 'Custom Select option component' },
    size: { control: 'select', description: 'Size of the Select' },
    surface: { control: 'select', description: 'Surface of the Select' },
    elevation: { control: 'select', description: 'Elevation of the Select' },
    errorText: { description: 'Error text' },
    hintText: { description: 'Hint text' },
    classNames: { description: 'Custom CSS class' }
  }
};

export default meta;
