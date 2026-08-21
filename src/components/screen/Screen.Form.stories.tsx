import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Flex,
  Form,
  NavigationList,
  Screen,
  Text,
  TextInput,
  Toolbar,
} from 'components';
import { StorybookDecorator } from 'global/storybook';
import { useState } from 'react';
import { FolderKanban, Home, Settings } from 'lucide-react';

const story: Meta<typeof Screen.Form> = {
  title: 'Components/Containers/Screen/Form',
  component: Screen.Form,
  decorators: [StorybookDecorator],
};

export default story;

export const Overview: StoryObj<typeof Screen.Form> = {
  name: 'Using Form',
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
      <Screen.Form>
        <Screen.Sidebar collapsed={sidebarCollapsed}>
          <NavigationList>
            <NavigationList.Group title="Workspace">
              <NavigationList.Link icon={<Home />} label="Overview" />
              <NavigationList.Link
                icon={<FolderKanban />}
                label="Projects"
                selected
              />
              <NavigationList.Link icon={<Settings />} label="Settings" />
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>
        <Screen.Header>
          <Toolbar>
            <Toolbar.Leading>
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction
                  collapsed={sidebarCollapsed}
                  onClick={() => setSidebarCollapsed((v) => !v)}
                />
              </Toolbar.Group>
              <Toolbar.Group>
                <Toolbar.BackAction onClick={() => {}} />
              </Toolbar.Group>
            </Toolbar.Leading>
          </Toolbar>
        </Screen.Header>
        <Screen.Content>
          <Flex direction="vertical" gap="l">
            <Text block size={8} weight="bold">
              Create project
            </Text>
            <Form>
              <Flex direction="vertical" gap="m">
                <Form.Field label="Project name" required>
                  <TextInput placeholder="My new project" />
                </Form.Field>
                <Form.Field label="Description" hintText="Optional">
                  <TextInput placeholder="What is this project for?" />
                </Form.Field>
                <Button label="Create project" variant="submit" />
              </Flex>
            </Form>
          </Flex>
        </Screen.Content>
      </Screen.Form>
    );
  },
};
