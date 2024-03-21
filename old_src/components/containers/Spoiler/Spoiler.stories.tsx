import { Meta } from '@storybook/react';
import { Spoiler } from './index';

export { DefaultSpoilerStory } from './stories';

const meta: Meta<typeof Spoiler> = {
  component: Spoiler,
  title: 'Containers/Spoiler',
  tags: ['autodocs'],
  args: {
    label: 'Description',
    openedByDefault: true
  },
  argTypes: {
    label: { description: 'Header of the spoiler' },
    openedByDefault: { description: 'If true the spoiler is opened on the initial rendering' }
  }
};

export default meta;
