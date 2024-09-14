import { render, screen } from '@testing-library/react';
import { AltroneApplication, Tabs } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Tabs', () => {
  test('Tabs has to apply custom className and id', () => {
    render(
      <Tabs data-testid="tabs" className="cls" style={{ color: 'red' }}>
        <Tabs.Item
          data-testid="tabsItem"
          label="Test 1"
          className="childCls"
          style={{ color: 'blue' }}
        />
        <Tabs.Item label="Test 2" />
      </Tabs>,
    );

    expect(screen.getByTestId('tabs')).toHaveClass('cls');
    expect(screen.getByTestId('tabs')).toHaveStyle('color: red');
    expect(screen.getByTestId('tabsItem')).toHaveClass('childCls');
    expect(screen.getByTestId('tabsItem')).toHaveStyle('color: blue');
  });

  test('check that Tabs configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          tabs: {
            className: 'cls',
            style: { color: 'blue' },
          },
        }}
      >
        <Tabs data-testid="tabs" className="cls" style={{ color: 'red' }} />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('tabs')).toHaveClass('cls');
    expect(screen.getByTestId('tabs')).toHaveStyle('color: red');
  });
});
