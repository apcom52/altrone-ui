import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Flex, NavigationList, Screen, Text, Toolbar } from 'components';
import { Calendar, Compass, Home, LayoutGrid, Plus, Users } from 'lucide-react';
import { Card, screenMeta } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Dashboard',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

/**
 * Header toggle drives a collapsible `Screen.Sidebar`; the card grid reflows
 * as the content column widens, and a `Screen.Footer` carries the sync status
 * as a full-width chrome band.
 */
export const Dashboard: StoryObj<typeof Screen> = {
  name: 'Dashboard',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Screen title="Analytics">
        <Screen.Header>
          <Toolbar variant="floating" size="m">
            <Toolbar.Group>
              <Toolbar.SidebarToggleAction
                collapsed={collapsed}
                onClick={() => setCollapsed((v) => !v)}
              />
            </Toolbar.Group>
            <Toolbar.Title label="Overview" />
            <Toolbar.Separator />
            <Toolbar.Group>
              <Toolbar.Action
                label="Range"
                icon={<Calendar />}
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action label="Add widget" icon={<Plus />} />
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>
        <Screen.Sidebar collapsed={collapsed} onClose={() => setCollapsed(true)}>
          <NavigationList>
            <NavigationList.Group title="Reports">
              <NavigationList.Link icon={<Home />} label="Overview" selected />
              <NavigationList.Link icon={<Users />} label="Audience" />
              <NavigationList.Link icon={<LayoutGrid />} label="Behaviour" />
              <NavigationList.Link icon={<Compass />} label="Acquisition" />
            </NavigationList.Group>
          </NavigationList>
        </Screen.Sidebar>
        <Screen.Content>
          <div
            style={{
              display: 'grid',
              gap: 'var(--space-section)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            }}
          >
            <Card title="Visitors" value="48.2k" hint="+12% WoW" />
            <Card title="Sign-ups" value="1,904" hint="+4% WoW" />
            <Card title="Revenue" value="$92.4k" hint="+18% WoW" />
            <Card title="Churn" value="1.1%" hint="−0.3pt WoW" />
          </div>
        </Screen.Content>
        <Screen.Footer>
          <Flex justify="between" align="center">
            <Text size={2} color="muted">
              Last synced 2 minutes ago
            </Text>
            <Text size={2} color="muted">
              4 data sources connected
            </Text>
          </Flex>
        </Screen.Footer>
      </Screen>
    );
  },
};
