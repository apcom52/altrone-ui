import { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Tabs } from './Tabs.tsx';
import { useState } from 'react';
import { Home, MessageCircle, List, Check } from 'lucide-react';

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
  render: () => {
    const [selectedTab, setSelectedTab] = useState<
      'home' | 'chat' | 'description' | 'subtasks'
    >('home');

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Standard Tabs
        </Text>
        <Flex direction="horizontal" gap="l">
          <Tabs>
            <Tabs.Item
              icon={<Home />}
              label="Home"
              showLabel={false}
              selected={selectedTab === 'home'}
              onClick={() => setSelectedTab('home')}
            />
            <Tabs.Item
              icon={<MessageCircle />}
              label="Chat"
              badge="2"
              selected={selectedTab === 'chat'}
              onClick={() => setSelectedTab('chat')}
            />
            <Tabs.Item
              icon={<List />}
              label="Description"
              selected={selectedTab === 'description'}
              onClick={() => setSelectedTab('description')}
            />
            <Tabs.Item
              label="Subtasks"
              selected={selectedTab === 'subtasks'}
              onClick={() => setSelectedTab('subtasks')}
            />
          </Tabs>
        </Flex>
      </Flex>
    );
  },
};

export default story;
