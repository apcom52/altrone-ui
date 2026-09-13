import { useCallback } from 'react';
import { NumberInputProps } from './NumberInput.types.ts';
import { TextInput } from 'components/textInput';
import { ArrayUtils } from 'utils';
import clsx from 'clsx';
import {
  NumberFormatValues,
  NumericFormat,
  OnValueChange,
} from 'react-number-format';
import s from './numberInput.module.scss';
import { useFormField } from '../form/components/Field.context.ts';

export const NumberInput = ({
  ref,
  inputRef,
  children,
  className,
  style,
  allowNegative = false,
  decimalDelimiter,
  digitsAfterPoint,
  fixedDecimalScale = false,
  allowLeadingZeros,
  groupingDelimiter,
  value,
  size,
  onChange,
  min = 0,
  max,
  invalid,
  name,
  disabled,
  readOnly,
  ...restProps
}: NumberInputProps) => {
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

  const allowLeadingZerosValue =
    typeof allowLeadingZeros === 'boolean' ? allowLeadingZeros : false;

  const digitsAfterPointValue =
    typeof digitsAfterPoint === 'number' ? digitsAfterPoint : 2;

  const groupingDelimiterValue =
    typeof groupingDelimiter === 'string' ? groupingDelimiter : ' ';

  const decimalDelimiterValue =
    typeof decimalDelimiter === 'string' ? decimalDelimiter : '.';

  const safeChildren = ArrayUtils.getSafeArray(children);

  const cls = clsx(s.NumberInput, className);
  const styles = {
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
    [min, max],
  );

  return (
    <TextInput
      asChild
      ref={ref}
      type="text"
      value={value !== undefined ? String(value) : undefined}
      className={cls}
      style={styles}
      size={inputSize}
      name={inputName}
      disabled={inputDisabled}
      invalid={inputInvalid}
      readOnly={readOnly}
    >
      <NumericFormat
        type="text"
        onValueChange={onValueChange}
        thousandsGroupStyle="thousand"
        thousandSeparator={groupingDelimiterValue}
        allowLeadingZeros={allowLeadingZerosValue}
        allowNegative={allowNegative}
        decimalSeparator={decimalDelimiterValue}
        decimalScale={digitsAfterPointValue}
        fixedDecimalScale={fixedDecimalScale}
        readOnly={readOnly}
        getInputRef={inputRef}
        isAllowed={onAllowedCheck}
        {...restProps}
      />
      {...safeChildren}
    </TextInput>
  );
};
