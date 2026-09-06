import React from 'react';
import { expect, test, describe, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  Configuration,
  AltroneApplication,
  Button,
  DatePicker,
} from '../src/components';
import { dayjsInstance as dayjs } from '../src/utils';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
  // @ts-ignore
  Element.prototype.scrollIntoView = () => {};
});

const openPopover = () => {
  const host = screen.getByTestId('date-picker');
  fireEvent.click(host.querySelector('input') ?? host);
};

describe('DatePicker', () => {
  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <DatePicker
          data-testid="date-picker"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('date-picker')).toHaveClass('cls');
    expect(screen.getByTestId('date-picker')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );
  });

  test('check that Checkbox configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          datePicker={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
        >
          <DatePicker data-testid="date-picker" />
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('date-picker')).toHaveClass('cls');
    expect(screen.getByTestId('date-picker')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );
  });

  test('opens a Calendar day grid and reports the clicked day', () => {
    const onChange = vi.fn();
    render(
      <AltroneApplication>
        <DatePicker
          data-testid="date-picker"
          value={dayjs('2024-08-15')}
          onChange={onChange}
        />
      </AltroneApplication>,
    );

    openPopover();

    const selected = document.querySelector('[data-full-date="2024-08-15"]');
    expect(selected).not.toBeNull();
    expect(selected?.getAttribute('data-selected')).toBe('true');

    fireEvent.click(
      document.querySelector('[data-full-date="2024-08-20"]') as HTMLElement,
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].format('YYYY-MM-DD')).toBe('2024-08-20');
  });

  test('RangePicker closes an in-progress range on the second day click', () => {
    const onChange = vi.fn();
    render(
      <AltroneApplication>
        <DatePicker.RangePicker
          data-testid="date-picker"
          value={[dayjs('2024-08-10')]}
          onChange={onChange}
        />
      </AltroneApplication>,
    );

    openPopover();

    fireEvent.click(
      document.querySelector('[data-full-date="2024-08-20"]') as HTMLElement,
    );

    const call = onChange.mock.calls.at(-1)?.[0];
    expect(call[0].format('YYYY-MM-DD')).toBe('2024-08-10');
    expect(call[1].format('YYYY-MM-DD')).toBe('2024-08-20');
  });

  test('renderFunc replaces the trigger, exposes state, and still opens the calendar', () => {
    const onChange = vi.fn();
    const seen: string[] = [];

    render(
      <AltroneApplication>
        <DatePicker
          value={dayjs('2024-08-15')}
          onChange={onChange}
          renderFunc={({ displayValue }) => {
            seen.push(displayValue);
            return <Button data-testid="trigger" label={displayValue} />;
          }}
        />
      </AltroneApplication>,
    );

    expect(seen.at(-1)).toContain('2024');

    fireEvent.click(screen.getByTestId('trigger'));
    fireEvent.click(
      document.querySelector('[data-full-date="2024-08-20"]') as HTMLElement,
    );
    expect(onChange.mock.calls[0][0].format('YYYY-MM-DD')).toBe('2024-08-20');
  });
});
