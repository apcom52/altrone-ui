import { render, screen } from '@testing-library/react';
import { AltroneApplication, Divider } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Divider', () => {
  test('Divider has to apply custom className and id', () => {
    render(
      <Divider
        data-testid="divider"
        className="cls"
        style={{ color: 'red' }}
      />,
    );

    expect(screen.getByTestId('divider')).toHaveClass('cls');
    expect(screen.getByTestId('divider')).toHaveStyle('color: red');
  });

  test('check that Divider configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          divider: {
            className: 'cls',
            style: { color: 'blue' },
          },
        }}
      >
        <Divider data-testid="divider" />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('divider')).toHaveClass('cls');
    expect(screen.getByTestId('divider')).toHaveStyle('color: blue');
  });
});
