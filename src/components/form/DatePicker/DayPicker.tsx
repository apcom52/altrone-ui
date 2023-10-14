import { useThemeContext } from '../../../contexts';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useWindowSize } from '../../../hooks';
import { CalendarProps } from './DatePicker.types';
import { Calendar, CalendarRenderDateProps } from '../../data';
import './day-picker.scss';
import dayjs, { Dayjs } from 'dayjs';
import { Mouse } from '@testing-library/user-event/system/pointer/mouse';

const DayPickerItem = ({
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
  cursorHighlighted
}: CalendarRenderDateProps & {
  selectedDates: Date[];
  minDate: Date;
  maxDate: Date;
  isDateRange: boolean;
  hoveredDate: Dayjs | undefined;
}) => {
  const date_dj = dayjs(currentDate);

  const isBetweenSelectedDates =
    selectedDates[0] &&
    selectedDates[1] &&
    date_dj.isSameOrAfter(dayjs(selectedDates[0])) &&
    date_dj.isSameOrBefore(dayjs(selectedDates[1]));
  const isDisabled =
    !date_dj.isBetween(minDate, maxDate) ||
    (isDateRange && selectedDates[0] && !selectedDates[1] && date_dj.isBefore(selectedDates[0]));

  const isHoveringMode = selectedDates[0] && !selectedDates[1];

  const isEndOfRange = isHoveringMode
    ? date_dj.isSame(hoveredDate)
    : date_dj.isSame(selectedDates[1], 'day');

  return (
    <button
      onClick={() => {
        onSelect?.(currentDate);
      }}
      className={clsx('alt-day-picker-item', {
        'alt-day-picker-item--selected': selected,
        'alt-day-picker-item--today': today,
        'alt-day-picker-item--another-month': fromAnotherMonth,
        'alt-day-picker-item--disabled': isDisabled
      })}
      data-date={date_dj.format('YYYY-MM-DD')}
      data-start-of-week={weekDay === 1 ? 'true' : 'false'}
      data-end-of-week={weekDay === 0 ? 'true' : 'false'}
      data-start-of-range={date_dj.isSame(selectedDates[0])}
      data-end-of-range={isEndOfRange}
      disabled={isDisabled}>
      {(isBetweenSelectedDates || cursorHighlighted) && (
        <div className="alt-day-picker-item__background" />
      )}
      <div className="alt-day-picker-item__dayNumber">{currentDate.getDate()}</div>
    </button>
  );
};

const DayPicker = <IsDateRange extends boolean | undefined = false>({
  currentMonth,
  startSelectedDate,
  endSelectedDate,
  onChange,
  minDate,
  maxDate,
  isDateRange
}: CalendarProps<IsDateRange>) => {
  const currentDate = useRef<Dayjs | undefined>(undefined);

  const { locale } = useThemeContext();
  const { ltePhoneL } = useWindowSize();
  const [hoveredDate, setHoveredDate] = useState<Dayjs | undefined>(undefined);

  const currentMonthDate = dayjs(currentMonth);

  const selectedDates = useMemo(() => {
    const result = [];

    if (startSelectedDate) {
      result.push(startSelectedDate.toDate());
    }

    if (endSelectedDate) {
      result.push(endSelectedDate.toDate());
    }

    return result;
  }, [startSelectedDate, endSelectedDate]);

  const weekdayDateMap = [
    new Date('2020-01-06T00:00:00.000Z'),
    new Date('2020-01-07T00:00:00.000Z'),
    new Date('2020-01-08T00:00:00.000Z'),
    new Date('2020-01-09T00:00:00.000Z'),
    new Date('2020-01-10T00:00:00.000Z'),
    new Date('2020-01-11T00:00:00.000Z'),
    new Date('2020-01-12T00:00:00.000Z')
  ];

  const weekdayDateFormat = new Intl.DateTimeFormat(locale, {
    weekday: ltePhoneL ? 'narrow' : 'short'
  });

  const onSelectDate = useCallback(
    (date: Date) => {
      const selectedDate = dayjs(date);

      if (!isDateRange) {
        onChange('both', selectedDate, undefined);
        return;
      }

      if (!startSelectedDate) {
        onChange('start', selectedDate);
      } else if (!endSelectedDate) {
        onChange('end', selectedDate);
        setHoveredDate(undefined);
      } else {
        onChange('both', selectedDate, undefined);
      }
    },
    [isDateRange, startSelectedDate, endSelectedDate, onChange]
  );

  const onMouseMove = (e: React.MouseEvent) => {
    const dateElement = (e.target as HTMLDivElement).closest('[data-date]');

    if (!startSelectedDate || endSelectedDate) {
      setHoveredDate(undefined);
      return;
    }

    if (!dateElement) {
      return;
    }

    const hoverDate = dayjs(dateElement.getAttribute('data-date'));
    if (!currentDate.current || !currentDate.current?.isSame(hoverDate, 'day')) {
      currentDate.current = hoverDate;
      setHoveredDate(hoverDate);
    }
  };

  const onMouseLeave = () => {
    setHoveredDate(undefined);
    currentDate.current = undefined;
  };

  if (!currentMonthDate) {
    return null;
  }

  return (
    <div className="alt-day-picker" data-testid="alt-test-calendar">
      <div className="alt-day-picker__weeks">
        {weekdayDateMap.map((day, dayIndex) => (
          <span
            key={dayIndex}
            className={clsx('alt-day-picker__weekday', {
              'alt-day-picker__weekday--weekend': dayIndex > 4
            })}
            data-testid="alt-test-calendar-weekday">
            {weekdayDateFormat.format(day)}
          </span>
        ))}
      </div>
      <div onMouseLeave={onMouseLeave} onMouseMove={isDateRange ? onMouseMove : undefined}>
        <Calendar
          month={currentMonth.toDate()}
          cursorDate={hoveredDate?.toDate()}
          DateComponent={(props) =>
            DayPickerItem({
              ...props,
              selectedDates,
              minDate,
              maxDate,
              isDateRange: !!isDateRange,
              hoveredDate
            })
          }
          selectedDates={selectedDates}
          className="alt-day-picker__calendar"
          onDateChange={onSelectDate}
        />
      </div>
    </div>
  );
};

export default memo(DayPicker);
