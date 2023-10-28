import { Meta } from '@storybook/react';
import { Switcher } from './index';

export { DefaultSwitcherStory } from './stories';

const meta: Meta<typeof Switcher> = {
  component: Switcher,
  title: 'Forms/Switcher',
  tags: ['autodocs'],
  args: {
    children: 'Show notifications'
  },
  argTypes: {
    children: { description: 'Content of the checkbox' },
    checked: { description: 'Checked state' },
    onChange: { description: 'Callback is called when user toggles the checkbox' },
    disabled: { description: 'Marks checkbox as disabled' },
    danger: { description: 'Marks checkbox as danger action' },
    align: { control: 'select', description: 'Alignment of the switcher' },
    errorText: { description: 'Error text of the checkbox' },
    hintText: { description: 'Hint text of the checkbox' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
