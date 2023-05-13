import { StoryObj } from '@storybook/react';
import { Toolbar } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Default Toolbar',
  render: ({ ...args }) => {
    return <>default toolbar</>;
  },
  decorators: [StorybookDecorator]
};
