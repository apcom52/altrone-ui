import { CalendarRenderDateProps } from '../../../../old_src';
import dayjs, { Dayjs } from 'dayjs';
import clsx from 'clsx';
import { memo } from 'react';
import s from './day.module.scss';

export const DayButton = memo(
  ({
    currentDate,
    selected,
    fromAnotherMonth,
    today,
    onSelect,
    weekDay,
    selectedDates = [],
    minDate,
    maxDate,
    isDateRange,
    hoveredDate,
    cursorHighlighted,
  }: CalendarRenderDateProps & {
    selectedDates: Date[];
    minDate: Date;
    maxDate: Date;
    isDateRange: boolean;
    hoveredDate: Dayjs | undefined;
  }) => {
    const date_dj = dayjs(currentDate);

    // const isBetweenSelectedDates =
    //   selectedDates[0] &&
    //   selectedDates[1] &&
    //   date_dj.isSameOrAfter(dayjs(selectedDates[0])) &&
    //   date_dj.isSameOrBefore(dayjs(selectedDates[1]));
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

    const cls = clsx(s.Day, {
      [s.Weekend]: isWeekend,
    });

    return (
      <button
        onClick={() => {
          onSelect?.(currentDate);
        }}
        className={cls}
        // className={clsx('alt-day-picker-item', {
        //   'alt-day-picker-item--selected': selected,
        //   'alt-day-picker-item--today': today,
        //   'alt-day-picker-item--another-month': fromAnotherMonth,
        //   'alt-day-picker-item--disabled': isDisabled,
        // })}
        data-date={date_dj.format('YYYY-MM-DD')}
        data-start-of-week={weekDay === 1 ? 'true' : 'false'}
        data-end-of-week={weekDay === 0 ? 'true' : 'false'}
        data-start-of-range={date_dj.isSame(selectedDates[0])}
        // data-in-range={isBetweenSelectedDates || cursorHighlighted}
        // data-end-of-range={isEndOfRange}
        // disabled={isDisabled}
      >
        {/*{(isBetweenSelectedDates || cursorHighlighted) && (*/}
        {/*  <div className="alt-day-picker-item__background" />*/}
        {/*)}*/}
        <div className="alt-day-picker-item__dayNumber">
          {currentDate.getDate()}
        </div>
      </button>
    );
  },
);
