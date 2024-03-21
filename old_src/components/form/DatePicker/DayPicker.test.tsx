import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DayPicker } from './index';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangePosition } from './DatePicker.types';
import { userEvent } from '@storybook/testing-library';

describe('Form.DatePicker.DayPicker', () => {
  test('has to render current month', () => {
    const date = dayjs('2022-04-04');

    render(
      <DayPicker
        currentMonth={date}
        startSelectedDate={date}
        onChange={jest.fn()}
        isDateRange={false}
        minDate={new Date(2020, 1, 1)}
        maxDate={new Date(2024, 1, 1)}
      />
    );

    const weekdays = screen
      .getAllByTestId('alt-test-calendar-weekday')
      .map((elem) => elem.innerHTML);

    expect(weekdays).toStrictEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  });

  test('onChange has to change date in single mode', () => {
    let date: Dayjs | undefined = undefined;
    const onChange = (_: DateRangePosition, value: Dayjs | undefined) => {
      date = value;
    };

    const { container } = render(
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={date}
        onChange={onChange}
        isDateRange={false}
        minDate={new Date(2020, 1, 1)}
        maxDate={new Date(2024, 1, 1)}
      />
    );

    const day4 = container.querySelector('[data-date="2022-04-04"]') as Element;
    fireEvent.click(day4);

    expect((date as unknown as Dayjs).format('YYYY-MM-DD')).toBe('2022-04-04');
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
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(2023, 10, 1)}
        isDateRange={true}
      />
    );

    await waitFor(() => fireEvent.click(screen.getByText('4')));

    expect((startDate as unknown as Dayjs).format('YYYY-MM-DD')).toBe('2022-04-04');
    expect(endDate as unknown as Dayjs).toBeUndefined();

    rerender(
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(2023, 10, 1)}
        isDateRange={true}
      />
    );

    await waitFor(() => fireEvent.click(screen.getByText('15')));

    expect((startDate as unknown as Dayjs).format('YYYY-MM-DD')).toBe('2022-04-04');
    expect((endDate as unknown as Dayjs).format('YYYY-MM-DD')).toBe('2022-04-15');

    rerender(
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(2023, 10, 1)}
        isDateRange={true}
      />
    );

    await waitFor(() => fireEvent.click(screen.getByText('12')));

    expect((startDate as unknown as Dayjs).format('YYYY-MM-DD')).toBe('2022-04-12');
    expect(endDate as unknown as Dayjs).toBeUndefined();
  });

  test('has to show hovered dates', async () => {
    const { container, rerender } = render(
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={dayjs('2022-04-04')}
        endSelectedDate={undefined}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={true}
      />
    );

    userEvent.hover(screen.getByText('15'));

    rerender(
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={dayjs('2022-04-04')}
        endSelectedDate={undefined}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={true}
      />
    );

    const hoveredDates = Array.from(container.querySelectorAll('.alt-day-picker-item__background'));

    expect(hoveredDates).toHaveLength(12);

    rerender(
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={dayjs('2022-04-04')}
        endSelectedDate={undefined}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={true}
      />
    );

    fireEvent.mouseLeave(screen.getByTestId('alt-test-dayPicker-calendar'));

    rerender(
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={dayjs('2022-04-04')}
        endSelectedDate={undefined}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={true}
      />
    );

    const hoveredDates2 = Array.from(
      container.querySelectorAll('.alt-day-picker-item__background')
    );

    expect(hoveredDates2).toHaveLength(0);
  });

  test('hover not working if we have two dates', async () => {
    const { container, rerender } = render(
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={dayjs('2022-04-04')}
        endSelectedDate={dayjs('2022-04-15')}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={true}
      />
    );

    userEvent.hover(screen.getByText('17'));

    rerender(
      <DayPicker
        currentMonth={dayjs('2022-04-04')}
        startSelectedDate={dayjs('2022-04-04')}
        endSelectedDate={undefined}
        onChange={jest.fn}
        minDate={new Date(2021, 2, 1)}
        maxDate={new Date(new Date().getFullYear() + 1, 10, 1)}
        isDateRange={true}
      />
    );

    const hoveredDates = Array.from(container.querySelectorAll('.alt-day-picker-item__background'));

    expect(hoveredDates).toHaveLength(0);
  });
});
