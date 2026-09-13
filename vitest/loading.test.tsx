import React, { createRef } from 'react';
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
    circles.forEach((c) =>
      expect(c.getAttribute('stroke-width')).toBe('1.5'),
    );
  });

  test('the svg is sized from the size prop and hidden from AT', () => {
    const { container } = render(<Loading size="40px" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '40px');
    expect(svg).toHaveAttribute('viewBox', '0 0 40 40');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
