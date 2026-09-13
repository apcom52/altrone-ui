import React from 'react';
import { Dayjs } from 'dayjs';
import { CalendarDateRange } from '../calendar/Calendar.types.ts';
import { AnyObject } from '../../utils';
import { TextInputProps } from '../textInput/TextInput.types.ts';

export type Picker = 'day' | 'month' | 'year' | 'range';

/** Live trigger state, for a custom control passed via `renderFunc` / `asChild`. */
export interface DatePickerTriggerContextType {
  /** `Dayjs` for day/month/year pickers, `(Dayjs | undefined)[]` for `RangePicker`. */
  value: Dayjs | RangePickerValue | undefined;
  /** The formatted string the default `TextInput` trigger would show. */
  displayValue: string;
  /** Whether the calendar popover is open. */
  expanded: boolean;
  disabled: boolean;
  clear: (event?: React.MouseEvent<HTMLElement>) => void;
}

export type DatePickerRenderContext = DatePickerTriggerContextType & {
  className: string;
  style?: React.CSSProperties;
};

export interface BasicDatePickerProps<ValueType extends AnyObject = any>
  extends Omit<TextInputProps, 'value' | 'onChange' | 'ref' | 'children'> {
  ref?: React.Ref<HTMLDivElement>;
  value?: ValueType;
  onChange?: (
    value?: ValueType,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  clearable?: boolean;
  format?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  autoClose?: boolean;

  /**
   * Replaces the default `TextInput` trigger with the element it returns.
   * Receives the live trigger state; the same state is available to any nested
   * component through `useDatePickerTrigger()`.
   *
   * @example
   * renderFunc={({ displayValue, expanded }) => (
   *   <Button label={displayValue || 'Pick a date'}
   *     icon={expanded ? <ChevronUp /> : <CalendarIcon />} />
   * )}
   */
  renderFunc?: (context: DatePickerRenderContext) => React.ReactElement;
  /** Use `children` as the trigger, merging the picker's props onto it. */
  asChild?: boolean;
  children?: React.ReactElement;
}

export interface DatePickerProps extends BasicDatePickerProps<Dayjs> {}

export interface MonthPickerProps extends BasicDatePickerProps<Dayjs> {}

export interface YearPickerProps extends BasicDatePickerProps<Dayjs> {}

export type RangePickerValue = (Dayjs | undefined)[];

export interface RangePickerProps
  extends BasicDatePickerProps<RangePickerValue> {}

export interface DatePickerViewContextType {
  viewMode: Picker;
  picker: Picker;
  setViewMode: (picker: Picker) => void;
  currentMonth: Dayjs;
  setCurrentMonth: (month: Dayjs) => void;
}

export interface DatePickerContextType {
  selectedDates: Array<Dayjs>;
  onDayClicked: (
    selectedDate: Dayjs | undefined,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Range selection from the `Calendar` in `mode="range"` (RangePicker only). */
  onRangeChange?: (
    range: CalendarDateRange,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export interface DatePickerContentProps {
  clearable?: boolean;
  autoClose?: boolean;
}

export interface DatePickerFooterProps {
  clearable?: boolean;
}
