import { memo } from 'react';
import { MonthPicker, RangePicker, YearPicker } from './components';
import { generatePicker } from './inner/generatePicker.tsx';
import { DatePickerProps } from './DatePicker.types.ts';

const DatePickerComponent = memo(generatePicker<DatePickerProps>('day'));

const DatePickerNamespace = Object.assign(DatePickerComponent, {
  MonthPicker: MonthPicker,
  YearPicker: YearPicker,
  RangePicker: RangePicker,
});

export { DatePickerNamespace as DatePicker };
