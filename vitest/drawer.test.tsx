import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Application, Drawer } from '../src/components';

const renderDrawer = (
  props: Partial<React.ComponentProps<typeof Drawer>> = {},
) =>
  render(
    <Application>
      <Drawer content={<div>drawer content</div>} defaultOpen {...props} />
    </Application>,
  );

describe('Drawer', () => {
  test('`open` controls visibility', () => {
    const { rerender } = render(
      <Application>
        <Drawer content={<div>drawer content</div>} open={false} />
      </Application>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <Application>
        <Drawer content={<div>drawer content</div>} open={true} />
      </Application>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('Escape closes the drawer', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });

    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('backdrop click closes the drawer', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });

    fireEvent.click(document.querySelector('[class*="Backdrop"]')!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('dismissible={false} blocks backdrop click and Escape, not the close button', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose, dismissible: false });

    fireEvent.click(document.querySelector('[class*="Backdrop"]')!);
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('showCloseButton={false} hides the close button', () => {
    renderDrawer({ showCloseButton: false });

    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();
  });

  test('onDone resolving to false keeps the drawer open, any other value closes it', async () => {
    const onDone = vi
      .fn<[], Promise<boolean | void>>()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(undefined);

    renderDrawer({ title: 'Task', onDone });

    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    /* The Done button swaps to a loading state and back — re-query it
       rather than reuse a reference that may now point at a stale node. */
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    await waitFor(() => expect(onDone).toHaveBeenCalledTimes(2));
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  test('additionalActions and actions render; actions replaces the Done button', () => {
    renderDrawer({
      title: 'Doc',
      onDone: async () => {},
      additionalActions: <button>history</button>,
      actions: [<button key="a">share</button>, <button key="b">save</button>],
    });

    expect(screen.getByText('history')).toBeInTheDocument();
    expect(screen.getByText('share')).toBeInTheDocument();
    expect(screen.getByText('save')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /done/i }),
    ).not.toBeInTheDocument();
  });
});
