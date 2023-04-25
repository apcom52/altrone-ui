import { Meta } from '@storybook/react';
import { Modal } from './index';
import { MODAL_ACTIONS } from './stories/DefaultModalStory';
import { Size, Surface } from '../../../types';

export { DefaultModalStory } from './stories';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Containers/Modal',
  tags: ['autodocs'],
  args: {
    onClose: undefined,
    title: 'Subscription',
    size: Size.medium,
    surface: Surface.glass,
    actions: MODAL_ACTIONS,
    fluid: false,
    showClose: true,
    showCancel: true,
    closeOnOverlay: true,
    reduceMotion: false
  },
  argTypes: {
    onClose: { control: false },
    size: { control: 'select' },
    surface: { control: 'select' }
  }
};

export default meta;
