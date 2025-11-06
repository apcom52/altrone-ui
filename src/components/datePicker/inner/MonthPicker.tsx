import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './monthPicker.module.scss';
import dayStyles from './day.module.scss';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerId,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import clsx from 'clsx';
import { useLocalizationContext } from '../../application/useLocalization.tsx';
import { Composite, CompositeItem } from '@floating-ui/react';
import { motion } from 'framer-motion';

export const MonthPicker = memo<{ autoClose?: boolean }>(
  ({ autoClose = true }) => {
    const { picker, currentMonth, setCurrentMonth, setViewMode } =
      useDatePickerViewContext();

    const { selectedDates, onDayClicked, minDate, maxDate } = useDateContext();
    const { language = 'en' } = useLocalizationContext();
    const closePopup = useDatePickerCloseFn();

    const [mouseOverMonth, setMouseOverMonth] = useState<number | null>(null);

    const datePickerId = useDatePickerId();

    const selectedMonth = selectedDates[0];

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      containerRef.current?.focus();
    }, []);

    const onMouseEnter = useCallback((month: number) => {
      setMouseOverMonth(month);
    }, []);

    const onMouseLeave = useCallback(() => {
      setMouseOverMonth(null);
    }, []);

    const months = useMemo(() => {
      const elements = [];

      const onMonthClick = (month: number) => {
        const newDate = currentMonth.set('month', month);
        setCurrentMonth(newDate);

        if (picker === 'month') {
          onDayClicked(newDate);
          if (autoClose) {
            closePopup();
          }
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

        const cls = clsx(dayStyles.Day, s.Month, {
          [s.Selected]: isSelected,
        });

        const thisDate = currentMonth.month(monthIndex);

        const isDateLessThanMin = minDate
          ? thisDate.isBefore(minDate, 'month')
          : false;
        const isDateGreaterThanMax = maxDate
          ? thisDate.isAfter(maxDate, 'month')
          : false;
        const isDateDisabled = isDateLessThanMin || isDateGreaterThanMax;

        elements.push(
          <CompositeItem
            key={`${currentMonth.year()}-${monthIndex}`}
            disabled={isDateDisabled}
            onMouseEnter={() => onMouseEnter(monthIndex)}
            onMouseLeave={() => onMouseLeave()}
            render={(htmlProps) => {
              return (
                <button
                  key={`${currentMonth.year()}-${monthIndex}`}
                  type="button"
                  className={cls}
                  onClick={() => onMonthClick(monthIndex)}
                  data-index={monthIndex}
                  aria-label={thisDate
                    .locale(language.toLowerCase())
                    .format('MMMM YYYY')}
                  {...htmlProps}
                >
                  {mouseOverMonth === monthIndex && (
                    <motion.div
                      layout
                      layoutId={`${datePickerId}-hover-backdrop`}
                      className={dayStyles.Backdrop}
                    />
                  )}
                  {isSelected ? (
                    <div className={dayStyles.SelectedBackdrop} />
                  ) : null}
                  <div className={dayStyles.Number}>
                    {thisDate.locale(language.toLowerCase()).format('MMM')}
                  </div>
                </button>
              );
            }}
          />
        );
      }

      return elements;
    }, [autoClose, currentMonth, mouseOverMonth]);

    return (
      <Composite
        orientation="both"
        cols={3}
        rows={4}
        className={s.MonthCalendar}
        ref={containerRef}
        tabIndex={0}
        loop={false}
      >
        {months}
      </Composite>
    );
  }
);
