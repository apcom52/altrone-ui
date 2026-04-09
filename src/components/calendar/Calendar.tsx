import { CalendarProps } from './Calendar.types';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { CalendarDate } from './CalendarDate';
import { dayjsInstance as dayjs } from 'utils';
import type { Dayjs } from 'dayjs';
import s from './calendar.module.scss';

export const Calendar = memo(
  ({
    ref,
    month = dayjs(),
    selectedDates = [dayjs()],
    cursorDate,
    onDateChange,
    DateComponent = CalendarDate,
    disabled,
    firstDayOfWeek = 'sunday',
    className,
    style,
    ...restProps
  }: CalendarProps) => {
    const cls = clsx(s.Calendar, className);

    const styles = {
      ...style,
    };

    // Returns the start-of-week day respecting firstDayOfWeek setting
    const getStartOfWeek = (date: Dayjs): Dayjs => {
      if (firstDayOfWeek === 'monday') {
        const day = date.day(); // 0=Sun, 1=Mon … 6=Sat
        const diff = day === 0 ? -6 : 1 - day;
        return date.add(diff, 'day').startOf('day');
      }
      return date.startOf('week');
    };

    // Returns the end-of-week day respecting firstDayOfWeek setting
    const getEndOfWeek = (date: Dayjs): Dayjs => {
      if (firstDayOfWeek === 'monday') {
        const day = date.day();
        const diff = day === 0 ? 0 : 7 - day;
        return date.add(diff, 'day').startOf('day');
      }
      return date.endOf('week').startOf('day');
    };

    const calendarDates = useMemo(() => {
      const result: Dayjs[] = [];

      const monthLocale = month.locale('en-US');
      const daysInMonth = monthLocale.daysInMonth();
      const firstDay = monthLocale.startOf('month');

      let currentDate = dayjs(firstDay);

      for (let day = 1; day <= daysInMonth; day++) {
        if (day === 1) {
          // Prepend days from the previous month to fill the first week row
          let prefillDate = getStartOfWeek(currentDate);
          while (prefillDate.isBefore(currentDate, 'day')) {
            result.push(prefillDate);
            prefillDate = prefillDate.add(1, 'day');
          }
          result.push(currentDate);
        } else if (day === daysInMonth) {
          result.push(currentDate);

          // Append days from the next month to fill the last week row
          const endOfWeek = getEndOfWeek(currentDate);
          let fillDate = currentDate.add(1, 'day');
          while (!fillDate.isAfter(endOfWeek, 'day')) {
            result.push(fillDate);
            fillDate = fillDate.add(1, 'day');
          }
        } else {
          result.push(currentDate);
        }

        currentDate = currentDate.add(1, 'day');
      }

      return result;
    }, [month, firstDayOfWeek]);

    const cursorDate_dj = cursorDate ? dayjs(cursorDate) : undefined;

    return (
      <div ref={ref} className={cls} style={styles} {...restProps}>
        {calendarDates.map((date) => {
          const fromAnotherMonth = !date.isSame(month, 'month');
          const isDateSelected = Boolean(
            selectedDates.find((d) => d?.isSame?.(date, 'day')),
          );

          // Highlight range in both directions: cursor can be before or after selectedDates[0]
          const isCursorHighlighted =
            cursorDate_dj && selectedDates[0]
              ? (date.isSameOrAfter(selectedDates[0], 'day') &&
                  date.isSameOrBefore(cursorDate_dj, 'day')) ||
                (date.isSameOrBefore(selectedDates[0], 'day') &&
                  date.isSameOrAfter(cursorDate_dj, 'day'))
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
