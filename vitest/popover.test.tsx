import React, { useEffect, useRef } from 'react';
import { expect, test, describe, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Application, Button, Popover } from '../src';
import type { PopoverRef } from '../src/components/popover';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

const renderPopover = (props: Partial<React.ComponentProps<typeof Popover>>) =>
  render(
    <Application>
      <Popover content="Popover content" {...(props as any)}>
        {props.children ?? <Button label="Trigger" data-testid="trigger" />}
      </Popover>
    </Application>,
  );

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
          content="Popover content"
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
      children: <Button data-testid="src" tabIndex={2} />,
    });
    expect(screen.getByTestId('src')).toHaveAttribute('tabindex', '2');

    rerender(
      <Application>
        <Popover content="c" defaultOpen>
          <Button data-testid="src" />
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
        <Popover content="c">
          <Trigger />
        </Popover>
      </Application>,
    );

    expect(captured[0]).toBe(screen.getByTestId('trigger'));
  });

  test('imperative ref opens and closes the popover', () => {
    const Harness = () => {
      const popoverRef = useRef<PopoverRef>(null);
      return (
        <>
          <button
            data-testid="ext-open"
            onClick={() => popoverRef.current?.openPopup()}
          >
            open
          </button>
          <Popover ref={popoverRef} content="Popover content">
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
        <Popover open={open} onOpenChange={setOpen} content="Popover content">
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

  test('controlled `open`: imperative openPopup/closePopup route through onOpenChange instead of self-managing', () => {
    const onOpenChange = vi.fn();
    const popoverRef = { current: null } as React.RefObject<PopoverRef | null>;

    render(
      <Application>
        <Popover
          ref={popoverRef as React.Ref<PopoverRef>}
          open={false}
          onOpenChange={onOpenChange}
          content="Popover content"
        >
          <Button label="Trigger" />
        </Popover>
      </Application>,
    );

    popoverRef.current?.openPopup();

    expect(onOpenChange).toHaveBeenCalledWith(true, undefined, undefined);
    // still closed — controlled, and the prop wasn't updated
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });
});
