import React, { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Tabs', () => {
  test('the tablist forwards className/style/ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Tabs
        ref={ref}
        data-testid="tabs"
        className="cls"
        style={{ color: 'rgb(255, 0, 0)' }}
      >
        <Tabs.Item label="One" selected />
        <Tabs.Item label="Two" />
      </Tabs>,
    );

    const list = screen.getByRole('tablist');
    expect(list).toBe(ref.current);
    expect(list).toBe(screen.getByTestId('tabs'));
    expect(list).toHaveClass('cls');
    expect(list).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('an item is a <button role="tab"> by default, an <a> when href is given', () => {
    render(
      <Tabs>
        <Tabs.Item label="Button tab" selected />
        <Tabs.Item label="Link tab" href="/section" />
      </Tabs>,
    );

    const btn = screen.getByRole('tab', { name: 'Button tab' });
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn).toHaveAttribute('aria-selected', 'true');
    expect(btn).toHaveAttribute('tabindex', '0');

    const link = screen.getByRole('tab', { name: 'Link tab' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/section');
    expect(link).toHaveAttribute('tabindex', '-1');
  });

  test('clicking a tab fires its onClick', () => {
    const onClick = vi.fn();
    render(
      <Tabs>
        <Tabs.Item label="One" selected />
        <Tabs.Item label="Two" onClick={onClick} />
      </Tabs>,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('ArrowRight / Home move focus between tabs', () => {
    render(
      <Tabs>
        <Tabs.Item label="One" selected />
        <Tabs.Item label="Two" />
        <Tabs.Item label="Three" />
      </Tabs>,
    );

    const [one, two, three] = screen.getAllByRole('tab');
    one.focus();
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(two).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'End' });
    expect(three).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'Home' });
    expect(one).toHaveFocus();
  });

  test('a disabled tab is skipped by keyboard navigation and not clickable', () => {
    const onClick = vi.fn();
    render(
      <Tabs>
        <Tabs.Item label="One" selected />
        <Tabs.Item label="Two" disabled onClick={onClick} />
        <Tabs.Item label="Three" />
      </Tabs>,
    );

    const [one, two, three] = screen.getAllByRole('tab');
    expect(two).toBeDisabled();

    one.focus();
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(three).toHaveFocus();

    fireEvent.click(two);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('renders the badge content', () => {
    render(
      <Tabs>
        <Tabs.Item label="Inbox" badge={5} selected />
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: /Inbox/ })).toHaveTextContent('5');
  });

  test('asChild merges the tab onto a custom element', () => {
    render(
      <Tabs>
        <Tabs.Item label="Custom" selected asChild>
          <div data-testid="custom" />
        </Tabs.Item>
      </Tabs>,
    );

    const custom = screen.getByTestId('custom');
    expect(custom).toHaveAttribute('role', 'tab');
    expect(custom).toHaveAttribute('aria-selected', 'true');
  });
});
