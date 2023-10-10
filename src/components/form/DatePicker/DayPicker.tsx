import { useThemeContext } from '../../../contexts';
import { memo, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useWindowSize } from '../../../hooks';
import { CalendarProps } from './DatePicker.types';
import { date2Number, number2Date } from './DatePicker.utils';
import { Calendar, CalendarRenderDateProps } from '../../data/Calendar';
import './day-picker.scss';

const DayPickerItem = ({
  currentDate,
  selected,
  fromAnotherMonth,
  today,
  onSelect,
  weekDay,
  selectedDates = []
}: CalendarRenderDateProps & { selectedDates: (number | undefined)[] }) => {
  const currentDateNumber = date2Number(currentDate);
  const isBetweenSelectedDates =
    selectedDates[0] &&
    selectedDates[1] &&
    currentDateNumber >= selectedDates[0] &&
    currentDateNumber <= selectedDates[1];

  return (
    <button
      onClick={onSelect ? () => onSelect(currentDate) : undefined}
      className={clsx('alt-day-picker-item', {
        'alt-day-picker-item--selected': selected,
        'alt-day-picker-item--today': today,
        'alt-day-picker-item--another-month': fromAnotherMonth,
        'alt-day-picker-item--between-selected': isBetweenSelectedDates
      })}
      data-start-of-week={weekDay === 1 ? 'true' : 'false'}
      data-end-of-week={weekDay === 0 ? 'true' : 'false'}
      data-start-of-range={currentDateNumber === selectedDates[0]}
      data-end-of-range={currentDateNumber === selectedDates[1]}>
      {isBetweenSelectedDates && <div className="alt-day-picker-item__background" />}
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
  const { locale } = useThemeContext();
  const { ltePhoneL } = useWindowSize();

  const currentMonthDate = number2Date(currentMonth);

  const selectedDates = useMemo(() => {
    const result = [];

    if (startSelectedDate) {
      result.push(number2Date(startSelectedDate) as Date);
    }

    if (endSelectedDate) {
      result.push(number2Date(endSelectedDate) as Date);
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

  const onSelectMonth = useCallback(
    (date: Date) => {
      const dateNumber = date2Number(date);

      if (!isDateRange) {
        onChange('start', dateNumber);
        onChange('end', undefined);
        return;
      }

      if (!startSelectedDate) {
        onChange('start', dateNumber);
      } else if (!endSelectedDate) {
        onChange('end', dateNumber);
      } else {
        onChange('end', undefined);
        onChange('start', dateNumber);
      }
    },
    [isDateRange, startSelectedDate, endSelectedDate, onChange]
  );

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
      <Calendar
        month={currentMonthDate}
        DateComponent={(props) =>
          DayPickerItem({ ...props, selectedDates: [startSelectedDate, endSelectedDate] })
        }
        selectedDates={selectedDates}
        className="alt-day-picker__calendar"
        onDateChange={onSelectMonth}
      />
    </div>
  );
};

export default memo(DayPicker);
