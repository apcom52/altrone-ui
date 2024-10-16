import { Dayjs } from 'dayjs';
import { AnyObject } from '../../utils';
import { TextInputProps } from '../textInput/TextInput.types.ts';

export type Picker = 'day' | 'month' | 'year' | 'range';

export type DateRangePosition = 'start' | 'end' | 'both';

export interface BasicDatePickerProps<ValueType extends AnyObject = any>
  extends Omit<TextInputProps, 'value' | 'onChange'> {
  value?: ValueType;
  onChange?: (value?: ValueType) => void;
  clearable?: boolean;
  format?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export interface DatePickerProps extends BasicDatePickerProps<Dayjs> {}

export interface MonthPickerProps extends BasicDatePickerProps<Dayjs> {}

export interface YearPickerProps extends BasicDatePickerProps<Dayjs> {}

export type RangePickerValue = (Dayjs | undefined)[];

export interface RangePickerProps
  extends BasicDatePickerProps<RangePickerValue> {}

export interface CalendarProps<
  IsDateRange extends boolean | undefined = false,
> {
  currentMonth: Dayjs;
  startSelectedDate?: Dayjs;
  endSelectedDate?: Dayjs;
  onChange: (
    position: DateRangePosition,
    value?: Dayjs,
    extraValue?: Dayjs,
  ) => void;
  minDate: Date;
  maxDate: Date;
  isDateRange: IsDateRange;
  closePopup?: () => void;
}

export interface DatePickerViewContextType {
  viewMode: Picker;
  picker: Picker;
  setViewMode: (picker: Picker) => void;
  currentMonth: Dayjs;
  setCurrentMonth: (month: Dayjs) => void;
  hoveredDate: Dayjs | undefined;
  setHoveredDate: (date: Dayjs | undefined) => void;
}

export interface DatePickerContextType {
  selectedDates: Array<Dayjs>;
  onDayClicked: (selectedDate: Dayjs | undefined) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export interface DatePickerContentProps {
  clearable?: boolean;
}

export interface DatePickerFooterProps {
  clearable?: boolean;
}
