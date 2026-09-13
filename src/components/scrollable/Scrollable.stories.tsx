import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Scrollable } from './Scrollable.tsx';
import { COUNTRIES } from './Scrollable.constants.ts';

const story: Meta<typeof Scrollable> = {
  title: 'Components/Containers/Scrollable',
  component: Scrollable,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export default story;

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 680, lineHeight: 1.6 }} color="muted">
    {children}
  </Text>
);

const CountryList = ({ count = COUNTRIES.length }: { count?: number }) => (
  <Flex
    direction="vertical"
    gap="s"
    style={{ padding: 'var(--space-content)' }}
  >
    {COUNTRIES.slice(0, count).map((item) => (
      <Flex key={item.country} direction="horizontal" gap="s" align="center">
        <Text size={5}>{item.flag}</Text>
        <Text size={4}>
          <Text weight="bold">{item.country}</Text> — {item.capital}
        </Text>
      </Flex>
    ))}
  </Flex>
);

const Frame = ({
  children,
  height = 240,
  width = 320,
}: {
  children: React.ReactNode;
  height?: number;
  width?: number;
}) => (
  <Flex
    direction="vertical"
    style={{
      height,
      width,
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-l)',
      overflow: 'hidden',
    }}
  >
    {children}
  </Flex>
);

export const Overview: StoryObj<typeof Scrollable> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" align="start" style={{ padding: 24 }}>
      <Text block size={9} weight="bold">
        Scrollable
      </Text>
      <Paragraph>
        A wrapper that scrolls its overflow behind a thin, auto-hiding,
        theme-aware scrollbar that overlays the content instead of taking
        layout width the way a native scrollbar does. Reach for it where a
        native <Text code>overflow: auto</Text> bar would look heavy — side
        panels, dropdown menus, a <Text code>Drawer</Text> body.
      </Paragraph>
      <Paragraph>
        By default the box fills its parent's height, so the parent must be
        sized. Pass <Text code>maxHeight</Text> when there is no such parent.
      </Paragraph>

      <Heading>Filling a sized parent</Heading>
      <Paragraph>
        The common case: a fixed-height container, Scrollable stretched to it.
        When the content is shorter than the box, no scrollbar appears.
      </Paragraph>
      <Flex direction="horizontal" gap="l" wrap>
        <Frame>
          <Scrollable>
            <CountryList />
          </Scrollable>
        </Frame>
        <Frame>
          <Scrollable>
            <CountryList count={3} />
          </Scrollable>
        </Frame>
      </Flex>

      <Heading>maxHeight — grow, then scroll</Heading>
      <Paragraph>
        With no sized parent to fill, <Text code>maxHeight</Text> lets the box
        grow with its content up to the cap and scroll past it. This is how
        dropdown menus keep a long option list in check.
      </Paragraph>
      <Flex direction="horizontal" gap="l" wrap align="start">
        <Flex
          direction="vertical"
          style={{
            width: 260,
            border: '1px solid var(--border-1)',
            borderRadius: 'var(--radius-l)',
            overflow: 'hidden',
          }}
        >
          <Scrollable maxHeight={200}>
            <CountryList />
          </Scrollable>
        </Flex>
        <Flex
          direction="vertical"
          style={{
            width: 260,
            border: '1px solid var(--border-1)',
            borderRadius: 'var(--radius-l)',
            overflow: 'hidden',
          }}
        >
          <Scrollable maxHeight={200}>
            <CountryList count={3} />
          </Scrollable>
        </Flex>
      </Flex>

      <Heading>Per-axis overflow</Heading>
      <Paragraph>
        <Text code>overflowX</Text> and <Text code>overflowY</Text> each take an
        OverlayScrollbars behaviour (<Text code>'scroll'</Text>,{' '}
        <Text code>'hidden'</Text>, <Text code>'visible'</Text>, …) and default
        to <Text code>'scroll'</Text>. Here the row scrolls sideways only.
      </Paragraph>
      <Frame width={360} height={120}>
        <Scrollable overflowX="scroll" overflowY="hidden">
          <Flex
            direction="horizontal"
            gap="s"
            style={{ padding: 'var(--space-content)', width: 'max-content' }}
          >
            {COUNTRIES.map((item) => (
              <Flex
                key={item.country}
                direction="horizontal"
                gap="xs"
                align="center"
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--interactive-1)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Text size={4}>{item.flag}</Text>
                <Text size={3}>{item.country}</Text>
              </Flex>
            ))}
          </Flex>
        </Scrollable>
      </Frame>

      <Heading>Inside a flex column</Heading>
      <Paragraph>
        The wrapper sets <Text code>min-height: 0</Text>, so it shrinks and
        scrolls next to a fixed header in a flex column instead of pushing the
        column taller.
      </Paragraph>
      <Frame>
        <Flex
          direction="horizontal"
          align="center"
          style={{
            padding: 'var(--space-content)',
            borderBottom: '1px solid var(--border-1)',
            flexShrink: 0,
          }}
        >
          <Text weight="bold">Countries</Text>
        </Flex>
        <Flex direction="vertical" style={{ flex: 1, minHeight: 0 }}>
          <Scrollable>
            <CountryList />
          </Scrollable>
        </Flex>
      </Frame>
    </Flex>
  ),
};
