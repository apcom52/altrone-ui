import { Meta } from '@storybook/react';
import { FloatingBox, FloatingBoxMobileBehaviour } from './index';
import { Surface } from '../../../types';

export { DefaultFloatingBoxStory } from './stories';

/**
 * This component is used to make a dropdown or a small popup
 */
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
    targetElement: {
      control: false,
      description: 'The DOM element around which positioning will occur.'
    },
    onClose: { description: 'Callback fires when FloatingBox is ready to close' },
    offset: { description: 'Space (in px) between the target element and the popup' },
    placement: { description: 'Side of placement' },
    popperProps: { control: 'object', description: 'Extra parameters for popper.js' },
    useParentWidth: { description: 'The popup has the same width as the target element.' },
    minWidth: { control: 'text', description: 'Minimum width of the popup' },
    maxHeight: { control: 'text', description: 'Maximum height of the popup' },
    useRootContainer: {
      description: 'f this is true then you popup will be placed in the root .altrone div'
    },
    preventClose: { description: 'Via this prop you can prevent closing in some cases' },
    mobileBehaviour: {
      control: 'select',
      description: 'Control the appearance of the popup on mobile devices'
    },
    closeOnAnotherFloatingBoxClick: {
      description:
        'If this is true, then when you click on another popup  other popup will not be closed. This is useful for cases when you have selects or any other FloatingBoxes inside your popup'
    },
    surface: { control: 'select', description: 'Surface of the popup' },
    elevation: { control: 'select', description: 'Elevation of the popup' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
