import { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Flex } from '../src';

describe('Flex', () => {
  test('renders a div by default and swaps the element via tagName', () => {
    const { rerender } = render(
      <Flex data-testid="flex">
        <span>content</span>
      </Flex>,
    );

    expect(screen.getByTestId('flex').tagName).toBe('DIV');
    expect(screen.getByText('content')).toBeInTheDocument();

    rerender(
      <Flex tagName="ul" data-testid="flex">
        <li>content</li>
      </Flex>,
    );

    expect(screen.getByTestId('flex').tagName).toBe('UL');
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  test('maps the gap token to the inline gap value, defaulting to 0px', () => {
    const { rerender } = render(<Flex data-testid="flex" />);
    expect(screen.getByTestId('flex')).toHaveStyle('gap: 0px');

    rerender(<Flex gap="l" data-testid="flex" />);
    expect(screen.getByTestId('flex')).toHaveStyle('gap: var(--l-gap)');
  });

  test('merges consumer className and style alongside the computed gap', () => {
    render(
      <Flex
        className="cls"
        style={{ fontSize: '20px' }}
        gap="m"
        data-testid="flex"
      />,
    );

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveClass('cls');
    expect(flex).toHaveStyle({ fontSize: '20px', gap: 'var(--gap)' });
  });

  test('forwards arbitrary DOM props to the root element', () => {
    const onClick = vi.fn();
    render(<Flex data-testid="flex" aria-label="toolbar" onClick={onClick} />);

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveAttribute('aria-label', 'toolbar');

    fireEvent.click(flex);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('forwards ref to the root element', () => {
    const ref = createRef<HTMLElement>();
    render(<Flex ref={ref} data-testid="flex" />);

    expect(ref.current).toBe(screen.getByTestId('flex'));
  });
});
