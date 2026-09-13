import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Loading } from './Loading.tsx';

const story: Meta<typeof Loading> = {
  title: 'Components/Atoms/Loading',
  component: Loading,
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
  <Text block size={7} weight="bold" style={{ marginTop: 16 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

export const Overview: StoryObj<typeof Loading> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Text block size={9} weight="bold">
        Loading
      </Text>

      <Paragraph>
        <Text code>Loading</Text> is an SVG circular spinner for an in-progress
        operation. It&rsquo;s <Text code>role="status"</Text> with a localized{' '}
        <Text code>aria-label</Text> (&ldquo;Loading&rdquo;) — override it via{' '}
        <Text code>aria-label</Text> to say what&rsquo;s happening. It keeps
        spinning under <Text code>prefers-reduced-motion</Text>: it&rsquo;s a
        functional state indicator, not decoration.
      </Paragraph>

      <Heading>Size &amp; stroke</Heading>
      <Paragraph>
        <Text code>size</Text> is the diameter (px), <Text code>strokeWidth</Text>{' '}
        the ring thickness (fractions like <Text code>1.5</Text> are fine). A
        faint full-circle track sits behind the sweep.
      </Paragraph>
      <Flex gap="l" align="center">
        <Loading size={16} strokeWidth={1.5} />
        <Loading size={24} />
        <Loading size={40} strokeWidth={3} />
        <Loading size={64} strokeWidth={4} />
      </Flex>

      <Heading>Colour</Heading>
      <Paragraph>
        Defaults to <Text code>--loading-color</Text> (<Text code>--text-2</Text>
        ). Pass any CSS colour, or <Text code>currentColor</Text> to inherit
        from the surrounding text.
      </Paragraph>
      <Flex gap="l" align="center">
        <Loading size={28} />
        <Loading size={28} color="var(--accent-11)" />
        <Loading size={28} color="var(--danger-text-1)" />
        <Text size={4} style={{ color: 'var(--text-1)' }}>
          <Flex gap="xs" align="center">
            <Loading size={16} color="currentColor" />
            Saving…
          </Flex>
        </Text>
      </Flex>
    </Flex>
  ),
};
