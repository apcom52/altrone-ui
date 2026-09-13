import React, { useEffect, useRef } from 'react';
import { expect, test, describe, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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
  test('renders content when openedByDefault', () => {
    renderPopover({ openedByDefault: true });
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
      openedByDefault: true,
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
          openedByDefault
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
    renderPopover({ openedByDefault: true, title: 'Settings' });

    const dialog = screen.getByRole('dialog');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy as string)).toHaveTextContent(
      'Settings',
    );
  });

  test('no dialog role for a plain (headerless) popover', () => {
    renderPopover({ openedByDefault: true });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('forces tabIndex on the trigger, preserving an explicit one', () => {
    const { rerender } = renderPopover({
      openedByDefault: true,
      children: <Button data-testid="src" tabIndex={2} />,
    });
    expect(screen.getByTestId('src')).toHaveAttribute('tabindex', '2');

    rerender(
      <Application>
        <Popover content="c" openedByDefault>
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
    renderPopover({ openedByDefault: true, onOpenChange });

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledWith(
      false,
      expect.anything(),
      'escape-key',
    );
  });
});
