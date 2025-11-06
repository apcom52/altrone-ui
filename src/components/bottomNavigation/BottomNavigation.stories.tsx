import { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { BottomNavigation } from './BottomNavigation.tsx';
import { useState } from 'react';
import { Home, Wallet, Settings, User } from 'lucide-react';

const story: Meta<typeof BottomNavigation> = {
  title: 'Components/Navigation/BottomNavigation',
  component: BottomNavigation,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const BottomNavigationStory: StoryObj<typeof BottomNavigation> = {
  name: 'Using BottomNavigation',
  render: () => {
    const [selectedItem, setSelectedItem] = useState<string | null>('home');

    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Standard BottomNavigation</Text.Heading>
        <BottomNavigation>
          <BottomNavigation.Item
            onClick={() => setSelectedItem('home')}
            selected={selectedItem === 'home'}
            icon={<Home />}
            label="Home"
          />
          <BottomNavigation.Item
            onClick={() => setSelectedItem('wallet')}
            selected={selectedItem === 'wallet'}
            icon={<Wallet />}
            label="Wallet"
            badge="NEW"
          />
          <BottomNavigation.Item
            onClick={() => setSelectedItem('settings')}
            selected={selectedItem === 'settings'}
            icon={<Settings />}
            label="Settings"
            badge="2"
          />
          <BottomNavigation.Item
            onClick={() => setSelectedItem('profile')}
            selected={selectedItem === 'profile'}
            icon={<User />}
            label="Profile"
          />
        </BottomNavigation>
      </Flex>
    );
  },
};

export default story;
