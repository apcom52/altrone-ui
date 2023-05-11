import { Meta } from '@storybook/react';
import { Role, Size } from '../../../types';
import { Progress } from './index';

export { DefaultProgress, SegmentedProgress, CircularProgress } from './stories';

const meta: Meta<typeof Progress> = {
  component: Progress,
  title: 'Indicators/Progress',
  tags: ['autodocs'],
  args: {
    size: Size.medium,
    value: 35,
    max: 100,
    role: Role.default
  },
  argTypes: {
    value: { description: 'Current value of the progress' },
    max: { description: 'Maximum value of the progress' },
    variant: {
      control: false,
      description:
        'Variant of the progress. In certain circumstances, some variants will be preferred'
    },
    role: { control: 'select', description: 'Role of the progress' },
    size: { control: 'select', description: 'Size of the progress' },
    className: { description: 'Custom className for loading animation' },
    ProgressSegmentComponent: {
      description: 'Custom component of segment when segmented variant is used'
    }
  }
};

export default meta;
