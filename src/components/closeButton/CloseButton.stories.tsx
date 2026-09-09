import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { CloseButton } from './CloseButton.tsx';

const story: Meta<typeof CloseButton> = {
  title: 'Components/Atoms/CloseButton',
  component: CloseButton,
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

const SIZES = ['mini', 's', 'm', 'l', 'xl'] as const;

export const Overview: StoryObj<typeof CloseButton> = {
  name: 'Overview',
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
        <Text block size={9} weight="bold">
          Close Button
        </Text>
        <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
          A ready-made icon button for dismissing panels, modals, toasts and
          cards. It&rsquo;s a <Text code>Button</Text> locked to the{' '}
          <Text code>X</Text> icon with <Text code>showLabel=&#123;false&#125;</Text>,
          its hover tooltip turned off (the glyph speaks for itself), and an
          accessible name from the localized{' '}
          <Text code>closeButton.ariaLabel</Text> string. Everything else —{' '}
          <Text code>size</Text>, <Text code>onClick</Text>,{' '}
          <Text code>disabled</Text>, <Text code>className</Text>,{' '}
          <Text code>ref</Text>, <Text code>asChild</Text> — passes straight
          through to <Text code>Button</Text>.
        </Text>

        {open ? (
          <Box
            material="outline"
            shape="rounded"
            radius={12}
            padding={0}
            style={{ maxWidth: 420 }}
          >
            <Flex
              align="center"
              justify="between"
              gap="m"
              style={{ padding: '12px 12px 12px 16px' }}
            >
              <Text weight="medium">Weekly digest is ready</Text>
              <CloseButton size="s" onClick={() => setOpen(false)} />
            </Flex>
            <Box
              material="transparent"
              padding={16}
              style={{ borderTop: '1px solid var(--border-1)' }}
            >
              <Text block color="muted">
                47 new items across 6 projects. Open the report for the full
                breakdown.
              </Text>
            </Box>
          </Box>
        ) : (
          <Text block color="muted">
            Card dismissed —{' '}
            <Text
              code
              style={{ cursor: 'pointer' }}
              onClick={() => setOpen(true)}
            >
              bring it back
            </Text>
          </Text>
        )}
      </Flex>
    );
  },
};

export const Sizes: StoryObj<typeof CloseButton> = {
  name: 'Sizes',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Text block size={6} weight="bold">
        mini, s, m, l, xl
      </Text>
      <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
        The <Text code>size</Text> tier is the same one every control shares. A
        close button is icon-only, so it renders as a circle at each tier.
      </Text>
      <Flex gap="l" align="center">
        {SIZES.map((size) => (
          <Flex key={size} direction="vertical" gap="s" align="center">
            <CloseButton size={size} />
            <Text size={2} color="muted">
              {size}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};

export const InContext: StoryObj<typeof CloseButton> = {
  name: 'In panel headers',
  render: () => {
    const [panels, setPanels] = useState<string[]>([
      'Filters',
      'Activity',
      'Details',
    ]);

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
        <Text block size={6} weight="bold">
          Top-right of a header
        </Text>
        <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
          The most common spot: pinned to the trailing edge of a panel,
          drawer or dialog header. Use <Text code>size=&quot;s&quot;</Text> so it
          doesn&rsquo;t outweigh the title.
        </Text>
        <Flex direction="vertical" gap="s" style={{ maxWidth: 360 }}>
          {panels.map((name) => (
            <Box
              key={name}
              material="plate"
              shape="rounded"
              radius={10}
              padding={0}
            >
              <Flex
                align="center"
                justify="between"
                gap="m"
                style={{ padding: '10px 10px 10px 14px' }}
              >
                <Text weight="medium">{name}</Text>
                <CloseButton
                  size="s"
                  onClick={() =>
                    setPanels((prev) => prev.filter((p) => p !== name))
                  }
                />
              </Flex>
            </Box>
          ))}
          {panels.length === 0 ? (
            <Text
              code
              style={{ cursor: 'pointer', alignSelf: 'start' }}
              onClick={() => setPanels(['Filters', 'Activity', 'Details'])}
            >
              reset
            </Text>
          ) : null}
        </Flex>
      </Flex>
    );
  },
};

export const AccessibleName: StoryObj<typeof CloseButton> = {
  name: 'Accessible name & disabled',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 680 }}>
      <Text block size={6} weight="bold">
        Accessible name
      </Text>
      <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
        By default the button announces the localized{' '}
        <Text code>closeButton.ariaLabel</Text> (&ldquo;Close&rdquo; in English —
        switch the Language toolbar to hear the others). When one close button
        among several needs to be more specific, override it with{' '}
        <Text code>label</Text>.
      </Text>
      <Flex gap="l" align="center">
        <Flex direction="vertical" gap="s" align="center">
          <CloseButton />
          <Text size={2} color="muted">
            default
          </Text>
        </Flex>
        <Flex direction="vertical" gap="s" align="center">
          <CloseButton label="Dismiss notification" />
          <Text size={2} color="muted">
            label=&quot;Dismiss notification&quot;
          </Text>
        </Flex>
        <Flex direction="vertical" gap="s" align="center">
          <CloseButton disabled />
          <Text size={2} color="muted">
            disabled
          </Text>
        </Flex>
      </Flex>
    </Flex>
  ),
};
