import { TextInputProps } from '../TextInput';
import { BasicInputProps } from '../BasicInput';

export enum Picker {
  day = 'day',
  month = 'month',
  year = 'year'
}

export type DateValue<IsDateRange extends boolean | undefined = false> = IsDateRange extends true
  ? [Date, Date] | undefined
  : Date | undefined;

export interface DatePickerProps<IsDateRange extends boolean | undefined = false>
  extends Pick<
      TextInputProps,
      'errorText' | 'hintText' | 'size' | 'disabled' | 'elevation' | 'surface'
    >,
    BasicInputProps {
  value: DateValue<IsDateRange>;
  onChange: (value: DateValue<IsDateRange>) => void;
  isRange?: IsDateRange;
  picker?: Picker;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  clearable?: boolean;
}

export interface CalendarProps<IsDateRange extends boolean | undefined = false> {
  currentMonth: Date;
  selectedDate: DateValue<IsDateRange>;
  onChange: (value: DateValue<IsDateRange>) => void;
  minDate: Date;
  maxDate: Date;
  isDateRange: IsDateRange;
}
