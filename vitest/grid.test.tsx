import { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from '../src';

describe('Grid', () => {
  test('forwards className and inline style on the container and columns', () => {
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

  test('maps gap / rowGap to the spacing custom properties, defaulting to 0px', () => {
    render(
      <Grid gap="l" data-testid="grid">
        <Grid.Column />
      </Grid>,
    );

    const grid = screen.getByTestId('grid');
    expect(grid.style.getPropertyValue('--grid-column-spacing')).toBe(
      'var(--l-gap)',
    );
    expect(grid.style.getPropertyValue('--grid-row-spacing')).toBe('0px');
  });

  test('a numeric size sets --grid-column-size; the default "auto" leaves it unset', () => {
    render(
      <Grid>
        <Grid.Column size={4} data-testid="sized" />
        <Grid.Column data-testid="auto" />
      </Grid>,
    );

    expect(
      screen.getByTestId('sized').style.getPropertyValue('--grid-column-size'),
    ).toBe('4');
    expect(
      screen.getByTestId('auto').style.getPropertyValue('--grid-column-size'),
    ).toBe('');
  });

  test('offset sets --grid-column-offset only when greater than zero', () => {
    render(
      <Grid>
        <Grid.Column offset={3} data-testid="shifted" />
        <Grid.Column offset={0} data-testid="flush" />
      </Grid>,
    );

    expect(
      screen
        .getByTestId('shifted')
        .style.getPropertyValue('--grid-column-offset'),
    ).toBe('3');
    expect(
      screen
        .getByTestId('flush')
        .style.getPropertyValue('--grid-column-offset'),
    ).toBe('');
  });

  test('renders the element given by tagName for the container and columns', () => {
    render(
      <Grid tagName="section" data-testid="grid">
        <Grid.Column tagName="article" data-testid="column" />
      </Grid>,
    );

    expect(screen.getByTestId('grid').tagName).toBe('SECTION');
    expect(screen.getByTestId('column').tagName).toBe('ARTICLE');
  });

  test('forwards ref to the root node of the container and of a column', () => {
    const gridRef = createRef<HTMLElement>();
    const columnRef = createRef<HTMLElement>();

    render(
      <Grid ref={gridRef} data-testid="grid">
        <Grid.Column ref={columnRef} data-testid="column" />
      </Grid>,
    );

    expect(gridRef.current).toBe(screen.getByTestId('grid'));
    expect(columnRef.current).toBe(screen.getByTestId('column'));
  });
});
