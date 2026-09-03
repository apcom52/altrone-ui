import React, { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AltroneApplication, NumberInput, TextInput } from '../src';

describe('NumberInput', () => {
  test('formats the value with the grouping/decimal delimiters', () => {
    render(
      <AltroneApplication>
        <NumberInput
          value={1234567.5}
          onChange={() => null}
          groupingDelimiter=" "
          decimalDelimiter=","
          digitsAfterPoint={2}
          data-testid="number"
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('number')).toHaveValue('1 234 567,5');
  });

  test('renders islands passed as children', () => {
    render(
      <AltroneApplication>
        <NumberInput value={40} onChange={() => null} data-testid="number">
          <TextInput.TextIsland data-testid="island" label="Age" />
        </NumberInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('island')).toBeInTheDocument();
  });

  test('inputRef points at the underlying input', () => {
    const inputRef = createRef<HTMLInputElement>();

    render(
      <AltroneApplication>
        <NumberInput
          value={1}
          onChange={() => null}
          inputRef={inputRef}
          data-testid="number"
        />
      </AltroneApplication>,
    );

    expect(inputRef.current).toBe(screen.getByTestId('number'));
    expect(inputRef.current?.tagName).toBe('INPUT');
  });

  test('readOnly makes the field read-only', () => {
    render(
      <AltroneApplication>
        <NumberInput
          value={1}
          onChange={() => null}
          readOnly
          data-testid="number"
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('number')).toHaveAttribute('readonly');
  });
});
