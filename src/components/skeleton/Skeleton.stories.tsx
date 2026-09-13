import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { Skeleton, Text, Flex } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta<typeof Skeleton> = {
  title: 'Components/Atoms/Skeleton',
  component: Skeleton,
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

export const Overview: StoryObj<typeof Skeleton> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Text block size={9} weight="bold">
        Skeleton
      </Text>

      <Paragraph>
        <Text code>Skeleton</Text> is a shimmering placeholder for content
        that&rsquo;s still loading. Give it a <Text code>width</Text>,{' '}
        <Text code>height</Text> and <Text code>radius</Text> to match the shape
        of the real thing. The pulse stops under{' '}
        <Text code>prefers-reduced-motion</Text>. It&rsquo;s{' '}
        <Text code>aria-hidden</Text> — announce the loading state on a wrapper
        with <Text code>aria-busy</Text>.
      </Paragraph>

      <Heading>Text lines</Heading>
      <Flex direction="vertical" gap="xs">
        <Skeleton width="100%" height="14px" radius="4px" />
        <Skeleton width="100%" height="14px" radius="4px" />
        <Skeleton width="70%" height="14px" radius="4px" />
      </Flex>

      <Heading>Avatar + text</Heading>
      <Flex gap="m" align="center">
        <Skeleton width="48px" height="48px" radius="50%" />
        <Flex direction="vertical" gap="xs" style={{ flex: 1 }}>
          <Skeleton width="40%" height="14px" radius="4px" />
          <Skeleton width="60%" height="12px" radius="4px" />
        </Flex>
      </Flex>

      <Heading>Card</Heading>
      <Flex
        direction="vertical"
        gap="m"
        style={{
          padding: 16,
          border: '1px solid var(--border-1)',
          borderRadius: 'var(--radius-l)',
        }}
      >
        <Skeleton width="100%" height="160px" radius="var(--radius-m)" />
        <Skeleton width="70%" height="18px" radius="4px" />
        <Skeleton width="90%" height="12px" radius="4px" />
        <Skeleton width="50%" height="12px" radius="4px" />
      </Flex>

      <Heading>Repeated list</Heading>
      <Flex direction="vertical" gap="s">
        {Array.from({ length: 4 }).map((_, i) => (
          <Flex key={i} gap="m" align="center">
            <Skeleton width="32px" height="32px" radius="50%" />
            <Skeleton width={`${55 + (i % 3) * 12}%`} height="12px" radius="4px" />
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};
