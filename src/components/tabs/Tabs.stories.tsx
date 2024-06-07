import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, TextHeadingRoles } from 'components';
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
  render: (args) => (
    <Flex {...args} gap="large">
      <Text.Heading role={TextHeadingRoles.inner}>Standard Tabs</Text.Heading>
      <Flex direction="horizontal" gap="large">
        <Tabs>
          <Tabs.Item selected href="#chat" label="Chat" />
          <Tabs.Item href="#description" label="Description" />
          <Tabs.Item href="#subtasks" label="Subtasks" />
        </Tabs>
      </Flex>
    </Flex>
  ),
};

export default story;
