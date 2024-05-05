import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Direction, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { DatePicker } from './DatePicker.tsx';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const story: Meta<typeof DatePicker> = {
  title: 'Components/Form/DatePicker',
  component: DatePicker,
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
  name: 'Using DatePicker',
  render: () => {
    const [day1, setDay1] = useState<Dayjs | undefined>(undefined);
    const [day2, setDay2] = useState<Dayjs | undefined>(dayjs('2024-05-15'));

    const [month1, setMonth1] = useState<Dayjs | undefined>(dayjs('2024-03'));
    const [month2, setMonth2] = useState<Dayjs | undefined>(dayjs('2024-08'));

    const [year1, setYear1] = useState<Dayjs | undefined>(dayjs('2024'));
    const [year2, setYear2] = useState<Dayjs | undefined>(dayjs('2025'));

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic DatePicker
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.xlarge}>
          <DatePicker value={day1} onChange={setDay1} />
          <DatePicker value={day2} onChange={setDay2} />
          <DatePicker value={day2} transparent onChange={setDay2} />
          <DatePicker value={day2} readonlyStyles={true} onChange={setDay2} />
          <DatePicker value={day2} disabled onChange={setDay2} />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>MonthPicker</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.xlarge}>
          <DatePicker.MonthPicker value={month1} onChange={setMonth1} />
          <DatePicker.MonthPicker value={month2} onChange={setMonth2} />
          <DatePicker.MonthPicker
            value={month2}
            transparent
            onChange={setMonth2}
          />
          <DatePicker.MonthPicker
            value={month2}
            readonlyStyles={true}
            onChange={setMonth2}
          />
          <DatePicker.MonthPicker
            value={month2}
            disabled
            onChange={setMonth2}
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>YearPicker</Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.xlarge}>
          <DatePicker.YearPicker value={year1} onChange={setYear1} />
          <DatePicker.YearPicker value={year2} onChange={setYear2} />
          <DatePicker.YearPicker
            value={year2}
            transparent
            onChange={setYear2}
          />
          <DatePicker.YearPicker
            value={year2}
            readonlyStyles={true}
            onChange={setYear2}
          />
          <DatePicker.YearPicker value={year2} disabled onChange={setYear2} />
        </Flex>
      </Flex>
    );
  },
};

export default story;
