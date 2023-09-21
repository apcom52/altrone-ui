import { StoryObj } from '@storybook/react';
import { Carousel } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultCarousel: StoryObj<typeof Carousel> = {
  storyName: 'Default Carousel',
  render: ({ ...args }) => {
    return <Carousel {...args} />;
  },
  decorators: [StorybookDecorator]
};
