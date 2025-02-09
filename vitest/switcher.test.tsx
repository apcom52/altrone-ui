import React from 'react';
import { expect, test, describe } from 'vitest';
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
          style={{ color: 'rgb(0, 0, 255)' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('switcher')).toHaveClass('cls');
    expect(screen.getByTestId('switcher')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that Checkbox configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          switcher={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
        >
          <Switcher data-testid="switcher" />
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('switcher');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
