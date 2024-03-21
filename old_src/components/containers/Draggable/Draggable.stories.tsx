import { Meta } from '@storybook/react';
import { Draggable } from './Draggable';

export { DefaultDraggableStory } from './stories';

const meta: Meta<typeof Draggable> = {
  component: Draggable,
  title: 'Containers/Draggable',
  tags: ['autodocs'],
  args: {
    width: '100%',
    height: 500
  },
  argTypes: {}
};

export default meta;
