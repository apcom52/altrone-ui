import React, { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Application, FilePicker } from '../src';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

const renderPicker = (ui: React.ReactElement) =>
  render(<Application>{ui}</Application>);

describe('FilePicker', () => {
  test('shows the empty label and the pick button when there are no files', () => {
    renderPicker(<FilePicker />);

    expect(screen.getByText('No files chosen')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Choose file' }),
    ).toBeInTheDocument();
  });

  test('renders a chip per file from defaultValue', () => {
    renderPicker(
      <FilePicker
        multiple
        autoUpload={false}
        defaultValue={[{ filename: 'a.pdf' }, { filename: 'b.png' }]}
      />,
    );

    expect(screen.getByText('a.pdf')).toBeInTheDocument();
    expect(screen.getByText('b.png')).toBeInTheDocument();
    expect(screen.queryByText('No files chosen')).not.toBeInTheDocument();
  });

  test('controlled value renders exactly what is passed', () => {
    renderPicker(
      <FilePicker
        multiple
        value={[{ filename: 'only.txt' }]}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('only.txt')).toBeInTheDocument();
  });

  test('without url, choosing and removing a file sends no requests', async () => {
    const open = vi.spyOn(XMLHttpRequest.prototype, 'open');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const onChange = vi.fn();

    const { container } = renderPicker(<FilePicker onChange={onChange} />);
    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, {
      target: { files: [new File(['x'], 'a.txt')] },
    });

    expect(await screen.findByText('a.txt')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() =>
      expect(onChange).toHaveBeenLastCalledWith([], expect.anything()),
    );
    expect(open).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();

    open.mockRestore();
    vi.unstubAllGlobals();
  });

  test('removes the file from the list even when the DELETE request fails', async () => {
    const removeFileFn = vi.fn().mockRejectedValue(new Error('404'));
    const onChange = vi.fn();

    renderPicker(
      <FilePicker
        multiple
        value={[{ filename: 'failed.txt' }]}
        removeFileFn={removeFileFn}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() =>
      expect(onChange).toHaveBeenLastCalledWith([], expect.anything()),
    );
    expect(removeFileFn).toHaveBeenCalledTimes(1);
  });

  test('single mode keeps the new file when deleting the replaced one fails', async () => {
    const removeFileFn = vi.fn().mockRejectedValue(new Error('500'));
    const onChange = vi.fn();

    const { container } = renderPicker(
      <FilePicker
        defaultValue={[{ filename: 'old.txt' }]}
        removeFileFn={removeFileFn}
        onChange={onChange}
      />,
    );
    fireEvent.change(container.querySelector('input[type="file"]')!, {
      target: { files: [new File(['x'], 'new.txt')] },
    });

    expect(await screen.findByText('new.txt')).toBeInTheDocument();
    expect(screen.queryByText('old.txt')).not.toBeInTheDocument();
    expect(removeFileFn).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('replacing a file in single mode aborts its unfinished upload', async () => {
    const send = vi
      .spyOn(XMLHttpRequest.prototype, 'send')
      .mockImplementation(() => {});
    const abort = vi.spyOn(XMLHttpRequest.prototype, 'abort');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));

    const { container } = renderPicker(<FilePicker url="/upload" />);
    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [new File(['x'], 'a.txt')] } });
    await waitFor(() => expect(send).toHaveBeenCalledTimes(1));
    expect(abort).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { files: [new File(['y'], 'b.txt')] } });
    await waitFor(() => expect(abort).toHaveBeenCalledTimes(1));

    send.mockRestore();
    abort.mockRestore();
    vi.unstubAllGlobals();
  });

  test('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    renderPicker(<FilePicker ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('className and style apply to the root element', () => {
    renderPicker(
      <FilePicker
        data-testid="picker"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      />,
    );

    expect(screen.getByTestId('picker')).toHaveClass('cls');
    expect(screen.getByTestId('picker')).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
