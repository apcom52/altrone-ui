import { CalendarProps } from './Calendar.types';
import './calendar.scss';
import clsx from 'clsx';
import { useMemo } from 'react';
import { CalendarDate } from './CalendarDate';
import dayjs from 'dayjs';
import IsBetween from 'dayjs/plugin/isBetween';
import IsToday from 'dayjs/plugin/isToday';
import ruLocale from 'dayjs/locale/ru.js';

dayjs.extend(IsBetween);
dayjs.extend(IsToday);
dayjs.locale(ruLocale);

/**
 * This component is used to show the selected month
 * @param month
 * @param selectedDates
 * @param onDateChange
 * @param DateComponent
 * @param disabled
 * @param className
 * @constructor
 */
export const Calendar = ({
  month = new Date(),
  selectedDates = [new Date()],
  cursorDate,
  onDateChange,
  DateComponent = CalendarDate,
  disabled,
  className
}: CalendarProps) => {
  const month_dj = useMemo(() => {
    return dayjs(month);
  }, [month]);

  const selectedDates_dj = useMemo(() => {
    return selectedDates.map((date) => dayjs(date));
  }, [selectedDates]);

  const calendarDates = useMemo(() => {
    const result = [];

    const daysInMonth = month_dj.daysInMonth();
    const firstDay = month_dj.startOf('month');

    let currentDate = dayjs(firstDay);

    for (let day = 1; day <= daysInMonth; day++) {
      if (day === 1) {
        let startOfWeek = currentDate.startOf('week');

        if (startOfWeek.isBefore(currentDate)) {
          while (startOfWeek.isBefore(currentDate)) {
            result.push(startOfWeek);
            startOfWeek = startOfWeek.add(1, 'day');
          }
        }

        result.push(currentDate);
      } else if (day === daysInMonth) {
        result.push(currentDate);

        const endOfWeek = currentDate.endOf('week');

        if (endOfWeek.isAfter(currentDate)) {
          currentDate = currentDate.add(1, 'day');
          while (currentDate.isBefore(endOfWeek)) {
            result.push(currentDate);
            currentDate = currentDate.add(1, 'day');
          }
        }
      } else {
        result.push(currentDate);
      }

      currentDate = currentDate.add(1, 'day');
    }

    return result;
  }, [month_dj]);

  const cursorDate_dj = cursorDate ? dayjs(cursorDate) : undefined;

  return (
    <div className={clsx('alt-calendar', className)}>
      {calendarDates.map((date) => {
        const fromAnotherMonth = !date.isSame(month_dj, 'month');
        const isDateSelected = Boolean(selectedDates_dj.find((d) => d.isSame(date, 'day')));

        const isCursorHighlighted = cursorDate_dj
          ? date.isSameOrAfter(selectedDates_dj[0]) && date.isSameOrBefore(cursorDate_dj)
          : false;

        return (
          <DateComponent
            key={date.toISOString()}
            weekDay={date.day()}
            currentDate={date.toDate()}
            fromAnotherMonth={fromAnotherMonth}
            today={date.isToday()}
            selected={isDateSelected}
            cursorHighlighted={isCursorHighlighted}
            onSelect={onDateChange}
            disabled={Boolean(disabled)}
          />
        );
      })}
    </div>
  );
};
