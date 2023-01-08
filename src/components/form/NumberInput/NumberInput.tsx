import { InputIslandType, TextInput, TextInputProps } from '../index';
import { memo, useCallback, useEffect, useState } from 'react';
import NumberInputCounter from './NumberInputCounter';
import { NumericFormat } from 'react-number-format';

interface NumberInputProps
  extends Omit<TextInputProps, 'value' | 'onChange' | 'step' | 'min' | 'max' | 'ref'> {
  value: number;
  onChange: (value: number) => void;
  showControls?: boolean;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  decimalSeparator?: string;
  digitsAfterDecimal?: number;
  step?: number;
  min?: number;
  max?: number;
}

const NumberInput = ({
  value = 0,
  showControls = true,
  rightIsland,
  onChange,
  allowNegative = false,
  allowLeadingZeros = false,
  decimalSeparator = ',',
  digitsAfterDecimal = 0,
  step = 1,
  min,
  max,
  ...props
}: NumberInputProps) => {
  const [formattedValue, setFormattedValue] = useState<string>(() => {
    return value.toFixed(digitsAfterDecimal);
  });

  useEffect(() => {
    setFormattedValue(value.toFixed(digitsAfterDecimal));
  }, [value, digitsAfterDecimal]);

  useEffect(() => {
    if (min !== undefined && value < min) {
      onChange(min);
    }

    if (max !== undefined && value > max) {
      onChange(max);
    }
  }, [min, max, onChange, value]);

  const onAllowedCheck = useCallback(
    ({ floatValue }) => {
      if (min !== undefined && floatValue < min) {
        return false;
      }

      if (max !== undefined && floatValue > max) {
        return false;
      }

      return true;
    },
    [min, max, onChange]
  );

  const onValueChange = useCallback(
    ({ floatValue }) => {
      onChange(floatValue);
    },
    [onChange]
  );

  return (
    <TextInput
      value={formattedValue}
      onChange={() => null}
      {...props}
      rightIsland={
        showControls
          ? {
              type: InputIslandType.components,
              content: (
                <NumberInputCounter
                  value={value}
                  onChange={onChange}
                  step={step}
                  min={min}
                  max={max}
                />
              )
            }
          : rightIsland
      }
      Component={
        <NumericFormat
          value={value}
          onValueChange={onValueChange}
          thousandSeparator=" "
          className="alt-text-input__control"
          allowLeadingZeros={allowLeadingZeros}
          allowNegative={allowNegative}
          decimalSeparator={decimalSeparator}
          decimalScale={digitsAfterDecimal}
          isAllowed={onAllowedCheck}
        />
      }
      step={(1 / 10 ** digitsAfterDecimal).toString()}
    />
  );
};

export default memo(NumberInput);
