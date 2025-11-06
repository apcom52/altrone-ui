import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './yearPicker.module.scss';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerId,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { useYearRanges } from '../utils.ts';
import clsx from 'clsx';
import { Composite, CompositeItem } from '@floating-ui/react';
import { motion } from 'framer-motion';
import dayStyles from './day.module.scss';

export const YearPicker = memo<{ autoClose?: boolean }>(
  ({ autoClose = true }) => {
    const { picker, currentMonth, setViewMode, setCurrentMonth } =
      useDatePickerViewContext();
    const { selectedDates, onDayClicked, minDate, maxDate } = useDateContext();
    const closePopup = useDatePickerCloseFn();

    const containerRef = useRef<HTMLDivElement>(null);

    const selectedYear = selectedDates[0];

    const [startYear, endYear] = useYearRanges(currentMonth);

    const [mouseOverYear, setMouseOverYear] = useState<number | null>(null);

    const datePickerId = useDatePickerId();

    const onMouseEnter = useCallback((year: number) => {
      setMouseOverYear(year);
    }, []);

    const onMouseLeave = useCallback(() => {
      setMouseOverYear(null);
    }, []);

    useEffect(() => {
      containerRef.current?.focus();
    }, []);

    const years = useMemo(() => {
      const elements = [];

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

      for (let year = startYear; year <= endYear; year++) {
        const isSelected =
          picker === 'year' &&
          selectedYear &&
          selectedYear.isSame(currentMonth.year(year), 'year');

        const cls = clsx(dayStyles.Day, s.Year, {
          [dayStyles.Selected]: isSelected,
        });

        const isDateLessThanMin = minDate ? year < minDate.year() : false;
        const isDateGreaterThanMax = maxDate ? year > maxDate.year() : false;
        const isDateDisabled = isDateLessThanMin || isDateGreaterThanMax;

        elements.push(
          <CompositeItem
            key={year}
            disabled={isDateDisabled}
            onMouseEnter={() => onMouseEnter(year)}
            onMouseLeave={() => onMouseLeave()}
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
                  {mouseOverYear === year && (
                    <motion.div
                      layout
                      layoutId={`${datePickerId}-hover-backdrop`}
                      className={dayStyles.Backdrop}
                    />
                  )}
                  {isSelected ? (
                    <div className={dayStyles.SelectedBackdrop} />
                  ) : null}
                  <div className={dayStyles.Number}>{year}</div>
                </button>
              );
            }}
          />
        );
      }

      return elements;
    }, [picker, startYear, endYear, currentMonth, autoClose, mouseOverYear]);

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
  }
);
