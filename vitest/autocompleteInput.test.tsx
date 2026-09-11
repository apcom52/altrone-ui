import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Application,
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
      <Application>
        <AutocompleteInput getSuggestions={() => []} data-testid="combobox">
          <TextInput.TextIsland data-testid="island" label="Text" />
        </AutocompleteInput>
      </Application>,
    );

    expect(screen.getByTestId('combobox')).toBeInTheDocument();
  });

  test('check that custom className and styles works', () => {
    render(
      <Application>
        <AutocompleteInput
          getSuggestions={() => []}
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
          data-testid="combobox"
        >
          <TextInput.TextIsland data-testid="island" label="Text" />
        </AutocompleteInput>
      </Application>,
    );

    expect(screen.getByTestId('combobox')).toHaveClass('cls');
    expect(screen.getByTestId('combobox')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that configuration works', () => {
    render(
      <Application>
        <Configuration
          autocompleteInput={{
            className: 'cls',
            style: { color: 'rgb(255, 0, 0)' },
          }}
        >
          <AutocompleteInput getSuggestions={() => []} data-testid="combobox" />
        </Configuration>
      </Application>,
    );

    expect(screen.getByTestId('combobox')).toHaveClass('cls');
    expect(screen.getByTestId('combobox')).toHaveStyle('color: rgb(255, 0, 0)');
  });
});
