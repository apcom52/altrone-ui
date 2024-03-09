import { StoryObj } from '@storybook/react';
import { Dropdown } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DropdownStory: StoryObj<typeof Dropdown> = {
  name: 'Default Dropdown',
  storyName: 'Default Dropdown',
  render: ({ ...args }) => {
    return <div>dropdown</div>;
  },
  decorators: [StorybookDecorator]
};
