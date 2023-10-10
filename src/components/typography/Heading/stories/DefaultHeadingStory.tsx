import { StoryObj } from '@storybook/react';
import { Heading } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultHeadingStory: StoryObj<typeof Heading> = {
  name: 'Default Heading',
  storyName: 'Default Heading',
  render: ({ ...args }) => {
    return <Heading {...args} />;
  },
  decorators: [StorybookDecorator]
};
