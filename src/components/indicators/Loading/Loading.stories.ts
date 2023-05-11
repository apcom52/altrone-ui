import { Meta } from '@storybook/react';
import { Size } from '../../../types';
import { Loading } from './index';

export { DefaultLoading } from './stories';

const meta: Meta<typeof Loading> = {
  component: Loading,
  title: 'Indicators/Loading',
  tags: ['autodocs'],
  args: {
    size: Size.medium
  },
  argTypes: {
    size: { control: 'select', description: 'Size of the loading animation' },
    className: { description: 'Custom className for loading animation' },
    color: {
      description:
        'This field is used for applying a custom color for loading animation. By default, we use textColor variable'
    }
  }
};

export default meta;
