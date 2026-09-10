import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen as testingScreen } from '@testing-library/react';
import { Screen } from '../src/components';

describe('Screen', () => {
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
});
