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
    children: { description: 'Child buttons' },
    direction: { description: 'Direction of the container', control: 'select' },
    align: { description: 'Alignment of the buttons', control: 'select' },
    mobileFluid: {
      description:
        'This property makes the direction as vertical and changes width of the buttons to 100%'
    },
    className: { control: 'text', description: 'Custom CSS class' }
  }
};

export default meta;
