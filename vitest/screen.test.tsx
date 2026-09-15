import React from 'react';
import { expect, test, describe, vi, afterEach } from 'vitest';
import { fireEvent, render, screen as testingScreen } from '@testing-library/react';
import { Screen, Toolbar } from '../src/components';

/** Forces `useBreakpoint()`'s `md` query to match, so `Screen.Sidebar` renders inline. */
const mockInlineSidebar = () => {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query) =>
      ({
        matches: query.includes('1024px'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );
};

describe('Screen', () => {
  afterEach(() => {
    /* Reset to the default matchMedia mock from vitest.setup.ts (every query unmatched). */
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as unknown as MediaQueryList,
    );
  });

  test('renders Content as a <main> with no other zones present', () => {
    render(
      <Screen>
        <Screen.Content data-testid="content">Hello</Screen.Content>
      </Screen>,
    );

    const content = testingScreen.getByTestId('content');
    expect(content.tagName).toBe('MAIN');
    expect(content).toHaveTextContent('Hello');
  });

  test('renders each zone with its semantic tag when composed together', () => {
    render(
      <Screen>
        <Screen.Sidebar data-testid="sidebar">Sidebar</Screen.Sidebar>
        <Screen.Header data-testid="header">Header</Screen.Header>
        <Screen.Content data-testid="content">Content</Screen.Content>
        <Screen.Footer data-testid="footer">Footer</Screen.Footer>
      </Screen>,
    );

    expect(testingScreen.getByTestId('sidebar').tagName).toBe('ASIDE');
    expect(testingScreen.getByTestId('header').tagName).toBe('HEADER');
    expect(testingScreen.getByTestId('content').tagName).toBe('MAIN');
    expect(testingScreen.getByTestId('footer').tagName).toBe('FOOTER');
  });

  test('a zone that is not rendered by the consumer is simply absent', () => {
    render(
      <Screen>
        <Screen.Content>Content</Screen.Content>
      </Screen>,
    );

    expect(testingScreen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  test('title labels the root as a region', () => {
    render(
      <Screen title="Billing">
        <Screen.Content>Content</Screen.Content>
      </Screen>,
    );

    expect(
      testingScreen.getByRole('region', { name: 'Billing' }),
    ).toBeInTheDocument();
  });

  test('contentAlign="center" adds the centering modifier class', () => {
    const { container } = render(
      <Screen contentAlign="center">
        <Screen.Content>Content</Screen.Content>
      </Screen>,
    );

    expect(
      container.querySelector('[class*="ContentCenter"]'),
    ).toBeInTheDocument();
  });

  test('renders Screen.BottomNavigation as a <nav>', () => {
    render(
      <Screen>
        <Screen.Content>Content</Screen.Content>
        <Screen.BottomNavigation data-testid="bottom-nav">
          Tabs
        </Screen.BottomNavigation>
      </Screen>,
    );

    expect(testingScreen.getByTestId('bottom-nav').tagName).toBe('NAV');
  });

  test('a zone gated by visibleFrom renders nothing below that breakpoint', () => {
    /* jsdom's matchMedia mock reports every breakpoint as unmatched. */
    render(
      <Screen>
        <Screen.Sidebar data-testid="sidebar" visibleFrom="lg">
          Nav
        </Screen.Sidebar>
        <Screen.Content>Content</Screen.Content>
      </Screen>,
    );

    expect(testingScreen.queryByTestId('sidebar')).not.toBeInTheDocument();
  });

  test('collapsing the Sidebar marks the <aside> inert', () => {
    /* Inline mode: an uncontrolled sidebar auto-hides in overlay mode (see the
       describe block below), which would make the first assertion moot. */
    mockInlineSidebar();
    const { rerender } = render(
      <Screen>
        <Screen.Sidebar data-testid="sidebar">
          <button type="button">Nav item</button>
        </Screen.Sidebar>
        <Screen.Content>Content</Screen.Content>
      </Screen>,
    );

    expect(testingScreen.getByTestId('sidebar')).not.toHaveAttribute('inert');

    rerender(
      <Screen>
        <Screen.Sidebar data-testid="sidebar" collapsed>
          <button type="button">Nav item</button>
        </Screen.Sidebar>
        <Screen.Content>Content</Screen.Content>
      </Screen>,
    );

    expect(testingScreen.getByTestId('sidebar')).toHaveAttribute('inert');
  });

  describe('uncontrolled Sidebar/Aside + SidebarToggleAction', () => {
    test('Sidebar.defaultCollapsed seeds the uncontrolled state (inline)', () => {
      mockInlineSidebar();
      render(
        <Screen>
          <Screen.Sidebar data-testid="sidebar" defaultCollapsed>
            Nav
          </Screen.Sidebar>
          <Screen.Content>Content</Screen.Content>
        </Screen>,
      );

      expect(testingScreen.getByTestId('sidebar')).toHaveAttribute('inert');
    });

    test('Aside.defaultCollapsed seeds the uncontrolled state', () => {
      render(
        <Screen>
          <Screen.Content>Content</Screen.Content>
          <Screen.Aside data-testid="aside" defaultCollapsed>
            Details
          </Screen.Aside>
        </Screen>,
      );

      expect(testingScreen.getByTestId('aside')).toHaveAttribute('inert');
    });

    test('an uncontrolled SidebarToggleAction reads and toggles Screen.Sidebar via context', () => {
      mockInlineSidebar();
      render(
        <Screen>
          <Screen.Header>
            <Toolbar>
              <Toolbar.SidebarToggleAction />
            </Toolbar>
          </Screen.Header>
          <Screen.Sidebar data-testid="sidebar">Nav</Screen.Sidebar>
          <Screen.Content>Content</Screen.Content>
        </Screen>,
      );

      expect(testingScreen.getByTestId('sidebar')).not.toHaveAttribute('inert');
      expect(
        testingScreen.getByRole('button', { name: 'Collapse sidebar' }),
      ).toBeInTheDocument();

      fireEvent.click(testingScreen.getByRole('button'));

      expect(testingScreen.getByTestId('sidebar')).toHaveAttribute('inert');
      expect(
        testingScreen.getByRole('button', { name: 'Expand sidebar' }),
      ).toBeInTheDocument();
    });

    test('a controlled SidebarToggleAction ignores context and calls its own onClick', () => {
      mockInlineSidebar();
      const onClick = vi.fn();
      render(
        <Screen>
          <Screen.Header>
            <Toolbar>
              <Toolbar.SidebarToggleAction collapsed={false} onClick={onClick} />
            </Toolbar>
          </Screen.Header>
          <Screen.Sidebar data-testid="sidebar">Nav</Screen.Sidebar>
          <Screen.Content>Content</Screen.Content>
        </Screen>,
      );

      fireEvent.click(testingScreen.getByRole('button'));

      expect(onClick).toHaveBeenCalledOnce();
      // controlled at `false` and the consumer's onClick doesn't flip it — stays open
      expect(testingScreen.getByTestId('sidebar')).not.toHaveAttribute('inert');
    });
  });
});
