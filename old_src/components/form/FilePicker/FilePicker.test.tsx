import { act, fireEvent, render, screen } from '@testing-library/react';
import { FilePicker } from './FilePicker';
import { FilePickerRef } from './FilePicker.types';
import { timeout } from '../../../utils';

describe('Forms.FilePicker', () => {
  test('has to open file window when user clicks on the button', async () => {
    act(() => {
      render(
        <FilePicker url="/" name="get" method="get" onSuccess={jest.fn()} onDelete={jest.fn} />
      );
    });

    const inputButtonSpy = jest.spyOn(HTMLInputElement.prototype, 'click');

    await act(() => {
      fireEvent.click(document.querySelector('.alt-file-picker-button'));
    });

    await act(() => {
      fireEvent.click(document.querySelector('.alt-file-tile--upload'));
    });

    expect(inputButtonSpy).toHaveBeenCalled();
  });

  test('has to prepare default file items into inner file items', async () => {
    const ref = { current: null };

    render(
      <FilePicker
        url="/"
        name="get"
        method="get"
        onSuccess={jest.fn()}
        onDelete={jest.fn}
        ref={ref}
        defaultValue={[
          { filename: 'testA.jpg', src: '/path/to/file/testA.jpg' },
          { filename: 'testB.doc', src: '/path/to/file/testB.doc' }
        ]}
      />
    );

    expect(ref.current.files).toStrictEqual([
      {
        filename: 'testA.jpg',
        src: '/path/to/file/testA.jpg',
        filepath: '/path/to/file/testA.jpg'
      },
      { filename: 'testB.doc', src: '/path/to/file/testB.doc', filepath: '/path/to/file/testB.doc' }
    ]);
  });

  test('has to upload files works correctly', async () => {
    const ref = { current: null as FilePickerRef };

    act(() => {
      render(
        <FilePicker
          url="/"
          name="get"
          method="get"
          onSuccess={jest.fn()}
          onDelete={jest.fn}
          ref={ref}
          defaultValue={[
            { filename: 'testA.jpg', src: '/path/to/file/testA.jpg' },
            { filename: 'testB.doc', src: '/path/to/file/testB.doc' }
          ]}
        />
      );
    });

    await act(() => {
      fireEvent.change(ref.current.fileInputElement, {
        target: {
          files: [new File([''], 'testC.png'), new File([''], 'testD.png')]
        }
      });
    });

    await timeout(1000);

    expect(ref.current.files).toHaveLength(4);
  });

  test('has to delete images', async () => {
    window.fetch = jest.fn();
    const ref = { current: null as FilePickerRef };

    act(() => {
      render(
        <FilePicker
          url="/"
          name="get"
          method="get"
          onSuccess={jest.fn()}
          onDelete={jest.fn}
          ref={ref}
          defaultValue={[
            { filename: 'testA.jpg', src: '/path/to/file/testA.jpg' },
            { filename: 'testB.doc', src: '/path/to/file/testB.doc' }
          ]}
        />
      );
    });

    await act(() => {
      fireEvent.click(document.querySelector('.alt-file-picker-button') as HTMLButtonElement);
    });

    await act(() => {
      fireEvent.click(screen.queryAllByTestId('alt-test-fileTile-delete')[0]);
    });

    expect(ref.current.files).toHaveLength(1);
  });
});
