import { expect, test, describe } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Application, Search, TextInput } from '../src';

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
      <Application>
        <Search
          getSuggestions={() => []}
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
          data-testid="search"
        >
          <TextInput.TextIsland data-testid="island" label="Text" />
        </Search>
      </Application>,
    );

    const wrapper = screen.getByTestId('search').closest('.cls');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('without getSuggestions it never shows the empty suggestions popup', async () => {
    vi.useFakeTimers();

    render(
      <Application>
        <Search value="query" onChange={() => undefined} data-testid="search" />
      </Application>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    fireEvent.focus(screen.getByTestId('search'));
    fireEvent.click(screen.getByTestId('search'));

    expect(screen.queryByText('No data')).toBeNull();
    vi.useRealTimers();
  });
});
