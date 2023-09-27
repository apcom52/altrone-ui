import { CalendarProps } from './Calendar';
import { memo, useMemo } from 'react';
import { Option } from '../../../types';
import { ScrollableSelector } from '../ScrollableSelector';

const YearPicker = ({ selectedDate = new Date(), onChange, minDate, maxDate }: CalendarProps) => {
  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();
  console.log('picker ');

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

  const onSelectYear = (year: unknown) => {
    onChange(new Date(Number(year), 1, 1));
  };

  return (
    <div className="alt-year-picker" data-testid="alt-test-year-picker">
      <ScrollableSelector
        value={selectedDate.getFullYear()}
        options={years}
        onChange={onSelectYear}
      />
    </div>
  );
};

export default memo(YearPicker);
