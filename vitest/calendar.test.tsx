import React from 'react';
import { expect, test, describe, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AltroneApplication } from '../src/components';
import { Calendar } from '../src/components/calendar/Calendar';
import { CalendarRenderDateProps } from '../src/components/calendar/Calendar.types';
import {
  buildCalendarGrid,
  getWeekdayNames,
  resolveFirstWeekday,
} from '../src/components/calendar/calendarUtils';
import { dayjsInstance as dayjs } from '../src/utils';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

const renderCalendar = (ui: React.ReactElement) =>
  render(<AltroneApplication>{ui}</AltroneApplication>);

const cellDates = (root: HTMLElement) =>
  Array.from(root.querySelectorAll('[data-full-date]')).map(
    (node) => (node as HTMLElement).dataset.fullDate,
  );

describe('calendarUtils.buildCalendarGrid', () => {
  test('always spans a fixed 6×7 grid', () => {
    expect(buildCalendarGrid(dayjs('2024-08'), 0)).toHaveLength(42);
    expect(buildCalendarGrid(dayjs('2024-02'), 1)).toHaveLength(42);
  });

  test('leading days depend on the first weekday (Aug 2024 starts on a Thursday)', () => {
    const sundayFirst = buildCalendarGrid(dayjs('2024-08'), 0);
    const mondayFirst = buildCalendarGrid(dayjs('2024-08'), 1);

    expect(sundayFirst[0].format('YYYY-MM-DD')).toBe('2024-07-28');
    expect(sundayFirst[0].day()).toBe(0);

    expect(mondayFirst[0].format('YYYY-MM-DD')).toBe('2024-07-29');
    expect(mondayFirst[0].day()).toBe(1);
  });

  test('a month that starts exactly on the first weekday still gets a full leading week', () => {
    // 2024-09-01 is a Sunday.
    const grid = buildCalendarGrid(dayjs('2024-09'), 0);
    expect(grid[0].format('YYYY-MM-DD')).toBe('2024-09-01');
    expect(grid).toHaveLength(42);
    expect(grid[41].format('YYYY-MM-DD')).toBe('2024-10-12');
  });
});

describe('calendarUtils.resolveFirstWeekday', () => {
  test('explicit preference wins over locale', () => {
    expect(resolveFirstWeekday('ru-RU', 'sunday')).toBe(0);
    expect(resolveFirstWeekday('en-US', 'monday')).toBe(1);
  });

  test('auto resolves Sunday for en-US and Monday for ru-RU', () => {
    expect(resolveFirstWeekday('en-US', 'auto')).toBe(0);
    expect(resolveFirstWeekday('ru-RU', 'auto')).toBe(1);
  });
});

describe('calendarUtils.getWeekdayNames', () => {
  test('is ordered from the given first weekday', () => {
    const sundayFirst = getWeekdayNames('en-US', 0);
    const mondayFirst = getWeekdayNames('en-US', 1);

    expect(sundayFirst).toHaveLength(7);
    expect(mondayFirst[0]).toBe(sundayFirst[1]);
    expect(mondayFirst[6]).toBe(sundayFirst[0]);
  });
});

describe('Calendar (low-level API)', () => {
  test('renders a fixed 42-cell grid and forwards ref + className/style', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderCalendar(
      <Calendar
        ref={ref}
        data-testid="calendar"
        month={dayjs('2024-08')}
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      />,
    );

    const root = screen.getByTestId('calendar');
    expect(ref.current).toBe(root);
    expect(root).toHaveClass('cls');
    expect(root).toHaveStyle('color: rgb(0, 0, 255)');
    expect(cellDates(root)).toHaveLength(42);
  });

  test('honors selectedDates and a custom DateComponent (DatePicker contract)', () => {
    const DateComponent = vi.fn((props: CalendarRenderDateProps) => (
      <button
        type="button"
        data-full-date={props.currentDate.format('YYYY-MM-DD')}
        data-selected={props.selected || undefined}
      >
        {props.currentDate.date()}
      </button>
    ));

    renderCalendar(
      <Calendar
        data-testid="calendar"
        month={dayjs('2024-08')}
        selectedDates={[dayjs('2024-08-15')]}
        DateComponent={DateComponent}
      />,
    );

    const root = screen.getByTestId('calendar');
    const selected = root.querySelectorAll('[data-selected="true"]');
    expect(selected).toHaveLength(1);
    expect((selected[0] as HTMLElement).dataset.fullDate).toBe('2024-08-15');
  });

  test('a click reports the date through onDateChange without owning state', () => {
    const onDateChange = vi.fn();
    renderCalendar(
      <Calendar
        data-testid="calendar"
        month={dayjs('2024-08')}
        onDateChange={onDateChange}
      />,
    );

    fireEvent.click(
      screen
        .getByTestId('calendar')
        .querySelector('[data-full-date="2024-08-10"]') as HTMLElement,
    );

    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onDateChange.mock.calls[0][0].format('YYYY-MM-DD')).toBe(
      '2024-08-10',
    );
  });
});

describe('Calendar (high-level API)', () => {
  test('mode="single" selects the clicked day and calls onSelect', () => {
    const onSelect = vi.fn();
    renderCalendar(
      <Calendar
        data-testid="calendar"
        mode="single"
        month={dayjs('2024-08')}
        onSelect={onSelect}
      />,
    );

    const root = screen.getByTestId('calendar');
    fireEvent.click(
      root.querySelector('[data-full-date="2024-08-10"]') as HTMLElement,
    );

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].format('YYYY-MM-DD')).toBe('2024-08-10');
    expect(
      root.querySelector('[data-full-date="2024-08-10"]')?.getAttribute(
        'data-selected',
      ),
    ).toBe('true');
  });

  test('mode="range" builds an ordered range across two clicks, even backwards', () => {
    const onSelect = vi.fn();
    renderCalendar(
      <Calendar
        data-testid="calendar"
        mode="range"
        month={dayjs('2024-08')}
        onSelect={onSelect}
      />,
    );

    const root = screen.getByTestId('calendar');
    fireEvent.click(
      root.querySelector('[data-full-date="2024-08-20"]') as HTMLElement,
    );
    fireEvent.click(
      root.querySelector('[data-full-date="2024-08-10"]') as HTMLElement,
    );

    const last = onSelect.mock.calls.at(-1)?.[0];
    expect(last.from.format('YYYY-MM-DD')).toBe('2024-08-10');
    expect(last.to.format('YYYY-MM-DD')).toBe('2024-08-20');

    const banded = root.querySelectorAll('[data-in-range="true"]');
    expect(banded.length).toBe(11);
  });

  test('the navigation header changes the displayed month', () => {
    renderCalendar(
      <Calendar
        data-testid="calendar"
        mode="single"
        defaultMonth={dayjs('2024-08')}
      />,
    );

    const root = screen.getByTestId('calendar');
    expect(root.querySelector('[data-full-date="2024-09-01"]')).not.toBeNull();

    fireEvent.click(screen.getByLabelText('Next month'));
    expect(root.querySelector('[data-full-date="2024-09-15"]')).not.toBeNull();
    expect(root.querySelector('[data-full-date="2024-08-15"]')).toBeNull();
  });
});
