import { fireEvent, render, screen } from '@testing-library/react';
import { AltroneApplication, CloseButton } from '../src/components';
import React from 'react';
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
    expect(screen.getByTestId('closeButton')).toHaveStyle('color: red');
  });

  test('check that CloseButton configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          closeButton: {
            className: 'cls',
            style: { color: 'blue' },
          },
        }}
      >
        <CloseButton data-testid="closeButton" />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('closeButton')).toHaveClass('cls');
    expect(screen.getByTestId('closeButton')).toHaveStyle('color: blue');
  });
});
