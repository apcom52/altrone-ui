import { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from '../src/components';

describe('Loading', () => {
  test('renders role="status" with a default accessible name; forwards className/style/ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Loading
        ref={ref}
        data-testid="l"
        className="cls"
        style={{ fontSize: '18px' }}
      />,
    );

    const el = screen.getByRole('status');
    expect(el).toBe(ref.current);
    expect(el).toBe(screen.getByTestId('l'));
    expect(el).toHaveClass('cls');
    expect(el).toHaveStyle('font-size: 18px');
    expect(el).toHaveAccessibleName();
  });

  test('a custom aria-label overrides the default', () => {
    render(<Loading aria-label="Saving changes" />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Saving changes');
  });

  test('stroke width is emitted without a doubled unit', () => {
    const { container } = render(<Loading size="32px" strokeWidth="1.5" />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(2);
    circles.forEach((c) => expect(c.getAttribute('stroke-width')).toBe('1.5'));
  });

  test('the svg is sized from the size prop and hidden from AT', () => {
    const { container } = render(<Loading size="40px" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '40px');
    expect(svg).toHaveAttribute('viewBox', '0 0 40 40');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  test('a value switches it to a determinate progressbar with matching aria attrs', () => {
    render(<Loading value={42} />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-valuenow', '42');
    expect(el).toHaveAttribute('aria-valuemin', '0');
    expect(el).toHaveAttribute('aria-valuemax', '100');
  });

  test('an out-of-range value is clamped to 0–100', () => {
    const { rerender, container } = render(<Loading value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
    const [, activeCircle] = container.querySelectorAll('circle');
    expect(activeCircle).toHaveStyle('stroke-dasharray: 100, 100');

    rerender(<Loading value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });

  test('style.color applies when no color prop is given', () => {
    render(<Loading style={{ color: 'red' }} />);
    expect(screen.getByRole('status').style.color).toBe('red');
  });

  test('a non-px size still draws a visible circle', () => {
    const { container } = render(<Loading size="2rem" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('width', '2rem');
    expect(
      Number(container.querySelector('circle')!.getAttribute('r')),
    ).toBeGreaterThan(0);
  });

  test('NaN value falls back to the indeterminate spinner', () => {
    render(<Loading value={NaN} />);
    expect(screen.getByRole('status')).not.toHaveAttribute('aria-valuenow');
  });
});
