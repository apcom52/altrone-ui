import { Meta } from '@storybook/react';
import { Text } from './Text';

export { DefaultTextStory } from './stories';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Typography/Text',
  tags: ['autodocs'],
  args: {},
  argTypes: {}
};

export default meta;
