import { StoryObj } from '@storybook/react';
import { Toolbar } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import React from 'react';
import { Icon } from '../../../typography';
import { Align } from '../../../../types';
import { Dropdown } from '../../Dropdown';
import { Popover } from '../../Popover';

export const DefaultToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Default Toolbar',
  render: ({ ...args }) => {
    return (
      <Toolbar {...args}>
        <Toolbar.Menu>
          <Dropdown
            content={
              <Dropdown.Menu>
                <Dropdown.Action label="Action 1.1" />
                <Dropdown.Action label="Action 1.2" />
                <Dropdown.Action label="Action 1.3" />
                <Dropdown.Divider />
                <Dropdown.Action label="Action 1.4" />
              </Dropdown.Menu>
            }>
            <Toolbar.MenuItem label="First menu" />
          </Dropdown>
          <Dropdown
            content={
              <Dropdown.Menu>
                <Dropdown.Action label="Action 2.1" />
                <Dropdown.Action label="Action 2.2" />
              </Dropdown.Menu>
            }>
            <Toolbar.MenuItem label="Second menu" />
          </Dropdown>
        </Toolbar.Menu>
        <Toolbar.Group>
          <Dropdown
            content={
              <Dropdown.Menu>
                <Dropdown.Action label="Action 3.1" />
                <Dropdown.Action label="Action 3.2" />
              </Dropdown.Menu>
            }>
            <Toolbar.Action icon={<Icon i="face" />} />
          </Dropdown>
          <Popover enabled={true} content={<>Hello, world!</>}>
            <Toolbar.Action icon={<Icon i="zoom_in" />} />
          </Popover>
          <Toolbar.Action icon={<Icon i="add" />} />
        </Toolbar.Group>
        <Toolbar.Group>
          <Toolbar.Action icon={<Icon i="play_arrow" />} />
        </Toolbar.Group>
        <Toolbar.Group>
          <Toolbar.Action icon={<Icon i="table_chart" />} />
          <Toolbar.Action icon={<Icon i="pie_chart" />} />
          <Toolbar.Action icon={<Icon i="title" />} />
          <Toolbar.Action icon={<Icon i="shape_line" />} />
          <Toolbar.Action icon={<Icon i="image" />} />
          <Toolbar.Action icon={<Icon i="chat" />} />
        </Toolbar.Group>
        <Toolbar.Group>
          <Toolbar.Action icon={<Icon i="groups" />} />
        </Toolbar.Group>
        <Toolbar.Group align={Align.end}>
          <Toolbar.Action icon={<Icon i="format_paint" />} />
          <Toolbar.Action icon={<Icon i="bolt" />} />
        </Toolbar.Group>
      </Toolbar>
    );
  },
  decorators: [StorybookDecorator]
};
