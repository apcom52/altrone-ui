import { render, screen } from '@testing-library/react';
import {
  Configuration,
  AltroneApplication,
  Calendar,
  dayjs,
} from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

const calendarToArray = (element: HTMLElement) => {
  const days = element.querySelectorAll('[data-full-date]');

  return Array.from(days).map((item) => (item as HTMLElement).dataset.date);
};

describe('Calendar', () => {
  test('check august 2024', () => {
    render(
      <AltroneApplication>
        <Calendar data-testid="calendar" month={dayjs('2024-08')} />
      </AltroneApplication>,
    );

    const result = calendarToArray(screen.getByTestId('calendar'));
    expect(result.at(0)).toBe('29');
    expect(result.at(-1)).toBe('1');
  });

  test('check july 2024', () => {
    render(
      <AltroneApplication>
        <Calendar data-testid="calendar" month={dayjs('2024-07')} />
      </AltroneApplication>,
    );

    const result = calendarToArray(screen.getByTestId('calendar'));
    expect(result.at(0)).toBe('1');
    expect(result.at(-1)).toBe('4');
  });

  test('check feb 2024', () => {
    render(
      <AltroneApplication>
        <Calendar data-testid="calendar" month={dayjs('2024-02')} />
      </AltroneApplication>,
    );

    const result = calendarToArray(screen.getByTestId('calendar'));
    expect(result.at(0)).toBe('29');
    expect(result.at(-1)).toBe('3');
  });

  test('check dec 2024', () => {
    render(
      <AltroneApplication>
        <Calendar data-testid="calendar" month={dayjs('2024-12')} />
      </AltroneApplication>,
    );

    const result = calendarToArray(screen.getByTestId('calendar'));
    expect(result.at(0)).toBe('25');
    expect(result.at(-1)).toBe('5');
  });

  test('check aug 2025', () => {
    render(
      <AltroneApplication>
        <Calendar data-testid="calendar" month={dayjs('2025-08')} />
      </AltroneApplication>,
    );

    const result = calendarToArray(screen.getByTestId('calendar'));
    expect(result.at(0)).toBe('28');
    expect(result.at(-1)).toBe('31');
  });

  test('check custom className and styles', () => {
    render(
      <AltroneApplication>
        <Calendar
          data-testid="calendar"
          month={dayjs('2025-08')}
          className="cls"
          style={{ color: 'blue ' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('calendar')).toHaveClass('cls');
    expect(screen.getByTestId('calendar')).toHaveStyle('color: blue');
  });

  test('check that configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          calendar={{ className: 'cls', style: { color: 'blue' } }}
        >
          <Calendar data-testid="calendar" month={dayjs('2025-08')} />
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('calendar');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
