import { CalendarProps, CalendarRenderDateProps } from './Calendar.types';
import './calendar.scss';
import clsx from 'clsx';
import { useMemo } from 'react';
import { makeDateString } from './Calendar.utils';
import { CalendarDate } from './CalendarDate';

export const Calendar = ({
  month = new Date(),
  selectedDates = [new Date()],
  onDateChange,
  DateComponent = CalendarDate,
  disabled,
  className
}: CalendarProps) => {
  const calendarData = useMemo(() => {
    const result: CalendarRenderDateProps[] = [];
    const todayDateString = makeDateString(new Date());
    const selectedStringDates = selectedDates.map((date) => makeDateString(date));

    const currentMonth = month;
    const prevMonthLastDay = new Date(month.getFullYear(), month.getMonth(), 0);
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const getDateObject = (date: Date) => {
      const dateString = makeDateString(date);

      return {
        weekDay: date.getDay(),
        currentDate: date,
        isToday: dateString === todayDateString,
        isAnotherMonth: currentMonth.getMonth() !== date.getMonth(),
        isSelected: selectedStringDates.indexOf(dateString) > -1
      };
    };

    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
      const dayString = makeDateString(currentDate);

      if (day === 1) {
        for (let prevMonthDay = dayOfWeek - 1; prevMonthDay > 0; prevMonthDay--) {
          const prevMonthDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() - 1,
            prevMonthLastDay.getDate() - prevMonthDay + 1
          );

          result.push(getDateObject(prevMonthDate));
        }

        result.push(getDateObject(currentDate));
      } else if (day === lastDay.getDate()) {
        result.push(getDateObject(currentDate));

        for (let nextMonth = 1; nextMonth <= 7 - lastDay.getDay(); nextMonth++) {
          const nextMonthDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            nextMonth
          );

          if (nextMonth === 1 && nextMonthDate.getDay() === 1) {
            break;
          }

          result.push(getDateObject(nextMonthDate));
        }
      } else {
        result.push(getDateObject(currentDate));
      }
    }

    return result;
  }, [month, selectedDates]);

  return (
    <div className={clsx('alt-calendar', className)}>
      {calendarData.map((dateInfo) => (
        <DateComponent key={dateInfo.currentDate.toDateString()} {...dateInfo} />
          onSelect={!disabled ? onDateChange : undefined}
      ))}
    </div>
  );
};
