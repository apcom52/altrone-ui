import { forwardRef, useCallback } from 'react';
import { NumberInputProps } from './NumberInput.types.ts';
import { TextInput } from '../textInput';
import { getSafeArray } from '../../utils';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';
import { Spinner } from './inner/Spinner.tsx';
import {
  NumberFormatValues,
  NumericFormat,
  OnValueChange,
} from 'react-number-format';
import s from './numberInput.module.scss';
import inputStyles from '../textInput/textInput.module.scss';

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      showControl,
      children,
      className,
      style,
      allowNegative = false,
      decimalDelimiter = '.',
      digitsAfterPoint = 0,
      fixedDecimalScale = 0,
      allowLeadingZeros = false,
      groupingDelimiter = ' ',
      value,
      size,
      onChange,
      defaultValue,
      min,
      max,
      ...restProps
    },
    ref,
  ) => {
    const { passwordInput: passwordInputConfig = {} } = useConfiguration();

    const needToShowControl =
      typeof showControl === 'boolean'
        ? showControl
        : passwordInputConfig.showControl || true;

    const safeChildren = getSafeArray(children);

    const cls = clsx(
      inputStyles.Input,
      s.NumberInput,
      passwordInputConfig.className,
      className,
    );
    const styles = {
      ...passwordInputConfig.style,
      ...style,
    };

    const onValueChange: OnValueChange = useCallback(
      ({ floatValue }, sourceInfo) => {
        onChange(floatValue || 0, sourceInfo.event);
      },
      [onChange],
    );

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
      [min, max, onChange],
    );

    return (
      <TextInput
        value=""
        onChange={() => null}
        type="text"
        className={cls}
        style={styles}
        size={size}
        Component={
          <NumericFormat
            {...restProps}
            type="text"
            value={value}
            onValueChange={onValueChange}
            thousandsGroupStyle="thousand"
            thousandSeparator={groupingDelimiter}
            className={cls}
            allowLeadingZeros={allowLeadingZeros}
            allowNegative={allowNegative}
            decimalSeparator={decimalDelimiter}
            decimalScale={digitsAfterPoint}
            getInputRef={ref}
            isAllowed={onAllowedCheck}
          />
        }
      >
        {...safeChildren}
        {needToShowControl ? (
          <TextInput.CustomIsland placement="right">
            <Spinner />
          </TextInput.CustomIsland>
        ) : null}
      </TextInput>
    );
  },
);
