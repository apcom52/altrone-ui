import { CalendarRenderDateProps } from 'components/calendar/Calendar.types.ts';
import clsx from 'clsx';
import { memo, MouseEventHandler, useCallback } from 'react';
import s from './day.module.scss';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';
import { CompositeItem } from '@floating-ui/react';
import { useLocale } from 'utils';

export const DayButton = memo(
  ({
    currentDate,
    selected,
    fromAnotherMonth,
    today,
    weekDay,
  }: CalendarRenderDateProps) => {
    const { onDayClicked, selectedDates, minDate, maxDate } = useDateContext();
    const { picker, hoveredDate, setHoveredDate } = useDatePickerViewContext();
    const closePopup = useDatePickerCloseFn();

    const locale = useLocale();

    const startDate = selectedDates[0];
    const endDate = selectedDates[1];

    const isBetweenSelectedDates =
      picker === 'range' &&
      startDate &&
      endDate &&
      currentDate.isSameOrAfter(startDate) &&
      currentDate.isSameOrBefore(endDate);

    const isHoverMode = picker === 'range' && startDate && !endDate;

    const isHovered =
      isHoverMode &&
      currentDate.isSameOrAfter(startDate) &&
      currentDate.isSameOrBefore(hoveredDate);

    const onDateClick: MouseEventHandler = () => {
      if (
        picker === 'day' ||
        (picker === 'range' && selectedDates[0] && !selectedDates[1])
      ) {
        closePopup();
      }
      onDayClicked(currentDate);

      // if (picker === 'range') {
      //   const nextSibling = e.currentTarget.nextSibling as HTMLElement;
      //   if (nextSibling) {
      //     nextSibling.focus();
      //   }
      // }
    };

    const isDisabled =
      picker === 'range'
        ? startDate && !endDate && currentDate.isBefore(startDate)
        : minDate && maxDate
          ? !currentDate.isBetween(minDate, maxDate, 'day', '[]')
          : false;

    const isWeekend = weekDay === 0 || weekDay === 6;

    const onMouseEnter = useCallback(() => {
      if (isHoverMode) {
        setHoveredDate(currentDate);
      }
    }, [picker, selectedDates, currentDate]);

    const cls = clsx(s.Day, {
      [s.Weekend]: isWeekend,
      [s.AnotherMonth]: fromAnotherMonth,
      [s.Selected]: selected,
      [s.Today]: today,
      [s.Disabled]: isDisabled,
    });

    const isEndOfRange =
      (selectedDates[1] &&
        selectedDates[1].diff(selectedDates[0], 'day') > 1 &&
        currentDate.isSame(selectedDates[1], 'day')) ||
      Boolean(hoveredDate && currentDate.isSame(hoveredDate, 'day'));

    const dateFormatter = new Intl.DateTimeFormat(locale.locale, {
      day: 'numeric',
      weekday: 'long',
      month: 'long',
      year: 'numeric',
    });

    return (
      <CompositeItem
        disabled={fromAnotherMonth || isDisabled}
        render={(htmlProps) => {
          return (
            <button
              type="button"
              onClick={onDateClick}
              className={cls}
              data-date={currentDate.format('YYYY-MM-DD')}
              data-start-of-week={weekDay === 1 ? 'true' : 'false'}
              data-end-of-week={weekDay === 0 ? 'true' : 'false'}
              data-start-of-range={currentDate.isSame(selectedDates[0], 'day')}
              data-end-of-range={isEndOfRange}
              data-index={currentDate.date()}
              onMouseEnter={onMouseEnter}
              {...htmlProps}
              aria-disabled={fromAnotherMonth || isDisabled}
              aria-label={dateFormatter.format(currentDate.toDate())}
            >
              {(isBetweenSelectedDates || isHovered) && (
                <div className={s.DayBackground} />
              )}
              <div className={s.Number}>{currentDate.date()}</div>
            </button>
          );
        }}
      />
    );
  },
);
