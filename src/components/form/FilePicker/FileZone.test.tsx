/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileZone } from './FileZone';
import { FileItem } from './FilePicker.types';

// eslint-disable @typescript-eslint/ban-ts-comment

describe('Form.FilePicker.FileZone', () => {
  test('has to render the list correctly', () => {
    const files: FileItem[] = [
      { filename: 'test', src: 'test' },
      { filename: 'test2', src: 'test2' },
      { filename: 'test3', src: 'test3' },
      { filename: 'test4', src: 'test4' }
    ];

    render(
      <FileZone
        files={files}
        onUploadClick={jest.fn}
        onDeleteClick={jest.fn()}
        disableUploading={false}
      />
    );

    expect(document.querySelectorAll('.alt-file-tile')).toHaveLength(5);
    expect(document.querySelectorAll('.alt-file-tile')[4]).toHaveClass('alt-file-tile--upload');
  });
});
