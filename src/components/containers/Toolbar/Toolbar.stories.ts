import { Meta } from '@storybook/react';
import { Toolbar } from './index';

export { DefaultToolbarStory, CompactToolbarStory } from './stories';

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  title: 'Containers/Toolbar',
  tags: ['autodocs'],
  args: {},
  argTypes: {}
};

export default meta;
