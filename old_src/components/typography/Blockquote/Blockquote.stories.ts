import { Meta } from '@storybook/react';
import { Blockquote } from './index';

export { DefaultBlockquoteStory } from './stories';

const meta: Meta<typeof Blockquote> = {
  component: Blockquote,
  title: 'Typography/Blockquote',
  tags: ['autodocs'],
  args: {
    children: 'If you can dream it, you can do it.',
    author: 'Walt Disney'
  },
  argTypes: {
    children: { description: 'Content of the blockquote' },
    author: { description: 'Author of the citation' },
    cite: { description: '*cite* attribute for blockquote element' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
