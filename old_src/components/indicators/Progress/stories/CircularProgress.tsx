import { StoryObj } from '@storybook/react';
import { Progress, ProgressVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';

export const CircularProgress: StoryObj<typeof Progress> = {
  name: 'Circular Progress',
  render: ({ ...args }) => {
    return <Progress {...args} variant={ProgressVariant.circular} />;
  },
  decorators: [StorybookDecorator]
};
