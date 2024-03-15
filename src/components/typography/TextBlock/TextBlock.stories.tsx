import { Meta } from '@storybook/react';
import { TextBlock } from './index';

export { DefaultTextBlockStory } from './stories';

const meta: Meta<typeof TextBlock> = {
  component: TextBlock,
  title: 'Typography/TextBlock',
  tags: ['autodocs'],
  args: {},
  argTypes: {}
};

export default meta;
