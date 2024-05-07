import { CalendarRenderDateProps } from '../../../../old_src';
import clsx from 'clsx';
import { memo, useCallback } from 'react';
import s from './day.module.scss';
import {
  useDateContext,
  useDatePickerCloseFn,
  useDatePickerViewContext,
} from '../DatePicker.contexts.ts';

export const DayButton = memo(
  ({
    currentDate,
    selected,
    fromAnotherMonth,
    today,
    onSelect,
    weekDay,
    isDateRange,
    cursorHighlighted,
  }: CalendarRenderDateProps & {
    selectedDates: Date[];
    minDate: Date;
    maxDate: Date;
    isDateRange: boolean;
  }) => {
    const { onDayClicked, selectedDates, minDate, maxDate } = useDateContext();
    const { picker, hoveredDate, setHoveredDate } = useDatePickerViewContext();
    const closePopup = useDatePickerCloseFn();

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

    const onDateClick = () => {
      if (
        picker === 'day' ||
        (picker === 'range' && selectedDates[0] && !selectedDates[1])
      ) {
        closePopup();
      }
      onDayClicked(currentDate);
    };

    const isDisabled =
      picker === 'range'
        ? startDate && !endDate && currentDate.isBefore(startDate)
        : !currentDate.isBetween(minDate, maxDate, 'day', '[]');

    // const isBetweenSelectedDates =
    //   selectedDates[0] &&
    //   selectedDates[1] &&
    //   date_dj.isSameOrAfter(dayjs(selectedDates[0])) &&
    //   date_dj.isSameOrBefore(dayjs(selectedDates[1]));
    //
    // const isDisabled =
    //   !date_dj.isBetween(minDate, maxDate) ||
    //   (isDateRange &&
    //     selectedDates[0] &&
    //     !selectedDates[1] &&
    //     date_dj.isBefore(selectedDates[0]));
    //
    // const isHoveringMode = selectedDates[0] && !selectedDates[1];
    //
    // const isEndOfRange = isHoveringMode
    //   ? date_dj.isSame(hoveredDate)
    //   : date_dj.isSame(selectedDates[1], 'day');

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

    return (
      <button
        onClick={onDateClick}
        className={cls}
        data-date={currentDate.format('YYYY-MM-DD')}
        data-start-of-week={weekDay === 1 ? 'true' : 'false'}
        data-end-of-week={weekDay === 0 ? 'true' : 'false'}
        data-start-of-range={currentDate.isSame(selectedDates[0], 'day')}
        data-end-of-range={isEndOfRange}
        onMouseEnter={onMouseEnter}
        disabled={isDisabled}
        // data-in-range={isBetweenSelectedDates || cursorHighlighted}
        // data-end-of-range={isEndOfRange}
        // disabled={isDisabled}
      >
        {(isBetweenSelectedDates || isHovered) && (
          <div className={s.DayBackground} />
        )}
        <div className={s.Number}>{currentDate.date()}</div>
      </button>
    );
  },
);
