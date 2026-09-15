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
 * Both `Screen.Sidebar` and `Toolbar.SidebarToggleAction` are left
 * uncontrolled here — no `collapsed` prop on either. They stay in sync on
 * their own via `Screen`'s context: the toggle reads/drives the sidebar's own
 * state, and the sidebar auto-hides once the layout drops to overlay. No
 * `useState` needed for this — see `Screen.Sidebar`'s "Controlled" story for
 * when you do need to own the state yourself (persisting it, say).
 */
export const Dashboard: StoryObj<typeof Screen> = {
  name: 'Dashboard',
  render: () => {
    return (
      <Screen title="Analytics">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            <Toolbar.Group>
              <Toolbar.SidebarToggleAction />
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
        <Screen.Sidebar>
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

/**
 * The controlled counterpart: `collapsed`/`onClose` (on `Screen.Sidebar`) and
 * `collapsed`/`onClick` (on `Toolbar.SidebarToggleAction`) all wired to one
 * `useState`. Reach for this when the sidebar's state needs to live outside
 * `Screen` — persisted to `localStorage`, say — the uncontrolled `Dashboard`
 * story above covers the common case with no state to manage at all.
 */
export const ControlledSidebar: StoryObj<typeof Screen> = {
  name: 'Controlled sidebar',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Screen title="Analytics">
        <Screen.Header>
          <Toolbar variant="solid" size="m">
            <Toolbar.Group>
              <Toolbar.SidebarToggleAction
                collapsed={collapsed}
                onClick={() => setCollapsed((v) => !v)}
              />
            </Toolbar.Group>
            <Toolbar.Title label="Overview" />
          </Toolbar>
        </Screen.Header>
        <Screen.Sidebar collapsed={collapsed} onClose={() => setCollapsed(true)}>
          <NavigationList>
            <NavigationList.Group title="Reports">
              <NavigationList.Link icon={<Home />} label="Overview" selected />
              <NavigationList.Link icon={<Users />} label="Audience" />
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
          </div>
        </Screen.Content>
      </Screen>
    );
  },
};
