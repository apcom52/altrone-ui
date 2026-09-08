import React, { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SideNavigation } from '../src/components';

class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

beforeAll(() => {
  // @ts-ignore
  window.IntersectionObserver = IntersectionObserver;
});

describe('SideNavigation', () => {
  test('renders a <nav> labelled by its title, and forwards className/style/ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <SideNavigation
        ref={ref}
        title="On this page"
        data-testid="nav"
        className="cls"
        style={{ color: 'rgb(255, 0, 0)' }}
      >
        <SideNavigation.Item href="#a" label="Section A" />
      </SideNavigation>,
    );

    const nav = screen.getByTestId('nav');
    expect(nav.tagName).toBe('NAV');
    expect(nav).toBe(ref.current);
    expect(nav).toHaveClass('cls');
    expect(nav).toHaveStyle('color: rgb(255, 0, 0)');
    // labelled by the visible title
    expect(nav).toHaveAccessibleName('On this page');
  });

  test('an Item is an <li> containing an anchor to its href', () => {
    const ref = createRef<HTMLLIElement>();
    render(
      <SideNavigation>
        <SideNavigation.Item
          ref={ref}
          href="#overview"
          label="Overview"
          className="item-cls"
        />
      </SideNavigation>,
    );

    const link = screen.getByRole('link', { name: 'Overview' });
    expect(link).toHaveAttribute('href', '#overview');

    const li = ref.current!;
    expect(li.tagName).toBe('LI');
    expect(li).toHaveClass('item-cls');
    expect(li).toContainElement(link);
  });

  test('nested items render inside a child list', () => {
    render(
      <SideNavigation>
        <SideNavigation.Item href="#guide" label="Guide">
          <SideNavigation.Item href="#install" label="Installation" />
          <SideNavigation.Item href="#config" label="Configuration" />
        </SideNavigation.Item>
      </SideNavigation>,
    );

    const parent = screen.getByRole('link', { name: 'Guide' }).closest('li')!;
    const child = screen
      .getByRole('link', { name: 'Installation' })
      .closest('li')!;
    expect(parent).toContainElement(child);
    expect(child.parentElement?.tagName).toBe('UL');
  });
});
