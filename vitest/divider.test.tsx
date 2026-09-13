import React, { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from '../src/components';

describe('Divider', () => {
  test('renders an <hr>, forwarding className/style/ref', () => {
    const ref = createRef<HTMLHRElement>();
    render(
      <Divider
        ref={ref}
        data-testid="d"
        className="cls"
        style={{ color: 'rgb(255, 0, 0)' }}
      />,
    );

    const hr = screen.getByTestId('d');
    expect(hr.tagName).toBe('HR');
    expect(hr).toBe(ref.current);
    expect(hr).toHaveClass('cls');
    expect(hr).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('horizontal is the default — no explicit orientation', () => {
    render(<Divider data-testid="d" />);
    expect(screen.getByTestId('d')).not.toHaveAttribute('aria-orientation');
  });

  test('direction="vertical" sets the class and aria-orientation', () => {
    render(<Divider direction="vertical" data-testid="d" />);
    const hr = screen.getByTestId('d');
    expect(hr.className).toMatch(/Vertical/);
    expect(hr).toHaveAttribute('aria-orientation', 'vertical');
  });
});
