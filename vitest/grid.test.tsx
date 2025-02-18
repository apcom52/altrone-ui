import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Configuration, Grid } from '../src';

describe('Grid', () => {
  test('check that custom className and styles works', () => {
    render(
      <Grid className="cls" style={{ fontSize: '20px' }} data-testid="grid">
        <Grid.Column
          className="child-cls"
          style={{ fontSize: '10px' }}
          data-testid="column"
        />
      </Grid>,
    );

    expect(screen.getByTestId('grid')).toHaveClass('cls');
    expect(screen.getByTestId('grid')).toHaveStyle('font-size: 20px');
    expect(screen.getByTestId('column')).toHaveClass('child-cls');
    expect(screen.getByTestId('column')).toHaveStyle('font-size: 10px');
  });

  test('check that configuration works', () => {
    render(
      <Configuration
        grid={{
          className: 'cls',
          style: { fontSize: '20px' },
          column: { className: 'child-cls', style: { fontSize: '10px' } },
        }}
      >
        <Grid data-testid="grid">
          <Grid.Column data-testid="column" />
        </Grid>
      </Configuration>,
    );

    expect(screen.getByTestId('grid')).toHaveClass('cls');
    expect(screen.getByTestId('grid')).toHaveStyle('font-size: 20px');
    expect(screen.getByTestId('column')).toHaveClass('child-cls');
    expect(screen.getByTestId('column')).toHaveStyle('font-size: 10px');
  });
});
