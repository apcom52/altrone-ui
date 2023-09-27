import { Meta } from '@storybook/react';
import { CheckboxList } from './index';
import { Direction } from '../../../types';

export { DefaultCheckboxListStory } from './stories';

const meta: Meta<typeof CheckboxList> = {
  component: CheckboxList,
  title: 'Forms/CheckboxList',
  tags: ['autodocs'],
  args: {
    children: [],
    limit: 3,
    direction: Direction.vertical
  },
  argTypes: {
    children: { description: 'Inner checkboxes', control: 'none' },
    direction: { description: 'Direction of the list', control: 'select' },
    limit: {
      description: 'The number of checkboxes that will be displayed in the list by default'
    },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
