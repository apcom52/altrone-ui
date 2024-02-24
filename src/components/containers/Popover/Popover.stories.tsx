import { Meta } from '@storybook/react';
import { FloatingBox } from './index';

export { DefaultPopoverStory } from './stories';

/**
 * This component is used to make a dropdown or a small popup
 */
const meta: Meta<typeof FloatingBox> = {
  component: FloatingBox,
  title: 'Containers/NewFloatingBox',
  tags: ['autodocs'],
  args: {
    trigger: 'click'
  },
  argTypes: {
    trigger: { control: 'select', options: ['click', 'hover', 'focus'] }
  }
};

export default meta;
