import { useMemo } from 'react';
import s from './filtering.module.scss';
import { Select } from 'components/select';
import { TextInput } from 'components/textInput';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import {
  FilterRowProps,
  FilterType,
  StringFilterRules,
} from '../DataTable.types.ts';
import { NumberInput } from 'components/numberInput';
import clsx from 'clsx';
import {
  DataTableArrayRules,
  DataTableBooleanRules,
  DataTableDateRules,
  DataTableNumberRules,
  DataTableStringRules,
  RulesByDataType,
} from '../DataTable.constants.ts';
import { useLocalization } from '../../application';
import { DatePicker } from 'components/datePicker/DatePicker.tsx';
import { Dayjs } from 'dayjs';
import { dayjs } from '../../calendar';
import { useDataTableCore } from '../DataTable.context.tsx';
import { Trash } from 'lucide-react';

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

  const cls = clsx(s.FilterRow, {
    [s.FilterRow_zeroColumns]:
      !currentRuleConfig || currentRuleConfig?.columns === 0,
    [s.FilterRow_twoColumns]: hasAdditionalValue,
  });

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
          <TextInput
            value={currentValue}
            onChange={(value) => changeFilter('value', value)}
            data-filter-name={filter.id}
            data-filter-control="true"
          />
        </div>
      ) : null}
      {/* {currentRuleConfig?.columns === 2 ? (
        <>
          {isNumber ? (
            <>
              <NumberInput
                value={minValue}
                onChange={changeField.bind(null, filterIndex, 'minValue')}
                data-filter-name={filter.field}
                data-filter-control="true"
                data-filter-control-side="start"
              />
              <NumberInput
                value={maxValue}
                onChange={changeField.bind(null, filterIndex, 'maxValue')}
                data-filter-name={filter.field}
                data-filter-control="true"
                data-filter-control-side="end"
              />
            </>
          ) : null}
          {isDate ? (
            <>
              <FilterDatePicker
                value={minDate}
                onChange={changeField.bind(null, filterIndex, 'minValue')}
                data-filter-name={filter.field}
                data-filter-control="true"
                data-filter-control-side="start"
                placeholder="Start date"
                maxDate={maxDate}
                clearable
              />
              <FilterDatePicker
                value={maxDate}
                onChange={changeField.bind(null, filterIndex, 'maxValue')}
                data-filter-name={filter.field}
                data-filter-control="true"
                data-filter-control-side="end"
                minDate={minDate}
                placeholder="End date"
                clearable
              />
            </>
          ) : null}
        </>
      ) : null} */}

      <Button
        icon={<Trash />}
        label={t('common.delete')}
        onClick={deleteFilter}
        showLabel={false}
      />
    </div>
  );
};
