import { memo, useCallback, useMemo } from 'react';
import { Option } from '../../../types';
import { ScrollableSelector } from '../ScrollableSelector';
import { CalendarProps } from './DatePicker.types';
import dayjs from 'dayjs';
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

    const _minDate = dayjs.min(dayjs(minDate), dayjs(maxDate));
    const _maxDate = dayjs.max(dayjs(minDate), dayjs(maxDate));

    let currentYear = _minDate;
    while (currentYear?.isBefore(_maxDate, 'year')) {
      result.push({
        label: String(currentYear?.year()),
        value: currentYear?.year()
      });

      restResult.push({
        label: String(currentYear?.year()),
        value: currentYear?.year(),
        disabled: currentYear?.isSameOrBefore(startSelectedDate, 'year')
      });

      currentYear = currentYear?.add(1, 'year');
    }

    return [result, restResult];
  }, [minDate, maxDate, startSelectedDate]);

  const onChangeStartDate = useCallback(
    (year: number | undefined) => {
      const selectedDate = dayjs().year(Number(year));

      if (selectedDate.isSameOrAfter(endSelectedDate, 'year')) {
        const nextSelectedDate = selectedDate.add(1, 'year');

        if (nextSelectedDate.isBefore(maxDate, 'year')) {
          console.log('> trigger', selectedDate.toString(), nextSelectedDate.toString());
          onChange('both', selectedDate, nextSelectedDate);
        } else {
          console.log('> trigger', selectedDate.toString(), undefined);
          onChange('both', selectedDate, undefined);
        }
      } else {
        console.log('> trigger', selectedDate);
        onChange('start', selectedDate);
      }
    },
    [onChange, endSelectedDate, restYears, maxDate]
  );

  const onChangeEndDate = useCallback(
    (year: number | undefined) => {
      const selectedDate = dayjs().year(Number(year));
      onChange('end', selectedDate);
    },
    [onChange]
  );

  return (
    <>
      <div className="alt-year-picker" data-testid="alt-test-year-picker">
        <div className="alt-year-picker__column">
          {isDateRange && <div className="alt-year-picker__columnName">Start Year</div>}
          <ScrollableSelector<number | undefined>
            value={startSelectedDate?.year()}
            options={years}
            onChange={onChangeStartDate}
          />
        </div>
        {isDateRange && (
          <div className="alt-year-picker__column">
            <div className="alt-year-picker__columnName">End Year</div>
            <ScrollableSelector
              disabled={!startSelectedDate}
              value={endSelectedDate?.year()}
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
