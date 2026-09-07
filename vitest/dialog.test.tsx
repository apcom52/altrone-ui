import { expect, test, describe, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import {
  AltroneApplication,
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
      <AltroneApplication>
        <div />
      </AltroneApplication>,
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
      <AltroneApplication>
        <div />
      </AltroneApplication>,
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

  test('default button labels come from the active locale', async () => {
    render(
      <AltroneApplication language="ru">
        <div />
      </AltroneApplication>,
    );

    act(() => {
      void showAlert({ title: 'Готово', message: 'Сохранено' });
    });

    await waitFor(() => {
      expect(screen.getByText('ОК')).toBeInTheDocument();
    });
  });
});
