import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Application, Toolbar } from '../src/components';
import {
  resolveToolbarOverflow,
  isFlexibleSpacer,
} from '../src/components/toolbar/useToolbarOverflow.tsx';
import { resolveToolbarRegionBalance } from '../src/components/toolbar/useToolbarRegionBalance.ts';

describe('Toolbar', () => {
  test('check that className and style props works', () => {
    render(
      <Application>
        <Toolbar
          data-testid="toolbar"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
        >
          <Toolbar.Group
            data-testid="group"
            className="group"
            style={{ color: 'red' }}
          >
            <Toolbar.Action
              data-testid="action"
              label="test"
              className="action"
              style={{ color: 'yellow' }}
            />
          </Toolbar.Group>
        </Toolbar>
      </Application>,
    );

    expect(screen.getByTestId('toolbar')).toHaveClass('cls');
    expect(screen.getByTestId('toolbar')).toHaveStyle('color: rgb(0, 0, 255)');
    expect(screen.getByTestId('group')).toHaveClass('group');
    expect(screen.getByTestId('group')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('action')).toHaveClass('action');
    expect(screen.getByTestId('action')).toHaveStyle('color: rgb(255, 255, 0)');
  });

  test('Toolbar.Group `justify="between"` distributes content along the main axis', () => {
    render(
      <Application>
        <Toolbar.Group data-testid="group" justify="between">
          <span>a</span>
          <span>b</span>
        </Toolbar.Group>
      </Application>,
    );

    expect(screen.getByTestId('group').className).toMatch(/JustifyBetween/);
  });

  test('`edge="left"` flips `aria-orientation` to vertical', () => {
    render(
      <Application>
        <Toolbar data-testid="toolbar" edge="left" />
      </Application>,
    );

    expect(screen.getByTestId('toolbar')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });

  test('toolbar `size` cascades to nested Toolbar.Action unless the action overrides it', () => {
    render(
      <Application>
        <Toolbar size="mini">
          <Toolbar.Action label="inherited" />
          <Toolbar.Action label="overridden" size="xl" />
        </Toolbar>
      </Application>,
    );

    expect(screen.getByRole('button', { name: 'inherited' }).className).toMatch(
      /Mini/,
    );
    expect(screen.getByRole('button', { name: 'overridden' }).className).toMatch(
      /XLarge/,
    );
  });

  test('deprecated `fixed` prop warns, `sticky` does not', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { rerender } = render(
      <Application>
        <Toolbar fixed />
      </Application>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('fixed'));

    warn.mockClear();
    rerender(
      <Application>
        <Toolbar sticky />
      </Application>,
    );
    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });

  test('floating variant wraps children in a click-through inner layer; glass does not', () => {
    const { rerender } = render(
      <Application>
        <Toolbar variant="floating">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </Application>,
    );

    const group = screen.getByTestId('group');
    const toolbar = group.closest('[role="toolbar"]');
    expect(toolbar).not.toBeNull();
    expect(group.parentElement).not.toBe(toolbar);
    expect(group.parentElement?.parentElement).toBe(toolbar);

    rerender(
      <Application>
        <Toolbar variant="glass">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </Application>,
    );
    expect(screen.getByTestId('group').parentElement).toBe(
      screen.getByTestId('group').closest('[role="toolbar"]'),
    );
  });

  test('Toolbar.Group is a glass pill in every variant except `plain`', () => {
    const { rerender } = render(
      <Application>
        <Toolbar variant="glass">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </Application>,
    );
    expect(screen.getByTestId('group').className).toMatch(/Pill/);

    rerender(
      <Application>
        <Toolbar variant="floating">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </Application>,
    );
    expect(screen.getByTestId('group').className).toMatch(/Pill/);

    rerender(
      <Application>
        <Toolbar variant="plain">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </Application>,
    );
    expect(screen.getByTestId('group').className).not.toMatch(/Pill/);
  });

  test('Toolbar.Group `variant` overrides the toolbar variant per group', () => {
    const { rerender } = render(
      <Application>
        <Toolbar variant="plain">
          <Toolbar.Group data-testid="group" variant="glass" />
        </Toolbar>
      </Application>,
    );
    expect(screen.getByTestId('group').className).toMatch(/Pill/);

    rerender(
      <Application>
        <Toolbar variant="glass">
          <Toolbar.Group data-testid="group" variant="plain" />
        </Toolbar>
      </Application>,
    );
    expect(screen.getByTestId('group').className).not.toMatch(/Pill/);
  });

  test('Toolbar.Logo renders its mark and forwards a ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Application>
        <Toolbar>
          <Toolbar.Leading>
            <Toolbar.Logo ref={ref} data-testid="logo">
              <svg data-testid="mark" />
            </Toolbar.Logo>
          </Toolbar.Leading>
        </Toolbar>
      </Application>,
    );

    expect(screen.getByTestId('mark')).toBeInTheDocument();
    expect(ref.current).toBe(screen.getByTestId('logo'));
  });

  test('Toolbar.Title is plain text until `clickable`, then gets a chevron + pointer', () => {
    const { rerender } = render(
      <Application>
        <Toolbar>
          <Toolbar.Title title="Docs" />
        </Toolbar>
      </Application>,
    );
    const staticTitle = screen.getByText('Docs');
    expect(staticTitle.className).not.toMatch(/Clickable/);
    expect(staticTitle.querySelector('svg')).toBeNull();

    rerender(
      <Application>
        <Toolbar>
          <Toolbar.Title title="Docs" clickable />
        </Toolbar>
      </Application>,
    );
    const clickableTitle = screen.getByText('Docs');
    expect(clickableTitle.className).toMatch(/Clickable/);
    expect(clickableTitle.querySelector('svg')).not.toBeNull();
  });
});

describe('Toolbar overflow', () => {
  test('`priority` is stripped before reaching the DOM node', () => {
    render(
      <Application>
        <Toolbar>
          <Toolbar.Group data-testid="group" priority="low" />
          <Toolbar.Action data-testid="action" label="test" priority="low" />
        </Toolbar>
      </Application>,
    );

    expect(screen.getByTestId('group')).not.toHaveAttribute('priority');
    expect(screen.getByRole('button', { name: 'test' })).not.toHaveAttribute(
      'priority',
    );
  });

  test('isFlexibleSpacer: true only for a `Toolbar.Separator` with variant "space" (the default) — its stretched width is not a real requirement and must never be measured', () => {
    expect(
      isFlexibleSpacer(<Toolbar.Separator />),
    ).toBe(true);
    expect(
      isFlexibleSpacer(<Toolbar.Separator variant="space" />),
    ).toBe(true);
    expect(
      isFlexibleSpacer(<Toolbar.Separator variant="line" />),
    ).toBe(false);
    expect(isFlexibleSpacer(<Toolbar.Action label="x" />)).toBe(false);
  });

  test('resolveToolbarOverflow: nothing is hidden when everything fits', () => {
    const items = [
      { key: 'a', priority: 'low' as const },
      { key: 'b', priority: 'high' as const },
    ];
    const sizes = new Map([
      ['a', 40],
      ['b', 40],
    ]);

    expect(resolveToolbarOverflow(items, sizes, 100, 8, 32)).toEqual(
      new Set(),
    );
  });

  test('resolveToolbarOverflow: `low` collapses before `medium`, and stops once it fits', () => {
    const items = [
      { key: 'low', priority: 'low' as const },
      { key: 'medium', priority: 'medium' as const },
    ];
    const sizes = new Map([
      ['low', 100],
      ['medium', 10],
    ]);

    // Removing `low` alone is enough to fit — `medium` must stay visible.
    expect(resolveToolbarOverflow(items, sizes, 20, 0, 10)).toEqual(
      new Set(['low']),
    );
  });

  test('resolveToolbarOverflow: `high` never collapses, even if the row still overflows', () => {
    const items = [
      { key: 'low', priority: 'low' as const },
      { key: 'high', priority: 'high' as const },
    ];
    const sizes = new Map([
      ['low', 40],
      ['high', 200],
    ]);

    expect(resolveToolbarOverflow(items, sizes, 60, 8, 32)).toEqual(
      new Set(['low']),
    );
  });

  test('resolveToolbarOverflow: within the same priority, the earlier (leftmost/topmost) item collapses first', () => {
    const items = [
      { key: 'first', priority: 'medium' as const },
      { key: 'second', priority: 'medium' as const },
    ];
    const sizes = new Map([
      ['first', 40],
      ['second', 40],
    ]);

    // Only one needs to go to fit — must be `first`, not `second`.
    expect(resolveToolbarOverflow(items, sizes, 60, 8, 8)).toEqual(
      new Set(['first']),
    );
  });
});

describe('Toolbar region balance', () => {
  test('resolveToolbarRegionBalance: grants each side its exact need plus half the leftover when both fit', () => {
    expect(resolveToolbarRegionBalance(89, 234, 598)).toEqual([
      89 + (598 - 89 - 234) / 2,
      234 + (598 - 89 - 234) / 2,
    ]);
  });

  test('resolveToolbarRegionBalance: never grants less than the exact need when both fit', () => {
    const [leadingTrack, trailingTrack] = resolveToolbarRegionBalance(
      89,
      234,
      598,
    );
    expect(leadingTrack).toBeGreaterThanOrEqual(89);
    expect(trailingTrack).toBeGreaterThanOrEqual(234);
  });

  test('resolveToolbarRegionBalance: falls back to an even split once both together do not fit', () => {
    expect(resolveToolbarRegionBalance(236, 46, 250)).toEqual([125, 125]);
  });
});

describe('Toolbar header actions', () => {
  test('SidebarToggleAction swaps icon/label based on the controlled collapsed prop', () => {
    const { rerender } = render(
      <Application>
        <Toolbar.SidebarToggleAction collapsed={false} onClick={() => {}} />
      </Application>,
    );
    expect(
      screen.getByRole('button', { name: 'Collapse sidebar' }),
    ).toBeInTheDocument();

    rerender(
      <Application>
        <Toolbar.SidebarToggleAction collapsed={true} onClick={() => {}} />
      </Application>,
    );
    expect(
      screen.getByRole('button', { name: 'Expand sidebar' }),
    ).toBeInTheDocument();
  });
});
