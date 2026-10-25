import { createRef } from 'react';
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

  test('keeps its own class next to a consumer className', () => {
    render(<Skeleton data-testid="s" className="cls" />);
    expect(screen.getByTestId('s').className).toMatch(/Skeleton/);
  });

  test('maxWidth caps an explicit width', () => {
    render(<Skeleton data-testid="s" width="100%" maxWidth="320px" />);
    const el = screen.getByTestId('s');
    expect(el.style.minWidth).toBe('');
    expect(el).toHaveStyle({ maxWidth: '320px' });
  });

  test('falls back to one text line only when height is omitted', () => {
    render(
      <>
        <Skeleton data-testid="auto" />
        <Skeleton data-testid="bar" height={4} />
      </>,
    );
    expect(screen.getByTestId('auto').style.minHeight).toBe('1lh');
    expect(screen.getByTestId('bar').style.minHeight).toBe('');
    expect(screen.getByTestId('bar')).toHaveStyle({ height: '4px' });
  });
});
