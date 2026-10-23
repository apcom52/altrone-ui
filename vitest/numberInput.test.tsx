import { createRef, useState } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Application, NumberInput, TextInput } from '../src';
import { NumberInputProps } from '../src/components/numberInput/NumberInput.types';

const ControlledNumberInput = ({
  initial,
  ...props
}: Omit<NumberInputProps, 'onChange'> & { initial?: number }) => {
  const [value, setValue] = useState(initial);
  return (
    <NumberInput
      {...props}
      value={value}
      onChange={setValue}
      data-testid="number"
    />
  );
};

describe('NumberInput', () => {
  test('formats the value with the grouping/decimal delimiters', () => {
    render(
      <Application>
        <NumberInput
          value={1234567.5}
          onChange={() => null}
          groupingDelimiter=" "
          decimalDelimiter=","
          digitsAfterPoint={2}
          data-testid="number"
        />
      </Application>,
    );

    expect(screen.getByTestId('number')).toHaveValue('1 234 567,5');
  });

  test('renders islands passed as children', () => {
    render(
      <Application>
        <NumberInput value={40} onChange={() => null} data-testid="number">
          <TextInput.TextIsland data-testid="island" label="Age" />
        </NumberInput>
      </Application>,
    );

    expect(screen.getByTestId('island')).toBeInTheDocument();
  });

  test('inputRef points at the underlying input', () => {
    const inputRef = createRef<HTMLInputElement>();

    render(
      <Application>
        <NumberInput
          value={1}
          onChange={() => null}
          inputRef={inputRef}
          data-testid="number"
        />
      </Application>,
    );

    expect(inputRef.current).toBe(screen.getByTestId('number'));
    expect(inputRef.current?.tagName).toBe('INPUT');
  });

  test('readOnly makes the field read-only', () => {
    render(
      <Application>
        <NumberInput
          value={1}
          onChange={() => null}
          readOnly
          data-testid="number"
        />
      </Application>,
    );

    expect(screen.getByTestId('number')).toHaveAttribute('readonly');
  });

  test('accepts an intermediate value below `min` while typing', () => {
    render(
      <Application>
        <ControlledNumberInput min={10} />
      </Application>,
    );
    const input = screen.getByTestId('number');

    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.change(input, { target: { value: '15' } });

    expect(input).toHaveValue('15');
  });

  test('clamps an out-of-range value to `min` on blur and still calls the consumer `onBlur`', () => {
    const onBlur = vi.fn();
    render(
      <Application>
        <ControlledNumberInput min={10} onBlur={onBlur} />
      </Application>,
    );
    const input = screen.getByTestId('number');

    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('10');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test('refuses a positive value above `max`, since more digits can only grow it', () => {
    render(
      <Application>
        <ControlledNumberInput initial={5} max={9} />
      </Application>,
    );
    const input = screen.getByTestId('number');

    fireEvent.change(input, { target: { value: '50' } });

    expect(input).toHaveValue('5');
  });

  test('`allowNegative` accepts negative numbers without an explicit `min`', () => {
    render(
      <Application>
        <ControlledNumberInput allowNegative />
      </Application>,
    );
    const input = screen.getByTestId('number');

    fireEvent.change(input, { target: { value: '-42' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('-42');
  });
});
