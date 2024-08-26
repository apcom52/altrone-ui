import { CalendarRenderDateProps } from './Calendar.types';
import clsx from 'clsx';
import { memo } from 'react';
import s from './calendar.module.scss';

export const CalendarDate = memo(
  ({
    currentDate,
    fromAnotherMonth,
    today,
    selected,
    disabled,
    onSelect,
  }: CalendarRenderDateProps) => {
    return (
      <button
        type="button"
        data-full-date={currentDate.format('YYYY-MM-DD')}
        data-year={currentDate.year()}
        data-month={currentDate.month()}
        data-date={currentDate.date()}
        data-another-month={!fromAnotherMonth}
        data-today={today}
        data-selected={selected}
        className={clsx(s.Date, {
          [s.ActiveMonth]: !fromAnotherMonth,
          [s.Today]: today,
          [s.Selected]: selected,
          [s.Disabled]: disabled,
        })}
        disabled={fromAnotherMonth || disabled}
        onClick={
          !disabled && !fromAnotherMonth && onSelect
            ? () => onSelect(currentDate)
            : undefined
        }
      >
        {currentDate.date()}
      </button>
    );
  },
);
