import { render, screen } from '@testing-library/react';
import {
  Configuration,
  AltroneApplication,
  DatePicker,
} from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('DatePicker', () => {
  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <DatePicker
          data-testid="date-picker"
          className="cls"
          style={{ color: 'blue' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('date-picker')).toHaveClass('cls');
    expect(screen.getByTestId('date-picker')).toHaveStyle('color: blue');
  });

  test('check that Checkbox configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          datePicker={{ className: 'cls', style: { color: 'blue' } }}
        >
          <DatePicker data-testid="date-picker" />
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('date-picker')).toHaveClass('cls');
    expect(screen.getByTestId('date-picker')).toHaveStyle('color: blue');
  });
});
