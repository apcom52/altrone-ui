import { Meta } from '@storybook/react';
import { Heading } from './index';

export { DefaultHeadingStory } from './stories';

const meta: Meta<typeof Heading> = {
  component: Heading,
  title: 'Typography/Heading',
  tags: ['autodocs'],
  args: {
    children: 'Welcome to a more beautiful web!',
    level: 1
  },
  argTypes: {
    children: { description: 'Content of the heading' },
    level: { description: 'Level of the heading' },
    id: { description: 'Unique ID on the page' },
    className: { description: 'Custom CSS class' },
    margin: { description: '**DEPRECATED**', control: 'none' },
    padding: { description: '**DEPRECATED**', control: 'none' }
  }
};

export default meta;
