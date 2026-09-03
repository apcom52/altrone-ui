import { Meta, StoryObj } from '@storybook/react';
import { NavigationList, Screen, Text, Toolbar } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { useState } from 'react';
import { ChartPie, Home, Settings } from 'lucide-react';

const story: Meta<typeof Screen.Dashboard> = {
  title: 'Components/Core/Screen/Dashboard',
  component: Screen.Dashboard,
  decorators: [StorybookDecorator],
};

export default story;

const Widget = ({ title, value }: { title: string; value: string }) => (
  <div
    style={{
      padding: 'var(--space-content)',
      borderRadius: 'var(--radius-m)',
      background: 'var(--background-2)',
      border: '1px solid var(--border-1)',
    }}
  >
    <Text block size={3} color="muted">
      {title}
    </Text>
    <Text block size={9} weight="bold">
      {value}
    </Text>
  </div>
);

export const Overview: StoryObj<typeof Screen.Dashboard> = {
  name: 'Using Dashboard',
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
      <Screen.Dashboard>
        <Screen.Sidebar collapsed={sidebarCollapsed}>
          <NavigationList>
            <NavigationList.Group title="Workspace">
              <NavigationList.Link icon={<Home />} label="Overview" selected />
              <NavigationList.Link icon={<ChartPie />} label="Analytics" />
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
            </Toolbar.Leading>
            <Toolbar.Center>
              <Text weight="bold">Overview</Text>
            </Toolbar.Center>
          </Toolbar>
        </Screen.Header>
        <Screen.Content>
          <Widget title="Active users" value="12,480" />
          <Widget title="Revenue (MTD)" value="$48,201" />
          <Widget title="Open tickets" value="37" />
          <Widget title="Uptime" value="99.98%" />
          <Widget title="New signups" value="214" />
          <Widget title="Churn" value="1.2%" />
        </Screen.Content>
      </Screen.Dashboard>
    );
  },
};
