import { render, screen } from '@testing-library/react';
import { Configuration, AltroneApplication, Textarea } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Textarea', () => {
  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Textarea
          data-testid="textarea"
          className="cls"
          style={{ color: 'blue' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('textarea')).toHaveClass('cls');
    expect(screen.getByTestId('textarea')).toHaveStyle('color: blue');
  });

  test('check that Textarea configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          textarea={{ className: 'cls', style: { color: 'blue' } }}
        >
          <Textarea data-testid="textarea" />
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('textarea');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
