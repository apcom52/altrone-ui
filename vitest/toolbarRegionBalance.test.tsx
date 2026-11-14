import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { createRef, StrictMode } from 'react';
import { Toolbar } from '../src/components/toolbar';
import {
  ToolbarBalanceApi,
  useToolbarBalance,
} from '../src/components/toolbar/Toolbar.context';

type Axis = 'horizontal' | 'vertical';

function BalanceProbe({
  capture,
}: {
  capture: (api: ToolbarBalanceApi | null) => void;
}) {
  capture(useToolbarBalance());
  return null;
}

function Scenario({
  axis = 'horizontal',
  leading = true,
  center = true,
  trailing = true,
  trailingKey = 'trailing',
  capture,
}: {
  axis?: Axis;
  leading?: boolean;
  center?: boolean;
  trailing?: boolean;
  trailingKey?: string;
  capture?: (api: ToolbarBalanceApi | null) => void;
}) {
  const style = { padding: 0, columnGap: 0, rowGap: 0 };
  return (
    <Toolbar
      data-testid="toolbar"
      edge={axis === 'vertical' ? 'left' : 'top'}
      style={style}
    >
      {leading && (
        <Toolbar.Leading key="leading" data-testid="leading" style={style}>
          <span data-width="120" data-height="90">
            Leading
          </span>
        </Toolbar.Leading>
      )}
      {center && (
        <Toolbar.Center key="center" data-testid="center" style={style}>
          <span data-width="200" data-height="100">
            Center
          </span>
          {capture && <BalanceProbe capture={capture} />}
        </Toolbar.Center>
      )}
      {trailing && (
        <Toolbar.Trailing
          key={trailingKey}
          data-testid="trailing"
          style={style}
        >
          <span data-width="360" data-height="270">
            Trailing
          </span>
        </Toolbar.Trailing>
      )}
    </Toolbar>
  );
}

describe('Toolbar region lifecycle balance', () => {
  const originalResize = globalThis.ResizeObserver;
  const originalMutation = globalThis.MutationObserver;
  let observers: {
    targets: Set<Element>;
    disconnect: () => void;
    notify: () => void;
  }[];
  let mutationCount: number;
  let restoreSizes: () => void;

  beforeEach(() => {
    observers = [];
    mutationCount = 0;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        targets = new Set<Element>();
        constructor(callback: ResizeObserverCallback) {
          observers.push({
            targets: this.targets,
            disconnect: this.disconnect,
            notify: () => callback([], this as unknown as ResizeObserver),
          });
        }
        observe = (node: Element) => this.targets.add(node);
        unobserve = (node: Element) => this.targets.delete(node);
        disconnect = vi.fn(() => this.targets.clear());
      },
    );
    vi.stubGlobal(
      'MutationObserver',
      class extends originalMutation {
        constructor(callback: MutationCallback) {
          super(callback);
          mutationCount += 1;
        }
      },
    );
    const clientSize = (node: HTMLElement, vertical: boolean): number => {
      const available = vertical ? 800 : 1000;
      const region = node.dataset.toolbarRegion;
      const root = node.closest<HTMLElement>('[role="toolbar"]');
      if (!region || !root) return available;
      if (region === 'center') return vertical ? 100 : 200;
      const assigned = root.style.getPropertyValue(`--toolbar-${region}-track`);
      if (assigned) return parseFloat(assigned);
      const count = root.querySelectorAll(
        ':scope > [data-toolbar-region]',
      ).length;
      return count === 1
        ? available
        : (available -
            (root.querySelector(':scope > [data-toolbar-region="center"]')
              ? vertical
                ? 100
                : 200
              : 0)) /
            2;
    };
    const clientWidth = vi
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockImplementation(function (this: HTMLElement) {
        return clientSize(this, false);
      });
    const clientHeight = vi
      .spyOn(HTMLElement.prototype, 'clientHeight', 'get')
      .mockImplementation(function (this: HTMLElement) {
        return clientSize(this, true);
      });
    const width = vi
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockImplementation(function (this: HTMLElement) {
        return this.dataset.toolbarRegion
          ? this.clientWidth
          : Number(this.dataset.width ?? 18);
      });
    const height = vi
      .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
      .mockImplementation(function (this: HTMLElement) {
        return this.dataset.toolbarRegion
          ? this.clientHeight
          : Number(this.dataset.height ?? 18);
      });
    restoreSizes = () => {
      clientWidth.mockRestore();
      clientHeight.mockRestore();
      width.mockRestore();
      height.mockRestore();
    };
  });

  afterEach(() => {
    cleanup();
    restoreSizes();
    vi.stubGlobal('ResizeObserver', originalResize);
    vi.stubGlobal('MutationObserver', originalMutation);
  });

  const tracks = () => {
    const style = screen.getByTestId('toolbar').style;
    return [
      style.getPropertyValue('--toolbar-leading-track'),
      style.getPropertyValue('--toolbar-trailing-track'),
    ];
  };

  test.each<{ axis: Axis; removed: 'leading' | 'trailing' }>([
    { axis: 'horizontal', removed: 'leading' },
    { axis: 'horizontal', removed: 'trailing' },
    { axis: 'vertical', removed: 'leading' },
    { axis: 'vertical', removed: 'trailing' },
  ])(
    'clears $removed on removal and restores same-size $axis regions',
    ({ axis, removed }) => {
      const { rerender } = render(<Scenario axis={axis} />);
      const expected =
        axis === 'horizontal' ? ['280px', '520px'] : ['260px', '440px'];
      expect(tracks()).toEqual(expected);
      rerender(<Scenario axis={axis} {...{ [removed]: false }} />);
      expect(tracks()).toEqual(['', '']);
      rerender(<Scenario axis={axis} />);
      expect(tracks()).toEqual(expected);
    },
  );

  test.each<Axis>(['horizontal', 'vertical'])(
    'releases the removed center budget in a %s toolbar',
    (axis) => {
      const { rerender } = render(<Scenario axis={axis} />);
      rerender(<Scenario axis={axis} center={false} />);
      expect(tracks()).toEqual(
        axis === 'horizontal' ? ['380px', '620px'] : ['310px', '490px'],
      );
      rerender(<Scenario axis={axis} />);
      expect(tracks()).toEqual(
        axis === 'horizontal' ? ['280px', '520px'] : ['260px', '440px'],
      );
      rerender(<Scenario axis={axis} center={false} trailing={false} />);
      expect(tracks()).toEqual(['', '']);
      expect(
        screen.getByTestId('leading')[
          axis === 'horizontal' ? 'clientWidth' : 'clientHeight'
        ],
      ).toBe(axis === 'horizontal' ? 1000 : 800);
    },
  );

  test('ignores measurements from a replaced region instance', () => {
    let api: ToolbarBalanceApi | null = null;
    const capture = (value: ToolbarBalanceApi | null) => {
      api = value;
    };
    const { rerender } = render(<Scenario capture={capture} />);
    const oldNode = screen.getByTestId('trailing');
    rerender(<Scenario capture={capture} trailingKey="replacement" />);
    expect(screen.getByTestId('trailing')).not.toBe(oldNode);
    api!.reportNaturalSize('trailing', oldNode, 900);
    expect(tracks()).toEqual(['280px', '520px']);
  });

  test('keeps the root observer and avoids writes for unchanged reports across toggles', () => {
    const { rerender, unmount } = render(<Scenario />);
    const root = screen.getByTestId('toolbar');
    const observer = observers.find(
      (item) => item.targets.size === 1 && item.targets.has(root),
    )!;
    const setProperty = vi.spyOn(root.style, 'setProperty');
    rerender(<Scenario />);
    expect(setProperty).not.toHaveBeenCalled();
    for (let index = 0; index < 5; index += 1) {
      rerender(<Scenario trailing={false} />);
      rerender(<Scenario />);
    }
    expect(tracks()).toEqual(['280px', '520px']);
    expect(
      observers.filter(
        (item) => item.targets.size === 1 && item.targets.has(root),
      ),
    ).toEqual([observer]);
    expect(observer.disconnect).not.toHaveBeenCalled();
    expect(mutationCount).toBe(0);
    unmount();
    setProperty.mockClear();
    observer.notify();
    expect(setProperty).not.toHaveBeenCalled();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
    setProperty.mockRestore();
  });

  test('keeps single-region refs and balance correct through StrictMode cleanup', () => {
    const leadingRef = createRef<HTMLDivElement>();
    const { rerender, unmount } = render(
      <StrictMode>
        <Toolbar style={{ padding: 0 }}>
          <Toolbar.Leading ref={leadingRef}>
            <span data-width="120">Leading</span>
          </Toolbar.Leading>
          <Toolbar.Trailing>
            <span data-width="360">Trailing</span>
          </Toolbar.Trailing>
        </Toolbar>
      </StrictMode>,
    );
    expect(leadingRef.current?.dataset.toolbarRegion).toBe('leading');
    rerender(
      <StrictMode>
        <Toolbar data-testid="toolbar" style={{ padding: 0 }}>
          <Toolbar.Leading ref={leadingRef}>
            <span data-width="120">Leading</span>
          </Toolbar.Leading>
        </Toolbar>
      </StrictMode>,
    );
    expect(tracks()).toEqual(['', '']);
    expect(leadingRef.current).not.toBeNull();
    unmount();
    expect(leadingRef.current).toBeNull();
    expect(observers.every((item) => item.targets.size === 0)).toBe(true);
  });
});
