import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, TextHeadingRoles } from 'components';
import { Direction, Gap } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Loading } from './Loading.tsx';

const story: Meta<typeof Loading> = {
  title: 'Components/Indicators/Loading',
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
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Loading indicators
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.medium}>
          <Loading />
          <Loading color="var(--primary-600)" size="32px" strokeWidth="3px" />
          <Loading size="20px" strokeWidth="1.5px" />
        </Flex>
      </Flex>
    );
  },
};

export default story;
