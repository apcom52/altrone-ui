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
    value: { control: false }
  }
};

export default meta;
