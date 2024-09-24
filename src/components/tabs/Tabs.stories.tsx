import { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Tabs } from './Tabs.tsx';

const story: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const FlexLayout: StoryObj<typeof Flex> = {
  name: 'Using Tags',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text.Heading role="inner">Standard Tabs</Text.Heading>
      <Flex direction="horizontal" gap="l">
        <Tabs>
          <Tabs.Item
            icon={<Icon i="chat" />}
            selected
            href="#chat"
            label="Chat"
          />
          <Tabs.Item
            icon={<Icon i="list" />}
            href="#description"
            label="Description"
          />
          <Tabs.Item href="#subtasks" label="Subtasks" />
        </Tabs>
      </Flex>
    </Flex>
  ),
};

export default story;
