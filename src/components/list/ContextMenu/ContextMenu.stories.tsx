import { Meta } from '@storybook/react';
import { ContextMenu } from './index';
import { Icon } from '../../typography';
import React from 'react';

export {
  DefaultContextMenu,
  NewActionTypeForContextMenuStory,
  ContextMenuWithExtraElements
} from './stories';

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  title: 'Lists/ContextMenu',
  tags: ['autodocs'],
  args: {
    menu: [
      { title: 'Cut', icon: <Icon i="content_cut" />, onClick: () => alert('Cut') },
      { title: 'Copy', icon: <Icon i="content_copy" />, onClick: () => alert('Copy') },
      { title: 'Paste', icon: <Icon i="content_paste" />, onClick: () => alert('Paste') },
      {
        title: 'More actions',
        children: [
          {
            title: 'Rename',
            icon: <Icon i="drive_file_rename_outline" />,
            onClick: () => alert('Rename')
          },
          {
            title: 'Delete',
            icon: <Icon i="delete_outline" />,
            danger: true,
            onClick: () => alert('Delete')
          }
        ]
      }
    ]
  },
  argTypes: {
    menu: { description: 'Menu items' },
    onClose: { description: 'Callback is called when user initiated closing of the menu' },
    fluid: { control: false, description: 'If true the menu takes up the entire available width' },
    maxHeight: { control: false, description: 'Set max height of the menu' }
  }
};

export default meta;
