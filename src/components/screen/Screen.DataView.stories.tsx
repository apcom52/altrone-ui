import { Meta, StoryObj } from '@storybook/react';
import { NavigationList, Screen, Text, Toolbar } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { useState } from 'react';
import { Home, Settings, Users } from 'lucide-react';

const story: Meta<typeof Screen.DataView> = {
  title: 'Components/Core/Screen/DataView',
  component: Screen.DataView,
  decorators: [StorybookDecorator],
};

export default story;

const ROWS = [
  { name: 'Ada Lovelace', role: 'Engineer', status: 'Active' },
  { name: 'Grace Hopper', role: 'Engineer', status: 'Active' },
  { name: 'Alan Turing', role: 'Researcher', status: 'On leave' },
  { name: 'Katherine Johnson', role: 'Analyst', status: 'Active' },
];

export const Overview: StoryObj<typeof Screen.DataView> = {
  name: 'Using DataView',
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
      <Screen.DataView>
        <Screen.Sidebar collapsed={sidebarCollapsed}>
          <NavigationList>
            <NavigationList.Group title="Workspace">
              <NavigationList.Link icon={<Home />} label="Overview" />
              <NavigationList.Link
                icon={<Users />}
                label="Team members"
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
                <Toolbar.SearchAction onClick={() => {}} />
              </Toolbar.Group>
            </Toolbar.Leading>
            <Toolbar.Center>
              <Text weight="bold">Team members</Text>
            </Toolbar.Center>
          </Toolbar>
        </Screen.Header>
        <Screen.Content>
          <Text
            block
            size={4}
            color="muted"
            style={{ padding: 'var(--space-content)' }}
          >
            <code>Screen.DataView</code> removes <code>Screen.Content</code>
            &rsquo;s default padding and width constraint — this table sits edge
            to edge instead of being centered/inset like{' '}
            <code>Screen.Form</code>&rsquo;s content would be.
          </Text>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-1)' }}>
                {['Name', 'Role', 'Status'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: 'var(--space-content)',
                    }}
                  >
                    <Text size={3} color="muted" weight="medium">
                      {h}
                    </Text>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.name}
                  style={{ borderBottom: '1px solid var(--border-1)' }}
                >
                  <td style={{ padding: 'var(--space-content)' }}>
                    <Text size={4}>{row.name}</Text>
                  </td>
                  <td style={{ padding: 'var(--space-content)' }}>
                    <Text size={4}>{row.role}</Text>
                  </td>
                  <td style={{ padding: 'var(--space-content)' }}>
                    <Text size={4}>{row.status}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Screen.Content>
      </Screen.DataView>
    );
  },
};
