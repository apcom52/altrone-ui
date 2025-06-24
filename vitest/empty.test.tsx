import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  AltroneApplication,
  Configuration,
  Empty,
  Icon,
} from '../src/components';

describe('Empty', () => {
  test('check custom children and icon', () => {
    render(
      <AltroneApplication>
        <Empty data-testid="empty1" />
        <Empty data-testid="empty2" icon={<Icon i="search" />} />
        <Empty data-testid="empty3">Custom children</Empty>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('empty1')).toHaveTextContent('No data');
    expect(screen.getByTestId('empty2')).toHaveTextContent('search');
    expect(screen.getByTestId('empty3')).toHaveTextContent('Custom children');
  });

  test('check that properties works correctly', () => {
    const { rerender } = render(
      <Empty
        data-testid="empty1"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      />,
    );

    expect(screen.getByTestId('empty1')).toHaveClass('cls');
    expect(screen.getByTestId('empty1')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that configuration works', () => {
    render(
      <Configuration
        empty={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
      >
        <Empty data-testid="element" />
      </Configuration>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
