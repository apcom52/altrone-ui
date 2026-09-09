import { Meta, StoryObj } from '@storybook/react';
import { Bell } from 'lucide-react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Badge } from './Badge';
import type { BadgeSize } from './Badge.types';

const story: Meta<typeof Badge> = {
  title: 'Internal/Badge',
  component: Badge,
  decorators: [StorybookDecorator],
};

export default story;

const SIZES: BadgeSize[] = ['mini', 's', 'm', 'l', 'xl'];

export const Overview: StoryObj<typeof Badge> = {
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Text block size={9} weight="bold">
        Badge
      </Text>
      <Text block>
        The internal counter/label chip. A <Text code>Box</Text> pill shared by{' '}
        <Text code>Button</Text>, <Text code>Tabs.Item</Text>,{' '}
        <Text code>NavigationList.Link</Text>,{' '}
        <Text code>BottomNavigation.Item</Text> and{' '}
        <Text code>Dropdown.Action</Text>. Not part of the public API — use{' '}
        <Text code>Label</Text> for standalone tags.
      </Text>

      <Text block size={5} weight="bold">
        Five sizes
      </Text>
      <Flex gap="m" align="center">
        {SIZES.map((size) => (
          <Badge key={size} size={size}>
            9
          </Badge>
        ))}
      </Flex>
      <Flex gap="m" align="center">
        {SIZES.map((size) => (
          <Badge key={size} size={size}>
            128
          </Badge>
        ))}
      </Flex>

      <Text block size={5} weight="bold">
        Placement
      </Text>
      <Text block>
        <Text code>inline</Text> (default) — a translucent pill in a content row.{' '}
        <Text code>corner</Text> — an opaque <Text code>plate</Text> chip pinned
        to the top-right of its positioned parent.
      </Text>
      <Flex gap="xl" align="center">
        <Badge>inline</Badge>
        <div style={{ position: 'relative', width: 48, height: 48 }}>
          <Text
            style={{
              display: 'grid',
              placeItems: 'center',
              width: '100%',
              height: '100%',
              border: '1px dashed var(--border-1)',
              borderRadius: 8,
            }}
          >
            <Bell size={20} />
          </Text>
          <Badge placement="corner" size="s">
            3
          </Badge>
        </div>
      </Flex>

      <Text block size={5} weight="bold">
        Tones
      </Text>
      <Flex gap="m" align="center">
        <Badge tone="neutral">1</Badge>
        <Badge tone="accent">2</Badge>
        <Badge tone="danger">3</Badge>
        <Badge tone="success">4</Badge>
        <Badge tone="warning">5</Badge>
        <Badge tone="info">6</Badge>
      </Flex>
    </Flex>
  ),
};
