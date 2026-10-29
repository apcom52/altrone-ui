import React from 'react';
import { expect, test, describe, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Scrollable } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Scrollable', () => {
  test('renders its children', () => {
    render(<Scrollable>scroll content</Scrollable>);

    expect(screen.getByText('scroll content')).toBeInTheDocument();
  });

  test('className, style and ref all resolve to the wrapper element', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Scrollable
        ref={ref}
        data-testid="scroll"
        className="cls"
        style={{ fontSize: '18px' }}
      >
        scroll content
      </Scrollable>,
    );

    const wrapper = screen.getByTestId('scroll');
    expect(wrapper).toHaveClass('cls');
    expect(wrapper).toHaveStyle('font-size: 18px');
    expect(ref.current).toBe(wrapper);
  });

  test('maxHeight caps the box and drops the parent-filling height', () => {
    render(
      <Scrollable maxHeight={200} data-testid="scroll">
        scroll content
      </Scrollable>,
    );

    expect(screen.getByTestId('scroll')).toHaveStyle({
      maxHeight: '200px',
      height: 'auto',
    });
  });
});
