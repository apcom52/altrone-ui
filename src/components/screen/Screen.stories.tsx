import { Meta, StoryObj } from '@storybook/react';
import { Flex, Screen, Switcher, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { useState } from 'react';

const story: Meta<typeof Screen> = {
  title: 'Components/Containers/Screen',
  component: Screen,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export default story;

const Placeholder = ({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: number;
}) => (
  <div
    style={{
      height,
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: 'var(--radius-s)',
      background: 'var(--accent-a3)',
    }}
  >
    <Text size={3}>{children}</Text>
  </div>
);

export const Blank: StoryObj<typeof Screen> = {
  name: 'Blank Screen',
  render: () => (
    <Screen>
      <Screen.Content>
        <Text block size={7} weight="bold">
          Blank Screen
        </Text>
        <Text block size={4}>
          A <code>Screen</code> with only <code>Screen.Content</code> — the
          base case, no sidebar, header, or footer.
        </Text>
      </Screen.Content>
    </Screen>
  ),
};

export const WithZones: StoryObj<typeof Screen> = {
  name: 'Header, Sidebar & Footer',
  render: () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    return (
      <Screen>
        {showSidebar && (
          <Screen.Sidebar>
            <Placeholder>Sidebar</Placeholder>
          </Screen.Sidebar>
        )}
        {showHeader && (
          <Screen.Header>
            <Placeholder>Header</Placeholder>
          </Screen.Header>
        )}
        <Screen.Content>
          <Flex direction="vertical" gap="m">
            <Text block size={7} weight="bold">
              Zones compose freely
            </Text>
            <Text block size={4}>
              <code>Screen.Header</code>, <code>Screen.Sidebar</code>,{' '}
              <code>Screen.Content</code>, and <code>Screen.Footer</code> are
              placed in <code>children</code>, in any order — a CSS grid
              assigns their position, so JSX order doesn&rsquo;t matter. A
              zone that isn&rsquo;t rendered simply isn&rsquo;t part of the
              layout; toggle these to see the grid adapt:
            </Text>
            <Flex gap="l">
              <Switcher checked={showSidebar} onChange={setShowSidebar}>
                Sidebar
              </Switcher>
              <Switcher checked={showHeader} onChange={setShowHeader}>
                Header
              </Switcher>
              <Switcher checked={showFooter} onChange={setShowFooter}>
                Footer
              </Switcher>
            </Flex>
            {[...Array(30)].map((_, i) => (
              <Text block key={i} size={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            ))}
          </Flex>
        </Screen.Content>
        {showFooter && (
          <Screen.Footer>
            <Placeholder>Footer</Placeholder>
          </Screen.Footer>
        )}
      </Screen>
    );
  },
};

export const ContentSize: StoryObj<typeof Screen> = {
  name: 'Content Width by Size',
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text block size={7} weight="bold">
        size constrains Screen.Content
      </Text>
      <Text block size={4}>
        The rest of the layout (sidebar, header, footer) is unaffected —
        only the content column&rsquo;s max width changes, centered within
        it.
      </Text>
      {(['mini', 's', 'm', 'l', 'xl'] as const).map((size) => (
        <div
          key={size}
          style={{
            border: '1px dashed var(--border-1)',
            borderRadius: 'var(--radius-s)',
          }}
        >
          <Screen size={size} style={{ minHeight: 'auto' }}>
            <Screen.Content style={{ padding: 12 }}>
              <Placeholder height={40}>size=&quot;{size}&quot;</Placeholder>
            </Screen.Content>
          </Screen>
        </div>
      ))}
    </Flex>
  ),
};
