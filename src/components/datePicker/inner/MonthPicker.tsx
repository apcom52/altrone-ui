import { memo, useEffect, useMemo, useRef } from 'react';
import s from './monthPicker.module.scss';
import { PickerCell } from './PickerCell.tsx';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { useLocalizationContext } from '../../application/useLocalization.tsx';
import { Composite, CompositeItem } from '@floating-ui/react';

export const MonthPicker = memo<{ autoClose?: boolean }>(
  ({ autoClose = true }) => {
    const { picker, currentMonth, setCurrentMonth, setViewMode } =
      useDatePickerViewContext();
    const { selectedDates, onDayClicked, minDate, maxDate } = useDateContext();
    const { language = 'en' } = useLocalizationContext();
    const closePopup = useDatePickerCloseFn();

    const selectedMonth = selectedDates[0];
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      containerRef.current?.focus();
    }, []);

    const months = useMemo(() => {
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

        setViewMode('day');
      };

      return Array.from({ length: 12 }, (_, monthIndex) => {
        const thisDate = currentMonth.month(monthIndex);
        const isSelected =
          picker === 'month' &&
          Boolean(selectedMonth && selectedMonth.isSame(thisDate, 'month'));
        const isDisabled =
          Boolean(minDate && thisDate.isBefore(minDate, 'month')) ||
          Boolean(maxDate && thisDate.isAfter(maxDate, 'month'));

        return (
          <CompositeItem
            key={`${currentMonth.year()}-${monthIndex}`}
            disabled={isDisabled}
            render={({ onSelect: _onSelect, ...htmlProps }) => (
              <PickerCell
                {...htmlProps}
                label={thisDate.locale(language.toLowerCase()).format('MMM')}
                selected={isSelected}
                disabled={isDisabled}
                onSelect={() => onMonthClick(monthIndex)}
                data-index={monthIndex}
                aria-label={thisDate
                  .locale(language.toLowerCase())
                  .format('MMMM YYYY')}
              />
            )}
          />
        );
      });
    }, [
      autoClose,
      currentMonth,
      picker,
      selectedMonth,
      minDate,
      maxDate,
      language,
      setCurrentMonth,
      setViewMode,
      onDayClicked,
      closePopup,
    ]);

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
  },
);
