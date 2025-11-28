import { useMemo, useCallback, useEffect } from 'react';
import s from './filtering.module.scss';
import { Select } from 'components/select';
import { TextInput } from 'components/textInput';
import { Button } from 'components/button';
import { FilterRowProps } from '../DataTable.types.ts';
import { NumberInput } from 'components/numberInput';
import clsx from 'clsx';
import { RulesByDataType } from '../DataTable.constants.ts';
import { useLocalization } from '../../application';
import { DatePicker } from 'components/datePicker/DatePicker.tsx';
import { Dayjs } from 'dayjs';
import { dayjs } from '../../calendar';
import { useDataTableCore } from '../DataTable.context.tsx';
import { Trash } from 'lucide-react';
import { Option } from 'components/select/Select.types.ts';

export const FilterRow = ({
  filter,
  changeFilter,
  deleteFilter,
}: FilterRowProps) => {
  const t = useLocalization();

  const table = useDataTableCore();
  const column = table.getColumn(filter.id);
  const filterType = column?.columnDef.filterFn;

  const rules = useMemo(() => {
    return RulesByDataType[filterType].map((item) => ({
      value: item.value,
      label: t(item.label),
    }));
  }, [filterType]);

  const currentRule = filter.value?.rule;
  const currentValue = filter.value?.value;
  const currentAdditionalValue = filter.value?.additionalValue;

  const currentRuleConfig = useMemo(() => {
    return RulesByDataType[filterType].find(
      (item) => item.value === currentRule
    );
  }, [filterType, currentRule]);

  const hasAdditionalValue = currentRuleConfig?.columns >= 2;
  const isDateFilter = filterType === 'date';
  const isNumberFilter = ['number', 'currency'].includes(filterType);
  const isSelectFilter = filterType === 'select';

  // Получаем уникальные значения из данных таблицы для select фильтра
  const selectOptions = useMemo(() => {
    if (!isSelectFilter || !column) return [];

    const uniqueValues = new Set<any>();
    const rows = table.getRowModel().rows;

    rows.forEach((row) => {
      const value = row.getValue(column.id);
      if (value !== null && value !== undefined) {
        // Если значение - массив, добавляем все элементы
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== null && item !== undefined) {
              uniqueValues.add(item);
            }
          });
        } else {
          uniqueValues.add(value);
        }
      }
    });

    // Преобразуем в массив Option
    return Array.from(uniqueValues)
      .sort()
      .map((value) => ({
        value: String(value),
        label: String(value),
      })) as Option[];
  }, [isSelectFilter, column, table]);

  // Получаем level из options колонки
  const level = useMemo(() => {
    if (isDateFilter && column?.columnDef.meta?.options) {
      return (
        (column.columnDef.meta.options as { level?: 'day' | 'month' | 'year' })
          ?.level || 'day'
      );
    }
    return 'day';
  }, [isDateFilter, column]);

  // Устанавливаем level в filterValue при первом рендере
  useEffect(() => {
    if (isDateFilter && filter.value && !filter.value.level) {
      changeFilter('level', level);
    }
  }, [isDateFilter, level, filter.value, changeFilter]);

  // Для дат - преобразуем строки в Dayjs
  const dateValue = useMemo(() => {
    if (!isDateFilter || !currentValue) return undefined;
    if (Array.isArray(currentValue)) {
      return [
        currentValue[0] ? dayjs(currentValue[0]) : undefined,
        currentValue[1] ? dayjs(currentValue[1]) : undefined,
      ] as [Dayjs | undefined, Dayjs | undefined];
    }
    return dayjs(currentValue);
  }, [isDateFilter, currentValue]);

  const handleDateChange = useCallback(
    (value: Dayjs | undefined) => {
      changeFilter('value', value ? value.toISOString() : '');
    },
    [changeFilter]
  );

  const handleDateRangeChange = useCallback(
    (index: 0 | 1) => (value: Dayjs | undefined) => {
      const currentArray = Array.isArray(currentValue)
        ? [...currentValue]
        : ['', ''];
      currentArray[index] = value ? value.toISOString() : '';
      changeFilter('value', currentArray);
    },
    [currentValue, changeFilter]
  );

  const cls = clsx(s.FilterRow, {
    [s.FilterRow_zeroColumns]:
      !currentRuleConfig || currentRuleConfig?.columns === 0,
    [s.FilterRow_twoColumns]: hasAdditionalValue,
  });

  // Выбираем правильный пикер для дат
  const DatePickerComponent = useMemo(() => {
    if (!isDateFilter) return null;
    if (level === 'year') return DatePicker.YearPicker;
    if (level === 'month') return DatePicker.MonthPicker;
    return DatePicker;
  }, [isDateFilter, level]);

  return (
    <div className={cls}>
      <TextInput
        readOnly
        readonlyStyles={true}
        value={column?.columnDef.header() || ''}
      />
      <Select
        value={currentRule}
        placeholder="Choose rule"
        onChange={(rule) => changeFilter('rule', rule)}
        options={rules}
        variant="transparent"
        parentWidth={false}
      />
      {currentRuleConfig?.columns === 1 ? (
        <div data-type="control">
          {isDateFilter && DatePickerComponent ? (
            <DatePickerComponent
              value={dateValue as Dayjs}
              onChange={handleDateChange}
              clearable
              data-filter-name={filter.id}
              data-filter-control="true"
            />
          ) : isSelectFilter ? (
            <Select
              multiple
              value={
                Array.isArray(currentValue)
                  ? currentValue
                  : currentValue
                  ? [currentValue]
                  : []
              }
              onChange={(value) => changeFilter('value', value)}
              options={selectOptions}
              clearable
              data-filter-name={filter.id}
              data-filter-control="true"
            />
          ) : isNumberFilter ? (
            <NumberInput
              value={currentValue}
              onChange={(value) => changeFilter('value', value)}
              data-filter-name={filter.id}
              data-filter-control="true"
            />
          ) : (
            <TextInput
              value={currentValue}
              onChange={(value) => changeFilter('value', value)}
              data-filter-name={filter.id}
              data-filter-control="true"
            />
          )}
        </div>
      ) : null}
      {currentRuleConfig?.columns === 2 ? (
        <>
          {isNumberFilter ? (
            <>
              <NumberInput
                value={Array.isArray(currentValue) ? currentValue[0] : ''}
                onChange={(value) => {
                  const arr = Array.isArray(currentValue)
                    ? [...currentValue]
                    : ['', ''];
                  arr[0] = value;
                  changeFilter('value', arr);
                }}
                data-filter-name={filter.id}
                data-filter-control="true"
                data-filter-control-side="start"
              />
              <NumberInput
                value={Array.isArray(currentValue) ? currentValue[1] : ''}
                onChange={(value) => {
                  const arr = Array.isArray(currentValue)
                    ? [...currentValue]
                    : ['', ''];
                  arr[1] = value;
                  changeFilter('value', arr);
                }}
                data-filter-name={filter.id}
                data-filter-control="true"
                data-filter-control-side="end"
              />
            </>
          ) : isDateFilter && DatePickerComponent ? (
            <>
              <DatePickerComponent
                value={Array.isArray(dateValue) ? dateValue[0] : undefined}
                onChange={handleDateRangeChange(0)}
                maxDate={Array.isArray(dateValue) ? dateValue[1] : undefined}
                placeholder={t('datePicker.startDate') || 'Start date'}
                clearable
                data-filter-name={filter.id}
                data-filter-control="true"
                data-filter-control-side="start"
              />
              <DatePickerComponent
                value={Array.isArray(dateValue) ? dateValue[1] : undefined}
                onChange={handleDateRangeChange(1)}
                minDate={Array.isArray(dateValue) ? dateValue[0] : undefined}
                placeholder={t('datePicker.endDate') || 'End date'}
                clearable
                data-filter-name={filter.id}
                data-filter-control="true"
                data-filter-control-side="end"
              />
            </>
          ) : null}
        </>
      ) : null}

      <Button
        icon={<Trash />}
        label={t('common.delete')}
        onClick={deleteFilter}
        showLabel={false}
      />
    </div>
  );
};
