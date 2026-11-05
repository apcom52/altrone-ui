import React, { useEffect, useRef } from 'react';
import { expect, test, describe, vi, beforeAll, afterAll } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Application, Button, Popover } from '../src';
import type { PopoverRef } from '../src/components/popover';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  window.ResizeObserver = ResizeObserver;
});

const renderPopover = (
  props: Partial<Omit<React.ComponentProps<typeof Popover>, 'children'>> & {
    children?: React.ReactElement;
  },
) => {
  const { children, ...rest } = props;
  return render(
    <Application>
      <Popover content={<div>Popover content</div>} {...rest}>
        {children ?? <Button label="Trigger" data-testid="trigger" />}
      </Popover>
    </Application>,
  );
};

describe('Popover', () => {
  test('renders content when defaultOpen', () => {
    renderPopover({ defaultOpen: true });
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  test('opens on trigger click, closed until then', () => {
    renderPopover({});
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('trigger'));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  test('shows the title, and the close button only with showCloseButton', () => {
    const { rerender } = renderPopover({
      defaultOpen: true,
      title: 'Popover title',
    });
    expect(screen.getByText('Popover title')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();

    rerender(
      <Application>
        <Popover
          content={<div>Popover content</div>}
          defaultOpen
          title="Popover title"
          showCloseButton
        >
          <Button label="Trigger" data-testid="trigger" />
        </Popover>
      </Application>,
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('a titled popover is a labelled dialog', () => {
    renderPopover({ defaultOpen: true, title: 'Settings' });

    const dialog = screen.getByRole('dialog');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy as string)).toHaveTextContent(
      'Settings',
    );
  });

  test('no dialog role for a plain (headerless) popover', () => {
    renderPopover({ defaultOpen: true });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('forces tabIndex on the trigger, preserving an explicit one', () => {
    const { rerender } = renderPopover({
      defaultOpen: true,
      children: <Button label="Src" data-testid="src" tabIndex={2} />,
    });
    expect(screen.getByTestId('src')).toHaveAttribute('tabindex', '2');

    rerender(
      <Application>
        <Popover content={<div>c</div>} defaultOpen>
          <Button label="Src" data-testid="src" />
        </Popover>
      </Application>,
    );
    expect(screen.getByTestId('src')).toHaveAttribute('tabindex', '0');
  });

  test("merges the trigger's own ref instead of swallowing it", () => {
    const captured: HTMLElement[] = [];
    const Trigger = () => {
      const ref = useRef<HTMLButtonElement>(null);
      useEffect(() => {
        if (ref.current) captured.push(ref.current);
      });
      return <Button ref={ref} label="Trigger" data-testid="trigger" />;
    };

    render(
      <Application>
        <Popover content={<div>c</div>}>
          <Trigger />
        </Popover>
      </Application>,
    );

    expect(captured[0]).toBe(screen.getByTestId('trigger'));
  });

  test("ref points at the trigger DOM element, alongside the trigger's own ref", () => {
    const popoverRef = React.createRef<HTMLElement>();

    render(
      <Application>
        <Popover ref={popoverRef} content={<div>c</div>}>
          <Button label="Trigger" data-testid="trigger" />
        </Popover>
      </Application>,
    );

    expect(popoverRef.current).toBe(screen.getByTestId('trigger'));
  });

  test('controlRef opens and closes the popover', () => {
    const Harness = () => {
      const popoverRef = useRef<PopoverRef>(null);
      return (
        <>
          <button
            data-testid="ext-open"
            onClick={() => popoverRef.current?.show()}
          >
            open
          </button>
          <Popover controlRef={popoverRef} content={<div>Popover content</div>}>
            <Button label="Trigger" />
          </Popover>
        </>
      );
    };

    render(
      <Application>
        <Harness />
      </Application>,
    );

    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('ext-open'));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  test('onOpenChange reports the open state and a reason', () => {
    const onOpenChange = vi.fn();
    renderPopover({ onOpenChange });

    fireEvent.click(screen.getByTestId('trigger'));

    expect(onOpenChange).toHaveBeenCalledWith(
      true,
      expect.anything(),
      expect.any(String),
    );
  });

  test('Escape requests a close with reason "escape-key"', () => {
    const onOpenChange = vi.fn();
    renderPopover({ defaultOpen: true, onOpenChange });

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledWith(
      false,
      expect.anything(),
      'escape-key',
    );
  });

  test('controlled `open`: Escape only asks via onOpenChange, stays open until fed back', () => {
    const onOpenChange = vi.fn();
    renderPopover({ open: true, onOpenChange });

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledWith(
      false,
      expect.anything(),
      'escape-key',
    );
    // still open — the consumer hasn't fed the new value back in yet
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  test('controlled `open`: fed back through onOpenChange, Escape closes it', async () => {
    const Harness = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <Popover
          open={open}
          onOpenChange={setOpen}
          content={<div>Popover content</div>}
        >
          <Button label="Trigger" />
        </Popover>
      );
    };

    render(
      <Application>
        <Harness />
      </Application>,
    );

    fireEvent.keyDown(document.body, { key: 'Escape' });

    await waitFor(() =>
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument(),
    );
  });

  test('controlled `open`: imperative show/hide route through onOpenChange instead of self-managing', () => {
    const onOpenChange = vi.fn();
    const popoverRef = { current: null } as React.RefObject<PopoverRef | null>;

    render(
      <Application>
        <Popover
          controlRef={popoverRef as React.Ref<PopoverRef>}
          open={false}
          onOpenChange={onOpenChange}
          content={<div>Popover content</div>}
        >
          <Button label="Trigger" />
        </Popover>
      </Application>,
    );

    popoverRef.current?.show();

    expect(onOpenChange).toHaveBeenCalledWith(true, undefined, undefined);
    // still closed — controlled, and the prop wasn't updated
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });
});

describe('Popover context menu', () => {
  beforeAll(() => {
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1024);
    vi.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(768);
  });
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('opens at the pointer, prevents the native menu and repositions while open', async () => {
    const controlRef = React.createRef<PopoverRef>();
    const onOpenChange = vi.fn();
    renderPopover({ trigger: 'contextmenu', controlRef, onOpenChange });
    const trigger = screen.getByTestId('trigger');
    expect(fireEvent.contextMenu(trigger, { clientX: 120, clientY: 80 })).toBe(false);
    await waitFor(() => expect(controlRef.current?.actualPlacement).toBe('bottom-start'));
    expect(controlRef.current?.context.refs.reference.current?.getBoundingClientRect()).toMatchObject({ x: 120, y: 80, width: 0 });
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.any(MouseEvent), 'context-menu');
    fireEvent.contextMenu(trigger, { clientX: 230, clientY: 170 });
    expect(controlRef.current?.context.refs.reference.current?.getBoundingClientRect()).toMatchObject({ x: 230, y: 170 });
    expect(controlRef.current?.open).toBe(true);
  });

  test('leaves native behavior and styles intact when disabled', () => {
    const onOpenChange = vi.fn();
    renderPopover({ trigger: 'contextmenu', enabled: false, onOpenChange });
    const trigger = screen.getByTestId('trigger');
    expect(fireEvent.contextMenu(trigger)).toBe(true);
    fireEvent.keyDown(trigger, { key: 'ContextMenu' });
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(trigger.className).not.toContain('ContextMenuTrigger');
  });

  test.each([{ key: 'ContextMenu' }, { key: 'F10', shiftKey: true }])('opens from $key at the element and restores focus after Escape', async (key) => {
    const controlRef = React.createRef<PopoverRef>();
    renderPopover({ trigger: 'contextmenu', controlRef, content: <button>Panel action</button> });
    const trigger = screen.getByTestId('trigger');
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({ x: 20, y: 30, top: 30, left: 20, right: 120, bottom: 70, width: 100, height: 40, toJSON() {} });
    trigger.focus();
    fireEvent.keyDown(trigger, key);
    expect(controlRef.current?.context.refs.reference.current?.getBoundingClientRect()).toMatchObject({ x: 20, y: 70 });
    await waitFor(() => expect(screen.getByText('Panel action')).toHaveFocus());
    fireEvent.keyDown(screen.getByText('Panel action'), { key: 'Escape' });
    await waitFor(() => expect(controlRef.current?.open).toBe(false));
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  test('returns to element positioning with click and focus triggers', async () => {
    const controlRef = React.createRef<PopoverRef>();
    renderPopover({ trigger: ['click', 'focus', 'contextmenu'], controlRef });
    const trigger = screen.getByTestId('trigger');
    fireEvent.contextMenu(trigger, { clientX: 250, clientY: 140 });
    fireEvent.keyDown(trigger, { key: 'Escape' });
    await waitFor(() => expect(controlRef.current?.open).toBe(false));
    fireEvent.click(trigger);
    expect(controlRef.current?.open).toBe(true);
    expect(controlRef.current?.context.refs.reference.current?.getBoundingClientRect()).toEqual(trigger.getBoundingClientRect());
  });

  test('closes the previous menu when another trigger receives a contextmenu', async () => {
    const first = React.createRef<PopoverRef>();
    const second = React.createRef<PopoverRef>();
    render(<Application>
      <Popover trigger="contextmenu" controlRef={first} content={<div>First menu</div>}><Button label="First" /></Popover>
      <Popover trigger="contextmenu" controlRef={second} content={<div>Second menu</div>}><Button label="Second" /></Popover>
    </Application>);
    fireEvent.contextMenu(screen.getByText('First'), { clientX: 50, clientY: 60 });
    fireEvent.contextMenu(screen.getByText('Second'), { clientX: 150, clientY: 160 });
    await waitFor(() => expect(first.current?.open).toBe(false));
    expect(second.current?.open).toBe(true);
  });

  test('ignores overlap and parentWidth in point mode with a development warning', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const controlRef = React.createRef<PopoverRef>();
      renderPopover({ trigger: 'contextmenu', overlap: true, parentWidth: true, controlRef });
      fireEvent.contextMenu(screen.getByTestId('trigger'), { clientX: 120, clientY: 80 });
      await waitFor(() => expect(controlRef.current?.actualPlacement).toBe('bottom-start'));
      expect(controlRef.current?.contentNode?.style.width).toBe('');
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('ignores overlap and parentWidth'));
    } finally { warn.mockRestore(); }
  });

  const touchEvent = (element: Element, type: string, init: Record<string, unknown> = {}) => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.assign(event, { pointerType: 'touch', pointerId: 1, isPrimary: true, clientX: 60, clientY: 90, ...init });
    fireEvent(element, event);
  };

  test('opens after a long press and suppresses Android contextmenu and the following click', async () => {
    vi.useFakeTimers();
    try {
      const onOpenChange = vi.fn();
      renderPopover({ trigger: ['click', 'contextmenu'], onOpenChange });
      const trigger = screen.getByTestId('trigger');
      touchEvent(trigger, 'pointerdown');
      await act(async () => { vi.advanceTimersByTime(500); });
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.any(Event), 'context-menu');
      await act(async () => { vi.advanceTimersByTime(3000); });
      fireEvent.contextMenu(trigger, { clientX: 60, clientY: 90 });
      touchEvent(trigger, 'pointerup');
      fireEvent.click(trigger);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    } finally { vi.useRealTimers(); }
  });

  test('deduplicates a native touch contextmenu that arrives before the hold timer', async () => {
    vi.useFakeTimers();
    try {
      const onOpenChange = vi.fn();
      renderPopover({ trigger: 'contextmenu', onOpenChange });
      const trigger = screen.getByTestId('trigger');
      touchEvent(trigger, 'pointerdown');
      await act(async () => { vi.advanceTimersByTime(400); });
      fireEvent.contextMenu(trigger, { clientX: 60, clientY: 90 });
      await act(async () => { vi.advanceTimersByTime(500); });
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(true, expect.any(MouseEvent), 'context-menu');
    } finally {
      vi.useRealTimers();
    }
  });

  test('requests controlled opening without changing the supplied open state', () => {
    const onOpenChange = vi.fn();
    renderPopover({ trigger: 'contextmenu', open: false, onOpenChange });
    fireEvent.contextMenu(screen.getByTestId('trigger'), { clientX: 80, clientY: 90 });
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.any(MouseEvent), 'context-menu');
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  test.each(['pointermove', 'pointerup', 'pointercancel', 'scroll', 'unmount', 'disable'])('cancels a pending long press on %s', async (type) => {
    vi.useFakeTimers();
    try {
      const onOpenChange = vi.fn();
      const { unmount, rerender } = renderPopover({ trigger: 'contextmenu', onOpenChange });
      const trigger = screen.getByTestId('trigger');
      touchEvent(trigger, 'pointerdown');
      if (type === 'unmount') unmount();
      else if (type === 'disable') rerender(<Application><Popover enabled={false} trigger="contextmenu" onOpenChange={onOpenChange} content={<div>Panel</div>}><Button label="Trigger" /></Popover></Application>);
      else if (type === 'scroll') fireEvent.scroll(document);
      else touchEvent(trigger, type, { clientX: 71 });
      await act(async () => { vi.advanceTimersByTime(600); });
      expect(onOpenChange).not.toHaveBeenCalled();
    } finally { vi.useRealTimers(); }
  });
});
