import { StoryObj } from '@storybook/react';
import { Toolbar, ToolbarAction, ToolbarGroup } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import React from 'react';
import { Icon } from '../../../icons';
import { Align } from '../../../../types';

export const DefaultToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Default Toolbar',
  render: ({ ...args }) => {
    return (
      <Toolbar {...args}>
        <ToolbarGroup align={Align.start}>
          <ToolbarAction icon={<Icon i="view_sidebar" />} />
          <ToolbarAction icon={<Icon i="zoom_in" />} />
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
