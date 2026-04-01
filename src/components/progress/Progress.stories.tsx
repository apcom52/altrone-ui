import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Progress } from './Progress.tsx';

const story: Meta<typeof Progress> = {
  title: 'Components/Display/Progress',
  component: Progress,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const ProgressStory: StoryObj<typeof Progress> = {
  name: 'Using Progress',
  render: () => (
    <Flex direction="vertical" gap="xl">
      <Text block size={5} weight="bold">
        Sizes
      </Text>
      <Flex direction="vertical" gap="m">
        <Progress size="s" value={60} max={100}>
          Small
        </Progress>
        <Progress size="m" value={60} max={100}>
          Medium
        </Progress>
        <Progress size="l" value={60} max={100}>
          Large
        </Progress>
      </Flex>

      <Text block size={5} weight="bold">
        Label modes
      </Text>
      <Flex direction="vertical" gap="m">
        <Progress value={42} max={100} />
        <Progress value={42} max={100}>Uploading files...</Progress>
        <Progress value={42} max={200}>
          {({ value, max, percentage }) => (
            <span>
              {value} of {max} ({percentage}%)
            </span>
          )}
        </Progress>
      </Flex>

      <Text block size={5} weight="bold">
        Fill states
      </Text>
      <Flex direction="vertical" gap="m">
        <Progress value={0} max={100} />
        <Progress value={25} max={100} />
        <Progress value={50} max={100} />
        <Progress value={75} max={100} />
        <Progress value={100} max={100} />
      </Flex>

      <Text block size={5} weight="bold">
        Custom max value
      </Text>
      <Flex direction="vertical" gap="m">
        <Progress value={0} max={8}>
          {({ value, max }) => `Step ${value} of ${max}`}
        </Progress>
        <Progress value={2} max={8}>
          {({ value, max }) => `Step ${value} of ${max}`}
        </Progress>
        <Progress value={5} max={8}>
          {({ value, max }) => `Step ${value} of ${max}`}
        </Progress>
        <Progress value={8} max={8}>
          {({ value, max }) => `Step ${value} of ${max}`}
        </Progress>
      </Flex>

      <Text block size={5} weight="bold">
        Custom styling
      </Text>
      <Flex direction="vertical" gap="m">
        <Progress
          value={70}
          max={100}
          style={{
            ['--progress-background-color' as string]: 'var(--teal-3)',
            ['--progress-active-background-color' as string]: 'var(--teal-9)',
            ['--progress-text-color' as string]: 'var(--teal-12)',
          }}
        >
          Teal theme
        </Progress>
        <Progress
          value={40}
          max={100}
          style={{
            ['--progress-background-color' as string]: 'var(--red-3)',
            ['--progress-active-background-color' as string]: 'var(--red-9)',
            ['--progress-text-color' as string]: 'var(--red-12)',
          }}
        >
          Danger zone
        </Progress>
        <Progress
          value={90}
          max={100}
          style={{
            ['--progress-background-color' as string]: 'var(--amber-3)',
            ['--progress-active-background-color' as string]: 'var(--amber-9)',
            ['--progress-text-color' as string]: 'var(--amber-12)',
          }}
        >
          Almost there
        </Progress>
      </Flex>
    </Flex>
  ),
};

export default story;
