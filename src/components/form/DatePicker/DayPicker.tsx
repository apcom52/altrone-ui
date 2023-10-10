import { useThemeContext } from '../../../contexts';
import { memo, useMemo } from 'react';
import clsx from 'clsx';
import { useWindowSize } from '../../../hooks';
import { CalendarProps } from './DatePicker.types';
import { date2Number, number2Date, numberDate2Day } from './DatePicker.utils';
import { Calendar, CalendarRenderDateProps } from '../../data/Calendar';
import './day-picker.scss';

const makeDateString = (date = new Date()) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
};

const DayPickerItem = ({
  currentDate,
  selected,
  fromAnotherMonth,
  today
}: CalendarRenderDateProps) => {
  return (
    <button
      className={clsx('alt-day-picker__day', {
        'alt-day-picker__day--selected': selected,
        'alt-day-picker__day--today': today,
        'alt-day-picker__day--another-month': fromAnotherMonth
      })}>
      {currentDate.getDate()}
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
        DateComponent={DayPickerItem}
        className="alt-day-picker__calendar"
      />
    </div>
  );
};

export default memo(DayPicker);
