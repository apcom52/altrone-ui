import type { ComponentProps } from 'react';
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

  test('asChild preserves native Enter activation on an anchor', () => {
    const onClick = vi.fn((event) => event.preventDefault());
    render(
      <NavigationList>
        <NavigationList.Link label="Home" asChild onClick={onClick}>
          <a href="/home" />
        </NavigationList.Link>
      </NavigationList>,
    );

    const link = screen.getByRole('link', { name: 'Home' });
    expect(fireEvent.keyDown(link, { key: 'Enter' })).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Space activates an asChild router link through a real click', () => {
    const navigate = vi.fn();
    const onClick = vi.fn();
    const RouterLink = ({
      to,
      onClick,
      ...props
    }: ComponentProps<'a'> & { to: string }) => (
      <a
        {...props}
        href={to}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) navigate(to);
          event.preventDefault();
        }}
      />
    );
    const { rerender } = render(
      <NavigationList>
        <NavigationList.Link label="Home" asChild onClick={onClick}>
          <RouterLink to="/home" />
        </NavigationList.Link>
      </NavigationList>,
    );
    const link = screen.getByRole('link', { name: 'Home' });
    expect(fireEvent.keyDown(link, { key: ' ' })).toBe(false);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/home');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0].nativeEvent).toBeInstanceOf(MouseEvent);

    rerender(
      <NavigationList>
        <NavigationList.Link
          label="Home"
          asChild
          onClick={(event) => event.preventDefault()}
        >
          <RouterLink to="/home" />
        </NavigationList.Link>
      </NavigationList>,
    );
    fireEvent.keyDown(link, { key: ' ' });
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  test.each(['Enter', ' '])('disabled asChild blocks %s activation', (key) => {
    const onClick = vi.fn();
    render(
      <NavigationList>
        <NavigationList.Link label="Home" asChild disabled onClick={onClick}>
          <a href="/home" />
        </NavigationList.Link>
      </NavigationList>,
    );
    const link = screen.getByRole('link', { name: 'Home' });
    expect(fireEvent.keyDown(link, { key })).toBe(false);
    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
    expect(link).toHaveAttribute('tabindex', '-1');
  });

  test('consumer keydown cancellation prevents synthesized activation', () => {
    const onClick = vi.fn();
    render(
      <NavigationList>
        <NavigationList.Link
          label="Home"
          asChild
          onClick={onClick}
          onKeyDown={(event) => event.preventDefault()}
        >
          <a href="/home" />
        </NavigationList.Link>
      </NavigationList>,
    );
    fireEvent.keyDown(screen.getByRole('link', { name: 'Home' }), { key: ' ' });
    expect(onClick).not.toHaveBeenCalled();
  });

  test.each(['Enter', ' '])(
    'asChild preserves native button activation with %s',
    (key) => {
      const onClick = vi.fn();
      render(
        <NavigationList>
          <NavigationList.Link label="Toggle" asChild onClick={onClick}>
            <button type="button" />
          </NavigationList.Link>
        </NavigationList>,
      );
      const button = screen.getByRole('button', { name: 'Toggle' });
      expect(fireEvent.keyDown(button, { key })).toBe(true);
      expect(onClick).not.toHaveBeenCalled();
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    },
  );

  test('a click inside actions does not trigger its parent Link', () => {
    const linkClick = vi.fn();
    const actionClick = vi.fn();
    render(
      <NavigationList>
        <NavigationList.Link
          href="#"
          label="Project"
          onClick={linkClick}
          data-testid="link"
          actions={<button onClick={actionClick} data-testid="action" />}
        />
      </NavigationList>,
    );

    fireEvent.click(screen.getByTestId('action'));
    expect(actionClick).toHaveBeenCalledTimes(1);
    expect(linkClick).not.toHaveBeenCalled();
  });

  test('actions receives selected/disabled as context when passed a function', () => {
    render(
      <NavigationList>
        <NavigationList.Link
          href="#"
          label="Project"
          selected
          actions={({ selected }) => (
            <span data-testid="action">{selected ? 'on' : 'off'}</span>
          )}
        />
      </NavigationList>,
    );

    expect(screen.getByTestId('action')).toHaveTextContent('on');
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
