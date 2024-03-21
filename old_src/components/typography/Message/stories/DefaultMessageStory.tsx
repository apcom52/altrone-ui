import { StoryObj } from '@storybook/react';
import { Message } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultMessageStory: StoryObj<typeof Message> = {
  name: 'Default Message',
  storyName: 'Default Message',
  render: ({ ...args }) => {
    return <Message {...args} />;
  },
  decorators: [StorybookDecorator]
};
