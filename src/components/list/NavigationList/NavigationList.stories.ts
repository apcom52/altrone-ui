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
  argTypes: {
    list: { description: 'Structure of the navigation' },
    selected: { description: 'Selected item' },
    onChange: { description: 'Callback is called when user selects new list item' },
    title: { description: 'Title of the menu' },
    action: { description: 'Action in the top right corner of the list' },
    compact: { description: 'Makes the list compact' },
    NavigationItemComponent: { description: 'Custom top level item component' },
    NavigationSubItemComponent: { description: 'Custom second level item component' },
    NavigationSubSubItemComponent: { description: 'Custom third level item component' },
    surface: { description: 'Surface of the list' },
    elevation: { description: 'Shadows of the list' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
