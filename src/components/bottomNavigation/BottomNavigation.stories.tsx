import { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { BottomNavigation } from './BottomNavigation.tsx';

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
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Standard BottomNavigation</Text.Heading>
        <BottomNavigation>
          <BottomNavigation.Item
            href="#"
            selected
            icon={<Icon i="home" />}
            label="Home"
          />
          <BottomNavigation.Item
            href="#"
            icon={<Icon i="wallet" />}
            label="Wallet"
          />
          <BottomNavigation.Item
            href="#"
            icon={<Icon i="settings" />}
            label="Settings"
          />
          <BottomNavigation.Item
            href="#"
            icon={<Icon i="account_circle" />}
            label="Profile"
          />
        </BottomNavigation>
      </Flex>
    );
  },
};

export default story;
