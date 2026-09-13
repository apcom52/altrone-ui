import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Checkbox } from '../checkbox';
import { CollapsedList } from './CollapsedList.tsx';

const story: Meta<typeof CollapsedList> = {
  title: 'Components/Containers/CollapsedList',
  component: CollapsedList,
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

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const PERMISSIONS = [
  'Read repository',
  'Write repository',
  'Manage issues',
  'Manage pull requests',
  'Manage webhooks',
  'Manage deploy keys',
  'Administer settings',
  'Delete repository',
];

/* A self-contained row so it can sit as a direct child of CollapsedList —
   the component slices its own children, so wrapping them in one element
   would defeat `limit`. */
const PermissionRow = ({ name }: { name: string }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox checked={checked} onChange={setChecked}>
      {name}
    </Checkbox>
  );
};

const rows = (names: string[] = PERMISSIONS) =>
  names.map((name) => <PermissionRow key={name} name={name} />);

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: StoryObj<typeof CollapsedList> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
      <Text block size={9} weight="bold">
        CollapsedList
      </Text>
      <Paragraph>
        <Text code>CollapsedList</Text> renders its children as a vertical list
        but only shows the first <Text code>limit</Text> of them; a text button
        reveals the rest and collapses them again. State is internal — pass the
        children directly, set <Text code>limit</Text>, done. The button label
        comes from the localization dictionary (<Text code>Show N hidden</Text>{' '}
        / <Text code>Show less</Text>).
      </Paragraph>

      <CollapsedList limit={4} gap="s">
        {rows()}
      </CollapsedList>
    </Flex>
  ),
};

// ─── Limit ──────────────────────────────────────────────────────────────────

export const Limit: StoryObj<typeof CollapsedList> = {
  name: 'Limit',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Limit</Heading>
      <Paragraph>
        <Text code>limit</Text> (default <Text code>5</Text>) is how many direct
        children stay visible while collapsed. When the list has no more
        children than the limit, no button is rendered at all.
      </Paragraph>

      <Flex gap="xl" align="start">
        {[2, 4].map((limit) => (
          <Flex key={limit} direction="vertical" gap="xs" style={{ flex: 1 }}>
            <Text size={3} weight="medium" block>
              limit={limit}
            </Text>
            <CollapsedList limit={limit} gap="s">
              {rows()}
            </CollapsedList>
          </Flex>
        ))}
        <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
          <Text size={3} weight="medium" block>
            limit={8} — fits, no button
          </Text>
          <CollapsedList limit={8} gap="s">
            {rows()}
          </CollapsedList>
        </Flex>
      </Flex>
    </Flex>
  ),
};

// ─── Item gap ──────────────────────────────────────────────────────────────

export const ItemGap: StoryObj<typeof CollapsedList> = {
  name: 'Item gap',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Item gap</Heading>
      <Paragraph>
        <Text code>gap</Text> sets the spacing between list items only — the
        distance to the toggle button is fixed.
      </Paragraph>

      <Flex gap="xl" align="start">
        {(['xs', 'm', 'l'] as const).map((gap) => (
          <Flex key={gap} direction="vertical" gap="xs" style={{ flex: 1 }}>
            <Text size={3} weight="medium" block>
              gap={gap}
            </Text>
            <CollapsedList limit={3} gap={gap}>
              {rows()}
            </CollapsedList>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};

// ─── Custom button label ───────────────────────────────────────────────────

export const CustomLabel: StoryObj<typeof CollapsedList> = {
  name: 'Custom button label',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
      <Heading>Custom button label</Heading>
      <Paragraph>
        <Text code>expandButtonLabel</Text> takes a string, or a function that
        receives <Text code>{'{ hiddenItems, totalItems, expanded }'}</Text> and
        returns the label for the current state.
      </Paragraph>

      <Flex gap="xl" align="start">
        <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
          <Text size={3} weight="medium" block>
            static string
          </Text>
          <CollapsedList
            limit={3}
            gap="s"
            expandButtonLabel="Show all permissions"
          >
            {rows()}
          </CollapsedList>
        </Flex>

        <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
          <Text size={3} weight="medium" block>
            function of context
          </Text>
          <CollapsedList
            limit={3}
            gap="s"
            expandButtonLabel={({ hiddenItems, totalItems, expanded }) =>
              expanded
                ? 'Collapse'
                : `+${hiddenItems} more (${totalItems} total)`
            }
          >
            {rows()}
          </CollapsedList>
        </Flex>
      </Flex>
    </Flex>
  ),
};

// ─── One-way reveal ────────────────────────────────────────────────────────

export const OneWayReveal: StoryObj<typeof CollapsedList> = {
  name: 'One-way reveal',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
      <Heading>One-way reveal</Heading>
      <Paragraph>
        With <Text code>hideExpandButtonAfterUsage</Text> the button disappears
        once the list is expanded — there&rsquo;s no way back. Use it when
        re-collapsing has no value, e.g. a &ldquo;show earlier activity&rdquo;
        feed.
      </Paragraph>

      <CollapsedList limit={3} gap="s" hideExpandButtonAfterUsage>
        {rows()}
      </CollapsedList>
    </Flex>
  ),
};
