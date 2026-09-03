import { Meta, StoryObj } from '@storybook/react';
import {
  Flex,
  Form,
  NavigationList,
  Screen,
  Switcher,
  Text,
  TextInput,
  Toolbar,
} from 'components';
import { StorybookDecorator } from 'global/storybook';
import { useState } from 'react';
import { Bell, Palette, Shield, User } from 'lucide-react';

const story: Meta<typeof Screen.Settings> = {
  title: 'Components/Core/Screen/Settings',
  component: Screen.Settings,
  decorators: [StorybookDecorator],
};

export default story;

export const Overview: StoryObj<typeof Screen.Settings> = {
  name: 'Using Settings',
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
      <Screen.Settings>
        <Screen.Sidebar collapsed={sidebarCollapsed}>
          <NavigationList>
            <NavigationList.Group title="Settings">
              <NavigationList.Link icon={<User />} label="Profile" selected />
              <NavigationList.Link icon={<Bell />} label="Notifications" />
              <NavigationList.Link icon={<Shield />} label="Security" />
              <NavigationList.Link icon={<Palette />} label="Appearance" />
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>
        <Screen.Header>
          <Toolbar>
            <Toolbar.Leading>
              <Toolbar.Group>
                <Toolbar.BackAction onClick={() => {}} />
              </Toolbar.Group>
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction
                  collapsed={sidebarCollapsed}
                  onClick={() => setSidebarCollapsed((v) => !v)}
                />
              </Toolbar.Group>
            </Toolbar.Leading>
          </Toolbar>
        </Screen.Header>
        <Screen.Content>
          <Flex direction="vertical" gap="l">
            <Text block size={8} weight="bold">
              Profile
            </Text>
            <Form>
              <Flex direction="vertical" gap="m">
                <Form.Field label="Display name">
                  <TextInput defaultValue="Ada Lovelace" />
                </Form.Field>
                <Form.Field label="Email">
                  <TextInput defaultValue="ada@example.com" />
                </Form.Field>
                <Switcher checked>Email notifications</Switcher>
              </Flex>
            </Form>
          </Flex>
        </Screen.Content>
      </Screen.Settings>
    );
  },
};
