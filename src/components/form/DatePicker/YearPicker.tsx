import { memo, useCallback, useMemo } from 'react';
import { Option } from '../../../types';
import { ScrollableSelector } from '../ScrollableSelector';
import { CalendarProps } from './DatePicker.types';
import { date2Number, numberDate2Year, year2NumberDate } from './DatePicker.utils';

const YearPicker = <IsDateRange extends boolean | undefined = false>({
  startSelectedDate,
  endSelectedDate,
  onChange,
  minDate,
  maxDate,
  isDateRange
}: CalendarProps<IsDateRange>) => {
  const [years, restYears] = useMemo(() => {
    const result: Option<number>[] = [];
    const restResult: Option<number>[] = [];

    const minYear = numberDate2Year(date2Number(minDate));
    const maxYear = numberDate2Year(date2Number(maxDate));

    for (let year = minYear; year <= maxYear; year++) {
      result.push({
        label: year.toString(),
        value: year2NumberDate(year)
      });

      restResult.push({
        label: year.toString(),
        value: year2NumberDate(year),
        disabled: !startSelectedDate || year <= numberDate2Year(startSelectedDate)
      });
    }

    return [result, restResult];
  }, [minDate, maxDate, startSelectedDate]);

  const onChangeStartDate = useCallback(
    (date: number | undefined) => {
      console.log('> checking', date, '<', endSelectedDate);
      if (endSelectedDate && date && endSelectedDate <= date) {
        if (restYears.length) {
          console.log('> set end to', restYears.find((i) => i.value > date)?.value);
          onChange('end', restYears.find((i) => !i.disabled)?.value);
        } else {
          onChange('end', undefined);
        }
      }

      onChange('start', date);
    },
    [onChange, endSelectedDate, restYears]
  );

  const onChangeEndDate = useCallback(
    (date: number | undefined) => {
      onChange('end', date);
    },
    [onChange]
  );

  return (
    <>
      <div className="alt-year-picker" data-testid="alt-test-year-picker">
        <div className="alt-year-picker__column">
          {isDateRange && <div className="alt-year-picker__columnName">Start Year</div>}
          <ScrollableSelector<number | undefined>
            value={startSelectedDate}
            options={years}
            onChange={onChangeStartDate}
          />
        </div>
        {isDateRange && (
          <div className="alt-year-picker__column">
            <div className="alt-year-picker__columnName">End Year</div>
            <ScrollableSelector
              disabled={!startSelectedDate}
              value={endSelectedDate}
              options={restYears}
              onChange={onChangeEndDate}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(YearPicker);
