import { Meta } from '@storybook/react';
import { Popover } from './index';

export { DefaultPopoverStory } from './stories';

/**
 * This component is used to make a dropdown or a small popup
 */
const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Containers/Popover',
  tags: ['autodocs'],
  args: {
    trigger: 'click'
  },
  argTypes: {
    trigger: { control: 'select', options: ['click', 'hover', 'focus'] }
  }
};

export default meta;
