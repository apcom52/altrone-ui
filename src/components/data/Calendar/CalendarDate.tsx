import { CalendarRenderDateProps } from './Calendar.types';
import clsx from 'clsx';

export const CalendarDate = ({
  currentDate,
  isAnotherMonth,
  isToday,
  isSelected
}: CalendarRenderDateProps) => {
  return (
    <div
      className={clsx('alt-calendar-date', {
        'alt-calendar-date--active-month': !isAnotherMonth,
        'alt-calendar-date--today': isToday,
        'alt-calendar-date--selected': isSelected
      })}>
      {currentDate.getDate()}
    </div>
  );
};
