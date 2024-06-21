import { render, screen } from '@testing-library/react';
import { Configuration, List } from '../src/components';

const ITEMS = [
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
  { name: 'Item 4' },
  { name: 'Item 5' },
];

describe('List', () => {
  test('check that render works correctly', () => {
    render(
      <List
        data={ITEMS}
        renderItem={({ item, currentIndex }) => (
          <div key={currentIndex}>{item.name}</div>
        )}
        data-testid="list"
      />,
    );

    const element = screen.getByTestId('list');
    expect(element.children).toHaveLength(5);
  });

  test('check that skipRule works correctly', () => {
    render(
      <List
        data={ITEMS}
        renderItem={({ item, currentIndex }) => (
          <div key={currentIndex}>{item.name}</div>
        )}
        skipRule={({ currentIndex }) => currentIndex % 2 === 0}
        data-testid="list"
      />,
    );

    const element = screen.getByTestId('list');
    expect(element.children).toHaveLength(3);
  });

  test('check that SeparatorComponent works correctly', () => {
    render(
      <List
        data={ITEMS}
        renderItem={({ item, currentIndex }) => (
          <div key={currentIndex}>{item.name}</div>
        )}
        SeparatorComponent={<hr />}
        data-testid="list"
      />,
    );

    const element = screen.getByTestId('list');
    expect(element.querySelectorAll('hr')).toHaveLength(4);
  });

  test('check that List configuration works correctly', () => {
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
