import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from 'global/storybook/StorybookDecorator.tsx';
import { Flex, Text } from 'components';

const story: Meta = {
  title: 'Layout/Flex',
  component: Flex,
  decorators: [StorybookDecorator],
};

export const FlexLayout: StoryObj<typeof Flex> = {
  name: 'Article',
  render: (args) => (
    <Flex {...args}>
      <Text.Paragraph>First Item</Text.Paragraph>
      <Text.Paragraph>Second Item</Text.Paragraph>
      <Text.Paragraph>Third Item</Text.Paragraph>
      <Text.Paragraph>Forth Item</Text.Paragraph>
    </Flex>
  ),
};

export default story;
