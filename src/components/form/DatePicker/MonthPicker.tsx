import { memo, useMemo } from 'react';
import { Align, Option } from '../../../types';
import { ScrollableSelector } from '../ScrollableSelector';
import { useThemeContext } from '../../../contexts';
import { CalendarProps } from './Calendar';

export interface MonthPickerProps extends CalendarProps {
  minDate: Date;
  maxDate: Date;
}

const MonthPicker = ({
  selectedDate = new Date(),
  onChange,
  minDate,
  maxDate
}: MonthPickerProps) => {
  const { locale } = useThemeContext();

  const monthFormat = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: 'long'
    });
  }, [locale]);

  const months = useMemo(() => {
    const result: Option<number>[] = [];
    for (let month = 0; month <= 11; month++) {
      result.push({
        label: monthFormat.format(new Date(2000, month, 1)),
        value: month
      });
    }

    return result;
  }, [monthFormat, minDate, maxDate]);

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

  const onSelectYear = (year) => {
    onChange(new Date(year, selectedDate.getMonth(), 1));
  };

  const onSelectMonth = (month) => {
    onChange(new Date(selectedDate.getFullYear(), month, 1));
  };

  return (
    <div className="alt-month-picker" data-testid="alt-test-month-picker">
      <ScrollableSelector
        value={selectedDate.getMonth()}
        align={Align.end}
        options={months}
        onChange={onSelectMonth}
      />
      <div className="alt-month-picker__separator" />
      <ScrollableSelector
        value={selectedDate.getFullYear()}
        align={Align.start}
        options={years}
        onChange={onSelectYear}
      />
    </div>
  );
};

export default memo(MonthPicker);
