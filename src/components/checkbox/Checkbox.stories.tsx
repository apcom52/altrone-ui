import { Meta, StoryObj } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { Checkbox, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Size } from 'types';

const story: Meta<typeof Checkbox> = {
  title: 'Components/Controls/Checkbox',
  component: Checkbox,
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

// ─── 1. States ───────────────────────────────────────────────────────────────

export const OverviewStory: StoryObj<typeof Checkbox> = {
  name: 'States',
  render: () => {
    const [terms, setTerms] = useState(true);
    const [news, setNews] = useState(false);
    const [purge, setPurge] = useState(false);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Text size={7} weight="bold" block>
          Checkbox
        </Text>
        <Paragraph>
          A controlled checkbox — always pass <Text code>checked</Text> and{' '}
          <Text code>onChange</Text> together. <Text code>onChange</Text>{' '}
          receives the <em>next</em> boolean (<Text code>!checked</Text>), so a{' '}
          <Text code>useState</Text> setter can be passed straight in. The label
          text wraps the real <Text code>{'<input>'}</Text>, so clicking the text
          toggles it and screen readers read it as the checkbox&rsquo;s name.
        </Paragraph>

        <Flex direction="vertical" gap="s">
          <Checkbox checked={terms} onChange={setTerms}>
            I agree to the terms of service
          </Checkbox>
          <Checkbox checked={news} onChange={setNews}>
            Email me product news
          </Checkbox>
          <Checkbox danger checked={purge} onChange={setPurge}>
            Permanently delete all records
          </Checkbox>
          <Checkbox disabled>Unavailable in your plan</Checkbox>
          <Checkbox checked disabled>
            Enforced by your workspace admin
          </Checkbox>
        </Flex>
        <Caption>
          <Text code>danger</Text> recolors the label; <Text code>disabled</Text>{' '}
          dims the control and forwards to the native <Text code>{'<input>'}</Text>.
        </Caption>
      </Flex>
    );
  },
};

// ─── 2. Indeterminate ────────────────────────────────────────────────────────

const PERMISSIONS = ['Read', 'Write', 'Delete'] as const;

export const IndeterminateStory: StoryObj<typeof Checkbox> = {
  name: 'Indeterminate — a "select all" parent',
  render: () => {
    const [items, setItems] = useState<Record<string, boolean>>({
      Read: true,
      Write: false,
      Delete: false,
    });

    const checkedCount = Object.values(items).filter(Boolean).length;
    const allChecked = checkedCount === PERMISSIONS.length;
    const someChecked = checkedCount > 0 && !allChecked;

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>One box that summarises the others</Heading>
        <Paragraph>
          <Text code>indeterminate</Text> shows a dash instead of a checkmark and
          makes assistive tech announce the checkbox as <Text code>mixed</Text>{' '}
          (it&rsquo;s set on the real <Text code>{'<input>'}</Text>, not faked
          visually). It doesn&rsquo;t change <Text code>checked</Text> — the two
          are independent, so toggling the parent still reads as{' '}
          <Text code>!checked</Text>.
        </Paragraph>

        <Flex direction="vertical" gap="xs">
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={(next) =>
              setItems(
                Object.fromEntries(PERMISSIONS.map((p) => [p, next])),
              )
            }
          >
            All permissions
          </Checkbox>
          <Flex direction="vertical" gap="xs" style={{ paddingLeft: 28 }}>
            {PERMISSIONS.map((perm) => (
              <Checkbox
                key={perm}
                checked={items[perm]}
                danger={perm === 'Delete'}
                onChange={(next) =>
                  setItems((prev) => ({ ...prev, [perm]: next }))
                }
              >
                {perm}
              </Checkbox>
            ))}
          </Flex>
        </Flex>
        <Caption>{checkedCount} of {PERMISSIONS.length} selected</Caption>
      </Flex>
    );
  },
};

// ─── 3. Sizes ────────────────────────────────────────────────────────────────

const SIZES: Size[] = ['mini', 's', 'm', 'l', 'xl'];

export const SizesStory: StoryObj<typeof Checkbox> = {
  name: 'Sizes',
  render: () => {
    const [checked, setChecked] = useState<Record<string, boolean>>(
      useMemo(
        () => Object.fromEntries(SIZES.map((sz) => [sz, sz === 'm'])),
        [],
      ),
    );

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>mini, s, m, l, xl</Heading>
        <Paragraph>
          <Text code>size</Text> scales the box, the checkmark, the dash and the
          label type together. The clickable row stays at least 24px tall at
          every tier, so even <Text code>"mini"</Text> keeps an accessible hit
          area.
        </Paragraph>

        <Flex direction="vertical" gap="xs">
          {SIZES.map((sz) => (
            <Checkbox
              key={sz}
              size={sz}
              checked={checked[sz]}
              onChange={(next) =>
                setChecked((prev) => ({ ...prev, [sz]: next }))
              }
            >
              size=&quot;{sz}&quot;
            </Checkbox>
          ))}
        </Flex>

        <Heading>Indeterminate at each size</Heading>
        <Flex direction="horizontal" gap="l" align="center" wrap>
          {SIZES.map((sz) => (
            <Checkbox key={sz} size={sz} indeterminate onChange={() => {}} />
          ))}
        </Flex>
      </Flex>
    );
  },
};

// ─── 4. Without a label ──────────────────────────────────────────────────────

export const NoLabelStory: StoryObj<typeof Checkbox> = {
  name: 'Without a visible label',
  render: () => {
    const [rows, setRows] = useState<boolean[]>([false, true, false, false]);
    const allChecked = rows.every(Boolean);
    const someChecked = rows.some(Boolean) && !allChecked;

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>A bare checkbox in a table header</Heading>
        <Paragraph>
          With no <Text code>children</Text>, only the box renders. Give it an
          accessible name from the surrounding context (here an{' '}
          <Text code>aria-label</Text>), since there&rsquo;s no visible text to
          read.
        </Paragraph>

        <Flex direction="vertical" style={{ maxWidth: 280 }}>
          <Flex
            align="center"
            gap="s"
            style={{
              padding: '8px 4px',
              borderBottom: '1px solid var(--border-1)',
            }}
          >
            <Checkbox
              aria-label="Select all rows"
              checked={allChecked}
              indeterminate={someChecked}
              onChange={(next) => setRows(rows.map(() => next))}
            />
            <Text weight="bold">Invoice</Text>
          </Flex>
          {rows.map((checked, index) => (
            <Flex
              key={index}
              align="center"
              gap="s"
              style={{ padding: '8px 4px' }}
            >
              <Checkbox
                aria-label={`Select invoice #${4470 + index}`}
                checked={checked}
                onChange={(next) =>
                  setRows(rows.map((v, i) => (i === index ? next : v)))
                }
              />
              <Text>#{4470 + index}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  },
};
