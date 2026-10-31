import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tags } from '../src/components';

describe('Tags', () => {
  test('renders every item label inside the wrapper', () => {
    render(
      <Tags data-testid="tags">
        <Tags.Item label="React" />
        <Tags.Item label="TypeScript" />
      </Tags>,
    );

    const wrapper = screen.getByTestId('tags');
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  test('renders an <a> when href is given', () => {
    render(
      <Tags>
        <Tags.Item label="Docs" href="/tags/docs" />
      </Tags>,
    );

    const item = screen.getByText('Docs');
    expect(item.tagName).toBe('A');
    expect(item).toHaveAttribute('href', '/tags/docs');
  });

  test('a plain item is an inert span — no role, not focusable', () => {
    render(
      <Tags>
        <Tags.Item label="Keyword" />
      </Tags>,
    );

    const item = screen.getByText('Keyword');
    expect(item.tagName).toBe('SPAN');
    expect(item).not.toHaveAttribute('role');
    expect(item).not.toHaveAttribute('tabindex');
  });

  test('onClick makes the item a keyboard-operable button', () => {
    const onClick = vi.fn();
    render(
      <Tags>
        <Tags.Item label="Filter" onClick={onClick} />
      </Tags>,
    );

    const item = screen.getByRole('button', { name: 'Filter' });
    expect(item.tagName).toBe('SPAN');
    expect(item).toHaveAttribute('tabindex', '0');

    fireEvent.click(item);
    fireEvent.keyDown(item, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  test('asChild merges tag props onto the child element', () => {
    render(
      <Tags>
        <Tags.Item label="ignored" className="tag-cls" asChild>
          <a href="/x" data-testid="child" />
        </Tags.Item>
      </Tags>,
    );

    const child = screen.getByTestId('child');
    expect(child.tagName).toBe('A');
    expect(child).toHaveClass('tag-cls');
    expect(child).toHaveAttribute('href', '/x');
  });

  test('forwards className to the wrapper and the item', () => {
    render(
      <Tags data-testid="tags" className="wrap-cls">
        <Tags.Item data-testid="item" label="React" className="item-cls" />
      </Tags>,
    );

    expect(screen.getByTestId('tags')).toHaveClass('wrap-cls');
    expect(screen.getByTestId('item')).toHaveClass('item-cls');
  });
});
