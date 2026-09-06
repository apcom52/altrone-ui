import { memo, useEffect, useMemo, useRef } from 'react';
import s from './yearPicker.module.scss';
import { PickerCell } from './PickerCell.tsx';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { useYearRanges } from '../utils.ts';
import { Composite, CompositeItem } from '@floating-ui/react';

export const YearPicker = memo<{ autoClose?: boolean }>(
  ({ autoClose = true }) => {
    const { picker, currentMonth, setViewMode, setCurrentMonth } =
      useDatePickerViewContext();
    const { selectedDates, onDayClicked, minDate, maxDate } = useDateContext();
    const closePopup = useDatePickerCloseFn();

    const selectedYear = selectedDates[0];
    const [startYear, endYear] = useYearRanges(currentMonth);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      containerRef.current?.focus();
    }, []);

    const years = useMemo(() => {
      const onYearClick = (year: number) => {
        const newDate = currentMonth.set('year', year);
        setCurrentMonth(newDate);

        if (picker === 'year') {
          onDayClicked(newDate);
          if (autoClose) {
            closePopup();
          }
          return;
        }

        setViewMode('month');
      };

      const result = [];
      for (let year = startYear; year <= endYear; year++) {
        const isSelected =
          picker === 'year' &&
          Boolean(selectedYear && selectedYear.year() === year);
        const isDisabled =
          Boolean(minDate && year < minDate.year()) ||
          Boolean(maxDate && year > maxDate.year());

        result.push(
          <CompositeItem
            key={year}
            disabled={isDisabled}
            render={({ onSelect: _onSelect, ...htmlProps }) => (
              <PickerCell
                {...htmlProps}
                label={year}
                selected={isSelected}
                disabled={isDisabled}
                onSelect={() => onYearClick(year)}
                data-index={year}
                aria-label={String(year)}
              />
            )}
          />,
        );
      }
      return result;
    }, [
      autoClose,
      currentMonth,
      picker,
      selectedYear,
      startYear,
      endYear,
      minDate,
      maxDate,
      setCurrentMonth,
      setViewMode,
      onDayClicked,
      closePopup,
    ]);

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
  },
);
