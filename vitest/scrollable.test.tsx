import { render, screen } from '@testing-library/react';
import { Configuration, List, Scrollable } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Scrollable', () => {
  test('check that render works correctly', () => {
    render(<Scrollable>scroll content</Scrollable>);

    expect(screen.getByText('scroll content')).toBeInTheDocument();
  });

  test('check that className and style props works', () => {
    render(
      <Scrollable
        data-testid="scroll"
        className="cls"
        style={{ fontSize: '18px' }}
      >
        scroll content
      </Scrollable>,
    );

    expect(screen.getByTestId('scroll')).toHaveClass('cls');
    expect(screen.getByTestId('scroll')).toHaveStyle('font-size: 18px');
  });

  test('check that Scrollable configuration works correctly', () => {
    render(
      <Configuration
        scrollable={{ className: 'cls', style: { color: 'blue' } }}
      >
        <Scrollable data-testid="element">scroll content</Scrollable>
      </Configuration>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
