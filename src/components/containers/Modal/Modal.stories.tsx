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
    closeOnOverlay: true
  },
  argTypes: {
    children: { description: 'Inner elements' },
    onClose: { control: false, description: 'Callback fires when user wants to close the modal' },
    title: { description: 'Title of the modal' },
    size: { control: 'select', description: 'Size of the modal. ' },
    fluid: { description: 'If this is true modal will take the full width' },
    actions: { description: 'Custom actions for the modal' },
    showClose: { description: 'Show close button near the title' },
    showCancel: { description: 'Show "Cancel" button' },
    closeOnOverlay: {
      description: 'If true the modal will be closed when user clicked on overlay'
    },
    reduceMotion: { description: 'If true the modal does not have any transitions' },
    surface: { control: 'select', description: 'Surface of the modal' },
    elevation: { control: 'select', description: 'Shadows of the modal' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
