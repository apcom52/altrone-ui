import React from 'react';
import { expect, test, describe, vitest, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Button,
  ColorPicker,
  Configuration,
  Dropdown,
} from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('ColorPicker', () => {
  beforeAll(() => {
    // @ts-ignore
    window.ResizeObserver = ResizeObserver;
  });

  test('check that render menu correctly', () => {
    render(<ColorPicker data-testid="picker" onChange={() => null} />);

    expect(screen.getByTestId('picker')).toBeInTheDocument();
  });

  test('check renderFunc property', async () => {
    const callbackFn = vi.fn();
    const value = '#00ff00';

    render(
      <ColorPicker
        data-testid="picker"
        value={value}
        onChange={callbackFn}
        renderFunc={({ value, opened }) => {
          expect(opened).toBe(false);

          return <div data-testid="render-func">{value}</div>;
        }}
      />,
    );

    expect(await screen.findByTestId('render-func')).toBeInTheDocument();
    expect(await screen.findByText(value)).toBeInTheDocument();
  });

  test('check that className and style props works', () => {
    render(
      <ColorPicker
        className="cls"
        style={{ color: 'rgb(0, 0, 255) ' }}
        data-testid="picker"
        onChange={() => null}
      />,
    );

    expect(screen.getByTestId('picker')).toHaveClass('cls');
    expect(screen.getByTestId('picker')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that ColorPicker configuration works correctly', () => {
    render(
      <Configuration
        colorPicker={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
      >
        <ColorPicker data-testid="element" onChange={() => null} />
      </Configuration>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
