import { memo, useCallback, useMemo, useState } from 'react';
import { useThemeContext } from '../../../contexts';
import { CalendarProps } from './DatePicker.types';
import { Icon } from '../../typography';
import { Button } from '../Button';
import clsx from 'clsx';
import './month-picker.scss';
import dayjs, { Dayjs } from 'dayjs';
import IsBetween from 'dayjs/plugin/isBetween';
import IsToday from 'dayjs/plugin/isToday';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import ruLocale from 'dayjs/locale/ru.js';

dayjs.extend(IsBetween);
dayjs.extend(IsToday);
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
dayjs.locale(ruLocale);

const MonthPicker = <IsDateRange extends boolean | undefined = false>({
  startSelectedDate,
  endSelectedDate,
  onChange,
  minDate,
  maxDate,
  isDateRange
}: CalendarProps<IsDateRange>) => {
  const { lang } = useThemeContext();

  const [currentYear, setCurrentYear] = useState(() => {
    if (dayjs().isBetween(dayjs(minDate), dayjs(maxDate))) {
      return dayjs();
    } else {
      return dayjs(minDate);
    }
  });

  const monthNameFormatter = new Intl.DateTimeFormat(lang, {
    month: 'short'
  });

  const onSelectMonth = useCallback(
    (month: Dayjs) => {
      console.log('select', month);

      if (!isDateRange) {
        onChange('both', month, undefined);
        return;
      }

      if (!startSelectedDate) {
        onChange('start', month);
      } else if (!endSelectedDate) {
        onChange('end', month);
      } else {
        onChange('both', month, undefined);
      }
    },
    [isDateRange, startSelectedDate, endSelectedDate, onChange]
  );

  const onPrevYearClick = useCallback(() => {
    setCurrentYear((old) => old.subtract(1, 'year'));
  }, []);

  const onNextYearClick = useCallback(() => {
    setCurrentYear((old) => old.add(1, 'year'));
  }, []);

  const monthCalendar = useMemo(() => {
    const startOfYear = currentYear.startOf('year');
    const endOfYear = currentYear.endOf('year');

    let currentMonth = startOfYear;

    const result = [];

    while (currentMonth.isSameOrBefore(endOfYear)) {
      const isStart = startSelectedDate?.startOf('month').isSame(currentMonth);
      const isEnd = endSelectedDate?.startOf('month').isSame(currentMonth);
      const isSelected = isStart || isEnd;
      const isHighlighted =
        isDateRange &&
        endSelectedDate &&
        currentMonth.isSameOrAfter(startSelectedDate) &&
        currentMonth.isSameOrBefore(endSelectedDate);
      const isDisabled =
        isDateRange &&
        startSelectedDate &&
        !endSelectedDate &&
        currentMonth.isBefore(startSelectedDate);

      const thisMonth = dayjs(currentMonth);

      result.push(
        <button
          key={currentMonth.month()}
          className={clsx('alt-month-picker-item', {
            'alt-month-picker-item--active': isSelected,
            'alt-month-picker-item--highlighted': isHighlighted,
            'alt-month-picker-item--highlighted-start': isStart,
            'alt-month-picker-item--highlighted-end': isEnd
          })}
          disabled={isDisabled}
          onClick={() => onSelectMonth(thisMonth)}>
          <div className="alt-month-picker-item__monthName">
            {monthNameFormatter.format(currentMonth.toDate()).replace('.', '')}
          </div>
          {isHighlighted && <div className="alt-month-picker-item__background" />}
        </button>
      );

      currentMonth = currentMonth.add(1, 'month');
    }

    return result;
  }, [currentYear, startSelectedDate, endSelectedDate, onSelectMonth, isDateRange]);

  return (
    <div className="alt-month-picker" data-testid="alt-test-month-picker">
      <div className="alt-month-picker__column">
        <div className="alt-month-picker-calendar__header">
          <Button
            className="alt-month-picker-calendar__headerAction"
            onClick={onPrevYearClick}
            isIcon>
            <Icon i="arrow_back" />
          </Button>
          <div className="alt-month-picker-calendar__headerYearLabel">{currentYear.year()}</div>
          <Button
            className="alt-month-picker-calendar__headerAction"
            onClick={onNextYearClick}
            isIcon>
            <Icon i="arrow_forward" />
          </Button>
        </div>
        <div className="alt-month-picker-calendar">{monthCalendar}</div>
      </div>
    </div>
  );
};

export default memo(MonthPicker);
