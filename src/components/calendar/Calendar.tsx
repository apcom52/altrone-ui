import { CalendarProps } from './Calendar.types';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { CalendarDate } from './CalendarDate';
import dayjs from 'dayjs';
import IsBetween from 'dayjs/plugin/isBetween';
import IsToday from 'dayjs/plugin/isToday';
import s from './calendar.module.scss';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

dayjs.extend(IsBetween);
dayjs.extend(IsToday);
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
// dayjs.locale(ruLocale);

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
export const Calendar = memo(
  ({
    month = dayjs(),
    selectedDates = [dayjs()],
    cursorDate,
    onDateChange,
    DateComponent = CalendarDate,
    disabled,
    className,
    style,
    ...restProps
  }: CalendarProps) => {
    const { calendar: calendarConfig = {} } = useConfiguration();

    console.log('>> selected', selectedDates);

    const cls = clsx(s.Calendar, className, calendarConfig.className);

    const styles = {
      ...calendarConfig.style,
      ...style,
    };

    const calendarDates = useMemo(() => {
      const result = [];

      const daysInMonth = month.daysInMonth();
      const firstDay = month.startOf('month');

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
    }, [month]);

    console.log('>> calendarDates', selectedDates);

    const cursorDate_dj = cursorDate ? dayjs(cursorDate) : undefined;

    return (
      <div className={cls} style={styles} {...restProps}>
        {calendarDates.map((date) => {
          const fromAnotherMonth = !date.isSame(month, 'month');
          const isDateSelected = Boolean(
            selectedDates.find((d) => d?.isSame?.(date, 'day')),
          );

          const isCursorHighlighted = cursorDate_dj
            ? date.isSameOrAfter(selectedDates[0]) &&
              date.isSameOrBefore(cursorDate_dj)
            : false;

          return (
            <DateComponent
              key={date.toISOString()}
              weekDay={date.day()}
              currentDate={date}
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
  },
);
