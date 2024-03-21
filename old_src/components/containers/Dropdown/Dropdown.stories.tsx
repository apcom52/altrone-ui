import { Meta } from '@storybook/react';
import { Dropdown } from './index';

export { DropdownStory } from './stories';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'Containers/Dropdown',
  tags: ['autodocs'],
  args: {
    width: '100%'
  },
  argTypes: {}
};

export default meta;
