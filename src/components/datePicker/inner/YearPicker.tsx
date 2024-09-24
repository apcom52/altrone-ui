import { memo, useMemo } from 'react';
import s from './yearPicker.module.scss';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { useYearRanges } from '../utils.ts';
import clsx from 'clsx';

export const YearPicker = memo(() => {
  const { picker, currentMonth, setViewMode, setCurrentMonth } =
    useDatePickerViewContext();
  const { selectedDates, onDayClicked } = useDateContext();
  const closePopup = useDatePickerCloseFn();

  const selectedYear = selectedDates[0];

  const [startYear, endYear] = useYearRanges(currentMonth);

  const years = useMemo(() => {
    const elements = [];

    const onYearClick = (year: number) => {
      const newDate = currentMonth.set('year', year);
      setCurrentMonth(newDate);

      if (picker === 'year') {
        onDayClicked(newDate);
        closePopup();
        return;
      }

      setViewMode('month');
    };

    for (let year = startYear; year <= endYear; year++) {
      const isSelected =
        picker === 'year' &&
        selectedYear &&
        selectedYear.isSame(currentMonth.year(year), 'year');

      const cls = clsx(s.Year, {
        [s.Selected]: isSelected,
      });

      elements.push(
        <button
          key={year}
          type="button"
          className={cls}
          onClick={() => onYearClick(year)}
        >
          {year}
        </button>,
      );
    }

    return elements;
  }, [picker, startYear, endYear, currentMonth]);

  return <div className={s.YearPicker}>{years}</div>;
});
