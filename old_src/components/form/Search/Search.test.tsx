import { Search } from './Search';
import '@testing-library/jest-dom';
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

    const searchbox = screen.getByRole('searchbox');
    expect(searchbox).toBeInTheDocument();
  });

  test('should placeholder works correctly', () => {
    render(<Search value="" onChange={() => null} placeholder="Type to search" />);
    expect(screen.getByText('Type to search')).toBeInTheDocument();
  });
});
