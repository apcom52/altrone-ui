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
  argTypes: {}
};

export default meta;
