import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ArrowDownWideNarrow, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { Button, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Select } from './Select.tsx';
import { useSelectContext } from './Select.context.ts';
import { Option } from './Select.types.ts';
import { SELECT_COUNTRIES } from './constants.ts';

const story: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
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
  <Text block size={6} weight="bold" style={{ marginTop: 8 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 620, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Text block size={3} color="muted">
    {children}
  </Text>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const SEVERITIES: Option[] = [
  { value: 'sev3', label: 'SEV-3 · Minor' },
  { value: 'sev2', label: 'SEV-2 · Major' },
  { value: 'sev1', label: 'SEV-1 · Critical' },
  { value: 'sev0', label: 'SEV-0 · Page everyone', disabled: true },
];

const TEAMS: Option[] = [
  { value: 'platform', label: 'Platform' },
  { value: 'payments', label: 'Payments' },
  { value: 'growth', label: 'Growth' },
  { value: 'data', label: 'Data' },
  { value: 'mobile', label: 'Mobile' },
];

const SORTS: Option[] = [
  { value: 'new', label: 'Newest first' },
  { value: 'old', label: 'Oldest first' },
  { value: 'az', label: 'Name A→Z' },
  { value: 'activity', label: 'Recent activity' },
];

// ─── 1. Overview ─────────────────────────────────────────────────────────────

export const OverviewStory: StoryObj<typeof Select> = {
  name: 'Triage an incident',
  render: () => {
    const [severity, setSeverity] = useState<string | undefined>('sev2');
    const [team, setTeam] = useState<string | undefined>();

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Text size={7} weight="bold" block>
          Select
        </Text>
        <Paragraph>
          A closed list of choices. The visible control is a read-only{' '}
          <Text code>TextInput</Text>; the real value reaches the form through a
          hidden input named after <Text code>name</Text> (
          <Text code>name[]</Text> when <Text code>multiple</Text>). In single
          mode, picking a value closes the menu immediately.
        </Paragraph>

        <Heading>New incident</Heading>
        <Flex direction="horizontal" gap="l" align="start" wrap>
          <Flex direction="vertical" gap="xs">
            <Caption>Severity</Caption>
            <Select
              name="severity"
              value={severity}
              onChange={(value) => setSeverity(value as string | undefined)}
              options={SEVERITIES}
              placeholder="Assess the blast radius"
            />
          </Flex>
          <Flex direction="vertical" gap="xs">
            <Caption>Owning team</Caption>
            <Select
              name="team"
              value={team}
              onChange={(value) => setTeam(value as string | undefined)}
              options={TEAMS}
              placeholder="Route to…"
              clearable
            />
          </Flex>
        </Flex>
        <Caption>
          <Text code>SEV-0</Text> is a <Text code>disabled</Text> option —
          visible but unselectable. The team picker is{' '}
          <Text code>clearable</Text>.
        </Caption>
      </Flex>
    );
  },
};

// ─── 2. Multiple ─────────────────────────────────────────────────────────────

export const MultipleStory: StoryObj<typeof Select> = {
  name: 'Build a watchlist',
  render: () => {
    const [markets, setMarkets] = useState<string[]>([
      'united states of america',
      'japan',
    ]);

    const chips = SELECT_COUNTRIES.filter((c) => markets.includes(c.value));

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>Watchlist</Heading>
        <Paragraph>
          With <Text code>multiple</Text> the menu stays open on every pick and
          the value is a string array. Add <Text code>searchable</Text> and the
          filter query survives between picks — type once, select several
          matches in a row.
        </Paragraph>
        <Select
          value={markets}
          onChange={(value) => setMarkets((value as string[]) ?? [])}
          options={SELECT_COUNTRIES}
          placeholder="Search markets and add them"
          multiple
          searchable
          clearable
        />
        <Flex direction="horizontal" gap="xs" wrap>
          {chips.length === 0 ? (
            <Caption>No markets on the list yet.</Caption>
          ) : (
            chips.map((c) => (
              <Text
                key={c.value}
                size={2}
                weight="medium"
                style={{
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'var(--accent-a3)',
                  color: 'var(--accent-text-1)',
                }}
              >
                {c.label}
              </Text>
            ))
          )}
        </Flex>
      </Flex>
    );
  },
};

// ─── 3. Search & empty state ─────────────────────────────────────────────────

export const SearchStory: StoryObj<typeof Select> = {
  name: 'Jump to a timezone',
  render: () => {
    const [zone, setZone] = useState<string | undefined>();

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 480 }}>
        <Heading>Command-palette style search</Heading>
        <Paragraph>
          <Text code>searchable</Text> turns the control into a filter box on
          focus — a case-insensitive <Text highlighted>substring</Text> match, so
          “ort” finds “Porto”. Type something with no matches (try “xyz”) for the
          localized <Text code>select.notFound</Text> empty state.
        </Paragraph>
        <Select
          value={zone}
          onChange={(next) => setZone(next as string | undefined)}
          options={SELECT_COUNTRIES}
          placeholder="Where are you dialing in from?"
          searchable
        />
      </Flex>
    );
  },
};

// ─── 4. Sizes / filter bar ───────────────────────────────────────────────────

export const SizesStory: StoryObj<typeof Select> = {
  name: 'A filter bar',
  render: () => {
    const [status, setStatus] = useState<string | undefined>('open');
    const [team, setTeam] = useState<string | undefined>();
    const [sort, setSort] = useState<string | undefined>('new');

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 660 }}>
        <Heading>Sizes, side by side</Heading>
        <Paragraph>
          <Text code>size</Text> follows the shared control scale and passes
          straight through to the <Text code>TextInput</Text>. The same row of
          filters is shown at <Text code>s</Text>, <Text code>m</Text> and{' '}
          <Text code>l</Text>.
        </Paragraph>
        {(['s', 'm', 'l'] as const).map((size) => (
          <Flex key={size} direction="horizontal" gap="s" align="center" wrap>
            <Text size={2} color="muted" style={{ width: 14 }}>
              {size}
            </Text>
            <Select
              value={status}
              onChange={(v) => setStatus(v as string | undefined)}
              options={[
                { value: 'open', label: 'Open' },
                { value: 'progress', label: 'In progress' },
                { value: 'closed', label: 'Closed' },
              ]}
              size={size}
            />
            <Select
              value={team}
              onChange={(v) => setTeam(v as string | undefined)}
              options={TEAMS}
              placeholder="Any team"
              size={size}
              clearable
            />
            <Select
              value={sort}
              onChange={(v) => setSort(v as string | undefined)}
              options={SORTS}
              size={size}
            />
          </Flex>
        ))}
      </Flex>
    );
  },
};

// ─── 5. Custom trigger ───────────────────────────────────────────────────────

/** `asChild` trigger — reads live state from context, no props threaded. */
const RegionTrigger = ({ ref }: { ref?: React.Ref<HTMLButtonElement> }) => {
  const { expanded, selectedOptions } = useSelectContext();
  const count = Array.isArray(selectedOptions) ? selectedOptions.length : 0;

  return (
    <Button
      ref={ref}
      icon={<Globe />}
      label={count ? `${count} regions` : 'Pick regions'}
      additionalIcon={expanded ? <ChevronUp /> : <ChevronDown />}
      style={{ minWidth: 200 }}
    />
  );
};

export const CustomTriggerStory: StoryObj<typeof Select> = {
  name: 'Custom trigger',
  render: () => {
    const [sort, setSort] = useState<string | undefined>('new');
    const [region, setRegion] = useState<string[]>(['france', 'germany']);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 520 }}>
        <Heading>Bring your own trigger</Heading>
        <Paragraph>
          <Text code>renderFunc</Text> replaces the whole trigger and receives
          the live state (<Text code>expanded</Text>,{' '}
          <Text code>selectedOptions</Text>, <Text code>clearValue</Text>, …). A
          nested component can read the same state with{' '}
          <Text code>useSelectContext()</Text>.
        </Paragraph>

        <Flex direction="horizontal" gap="s" align="center" wrap>
          <Select
            value={sort}
            onChange={(next) => setSort(next as string | undefined)}
            options={SORTS}
            renderFunc={({ expanded, selectedOptions }) => (
              <Button
                icon={<ArrowDownWideNarrow />}
                label={`Sort: ${
                  (selectedOptions as Option | undefined)?.label ?? 'Default'
                }`}
                additionalIcon={expanded ? <ChevronUp /> : <ChevronDown />}
                style={{ minWidth: 220 }}
              />
            )}
          />

          <Select
            value={region}
            multiple
            onChange={(next) => setRegion((next as string[]) ?? [])}
            options={SELECT_COUNTRIES}
            asChild
          >
            <RegionTrigger />
          </Select>
        </Flex>

        <Caption>
          Same list, two triggers — <Text code>renderFunc</Text> for the sort
          button, <Text code>asChild</Text> for the region button (it shows a
          count and a placeholder while empty).
        </Caption>
      </Flex>
    );
  },
};
