import { FocusEvent, useCallback, useState } from 'react';
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

function toNumericString(value: string | number | undefined) {
  return value === undefined ? '' : String(value);
}

function parseNumericString(text: string) {
  const parsed = parseFloat(text);
  return Number.isNaN(parsed) ? undefined : parsed;
}

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
  defaultValue,
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

  /**
   * The typed text is kept apart from `value`: "-" and "" both parse to
   * `undefined`, so `value` alone can't tell "the user is typing a minus" from
   * "the field is empty". It's resynced only when `value` really changes.
   */
  const [typedText, setTypedText] = useState(() =>
    toNumericString(value ?? defaultValue),
  );
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    if (value !== parseNumericString(typedText)) {
      setTypedText(toNumericString(value));
    }
  }

  const onValueChange: OnValueChange = useCallback(
    ({ floatValue, value: numericString }, sourceInfo) => {
      if (sourceInfo.source !== 'event') return;
      setTypedText(numericString);
      onChange(floatValue, sourceInfo.event);
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
    const current = parseNumericString(typedText);

    if (current !== undefined) {
      const clamped = Math.min(
        Math.max(current, min ?? -Infinity),
        max ?? Infinity,
      );

      if (clamped !== current) {
        setTypedText(String(clamped));
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
      value={typedText}
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
        valueIsNumericString
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
