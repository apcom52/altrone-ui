import { memo, useMemo } from 'react';
import s from './yearPicker.module.scss';
import { useDatePickerViewContext } from '../DatePicker.contexts.ts';
import { useYearRanges } from '../utils.ts';
import clsx from 'clsx';
import { Picker } from '../DatePicker.types.ts';

export const YearPicker = memo(() => {
  const { currentMonth, setViewMode, setCurrentMonth } =
    useDatePickerViewContext();
  const [startYear, endYear] = useYearRanges(currentMonth);

  const years = useMemo(() => {
    const elements = [];

    const onYearClick = (year: number) => {
      const newDate = currentMonth.set('year', year);
      setCurrentMonth(newDate);
      setViewMode(Picker.month);
    };

    for (let year = startYear; year <= endYear; year++) {
      const cls = clsx(s.Year, {
        // [s.Selected]: year === currentMonth.year(),
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
  }, [startYear, endYear, currentMonth]);

  return <div className={s.YearPicker}>{years}</div>;
});
