import { Meta } from '@storybook/react';
import { Icon } from './index';

export { DefaultIconStory } from './stories';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Typography/Icon',
  tags: ['autodocs'],
  args: {
    i: 'bolt',
    size: 40,
    style: 'outlined'
  },
  argTypes: {
    i: { description: 'Name of the icon' },
    size: { description: 'Size of the icon' },
    style: { description: 'Style of the icon', control: 'select' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
