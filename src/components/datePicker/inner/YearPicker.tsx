import { memo, useMemo, useRef } from 'react';
import s from './yearPicker.module.scss';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { useYearRanges } from '../utils.ts';
import clsx from 'clsx';
import { Composite, CompositeItem } from '@floating-ui/react';

export const YearPicker = memo(() => {
  const { picker, currentMonth, setViewMode, setCurrentMonth } =
    useDatePickerViewContext();
  const { selectedDates, onDayClicked, minDate, maxDate } = useDateContext();
  const closePopup = useDatePickerCloseFn();

  const containerRef = useRef<HTMLDivElement>(null);

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

      const isDateLessThanMin = minDate ? year < minDate.year() : false;
      const isDateGreaterThanMax = maxDate ? year > maxDate.year() : false;
      const isDateDisabled = isDateLessThanMin || isDateGreaterThanMax;

      elements.push(
        <CompositeItem
          key={year}
          disabled={isDateDisabled}
          render={(htmlProps) => {
            return (
              <button
                type="button"
                className={cls}
                onClick={() => onYearClick(year)}
                autoFocus={isSelected}
                disabled={isDateDisabled}
                {...htmlProps}
              >
                {year}
              </button>
            );
          }}
        />,
      );
    }

    return elements;
  }, [picker, startYear, endYear, currentMonth]);

  return (
    <Composite
      orientation="both"
      cols={3}
      rows={5}
      className={s.YearPicker}
      ref={containerRef}
      tabIndex={0}
      loop={false}
    >
      {years}
    </Composite>
  );
});
