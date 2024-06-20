import { render, screen } from '@testing-library/react';
import { Configuration, List } from '../src/components';

describe('Dropdown', () => {
  test('check that render menu correctly', () => {
    expect(false).toBeTruthy();
  });

  test('check that className and style props works', () => {
    expect(false).toBeTruthy();
  });

  test('check that Scrollable configuration works correctly', () => {
    render(
      <Configuration list={{ className: 'cls', style: { color: 'blue' } }}>
        <List data={[]} renderItem={() => <div />} data-testid="element" />
      </Configuration>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
