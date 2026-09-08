import React, { useRef } from 'react';
import { expect, test, describe, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AltroneApplication } from '../src/components';
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
  render(<AltroneApplication>{ui}</AltroneApplication>);

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
      <AltroneApplication>
        <Harness visibility="never" />
      </AltroneApplication>,
    );
    fireEvent.click(screen.getByText('collapse'));
    expect(
      screen.queryByRole('button', { name: 'Expand panel' }),
    ).not.toBeInTheDocument();
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
      <AltroneApplication>
        <Splitter showControls={false}>
          <Splitter.Panel collapsible>
            <div>a</div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div>b</div>
          </Splitter.Panel>
        </Splitter>
      </AltroneApplication>,
    );

    expect(
      screen.queryByRole('button', { name: 'Collapse panel' }),
    ).not.toBeInTheDocument();
  });
});
