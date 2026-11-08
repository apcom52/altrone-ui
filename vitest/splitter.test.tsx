import React, { useRef, useState } from 'react';
import { expect, test, describe, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Application } from '../src/components';
import { Splitter } from '../src/components/splitter';
import type { SplitterHandle } from '../src/components/splitter';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  window.ResizeObserver = ResizeObserver;
});

const panelOf = (text: string) =>
  screen.getByText(text).closest('[id*="-panel-"]');

const renderSplitter = (ui: React.ReactNode) =>
  render(<Application>{ui}</Application>);

describe('Splitter', () => {
  test.each([
    ['pointercancel', false],
    ['lostpointercapture', true],
  ] as const)('restores confirmed sizes on %s and accepts the next drag', (type, controlled) => {
    const controlRef = React.createRef<SplitterHandle>();
    const onResizeEnd = vi.fn();
    const onSizesChange = vi.fn();
    const layout = (sizes?: number[]) => (
      <Splitter
        controlRef={controlRef}
        sizes={sizes}
        onResizeEnd={onResizeEnd}
        onSizesChange={onSizesChange}
      >
        <Splitter.Panel defaultSize={50}>left</Splitter.Panel>
        <Splitter.Panel>right</Splitter.Panel>
      </Splitter>
    );
    const { rerender } = renderSplitter(layout(controlled ? [50, 50] : undefined));
    const divider = screen.getByRole('separator');
    const root = divider.parentElement!;
    const rootClass = root.className;
    const dividerClass = divider.className;
    Object.defineProperty(root, 'offsetWidth', { value: 200 });
    divider.setPointerCapture = vi.fn();
    divider.hasPointerCapture = () => type === 'pointercancel';
    divider.releasePointerCapture = vi.fn();
    const pointer = (eventType: string, clientX: number, pointerId = 1) => {
      const event = new MouseEvent(eventType, { bubbles: true, clientX });
      Object.defineProperty(event, 'pointerId', { value: pointerId });
      fireEvent(divider, event);
    };

    pointer('pointerdown', 100);
    pointer('pointermove', 140);
    expect(controlRef.current?.getSizes()).toEqual([70, 30]);
    if (controlled) rerender(<Application>{layout([40, 60])}</Application>);
    pointer(type, 140, 2);
    expect(controlRef.current?.getSizes()).toEqual([70, 30]);
    pointer(type, 140);
    const restored = controlled ? 40 : 50;
    expect(controlRef.current?.getSizes()).toEqual([restored, 100 - restored]);
    expect(panelOf('left')).toHaveStyle({ flex: `${restored} ${restored} 0px` });
    expect(root.className).toBe(rootClass);
    expect(divider.className).toBe(dividerClass);
    pointer('pointerup', 140);
    expect(onSizesChange).not.toHaveBeenCalled();
    expect(onResizeEnd).not.toHaveBeenCalled();

    pointer('pointerdown', 100);
    pointer('pointermove', 120);
    pointer('pointerup', 120);
    expect(onSizesChange).toHaveBeenCalledWith([restored + 10, 90 - restored]);
    expect(onResizeEnd).toHaveBeenCalledTimes(1);
  });

  test('renders one region per Panel and a separator between each pair', () => {
    renderSplitter(
      <Splitter>
        <Splitter.Panel>
          <div>a</div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div>b</div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div>c</div>
        </Splitter.Panel>
      </Splitter>,
    );

    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('c')).toBeInTheDocument();
    expect(screen.getAllByRole('separator')).toHaveLength(2);
  });

  test('defaultSize drives the initial flex of a panel', () => {
    renderSplitter(
      <Splitter>
        <Splitter.Panel defaultSize={30}>
          <div>left</div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div>right</div>
        </Splitter.Panel>
      </Splitter>,
    );

    expect(panelOf('left')).toHaveStyle('flex: 30 30 0');
    expect(panelOf('right')).toHaveStyle('flex: 70 70 0');
  });

  test('minSize/maxSize clamp the initial size derived from defaultSize', () => {
    renderSplitter(
      <Splitter>
        <Splitter.Panel defaultSize={5} minSize={20}>
          <div>left</div>
        </Splitter.Panel>
        <Splitter.Panel defaultSize={95} maxSize={60}>
          <div>right</div>
        </Splitter.Panel>
      </Splitter>,
    );

    expect(panelOf('left')).toHaveStyle('flex: 20 20 0');
    expect(panelOf('right')).toHaveStyle('flex: 60 60 0');
  });

  test('imperative toggle collapses a panel and fires onCollapse', () => {
    const onCollapse = vi.fn();

    const Harness = () => {
      const ref = useRef<SplitterHandle>(null);
      return (
        <>
          <button onClick={() => ref.current?.toggle(0)}>toggle</button>
          <Splitter controlRef={ref} onCollapse={onCollapse}>
            <Splitter.Panel defaultSize={40} collapsible>
              <div>side</div>
            </Splitter.Panel>
            <Splitter.Panel>
              <div>main</div>
            </Splitter.Panel>
          </Splitter>
        </>
      );
    };

    renderSplitter(<Harness />);

    fireEvent.click(screen.getByText('toggle'));

    expect(onCollapse).toHaveBeenCalledWith(0, true, undefined);
    expect(panelOf('side')).toHaveStyle('flex: 0 0 0');
  });

  test('clicking a divider collapse button collapses that panel', () => {
    const onCollapse = vi.fn();

    renderSplitter(
      <Splitter onCollapse={onCollapse}>
        <Splitter.Panel defaultSize={40} collapsible>
          <div>side</div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div>main</div>
        </Splitter.Panel>
      </Splitter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Collapse panel' }));

    expect(onCollapse).toHaveBeenCalledWith(0, true, expect.anything());
    expect(panelOf('side')).toHaveStyle('flex: 0 0 0');
  });

  test('collapsedControlsVisibility="never" drops the expand button of a collapsed panel', () => {
    const Harness = ({ visibility }: { visibility: 'always' | 'never' }) => {
      const ref = useRef<SplitterHandle>(null);
      return (
        <>
          <button onClick={() => ref.current?.collapse(0)}>collapse</button>
          <Splitter controlRef={ref} collapsedControlsVisibility={visibility}>
            <Splitter.Panel defaultSize={40} collapsible>
              <div>side</div>
            </Splitter.Panel>
            <Splitter.Panel>
              <div>main</div>
            </Splitter.Panel>
          </Splitter>
        </>
      );
    };

    const { rerender } = renderSplitter(<Harness visibility="always" />);
    fireEvent.click(screen.getByText('collapse'));
    // default 'always' → the expand button stays rendered while collapsed
    expect(
      screen.getByRole('button', { name: 'Expand panel' }),
    ).toBeInTheDocument();

    rerender(
      <Application>
        <Harness visibility="never" />
      </Application>,
    );
    fireEvent.click(screen.getByText('collapse'));
    expect(
      screen.queryByRole('button', { name: 'Expand panel' }),
    ).not.toBeInTheDocument();
  });

  test('controlled `sizes`: collapsing notifies via onSizesChange but leaves the DOM untouched until fed back', () => {
    const onSizesChange = vi.fn();

    renderSplitter(
      <Splitter sizes={[40, 60]} onSizesChange={onSizesChange}>
        <Splitter.Panel collapsible>
          <div>side</div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div>main</div>
        </Splitter.Panel>
      </Splitter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Collapse panel' }));

    expect(onSizesChange).toHaveBeenCalledWith([0, 100]);
    // sizes prop unchanged — the neighbor's flex stays at its original 60, not 100
    expect(panelOf('main')).toHaveStyle('flex: 60 60 0');
  });

  test('controlled `sizes`: fed back through onSizesChange, the collapse renders through', () => {
    const Harness = () => {
      const [sizes, setSizes] = useState([40, 60]);
      return (
        <Splitter sizes={sizes} onSizesChange={setSizes}>
          <Splitter.Panel collapsible>
            <div>side</div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div>main</div>
          </Splitter.Panel>
        </Splitter>
      );
    };

    renderSplitter(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'Collapse panel' }));

    expect(panelOf('side')).toHaveStyle('flex: 0 0 0');
    expect(panelOf('main')).toHaveStyle('flex: 100 100 0');
  });

  test('Panel forwards className/style/ref and arbitrary props to its root element', () => {
    const panelRef = React.createRef<HTMLDivElement>();

    renderSplitter(
      <Splitter>
        <Splitter.Panel
          ref={panelRef}
          className="cls"
          style={{ color: 'rgb(255, 0, 0)' }}
          data-testid="left-panel"
        >
          <div>left</div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div>right</div>
        </Splitter.Panel>
      </Splitter>,
    );

    const panel = screen.getByTestId('left-panel');
    expect(panel).toBe(panelOf('left'));
    expect(panel).toHaveClass('cls');
    expect(panel).toHaveStyle('color: rgb(255, 0, 0)');
    // internal sizing invariant survives a user-supplied `style`
    expect(panel).toHaveStyle('flex: 50 50 0');
    expect(panelRef.current).toBe(panel);
  });

  test('collapse buttons carry a localized label and honour showControls', () => {
    const { rerender } = renderSplitter(
      <Splitter>
        <Splitter.Panel collapsible>
          <div>a</div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div>b</div>
        </Splitter.Panel>
      </Splitter>,
    );

    expect(
      screen.getByRole('button', { name: 'Collapse panel' }),
    ).toBeInTheDocument();

    rerender(
      <Application>
        <Splitter showControls={false}>
          <Splitter.Panel collapsible>
            <div>a</div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div>b</div>
          </Splitter.Panel>
        </Splitter>
      </Application>,
    );

    expect(
      screen.queryByRole('button', { name: 'Collapse panel' }),
    ).not.toBeInTheDocument();
  });
});
