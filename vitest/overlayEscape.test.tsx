import { StrictMode } from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import {
  Application,
  Button,
  Drawer,
  Dropdown,
  Modal,
  Select,
  showConfirm,
} from '../src/components';

describe('Overlay Escape ownership', () => {
  test('one Escape closes only the last activated sibling, then the previous one', () => {
    const first = vi.fn();
    const second = vi.fn();
    render(
      <Application>
        <Modal
          defaultOpen
          title="First"
          content="First content"
          onClose={first}
        />
        <Drawer
          defaultOpen
          title="Second"
          content="Second content"
          onClose={second}
        />
      </Application>,
    );

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
    });
    act(() => {
      document.body.dispatchEvent(event);
    });
    expect(second).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledWith(event);
    expect(first).not.toHaveBeenCalled();

    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });

  test('confirm dismissal resolves false without closing its drawer', async () => {
    const onClose = vi.fn();
    render(
      <Application>
        <Drawer
          defaultOpen
          title="Parent"
          content="Content"
          onClose={onClose}
        />
      </Application>,
    );
    let result!: Promise<boolean>;
    act(() => {
      result = showConfirm({ title: 'Confirm', message: 'Continue?' });
    });
    await screen.findByText('Continue?');

    fireEvent.keyDown(screen.getByRole('button', { name: 'Confirm' }), {
      key: 'Escape',
    });
    await expect(result).resolves.toBe(false);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('rerenders update callbacks without promoting older windows; unmount restores the previous owner', () => {
    const first = vi.fn();
    const latestFirst = vi.fn();
    const second = vi.fn();
    const view = (onClose: () => void, top: boolean) => (
      <StrictMode>
        <Application>
          <Modal open title="First" content="Content" onClose={onClose} />
          {top && (
            <Drawer open title="Second" content="Content" onClose={second} />
          )}
        </Application>
      </StrictMode>
    );
    const { rerender } = render(view(first, true));
    rerender(view(latestFirst, true));
    fireEvent.keyDown(document.body, { key: 'Escape' });
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(second).toHaveBeenCalledTimes(2);
    expect(first).not.toHaveBeenCalled();
    expect(latestFirst).not.toHaveBeenCalled();

    rerender(view(latestFirst, false));
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(latestFirst).toHaveBeenCalledTimes(1);
    expect(first).not.toHaveBeenCalled();
  });

  test('a non-dismissible top sheet absorbs Escape and keeps its focus trap active', async () => {
    const first = vi.fn();
    const second = vi.fn();
    const view = (top: boolean) => (
      <Application>
        <Modal open title="First" content="Content" onClose={first} />
        {top && (
          <Drawer
            open
            dismissible={false}
            title="Second"
            content={<Button label="Inside drawer" />}
            onClose={second}
          />
        )}
      </Application>
    );
    const { rerender } = render(view(false));
    rerender(view(true));
    const inside = screen.getByRole('button', { name: 'Inside drawer' });
    inside.focus();
    fireEvent.keyDown(inside, { key: 'Escape' });
    expect(first).not.toHaveBeenCalled();
    expect(second).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(document.querySelector('[class*="Shake"]')).not.toBeNull(),
    );
    screen.getByRole('button', { name: 'Cancel' }).focus();
    expect(inside.closest('[role="dialog"]')).toContainElement(
      document.activeElement as HTMLElement,
    );
  });

  test.each(['Dropdown', 'Select'] as const)(
    '%s consumes Escape inside a modal before the modal handles it',
    async (kind) => {
      const onClose = vi.fn();
      render(
        <Application>
          <Modal
            defaultOpen
            title="Parent"
            onClose={onClose}
            content={
              kind === 'Dropdown' ? (
                <Dropdown
                  content={
                    <Dropdown.Menu>
                      <Dropdown.Action label="Menu action" />
                    </Dropdown.Menu>
                  }
                >
                  <Button label="Open dropdown" />
                </Dropdown>
              ) : (
                <Select
                  aria-label="Status"
                  options={[{ value: 'draft', label: 'Draft' }]}
                  onChange={() => {}}
                />
              )
            }
          />
        </Application>,
      );
      fireEvent.click(
        kind === 'Dropdown'
          ? screen.getByRole('button', { name: 'Open dropdown' })
          : screen.getByRole('combobox'),
      );
      const item = await screen.findByRole(
        kind === 'Dropdown' ? 'button' : 'option',
        { name: kind === 'Dropdown' ? 'Menu action' : 'Draft' },
      );
      fireEvent.keyDown(item, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
      await waitFor(() => expect(item).not.toBeInTheDocument());
      fireEvent.keyDown(document.body, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    },
  );

  test('prevented Escape and IME composition do not close the sheet', () => {
    const onClose = vi.fn();
    render(
      <Application>
        <Modal open content="Content" onClose={onClose} />
      </Application>,
    );
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    event.preventDefault();
    act(() => {
      document.body.dispatchEvent(event);
    });
    fireEvent.keyDown(document.body, { key: 'Escape', isComposing: true });
    expect(onClose).not.toHaveBeenCalled();
  });
});
