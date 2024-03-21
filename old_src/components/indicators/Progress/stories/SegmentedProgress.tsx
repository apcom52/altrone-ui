import { StoryObj } from '@storybook/react';
import { Progress, ProgressVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const SegmentedProgress: StoryObj<typeof Progress> = {
  name: 'Segmented Progress',
  render: ({ ...args }) => {
    return <Progress {...args} variant={ProgressVariant.segmented} />;
  },
  decorators: [StorybookDecorator]
};
