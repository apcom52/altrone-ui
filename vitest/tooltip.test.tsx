import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Configuration, Tooltip } from '../src/components';

describe('Tooltip', () => {
  test('check that render menu correctly', () => {
    const { rerender } = render(
      <Tooltip content="Tooltip content" openedByDefault />,
    );

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    expect(screen.getByText('help_outline')).toBeInTheDocument();

    rerender(
      <Tooltip content="Tooltip content" openedByDefault>
        source
      </Tooltip>,
    );

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    expect(screen.getByText('source')).toBeInTheDocument();
  });

  test('check that className and style props works', () => {
    render(
      <Tooltip
        content="Tooltip content"
        openedByDefault
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      />,
    );

    expect(screen.getByText('Tooltip content')).toHaveClass('cls');
    expect(screen.getByText('Tooltip content')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );
  });

  test('check that Tooltip configuration works correctly', () => {
    render(
      <Configuration
        tooltip={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
      >
        <Tooltip
          content="Tooltip content"
          openedByDefault
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
      </Configuration>,
    );

    const element = screen.getByText('Tooltip content');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
