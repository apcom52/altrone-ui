import { TextInputProps } from '../TextInput';
import { BasicInputProps } from '../BasicInput';
import { Dayjs } from 'dayjs';

export enum Picker {
  day = 'day',
  month = 'month',
  year = 'year'
}

export type DateRangePosition = 'start' | 'end' | 'both';

export type DateValue<IsDateRange extends boolean | undefined = false> = IsDateRange extends true
  ? [Date | undefined, Date | undefined] | undefined
  : Date | undefined;

export interface DatePickerProps<IsDateRange extends boolean | undefined = false>
  extends Pick<
      TextInputProps,
      'errorText' | 'hintText' | 'size' | 'disabled' | 'elevation' | 'surface'
    >,
    BasicInputProps {
  value: DateValue<IsDateRange>;
  onChange: (value: DateValue<IsDateRange>) => void;
  useDateRange?: IsDateRange;
  picker?: Picker;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  clearable?: boolean;
}

export interface CalendarProps<IsDateRange extends boolean | undefined = false> {
  currentMonth: Dayjs;
  startSelectedDate?: Dayjs;
  endSelectedDate?: Dayjs;
  onChange: (position: DateRangePosition, value?: Dayjs, extraValue?: Dayjs) => void;
  minDate: Date;
  maxDate: Date;
  isDateRange: IsDateRange;
}
