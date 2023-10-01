import { Meta } from '@storybook/react';
import { TabList } from './index';

export { DefaultTabListStory, BorderTabListStory, SolidTabListStory } from './stories';

const meta: Meta<typeof TabList> = {
  component: TabList,
  title: 'Lists/TabList',
  tags: ['autodocs'],
  args: {
    tabs: [
      { label: 'Dashboard', value: 'dashboard' },
      { label: 'Accounts', value: 'accounts' },
      { label: 'Features', value: 'features' },
      { label: 'Help', value: 'help' }
    ]
  },
  argTypes: {
    tabs: { description: 'List of tabs' },
    selected: { description: 'Selected tab' },
    onChange: { description: 'Callback is called when user clicks on the tab' },
    variant: { control: 'select', description: 'Variant of TabList' },
    fluid: { description: 'If true TabList takes all available width' },
    showCloseButtons: {
      description: 'Show close button for each tab. Works only with solid variant'
    },
    showAddTabButton: {
      description: 'Show add button for each tab. Works only with solid variant'
    },
    onCloseTab: { description: 'Callback is called when user closes the tab' },
    onAddTab: { description: 'Callback is called when user clicks on "Add" button' },
    align: { control: 'select', description: 'Alignment of TabList' }
  }
};

export default meta;
