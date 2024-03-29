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
import { useLocalization } from '../../../hooks';

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
}: Omit<CalendarProps<IsDateRange>, 'currentMonth'>) => {
  const t = useLocalization();

  const [years, restYears] = useMemo(() => {
    const result: Option<number>[] = [];
    const restResult: Option<number>[] = [];

    const _minDate = dayjs.min(dayjs(minDate), dayjs(maxDate));
    const _maxDate = dayjs.max(dayjs(minDate), dayjs(maxDate));

    let currentYear = _minDate?.startOf('year');
    while (currentYear?.isSameOrBefore(_maxDate, 'year')) {
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
      const selectedDate = dayjs().year(Number(year)).startOf('year');

      if (selectedDate.isSameOrAfter(endSelectedDate, 'year')) {
        const nextSelectedDate = selectedDate.add(1, 'year');

        if (nextSelectedDate.isBefore(maxDate, 'year')) {
          onChange('both', selectedDate, nextSelectedDate);
        } else {
          onChange('both', selectedDate, undefined);
        }
      } else {
        onChange('start', selectedDate);
      }
    },
    [onChange, endSelectedDate, restYears, maxDate]
  );

  const onChangeEndDate = useCallback(
    (year: number | undefined) => {
      const selectedDate = dayjs().year(Number(year)).startOf('year');
      onChange('end', selectedDate);
    },
    [onChange]
  );

  return (
    <>
      <div className="alt-year-picker" data-testid="alt-test-year-picker">
        <div className="alt-year-picker__column" data-testid="alt-test-yearPicker-year1">
          {isDateRange && (
            <div className="alt-year-picker__columnName">{t('form.datePicker.startYear')}</div>
          )}
          <ScrollableSelector<number | undefined>
            value={startSelectedDate?.year()}
            options={years}
            onChange={onChangeStartDate}
          />
        </div>
        {isDateRange && (
          <div className="alt-year-picker__column" data-testid="alt-test-yearPicker-year2">
            <div className="alt-year-picker__columnName">{t('form.datePicker.endYear')}</div>
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
