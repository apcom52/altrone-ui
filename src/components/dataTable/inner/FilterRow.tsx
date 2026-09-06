import { useCallback, useEffect, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import { Trash } from 'lucide-react';
import { Select } from 'components/select';
import { TextInput } from 'components/textInput';
import { NumberInput } from 'components/numberInput';
import { Button } from 'components/button';
import { DatePicker } from 'components/datePicker/DatePicker.tsx';
import { Option } from 'components/select/Select.types.ts';
import { useLocalization } from '../../application';
import { dayjs } from '../../calendar';
import { useDataTableContext } from '../DataTable.context.tsx';
import { FilterRowProps } from '../DataTable.types.ts';
import { RulesByDataType } from '../DataTable.constants.ts';
import s from './filtering.module.scss';

export const FilterRow = ({
  filter,
  changeFilter,
  deleteFilter,
}: FilterRowProps) => {
  const t = useLocalization();

  const { table } = useDataTableContext();
  const column = table.getColumn(filter.id);
  const meta = column?.columnDef.meta;
  const dataType = meta?.dataType;

  const rules = useMemo(() => {
    const rulesData = dataType ? RulesByDataType[dataType] : undefined;
    if (!rulesData) return [];
    return rulesData.map((item) => ({ value: item.value, label: t(item.label) }));
  }, [dataType, t]);

  const currentRule = filter.value?.rule;
  const currentValue = filter.value?.value;

  const currentRuleConfig = useMemo(() => {
    const rulesData = dataType ? RulesByDataType[dataType] : undefined;
    return rulesData?.find((item) => item.value === currentRule);
  }, [dataType, currentRule]);

  const columnCount = currentRuleConfig?.columns ?? 0;
  const isDateFilter = dataType === 'date';
  const isNumberFilter = dataType === 'number' || dataType === 'currency';
  const isSelectFilter = dataType === 'select';
  const isColorFilter = dataType === 'color';

  const selectOptions = useMemo<Option[]>(() => {
    if (!isSelectFilter || !column) return [];

    const uniqueValues = new Set<unknown>();
    table.getPreFilteredRowModel().rows.forEach((row) => {
      const value = row.getValue(column.id);
      if (value === null || value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== null && item !== undefined) uniqueValues.add(item);
        });
      } else {
        uniqueValues.add(value);
      }
    });

    return Array.from(uniqueValues)
      .sort()
      .map((value) => ({ value: String(value), label: String(value) }));
  }, [isSelectFilter, column, table]);

  const colorOptions = useMemo<Option[]>(() => {
    if (!isColorFilter) return [];
    const presets =
      (meta?.options as { colorPresets?: string[] } | undefined)?.colorPresets ??
      [];
    return presets.map((color) => ({ value: color, label: color }));
  }, [isColorFilter, meta]);

  const level = filter.value?.level ?? 'day';

  useEffect(() => {
    if (isDateFilter && !filter.value?.level) {
      changeFilter('level', level);
    }
  }, [isDateFilter, level, filter.value?.level, changeFilter]);

  const dateValue = useMemo(() => {
    if (!isDateFilter || !currentValue) return undefined;
    if (Array.isArray(currentValue)) {
      return [
        currentValue[0] ? dayjs(currentValue[0]) : undefined,
        currentValue[1] ? dayjs(currentValue[1]) : undefined,
      ] as [Dayjs | undefined, Dayjs | undefined];
    }
    return dayjs(currentValue as string);
  }, [isDateFilter, currentValue]);

  const handleDateChange = useCallback(
    (value: Dayjs | undefined) => {
      changeFilter('value', value ? value.toISOString() : '');
    },
    [changeFilter],
  );

  const handleDateRangeChange = useCallback(
    (index: 0 | 1) => (value: Dayjs | undefined) => {
      const next = Array.isArray(currentValue) ? [...currentValue] : ['', ''];
      next[index] = value ? value.toISOString() : '';
      changeFilter('value', next);
    },
    [currentValue, changeFilter],
  );

  const handleRangePickerChange = useCallback(
    (value?: (Dayjs | undefined)[]) => {
      changeFilter('value', [
        value?.[0] ? value[0].toISOString() : '',
        value?.[1] ? value[1].toISOString() : '',
      ]);
    },
    [changeFilter],
  );

  const DatePickerComponent = useMemo(() => {
    if (!isDateFilter) return null;
    if (level === 'year') return DatePicker.YearPicker;
    if (level === 'month') return DatePicker.MonthPicker;
    return DatePicker;
  }, [isDateFilter, level]);

  const asArray = (value: unknown): unknown[] =>
    Array.isArray(value) ? value : value ? [value] : [];

  const singleControl = () => {
    if (isDateFilter && DatePickerComponent) {
      return (
        <DatePickerComponent
          value={dateValue as Dayjs}
          onChange={handleDateChange}
          clearable
          data-filter-name={filter.id}
          data-filter-control="true"
        />
      );
    }
    if (isSelectFilter || isColorFilter) {
      return (
        <Select
          multiple
          value={asArray(currentValue) as string[]}
          onChange={(value) => changeFilter('value', value)}
          options={isColorFilter ? colorOptions : selectOptions}
          clearable
          data-filter-name={filter.id}
          data-filter-control="true"
        />
      );
    }
    if (isNumberFilter) {
      return (
        <NumberInput
          value={currentValue as number}
          onChange={(value) => changeFilter('value', value)}
          data-filter-name={filter.id}
          data-filter-control="true"
        />
      );
    }
    return (
      <TextInput
        value={(currentValue as string) ?? ''}
        onChange={(value) => changeFilter('value', value)}
        data-filter-name={filter.id}
        data-filter-control="true"
      />
    );
  };

  const pairControl = () => {
    if (isNumberFilter) {
      return (
        <div className={s.ControlPair}>
          {([0, 1] as const).map((index) => (
            <NumberInput
              key={index}
              value={
                Array.isArray(currentValue)
                  ? (currentValue[index] as number)
                  : undefined
              }
              onChange={(value) => {
                const next = Array.isArray(currentValue)
                  ? [...currentValue]
                  : ['', ''];
                next[index] = value;
                changeFilter('value', next);
              }}
              data-filter-name={filter.id}
              data-filter-control="true"
              data-filter-control-side={index === 0 ? 'start' : 'end'}
            />
          ))}
        </div>
      );
    }
    if (isDateFilter && level === 'day') {
      return (
        <DatePicker.RangePicker
          value={Array.isArray(dateValue) ? dateValue : undefined}
          onChange={handleRangePickerChange}
          clearable
          data-filter-name={filter.id}
          data-filter-control="true"
        />
      );
    }
    if (isDateFilter && DatePickerComponent) {
      return (
        <div className={s.ControlPair}>
          <DatePickerComponent
            value={Array.isArray(dateValue) ? dateValue[0] : undefined}
            onChange={handleDateRangeChange(0)}
            maxDate={Array.isArray(dateValue) ? dateValue[1] : undefined}
            placeholder={t('datePicker.startDate')}
            clearable
            data-filter-name={filter.id}
            data-filter-control="true"
            data-filter-control-side="start"
          />
          <DatePickerComponent
            value={Array.isArray(dateValue) ? dateValue[1] : undefined}
            onChange={handleDateRangeChange(1)}
            minDate={Array.isArray(dateValue) ? dateValue[0] : undefined}
            placeholder={t('datePicker.endDate')}
            clearable
            data-filter-name={filter.id}
            data-filter-control="true"
            data-filter-control-side="end"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={s.FilterRow}>
      <TextInput
        readOnly
        readonlyStyles
        value={column ? String(column.id) : ''}
      />
      <Select
        value={currentRule}
        placeholder={t('dataTable.chooseRule')}
        onChange={(rule) => changeFilter('rule', rule)}
        options={rules}
        transparent
        parentWidth={false}
      />
      <div className={s.ControlCell}>
        {columnCount === 1 ? singleControl() : null}
        {columnCount === 2 ? pairControl() : null}
      </div>
      <Button
        icon={<Trash />}
        label={t('common.delete')}
        onClick={deleteFilter}
        showLabel={false}
      />
    </div>
  );
};
