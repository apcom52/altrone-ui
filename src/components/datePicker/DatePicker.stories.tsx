import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { DatePicker } from './DatePicker.tsx';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { RangePickerValue } from './DatePicker.types.ts';
import { within, expect, userEvent } from '@storybook/test';
import { timeout } from '../../utils';

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
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Basic DatePicker</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <DatePicker
            value={day1}
            onChange={setDay1}
            minDate={dayjs('2024-04-02')}
            maxDate={dayjs('2024-05-13')}
          />
          <DatePicker
            data-testid="date-picker"
            value={day2}
            clearable
            onChange={setDay2}
          />
          <DatePicker value={day2} transparent onChange={setDay2} />
          <DatePicker value={day2} readOnly onChange={setDay2} />
          <DatePicker value={day2} disabled onChange={setDay2} />
        </Flex>
        <Text.Heading role="inner">MonthPicker</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <DatePicker.MonthPicker
            data-testid="month-picker"
            value={month1}
            onChange={setMonth1}
          />
          <DatePicker.MonthPicker
            clearable
            value={month2}
            onChange={setMonth2}
          />
          <DatePicker.MonthPicker
            value={month2}
            transparent
            onChange={setMonth2}
          />
          <DatePicker.MonthPicker
            value={month2}
            readOnly
            onChange={setMonth2}
          />
          <DatePicker.MonthPicker
            value={month2}
            disabled
            onChange={setMonth2}
          />
        </Flex>
        <Text.Heading role="inner">YearPicker</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <DatePicker.YearPicker
            data-testid="year-picker"
            value={year1}
            onChange={setYear1}
          />
          <DatePicker.YearPicker clearable value={year2} onChange={setYear2} />
          <DatePicker.YearPicker
            value={year2}
            transparent
            onChange={setYear2}
          />
          <DatePicker.YearPicker value={year2} readOnly onChange={setYear2} />
          <DatePicker.YearPicker value={year2} disabled onChange={setYear2} />
        </Flex>
      </Flex>
    );
  },
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

    await step('need to choose a correct date', async () => {
      await userEvent.click(canvas.getByTestId('date-picker'));
      await userEvent.click(canvas.getByText('17'));
      await expect(canvas.getByTestId('date-picker')).toHaveValue(`17.05.2024`);
    });

    await step('need to navigate to the next month', async () => {
      await userEvent.click(canvas.getByTestId('date-picker'));
      await userEvent.click(canvas.getByText('navigate_next'));
      await userEvent.click(canvas.getByText('10'));
      await expect(canvas.getByTestId('date-picker')).toHaveValue(`10.06.2024`);
    });

    await step('need to navigate to the prev month', async () => {
      await userEvent.click(canvas.getByTestId('date-picker'));
      await userEvent.click(canvas.getByText('navigate_before'));
      await userEvent.click(canvas.getByText('navigate_before'));
      await userEvent.click(canvas.getByText('14'));
      await expect(canvas.getByTestId('date-picker')).toHaveValue(`14.04.2024`);
    });

    await step('check that today button works', async () => {
      await userEvent.click(canvas.getByTestId('date-picker'));
      await userEvent.click(canvas.getByText('Today'));
      await expect(canvas.getByTestId('date-picker')).toHaveValue(
        dayjs().format('DD.MM.YYYY'),
      );
    });

    await step('check that clear button works', async () => {
      await userEvent.click(canvas.getByTestId('date-picker'));
      await userEvent.click(canvas.getByText('Clear'));
      await expect(canvas.getByTestId('date-picker')).toHaveValue('');
    });

    await step('check month picker', async () => {
      await userEvent.click(canvas.getByTestId('month-picker'));
      await userEvent.click(canvas.getByText('Jan'));
      await expect(canvas.getByTestId('month-picker')).toHaveValue('01.2024');
    });

    await step('check "this month" button in year picker', async () => {
      await userEvent.click(canvas.getByTestId('month-picker'));
      await userEvent.click(canvas.getByText('This month'));
      await expect(canvas.getByTestId('month-picker')).toHaveValue(
        dayjs().format('MM.YYYY'),
      );
    });

    await step('check year picker', async () => {
      await userEvent.click(canvas.getByTestId('year-picker'));
      await userEvent.click(canvas.getByText('2017'));
      await expect(canvas.getByTestId('year-picker')).toHaveValue('2017');
    });

    await step('check "this year" button in year picker', async () => {
      await userEvent.click(canvas.getByTestId('year-picker'));
      await userEvent.click(canvas.getByText('This year'));
      await expect(canvas.getByTestId('year-picker')).toHaveValue(
        new Date().getFullYear().toString(),
      );
    });
  },
};

export const RangeStory: StoryObj<typeof Flex> = {
  name: 'Using DatePicker ranges',
  render: () => {
    const [day1, setDay1] = useState<RangePickerValue | undefined>([]);
    const [day2, setDay2] = useState<RangePickerValue | undefined>([
      dayjs('2024-04-04'),
      dayjs('2024-11-18'),
    ]);

    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">RangePicker</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <DatePicker.RangePicker
            value={day1}
            onChange={setDay1}
            minDate={dayjs('2024-04-04')}
            maxDate={dayjs('2024-05-13')}
          />
          <DatePicker.RangePicker
            value={day2}
            minDate={dayjs('2024-04-04')}
            maxDate={dayjs('2024-05-13')}
            onChange={setDay2}
            data-testid="range-picker"
          />
        </Flex>
        <Flex direction="horizontal" gap="l">
          <DatePicker.RangePicker
            value={day2}
            minDate={dayjs('2024-04-04')}
            maxDate={dayjs('2024-05-13')}
            transparent
            onChange={setDay2}
          />
          <DatePicker.RangePicker
            value={day2}
            minDate={dayjs('2024-04-04')}
            maxDate={dayjs('2024-05-13')}
            readOnly
            onChange={setDay2}
          />
          <DatePicker.RangePicker
            value={day2}
            minDate={dayjs('2024-04-04')}
            maxDate={dayjs('2024-05-13')}
            disabled
            onChange={setDay2}
          />
        </Flex>
      </Flex>
    );
  },
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

    await step('need to choose a date range', async () => {
      await userEvent.click(canvas.getByTestId('range-picker'));
      await userEvent.click(canvas.getByText('17'));
      await expect(canvas.getByTestId('range-picker')).toHaveValue(
        `17.04.2024 - ...`,
      );
      await userEvent.click(canvas.getByText('navigate_next'));
      await userEvent.click(canvas.getByText('navigate_next'));
      await userEvent.hover(canvas.getByText('24'));
      await userEvent.click(canvas.getByText('24'));
      await timeout(1);
      await expect(canvas.getByTestId('range-picker')).toHaveValue(
        `17.04.2024 - 24.06.2024`,
      );
    });
  },
};

export default story;
