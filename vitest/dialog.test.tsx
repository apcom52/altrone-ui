import { expect, test, describe, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import {
  Application,
  showAlert,
  showConfirm,
  showPrompt,
} from '../src/components';

describe('Dialogs', () => {
  test('resolves immediately with the dismissed value when no provider is mounted', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await expect(showConfirm({ title: 'T', message: 'M' })).resolves.toBe(false);
    expect(warn).toHaveBeenCalled();

    warn.mockRestore();
  });

  test('showConfirm resolves true when the confirm button is pressed', async () => {
    render(
      <Application>
        <div />
      </Application>,
    );

    let result!: Promise<boolean>;
    act(() => {
      result = showConfirm({
        title: 'Delete it?',
        message: 'This cannot be undone.',
      });
    });

    await screen.findByText('This cannot be undone.');
    fireEvent.click(screen.getByText('Confirm'));

    await expect(result).resolves.toBe(true);
  });

  test('dismissing a prompt via onClose resolves null, not the typed value', async () => {
    render(
      <Application>
        <div />
      </Application>,
    );

    let result!: Promise<string | number | null>;
    act(() => {
      result = showPrompt({ title: 'Name', message: 'Enter a name' });
    });

    const input = await screen.findByPlaceholderText('Enter a value');
    fireEvent.change(input, { target: { value: 'typed but abandoned' } });
    fireEvent.keyDown(document.body, { key: 'Escape' });

    await expect(result).resolves.toBeNull();
  });

  test('closing a dialog does not unmount it synchronously — the close animation gets a chance to run', async () => {
    render(
      <Application>
        <div />
      </Application>,
    );

    act(() => {
      void showConfirm({
        title: 'Delete it?',
        message: 'This cannot be undone.',
      });
    });

    await screen.findByText('This cannot be undone.');
    fireEvent.click(screen.getByText('Confirm'));

    // Right after the click, still synchronous — `Modal` must stay mounted
    // for `AnimatePresence` to animate it out, not vanish in the same commit.
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
  });

  test('default button labels come from the active locale', async () => {
    render(
      <Application language="ru">
        <div />
      </Application>,
    );

    act(() => {
      void showAlert({ title: 'Готово', message: 'Сохранено' });
    });

    await waitFor(() => {
      expect(screen.getByText('ОК')).toBeInTheDocument();
    });
  });
});
