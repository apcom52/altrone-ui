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
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';

export const PopoverDatePickerContent = memo<DatePickerContentProps>(
  ({ clearable = false }) => {
    const { viewMode } = useDatePickerViewContext();
    const { datePicker: datePickerConfig = {} } = useConfiguration();

    const cls = clsx(s.Calendar, datePickerConfig.popoverContentClassName);
    const styles = {
      ...datePickerConfig.popoverContentStyles,
    };

    return (
      <Flex gap={Gap.large} className={cls} style={styles}>
        <DatePickerHeader />
        {viewMode === 'day' ? <DayPicker /> : null}
        {viewMode === 'month' ? <MonthPicker /> : null}
        {viewMode === 'year' ? <YearPicker /> : null}
        <DatePickerFooter clearable={clearable} />
      </Flex>
    );
  },
);
