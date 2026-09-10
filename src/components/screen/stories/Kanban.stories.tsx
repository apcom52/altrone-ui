import type { Meta, StoryObj } from '@storybook/react';
import { Flex, NavigationList, Screen, Text, Toolbar } from 'components';
import { LayoutGrid, Plus } from 'lucide-react';
import { screenMeta, Tile } from './shared.tsx';

const meta: Meta<typeof Screen> = {
  ...screenMeta,
  title: 'Components/Core/Screen/Kanban',
};

export default meta;

/**
 * A board that has to bleed to the window edges and scroll horizontally: keep
 * the zones, but zero out `Screen.Content`'s padding and let the board own the
 * overflow.
 */
export const Kanban: StoryObj<typeof Screen> = {
  name: 'Kanban',
  render: () => (
    <Screen title="Sprint board">
      <Screen.Header>
        <Toolbar variant="floating" size="m">
          <Toolbar.Title label="Sprint 24" />
          <Toolbar.Separator />
          <Toolbar.Action label="New task" icon={<Plus />} />
        </Toolbar>
      </Screen.Header>
      <Screen.Sidebar>
        <NavigationList>
          <NavigationList.Group title="Boards">
            <NavigationList.Link
              icon={<LayoutGrid />}
              label="Sprint 24"
              selected
            />
            <NavigationList.Link icon={<LayoutGrid />} label="Backlog" />
            <NavigationList.Link icon={<LayoutGrid />} label="Roadmap" />
          </NavigationList.Group>
        </NavigationList>
      </Screen.Sidebar>
      <Screen.Content style={{ padding: 0, overflowX: 'auto' }}>
        <Flex
          gap="m"
          style={{ padding: 'var(--space-content)', width: 'max-content' }}
        >
          {['Backlog', 'In progress', 'Review', 'Done'].map((col) => (
            <Flex
              key={col}
              direction="vertical"
              gap="s"
              style={{
                width: 260,
                padding: 12,
                borderRadius: 'var(--radius-l)',
                background: 'var(--gray-a2)',
              }}
            >
              <Text size={3} weight="bold">
                {col}
              </Text>
              {[...Array(3)].map((_, i) => (
                <Tile key={i} h={72}>
                  {col} card {i + 1}
                </Tile>
              ))}
            </Flex>
          ))}
        </Flex>
      </Screen.Content>
    </Screen>
  ),
};
