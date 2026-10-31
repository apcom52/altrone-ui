import { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CollapsedList } from '../src';

const items = (n: number) =>
  Array.from({ length: n }, (_, i) => <div key={i}>item {i + 1}</div>);

describe('CollapsedList', () => {
  test('shows only the first `limit` items and hides the rest', () => {
    render(<CollapsedList limit={3}>{items(6)}</CollapsedList>);

    expect(screen.getByText('item 3')).toBeInTheDocument();
    expect(screen.queryByText('item 4')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Show 3 hidden/ }),
    ).toBeInTheDocument();
  });

  test('expanding reveals every item and turns the toggle into a collapse control', () => {
    render(<CollapsedList limit={3}>{items(6)}</CollapsedList>);

    fireEvent.click(screen.getByRole('button', { name: /Show 3 hidden/ }));

    expect(screen.getByText('item 6')).toBeInTheDocument();
    const collapse = screen.getByRole('button', { name: /Show less/ });

    fireEvent.click(collapse);
    expect(screen.queryByText('item 4')).not.toBeInTheDocument();
  });

  test('hideExpandButtonAfterUsage removes the toggle once expanded', () => {
    render(
      <CollapsedList limit={3} hideExpandButtonAfterUsage>
        {items(6)}
      </CollapsedList>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Show 3 hidden/ }));

    expect(screen.getByText('item 6')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('renders no toggle when the item count fits within `limit`', () => {
    render(<CollapsedList limit={5}>{items(3)}</CollapsedList>);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('limit={0} hides every item and counts them all as hidden', () => {
    render(<CollapsedList limit={0}>{items(4)}</CollapsedList>);

    expect(screen.queryByText('item 1')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Show 4 hidden/ }),
    ).toBeInTheDocument();
  });

  test('expandButtonLabel as a string overrides the default label', () => {
    render(
      <CollapsedList limit={2} expandButtonLabel="Show everything">
        {items(5)}
      </CollapsedList>,
    );

    expect(
      screen.getByRole('button', { name: 'Show everything' }),
    ).toBeInTheDocument();
  });

  test('expandButtonLabel as a function receives the list context', () => {
    render(
      <CollapsedList
        limit={2}
        expandButtonLabel={({ hiddenItems, totalItems, expanded }) =>
          expanded ? 'Less' : `${hiddenItems} of ${totalItems} more`
        }
      >
        {items(5)}
      </CollapsedList>,
    );

    expect(
      screen.getByRole('button', { name: '3 of 5 more' }),
    ).toBeInTheDocument();
  });

  test('forwards className, style and ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <CollapsedList
        ref={ref}
        data-testid="list"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      >
        {items(2)}
      </CollapsedList>,
    );

    const root = screen.getByTestId('list');
    expect(root).toHaveClass('cls');
    expect(root).toHaveStyle('color: rgb(0, 0, 255)');
    expect(ref.current).toBe(root);
  });
});
