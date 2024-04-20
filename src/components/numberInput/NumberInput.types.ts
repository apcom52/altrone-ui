import { TextInputProps } from '../textInput/TextInput.types.ts';
import { SyntheticEvent } from 'react';

export interface NumberInputProps
  extends Omit<TextInputProps, 'type' | 'value' | 'onChange'> {
  value?: number;
  onChange: (value?: number, e?: SyntheticEvent<HTMLInputElement>) => void;

  showControl?: boolean;

  allowNegative?: boolean;

  decimalDelimiter?: string;
  digitsAfterPoint?: number;
  fixedDecimalScale?: boolean;
  allowLeadingZeros?: boolean;
  max?: number;
  min?: number;

  groupingDelimiter?: string;
}
