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
        {currentDate.getDate()}
      </button>
    );
  },
);
