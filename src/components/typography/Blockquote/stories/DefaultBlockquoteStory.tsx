import { StoryObj } from '@storybook/react';
import { Blockquote } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultBlockquoteStory: StoryObj<typeof Blockquote> = {
  name: 'Default Blockquote',
  storyName: 'Default Blockquote',
  render: ({ ...args }) => {
    return <Blockquote {...args} />;
  },
  decorators: [StorybookDecorator]
};
