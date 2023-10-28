import { StoryObj } from '@storybook/react';
import { DatePicker } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultDatePickerStory: StoryObj<typeof DatePicker> = {
  name: 'Default DatePicker',
  storyName: 'Default DatePicker',
  render: ({ ...args }) => {
    return <DatePicker {...args} />;
  },
  decorators: [StorybookDecorator]
};
