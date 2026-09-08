import React, { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '../src/components';

describe('Pagination', () => {
  test('renders a labelled <nav>, forwarding className/style/ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Pagination
        ref={ref}
        currentPage={2}
        totalPages={5}
        onChange={() => {}}
        data-testid="pg"
        className="cls"
        style={{ color: 'rgb(255, 0, 0)' }}
      />,
    );

    const nav = screen.getByRole('navigation');
    expect(nav.tagName).toBe('NAV');
    expect(nav).toBe(ref.current);
    expect(nav).toBe(screen.getByTestId('pg'));
    expect(nav).toHaveClass('cls');
    expect(nav).toHaveStyle('color: rgb(255, 0, 0)');
    expect(nav).toHaveAccessibleName();
  });

  test('the current page carries aria-current; prev/first are disabled on page 1', () => {
    render(<Pagination currentPage={1} totalPages={5} onChange={() => {}} />);

    expect(screen.getByRole('button', { name: /page 1/i })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('button', { name: /page 2/i })).not.toHaveAttribute(
      'aria-current',
    );
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /first/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
  });

  test('next/last are disabled on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /last/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /previous/i })).not.toBeDisabled();
  });

  test('calls onChange with the target page and the event', () => {
    const onChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={10} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onChange).toHaveBeenLastCalledWith(4, expect.anything());

    fireEvent.click(screen.getByRole('button', { name: /page 2/i }));
    expect(onChange).toHaveBeenLastCalledWith(2, expect.anything());

    fireEvent.click(screen.getByRole('button', { name: /last/i }));
    expect(onChange).toHaveBeenLastCalledWith(10, expect.anything());
  });

  test('shows an ellipsis and keeps first/last visible for a wide range', () => {
    render(<Pagination currentPage={50} totalPages={100} onChange={() => {}} />);

    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /page 1$/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /page 100$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /page 49$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /page 51$/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /page 40$/i }),
    ).not.toBeInTheDocument();
  });

  test('siblings widens the window around the current page', () => {
    render(
      <Pagination
        currentPage={50}
        totalPages={100}
        siblings={3}
        onChange={() => {}}
      />,
    );
    expect(
      screen.getByRole('button', { name: /page 47$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /page 53$/i }),
    ).toBeInTheDocument();
  });

  test('showEdgeButtons={false} hides the first/last jump buttons', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        showEdgeButtons={false}
        onChange={() => {}}
      />,
    );
    expect(
      screen.queryByRole('button', { name: /first/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /last/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
  });
});
