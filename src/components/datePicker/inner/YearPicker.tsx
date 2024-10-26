import { memo, useMemo, useRef } from 'react';
import s from './yearPicker.module.scss';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { useYearRanges } from '../utils.ts';
import clsx from 'clsx';
import { useKeyboardSupport } from '../useKeyboardSupport.ts';

export const YearPicker = memo(() => {
  const { picker, currentMonth, setViewMode, setCurrentMonth } =
    useDatePickerViewContext();
  const { selectedDates, onDayClicked } = useDateContext();
  const closePopup = useDatePickerCloseFn();

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedYear = selectedDates[0];

  const [startYear, endYear] = useYearRanges(currentMonth);

  useKeyboardSupport(containerRef, {
    rows: 5,
    columns: 3,
    index: selectedYear.year() - startYear,
    minIndex: 0,
    maxIndex: 14,
  });

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

    let index = 0;

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
          data-index={index++}
        >
          {year}
        </button>,
      );
    }

    return elements;
  }, [picker, startYear, endYear, currentMonth]);

  return (
    <div className={s.YearPicker} ref={containerRef}>
      {years}
    </div>
  );
});
