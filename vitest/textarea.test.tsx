import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Configuration, Application, TextArea } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('TextArea', () => {
  test('check that className and style props works', () => {
    render(
      <Application>
        <TextArea
          data-testid="textArea"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
      </Application>,
    );

    const textArea = screen.getByTestId('textArea');
    expect(textArea).toHaveClass('cls');
    expect(textArea).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that TextArea configuration works correctly', () => {
    render(
      <Application>
        <Configuration
          textArea={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
        >
          <TextArea data-testid="textArea" />
        </Configuration>
      </Application>,
    );

    const element = screen.getByTestId('textArea');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
