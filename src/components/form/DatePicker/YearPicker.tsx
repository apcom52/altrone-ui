import { memo, useCallback, useMemo } from 'react';
import { Option } from '../../../types';
import { ScrollableSelector } from '../ScrollableSelector';
import { CalendarProps } from './DatePicker.types';

const YearPicker = <IsDateRange extends boolean | undefined = false>({
  startSelectedDate,
  endSelectedDate,
  onChange,
  minDate,
  maxDate,
  isDateRange
}: CalendarProps<IsDateRange>) => {
  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();

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

  const restYears = useMemo(() => {
    if (!isDateRange) {
      return [...years];
    }

    const startDateIndex = years.findIndex(
      (year) => year.value === startSelectedDate?.getFullYear()
    );

    if (startDateIndex > -1) {
      return years.slice(startDateIndex + 1);
    }

    return [];
  }, [years, startSelectedDate, isDateRange]);

  const onChangeStartYear = useCallback(
    (year: number | undefined) => {
      if (year) {
        onChange('start', new Date(year, 1, 1));
      }

      if (endSelectedDate && year && endSelectedDate.getFullYear?.() <= year) {
        if (restYears.length) {
          onChange;
        } else {
          onChange('end', undefined);
        }
      }
    },
    [onChange, endSelectedDate, restYears]
  );

  const oChangeEndYear = useCallback(
    (year: number) => {
      console.log('change end', year);
      onChange('end', new Date(year, 1, 1));
    },
    [onChange]
  );

  return (
    <>
      <div className="alt-year-picker" data-testid="alt-test-year-picker">
        <div className="alt-year-picker__column">
          {isDateRange && <div className="alt-year-picker__columnName">Start Year</div>}
          <ScrollableSelector<number | undefined>
            value={startSelectedDate ? startSelectedDate.getFullYear() : undefined}
            options={years}
            onChange={onChangeStartYear}
          />
        </div>
        {isDateRange && (
          <div className="alt-year-picker__column">
            <div className="alt-year-picker__columnName">End Year</div>
            <ScrollableSelector
              disabled={!startSelectedDate}
              value={endSelectedDate?.getFullYear()}
              options={restYears}
              onChange={oChangeEndYear}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(YearPicker);
