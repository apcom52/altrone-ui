import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Configuration, Application, Textarea } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Textarea', () => {
  test('check that className and style props works', () => {
    render(
      <Application>
        <Textarea
          data-testid="textarea"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
      </Application>,
    );

    expect(screen.getByTestId('textarea')).toHaveClass('cls');
    expect(screen.getByTestId('textarea')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that Textarea configuration works correctly', () => {
    render(
      <Application>
        <Configuration
          textarea={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
        >
          <Textarea data-testid="textarea" />
        </Configuration>
      </Application>,
    );

    const element = screen.getByTestId('textarea');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
