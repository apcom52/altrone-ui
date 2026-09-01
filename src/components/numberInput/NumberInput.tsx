import { useCallback, useMemo, useRef } from 'react';
import { NumberInputProps } from './NumberInput.types.ts';
import { TextInput } from 'components/textInput';
import { ArrayUtils, mergeRefs, useShowControls } from 'utils';
import clsx from 'clsx';
import { Spinner } from './inner/Spinner.tsx';
import {
  NumberFormatValues,
  NumericFormat,
  OnValueChange,
} from 'react-number-format';
import s from './numberInput.module.scss';
import { DOMUtils } from 'utils';
import { useFormField } from '../form/components/Field.context.ts';

export const NumberInput = ({
  ref,
  showControls,
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
  const numberInputRef = useRef<HTMLInputElement | null>(null);
  const mergedInputRef = useMemo(() => mergeRefs(numberInputRef, ref), [ref]);

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

  const needToShowControl = useShowControls({
    propValue: showControls,
    readOnly,
  });

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

  const spinnerChangeValue = useCallback(
    (diff: number) => {
      if (numberInputRef.current) {
        DOMUtils.triggerEvent({
          element: numberInputRef.current,
          value: (value || 0) + diff,
          eventType: 'change',
          senderObject: HTMLInputElement.prototype,
          propertyName: 'value',
        });
      }
    },
    [value],
  );

  return (
    <TextInput
      asChild
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
        readOnly={readOnly}
        getInputRef={mergedInputRef}
        isAllowed={onAllowedCheck}
        {...restProps}
      />
      {safeChildren}
      {needToShowControl ? (
        <TextInput.CustomIsland placement="end">
          <Spinner
            disabled={inputDisabled}
            disabledUp={Boolean(
              typeof max === 'number' && value && value >= max,
            )}
            disabledDown={
              typeof min === 'number' && value !== undefined && value <= min
            }
            onDownClick={() => spinnerChangeValue(-1)}
            onUpClick={() => spinnerChangeValue(1)}
            size={inputSize}
          />
        </TextInput.CustomIsland>
      ) : null}
    </TextInput>
  );
};
