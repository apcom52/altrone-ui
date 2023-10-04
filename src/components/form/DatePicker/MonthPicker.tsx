import React, { memo, useMemo, useState } from 'react';
import { Align, Option } from '../../../types';
import { ScrollableSelector } from '../ScrollableSelector';
import { useThemeContext } from '../../../contexts';
import { CalendarProps, DateRangePosition } from './DatePicker.types';
import { date2Number, getMonthFromNumber, numberDate2Year } from './DatePicker.utils';
import { Icon } from '../../typography';
import button from '../Button/Button';

const MONTH_ROWS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11]
];

const MonthPicker = ({
  startSelectedDate,
  endSelectedDate,
  onChange,
  minDate,
  maxDate,
  isDateRange
}: CalendarProps) => {
  const { locale, lang } = useThemeContext();

  const monthNameFormatter = new Intl.DateTimeFormat(lang, {
    month: 'short'
  });

  const todayNumber = date2Number(new Date());
  const minDateNumber = date2Number(minDate);
  const maxDateNumber = date2Number(maxDate);

  const [startYear, setStartYear] = useState(() => {
    if (startSelectedDate) {
      numberDate2Year(startSelectedDate);
    } else {
      if (minDate && todayNumber >= minDateNumber && todayNumber <= maxDateNumber) {
        return numberDate2Year(todayNumber);
      } else {
        return minDateNumber;
      }
    }
  });
  const [endYear, setEndYear] = useState(() =>
    endSelectedDate ? numberDate2Year(endSelectedDate) : undefined
  );

  const monthFormat = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: 'long'
    });
  }, [locale]);

  const currentYear = numberDate2Year(startSelectedDate || 0);

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

  const onSelectYear = (position: DateRangePosition, year: unknown) => {
    // onChange(new Date(Number(year), selectedDate.getMonth(), 1));
  };

  const onSelectMonth = (position: DateRangePosition, month: unknown) => {
    // onChange(new Date(selectedDate.getFullYear(), Number(month), 1));
  };

  const selectedMonth = getMonthFromNumber(startSelectedDate);

  const renderMonth = useMemo(() => {
    return MONTH_ROWS.map((monthRow, monthRowIndex) => (
      <div key={monthRowIndex} className="alt-month-picker-calendar__row">
        <div
          className="alt-month-picker-calendar__highlighter"
          style={{ left: '25%', width: '75%' }}
        />
        {monthRow.map((month) => (
          <button key={month} className="alt-month-picker-calendar__item">
            {monthNameFormatter.format(new Date(2000, month, 1)).replace('.', '')}
          </button>
        ))}
      </div>
    ));
  }, []);

  return (
    <div className="alt-month-picker" data-testid="alt-test-month-picker">
      <div className="alt-month-picker__column">
        <div className="alt-month-picker__header">Start Date</div>
        <div className="alt-month-picker-calendar__header">
          <button>
            <Icon i="arrow_back" />
          </button>
          {startYear}
          <button>
            <Icon i="arrow_forward" />
          </button>
        </div>
        <div className="alt-month-picker-calendar">{renderMonth}</div>
      </div>
      <div className="alt-month-picker__column">
        <div className="alt-month-picker__header">End Date</div>
        <div>{endYear}</div>
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
