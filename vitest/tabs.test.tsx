import React from 'react';
import { expect, test, describe } from 'vitest';
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
      <Tabs
        data-testid="tabs"
        className="cls"
        style={{ color: 'rgb(255, 0, 0)' }}
      >
        <Tabs.Item
          data-testid="tabsItem"
          label="Test 1"
          className="childCls"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
        <Tabs.Item label="Test 2" />
      </Tabs>,
    );

    expect(screen.getByTestId('tabs')).toHaveClass('cls');
    expect(screen.getByTestId('tabs')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('tabsItem')).toHaveClass('childCls');
    expect(screen.getByTestId('tabsItem')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that Tabs configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          tabs: {
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
          },
        }}
      >
        <Tabs
          data-testid="tabs"
          className="cls"
          style={{ color: 'rgb(255, 0, 0)' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('tabs')).toHaveClass('cls');
    expect(screen.getByTestId('tabs')).toHaveStyle('color: rgb(255, 0, 0)');
  });
});
