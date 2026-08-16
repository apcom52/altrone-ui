import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, Avatar } from 'components';
import { StorybookDecorator } from 'global/storybook';

const story: Meta = {
  title: 'Foundations/Color',
  decorators: [StorybookDecorator],
};

export default story;

const Heading = ({ children }: { children: string }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Code = ({ children }: { children: string }) => (
  <Text
    block
    code
    style={{
      display: 'block',
      padding: '12px 16px',
      background: 'var(--gray-a3)',
      borderRadius: 'var(--radius-s)',
      whiteSpace: 'pre-wrap',
    }}
  >
    {children}
  </Text>
);

const statuses = ['danger', 'success', 'warning', 'info'];

const roleSteps: { role: string; steps: [number, number] }[] = [
  { role: 'background', steps: [1, 2] },
  { role: 'interactive', steps: [3, 5] },
  { role: 'border', steps: [6, 8] },
  { role: 'solid', steps: [9, 10] },
  { role: 'text', steps: [11, 12] },
];

const StatusCard = ({ name }: { name: string }) => (
  <Flex direction="vertical" gap="s" style={{ width: 160 }}>
    <div
      style={{
        height: 64,
        borderRadius: 12,
        background: `var(--${name}-solid-1)`,
      }}
    />
    <Text size={4} weight="bold">
      {name}
    </Text>
    <Flex gap="xxs">
      {[
        `--${name}-background-1`,
        `--${name}-interactive-2`,
        `--${name}-border-2`,
        `--${name}-solid-1`,
        `--${name}-text-2`,
      ].map((token) => (
        <div
          key={token}
          title={token}
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: `var(${token})`,
            border: '1px solid var(--gray-a5)',
          }}
        />
      ))}
    </Flex>
  </Flex>
);

const HueScale = ({ hue }: { hue: string }) => (
  <Flex direction="vertical" gap="s">
    <Text size={3} weight="medium">
      --{hue}-*
    </Text>
    <Flex gap="xxs">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            background: `var(--${hue}-${step})`,
          }}
        />
      ))}
    </Flex>
  </Flex>
);

export const Overview: StoryObj = {
  name: 'Color System',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Color
      </Text>
      <Paragraph>
        Altrone&rsquo;s palettes are ported from Radix Colors: 12 steps plus
        a matching alpha (<code>-aN</code>) variant per hue, each defined
        for light and dark themes, in <code>display-p3</code> for wider-
        gamut displays. Components never reach for a raw step directly —
        they go through a purpose-named semantic layer built on top, the
        same primitive-plus-alias approach used for spacing and radius.
      </Paragraph>

      <Heading>Status colors</Heading>
      <Paragraph>
        <code>danger</code>, <code>success</code>, and <code>warning</code>{' '}
        are fixed hues (red, green, amber) rather than something that
        shifts with the chosen <code>accent</code> — a component can
        always tell &ldquo;this is a status color&rdquo; apart from
        &ldquo;this is the brand accent&rdquo;, and picking{' '}
        <code>accent=&quot;red&quot;</code> won&rsquo;t make danger states
        disappear into the rest of the UI. <code>info</code> is the
        exception: it deliberately follows <code>--accent</code>, since
        it&rsquo;s about drawing attention within the primary flow rather
        than signaling a universal state — switch the accent in the
        toolbar above and its swatch below will follow.
      </Paragraph>
      <Flex gap="l" wrap>
        {statuses.map((name) => (
          <StatusCard key={name} name={name} />
        ))}
      </Flex>

      <Heading>The role scale</Heading>
      <Paragraph>
        Every status (and the neutral gray scale it&rsquo;s modeled on)
        maps its 12 steps to the same five purpose-named roles, so reading
        one status&rsquo;s CSS teaches you how to read all of them:
      </Paragraph>
      <Flex direction="vertical" gap="s">
        {roleSteps.map(({ role, steps }) => (
          <Text key={role} size={3}>
            <code>{role}</code> — steps {steps[0]}
            {steps[1] !== steps[0] ? `–${steps[1]}` : ''}
          </Text>
        ))}
      </Flex>
      <Paragraph>
        In practice, that&rsquo;s how <code>Text</code>&rsquo;s{' '}
        <code>color=&quot;danger&quot;</code> is wired — through the text
        role, not a raw step:
      </Paragraph>
      <Code>{'--text-color-danger: var(--danger-text-1);'}</Code>

      <Heading>Disabled state</Heading>
      <Paragraph>
        Disabled elements use a dedicated solid palette (
        <code>--disabled-background</code>, <code>--disabled-border</code>,{' '}
        <code>--disabled-text-color</code>) rather than opacity. Opacity is
        unpredictable layered over glass/translucent materials — alpha
        channels stack, so the same <code>opacity: 0.5</code> looks
        different depending on what material sits behind it.
      </Paragraph>

      <Heading>Accent hues</Heading>
      <Paragraph>
        Ten hues are available as a switchable <code>accent</code> (plus
        gray and black, which aren&rsquo;t switchable). Components read{' '}
        <code>--accent-N</code>, never a raw hue name — switching the{' '}
        <code>accent</code> prop just repoints which hue{' '}
        <code>--accent-N</code> resolves to.
      </Paragraph>
      <Flex direction="vertical" gap="m">
        {[
          'red',
          'orange',
          'amber',
          'green',
          'teal',
          'blue',
          'indigo',
          'purple',
          'pink',
          'brown',
        ].map((hue) => (
          <HueScale key={hue} hue={hue} />
        ))}
      </Flex>

      <Heading>Categorical colors</Heading>
      <Paragraph>
        A separate 10-color set for telling same-shaped items apart by
        identity — an avatar per person, a tag per label — rather than
        conveying meaning the way status colors do. Each entry is a
        different hue rather than shades of one, so neighbors stay
        distinguishable:
      </Paragraph>
      <Flex gap="s" wrap>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <div
            key={n}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: `var(--category-${n})`,
            }}
          />
        ))}
      </Flex>
      <Paragraph>
        Nothing picks a category color explicitly — the same identity
        string always resolves to the same one of the 10, via{' '}
        <code>ColorUtils.getCategoricalColorIndex</code>. <code>Avatar</code>{' '}
        uses this today for its background when no explicit{' '}
        <code>backgroundColor</code> is passed:
      </Paragraph>
      <Flex gap="m" wrap>
        {[
          ['Ada', 'Lovelace'],
          ['Grace', 'Hopper'],
          ['Alan', 'Turing'],
          ['Katherine', 'Johnson'],
          ['Margaret', 'Hamilton'],
        ].map(([first, last]) => (
          <Avatar key={first} firstName={first} lastName={last} />
        ))}
      </Flex>

      <Heading>Point tokens</Heading>
      <Paragraph>
        A handful of one-off colors that don&rsquo;t belong to a scale:
      </Paragraph>
      <Flex direction="vertical" gap="s">
        <Text size={3}>
          <code>--color-overlay-scrim</code> — the dimming layer behind{' '}
          <code>Modal</code>/<code>Drawer</code>, shared by both instead of
          each defining its own copy of the same value.
        </Text>
        <Text size={3}>
          <code>--color-header-backdrop</code> — the blurred bar behind{' '}
          <code>Screen.Header</code>. Deliberately accent-tinted, not
          neutral gray — a considered choice, not an oversight.
        </Text>
        <Text size={3}>
          <code>--color-selection</code> — <code>::selection</code>{' '}
          background for selected text. Select some of this sentence to
          see it.
        </Text>
      </Flex>
    </Flex>
  ),
};
