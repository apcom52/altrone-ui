import { FocusEvent, useCallback, useRef } from 'react';
import { NumberInputProps } from './NumberInput.types.ts';
import { TextInput } from 'components/textInput';
import { ArrayUtils } from 'utils';
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
  min,
  max,
  invalid,
  name,
  disabled,
  readOnly,
  onBlur,
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

  const typedValueRef = useRef(value);

  const onValueChange: OnValueChange = useCallback(
    ({ floatValue }, sourceInfo) => {
      typedValueRef.current = floatValue;
      onChange(floatValue || 0, sourceInfo.event);
    },
    [onChange],
  );

  /**
   * Out-of-range values are allowed while typing — "1" is on the way to "15"
   * with `min={10}`. Refused only once more digits can't bring them back.
   */
  const onAllowedCheck = useCallback(
    ({ floatValue }: NumberFormatValues) => {
      if (floatValue === undefined) return true;
      if (max !== undefined && floatValue > max && floatValue > 0) return false;
      if (min !== undefined && floatValue < min && floatValue < 0) return false;
      return true;
    },
    [min, max],
  );

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const current = value ?? typedValueRef.current;

    if (current !== undefined) {
      const clamped = Math.min(
        Math.max(current, min ?? -Infinity),
        max ?? Infinity,
      );

      if (clamped !== current) {
        typedValueRef.current = clamped;
        onChange(clamped, event);
      }
    }

    onBlur?.(event);
  };

  return (
    <TextInput
      asChild
      ref={ref}
      type="text"
      value={value !== undefined ? String(value) : undefined}
      className={className}
      style={style}
      inputClassName={s.NumberInput}
      size={inputSize}
      name={inputName}
      disabled={inputDisabled}
      invalid={inputInvalid}
      readOnly={readOnly}
      onBlur={handleBlur}
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
