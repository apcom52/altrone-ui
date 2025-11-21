import { Meta, StoryObj } from '@storybook/react';
import { Skeleton, Text, Flex } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta<typeof Skeleton> = {
  title: 'Components/Display/Skeleton',
  component: Skeleton,
  decorators: [StorybookDecorator],
};

export const SkeletonStory: StoryObj<typeof Skeleton> = {
  name: 'Using Skeleton',
  render: (args) => (
    <Flex direction="vertical" gap="xl">
      <Text block size={6} weight="bold">
        Using skeletons
      </Text>
      <Flex gap="m">
        <Skeleton width="80px" height="80px" radius="50%" />
        <Flex gap="s" direction="vertical">
          <Skeleton width="180px" height="32px" radius="16px" />
          <Skeleton width="120px" height="32px" radius="16px" />
        </Flex>
      </Flex>
    </Flex>
  ),
};

export default story;
