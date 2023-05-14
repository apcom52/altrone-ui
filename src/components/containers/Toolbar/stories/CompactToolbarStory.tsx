import { StoryObj } from '@storybook/react';
import { Toolbar, ToolbarAction, ToolbarGroup, ToolbarVariant } from '../index';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import React from 'react';
import { Icon } from '../../../icons';

export const CompactToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Compact Toolbar',
  render: ({ ...args }) => {
    return (
      <Toolbar {...args} variant={ToolbarVariant.compact}>
        <ToolbarGroup>
          <ToolbarAction icon={<Icon i="image" />} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarAction icon={<Icon i="wallpaper" />} label="Remove background" />
          <ToolbarAction icon={<Icon i="crop" />} label="Crop" />
          <ToolbarAction icon={<Icon i="filter_vintage" />} label="Effects" />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarAction icon={<Icon i="gradient" />} />
          <ToolbarAction icon={<Icon i="layers" />} />
          <ToolbarAction icon={<Icon i="opacity" />} />
        </ToolbarGroup>
      </Toolbar>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
