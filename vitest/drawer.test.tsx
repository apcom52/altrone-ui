import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
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

describe('Drawer async completion', () => {
  test.each(['reject', 'throw'] as const)('%s restores Done and shakes before retry', async (failure) => {
    const onClose = vi.fn();
    const onDone = vi.fn<[], Promise<boolean | void>>();
    if (failure === 'reject') {
      onDone.mockRejectedValueOnce(new Error('Network unavailable'));
    } else {
      onDone.mockImplementationOnce(() => {
        throw new Error('Invalid request');
      });
    }
    onDone.mockResolvedValueOnce(undefined);
    renderDrawer({ onDone, onClose });

    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /done/i })).toBeEnabled());
    await waitFor(() => expect(document.querySelector('[class*="Shake"]')).not.toBeNull());
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(onDone).toHaveBeenCalledTimes(2);
  });

  test.each(['resolve', 'reject'] as const)('stale %s cannot affect a reopened drawer or its pending operation', async (completion) => {
    let resolveOld!: () => void;
    let rejectOld!: (error: Error) => void;
    let resolveNew!: () => void;
    const oldRequest = new Promise<void>((resolve, reject) => {
      resolveOld = resolve;
      rejectOld = reject;
    });
    const newRequest = new Promise<void>((resolve) => {
      resolveNew = resolve;
    });
    const onDone = vi
      .fn()
      .mockReturnValueOnce(oldRequest)
      .mockReturnValueOnce(newRequest);
    const onClose = vi.fn();
    const view = (open: boolean) => (
      <Application>
        <Drawer
          open={open}
          onDone={onDone}
          onClose={onClose}
          content={<div>content</div>}
        />
      </Application>
    );
    const { rerender } = render(view(true));
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    rerender(view(false));
    rerender(view(true));
    expect(screen.getByRole('button', { name: /done/i })).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: /done/i }));

    await act(async () => {
      if (completion === 'resolve') {
        resolveOld();
      } else {
        rejectOld(new Error('Stale failure'));
      }
    });
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /done/i })).toBeDisabled();
    expect(document.querySelector('[class*="Shake"]')).toBeNull();

    await act(async () => {
      resolveNew();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: /done/i })).toBeEnabled();
  });

  test('closing invalidates pending Done even if the controlled owner keeps open=true', async () => {
    let resolve!: () => void;
    const onDone = vi.fn(
      () => new Promise<void>((done) => {
        resolve = done;
      }),
    );
    const onClose = vi.fn();
    renderDrawer({ open: true, onDone, onClose });
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    await act(async () => {
      resolve();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: /done/i })).toBeEnabled();
  });

  test('completion after unmount does not call onClose', async () => {
    let resolve!: () => void;
    const onDone = () => new Promise<void>((done) => {
      resolve = done;
    });
    const onClose = vi.fn();
    const { unmount } = renderDrawer({ onDone, onClose });
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    unmount();
    await act(async () => {
      resolve();
    });
    expect(onClose).not.toHaveBeenCalled();
  });
});
