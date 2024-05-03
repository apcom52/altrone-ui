import { CalendarProps } from '../DatePicker.types.ts';
import { memo } from 'react';
import { Flex } from 'components';
import { Gap } from 'types';
import { DatePickerHeader } from './DatePickerHeader.tsx';
import { DatePickerFooter } from './DatePickerFooter.tsx';
import s from './calendar.module.scss';
import { DayPicker } from './DayPicker.tsx';

export const PopoverCalendar = memo<CalendarProps>(({}) => {
  return (
    <Flex gap={Gap.large} className={s.Calendar}>
      <DatePickerHeader />
      <DayPicker />
      <DatePickerFooter />
    </Flex>
  );
});
