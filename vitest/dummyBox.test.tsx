import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Configuration, DummyBox, Flex } from '../src';

describe('DummyBox', () => {
  test('check that properties works correctly', () => {
    const { rerender } = render(
      <DummyBox
        data-testid="box"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      />,
    );

    expect(screen.getByTestId('box')).toHaveClass('cls');
    expect(screen.getByTestId('box')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that configuration works', () => {
    render(
      <Configuration
        dummyBox={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
      >
        <DummyBox data-testid="element" />
      </Configuration>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
