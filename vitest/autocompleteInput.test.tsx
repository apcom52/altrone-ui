import { render, screen } from '@testing-library/react';
import {
  AltroneApplication,
  AutocompleteInput,
  Configuration,
  TextInput,
} from '../src';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('AutocompleteInput', () => {
  test('need to show islands', () => {
    render(
      <AltroneApplication>
        <AutocompleteInput getSuggestions={() => []} data-testid="combobox">
          <TextInput.TextIsland data-testid="island" label="Text" />
        </AutocompleteInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('combobox')).toBeInTheDocument();
  });

  test('check that custom className and styles works', () => {
    render(
      <AltroneApplication>
        <AutocompleteInput
          getSuggestions={() => []}
          className="cls"
          style={{ color: 'blue' }}
          data-testid="combobox"
        >
          <TextInput.TextIsland data-testid="island" label="Text" />
        </AutocompleteInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('combobox')).toHaveClass('cls');
    expect(screen.getByTestId('combobox')).toHaveStyle('color: blue');
  });

  test('check that configuration works', () => {
    render(
      <AltroneApplication>
        <Configuration
          autocompleteInput={{
            className: 'cls',
            style: { color: 'red' },
          }}
        >
          <AutocompleteInput getSuggestions={() => []} data-testid="combobox" />
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('combobox')).toHaveClass('cls');
    expect(screen.getByTestId('combobox')).toHaveStyle('color: red');
  });
});
