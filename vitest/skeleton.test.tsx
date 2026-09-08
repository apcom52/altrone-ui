import React, { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../src/components';

describe('Skeleton', () => {
  test('is a plain aria-hidden <div> by default, forwarding className/style/ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Skeleton
        ref={ref}
        data-testid="s"
        className="cls"
        style={{ opacity: 0.5 }}
        width="120px"
        height="16px"
        radius="4px"
      />,
    );

    const el = screen.getByTestId('s');
    expect(el.tagName).toBe('DIV');
    expect(el).toBe(ref.current);
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el).toHaveClass('cls');
    expect(el).toHaveStyle({
      width: '120px',
      height: '16px',
      borderRadius: '4px',
      opacity: '0.5',
    });
  });

  test('width/height also seed the min/max unless given explicitly', () => {
    render(<Skeleton data-testid="s" width="200px" minWidth="50px" />);
    const el = screen.getByTestId('s');
    expect(el).toHaveStyle({
      width: '200px',
      maxWidth: '200px',
      minWidth: '50px',
    });
  });
});
