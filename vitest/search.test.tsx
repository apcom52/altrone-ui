import { render, screen } from '@testing-library/react';
import { AltroneApplication, Configuration, Search, TextInput } from '../src';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Search', () => {
  test('check that custom className and styles works', () => {
    render(
      <AltroneApplication>
        <Search
          getSuggestions={() => []}
          className="cls"
          style={{ color: 'blue' }}
          data-testid="search"
        >
          <TextInput.TextIsland data-testid="island" label="Text" />
        </Search>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('search')).toHaveClass('cls');
    expect(screen.getByTestId('search')).toHaveStyle('color: blue');
  });

  test('check that configuration works', () => {
    render(
      <AltroneApplication>
        <Configuration
          search={{
            className: 'cls',
            style: { color: 'red' },
          }}
        >
          <Search getSuggestions={() => []} data-testid="search" />
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('search')).toHaveClass('cls');
    expect(screen.getByTestId('search')).toHaveStyle('color: red');
  });
});
