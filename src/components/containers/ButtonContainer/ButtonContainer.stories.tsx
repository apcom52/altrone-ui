import { Meta } from '@storybook/react';
import { ButtonContainer } from './index';
import { Align, Direction } from '../../../types';

export { DefaultButtonContainerStory } from './stories';

const meta: Meta<typeof ButtonContainer> = {
  component: ButtonContainer,
  title: 'Containers/ButtonContainer',
  tags: ['autodocs'],
  args: {
    mobileFluid: false,
    direction: Direction.horizontal,
    align: Align.start
  },
  argTypes: {
    direction: { control: 'select' },
    align: { control: 'select' }
  }
};

export default meta;
