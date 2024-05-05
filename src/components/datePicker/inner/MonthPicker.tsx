import { memo, useMemo } from 'react';
import s from './monthPicker.module.scss';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { Picker } from '../DatePicker.types.ts';
import clsx from 'clsx';

export const MonthPicker = memo(() => {
  const { picker, currentMonth, setCurrentMonth, setViewMode } =
    useDatePickerViewContext();

  const { selectedDates, onDayClicked } = useDateContext();
  const closePopup = useDatePickerCloseFn();

  const selectedMonth = selectedDates[0];

  const months = useMemo(() => {
    const elements = [];

    const onMonthClick = (month: number) => {
      const newDate = currentMonth.set('month', month);
      setCurrentMonth(newDate);

      if (picker === 'month') {
        onDayClicked(newDate);
        closePopup();
        return;
      }

      if (picker === 'day' || picker === 'range') {
        setViewMode(Picker.day);
      }
    };

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const isSelected =
        picker === 'month' &&
        selectedMonth.isSame(currentMonth.month(monthIndex), 'month');

      const cls = clsx(s.Month, {
        [s.Selected]: isSelected,
      });

      elements.push(
        <button
          key={`${currentMonth.year()}-${monthIndex}`}
          type="button"
          className={cls}
          onClick={() => onMonthClick(monthIndex)}
        >
          {currentMonth.month(monthIndex).locale('en').format('MMM')}
        </button>,
      );
    }

    return elements;
  }, [currentMonth]);

  return <div className={s.MonthCalendar}>{months}</div>;
});
