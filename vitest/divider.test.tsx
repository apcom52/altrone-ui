import React from 'react';
import { expect, test, describe } from 'vitest';
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
        style={{ color: 'rgb(255, 0, 0)' }}
      />,
    );

    expect(screen.getByTestId('divider')).toHaveClass('cls');
    expect(screen.getByTestId('divider')).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('check that Divider configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          divider: {
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
          },
        }}
      >
        <Divider data-testid="divider" />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('divider')).toHaveClass('cls');
    expect(screen.getByTestId('divider')).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
