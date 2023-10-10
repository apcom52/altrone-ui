import { Meta } from '@storybook/react';
import { ScrollableSelector } from './index';

export { DefaultScrollableSelector, CustomScrollableSelector } from './stories';

const meta: Meta<typeof ScrollableSelector> = {
  component: ScrollableSelector,
  title: 'Forms/ScrollableSelector',
  tags: ['autodocs'],
  args: {
    options: [
      { label: 'January', value: 1 },
      { label: 'February', value: 2 },
      { label: 'March', value: 3 },
      { label: 'April', value: 4 },
      { label: 'May', value: 5 },
      { label: 'June', value: 6 },
      { label: 'July', value: 7 },
      { label: 'August', value: 8 },
      { label: 'September', value: 9 },
      { label: 'October', value: 10 },
      { label: 'November', value: 11 },
      { label: 'December', value: 12 }
    ]
  },
  argTypes: {
    value: { description: 'Selected value' },
    options: { description: 'List of the options' },
    onChange: { description: 'Callback is called when user chooses new value' },
    disabled: { description: 'Marks select as disabled' },
    align: { control: 'select', description: 'Set alignment of the list' },
    ScrollableSelectorOptionComponent: { control: false, description: 'Custom Option component' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
