import { StoryObj } from '@storybook/react';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import React, { useState } from 'react';
import { Button } from '../../../form';
import { ContextMenu } from '../index';
import { ContextMenuType } from '../../../../types';

export const NewActionTypeForContextMenuStory: StoryObj<typeof ContextMenu> = {
  name: 'Context Menu with new action types',
  storyName: 'Context Menu with new action types',
  render: ({ menu }) => {
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [radioListValue, setRadioListValue] = useState<unknown>(false);
    const [viewMode, setViewMode] = useState<unknown>('list');

    const dropdownMenu: ContextMenuType = [
      ...menu,
      {
        type: 'separator'
      },
      {
        type: 'checkbox',
        title: 'Private mode',
        onChange: setCheckboxChecked,
        checked: checkboxChecked
      },
      {
        type: 'radioList',
        title: 'Show comments',
        value: radioListValue,
        options: [
          { label: 'Only my comments', value: 'my' },
          { label: 'Me and friends', value: 'friends' },
          { label: 'All comments', value: 'all' }
        ],
        onChange: setRadioListValue
      },
      {
        title: 'View mode',
        children: [
          {
            type: 'radioList',
            value: viewMode,
            onChange: setViewMode,
            options: [
              { label: 'List', value: 'list' },
              { label: 'Grid', value: 'grid' }
            ]
          }
        ]
      }
    ];

    return (
      <div>
        <Button dropdown={dropdownMenu}>Open menu</Button>
      </div>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
