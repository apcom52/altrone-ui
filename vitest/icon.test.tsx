import { render, screen } from '@testing-library/react';
import { AltroneApplication, Icon } from '../src';

describe('Icon', () => {
  test('check that properties works correctly', () => {
    const { rerender } = render(<Icon i="face" data-testid="icon" />);
    expect(screen.getByText('face')).toBeInTheDocument();

    rerender(<Icon i="face" iconStyle="rounded" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('material-symbols-rounded');

    rerender(<Icon i="face" iconStyle="outlined" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('material-symbols-outlined');

    rerender(<Icon i="face" size={24} data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveStyle('font-size: 24px');
  });

  test('check that custom className and styles works', () => {
    render(
      <Icon
        i="face"
        className="cls"
        style={{ color: 'blue' }}
        data-testid="icon"
      />,
    );
    expect(screen.getByTestId('icon')).toHaveClass('cls');
    expect(screen.getByTestId('icon')).toHaveStyle('color: blue');
  });

  test('check that configuration works', () => {
    render(
      <AltroneApplication
        config={{ icon: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Icon i="check" data-testid="element" />
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
