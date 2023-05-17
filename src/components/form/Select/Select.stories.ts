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
    value: { control: 'text' },
    options: { control: false },
    onChange: { control: false },
    size: { control: 'select' },
    ItemComponent: { control: false }
  }
};

export default meta;
