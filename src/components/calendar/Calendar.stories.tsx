import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Calendar } from './Calendar.tsx';
import dayjs from 'dayjs';
import { Configuration } from '../configuration';

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
        <Text size={5} weight="bold" block>
          Basic Calendar (en-US)
        </Text>
        <Configuration locale={{ locale: 'en-US' }}>
          <Flex direction="horizontal" gap="l">
            <Calendar
              month={dayjs('2024-04')}
              selectedDates={[dayjs('2024-04-04'), dayjs('2024-04-15')]}
            />
          </Flex>
        </Configuration>

        <Text size={5} weight="bold" block>
          Basic Calendar (ru-RU)
        </Text>
        <Configuration locale={{ locale: 'ru-RU' }}>
          <Flex direction="horizontal" gap="l">
            <Calendar
              month={dayjs('2024-04')}
              selectedDates={[dayjs('2024-04-04'), dayjs('2024-04-15')]}
            />
          </Flex>
        </Configuration>
      </Flex>
    );
  },
};

export default story;
