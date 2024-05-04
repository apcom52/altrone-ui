import { CalendarProps, Picker } from '../DatePicker.types.ts';
import { memo } from 'react';
import { Flex } from 'components';
import { Gap } from 'types';
import { DatePickerHeader } from './DatePickerHeader.tsx';
import { DatePickerFooter } from './DatePickerFooter.tsx';
import s from './calendar.module.scss';
import { DayPicker } from './DayPicker.tsx';
import { useDatePickerViewContext } from '../DatePicker.contexts.ts';
import { MonthPicker } from './MonthPicker.tsx';
import { YearPicker } from './YearPicker.tsx';

export const PopoverCalendar = memo<CalendarProps>(({ closePopup }) => {
  const { viewMode } = useDatePickerViewContext();

  return (
    <Flex gap={Gap.large} className={s.Calendar}>
      <DatePickerHeader />
      {viewMode === Picker.day ? <DayPicker /> : null}
      {viewMode === Picker.month ? <MonthPicker /> : null}
      {viewMode === Picker.year ? <YearPicker /> : null}
      <DatePickerFooter />
    </Flex>
  );
});
