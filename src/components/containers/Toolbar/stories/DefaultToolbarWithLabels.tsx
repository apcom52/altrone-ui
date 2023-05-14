import { StoryObj } from '@storybook/react';
import { Toolbar, ToolbarAction, ToolbarGroup } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Align } from '../../../../types';
import { Icon } from '../../../icons';
import React from 'react';

export const DefaultToolbarWithLabels: StoryObj<typeof Toolbar> = {
  name: 'Default Toolbar with labels',
  render: ({ ...args }) => {
    return (
      <>
        <Toolbar {...args}>
          <ToolbarGroup align={Align.start}>
            <ToolbarAction icon={<Icon i="view_sidebar" />} label="View" />
            <ToolbarAction icon={<Icon i="zoom_in" />} label="Zoom" />
            <ToolbarAction icon={<Icon i="add" />} label="Add slide" />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarAction icon={<Icon i="play_arrow" />} label="Play" />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarAction icon={<Icon i="table_chart" />} label="Table" />
            <ToolbarAction icon={<Icon i="pie_chart" />} label="Chart" />
            <ToolbarAction icon={<Icon i="title" />} label="Text" />
            <ToolbarAction icon={<Icon i="shape_line" />} label="Shapes" />
            <ToolbarAction icon={<Icon i="image" />} label="Image" />
            <ToolbarAction icon={<Icon i="chat" />} label="Comment" />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarAction icon={<Icon i="groups" />} label="Collaborate" />
          </ToolbarGroup>
          <ToolbarGroup align={Align.end}>
            <ToolbarAction icon={<Icon i="format_paint" />} label="Format" />
            <ToolbarAction icon={<Icon i="bolt" />} label="Animation" />
          </ToolbarGroup>
        </Toolbar>
      </>
    );
  },
  decorators: [StorybookDecorator]
};
