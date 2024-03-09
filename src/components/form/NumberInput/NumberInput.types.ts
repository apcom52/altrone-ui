import { TextInputProps } from '../TextInput';

export interface NumberInputProps
  extends Omit<
    TextInputProps,
    | 'value'
    | 'onChange'
    | 'step'
    | 'min'
    | 'max'
    | 'ref'
    | 'suggestions'
    | 'useLiveSuggestions'
    | 'loading'
    | 'onFocus'
    | 'onBlur'
  > {
  value: number;
  onChange: (value: number) => void;
  showControls?: boolean;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  decimalSeparator?: string;
  thousandSeparator?: string;
  digitsAfterDecimal?: number;
  step?: number;
  min?: number;
  max?: number;
}
