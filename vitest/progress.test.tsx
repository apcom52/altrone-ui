import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from '../src/components';

describe('Progress', () => {
  test('defaults the label to the rounded fill percentage', () => {
    render(<Progress data-testid="progress" value={15} max={30} />);

    const bar = screen.getByTestId('progress');
    expect(bar).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(bar).toHaveAttribute('role', 'progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '15');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '30');
  });

  test('renders a string label and a render-function label', () => {
    render(
      <>
        <Progress value={15} max={100}>
          Uploading
        </Progress>
        <Progress value={15} min={5} max={25}>
          {({ value, min, max, percentage }) => (
            <span>{`${value}-${min}-${max}-${percentage}`}</span>
          )}
        </Progress>
      </>,
    );

    expect(screen.getByText('Uploading')).toBeInTheDocument();
    /* (15 - 5) / (25 - 5) = 50% */
    expect(screen.getByText('15-5-25-50')).toBeInTheDocument();
  });

  test('a string label becomes the accessible name', () => {
    render(
      <Progress data-testid="progress" value={40}>
        Downloading update
      </Progress>,
    );

    expect(screen.getByTestId('progress')).toHaveAttribute(
      'aria-label',
      'Downloading update',
    );
  });

  test('respects a non-zero min for the fill and ARIA', () => {
    render(<Progress data-testid="progress" value={150} min={100} max={200} />);

    const bar = screen.getByTestId('progress');
    expect(bar).toHaveAttribute('aria-valuemin', '100');
    expect(bar).toHaveAttribute('aria-valuenow', '150');
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('clamps an out-of-range value in the label and aria-valuenow', () => {
    render(<Progress data-testid="progress" value={250} max={100} />);

    const bar = screen.getByTestId('progress');
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuenow', '100');
  });

  test('does not divide by zero when min === max', () => {
    render(<Progress data-testid="progress" value={5} min={10} max={10} />);

    /* span collapses to 0 — guard keeps the percentage a real number (0). */
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  test('applies custom className and forwards arbitrary props', () => {
    render(
      <Progress
        data-testid="progress"
        value={10}
        className="cls"
        id="my-progress"
      />,
    );

    const bar = screen.getByTestId('progress');
    expect(bar).toHaveClass('cls');
    expect(bar.id).toBe('my-progress');
  });
});
