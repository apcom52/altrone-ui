import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MonthPicker } from './index';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangePosition } from './DatePicker.types';

describe('Form.DatePicker.MonthPicker', () => {
  test('MonthPicker should renders correctly', () => {
    const currentMonth = dayjs('2022-04-04');

    render(
      <MonthPicker
        currentMonth={currentMonth}
        startSelectedDate={undefined}
        onChange={() => null}
        minDate={new Date(2022, 2, 1)}
        maxDate={new Date(2022, 10, 1)}
        isDateRange={false}
      />
    );

    const months: HTMLButtonElement[] = screen.getAllByTestId('alt-test-monthPicker-item');

    expect(months).toHaveLength(12);

    const disabledMonths = months.filter((item) => item.disabled);
    const disabledMonthLabels = disabledMonths.map((item) => item.dataset.monthIndex);
    expect(disabledMonths).toHaveLength(3);
    expect(disabledMonthLabels).toStrictEqual(['0', '1', '11']);

    expect(screen.getByTestId('alt-test-monthPicker-currentYear')).toHaveTextContent('2022');
  });

  test('should change current year', async () => {
    const currentMonth = dayjs('2022-04-04');

    const { rerender } = render(
      <MonthPicker
        currentMonth={currentMonth}
        startSelectedDate={undefined}
        onChange={() => null}
        minDate={new Date(2022, 2, 1)}
        maxDate={new Date(2022, 10, 1)}
        isDateRange={false}
      />
    );

    expect(screen.getByTestId('alt-test-monthPicker-currentYear')).toHaveTextContent('2022');

    await waitFor(() => fireEvent.click(screen.getByText('arrow_back')));

    rerender(
      <MonthPicker
        currentMonth={currentMonth}
        startSelectedDate={undefined}
        onChange={() => null}
        minDate={new Date(2022, 2, 1)}
        maxDate={new Date(2022, 10, 1)}
        isDateRange={false}
      />
    );

    expect(screen.getByTestId('alt-test-monthPicker-currentYear')).toHaveTextContent('2021');

    await waitFor(() => fireEvent.click(screen.getByText('arrow_forward')));

    rerender(
      <MonthPicker
        currentMonth={currentMonth}
        startSelectedDate={undefined}
        onChange={() => null}
        minDate={new Date(2022, 2, 1)}
        maxDate={new Date(2022, 10, 1)}
        isDateRange={false}
      />
    );

    expect(screen.getByTestId('alt-test-monthPicker-currentYear')).toHaveTextContent('2022');
  });

  test('should renders selected dates correctly', () => {
    const currentMonth = dayjs('2022-04-04');

    render(
      <MonthPicker
        currentMonth={currentMonth}
        startSelectedDate={dayjs('2022-02-05')}
        endSelectedDate={dayjs('2022-09-07')}
        onChange={() => null}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(2023, 10, 1)}
        isDateRange={true}
      />
    );

    const monthItems = screen.getAllByTestId('alt-test-monthPicker-item');

    const selectedMonths = monthItems.map((item) =>
      item.classList.contains('alt-month-picker-item--active')
    );
    const highlightedMonths = monthItems.map((item) =>
      item.classList.contains('alt-month-picker-item--highlighted')
    );

    expect(selectedMonths).toStrictEqual([
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ]);

    expect(highlightedMonths).toStrictEqual([
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false
    ]);
  });

  test('should change date correctly', async () => {
    let value: Dayjs | undefined = dayjs('2022-04-04');
    const onChange = (_: DateRangePosition, date: Dayjs | undefined) => {
      value = date;
    };

    render(
      <MonthPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={value}
        endSelectedDate={undefined}
        onChange={onChange}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(2023, 10, 1)}
        isDateRange={false}
      />
    );

    const november = screen.getByText('Nov');
    await waitFor(() => fireEvent.click(november));

    expect(value.format('YYYY-MM-DD')).toBe('2022-11-01');
  });

  test('should change date range correctly', async () => {
    let startDate: Dayjs | undefined = undefined;
    let endDate: Dayjs | undefined = undefined;

    const onChange = (
      position: DateRangePosition,
      date: Dayjs | undefined,
      date2: Dayjs | undefined
    ) => {
      if (position === 'start') {
        startDate = date;
      } else if (position === 'end') {
        endDate = date;
      } else if (position === 'both') {
        startDate = date;
        endDate = date2;
      }
    };

    const { rerender } = render(
      <MonthPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(2023, 10, 1)}
        isDateRange={true}
      />
    );

    await waitFor(() => fireEvent.click(screen.getByText('Apr')));

    expect((startDate as unknown as Dayjs).format('YYYY-MM-DD')).toBe('2022-04-01');
    expect(endDate as unknown as Dayjs).toBeUndefined();

    rerender(
      <MonthPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(2023, 10, 1)}
        isDateRange={true}
      />
    );

    await waitFor(() => fireEvent.click(screen.getByText('Nov')));

    expect((startDate as unknown as Dayjs).format('YYYY-MM-DD')).toBe('2022-04-01');
    expect((endDate as unknown as Dayjs).format('YYYY-MM-DD')).toBe('2022-11-01');

    rerender(
      <MonthPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(2023, 10, 1)}
        isDateRange={true}
      />
    );

    await waitFor(() => fireEvent.click(screen.getByText('Jun')));

    expect((startDate as unknown as Dayjs).format('YYYY-MM-DD')).toBe('2022-06-01');
    expect(endDate as unknown as Dayjs).toBeUndefined();
  });

  test('check that default currentMonth prop will be current month', () => {
    render(
      <MonthPicker
        currentMonth={dayjs('2020-04-04')}
        startSelectedDate={undefined}
        endSelectedDate={undefined}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={false}
      />
    );

    expect(screen.getByTestId('alt-test-monthPicker-currentYear')).toHaveTextContent(
      new Date().getFullYear().toString()
    );
  });

  test('has to show hovered dates', async () => {
    const { container, rerender } = render(
      <MonthPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={dayjs('2022-02-01')}
        endSelectedDate={undefined}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={true}
      />
    );

    await waitFor(() => fireEvent.mouseEnter(screen.getByText('Jun')));

    rerender(
      <MonthPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={dayjs('2022-02-01')}
        endSelectedDate={undefined}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={true}
      />
    );

    const hoveredDates = Array.from(
      container.querySelectorAll('.alt-month-picker-item--highlighted')
    );

    expect(hoveredDates).toHaveLength(5);

    await waitFor(() =>
      fireEvent.mouseLeave(container.querySelector('.alt-month-picker-calendar') as Element)
    );

    rerender(
      <MonthPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={dayjs('2022-02-01')}
        endSelectedDate={undefined}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={true}
      />
    );

    const hoveredDates2 = Array.from(
      container.querySelectorAll('.alt-month-picker-item--highlighted')
    );

    expect(hoveredDates2).toHaveLength(0);
  });
});
