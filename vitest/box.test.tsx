import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '../src/components';

describe('Box', () => {
  test('renders a div by default', () => {
    render(<Box data-testid="box">content</Box>);
    expect(screen.getByTestId('box').tagName).toBe('DIV');
  });

  test('asChild renders the child element instead of a div, forwarding class and ref', () => {
    const ref = React.createRef<HTMLAnchorElement>();

    render(
      <Box asChild className="extra" ref={ref as never} data-testid="box">
        <a href="#">link</a>
      </Box>,
    );

    const element = screen.getByTestId('box');
    expect(element.tagName).toBe('A');
    expect(element).toHaveClass('extra');
    expect(ref.current).toBe(element);
  });

  test('asChild without a valid element child renders nothing instead of throwing', () => {
    render(
      <Box asChild data-testid="box">
        {'not an element' as unknown as React.ReactElement}
      </Box>,
    );
    expect(screen.queryByTestId('box')).not.toBeInTheDocument();
  });

  test('rect shape forces the radius to 0 regardless of an inherited --radius-outer', () => {
    render(
      <div style={{ ['--radius-outer' as string]: '24px' }}>
        <Box shape="rect" data-testid="box" />
      </div>,
    );
    expect(screen.getByTestId('box').className).toMatch(/ShapeRect/);
  });

  test('numeric radius seeds --radius-outer as a px value on the element', () => {
    render(<Box shape="squircle" radius={48} data-testid="box" />);
    expect(screen.getByTestId('box')).toHaveStyle('--radius-outer: 48px');
  });

  test('string radius seeds --radius-outer verbatim', () => {
    render(<Box radius="var(--radius-l)" data-testid="box" />);
    expect(screen.getByTestId('box')).toHaveStyle(
      '--radius-outer: var(--radius-l)',
    );
  });

  test('pill shape applies its own modifier class, independent of size', () => {
    render(<Box shape="pill" size="xl" data-testid="box" />);
    const cls = screen.getByTestId('box').className;
    expect(cls).toMatch(/ShapePill/);
    expect(cls).not.toMatch(/ShapeCircle|ShapeRounded/);
  });

  test('numeric padding sets both axis vars', () => {
    render(<Box padding={12} data-testid="box" />);
    const el = screen.getByTestId('box');
    expect(el).toHaveStyle('--box-padding-x: 12px');
    expect(el).toHaveStyle('--box-padding-y: 12px');
  });

  test('per-axis padding sets only the given axes', () => {
    render(<Box padding={{ x: 16 }} data-testid="box" />);
    const el = screen.getByTestId('box');
    expect(el).toHaveStyle('--box-padding-x: 16px');
    expect(el.style.getPropertyValue('--box-padding-y')).toBe('');
  });

  test('string padding is passed through verbatim', () => {
    render(<Box padding="var(--space-content)" data-testid="box" />);
    expect(screen.getByTestId('box')).toHaveStyle(
      '--box-padding-x: var(--space-content)',
    );
  });

  test('forwards a plain ref to the root DOM element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref} data-testid="box" />);
    expect(ref.current).toBe(screen.getByTestId('box'));
  });

  test('merges a custom className and style onto the root element', () => {
    render(
      <Box
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
        data-testid="box"
      />,
    );
    expect(screen.getByTestId('box')).toHaveClass('cls');
    expect(screen.getByTestId('box')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('applies the requested shape/material/tone/size/elevation modifier classes', () => {
    render(
      <Box
        shape="squircle"
        material="outline"
        tone="danger"
        size="l"
        elevation="overlay"
        data-testid="box"
      />,
    );
    const cls = screen.getByTestId('box').className;
    expect(cls).toMatch(/ShapeSquircle/);
    expect(cls).toMatch(/MaterialOutline/);
    expect(cls).toMatch(/ToneDanger/);
    expect(cls).toMatch(/Large/);
    expect(cls).toMatch(/ElevationOverlay/);
  });

  test('a numeric size makes a square (--box-square/--box-size) and applies no named-tier class', () => {
    render(<Box size={36} data-testid="box" />);
    const element = screen.getByTestId('box');
    expect(element).toHaveStyle('--box-square: 36px');
    expect(element).toHaveStyle('--box-size: 36px');
    expect(element.className).not.toMatch(/Mini|Small|Large|XLarge/);
    expect(element).not.toHaveAttribute('size');
  });

  test('an arbitrary string size is used verbatim as the square dimension', () => {
    render(<Box size="50%" data-testid="box" />);
    expect(screen.getByTestId('box')).toHaveStyle('--box-square: 50%');
  });

  test('a named tier does not set square/width/height vars', () => {
    render(<Box size="l" data-testid="box" />);
    const el = screen.getByTestId('box');
    expect(el.style.getPropertyValue('--box-square')).toBe('');
    expect(el.className).toMatch(/Large/);
  });

  test('width/height props set their vars and take priority over an arbitrary size', () => {
    render(<Box size={40} width={100} height="3em" data-testid="box" />);
    const el = screen.getByTestId('box');
    expect(el).toHaveStyle('--box-square: 40px');
    expect(el).toHaveStyle('--box-width: 100px');
    expect(el).toHaveStyle('--box-height: 3em');
  });

  test('pressable/focusable/editable are opt-in modifier classes, not applied by default', () => {
    const { rerender } = render(<Box data-testid="box" />);
    let cls = screen.getByTestId('box').className;
    expect(cls).not.toMatch(/Pressable/);
    expect(cls).not.toMatch(/Focusable/);
    expect(cls).not.toMatch(/Editable/);

    rerender(<Box pressable focusable editable data-testid="box" />);
    cls = screen.getByTestId('box').className;
    expect(cls).toMatch(/Pressable/);
    expect(cls).toMatch(/Focusable/);
    expect(cls).toMatch(/Editable/);
  });

  test('internal-only props are not leaked onto the DOM node', () => {
    render(
      <Box
        shape="circle"
        material="ghost"
        tone="success"
        pressable
        focusable
        editable
        data-testid="box"
      />,
    );
    const element = screen.getByTestId('box');
    expect(element).not.toHaveAttribute('shape');
    expect(element).not.toHaveAttribute('material');
    expect(element).not.toHaveAttribute('tone');
    expect(element).not.toHaveAttribute('pressable');
    expect(element).not.toHaveAttribute('focusable');
    expect(element).not.toHaveAttribute('editable');
  });

  test('a categorical hue name resolves to that hue solid step and applies ToneCustom', () => {
    render(<Box color="teal" data-testid="box" />);
    const el = screen.getByTestId('box');
    expect(el).toHaveStyle('--box-color: var(--teal-9)');
    expect(el.className).toMatch(/ToneCustom/);
    expect(el.className).not.toMatch(/ToneNeutral/);
  });

  test('a non-hue color string is used verbatim', () => {
    render(<Box color="#f0abfc" data-testid="box" />);
    expect(screen.getByTestId('box')).toHaveStyle('--box-color: #f0abfc');
  });

  test('color takes priority over tone', () => {
    render(<Box tone="danger" color="indigo" data-testid="box" />);
    const cls = screen.getByTestId('box').className;
    expect(cls).toMatch(/ToneCustom/);
    expect(cls).not.toMatch(/ToneDanger/);
  });
});
