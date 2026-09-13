import { Meta, StoryObj } from '@storybook/react';
import { Grid } from './index.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Box } from '../box';
import { Scrollable } from '../scrollable';
import type { Gap } from 'types';
import type { GridColumnOffset, GridColumnSize } from './Grid.types.ts';

const story: Meta<typeof Grid> = {
  title: 'Components/Containers/Grid',
  component: Grid,
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

/** Filled demo cell — the accent variant marks the "column under discussion". */
const Cell = ({
  label,
  height = 48,
  muted = false,
}: {
  label: string;
  height?: number;
  muted?: boolean;
}) => (
  <Flex
    align="center"
    justify="center"
    style={{
      height,
      borderRadius: 'var(--radius-m)',
      background: muted ? 'var(--gray-a3)' : 'var(--accent-a3)',
      border: `1px solid ${muted ? 'var(--gray-a6)' : 'var(--accent-a7)'}`,
      color: muted ? 'var(--text-1)' : 'var(--accent-a11)',
      fontSize: 'var(--text-size-3)',
      fontWeight: 'var(--text-weight-medium)',
      userSelect: 'none',
    }}
  >
    {label}
  </Flex>
);

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof Grid> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Text block size={9} weight="bold">
        Grid
      </Text>
      <Paragraph>
        <Text code>Grid</Text> is a 12-column layout container. Each direct
        child is a <Text code>Grid.Column</Text> whose <Text code>size</Text>{' '}
        says how many of the 12 units it spans; columns flow left to right and
        wrap to a new row once a row is full.
      </Paragraph>
      <Paragraph>
        Reach for <Text code>Grid</Text> when you need a shared column rhythm
        across rows — a page skeleton, a card gallery, a form with aligned
        fields. For a single row or column of items that just need to sit next
        to each other, <Text code>Flex</Text> is the lighter choice.
      </Paragraph>

      <Grid gap="m" rowGap="m">
        <Grid.Column size={8}>
          <Cell label="size=8" />
        </Grid.Column>
        <Grid.Column size={4}>
          <Cell label="size=4" muted />
        </Grid.Column>
        <Grid.Column size={4}>
          <Cell label="size=4" muted />
        </Grid.Column>
        <Grid.Column size={4}>
          <Cell label="size=4" muted />
        </Grid.Column>
        <Grid.Column size={4}>
          <Cell label="size=4" muted />
        </Grid.Column>
      </Grid>

      <Code>{`<Grid gap="m" rowGap="m">
  <Grid.Column size={8}>…</Grid.Column>
  <Grid.Column size={4}>…</Grid.Column>
  <Grid.Column size={4}>…</Grid.Column>
  <Grid.Column size={4}>…</Grid.Column>
  <Grid.Column size={4}>…</Grid.Column>
</Grid>`}</Code>
    </Flex>
  ),
};

// ─── Column sizes ────────────────────────────────────────────────────────────

const SIZE_ROWS: number[][] = [
  [12],
  [6, 6],
  [4, 4, 4],
  [3, 3, 3, 3],
  [2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const ColumnSizes: StoryObj<typeof Grid> = {
  name: 'Column sizes',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Column sizes</Heading>
      <Paragraph>
        The grid is always 12 units wide. A column&rsquo;s{' '}
        <Text code>size</Text> (<Text code>1</Text>&ndash;<Text code>12</Text>)
        is how many units it takes; the sizes in a row should add up to 12 for a
        clean fit, though they don&rsquo;t have to.
      </Paragraph>

      <Flex direction="vertical" gap="s">
        {SIZE_ROWS.map((sizes) => (
          <Grid key={sizes.join('-')} gap="s">
            {sizes.map((size, i) => (
              <Grid.Column key={i} size={size as GridColumnSize}>
                <Cell label={`${size}`} height={44} />
              </Grid.Column>
            ))}
          </Grid>
        ))}
      </Flex>
    </Flex>
  ),
};

// ─── Auto columns ───────────────────────────────────────────────────────────

export const AutoColumns: StoryObj<typeof Grid> = {
  name: 'Auto columns',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Auto columns</Heading>
      <Paragraph>
        A column with no <Text code>size</Text> (or{' '}
        <Text code>size="auto"</Text>, the default) doesn&rsquo;t claim a fixed
        span — it grows to share whatever space the sized columns leave. Several
        auto columns in one row split the remainder evenly.
      </Paragraph>

      <Flex direction="vertical" gap="s">
        <Grid gap="s">
          <Grid.Column size={2}>
            <Cell label="2" muted />
          </Grid.Column>
          <Grid.Column>
            <Cell label="auto" />
          </Grid.Column>
          <Grid.Column size={3}>
            <Cell label="3" muted />
          </Grid.Column>
        </Grid>
        <Grid gap="s">
          <Grid.Column>
            <Cell label="auto" />
          </Grid.Column>
          <Grid.Column size={4}>
            <Cell label="4" muted />
          </Grid.Column>
          <Grid.Column>
            <Cell label="auto" />
          </Grid.Column>
        </Grid>
      </Flex>

      <Paragraph>
        This is the pattern for a field that fills the row beside fixed-width
        controls:
      </Paragraph>
      <Code>{`<Grid gap="s">
  <Grid.Column size="auto"><Button label="Filters" /></Grid.Column>
  <Grid.Column size={9}><TextInput placeholder="Search…" /></Grid.Column>
  <Grid.Column size="auto"><Button label="Go" /></Grid.Column>
</Grid>`}</Code>
    </Flex>
  ),
};

// ─── Gap ─────────────────────────────────────────────────────────────────────

const GAPS: Gap[] = ['none', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

export const GapAndRowGap: StoryObj<typeof Grid> = {
  name: 'Gap and row gap',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Gap and row gap</Heading>
      <Paragraph>
        <Text code>gap</Text> sets the horizontal space between columns.{' '}
        <Text code>rowGap</Text> sets the vertical space between wrapped rows —
        omit it and it defaults to <Text code>none</Text>, independent of{' '}
        <Text code>gap</Text>. Both take the shared spacing scale.
      </Paragraph>

      <Subheading>gap</Subheading>
      <Flex direction="vertical" gap="s">
        {GAPS.map((gap) => (
          <Flex key={gap} direction="vertical" gap="xxs">
            <Text size={3} weight="medium" block>
              {gap}
            </Text>
            <Grid gap={gap}>
              {([3, 3, 3, 3] as const).map((size, i) => (
                <Grid.Column key={i} size={size}>
                  <Cell label={`${size}`} height={40} />
                </Grid.Column>
              ))}
            </Grid>
          </Flex>
        ))}
      </Flex>

      <Subheading>rowGap</Subheading>
      <Flex direction="vertical" gap="s">
        {(['none', 'm', 'xl'] as Gap[]).map((rowGap) => (
          <Flex key={rowGap} direction="vertical" gap="xxs">
            <Text size={3} weight="medium" block>
              rowGap={rowGap}
            </Text>
            <Grid gap="m" rowGap={rowGap}>
              {([4, 4, 4, 6, 6] as const).map((size, i) => (
                <Grid.Column key={i} size={size}>
                  <Cell label={`${size}`} height={40} muted={i >= 3} />
                </Grid.Column>
              ))}
            </Grid>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};

// ─── Offsets ────────────────────────────────────────────────────────────────

export const Offsets: StoryObj<typeof Grid> = {
  name: 'Offsets',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Offsets</Heading>
      <Paragraph>
        <Text code>offset</Text> pushes a column to the right by N units before
        it&rsquo;s placed — empty space, not a sibling column. Use it to centre
        a block (<Text code>offset</Text> + <Text code>size</Text> + matching
        tail = 12) or to indent one row against the others.
      </Paragraph>

      <Flex direction="vertical" gap="s">
        {([0, 1, 2, 4, 6] as GridColumnOffset[]).map((offset) => (
          <Grid key={offset} gap="s">
            <Grid.Column size={3}>
              <Cell label="3" height={40} muted />
            </Grid.Column>
            <Grid.Column size={4} offset={offset}>
              <Cell label={offset ? `4 · offset ${offset}` : '4'} height={40} />
            </Grid.Column>
          </Grid>
        ))}
      </Flex>

      <Paragraph>Centred single column:</Paragraph>
      <Grid gap="s">
        <Grid.Column size={6} offset={3}>
          <Cell label="6 · offset 3" height={44} />
        </Grid.Column>
      </Grid>
    </Flex>
  ),
};

// ─── No wrap ────────────────────────────────────────────────────────────────

export const NoWrap: StoryObj<typeof Grid> = {
  name: 'No wrap',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>No wrap</Heading>
      <Paragraph>
        By default columns wrap once a row exceeds 12 units. With{' '}
        <Text code>wrap=false</Text> they&rsquo;re forced onto a single line and
        shrink to fit instead — useful for a toolbar or tab strip that should
        never break, typically paired with an overflow container.
      </Paragraph>

      <Subheading>wrap (default)</Subheading>
      <Grid gap="m" rowGap="m">
        <Grid.Column size={4}>
          <Box material="hatch" width="100%" height={72} />
        </Grid.Column>
        <Grid.Column size={4}>
          <Box material="hatch" width="100%" height={72} />
        </Grid.Column>
        <Grid.Column size={4}>
          <Box material="hatch" width="100%" height={72} />
        </Grid.Column>
        <Grid.Column size={8}>
          <Box material="hatch" width="100%" height={48} />
        </Grid.Column>
        <Grid.Column size={4}>
          <Box material="hatch" width="100%" height={48} />
        </Grid.Column>
      </Grid>

      <Subheading>wrap = false</Subheading>
      <Scrollable overflowX="scroll" overflowY="hidden">
        <Grid gap="m" wrap={false} style={{ minWidth: 640 }}>
          {([2, 3, 4, 3, 2, 4, 3, 2] as const).map((size, i) => (
            <Grid.Column key={i} size={size}>
              <Cell label={`${size}`} height={52} muted={i % 2 === 1} />
            </Grid.Column>
          ))}
        </Grid>
      </Scrollable>
    </Flex>
  ),
};

// ─── Custom element ─────────────────────────────────────────────────────────

export const CustomElement: StoryObj<typeof Grid> = {
  name: 'Custom element',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Custom element</Heading>
      <Paragraph>
        <Text code>tagName</Text> swaps the rendered element without changing
        the layout — render the grid as a <Text code>&lt;ul&gt;</Text> and its
        columns as <Text code>&lt;li&gt;</Text> when the content is semantically
        a list, or as a <Text code>&lt;section&gt;</Text> for a page region.
      </Paragraph>

      <Code>{`<Grid tagName="ul" gap="m" rowGap="m">
  {items.map((item) => (
    <Grid.Column tagName="li" key={item.id} size={4}>…</Grid.Column>
  ))}
</Grid>`}</Code>

      <Grid
        tagName="ul"
        gap="m"
        rowGap="m"
        style={{ listStyle: 'none', margin: 0, padding: 0 }}
      >
        {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((label) => (
          <Grid.Column tagName="li" key={label} size={4}>
            <Cell label={label} />
          </Grid.Column>
        ))}
      </Grid>
    </Flex>
  ),
};

// ─── Real-world layout ──────────────────────────────────────────────────────

const Panel = ({
  title,
  value,
  lines = 0,
}: {
  title: string;
  value?: string;
  lines?: number;
}) => (
  <Flex
    direction="vertical"
    gap="s"
    style={{
      padding: 'var(--xl-gap)',
      borderRadius: 'var(--radius-l)',
      background: 'var(--background-2)',
      border: '1px solid var(--gray-a5)',
      height: '100%',
    }}
  >
    <Text size={3} color="muted" block>
      {title}
    </Text>
    {value ? (
      <Text size={7} weight="bold" block>
        {value}
      </Text>
    ) : null}
    {Array.from({ length: lines }).map((_, i) => (
      <Box key={i} material="hatch" height={12} width={`${65 + (i % 3) * 12}%`} />
    ))}
  </Flex>
);

export const RealWorldLayout: StoryObj<typeof Grid> = {
  name: 'Real-world layout',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Heading>Real-world layout</Heading>
      <Paragraph>
        One grid drives a whole dashboard: a four-up stat row, a wide content
        panel beside a narrow sidebar, then a three-up card grid — all sharing
        the same 12-column rhythm and gap.
      </Paragraph>

      <Grid gap="l" rowGap="l">
        <Grid.Column size={3}>
          <Panel title="Revenue" value="$48,295" />
        </Grid.Column>
        <Grid.Column size={3}>
          <Panel title="Active users" value="3,842" />
        </Grid.Column>
        <Grid.Column size={3}>
          <Panel title="Orders" value="1,204" />
        </Grid.Column>
        <Grid.Column size={3}>
          <Panel title="Conversion" value="5.6%" />
        </Grid.Column>

        <Grid.Column size={8}>
          <Panel title="Activity overview" lines={7} />
        </Grid.Column>
        <Grid.Column size={4}>
          <Panel title="Recent events" lines={9} />
        </Grid.Column>

        {['Analytics', 'Marketing', 'Infrastructure'].map((title) => (
          <Grid.Column key={title} size={4}>
            <Panel title={title} lines={3} />
          </Grid.Column>
        ))}
      </Grid>
    </Flex>
  ),
};
