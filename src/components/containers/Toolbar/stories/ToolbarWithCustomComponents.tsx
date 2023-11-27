import { StoryObj } from '@storybook/react';
import { Toolbar, ToolbarAction, ToolbarGroup } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Align, Option, Size } from '../../../../types';
import { Icon } from '../../../typography';
import React, { useState } from 'react';
import { Search, Select } from '../../../form';

const MODES: Option<string>[] = [
  { value: 'view', label: 'View' },
  { value: 'edit', label: 'Edit' }
];

export const ToolbarWithCustomComponents: StoryObj<typeof Toolbar> = {
  name: 'Toolbar with Custom Components',
  render: ({ ...args }) => {
    const [mode, setMode] = useState('view');
    const [search, setSearch] = useState('');

    return (
      <>
        <Toolbar {...args}>
          <ToolbarGroup align={Align.start}>
            <ToolbarAction icon={<Icon i="view_sidebar" />} label="Mode">
              <Select options={MODES} value={mode} onChange={setMode} size={Size.small} />
            </ToolbarAction>
            <ToolbarAction icon={<Icon i="zoom_in" />} label="Zoom" />
            <ToolbarAction icon={<Icon i="add" />} label="Add slide" disabled />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarAction
              icon={<Icon i="play_arrow" />}
              label="Play"
              hideLabel
              fluid
              usePressEffect={false}>
              <Search value={search} onChange={setSearch} />
            </ToolbarAction>
          </ToolbarGroup>
        </Toolbar>
      </>
    );
  },
  decorators: [StorybookDecorator]
};
