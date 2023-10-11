import { CalendarProps, CalendarRenderDateProps } from './Calendar.types';
import './calendar.scss';
import clsx from 'clsx';
import { useMemo } from 'react';
import { CalendarDate } from './CalendarDate';
import dayjs, { Dayjs } from 'dayjs';
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

  const calendarData = useMemo(() => {
    const result: CalendarRenderDateProps[] = [];

    const firstDay = month_dj.startOf('month');

    const getDateObject = (date: Dayjs): CalendarRenderDateProps => {
      const fromAnotherMonth = !date.isSame(month_dj, 'month');
      const isDateSelected = Boolean(selectedDates_dj.find((d) => d.isSame(date, 'day')));

      return {
        weekDay: date.day(),
        currentDate: date.toDate(),
        today: date.isToday(),
        fromAnotherMonth: fromAnotherMonth,
        selected: isDateSelected,
        disabled: !!disabled
      };
    };

    const daysInMonth = month_dj.daysInMonth();

    let currentDate = firstDay;

    for (let day = 1; day <= daysInMonth; day++) {
      if (day === 1) {
        let startOfWeek = currentDate.startOf('week');

        if (startOfWeek.isBefore(currentDate)) {
          while (startOfWeek.isBefore(currentDate)) {
            result.push(getDateObject(startOfWeek));
            startOfWeek = startOfWeek.add(1, 'day');
          }
        }

        result.push(getDateObject(currentDate));
      } else if (day === daysInMonth) {
        result.push(getDateObject(currentDate));

        const endOfWeek = currentDate.endOf('week');

        if (endOfWeek.isAfter(currentDate)) {
          currentDate = currentDate.add(1, 'day');
          while (currentDate.isBefore(endOfWeek)) {
            result.push(getDateObject(currentDate));
            currentDate = currentDate.add(1, 'day');
          }
        }
      } else {
        result.push(getDateObject(currentDate));
      }

      currentDate = currentDate.add(1, 'day');
    }

    return result;
  }, [month_dj, selectedDates_dj, disabled]);

  return (
    <div className={clsx('alt-calendar', className)}>
      {calendarData.map((dateInfo) => (
        <DateComponent
          key={dateInfo.currentDate.toDateString()}
          {...dateInfo}
          onSelect={!disabled ? onDateChange : undefined}
          disabled={Boolean(disabled)}
        />
      ))}
    </div>
  );
};
