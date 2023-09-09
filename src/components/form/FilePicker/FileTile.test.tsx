/* eslint-disable @typescript-eslint/ban-ts-comment */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { FileTile } from './FileTile';
import '@testing-library/jest-dom';
import { FilePickerContext } from './FilePickerContext';
import { getFileSrcFromResponse } from './FilePicker.utils';
import { timeout } from '../../../utils';

// eslint-disable @typescript-eslint/ban-ts-comment

describe('Form.FilePicker.FileTile', () => {
  test('has to render correctly (image file)', () => {
    const { container } = render(
      <FileTile fileIndex={0} file={{ filename: 'name.png', src: '1.png' }} onDelete={() => null} />
    );

    expect(screen.getByTestId('alt-test-fileTile-title')).toHaveTextContent('name.png');
    expect(container.querySelector('.alt-file-icon__image')).toBeInTheDocument();
    expect(container.querySelector('.alt-file-icon__image')).toHaveAttribute('src', '1.png');
  });

  test('has to render correctly (file with icon)', () => {
    render(
      <FileTile fileIndex={0} file={{ filename: 'name.doc', src: '1.doc' }} onDelete={() => null} />
    );

    expect(screen.getByText('description')).toBeInTheDocument();
  });

  test('has to render correctly (file with extension)', () => {
    render(
      <FileTile
        fileIndex={0}
        file={{ filename: 'name.exten', src: '1.exten' }}
        onDelete={() => null}
      />
    );

    expect(screen.getByTestId('alt-test-fileIcon-extension')).toHaveTextContent('.exten');
  });

  test('onDelete has to be called correctly', () => {
    window.fetch = jest.fn();

    const onDelete = jest.fn();

    render(
      <FileTile fileIndex={0} file={{ filename: '1.doc', src: '1.doc' }} onDelete={onDelete} />
    );

    fireEvent.click(screen.getByTestId('alt-test-fileTile-delete'));

    expect(onDelete).toBeCalled();
  });

  test('has to upload files (happy path)', async () => {
    const sendFunc = jest.fn().mockImplementation(function () {
      this?.onload({
        target: {
          status: 200,
          response: 'https://test/file.png'
        }
      });
    });

    let response = '';

    const onSuccess = jest.fn().mockImplementation((resp) => {
      response = resp;
    });

    const xhrMockClass = () => ({
      open: jest.fn(),
      send: sendFunc,
      setRequestHeader: jest.fn(),
      upload: {
        addEventListener: jest.fn()
      }
    });

    // @ts-ignore
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

    window.fetch = jest.fn();

    const file = new File([''], 'test.ext');

    render(
      <FilePickerContext.Provider
        value={{
          url: 'https://google.com',
          method: 'get',
          name: 'file',
          onSuccessUpload: onSuccess,
          getFileNameFunc: getFileSrcFromResponse
        }}>
        <FileTile
          fileIndex={0}
          onDelete={() => null}
          file={{ filename: 'test.ext', src: 'test.ext', file }}
        />
      </FilePickerContext.Provider>
    );

    const progress = document.body.querySelector('.alt-progress');
    expect(progress).toBeInTheDocument();

    await act(async () => await timeout(500));

    expect(document.body.querySelector('.alt-progress')).toHaveClass('alt-progress--success');
    expect(response).toBe('https://test/file.png');

    await act(async () => await timeout(1550));
    expect(document.body.querySelector('.alt-progress')).not.toBeInTheDocument();
  });

  test('has to upload files (failed path)', async () => {
    const sendFunc = jest.fn().mockImplementation(function () {
      this?.onerror();
    });

    const xhrMockClass = () => ({
      open: jest.fn(),
      send: sendFunc,
      setRequestHeader: jest.fn(),
      upload: {
        addEventListener: jest.fn()
      }
    });

    // @ts-ignore
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

    const onSuccess = jest.fn();
    window.fetch = jest.fn();

    const file = new File([''], 'test.ext');

    render(
      <FilePickerContext.Provider
        value={{
          url: 'https://google.com',
          method: 'get',
          name: 'file',
          onSuccessUpload: onSuccess,
          getFileNameFunc: getFileSrcFromResponse
        }}>
        <FileTile
          fileIndex={0}
          onDelete={() => null}
          file={{ filename: 'test.ext', src: 'test.ext', file }}
        />
      </FilePickerContext.Provider>
    );

    const progress = document.body.querySelector('.alt-progress');
    expect(progress).toBeInTheDocument();

    await act(async () => await timeout(500));

    expect(document.body.querySelector('.alt-progress')).toHaveClass('alt-progress--danger');

    expect(screen.getByTestId('alt-test-fileTile-title')).toHaveTextContent(
      'Не удалось загрузить файл'
    );

    fireEvent.click(screen.getByTestId('alt-test-fileTile-reload'));

    expect(sendFunc).toBeCalledTimes(2);
  });
});
