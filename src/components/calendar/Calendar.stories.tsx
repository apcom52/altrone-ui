import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Direction, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { Calendar } from './Calendar.tsx';

const story: Meta<typeof Calendar> = {
  title: 'Components/Data/Calendar',
  component: Calendar,
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

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using Calendar',
  render: () => {
    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic Calendar
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.xlarge}>
          <Calendar
            month={new Date(2024, 3)}
            selectedDates={[new Date(2024, 3, 14), new Date(2024, 3, 18)]}
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
