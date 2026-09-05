import { Meta, StoryObj } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { Flex, Switcher, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Size } from 'types';

const story: Meta<typeof Switcher> = {
  title: 'Components/Form/Switcher',
  component: Switcher,
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

export const OverviewStory: StoryObj<typeof Switcher> = {
  name: 'States',
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [beta, setBeta] = useState(false);
    const [bulkDelete, setBulkDelete] = useState(false);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Text size={7} weight="bold" block>
          Switcher
        </Text>
        <Paragraph>
          A toggle for a setting that takes effect immediately — no separate
          &ldquo;Save&rdquo;. Same controlled contract as{' '}
          <Text code>Checkbox</Text> (<Text code>checked</Text> +{' '}
          <Text code>onChange</Text>, which receives <Text code>!checked</Text>),
          but it renders as a sliding pill and reports itself as a{' '}
          <Text code>switch</Text> to assistive tech.
        </Paragraph>

        <Flex direction="vertical" gap="s">
          <Switcher checked={notifications} onChange={setNotifications}>
            Email notifications
          </Switcher>
          <Switcher checked={beta} onChange={setBeta}>
            Join the beta channel
          </Switcher>
          <Switcher danger checked={bulkDelete} onChange={setBulkDelete}>
            Enable bulk delete mode
          </Switcher>
          <Switcher disabled>Managed by your admin</Switcher>
          <Switcher checked disabled>
            Always on for this workspace
          </Switcher>
        </Flex>
        <Caption>
          Use <Text code>Switcher</Text> for an instant on/off; use{' '}
          <Text code>Checkbox</Text> when the choice is part of a form the user
          submits later.
        </Caption>
      </Flex>
    );
  },
};

// ─── 2. Sizes ────────────────────────────────────────────────────────────────

const SIZES: Size[] = ['mini', 's', 'm', 'l', 'xl'];

export const SizesStory: StoryObj<typeof Switcher> = {
  name: 'Sizes',
  render: () => {
    const [on, setOn] = useState<Record<string, boolean>>(
      useMemo(
        () => Object.fromEntries(SIZES.map((sz) => [sz, sz !== 'mini'])),
        [],
      ),
    );

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>mini, s, m, l, xl</Heading>
        <Paragraph>
          One value — the track height — drives the whole control; the track
          width, the handle and its travel are derived from it. Label type
          scales too, and the clickable row never drops below 24px.
        </Paragraph>

        <Flex direction="vertical" gap="s">
          {SIZES.map((sz) => (
            <Switcher
              key={sz}
              size={sz}
              checked={on[sz]}
              onChange={(next) => setOn((prev) => ({ ...prev, [sz]: next }))}
            >
              size=&quot;{sz}&quot;
            </Switcher>
          ))}
        </Flex>
      </Flex>
    );
  },
};

// ─── 3. A settings list ──────────────────────────────────────────────────────

const SETTINGS = [
  { key: 'darkMode', label: 'Dark mode', hint: 'Follow the app appearance' },
  { key: 'sounds', label: 'Interface sounds', hint: 'Play a sound on actions' },
  { key: 'telemetry', label: 'Usage analytics', hint: 'Share anonymous stats' },
] as const;

export const SettingsListStory: StoryObj<typeof Switcher> = {
  name: 'A settings list',
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({
      darkMode: true,
      sounds: false,
      telemetry: true,
    });

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>Label on the left, switch on the right</Heading>
        <Paragraph>
          The label text still comes from <Text code>children</Text> so the
          whole row toggles the switch. Wrap each row so the switch sits at the
          far edge.
        </Paragraph>

        <Flex direction="vertical" style={{ maxWidth: 360 }}>
          {SETTINGS.map(({ key, label, hint }, index) => (
            <Flex
              key={key}
              align="center"
              justify="between"
              gap="l"
              style={{
                padding: '10px 0',
                borderTop:
                  index === 0 ? 'none' : '1px solid var(--border-1)',
              }}
            >
              <Switcher
                checked={values[key]}
                onChange={(next) =>
                  setValues((prev) => ({ ...prev, [key]: next }))
                }
              >
                <Flex direction="vertical">
                  <Text>{label}</Text>
                  <Text size={3} color="muted">
                    {hint}
                  </Text>
                </Flex>
              </Switcher>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  },
};

// ─── 4. Without a label ──────────────────────────────────────────────────────

export const NoLabelStory: StoryObj<typeof Switcher> = {
  name: 'Without a visible label',
  render: () => {
    const [wifi, setWifi] = useState(true);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 620 }}>
        <Heading>A bare switch</Heading>
        <Paragraph>
          With no <Text code>children</Text>, give it a name from context —{' '}
          <Text code>aria-label</Text> is forwarded to the underlying{' '}
          <Text code>{'<input>'}</Text>, not the wrapper.
        </Paragraph>

        <Flex align="center" gap="m">
          <Text>Wi-Fi</Text>
          <Switcher aria-label="Wi-Fi" checked={wifi} onChange={setWifi} />
        </Flex>
      </Flex>
    );
  },
};
