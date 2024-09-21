import { render, screen } from '@testing-library/react';
import { AltroneApplication, Breadcrumbs } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Breadcrumbs', () => {
  test('Breadcrumbs has to apply custom className and id', () => {
    render(
      <Breadcrumbs
        data-testid="breadcrumbs"
        className="cls"
        style={{ color: 'red' }}
      >
        <Breadcrumbs.Item
          label="Home"
          data-testid="item"
          className="item-cls"
          style={{ color: 'green' }}
        />
      </Breadcrumbs>,
    );

    expect(screen.getByTestId('breadcrumbs')).toHaveClass('cls');
    expect(screen.getByTestId('breadcrumbs')).toHaveStyle('color: red');
    expect(screen.getByTestId('item')).toHaveClass('item-cls');
    expect(screen.getByTestId('item')).toHaveStyle('color: green');
  });

  test('check that TopNavigation configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          breadcrumbs: {
            className: 'cls',
            style: { color: 'blue' },
          },
        }}
      >
        <Breadcrumbs data-testid="breadcrumbs">
          <Breadcrumbs.Item label="Home" data-testid="item" />
        </Breadcrumbs>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('breadcrumbs')).toHaveClass('cls');
    expect(screen.getByTestId('breadcrumbs')).toHaveStyle('color: blue');
  });
});
