import { StoryObj } from '@storybook/react';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import React from 'react';
import { Button } from '../../../form';
import { ContextMenu } from '../index';

export const DefaultContextMenu: StoryObj<typeof ContextMenu> = {
  name: 'Default Context Menu',
  storyName: 'Default Context Menu',
  render: ({ menu }) => {
    return (
      <div>
        <Button dropdown={menu}>Open menu</Button>
      </div>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
