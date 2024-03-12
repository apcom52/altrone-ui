import { StoryObj } from '@storybook/react';
import { Toolbar } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Align } from '../../../../types';
import { Icon } from '../../../typography';
import React from 'react';

export const DefaultToolbarWithLabels: StoryObj<typeof Toolbar> = {
  name: 'Default Toolbar with labels',
  render: ({ ...args }) => {
    return (
      <>
        <Toolbar {...args}>
          <Toolbar.Group align={Align.start}>
            <Toolbar.Action icon={<Icon i="view_sidebar" />} label="View" />
            <Toolbar.Action icon={<Icon i="zoom_in" />} label="Zoom" />
            <Toolbar.Action icon={<Icon i="add" />} label="Add slide" />
          </Toolbar.Group>
          <Toolbar.Group>
            <Toolbar.Action icon={<Icon i="play_arrow" />} label="Play" />
          </Toolbar.Group>
          <Toolbar.Group>
            <Toolbar.Action icon={<Icon i="table_chart" />} label="Table" />
            <Toolbar.Action icon={<Icon i="pie_chart" />} label="Chart" />
            <Toolbar.Action icon={<Icon i="title" />} label="Text" />
            <Toolbar.Action icon={<Icon i="shape_line" />} label="Shapes" />
            <Toolbar.Action icon={<Icon i="image" />} label="Image" />
            <Toolbar.Action icon={<Icon i="chat" />} label="Comment" />
          </Toolbar.Group>
          <Toolbar.Group>
            <Toolbar.Action icon={<Icon i="groups" />} label="Collaborate" />
          </Toolbar.Group>
          <Toolbar.Group align={Align.end}>
            <Toolbar.Action icon={<Icon i="format_paint" />} label="Format" />
            <Toolbar.Action icon={<Icon i="bolt" />} label="Animation" />
          </Toolbar.Group>
        </Toolbar>
      </>
    );
  },
  decorators: [StorybookDecorator]
};
