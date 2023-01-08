import { memo, useMemo } from 'react';
import { Align, Option } from '../../../types';
import { ScrollableSelector } from '../ScrollableSelector';
import { useThemeContext } from '../../../contexts';
import { CalendarProps } from './Calendar';

const MonthPicker = ({ selectedDate = new Date(), onChange, minDate, maxDate }: CalendarProps) => {
  const { locale } = useThemeContext();

  const monthFormat = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: 'long'
    });
  }, [locale]);

  const currentYear = selectedDate.getFullYear();

  const months = useMemo(() => {
    const result: Option<number>[] = [];

    let startMonth = 0;
    let endMonth = 11;

    if (currentYear <= minDate.getFullYear()) {
      startMonth = minDate.getMonth();
    }

    if (currentYear >= maxDate.getFullYear()) {
      endMonth = maxDate.getMonth();
    }

    for (let month = startMonth; month <= endMonth; month++) {
      result.push({
        label: monthFormat.format(new Date(2000, month, 1)),
        value: month
      });
    }

    return result;
  }, [monthFormat, minDate, maxDate, currentYear]);

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

  const onSelectYear = (year: unknown) => {
    onChange(new Date(Number(year), selectedDate.getMonth(), 1));
  };

  const onSelectMonth = (month: unknown) => {
    onChange(new Date(selectedDate.getFullYear(), Number(month), 1));
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
        value={currentYear}
        align={Align.start}
        options={years}
        onChange={onSelectYear}
      />
    </div>
  );
};

export default memo(MonthPicker);
