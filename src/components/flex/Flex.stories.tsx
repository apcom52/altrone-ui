import { Meta, StoryObj } from '@storybook/react';
import { Flex } from './index.ts';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Text } from '../text';
import { Box } from '../box';
import type { Gap } from 'types';

const story: Meta<typeof Flex> = {
  title: 'Components/Containers/Flex',
  component: Flex,
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

const Heading = ({ children }: { children: string }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Subheading = ({ children }: { children: string }) => (
  <Text block size={5} weight="bold" style={{ marginTop: 4 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 660, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Code = ({ children }: { children: string }) => (
  <Text
    block
    code
    style={{
      padding: '12px 16px',
      background: 'var(--gray-a3)',
      borderRadius: 'var(--radius-s)',
      whiteSpace: 'pre-wrap',
    }}
  >
    {children}
  </Text>
);

const Cell = ({
  label,
  accent = false,
  height = 44,
}: {
  label: string;
  accent?: boolean;
  height?: number;
}) => (
  <Flex
    align="center"
    justify="center"
    style={{
      minWidth: 64,
      height,
      padding: '0 16px',
      borderRadius: 'var(--radius-m)',
      background: accent ? 'var(--accent-a3)' : 'var(--gray-a3)',
      border: `1px solid ${accent ? 'var(--accent-a7)' : 'var(--gray-a6)'}`,
      color: accent ? 'var(--accent-a11)' : 'var(--text-1)',
      fontSize: 'var(--text-size-3)',
      fontWeight: 'var(--text-weight-medium)',
      userSelect: 'none',
    }}
  >
    {label}
  </Flex>
);

/* A framed area so cross-axis alignment and main-axis distribution are visible. */
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      border: '1px dashed var(--gray-a6)',
      borderRadius: 'var(--radius-m)',
      padding: 12,
    }}
  >
    {children}
  </div>
);

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof Flex> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Flex
      </Text>
      <Paragraph>
        <Text code>Flex</Text> is a one-axis layout primitive — a typed wrapper
        over CSS flexbox. Instead of hand-written classes or inline styles it
        exposes <Text code>direction</Text>, <Text code>align</Text>,{' '}
        <Text code>justify</Text>, <Text code>gap</Text> and{' '}
        <Text code>wrap</Text>, with <Text code>gap</Text> bound to the
        design-system spacing scale so spacing stays consistent without magic
        numbers.
      </Paragraph>
      <Paragraph>
        Use it for a row or a column of items — a toolbar, a form, a media
        object, a page section stack. When you need a shared column rhythm
        across multiple rows, reach for <Text code>Grid</Text> instead.
      </Paragraph>

      <Flex gap="m" align="center">
        <Box shape="circle" material="hatch" size={40} />
        <Flex direction="vertical" gap="xxs">
          <Text weight="medium">Alice Morgan</Text>
          <Text size={3} color="muted">
            Product Designer
          </Text>
        </Flex>
      </Flex>

      <Code>{`<Flex gap="m" align="center">
  <Avatar firstName="Alice" />
  <Flex direction="vertical" gap="xxs">
    <Text weight="medium">Alice Morgan</Text>
    <Text size={3} color="muted">Product Designer</Text>
  </Flex>
</Flex>`}</Code>
    </Flex>
  ),
};

// ─── Direction ──────────────────────────────────────────────────────────────

export const DirectionStory: StoryObj<typeof Flex> = {
  name: 'Direction',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Direction</Heading>
      <Paragraph>
        <Text code>direction="horizontal"</Text> (the default) lays children out
        in a row; <Text code>direction="vertical"</Text> stacks them. Flex is
        always full-width — a vertical stack fills its container.
      </Paragraph>

      <Subheading>horizontal</Subheading>
      <Flex gap="m">
        <Cell label="One" />
        <Cell label="Two" />
        <Cell label="Three" />
      </Flex>

      <Subheading>vertical</Subheading>
      <Flex direction="vertical" gap="s">
        <Cell label="One" />
        <Cell label="Two" />
        <Cell label="Three" />
      </Flex>
    </Flex>
  ),
};

// ─── Align ──────────────────────────────────────────────────────────────────

export const AlignStory: StoryObj<typeof Flex> = {
  name: 'Align (cross axis)',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Align — cross axis</Heading>
      <Paragraph>
        <Text code>align</Text> sets <Text code>align-items</Text> — the
        position of children on the axis perpendicular to{' '}
        <Text code>direction</Text>. In a horizontal Flex that&rsquo;s vertical
        placement. With no <Text code>align</Text> children stretch to the
        tallest.
      </Paragraph>

      {(['start', 'center', 'end'] as const).map((align) => (
        <Flex key={align} direction="vertical" gap="xxs">
          <Text size={3} weight="medium" block>
            align={align}
          </Text>
          <Frame>
            <Flex align={align} gap="m" style={{ height: 96 }}>
              <Cell label="short" />
              <Cell label="tall" accent height={72} />
              <Cell label="short" />
            </Flex>
          </Frame>
        </Flex>
      ))}
    </Flex>
  ),
};

// ─── Justify ────────────────────────────────────────────────────────────────

export const JustifyStory: StoryObj<typeof Flex> = {
  name: 'Justify (main axis)',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Justify — main axis</Heading>
      <Paragraph>
        <Text code>justify</Text> sets <Text code>justify-content</Text> — how
        free space along the main axis is distributed.{' '}
        <Text code>justify="between"</Text> is the header pattern: title left,
        action right.
      </Paragraph>

      {(['start', 'center', 'end', 'between'] as const).map((justify) => (
        <Flex key={justify} direction="vertical" gap="xxs">
          <Text size={3} weight="medium" block>
            justify={justify}
          </Text>
          <Frame>
            <Flex justify={justify} gap="m">
              <Cell label="One" />
              <Cell label="Two" />
              <Cell label="Three" />
            </Flex>
          </Frame>
        </Flex>
      ))}
    </Flex>
  ),
};

// ─── Gap ────────────────────────────────────────────────────────────────────

const GAPS: Gap[] = ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

export const GapStory: StoryObj<typeof Flex> = {
  name: 'Gap',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Gap</Heading>
      <Paragraph>
        <Text code>gap</Text> is the space between children, on either axis.
        Each token maps to a design-system spacing variable, so the same{' '}
        <Text code>gap="m"</Text> reads identically everywhere and adapts with
        the theme.
      </Paragraph>

      {GAPS.map((gap) => (
        <Flex key={gap} direction="vertical" gap="xxs">
          <Text size={3} weight="medium" block>
            {gap}
          </Text>
          <Flex gap={gap}>
            <Cell label="A" accent />
            <Cell label="B" accent />
            <Cell label="C" accent />
            <Cell label="D" accent />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

// ─── Wrap ───────────────────────────────────────────────────────────────────

export const WrapStory: StoryObj<typeof Flex> = {
  name: 'Wrap',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 480 }}>
      <Heading>Wrap</Heading>
      <Paragraph>
        By default children never wrap and can overflow. <Text code>wrap</Text>{' '}
        lets them flow onto the next line — tag clouds, filter sets, button
        groups in a narrow container.
      </Paragraph>

      <Subheading>wrap</Subheading>
      <Flex gap="s" wrap>
        {Array.from({ length: 12 }).map((_, i) => (
          <Cell key={i} label={`item ${i + 1}`} />
        ))}
      </Flex>
    </Flex>
  ),
};

// ─── Disable inner margins ─────────────────────────────────────────────────

export const InnerMarginsStory: StoryObj<typeof Flex> = {
  name: 'Disable inner margins',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Disable inner margins</Heading>
      <Paragraph>
        <Text code>disableInnerMargins</Text> (on by default) zeroes the margins
        of direct children so <Text code>gap</Text> is the single source of
        spacing — otherwise a child&rsquo;s own margin (a heading, a{' '}
        <Text code>&lt;p&gt;</Text>) would stack on top of the gap. Set it to{' '}
        <Text code>false</Text> when a child is meant to keep its own margin.
      </Paragraph>

      <Subheading>disableInnerMargins (default)</Subheading>
      <Frame>
        <Flex direction="vertical" gap="s">
          <Text block size={5} weight="bold">
            Section title
          </Text>
          <Text block>
            Body paragraph. Its default block margin is suppressed, so the space
            above is exactly <Text code>gap="s"</Text>.
          </Text>
        </Flex>
      </Frame>

      <Subheading>disableInnerMargins = false</Subheading>
      <Frame>
        <Flex direction="vertical" gap="s" disableInnerMargins={false}>
          <Text block size={5} weight="bold">
            Section title
          </Text>
          <Text block>
            Body paragraph. Its own block margin now adds to the gap, so the
            vertical rhythm is larger and less predictable.
          </Text>
        </Flex>
      </Frame>
    </Flex>
  ),
};

// ─── Custom element ───────────────────────────────────────────────────────────

export const CustomElement: StoryObj<typeof Flex> = {
  name: 'Custom element',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Custom element</Heading>
      <Paragraph>
        <Text code>tagName</Text> renders the layout as any HTML element without
        changing its flex behaviour — a <Text code>&lt;nav&gt;</Text> of links,
        a <Text code>&lt;ul&gt;</Text> of items, a{' '}
        <Text code>&lt;section&gt;</Text> wrapper.
      </Paragraph>

      <Code>{`<Flex tagName="nav" gap="m" align="center">
  <a href="/">Home</a>
  <a href="/docs">Docs</a>
</Flex>`}</Code>

      <Flex
        tagName="ul"
        direction="vertical"
        gap="s"
        style={{ listStyle: 'none', margin: 0, padding: 0 }}
      >
        {['First item', 'Second item', 'Third item'].map((label) => (
          <Flex tagName="li" key={label}>
            <Cell label={label} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};
