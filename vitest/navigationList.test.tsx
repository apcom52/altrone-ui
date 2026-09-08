import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationList } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('NavigationList', () => {
  test('renders a <nav> and forwards className/style', () => {
    render(
      <NavigationList
        data-testid="list"
        className="cls"
        style={{ color: 'rgb(255, 0, 0)' }}
      >
        <NavigationList.Link href="#" label="Home" />
      </NavigationList>,
    );

    const nav = screen.getByTestId('list');
    expect(nav.tagName).toBe('NAV');
    expect(nav).toHaveClass('cls');
    expect(nav).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('Group exposes its title as an accessible group', () => {
    render(
      <NavigationList>
        <NavigationList.Group title="Projects" data-testid="group">
          <NavigationList.Link href="#" label="Alpha" />
        </NavigationList.Group>
      </NavigationList>,
    );

    expect(screen.getByRole('group', { name: 'Projects' })).toBe(
      screen.getByTestId('group'),
    );
  });

  test('Link renders an anchor and marks the selected item with aria-current', () => {
    render(
      <NavigationList>
        <NavigationList.Link href="/home" label="Home" data-testid="home" />
        <NavigationList.Link
          href="/inbox"
          label="Inbox"
          selected
          data-testid="inbox"
        />
      </NavigationList>,
    );

    expect(screen.getByTestId('home').tagName).toBe('A');
    expect(screen.getByTestId('home')).not.toHaveAttribute('aria-current');
    expect(screen.getByTestId('inbox')).toHaveAttribute('aria-current', 'page');
  });

  test('a disabled Link drops its href, is not tabbable, and swallows clicks', () => {
    const onClick = vi.fn();
    render(
      <NavigationList>
        <NavigationList.Link
          href="/reports"
          label="Reports"
          disabled
          onClick={onClick}
          data-testid="link"
        />
      </NavigationList>,
    );

    const link = screen.getByTestId('link');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');

    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('an hrefless Link is keyboard-activatable via Enter', () => {
    const onClick = vi.fn();
    render(
      <NavigationList>
        <NavigationList.Link
          label="Toggle"
          onClick={onClick}
          data-testid="link"
        />
      </NavigationList>,
    );

    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('tabindex', '0');

    fireEvent.keyDown(link, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('LinkAction does not trigger its parent Link', () => {
    const linkClick = vi.fn();
    const actionClick = vi.fn();
    render(
      <NavigationList>
        <NavigationList.Link
          href="#"
          label="Project"
          onClick={linkClick}
          data-testid="link"
        >
          <NavigationList.LinkAction
            label="Archive"
            icon={<span />}
            onClick={actionClick}
            data-testid="action"
          />
        </NavigationList.Link>
      </NavigationList>,
    );

    fireEvent.click(screen.getByTestId('action'));
    expect(actionClick).toHaveBeenCalledTimes(1);
    expect(linkClick).not.toHaveBeenCalled();
  });

  test('nested links are revealed only when the parent is selected', () => {
    const { rerender } = render(
      <NavigationList>
        <NavigationList.Link href="#" label="Engineering" data-testid="parent">
          <NavigationList.Link href="#" label="Frontend" />
        </NavigationList.Link>
      </NavigationList>,
    );

    expect(screen.queryByText('Frontend')).not.toBeInTheDocument();

    rerender(
      <NavigationList>
        <NavigationList.Link
          href="#"
          label="Engineering"
          selected
          data-testid="parent"
        >
          <NavigationList.Link href="#" label="Frontend" />
        </NavigationList.Link>
      </NavigationList>,
    );

    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });
});
