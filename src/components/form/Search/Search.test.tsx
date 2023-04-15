import { Search } from './Search';
import { render, screen } from '@testing-library/react';

class ResizeObserver {
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

describe('Form.Search', () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
  });

  test('should search renders correctly', () => {
    render(<Search value="" onChange={() => null} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  test('should placeholder works correctly', () => {});
});
