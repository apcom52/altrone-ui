import React, { memo, useCallback, useMemo } from 'react';
import { Option } from '../../../types';
import { useThemeContext } from '../../../contexts';
import { CalendarProps } from './DatePicker.types';
import {
  date2Number,
  getMonthFromNumber,
  numberDate2Year,
  numberDate2YearAndMonth,
  ONE_MONTH,
  ONE_YEAR
} from './DatePicker.utils';
import { Icon } from '../../typography';
import { Button } from '../Button';
import { useStateInRange } from '../../../hooks/useStateInRange/useStateInRange';
import clsx from 'clsx';
import './month-picker.scss';

const MONTH_ROWS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11]
];

const MonthPicker = <IsDateRange extends boolean | undefined = false>({
  startSelectedDate,
  endSelectedDate,
  onChange,
  minDate,
  maxDate,
  isDateRange
}: CalendarProps<IsDateRange>) => {
  const { lang } = useThemeContext();

  const minDateNumber = date2Number(minDate);
  const maxDateNumber = date2Number(maxDate);

  console.log(
    '>> default',
    numberDate2Year(startSelectedDate),
    numberDate2Year(date2Number(new Date()))
  );

  const [currentYear, setCurrentYear] = useStateInRange(
    numberDate2Year(minDateNumber),
    numberDate2Year(maxDateNumber),
    numberDate2Year(startSelectedDate) || numberDate2Year(date2Number(new Date()))
  );

  const startSelectedMonth = numberDate2YearAndMonth(startSelectedDate);
  const endSelectedMonth = numberDate2YearAndMonth(endSelectedDate);

  console.log('start', startSelectedMonth, 'end', endSelectedMonth);

  const monthNameFormatter = new Intl.DateTimeFormat(lang, {
    month: 'short'
  });

  const onSelectMonth = useCallback(
    (monthValue: number) => {
      console.log('clicked on', monthValue);
      if (!startSelectedMonth) {
        onChange('start', monthValue);
      } else if (!endSelectedMonth) {
        onChange('end', monthValue);
      } else {
        onChange('end', undefined);
        onChange('start', monthValue);
      }
    },
    [isDateRange, startSelectedMonth, endSelectedMonth, onChange]
  );

  // const [startMonths, endMonths] = useMemo(() => {
  //   const startResult: Option<number>[] = [];
  //   const endResult: Option<number>[] = [];
  //
  //   let startMonth;
  //   let endMonth;
  //
  //   if (startSelectedDate && startSelectedDate <= minDate.getFullYear()) {
  //     startMonth = getMonthFromNumber(startSelectedDate);
  //   }
  //
  //   if (currentYear >= maxDate.getFullYear()) {
  //     endMonth = maxDate.getMonth();
  //   }
  //
  //   for (let month = startMonth; month <= endMonth; month++) {
  //     result.push({
  //       label: monthFormat.format(new Date(2000, month, 1)),
  //       value: 50 * month
  //     });
  //   }
  //
  //   return result;
  // }, [monthFormat, minDate, maxDate, currentYear]);
  //
  const years = useMemo(() => {
    const result: Option<number>[] = [];
    for (let year = minDate.getFullYear(); year <= maxDate.getFullYear(); year++) {
      result.push({
        label: year.toString(),
        value: year
      });
    }

    return result;
  }, [minDate, maxDate]);

  const onPrevMonthClick = useCallback(() => {
    setCurrentYear(currentYear - 1);
  }, [currentYear]);

  const onNextMonthClick = useCallback(() => {
    setCurrentYear(currentYear + 1);
  }, [currentYear]);

  const selectedMonth = getMonthFromNumber(startSelectedDate);

  return (
    <div className="alt-month-picker" data-testid="alt-test-month-picker">
      <div className="alt-month-picker__column">
        <div className="alt-month-picker-calendar__header">
          <Button
            className="alt-month-picker-calendar__headerAction"
            onClick={onPrevMonthClick}
            isIcon>
            <Icon i="arrow_back" />
          </Button>
          <div className="alt-month-picker-calendar__headerYearLabel">{currentYear}</div>
          <Button
            className="alt-month-picker-calendar__headerAction"
            onClick={onNextMonthClick}
            isIcon>
            <Icon i="arrow_forward" />
          </Button>
        </div>
        <div className="alt-month-picker-calendar">
          {MONTH_ROWS.map((monthRow, monthRowIndex) => (
            <div key={monthRowIndex} className="alt-month-picker-calendar__row">
              {monthRow.map((month) => {
                const monthValue = currentYear * ONE_YEAR + month * ONE_MONTH;
                const isSelected =
                  monthValue === startSelectedMonth || monthValue === endSelectedMonth;
                const isHighlighted =
                  startSelectedMonth &&
                  endSelectedMonth &&
                  monthValue >= startSelectedMonth &&
                  monthValue <= endSelectedMonth;

                return (
                  <button
                    key={month}
                    className={clsx('alt-month-picker-item', {
                      'alt-month-picker-item--active': isSelected,
                      'alt-month-picker-item--highlighted': isHighlighted,
                      'alt-month-picker-item--highlighted-start': monthValue === startSelectedMonth,
                      'alt-month-picker-item--highlighted-end': monthValue === endSelectedMonth
                    })}
                    onClick={() => onSelectMonth(monthValue)}>
                    <div className="alt-month-picker-item__monthName">
                      {monthNameFormatter.format(new Date(2000, month, 1)).replace('.', '')}
                    </div>
                    {isHighlighted && <div className="alt-month-picker-item__background" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="alt-month-picker" data-testid="alt-test-month-picker">
  //     <div className="alt-month-picker__column">
  //       <div className="alt-month-picker__header">Start Date</div>
  //       <div className="alt-month-picker__selector">
  //         <ScrollableSelector
  //           value={selectedMonth}
  //           align={Align.end}
  //           options={months}
  //           onChange={onSelectMonth}
  //         />
  //         <div className="alt-month-picker__separator" />
  //         <ScrollableSelector
  //           value={currentYear}
  //           align={Align.start}
  //           options={years}
  //           onChange={onSelectYear}
  //         />
  //       </div>
  //     </div>
  //     <div className="alt-month-picker__column">
  //       <div className="alt-month-picker__header">End Date</div>
  //       <div className="alt-month-picker__selector">
  //         <ScrollableSelector
  //           value={selectedMonth}
  //           align={Align.end}
  //           options={months}
  //           onChange={onSelectMonth}
  //         />
  //         <div className="alt-month-picker__separator" />
  //         <ScrollableSelector
  //           value={currentYear}
  //           align={Align.start}
  //           options={years}
  //           onChange={onSelectYear}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default memo(MonthPicker);
