import { memo, useMemo } from 'react';
import { Option } from '../../../types';
import { ScrollableSelector } from '../ScrollableSelector';
import { YearPickerProps } from './YearPicker';
import { useThemeContext } from '../../../contexts';
import { Align } from '../../../types/Align';

const MonthPicker = ({
  selectedDate = new Date(),
  onChange,
  minYear,
  maxYear
}: YearPickerProps) => {
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
  }, [monthFormat]);

  const years = useMemo(() => {
    const result: Option<number>[] = [];
    for (let year = minYear; year <= maxYear; year++) {
      result.push({
        label: year.toString(),
        value: year
      });
    }

    return result;
  }, [minYear, maxYear]);

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
