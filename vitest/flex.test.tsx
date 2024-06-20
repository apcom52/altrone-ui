import { render, screen } from '@testing-library/react';
import { Configuration, Flex } from '../src';

describe('Flex', () => {
  test('check that properties works correctly', () => {
    const { rerender } = render(
      <Flex data-testid="flex">
        <div>flex content</div>
      </Flex>,
    );

    expect(screen.getByText('flex content')).toBeInTheDocument();
    expect(screen.getByTestId('flex').tagName).toBe('DIV');

    rerender(
      <Flex tagName="span" data-testid="flex">
        <div>flex content</div>
      </Flex>,
    );

    expect(screen.getByTestId('flex').tagName).toBe('SPAN');
  });

  test('check that custom className and styles works', () => {
    render(
      <Flex className="cls" style={{ fontSize: '20px' }} data-testid="flex">
        <div>flex content</div>
      </Flex>,
    );

    expect(screen.getByTestId('flex')).toHaveClass('cls');
    expect(screen.getByTestId('flex')).toHaveStyle('font-size: 20px');
  });

  test('check that configuration works', () => {
    render(
      <Configuration flex={{ className: 'cls', style: { color: 'blue' } }}>
        <Flex data-testid="element">content</Flex>
      </Configuration>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
