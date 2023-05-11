import { StoryObj } from '@storybook/react';
import { Progress, ProgressVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultProgress: StoryObj<typeof Progress> = {
  name: 'Default Progress',
  render: ({ ...args }) => {
    return <Progress {...args} variant={ProgressVariant.default} />;
  },
  decorators: [StorybookDecorator]
};
