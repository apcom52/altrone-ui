import { StoryObj } from '@storybook/react';
import { Icon } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultIconStory: StoryObj<typeof Icon> = {
  name: 'Default Icon',
  storyName: 'Default Icon',
  render: ({ ...args }) => {
    return <Icon {...args} />;
  },
  decorators: [StorybookDecorator]
};
