import React, { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AltroneApplication, FilePicker } from '../src';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

const renderPicker = (ui: React.ReactElement) =>
  render(<AltroneApplication>{ui}</AltroneApplication>);

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
