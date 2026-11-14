import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { createRef, Fragment, ReactNode, StrictMode, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toolbar } from '../src/components/toolbar';
import { useToolbarOverflow } from '../src/components/toolbar/useToolbarOverflow';
import { DEFAULT_TOOLBAR_ICONS } from '../src/components/toolbar/toolbarIcons';

type Axis = 'horizontal' | 'vertical';
type Edge = 'start' | 'end';

function Row({
  children,
  axis = 'horizontal',
  edge = 'end',
  report,
}: {
  children: ReactNode;
  axis?: Axis;
  edge?: Edge;
  report?: (size: number) => void;
}) {
  const { containerRef, content } = useToolbarOverflow(children, axis, {
    overflowIcons: DEFAULT_TOOLBAR_ICONS,
    triggerEdge: edge,
    onNaturalSizeChange: report,
  });
  return (
    <div
      data-testid="row"
      ref={containerRef}
      style={{ padding: 0, columnGap: 8, rowGap: 8 }}
    >
      {content}
    </div>
  );
}

describe('Toolbar DOM measurements', () => {
  const originalResize = globalThis.ResizeObserver;
  const originalMutation = globalThis.MutationObserver;
  const originalRaf = globalThis.requestAnimationFrame;
  const originalCancel = globalThis.cancelAnimationFrame;
  const originalRange = Object.getOwnPropertyDescriptor(
    Range.prototype,
    'getBoundingClientRect',
  );
  let available: number;
  let frames: Map<number, FrameRequestCallback>;
  let sequence: number;
  let observers: {
    notify: () => void;
    disconnect: () => void;
    targets: Set<Element>;
  }[];
  let mutationCount: number;
  let restoreSizes: () => void;

  beforeEach(() => {
    available = 200;
    frames = new Map();
    sequence = 0;
    observers = [];
    mutationCount = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frames.set(++sequence, callback);
      return sequence;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
    vi.stubGlobal(
      'ResizeObserver',
      class {
        targets = new Set<Element>();
        constructor(callback: ResizeObserverCallback) {
          observers.push({
            notify: () => callback([], this as unknown as ResizeObserver),
            disconnect: this.disconnect,
            targets: this.targets,
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
    const width = vi
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockImplementation(function (this: HTMLElement) {
        return Number(this.dataset.width ?? 18);
      });
    const height = vi
      .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
      .mockImplementation(function (this: HTMLElement) {
        return Number(this.dataset.height ?? this.dataset.width ?? 18);
      });
    const clientWidth = vi
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockImplementation(() => available);
    const clientHeight = vi
      .spyOn(HTMLElement.prototype, 'clientHeight', 'get')
      .mockImplementation(() => available);
    Object.defineProperty(Range.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: function (this: Range) {
        return { width: this.toString().length * 10, height: 20 };
      },
    });
    restoreSizes = () => {
      width.mockRestore();
      height.mockRestore();
      clientWidth.mockRestore();
      clientHeight.mockRestore();
    };
  });

  afterEach(() => {
    cleanup();
    restoreSizes();
    vi.stubGlobal('ResizeObserver', originalResize);
    vi.stubGlobal('MutationObserver', originalMutation);
    vi.stubGlobal('requestAnimationFrame', originalRaf);
    vi.stubGlobal('cancelAnimationFrame', originalCancel);
    if (originalRange)
      Object.defineProperty(
        Range.prototype,
        'getBoundingClientRect',
        originalRange,
      );
    else Reflect.deleteProperty(Range.prototype, 'getBoundingClientRect');
  });

  async function flushFrames() {
    for (let pass = 0; pass < 4; pass += 1) {
      await act(async () => {
        await Promise.resolve();
        const callbacks = [...frames.values()];
        frames.clear();
        callbacks.forEach((callback) => callback(0));
      });
      if (frames.size === 0) break;
    }
    expect(frames.size).toBe(0);
  }

  test.each<{ axis: Axis; edge: Edge }>([
    { axis: 'horizontal', edge: 'end' },
    { axis: 'horizontal', edge: 'start' },
    { axis: 'vertical', edge: 'end' },
    { axis: 'vertical', edge: 'start' },
  ])(
    'maps null, multiple roots, fragments and portals with $axis/$edge',
    async ({ axis, edge }) => {
      const report = vi.fn();
      const ref = createRef<HTMLButtonElement>();
      const Empty = () => null;
      const Multiple = () => (
        <>
          <span data-width="30" data-height="20">
            One
          </span>
          <span data-width="40" data-height="30">
            Two
          </span>
        </>
      );
      const Portal = () =>
        createPortal(<div data-width="500">Portal child</div>, document.body);
      available = axis === 'horizontal' ? 200 : 180;
      render(
        <Row axis={axis} edge={edge} report={report}>
          <Empty />
          <Multiple />
          <Fragment key="actions">
            <Toolbar.Action
              label="Low"
              priority="low"
              data-width="90"
              data-height="80"
            />
            <Fragment>
              <Toolbar.Action
                ref={ref}
                label="Keep"
                priority="high"
                data-width="60"
                data-height="50"
              />
            </Fragment>
          </Fragment>
          <Portal />
          {createPortal(
            <div data-width="900">Direct portal</div>,
            document.body,
          )}
        </Row>,
      );
      await flushFrames();
      expect(report).toHaveBeenLastCalledWith(
        axis === 'horizontal' ? 244 : 204,
      );
      expect(screen.queryByRole('button', { name: 'Low' })).toBeNull();
      expect(ref.current).toBe(screen.getByRole('button', { name: 'Keep' }));
      expect(
        screen.getByRole('button', { name: 'More actions' }),
      ).toBeInTheDocument();
      expect(screen.getByTestId('row')).not.toContainElement(
        screen.getByText('Portal child'),
      );
      expect(screen.getByTestId('row')).not.toContainElement(
        screen.getByText('Direct portal'),
      );
    },
  );

  test('updates after a custom component mounts extra roots without resizing its row', async () => {
    const report = vi.fn();
    function Custom() {
      const [expanded, setExpanded] = useState(false);
      return (
        <>
          <button
            data-width="20"
            onClick={() => setExpanded((value) => !value)}
          >
            Toggle roots
          </button>
          {expanded && <span data-width="70">Extra</span>}
        </>
      );
    }
    render(
      <Row report={report}>
        <Custom />
        <Toolbar.Action label="Low" priority="low" data-width="60" />
        <Toolbar.Action label="Keep" priority="high" data-width="60" />
      </Row>,
    );
    expect(report).toHaveBeenLastCalledWith(156);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle roots' }));
    await flushFrames();
    expect(report).toHaveBeenLastCalledWith(234);
    expect(screen.queryByRole('button', { name: 'Low' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle roots' }));
    await flushFrames();
    expect(report).toHaveBeenLastCalledWith(156);
    expect(screen.getByRole('button', { name: 'Low' })).toBeInTheDocument();
    expect(mutationCount).toBe(1);
  });

  test('measures a custom text run as one slot and reacts to text-only changes', async () => {
    available = 220;
    const report = vi.fn();
    let update: (value: number) => void = () => {};
    function CustomText() {
      const [count, setCount] = useState(0);
      update = setCount;
      return <>{count} items</>;
    }
    render(
      <Row report={report}>
        <CustomText />
        <Toolbar.Action label="Low" priority="low" data-width="60" />
        <Toolbar.Action label="Keep" priority="high" data-width="60" />
      </Row>,
    );
    expect(report).toHaveBeenLastCalledWith(206);
    act(() => update(1000));
    await flushFrames();
    expect(report).toHaveBeenLastCalledWith(236);
    expect(screen.queryByRole('button', { name: 'Low' })).toBeNull();
    expect(screen.getByText('1000 items')).toBeInTheDocument();
  });

  test('reuses one resize observer, batches notifications and preserves stable refs', async () => {
    available = 10000;
    const report = vi.fn();
    const refCleanup = vi.fn();
    const ref = vi.fn(() => refCleanup);
    const children = Array.from({ length: 100 }, (_, index) => (
      <span key={index} ref={index === 0 ? ref : undefined} data-width="40">
        {index}
      </span>
    ));
    const { rerender, unmount } = render(<Row report={report}>{children}</Row>);
    await flushFrames();
    expect(observers).toHaveLength(1);
    expect(observers[0].targets.size).toBe(101);
    expect(mutationCount).toBe(0);
    rerender(<Row report={report}>{children}</Row>);
    expect(observers).toHaveLength(1);
    expect(ref).toHaveBeenCalledTimes(1);
    report.mockClear();
    act(() => {
      for (let index = 0; index < 20; index += 1) observers[0].notify();
    });
    expect(frames.size).toBe(1);
    await flushFrames();
    expect(report).toHaveBeenCalledTimes(1);
    observers[0].notify();
    unmount();
    expect(frames.size).toBe(0);
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1);
    expect(refCleanup).toHaveBeenCalledTimes(1);
    observers[0].notify();
    expect(frames.size).toBe(0);
  });

  test('cleans up custom measurements and refs under StrictMode', async () => {
    const ref = createRef<HTMLSpanElement>();
    const Custom = () => <span data-width="40">Custom</span>;
    const { unmount } = render(
      <StrictMode>
        <Row>
          <Custom />
          <span ref={ref} data-width="40">
            Native
          </span>
        </Row>
      </StrictMode>,
    );
    await flushFrames();
    expect(ref.current).toBe(screen.getByText('Native'));
    unmount();
    expect(ref.current).toBeNull();
    expect(frames.size).toBe(0);
    expect(observers.every((observer) => observer.targets.size === 0)).toBe(
      true,
    );
  });
});
