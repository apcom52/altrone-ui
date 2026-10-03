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

  test('color / variant / shape / size map to modifier classes', () => {
    render(
      <Label
        data-testid="l"
        color="success"
        variant="soft"
        shape="pill"
        size="l"
      >
        Done
      </Label>,
    );
    const cn = screen.getByTestId('l').className;
    expect(cn).toMatch(/Success/);
    expect(cn).toMatch(/Pale/);
    expect(cn).toMatch(/Pill/);
    expect(cn).toMatch(/Large/);
  });

  test('the default color applies no colour modifier class', () => {
    render(<Label data-testid="l">Neutral</Label>);
    const cn = screen.getByTestId('l').className;
    expect(cn).not.toMatch(/Primary|Success|Danger|Warning/);
  });

  test('an icon renders before children for non-status variants', () => {
    render(
      <Label icon={<svg data-testid="icon" />} variant="soft">
        Verified
      </Label>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('variant="status" renders a dot even without an icon', () => {
    render(<Label data-testid="l" variant="status">Queued</Label>);
    const el = screen.getByTestId('l');
    expect(el.querySelector('svg')).toBeNull();
    expect(el.firstElementChild?.tagName).toBe('SPAN');
  });

  test('variant="status" renders the icon inside the dot, not as a separate leading icon', () => {
    const { container } = render(
      <Label variant="status" icon={<svg data-testid="icon" />}>
        Completed
      </Label>,
    );
    const icon = screen.getByTestId('icon');
    expect(icon.parentElement?.tagName).toBe('SPAN');
    expect(container.querySelectorAll('svg').length).toBe(1);
  });
});
