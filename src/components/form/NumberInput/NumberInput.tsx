import { InputIslandType, TextInput } from '../index';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { NumberInputCounter } from './NumberInputCounter';
import { NumberFormatValues, NumericFormat, OnValueChange } from 'react-number-format';
import { Elevation, Surface } from '../../../types';
import clsx from 'clsx';
import { NumberInputProps } from './NumberInput.types';
import { useThemeContext } from '../../../contexts';

const NumberInput = ({
  value = 0,
  showControls = true,
  rightIsland,
  onChange,
  allowNegative = false,
  allowLeadingZeros = false,
  decimalSeparator = ',',
  thousandSeparator = ' ',
  digitsAfterDecimal = 0,
  step = 1,
  min,
  max,
  disabled,
  elevation = Elevation.convex,
  surface = Surface.paper,
  ...props
}: NumberInputProps) => {
  const { options, locale } = useThemeContext();

  const useFormatFromLocale = options.numberInput.useFormatFromLocale;

  const [thousandDelimiter, decimalDelimiter] = useMemo(() => {
    if (!useFormatFromLocale) {
      return [thousandSeparator, decimalSeparator];
    }

    try {
      const number = 1000.125;
      const numberFormatter = new Intl.NumberFormat(locale);
      const numberParts = numberFormatter.formatToParts(number);

      let _thousandSeparator = '';
      let _decimalSeparator = '';

      for (const part of numberParts) {
        if (part.type === 'group') {
          _thousandSeparator = part.value;
        } else if (part.type === 'decimal') {
          _decimalSeparator = part.value;
        }
      }

      return [_thousandSeparator, _decimalSeparator];
    } catch {
      return [thousandSeparator, decimalSeparator];
    }
  }, [useFormatFromLocale, locale, decimalSeparator, thousandSeparator]);

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
    ({ floatValue = 0 }: NumberFormatValues) => {
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

  const onValueChange: OnValueChange = useCallback(
    ({ floatValue }) => {
      onChange(floatValue || 0);
    },
    [onChange]
  );

  return (
    <TextInput
      value={formattedValue}
      onChange={() => null}
      disabled={disabled}
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
                  disabled={disabled}
                />
              )
            }
          : rightIsland
      }
      Component={
        <NumericFormat
          value={value}
          onValueChange={onValueChange}
          thousandSeparator={thousandDelimiter}
          className={clsx('alt-text-input__control', {
            [`alt-text-input__control--elevation-${elevation}`]: elevation,
            [`alt-text-input--surface-${surface}`]: surface !== Surface.paper
          })}
          allowLeadingZeros={allowLeadingZeros}
          allowNegative={allowNegative}
          decimalSeparator={decimalDelimiter}
          decimalScale={digitsAfterDecimal}
          isAllowed={onAllowedCheck}
          disabled={disabled}
        />
      }
      step={(1 / 10 ** digitsAfterDecimal).toString()}
    />
  );
};

export default memo(NumberInput) as typeof NumberInput;
