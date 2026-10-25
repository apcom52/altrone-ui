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

  test('takes its glyph from the dismiss icon role', () => {
    render(
      <Application icons={{ dismiss: <span data-testid="glyph" /> }}>
        <CloseButton />
      </Application>,
    );

    expect(screen.getByTestId('glyph')).toBeInTheDocument();
  });
});
