import { StoryObj } from '@storybook/react';
import { Calendar } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultCalendarStory: StoryObj<typeof Calendar> = {
  name: 'Default Calendar',
  storyName: 'Default Calendar',
  render: ({ ...args }) => {
    return <Calendar {...args} />;
  },
  decorators: [StorybookDecorator]
};
