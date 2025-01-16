import { memo } from 'react';
import { Flex } from 'components/flex';
import { DatePickerHeader } from './DatePickerHeader.tsx';
import { DatePickerFooter } from './DatePickerFooter.tsx';
import s from './calendar.module.scss';
import { DayPicker } from './DayPicker.tsx';
import { useDatePickerViewContext } from '../DatePicker.contexts.ts';
import { MonthPicker } from './MonthPicker.tsx';
import { YearPicker } from './YearPicker.tsx';
import { DatePickerContentProps } from '../DatePicker.types.ts';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';

export const PopoverDatePickerContent = memo<DatePickerContentProps>(
  ({ clearable = false, autoClose = true }) => {
    const { viewMode } = useDatePickerViewContext();
    const { datePicker: datePickerConfig = {} } = useConfiguration();

    const cls = clsx(s.Calendar, datePickerConfig.popoverContentClassName);
    const styles = {
      ...datePickerConfig.popoverContentStyles,
    };

    return (
      <Flex direction="vertical" gap="l" className={cls} style={styles}>
        <DatePickerHeader />
        {viewMode === 'day' ? <DayPicker autoClose={autoClose} /> : null}
        {viewMode === 'month' ? <MonthPicker autoClose={autoClose} /> : null}
        {viewMode === 'year' ? <YearPicker autoClose={autoClose} /> : null}
        <DatePickerFooter clearable={clearable} />
      </Flex>
    );
  },
);
