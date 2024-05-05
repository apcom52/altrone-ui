import { memo } from 'react';
import dayjs from 'dayjs';
import ruLocale from 'dayjs/locale/ru.js';
import { MonthPicker, YearPicker } from './components';
import { generatePicker } from './inner/generatePicker.tsx';
import { DatePickerProps } from './DatePicker.types.ts';

dayjs.locale(ruLocale);

const DatePickerComponent = memo(generatePicker<DatePickerProps>('day'));

const DatePickerNamespace = Object.assign(DatePickerComponent, {
  MonthPicker: MonthPicker,
  YearPicker: YearPicker,
  RangePicker: undefined,
});

export { DatePickerNamespace as DatePicker };
