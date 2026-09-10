import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Avatar,
  BottomNavigation,
  Button,
  Flex,
  NavigationList,
  Screen,
  Text,
  Toolbar,
} from 'components';
import { useBreakpoint } from 'utils';
import { Activity, Bell, ChevronRight, Compass, Home, Play, Settings, User } from 'lucide-react';
import { Card, screenMeta, Stat, surface } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Adaptive app',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

const APP_TABS = [
  { id: 'today', label: 'Today', icon: <Home /> },
  { id: 'routes', label: 'Routes', icon: <Compass /> },
  { id: 'activity', label: 'Activity', icon: <Activity /> },
  { id: 'you', label: 'You', icon: <User /> },
] as const;

type AppTabId = (typeof APP_TABS)[number]['id'];

const TodayScreen = () => (
  <Flex direction="vertical" gap="l">
    <Text size={7} weight="bold" block>
      Good morning, Alex
    </Text>
    <Flex
      direction="vertical"
      gap="m"
      style={{
        padding: 24,
        borderRadius: 'var(--radius-xl)',
        background: 'var(--accent-a3)',
      }}
    >
      <Text size={3} color="muted" block>
        Ready when you are
      </Text>
      <Text size={8} weight="bold" block>
        5.0 km
      </Text>
      <Text size={3} block>
        Suggested easy run · about 32 min
      </Text>
      <Flex>
        <Button label="Start run" variant="submit" icon={<Play />} />
      </Flex>
    </Flex>
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-section)',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      }}
    >
      <Card title="This week" value="18.4 km" hint="+3.2 km vs last" />
      <Card title="Time" value="1h 47m" hint="4 runs" />
      <Card title="Avg pace" value="5:48 /km" hint="−0:06 vs last" />
    </div>
  </Flex>
);

const ROUTES = [
  { name: 'Riverside loop', meta: '4.2 km · Flat' },
  { name: 'Hill repeats', meta: '6.8 km · Hard' },
  { name: 'Park & back', meta: '3.1 km · Easy' },
  { name: 'Bridge crossing', meta: '8.0 km · Rolling' },
  { name: 'Old town run', meta: '5.5 km · Flat' },
  { name: 'Forest trail', meta: '7.3 km · Trail' },
];

const RoutesScreen = () => (
  <div
    style={{
      display: 'grid',
      gap: 'var(--space-section)',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    }}
  >
    {ROUTES.map((route) => (
      <Flex key={route.name} direction="vertical" gap="xs" style={surface(16)}>
        <Text size={4} weight="bold" block>
          {route.name}
        </Text>
        <Text size={3} color="muted" block>
          {route.meta}
        </Text>
      </Flex>
    ))}
  </div>
);

const HISTORY = [
  { date: 'Wed 12 Mar', dist: '5.0 km', pace: '5:41 /km' },
  { date: 'Mon 10 Mar', dist: '8.2 km', pace: '5:58 /km' },
  { date: 'Sat 8 Mar', dist: '3.4 km', pace: '5:22 /km' },
  { date: 'Thu 6 Mar', dist: '6.1 km', pace: '5:49 /km' },
  { date: 'Tue 4 Mar', dist: '4.7 km', pace: '5:35 /km' },
];

const ActivityScreen = () => (
  <Flex direction="vertical" gap="s">
    {HISTORY.map((run) => (
      <Flex
        key={run.date}
        align="center"
        justify="between"
        style={{ ...surface(0), padding: '14px 16px' }}
      >
        <Flex direction="vertical" gap="xs">
          <Text size={3} weight="bold">
            {run.dist}
          </Text>
          <Text size={2} color="muted">
            {run.date}
          </Text>
        </Flex>
        <Flex align="center" gap="s">
          <Text size={2} color="muted">
            {run.pace}
          </Text>
          <ChevronRight size={16} />
        </Flex>
      </Flex>
    ))}
  </Flex>
);

const YouScreen = () => (
  <Flex
    direction="vertical"
    align="center"
    gap="m"
    style={{ paddingBlock: 'var(--space-section)' }}
  >
    <Avatar firstName="Alex" lastName="Rivera" size="l" />
    <Flex direction="vertical" align="center" gap="xs">
      <Text size={6} weight="bold">
        Alex Rivera
      </Text>
      <Text size={3} color="muted">
        Running since 2021
      </Text>
    </Flex>
    <Flex gap="l">
      <Stat label="Runs" value="182" />
      <Stat label="Distance" value="1,204 km" />
      <Stat label="Streak" value="6 wk" />
    </Flex>
  </Flex>
);

const APP_SCREEN: Record<AppTabId, () => ReactElement> = {
  today: TodayScreen,
  routes: RoutesScreen,
  activity: ActivityScreen,
  you: YouScreen,
};

/**
 * A single `Screen` driving four views off one `tab` state. On desktop
 * navigation is a full-height `Screen.Sidebar` (a `NavigationList` with a
 * sticky brand header and a user footer pinned to the bottom). Below
 * `mobileBreakpoint` the sidebar is left mounted — so it can still be summoned
 * as an overlay from the header toggle — and a `Screen.BottomNavigation`
 * (`hiddenFrom="lg"`) becomes the primary idiom. Both nav surfaces write the
 * same `tab`.
 */
export const AdaptiveApp: StoryObj<typeof Screen> = {
  name: 'Adaptive app',
  render: () => {
    const { isLg } = useBreakpoint();
    const [tab, setTab] = useState<AppTabId>('today');
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    const activeTab = APP_TABS.find((t) => t.id === tab) ?? APP_TABS[0];
    const CurrentScreen = APP_SCREEN[tab];

    return (
      <Screen title="Stride" mobileBreakpoint="lg">
        <Screen.Header>
          <Toolbar variant="floating" size="m">
            {!isLg && (
              <Toolbar.Group>
                <Toolbar.SidebarToggleAction
                  collapsed={menuCollapsed}
                  onClick={() => setMenuCollapsed((v) => !v)}
                />
              </Toolbar.Group>
            )}
            <Toolbar.Title label={activeTab.label} />
            <Toolbar.Separator />
            <Toolbar.Group>
              <Toolbar.SearchAction showLabel={false} />
              <Toolbar.Action
                label="Notifications"
                icon={<Bell />}
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Avatar firstName="Alex" lastName="Rivera" />
            </Toolbar.Group>
          </Toolbar>
        </Screen.Header>

        <Screen.Sidebar
          collapsed={isLg ? false : menuCollapsed}
          onClose={() => setMenuCollapsed(true)}
        >
          <NavigationList>
            <NavigationList.Header>
              <Flex align="center" gap="s">
                <Avatar firstName="Stride" lastName="Run" size="s" />
                <Text size={4} weight="bold" block>
                  Stride
                </Text>
              </Flex>
            </NavigationList.Header>
            <NavigationList.Group title="Menu">
              {APP_TABS.map((t) => (
                <NavigationList.Link
                  key={t.id}
                  href="#"
                  icon={t.icon}
                  label={t.label}
                  selected={tab === t.id}
                  onClick={(event) => {
                    event.preventDefault();
                    setTab(t.id);
                    setMenuCollapsed(true);
                  }}
                />
              ))}
            </NavigationList.Group>
            <NavigationList.Footer>
              <Flex align="center" gap="s">
                <Avatar firstName="Alex" lastName="Rivera" size="s" />
                <Flex
                  direction="vertical"
                  gap="xs"
                  style={{ flex: 1, minWidth: 0 }}
                >
                  <Text size={3} block truncate>
                    Alex Rivera
                  </Text>
                  <Text size={2} color="muted" block>
                    Premium
                  </Text>
                </Flex>
                <Button
                  icon={<Settings />}
                  showLabel={false}
                  label="Settings"
                  size="s"
                />
              </Flex>
            </NavigationList.Footer>
          </NavigationList>
        </Screen.Sidebar>

        <Screen.Content>
          <CurrentScreen />
        </Screen.Content>

        <Screen.BottomNavigation hiddenFrom="lg">
          <BottomNavigation floating={false}>
            {APP_TABS.map((t) => (
              <BottomNavigation.Item
                key={t.id}
                href="#"
                icon={t.icon}
                label={t.label}
                selected={tab === t.id}
                onClick={(event) => {
                  event.preventDefault();
                  setTab(t.id);
                }}
              />
            ))}
          </BottomNavigation>
        </Screen.BottomNavigation>
      </Screen>
    );
  },
};
