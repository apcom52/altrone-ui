import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { createRef, ReactNode } from 'react';
import { Application, Toolbar } from '../src/components';
import {
  resolveToolbarOverflow,
  isFlexibleSpacer,
  isCollapsible,
} from '../src/components/toolbar/useToolbarOverflow.tsx';
import { resolveToolbarRegionBalance } from '../src/components/toolbar/useToolbarRegionBalance.ts';

describe('Toolbar', () => {
  test('renders text and zero in the toolbar and every layout region', () => {
    const { rerender } = render(
      <Application>
        <Toolbar data-testid="flat">{0} items</Toolbar>
        <Toolbar>
          <Toolbar.Leading data-testid="leading">
            Untitled document
          </Toolbar.Leading>
          <Toolbar.Center data-testid="center">{0}</Toolbar.Center>
          <Toolbar.Trailing data-testid="trailing">{0} selected</Toolbar.Trailing>
        </Toolbar>
      </Application>,
    );

    expect(screen.getByTestId('flat')).toHaveTextContent('0 items');
    expect(screen.getByTestId('flat').children).toHaveLength(1);
    expect(screen.getByTestId('leading')).toHaveTextContent('Untitled document');
    expect(screen.getByTestId('center')).toHaveTextContent('0');
    expect(screen.getByTestId('trailing')).toHaveTextContent('0 selected');

    rerender(
      <Application>
        <Toolbar data-testid="flat">
          {null}{false}{undefined}{12} items
          <Toolbar.Action label="Refresh" />
          {' saved'}
        </Toolbar>
      </Application>,
    );

    expect(screen.getByTestId('flat')).toHaveTextContent('12 itemsRefresh saved');
    expect(screen.getByTestId('flat').children).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });

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
    expect(
      screen.getByRole('button', { name: 'overridden' }).className,
    ).toMatch(/XLarge/);
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

  test('Toolbar.Group is a glass pill in every variant except `plain`', () => {
    const { rerender } = render(
      <Application>
        <Toolbar variant="grouped">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </Application>,
    );
    expect(screen.getByTestId('group').className).toMatch(/Pill/);

    rerender(
      <Application>
        <Toolbar variant="solid">
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
          <Toolbar.Group data-testid="group" variant="grouped" />
        </Toolbar>
      </Application>,
    );
    expect(screen.getByTestId('group').className).toMatch(/Pill/);

    rerender(
      <Application>
        <Toolbar variant="grouped">
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
    const staticTitle = screen.getByText('Docs').parentElement as HTMLElement;
    expect(staticTitle.className).not.toMatch(/Clickable/);
    expect(staticTitle.querySelector('svg')).toBeNull();

    rerender(
      <Application>
        <Toolbar>
          <Toolbar.Title title="Docs" clickable />
        </Toolbar>
      </Application>,
    );
    const clickableTitle = screen.getByText('Docs')
      .parentElement as HTMLElement;
    expect(clickableTitle.className).toMatch(/Clickable/);
    expect(clickableTitle.querySelector('svg')).not.toBeNull();
  });
});

describe('Toolbar overflow', () => {
  test('measures text when it changes and keeps it visible while actions collapse', () => {
    const previousResizeObserver = globalThis.ResizeObserver;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    );
    const clientWidth = vi
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockReturnValue(220);
    const offsetWidth = vi
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockImplementation(function (this: HTMLElement) {
        if (this.tagName === 'SPAN') return (this.textContent?.length ?? 0) * 10;
        return this.textContent === 'Refresh' ? 80 : 40;
      });

    const toolbar = (count: number) => (
      <Application>
        <Toolbar style={{ padding: 0, columnGap: 8 }}>
          {count} items
          <Toolbar.Action label="Refresh" priority="low" />
          <Toolbar.Action label="Share" priority="medium" />
        </Toolbar>
      </Application>
    );
    const { rerender, unmount } = render(toolbar(0));

    try {
      expect(screen.getByText('0 items')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'More actions' })).toBeNull();

      rerender(toolbar(1000));

      expect(screen.getByText('1000 items')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Refresh' })).toBeNull();
      expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'More actions' }),
      ).toBeInTheDocument();

      rerender(toolbar(0));

      expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'More actions' })).toBeNull();
    } finally {
      unmount();
      clientWidth.mockRestore();
      offsetWidth.mockRestore();
      vi.stubGlobal('ResizeObserver', previousResizeObserver);
    }
  });

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
    expect(isFlexibleSpacer(<Toolbar.Separator />)).toBe(true);
    expect(isFlexibleSpacer(<Toolbar.Separator variant="space" />)).toBe(true);
    expect(isFlexibleSpacer(<Toolbar.Separator variant="line" />)).toBe(false);
    expect(isFlexibleSpacer(<Toolbar.Action label="x" />)).toBe(false);
  });

  test('isCollapsible: a group collapses only if every child has an overflow-menu form', () => {
    expect(
      isCollapsible(
        <Toolbar.Group>
          <Toolbar.SidebarToggleAction />
          <Toolbar.Action label="a" />
        </Toolbar.Group>,
      ),
    ).toBe(true);
    expect(
      isCollapsible(
        <Toolbar.Group>
          <Toolbar.SidebarToggleAction />
          <input />
        </Toolbar.Group>,
      ),
    ).toBe(false);
    expect(isCollapsible(<Toolbar.Group>text</Toolbar.Group>)).toBe(false);
    expect(isCollapsible(<Toolbar.Group />)).toBe(false);
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

    expect(resolveToolbarOverflow(items, sizes, 100, 8, 32)).toEqual(new Set());
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

describe('Toolbar overflow action behavior', () => {
  const previousResizeObserver = globalThis.ResizeObserver;
  let restoreMeasurements: () => void;

  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    );
    const width = vi
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockReturnValue(30);
    const itemWidth = vi
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(40);
    restoreMeasurements = () => {
      width.mockRestore();
      itemWidth.mockRestore();
      vi.stubGlobal('ResizeObserver', previousResizeObserver);
    };
  });

  afterEach(() => restoreMeasurements());

  const toolbar = (children: ReactNode) => (
    <Application>
      <Toolbar style={{ padding: 0, columnGap: 0 }}>{children}</Toolbar>
    </Application>
  );

  test.each(['single', 'group'])('preserves a %s action link, shortcut, ref and handlers', async (mode) => {
    const ref = createRef<HTMLButtonElement>();
    const childClick = vi.fn();
    const onClick = vi.fn((event) => event.preventDefault());
    const action = (
      <Toolbar.Action ref={ref} label="Settings" asChild kbd="⌘," onClick={onClick}>
        <a href="#settings" target="_blank" rel="noreferrer" onClick={childClick} />
      </Toolbar.Action>
    );
    render(toolbar(
      mode === 'group' ? <Toolbar.Group>{action}</Toolbar.Group> : action,
    ));
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    const link = await screen.findByRole('button', { name: /Settings/ });

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#settings');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
    expect(within(link).getByText('⌘,')).toBeInTheDocument();
    expect(ref.current).toBe(link);
    fireEvent.click(link);
    expect(childClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(link).toBeInTheDocument();
  });

  test('shows the selected checkbox icon and loading indicator as state changes', async () => {
    const onClick = vi.fn();
    const action = (state: 'idle' | 'loading', selected: boolean) =>
      toolbar(
        <Toolbar.Action
          label="Autosave"
          selected={selected}
          state={state}
          onClick={onClick}
          icon={<svg data-testid="original-icon" />}
        />,
      );
    const { rerender } = render(action('idle', true));
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    const selected = await screen.findByRole('button', { name: 'Autosave' });
    expect(selected).toHaveAttribute('aria-pressed', 'true');
    expect(selected.querySelector('svg path')).toHaveAttribute(
      'stroke-dasharray', '40 0',
    );
    expect(within(selected).queryByTestId('original-icon')).toBeNull();

    rerender(action('loading', true));
    const loading = screen.getByRole('button', { name: 'Autosave' });
    expect(loading).toBeDisabled();
    expect(loading).toHaveAttribute('aria-busy', 'true');
    expect(loading).toHaveAttribute('aria-pressed', 'true');
    expect(loading.querySelector('circle')).not.toBeNull();
    expect(loading.querySelector('svg')).toHaveAttribute(
      'width', 'var(--dropdown-action-icon-size, 18px)',
    );
    fireEvent.click(loading);
    expect(onClick).not.toHaveBeenCalled();

    rerender(action('idle', false));
    const idle = screen.getByRole('button', { name: 'Autosave' });
    expect(idle).toBeEnabled();
    expect(idle).toHaveAttribute('aria-pressed', 'false');
    expect(idle).not.toHaveAttribute('aria-busy');
    expect(within(idle).getByTestId('original-icon')).toBeInTheDocument();
  });

  test.each(['disabled', 'loading'])('blocks %s links for pointer and keyboard activation', async (mode) => {
    const onClick = vi.fn();
    const childClick = vi.fn();
    render(toolbar(
      <Toolbar.Action
        label="Export"
        asChild
        disabled={mode === 'disabled'}
        state={mode === 'loading' ? 'loading' : 'idle'}
        onClick={onClick}
      >
        <a href="#export" onClick={childClick} />
      </Toolbar.Action>,
    ));
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    const link = await screen.findByRole('button', { name: 'Export' });
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(fireEvent.click(link)).toBe(false);
    expect(fireEvent.keyDown(link, { key: 'Enter' })).toBe(false);
    expect(fireEvent.keyDown(link, { key: ' ' })).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
    expect(childClick).not.toHaveBeenCalled();
    expect(link).toBeInTheDocument();
  });

  test('keeps SidebarToggleAction behavior and state in overflow', async () => {
    const onClick = vi.fn();
    const { rerender } = render(toolbar(
      <Toolbar.Group>
        <Toolbar.SidebarToggleAction collapsed kbd="⌘B" selected onClick={onClick} />
      </Toolbar.Group>,
    ));
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    const action = await screen.findByRole('button', { name: /Expand sidebar/ });
    expect(action).toHaveAttribute('aria-pressed', 'true');
    expect(within(action).getByText('⌘B')).toBeInTheDocument();
    fireEvent.click(action);
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(toolbar(
      <Toolbar.SidebarToggleAction
        collapsed={false}
        state="loading"
        onClick={onClick}
      />,
    ));
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    const loading = await screen.findByRole('button', { name: 'Collapse sidebar' });
    expect(loading).toBeDisabled();
    expect(loading).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(loading);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
