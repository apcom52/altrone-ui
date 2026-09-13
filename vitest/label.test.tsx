import React, { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '../src/components';

describe('Label', () => {
  test('renders its children and forwards className/style/ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Label
        ref={ref}
        data-testid="l"
        className="cls"
        style={{ letterSpacing: '1px' }}
      >
        In review
      </Label>,
    );

    const el = screen.getByTestId('l');
    expect(el).toBe(ref.current);
    expect(el).toHaveTextContent('In review');
    expect(el).toHaveClass('cls');
    expect(el).toHaveStyle('letter-spacing: 1px');
  });

  test('color / variant / rounding / size map to modifier classes', () => {
    render(
      <Label
        data-testid="l"
        color="success"
        variant="soft"
        rounding="pill"
        size="l"
      >
        Done
      </Label>,
    );
    const cn = screen.getByTestId('l').className;
    expect(cn).toMatch(/Success/);
    expect(cn).toMatch(/Soft/);
    expect(cn).toMatch(/Pill/);
    expect(cn).toMatch(/Large/);
  });

  test('the default color applies no colour modifier class', () => {
    render(<Label data-testid="l">Neutral</Label>);
    const cn = screen.getByTestId('l').className;
    expect(cn).not.toMatch(/Primary|Success|Danger|Warning/);
  });
});
