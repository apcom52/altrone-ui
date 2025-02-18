import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AltroneApplication, Pagination } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Pagination', () => {
  test('need to render correct label', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={8}
        setPage={() => null}
        data-testid="pagination"
      />,
    );

    expect(screen.getByText('2 of 8')).toBeInTheDocument();
  });

  test('Pagination has to apply custom className and id', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={8}
        setPage={() => null}
        data-testid="pagination"
        className="cls"
        style={{ color: 'red' }}
      />,
    );

    expect(screen.getByTestId('pagination')).toHaveClass('cls');
    expect(screen.getByTestId('pagination')).toHaveStyle(
      'color: rgb(255, 0, 0)',
    );
  });

  test('check that Pagination configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          pagination: {
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
          },
        }}
      >
        <Pagination
          currentPage={2}
          totalPages={8}
          setPage={() => null}
          data-testid="pagination"
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('pagination')).toHaveClass('cls');
    expect(screen.getByTestId('pagination')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );
  });
});
