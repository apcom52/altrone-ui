import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Loading } from './Loading.tsx';

const story: Meta<typeof Loading> = {
  title: 'Components/Atoms/Loading',
  component: Loading,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export const PaginationStory: StoryObj<typeof Loading> = {
  name: 'Using Loading',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Loading indicators</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <Loading />
          <Loading color="var(--primary-600)" size="32px" strokeWidth="3" />
          <Loading size="20px" strokeWidth="1" />
        </Flex>
      </Flex>
    );
  },
};

export default story;
