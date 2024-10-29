import { memo, useMemo, useRef } from 'react';
import s from './monthPicker.module.scss';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import clsx from 'clsx';
import { useLocalizationContext } from '../../application/useLocalization.tsx';
import { useKeyboardSupport } from '../useKeyboardSupport.ts';

export const MonthPicker = memo(() => {
  const { picker, currentMonth, setCurrentMonth, setViewMode } =
    useDatePickerViewContext();

  const { selectedDates, onDayClicked } = useDateContext();
  const { language = 'en' } = useLocalizationContext();
  const closePopup = useDatePickerCloseFn();

  const selectedMonth = selectedDates[0];

  const containerRef = useRef<HTMLDivElement>(null);

  useKeyboardSupport(containerRef, {
    rows: 4,
    columns: 3,
    index: selectedMonth.month(),
    minIndex: 0,
    maxIndex: 11,
  });

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
        setViewMode('day');
      }
    };

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const isSelected =
        picker === 'month' &&
        selectedMonth &&
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
          data-index={monthIndex}
        >
          {currentMonth
            .month(monthIndex)
            .locale(language.toLowerCase())
            .format('MMM')}
        </button>,
      );
    }

    return elements;
  }, [currentMonth]);

  return (
    <div className={s.MonthCalendar} ref={containerRef}>
      {months}
    </div>
  );
});
