import { Meta } from '@storybook/react';
import { NavigationList } from './index';

export { SimpleNavigationList, HierarchicalNavigationList } from './stories';

const meta: Meta<typeof NavigationList> = {
  component: NavigationList,
  title: 'Lists/NavigationList',
  tags: ['autodocs'],
  args: {
    title: 'Settings'
  },
  argTypes: {}
};

export default meta;
