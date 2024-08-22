import { render, screen } from '@testing-library/react';
import { Configuration, AltroneApplication, Switcher } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Switcher', () => {
  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Switcher
          data-testid="switcher"
          className="cls"
          style={{ color: 'blue' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('switcher')).toHaveClass('cls');
    expect(screen.getByTestId('switcher')).toHaveStyle('color: blue');
  });

  test('check that Checkbox configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          switcher={{ className: 'cls', style: { color: 'blue' } }}
        >
          <Switcher data-testid="switcher" />
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('switcher');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
