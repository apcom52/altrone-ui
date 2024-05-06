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
import { DatePickerContentProps } from '../DatePicker.types.ts';

export const PopoverDatePickerContent = memo<DatePickerContentProps>(
  ({ clearable = false }) => {
    const { viewMode } = useDatePickerViewContext();

    return (
      <Flex gap={Gap.large} className={s.Calendar}>
        <DatePickerHeader />
        {viewMode === 'day' ? <DayPicker /> : null}
        {viewMode === 'month' ? <MonthPicker /> : null}
        {viewMode === 'year' ? <YearPicker /> : null}
        <DatePickerFooter clearable={clearable} />
      </Flex>
    );
  },
);
