import { render, screen } from '@testing-library/react';
import { Configuration, AltroneApplication, Checkbox } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Checkbox', () => {
  test('check indeterminate prop', () => {
    render(
      <AltroneApplication>
        <Checkbox data-testid="checkbox" indeterminate={true} />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('checkbox')).toHaveAttribute(
      'aria-checked',
      'mixed',
    );
  });

  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Checkbox
          data-testid="checkbox"
          className="cls"
          style={{ color: 'blue' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('checkbox')).toHaveClass('cls');
    expect(screen.getByTestId('checkbox')).toHaveStyle('color: blue');
  });

  test('check that Checkbox configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          checkbox={{ className: 'cls', style: { color: 'blue' } }}
        >
          <Checkbox data-testid="checkbox" />
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('checkbox');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
