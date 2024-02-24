import { StoryObj } from '@storybook/react';
import { Toolbar, ToolbarAction, ToolbarGroup } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import React from 'react';
import { Icon } from '../../../typography';
import { Align } from '../../../../types';

export const DefaultToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Default Toolbar',
  render: ({ ...args }) => {
    return (
      <Toolbar
        {...args}
        menu={[
          {
            label: 'First menu',
            submenu: [
              { title: 'Action 1.1', onClick: () => null },
              { title: 'Action 1.2', onClick: () => null },
              { title: 'Action 1.3', onClick: () => null },
              { type: 'separator' },
              { title: 'Action 1.4', onClick: () => null }
            ]
          },
          {
            label: 'Second menu',
            submenu: [
              { title: 'Action 2.1', onClick: () => null },
              { title: 'Action 2.2', onClick: () => null }
            ]
          }
        ]}>
        <ToolbarGroup align={Align.start}>
          <ToolbarAction
            contextMenu={[
              { title: 'Action 3.1', onClick: () => null },
              { title: 'Action 3.2', onClick: () => null }
            ]}
            icon={<Icon i="face" />}
          />
          <ToolbarAction icon={<Icon i="zoom_in" />} content={() => <p>Hello, world!</p>} />
          <ToolbarAction icon={<Icon i="add" />} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarAction icon={<Icon i="play_arrow" />} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarAction icon={<Icon i="table_chart" />} />
          <ToolbarAction icon={<Icon i="pie_chart" />} />
          <ToolbarAction icon={<Icon i="title" />} />
          <ToolbarAction icon={<Icon i="shape_line" />} />
          <ToolbarAction icon={<Icon i="image" />} />
          <ToolbarAction icon={<Icon i="chat" />} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarAction icon={<Icon i="groups" />} />
        </ToolbarGroup>
        <ToolbarGroup align={Align.end}>
          <ToolbarAction icon={<Icon i="format_paint" />} />
          <ToolbarAction icon={<Icon i="bolt" />} />
        </ToolbarGroup>
      </Toolbar>
    );
  },
  decorators: [StorybookDecorator]
};
