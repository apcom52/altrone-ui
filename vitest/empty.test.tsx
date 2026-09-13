import React, { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Empty } from '../src/components';

describe('Empty', () => {
  test('default: role="status" and the localized "No data" heading', () => {
    render(<Empty data-testid="e" />);
    const el = screen.getByTestId('e');
    expect(el).toHaveAttribute('role', 'status');
    expect(el).toHaveTextContent('No data');
  });

  test('a lone description/children line is promoted to the heading', () => {
    const { rerender } = render(<Empty data-testid="e">Nothing here yet</Empty>);
    expect(screen.getByTestId('e')).toHaveTextContent('Nothing here yet');
    expect(screen.getByTestId('e')).not.toHaveTextContent('No data');

    rerender(<Empty data-testid="e" description="Also nothing" />);
    expect(screen.getByTestId('e')).toHaveTextContent('Also nothing');
  });

  test('an explicit title keeps children/description as the second line', () => {
    render(
      <Empty title="No projects">Create one to get started</Empty>,
    );
    expect(screen.getByText('No projects')).toBeInTheDocument();
    expect(screen.getByText('Create one to get started')).toBeInTheDocument();
  });

  test('renders a custom icon and an actions row', () => {
    render(
      <Empty
        data-testid="e"
        icon={<svg data-testid="icon" />}
        title="Empty"
        actions={<button>Do a thing</button>}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Do a thing' }),
    ).toBeInTheDocument();
  });

  test('size applies a modifier class', () => {
    const { rerender } = render(<Empty data-testid="e" size="s" />);
    expect(screen.getByTestId('e').className).toMatch(/Small/);
    rerender(<Empty data-testid="e" size="l" />);
    expect(screen.getByTestId('e').className).toMatch(/Large/);
    rerender(<Empty data-testid="e" />);
    expect(screen.getByTestId('e').className).not.toMatch(/Small|Large/);
  });

  test('forwards className / style / ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Empty
        ref={ref}
        data-testid="e"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      />,
    );
    const el = screen.getByTestId('e');
    expect(el).toBe(ref.current);
    expect(el).toHaveClass('cls');
    expect(el).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
