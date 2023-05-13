import { StoryObj } from '@storybook/react';
import { Toolbar } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const CompactToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Compact Toolbar',
  render: ({ ...args }) => {
    return <>compact toolbar</>;
  },
  decorators: [StorybookDecorator]
};
