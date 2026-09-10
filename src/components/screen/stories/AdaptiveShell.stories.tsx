import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  BottomNavigation,
  Flex,
  NavigationList,
  Screen,
  Text,
  Toolbar,
} from 'components';
import { Compass, Home, LayoutGrid, Star } from 'lucide-react';
import { screenMeta, surface } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Adaptive shell',
  parameters: { ...screenMeta.parameters, chromatic: { disable: true } },
};

export default meta;

/**
 * A hard split of the navigation idiom by device: `Screen.Sidebar
 * visibleFrom="lg"` renders nothing below `lg`, `Screen.BottomNavigation
 * hiddenFrom="lg"` renders nothing at and above it. A gated zone is fully
 * absent — it reserves no layout space — so on touch the grid is a plain
 * single column. `visibleFrom` / `hiddenFrom` are independent of
 * `mobileBreakpoint`.
 */
export const AdaptiveShell: StoryObj<typeof Screen> = {
  name: 'Adaptive shell',
  render: () => (
    <Screen title="Music">
      <Screen.Header>
        <Toolbar variant="floating" size="m">
          <Toolbar.Title label="Listen now" />
          <Toolbar.Separator />
          <Toolbar.SearchAction showLabel={false} />
        </Toolbar>
      </Screen.Header>
      <Screen.Sidebar visibleFrom="lg">
        <NavigationList>
          <NavigationList.Header>
            <Flex align="center" gap="s">
              <Avatar firstName="Sound" lastName="App" size="s" />
              <Text size={4} weight="bold" block>
                Soundwave
              </Text>
            </Flex>
          </NavigationList.Header>
          <NavigationList.Group title="Library">
            <NavigationList.Link icon={<Home />} label="Listen now" selected />
            <NavigationList.Link icon={<Compass />} label="Browse" />
            <NavigationList.Link icon={<Star />} label="Favourites" />
            <NavigationList.Link icon={<LayoutGrid />} label="Playlists" />
          </NavigationList.Group>
        </NavigationList>
      </Screen.Sidebar>
      <Screen.Content>
        <div
          style={{
            display: 'grid',
            gap: 'var(--space-section)',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          {[
            'Daily mix 1',
            'Release radar',
            'Discover weekly',
            'On repeat',
            'Chill hits',
            'Focus flow',
          ].map((name) => (
            <Flex key={name} direction="vertical" gap="xs" style={surface(16)}>
              <Text size={4} weight="bold" block>
                {name}
              </Text>
              <Text size={2} color="muted" block>
                Playlist · 50 tracks
              </Text>
            </Flex>
          ))}
        </div>
      </Screen.Content>
      <Screen.BottomNavigation hiddenFrom="lg">
        <BottomNavigation floating={false}>
          <BottomNavigation.Item icon={<Home />} label="Listen" selected />
          <BottomNavigation.Item icon={<Compass />} label="Browse" />
          <BottomNavigation.Item icon={<Star />} label="Favourites" />
          <BottomNavigation.Item icon={<LayoutGrid />} label="Playlists" />
        </BottomNavigation>
      </Screen.BottomNavigation>
    </Screen>
  ),
};
