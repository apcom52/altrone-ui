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
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

const renderSplitter = (ui: React.ReactNode) =>
  render(<Application>{ui}</Application>);

describe('Splitter', () => {
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

    expect(screen.getByText('left').parentElement).toHaveStyle(
      'flex: 30 30 0',
    );
    expect(screen.getByText('right').parentElement).toHaveStyle('flex: 70 70 0');
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

    expect(screen.getByText('left').parentElement).toHaveStyle('flex: 20 20 0');
    expect(screen.getByText('right').parentElement).toHaveStyle(
      'flex: 60 60 0',
    );
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
    expect(screen.getByText('side').parentElement).toHaveStyle('flex: 0 0 0');
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
    expect(screen.getByText('side').parentElement).toHaveStyle('flex: 0 0 0');
  });

  test('collapsedControlsVisibility="never" drops the expand button of a collapsed panel', () => {
    const Harness = ({
      visibility,
    }: {
      visibility: 'always' | 'never';
    }) => {
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
    expect(screen.getByText('main').parentElement).toHaveStyle('flex: 60 60 0');
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

    expect(screen.getByText('side').parentElement).toHaveStyle('flex: 0 0 0');
    expect(screen.getByText('main').parentElement).toHaveStyle(
      'flex: 100 100 0',
    );
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
    expect(panel).toBe(screen.getByText('left').parentElement);
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
