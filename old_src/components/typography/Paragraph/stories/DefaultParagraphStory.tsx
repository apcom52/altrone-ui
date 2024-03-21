import { StoryObj } from '@storybook/react';
import { Paragraph } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultParagraphStory: StoryObj<typeof Paragraph> = {
  name: 'Default Paragraph',
  storyName: 'Default Paragraph',
  render: ({ ...args }) => {
    return (
      <Paragraph {...args}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aspernatur at atque, beatae
        consectetur consequuntur dolores, ducimus ea ex harum illum laborum nesciunt praesentium
        quidem sapiente sequi sint temporibus totam!
      </Paragraph>
    );
  },
  decorators: [StorybookDecorator]
};
