import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Calendar } from './Calendar.tsx';
import dayjs from 'dayjs';

const story: Meta<typeof Calendar> = {
  title: 'Components/Display/Calendar',
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
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Basic Calendar</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Calendar
            month={dayjs('2024-04')}
            selectedDates={[dayjs('2024-04-04'), dayjs('2024-04-15')]}
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
