import { Meta } from '@storybook/react';
import { NavigationList } from './index';

export { SimpleNavigationList } from './stories';

const meta: Meta<typeof NavigationList> = {
  component: NavigationList,
  title: 'List/NavigationList',
  tags: ['autodocs'],
  args: {
    title: 'Settings'
  },
  argTypes: {}
};

export default meta;
