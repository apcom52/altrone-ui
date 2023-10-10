import { CalendarRenderDateProps } from './Calendar.types';
import clsx from 'clsx';

export const CalendarDate = ({
  currentDate,
  fromAnotherMonth,
  today,
  selected,
  disabled,
  onSelect
}: CalendarRenderDateProps) => {
  return (
    <button
      className={clsx('alt-calendar-date', {
        'alt-calendar-date--active-month': !fromAnotherMonth,
        'alt-calendar-date--today': today,
        'alt-calendar-date--selected': selected,
        'alt-calendar-date--disabled': disabled
      })}
      disabled={fromAnotherMonth || disabled}
      onClick={
        !disabled && !fromAnotherMonth && onSelect ? () => onSelect(currentDate) : undefined
      }>
      {currentDate.getDate()}
    </button>
  );
};
