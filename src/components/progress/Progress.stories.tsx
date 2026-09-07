import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Flex, Progress, Range, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta<typeof Progress> = {
  title: 'Components/Display/Progress',
  component: Progress,
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

const Section = ({ children }: { children: string }) => (
  <Text block size={6} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

export const Overview: StoryObj<typeof Progress> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Progress
      </Text>
      <Paragraph>
        <Text code>Progress</Text> is a horizontal bar for a task with a known
        completion ratio — a file upload, a multi-step form, a quota. It carries
        an accessible <Text code>role="progressbar"</Text> with{' '}
        <Text code>aria-valuenow</Text> / <Text code>valuemin</Text> /{' '}
        <Text code>valuemax</Text>, and shows a label on top of the fill.
      </Paragraph>
      <Paragraph>
        The fill ratio is <Text code>(value - min) / (max - min)</Text>, clamped
        to 0–100%. The label defaults to that percentage; pass a string or a
        render function to replace it.
      </Paragraph>
      <Paragraph>
        The track is a <Text code>Box</Text> (<Text code>shape="pill"</Text>,{' '}
        <Text code>material="glass"</Text>), so its radius and frosted
        background come from the shared Box system; the active fill and label
        colours stay Progress&rsquo;s own, themeable via the{' '}
        <Text code>--progress-*</Text> custom properties.
      </Paragraph>

      <Progress value={62} />
    </Flex>
  ),
};

export const Sizes: StoryObj<typeof Progress> = {
  name: 'Sizes',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Sizes</Section>
      <Paragraph>
        <Text code>size</Text> follows the shared scale (<Text code>mini</Text>{' '}
        / <Text code>s</Text> / <Text code>m</Text> / <Text code>l</Text> /{' '}
        <Text code>xl</Text>) — it drives the bar height and the label type size
        together.
      </Paragraph>

      <Flex direction="vertical" gap="m">
        <Progress size="mini" value={60} />
        <Progress size="s" value={60} />
        <Progress size="m" value={60} />
        <Progress size="l" value={60} />
        <Progress size="xl" value={60} />
      </Flex>
    </Flex>
  ),
};

export const Labels: StoryObj<typeof Progress> = {
  name: 'Labels',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Labels</Section>
      <Paragraph>
        With no <Text code>children</Text> the label is the rounded percentage.
        A string replaces it wholesale. A render function gets{' '}
        <Text code>{'{ value, min, max, percentage }'}</Text> — use it for
        &ldquo;X of Y&rdquo; counters or a custom phrasing.
      </Paragraph>

      <Flex direction="vertical" gap="m">
        <Progress value={42} />
        <Progress value={42} aria-label="Uploading files">
          Uploading files…
        </Progress>
        <Progress value={42} max={200} aria-label="42 of 200">
          {({ value, max, percentage }) => (
            <span>
              {value} of {max} ({percentage}%)
            </span>
          )}
        </Progress>
      </Flex>
    </Flex>
  ),
};

export const ValueRange: StoryObj<typeof Progress> = {
  name: 'Value range',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Value range</Section>
      <Paragraph>
        <Text code>min</Text> and <Text code>max</Text> define the range. They
        also feed <Text code>aria-valuemin</Text> / <Text code>valuemax</Text>,
        and <Text code>aria-valuenow</Text> is clamped into that range — a{' '}
        <Text code>value</Text> outside it still renders a sane bar and correct
        ARIA.
      </Paragraph>

      <Flex direction="vertical" gap="m">
        <Progress value={0} max={8} aria-label="Step 0 of 8">
          {({ value, max }) => `Step ${value} of ${max}`}
        </Progress>
        <Progress value={3} max={8} aria-label="Step 3 of 8">
          {({ value, max }) => `Step ${value} of ${max}`}
        </Progress>
        <Progress value={8} max={8} aria-label="Step 8 of 8">
          {({ value, max }) => `Step ${value} of ${max}`}
        </Progress>
        <Progress value={140} min={100} max={200} aria-label="Temperature">
          {({ value }) => `${value}°`}
        </Progress>
      </Flex>
    </Flex>
  ),
};

export const LiveValue: StoryObj<typeof Progress> = {
  name: 'Live value',
  render: () => {
    const [value, setValue] = useState(35);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Section>Live value</Section>
        <Paragraph>
          <Text code>Progress</Text> is fully controlled — it renders whatever{' '}
          <Text code>value</Text> it&rsquo;s given. Drag the{' '}
          <Text code>Range</Text> to update it.
        </Paragraph>

        <Progress value={value} aria-label="Download" />
        <Range
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          showCurrentValue="always"
          renderLabel={(v) => `${v}%`}
        />
      </Flex>
    );
  },
};

export const Theming: StoryObj<typeof Progress> = {
  name: 'Theming',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Section>Theming</Section>
      <Paragraph>
        The track is the Box&rsquo;s own neutral frosted fill. Two custom
        properties recolour the rest —{' '}
        <Text code>--progress-active-background-color</Text> (fill) and{' '}
        <Text code>--progress-text-color</Text> (label). Set them via{' '}
        <Text code>style</Text> or a class.
      </Paragraph>

      <Flex direction="vertical" gap="m">
        <Progress
          value={70}
          aria-label="Storage"
          style={{
            ['--progress-active-background-color' as string]: 'var(--teal-9)',
            ['--progress-text-color' as string]: 'var(--teal-12)',
          }}
        >
          Storage used
        </Progress>
        <Progress
          value={92}
          aria-label="Quota"
          style={{
            ['--progress-active-background-color' as string]: 'var(--red-9)',
            ['--progress-text-color' as string]: 'var(--red-12)',
          }}
        >
          Nearly full
        </Progress>
      </Flex>
    </Flex>
  ),
};
