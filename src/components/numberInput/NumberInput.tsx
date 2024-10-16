import { forwardRef, useCallback, useRef } from 'react';
import { NumberInputProps } from './NumberInput.types.ts';
import { TextInput } from 'components/textInput';
import { ArrayUtils } from 'utils';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import { Spinner } from './inner/Spinner.tsx';
import {
  NumberFormatValues,
  NumericFormat,
  OnValueChange,
} from 'react-number-format';
import s from './numberInput.module.scss';
import inputStyles from '../textInput/textInput.module.scss';
import { DOMUtils } from 'utils';
import { useFormField } from '../form/components/Field.tsx';

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      showControls,
      children,
      className,
      style,
      allowNegative = false,
      decimalDelimiter,
      digitsAfterPoint,
      fixedDecimalScale = 0,
      allowLeadingZeros,
      groupingDelimiter,
      value,
      size,
      onChange,
      defaultValue,
      min = 0,
      max,
      invalid,
      name,
      disabled,
      ...restProps
    },
    ref,
  ) => {
    const numberInputRef = useRef<HTMLInputElement | null>(null);

    const { numberInput: numberInputConfig = {}, locale: localeConfig = {} } =
      useConfiguration();

    const {
      name: formFieldName,
      invalid: formFieldInvalid,
      disabled: formFieldDisabled,
      size: formFieldSize,
    } = useFormField();

    const inputName = typeof name === 'string' ? name : formFieldName;
    const inputInvalid =
      typeof invalid === 'boolean' ? invalid : formFieldInvalid;
    const inputDisabled =
      typeof disabled === 'boolean' ? disabled : formFieldDisabled;
    const inputSize = size || formFieldSize;

    const needToShowControl =
      typeof showControls === 'boolean'
        ? showControls
        : typeof numberInputConfig.showControls === 'boolean'
          ? numberInputConfig.showControls
          : true;

    const allowLeadingZerosValue =
      typeof allowLeadingZeros === 'boolean'
        ? allowLeadingZeros
        : numberInputConfig.allowLeadingZeros || false;

    const digitsAfterPointValue =
      typeof digitsAfterPoint === 'number'
        ? digitsAfterPoint
        : numberInputConfig.digitsAfterPoint || 2;

    const groupingDelimiterValue =
      typeof groupingDelimiter === 'string'
        ? groupingDelimiter
        : localeConfig.numberGrouping || ' ';

    const decimalDelimiterValue =
      typeof decimalDelimiter === 'string'
        ? decimalDelimiter
        : localeConfig.numberDecimal || '.';

    const safeChildren = ArrayUtils.getSafeArray(children);

    const cls = clsx(
      inputStyles.Input,
      s.NumberInput,
      {
        [inputStyles.Invalid]: inputInvalid,
      },
      numberInputConfig.className,
      className,
    );
    const styles = {
      ...numberInputConfig.style,
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

    const spinnerChangeValue = (diff: number) => {
      if (numberInputRef.current) {
        DOMUtils.triggerEvent({
          element: numberInputRef.current,
          value: (value || 0) + diff,
          eventType: 'change',
          senderObject: window.HTMLInputElement.prototype,
          propertyName: 'value',
        });
      }
    };

    return (
      <TextInput
        value=""
        onChange={() => null}
        type="text"
        className={cls}
        style={styles}
        size={inputSize}
        name={inputName}
        disabled={inputDisabled}
        invalid={inputInvalid}
        Component={
          <NumericFormat
            {...restProps}
            type="text"
            value={value}
            onValueChange={onValueChange}
            thousandsGroupStyle="thousand"
            thousandSeparator={groupingDelimiterValue}
            className={cls}
            allowLeadingZeros={allowLeadingZerosValue}
            allowNegative={allowNegative}
            decimalSeparator={decimalDelimiterValue}
            decimalScale={digitsAfterPointValue}
            getInputRef={(_ref: HTMLInputElement) => {
              numberInputRef.current = _ref;

              if (typeof ref === 'function') {
                ref(_ref);
              } else if (ref) {
                ref.current = _ref;
              }
            }}
            isAllowed={onAllowedCheck}
          />
        }
      >
        {...safeChildren}
        {needToShowControl ? (
          <TextInput.CustomIsland placement="right">
            <Spinner
              disabled={inputDisabled}
              disabledUp={Boolean(
                typeof max === 'number' && value && value >= max,
              )}
              disabledDown={Boolean(
                typeof min === 'number' && value && (value <= min || !value),
              )}
              onDownClick={() => spinnerChangeValue(-1)}
              onUpClick={() => spinnerChangeValue(1)}
              size={size}
            />
          </TextInput.CustomIsland>
        ) : null}
      </TextInput>
    );
  },
);
