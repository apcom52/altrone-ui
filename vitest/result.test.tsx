import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Result } from '../src/components';

describe('Result', () => {
  test('default: role="status" and the localized "No data" heading', () => {
    render(<Result data-testid="result" />);
    const el = screen.getByTestId('result');

    expect(el).toHaveAttribute('role', 'status');
    expect(el).toHaveTextContent('No data');
  });

  test('a lone children line is promoted to the heading', () => {
    render(<Result>Nothing here yet</Result>);

    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
    expect(screen.queryByText('No data')).toBeNull();
  });

  test('an explicit title keeps children as the second line', () => {
    render(<Result title="No projects">Create one to get started</Result>);

    expect(screen.getByText('No projects')).toBeInTheDocument();
    expect(screen.getByText('Create one to get started')).toBeInTheDocument();
  });

  test('status="error" renders role="alert"', () => {
    render(<Result data-testid="result" status="error" title="Failed" />);

    expect(screen.getByTestId('result')).toHaveAttribute('role', 'alert');
  });
});
