import { Meta } from '@storybook/react';
import { Paragraph } from './index';

export { DefaultParagraphStory } from './stories';

const meta: Meta<typeof Paragraph> = {
  component: Paragraph,
  title: 'Typography/Paragraph',
  tags: ['autodocs'],
  args: {
    className: undefined
  },
  argTypes: {
    className: { description: 'Custom CSS class' },
    margin: { description: '*DEPRECATED*' },
    padding: { description: '*DEPRECATED*' }
  }
};

export default meta;
