import React from 'react';
import { expect, test, describe } from 'vitest';
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
    expect(screen.getByTestId('breadcrumbs')).toHaveStyle(
      'color: rgb(255, 0, 0)',
    );
    expect(screen.getByTestId('item')).toHaveClass('item-cls');
    expect(screen.getByTestId('item')).toHaveStyle('color: rgb(0, 128, 0)');
  });

  test('check that TopNavigation configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          breadcrumbs: {
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
          },
        }}
      >
        <Breadcrumbs data-testid="breadcrumbs">
          <Breadcrumbs.Item label="Home" data-testid="item" />
        </Breadcrumbs>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('breadcrumbs')).toHaveClass('cls');
    expect(screen.getByTestId('breadcrumbs')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );
  });
});
