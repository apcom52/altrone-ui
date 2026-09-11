import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Application, Drawer } from '../src/components';

const renderDrawer = (
  props: Partial<React.ComponentProps<typeof Drawer>> = {},
) =>
  render(
    <Application>
      <Drawer content={<div>drawer content</div>} {...props}>
        {props.children ?? <button>open</button>}
      </Drawer>
    </Application>,
  );

describe('Drawer', () => {
  test("opening keeps the trigger's own onClick", () => {
    const triggerClick = vi.fn();
    renderDrawer({ children: <button onClick={triggerClick}>open</button> });

    fireEvent.click(screen.getByText('open'));

    expect(triggerClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('Escape and backdrop click both close the drawer', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });

    fireEvent.click(screen.getByText('open'));
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('open'));
    fireEvent.click(document.querySelector('[class*="Backdrop"]')!);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test('onDone resolving to false keeps the drawer open, any other value closes it', async () => {
    const onDone = vi
      .fn<[], Promise<boolean | void>>()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(undefined);

    renderDrawer({ title: 'Task', onDone });
    fireEvent.click(screen.getByText('open'));

    const doneButton = screen.getByRole('button', { name: /done/i });

    fireEvent.click(doneButton);
    await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(doneButton);
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  test('startActions and endActions render; endActions replaces the Done button', () => {
    renderDrawer({
      title: 'Doc',
      onDone: async () => {},
      startActions: <button>history</button>,
      endActions: [<button key="a">share</button>, <button key="b">save</button>],
    });
    fireEvent.click(screen.getByText('open'));

    expect(screen.getByText('history')).toBeInTheDocument();
    expect(screen.getByText('share')).toBeInTheDocument();
    expect(screen.getByText('save')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /done/i }),
    ).not.toBeInTheDocument();
  });
});
