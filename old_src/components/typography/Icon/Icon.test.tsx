import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from './Icon';

describe('Icons.Icon', () => {
  test('should be rendered correctly', () => {
    render(<Icon i="face" />);
    const element = screen.getByText('face');
    expect(element).toBeInTheDocument();
  });

  test('should be rendered with specific style', () => {
    render(<Icon i="face" style="sharp" />);
    const element = screen.getByText('face');
    expect(element).toHaveClass('material-symbols-sharp');
  });
});
