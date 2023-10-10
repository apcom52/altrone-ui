import { Meta } from '@storybook/react';
import { Checkbox } from './index';

export { DefaultCheckboxStory } from './stories';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Forms/Checkbox',
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
    errorText: { description: 'Error text of the checkbox' },
    hintText: { description: 'Hint text of the checkbox' },
    className: { description: 'Custom CSS class' },
    CheckIconComponent: { description: 'Custom check icon' }
  }
};

export default meta;
