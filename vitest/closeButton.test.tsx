import React from 'react';
import { expect, test, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Application, CloseButton } from '../src/components';
import { vi } from 'vitest';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('CloseButton', () => {
  test('CloseButton onClick handler', () => {
    const onClick = vi.fn();

    render(<CloseButton data-testid="closeButton" onClick={onClick} />);

    fireEvent.click(screen.getByTestId('closeButton'));
    expect(onClick).toBeCalled();
  });

  test('CloseButton has to apply custom className and id', () => {
    render(
      <CloseButton
        data-testid="closeButton"
        className="cls"
        style={{ color: 'red' }}
      />,
    );

    expect(screen.getByTestId('closeButton')).toHaveClass('cls');
    expect(screen.getByTestId('closeButton')).toHaveStyle(
      'color: rgb(255, 0, 0)',
    );
  });

  test('check that CloseButton configuration works correctly', () => {
    render(
      <Application
        config={{
          closeButton: {
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
          },
        }}
      >
        <CloseButton data-testid="closeButton" />
      </Application>,
    );

    expect(screen.getByTestId('closeButton')).toHaveClass('cls');
    expect(screen.getByTestId('closeButton')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );
  });
});
