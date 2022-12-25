/// <reference types="react" />
import { TextInputProps } from '../index';
interface NumberInputProps
  extends Omit<TextInputProps, 'value' | 'onChange' | 'step' | 'min' | 'max'> {
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
declare const _default: import('react').MemoExoticComponent<
  ({
    value,
    showControls,
    rightIsland,
    onChange,
    allowNegative,
    allowLeadingZeros,
    decimalSeparator,
    digitsAfterDecimal,
    step,
    min,
    max,
    ...props
  }: NumberInputProps) => JSX.Element
>;
export default _default;
