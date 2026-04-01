import { Meta, StoryObj } from '@storybook/react';
import { Grid } from './index.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { DummyBox } from '../dummyBox';
import type { Gap } from 'types';

const story: Meta<typeof Grid> = {
  title: 'Components/Containers/Grid',
  component: Grid,
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

// Inline cell — props control height and label
const Cell = ({
  label,
  height = 56,
  muted = false,
}: {
  label: string;
  height?: number;
  muted?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height,
      borderRadius: 10,
      background: muted
        ? 'var(--surface-2)'
        : 'var(--accent-a3)',
      border: `1.5px solid ${muted ? 'var(--surface-3)' : 'var(--accent-a6)'}`,
      color: muted ? 'var(--text-1)' : 'var(--accent-a11)',
      fontSize: 'var(--text-size-3)',
      fontWeight: 'var(--text-weight-medium)',
      userSelect: 'none',
    }}
  >
    {label}
  </div>
);

// ─── Story 1: Column Sizes ────────────────────────────────────────────────────

const SIZE_ROWS: Array<[number, ...number[]]> = [
  [12],
  [6, 6],
  [4, 4, 4],
  [3, 3, 3, 3],
  [2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const SizesStory: StoryObj<typeof Flex> = {
  name: 'Column Sizes',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Flex direction="vertical" gap="xs">
        <Text size={5} weight="bold" block>Column Sizes</Text>
        <Text size={4} block>
          12 columns total. Each column can span 1–12 units.
        </Text>
      </Flex>

      {SIZE_ROWS.map((sizes) => (
        <Grid key={sizes.join('-')} gap="s">
          {sizes.map((size, i) => (
            <Grid.Column
              key={i}
              size={size as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}
            >
              <Cell label={`${size}`} height={48} />
            </Grid.Column>
          ))}
        </Grid>
      ))}

      <Flex direction="vertical" gap="xs">
        <Text size={5} weight="bold" block>Auto column</Text>
        <Text size={4} block>
          Columns without a size grow to fill the remaining space.
        </Text>
      </Flex>

      <Grid gap="s">
        <Grid.Column size={2}><Cell label="2" muted /></Grid.Column>
        <Grid.Column><Cell label="auto" /></Grid.Column>
        <Grid.Column size={3}><Cell label="3" muted /></Grid.Column>
      </Grid>
      <Grid gap="s">
        <Grid.Column><Cell label="auto" /></Grid.Column>
        <Grid.Column size={4}><Cell label="4" muted /></Grid.Column>
        <Grid.Column><Cell label="auto" /></Grid.Column>
      </Grid>
    </Flex>
  ),
};

// ─── Story 2: Gap ─────────────────────────────────────────────────────────────

const GAP_SAMPLES: Array<{ gap: Gap; label: string }> = [
  { gap: 'none', label: 'none — 0px' },
  { gap: 'xs',   label: 'xs — 4px' },
  { gap: 'm',    label: 'm — 8px' },
  { gap: 'l',    label: 'l — 12px' },
  { gap: 'xl',   label: 'xl — 24px' },
  { gap: 'xxl',  label: 'xxl — 36px' },
];

export const GapStory: StoryObj<typeof Flex> = {
  name: 'Gap',
  render: () => (
    <Flex direction="vertical" gap="xl">
      <Flex direction="vertical" gap="xs">
        <Text size={5} weight="bold" block>Column Gap</Text>
        <Text size={4} block>
          The <Text weight="bold">gap</Text> prop controls horizontal space between columns.
        </Text>
      </Flex>

      {GAP_SAMPLES.map(({ gap, label }) => (
        <Flex key={gap} direction="vertical" gap="xs">
          <Text size={3} weight="medium" block>{label}</Text>
          <Grid gap={gap}>
            {([3, 3, 3, 3] as const).map((size, i) => (
              <Grid.Column key={i} size={size}>
                <Cell label={`col ${size}`} height={44} />
              </Grid.Column>
            ))}
          </Grid>
        </Flex>
      ))}

      <Flex direction="vertical" gap="xs">
        <Text size={5} weight="bold" block>Row Gap</Text>
        <Text size={4} block>
          The <Text weight="bold">rowGap</Text> prop controls vertical space between wrapped rows.
        </Text>
      </Flex>

      {GAP_SAMPLES.map(({ gap, label }) => (
        <Flex key={gap} direction="vertical" gap="xs">
          <Text size={3} weight="medium" block>{label}</Text>
          <Grid gap="m" rowGap={gap}>
            {([4, 4, 4, 6, 6] as const).map((size, i) => (
              <Grid.Column key={i} size={size}>
                <Cell label={`col ${size}`} height={44} muted={i >= 3} />
              </Grid.Column>
            ))}
          </Grid>
        </Flex>
      ))}
    </Flex>
  ),
};

// ─── Story 3: Offsets ────────────────────────────────────────────────────────

export const OffsetStory: StoryObj<typeof Flex> = {
  name: 'Offsets',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Flex direction="vertical" gap="xs">
        <Text size={5} weight="bold" block>Offsets</Text>
        <Text size={4} block>
          The <Text weight="bold">offset</Text> prop shifts a column to the right by N units.
        </Text>
      </Flex>

      {([0, 1, 2, 3, 4, 6] as const).map((offset) => (
        <Grid key={offset} gap="s">
          <Grid.Column size={3}>
            <Cell label="size=3" height={44} muted />
          </Grid.Column>
          <Grid.Column size={4} offset={offset}>
            <Cell label={offset > 0 ? `size=4  offset=${offset}` : 'size=4'} height={44} />
          </Grid.Column>
        </Grid>
      ))}

      <Text size={5} weight="bold" block>Multiple offsets per row</Text>

      <Grid gap="m">
        <Grid.Column size={2}><Cell label="2" height={44} /></Grid.Column>
        <Grid.Column size={2} offset={2}><Cell label="2 / off 2" height={44} /></Grid.Column>
        <Grid.Column size={2} offset={2}><Cell label="2 / off 2" height={44} /></Grid.Column>
      </Grid>
      <Grid gap="m">
        <Grid.Column size={3} offset={1}><Cell label="3 / off 1" height={44} /></Grid.Column>
        <Grid.Column size={3} offset={1}><Cell label="3 / off 1" height={44} /></Grid.Column>
        <Grid.Column size={3} offset={1}><Cell label="3 / off 1" height={44} /></Grid.Column>
      </Grid>
      <Grid gap="m">
        <Grid.Column size={4} offset={4}><Cell label="4 / off 4" height={44} /></Grid.Column>
        <Grid.Column size={4}><Cell label="4" height={44} muted /></Grid.Column>
      </Grid>
    </Flex>
  ),
};

// ─── Story 4: Wrap ───────────────────────────────────────────────────────────

export const WrapStory: StoryObj<typeof Flex> = {
  name: 'Wrap',
  render: () => (
    <Flex direction="vertical" gap="xl">
      <Flex direction="vertical" gap="xs">
        <Text size={5} weight="bold" block>wrap=true (default)</Text>
        <Text size={4} block>
          Columns that exceed 12 units flow onto the next row.
        </Text>
      </Flex>

      <Grid gap="m" rowGap="m">
        <Grid.Column size={4}><DummyBox height="80px" /></Grid.Column>
        <Grid.Column size={4}><DummyBox height="120px" /></Grid.Column>
        <Grid.Column size={4}><DummyBox height="80px" /></Grid.Column>
        <Grid.Column size={3}><DummyBox height="64px" /></Grid.Column>
        <Grid.Column size={6}><DummyBox height="64px" /></Grid.Column>
        <Grid.Column size={3}><DummyBox height="64px" /></Grid.Column>
        <Grid.Column size={8}><DummyBox height="48px" /></Grid.Column>
        <Grid.Column size={4}><DummyBox height="48px" /></Grid.Column>
      </Grid>

      <Flex direction="vertical" gap="xs">
        <Text size={5} weight="bold" block>wrap=false</Text>
        <Text size={4} block>
          All columns stay in a single row. Excess content scrolls horizontally.
        </Text>
      </Flex>

      <div style={{ overflow: 'hidden' }}>
        <Grid gap="m" wrap={false}>
          {([2, 3, 4, 3, 2, 4, 3, 2] as const).map((size, i) => (
            <Grid.Column key={i} size={size}>
              <Cell label={`${size}`} height={56} muted={i % 2 === 1} />
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </Flex>
  ),
};

// ─── Story 5: Real-world layout ──────────────────────────────────────────────

const StatCard = ({ title, value, sub }: { title: string; value: string; sub: string }) => (
  <div
    style={{
      padding: 'var(--xl-gap)',
      borderRadius: 12,
      background: 'var(--surface-2)',
      border: '1px solid var(--surface-3)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--s-gap)',
      height: '100%',
    }}
  >
    <Text size={3}>{title}</Text>
    <Text size={7} weight="bold" block>{value}</Text>
    <Text size={3}>{sub}</Text>
  </div>
);

const ContentCard = ({ title, lines }: { title: string; lines: number }) => (
  <div
    style={{
      padding: 'var(--xl-gap)',
      borderRadius: 12,
      background: 'var(--surface-2)',
      border: '1px solid var(--surface-3)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--l-gap)',
      height: '100%',
    }}
  >
    <Text size={4} weight="bold" block>{title}</Text>
    {Array.from({ length: lines }).map((_, i) => (
      <DummyBox key={i} height="14px" width={`${70 + (i % 3) * 10}%`} />
    ))}
  </div>
);

export const LayoutStory: StoryObj<typeof Flex> = {
  name: 'Real-world Layout',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Flex direction="vertical" gap="xs">
        <Text size={5} weight="bold" block>Dashboard Layout</Text>
        <Text size={4} block>
          A typical dashboard: stat row, main content + sidebar, card grid.
        </Text>
      </Flex>

      {/* Stat row */}
      <Grid gap="l" rowGap="l">
        <Grid.Column size={3}>
          <StatCard title="Total Revenue" value="$48,295" sub="↑ 12% vs last month" />
        </Grid.Column>
        <Grid.Column size={3}>
          <StatCard title="Active Users" value="3,842" sub="↑ 4% vs last week" />
        </Grid.Column>
        <Grid.Column size={3}>
          <StatCard title="New Orders" value="1,204" sub="↓ 2% vs yesterday" />
        </Grid.Column>
        <Grid.Column size={3}>
          <StatCard title="Conversion" value="5.6%" sub="Stable" />
        </Grid.Column>

        {/* Main + sidebar */}
        <Grid.Column size={8}>
          <ContentCard title="Activity Overview" lines={7} />
        </Grid.Column>
        <Grid.Column size={4}>
          <ContentCard title="Recent Events" lines={9} />
        </Grid.Column>

        {/* Card grid */}
        {[
          'Analytics',
          'Marketing',
          'Infrastructure',
          'Support',
          'Security',
          'Settings',
        ].map((title) => (
          <Grid.Column key={title} size={4}>
            <ContentCard title={title} lines={3} />
          </Grid.Column>
        ))}
      </Grid>
    </Flex>
  ),
};

export default story;
