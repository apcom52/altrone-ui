import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AltroneApplication, BottomNavigation, Icon } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('BottomNavigation', () => {
  test('BottomNavigation has to apply custom className and id', () => {
    render(
      <BottomNavigation
        data-testid="list"
        className="cls"
        style={{ color: 'red' }}
      >
        <BottomNavigation.Item
          data-testid="action1"
          label="Item1"
          icon={<Icon i="face" />}
          className="cls1"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
        <BottomNavigation.Item
          data-testid="action2"
          label="Item1"
          icon={<Icon i="face" />}
        />
      </BottomNavigation>,
    );

    expect(screen.getByTestId('list')).toHaveClass('cls');
    expect(screen.getByTestId('list')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('action1')).toHaveClass('cls1');
    expect(screen.getByTestId('action1')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that BottomNavigation configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          bottomNavigation: {
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
            selectedItemClassName: 'selected',
          },
        }}
      >
        <BottomNavigation data-testid="list">
          <BottomNavigation.Item
            data-testid="action1"
            label="Item1"
            icon={<Icon i="face" />}
          />
          <BottomNavigation.Item
            selected={true}
            data-testid="action2"
            label="Item1"
            icon={<Icon i="face" />}
          />
        </BottomNavigation>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('list')).toHaveClass('cls');
    expect(screen.getByTestId('list')).toHaveStyle('color: rgb(0, 0, 255)');
    expect(screen.getByTestId('action1')).not.toHaveClass('selected');
    expect(screen.getByTestId('action2')).toHaveClass('selected');
  });
});
