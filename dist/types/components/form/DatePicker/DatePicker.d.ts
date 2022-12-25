/// <reference types="react" />
import './date-picker.scss';
import { TextInputProps } from '../TextInput';
import { BasicInputProps } from '../BasicInput';
export declare enum Picker {
  day = 'day',
  month = 'month',
  year = 'year'
}
interface DatePickerProps
  extends Pick<TextInputProps, 'errorText' | 'hintText' | 'size' | 'disabled'>,
    BasicInputProps {
  value: Date;
  onChange: (value: Date) => void;
  id?: string;
  picker?: Picker;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
}
declare const _default: import('react').MemoExoticComponent<
  ({
    value,
    onChange,
    id,
    picker,
    minDate,
    maxDate,
    disabled,
    placeholder,
    size,
    hintText,
    errorText,
    className
  }: DatePickerProps) => JSX.Element
>;
export default _default;
