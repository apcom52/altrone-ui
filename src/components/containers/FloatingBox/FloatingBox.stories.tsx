import { Meta } from '@storybook/react';
import { FloatingBox, FloatingBoxMobileBehaviour } from './index';
import { Surface } from '../../../types';

export { DefaultFloatingBoxStory } from './stories';

const meta: Meta<typeof FloatingBox> = {
  component: FloatingBox,
  title: 'Containers/FloatingBox',
  tags: ['autodocs'],
  args: {
    targetElement: undefined,
    onClose: undefined,
    surface: Surface.glass,
    mobileBehaviour: FloatingBoxMobileBehaviour.default,
    placement: 'bottom',
    offset: 4,
    minWidth: undefined,
    maxHeight: undefined,
    useParentWidth: false,
    useRootContainer: false,
    closeOnAnotherFloatingBoxClick: false
  },
  argTypes: {
    targetElement: { control: false },
    popperProps: { control: 'object' },
    minWidth: { control: 'text' },
    maxHeight: { control: 'text' },
    mobileBehaviour: { control: 'select' }
  }
};

export default meta;
