import { render, screen } from '@testing-library/react';
import { AltroneApplication, Loading } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Loading', () => {
  test('Loading has to apply custom className and id', () => {
    render(
      <Loading
        data-testid="loading"
        className="cls"
        style={{ fontSize: '18px' }}
      />,
    );

    expect(screen.getByTestId('loading')).toHaveClass('cls');
    expect(screen.getByTestId('loading')).toHaveStyle('fontSize: 18px');
  });

  test('check that Loading configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          loading: {
            className: 'cls',
            style: { fontSize: '18px' },
          },
        }}
      >
        <Loading data-testid="loading" />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('loading')).toHaveClass('cls');
    expect(screen.getByTestId('loading')).toHaveStyle('fontSize: 18px');
  });
});
