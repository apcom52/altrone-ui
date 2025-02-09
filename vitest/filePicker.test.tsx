import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AltroneApplication, Configuration, FilePicker } from '../src';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('FilePicker', () => {
  test('check that custom className and styles works', () => {
    render(
      <AltroneApplication>
        <FilePicker
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
          data-testid="filePicker"
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('filePicker')).toHaveClass('cls');
    expect(screen.getByTestId('filePicker')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );
  });

  test('check that configuration works', () => {
    render(
      <AltroneApplication>
        <Configuration
          filePicker={{
            className: 'cls',
            style: { color: 'red' },
          }}
        >
          <FilePicker data-testid="filePicker" />
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('filePicker')).toHaveClass('cls');
    expect(screen.getByTestId('filePicker')).toHaveStyle(
      'color: rgb(255, 0, 0)',
    );
  });
});
