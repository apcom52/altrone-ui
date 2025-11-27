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

  const rules = useMemo(() => {
    return DataTableStringRules.map((item) => ({
      value: item.value,
      label: t(item.label),
    }));
  }, []);

  const currentRule = filter.value?.rule;
  const currentValue = filter.value?.value;

  // const selectedRule = useMemo(() => {
  //   return ruleSet.find((item) => item.value === rule);
  // }, [ruleSet, rule, filter?.type]);

  // const columnsWithFilters = useMemo(() => {
  //   return columns?.map((item) => ({
  //     value: String(item.accessor),
  //     label: String(item.label || item.accessor),
  //     type: item.type,
  //   }));
  // }, [columns]);

  // const changeFilterField = (newField?: string) => {
  //   if (!newField) return;
  //   changeFilter(
  //     filterIndex,
  //     newField,
  //     columnsWithFilters.find((item) => item.value === newField)?.type
  //   );
  // };

  // const isTwoFields = selectedRule?.columns === 2;

  const cls = clsx(s.FilterRow, {
    // [s.FilterRow_zeroColumns]: !selectedRule || selectedRule?.columns === 0,
    // [s.FilterRow_twoColumns]: isTwoFields,
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
      {/* {selectedRule?.columns === 1 ? ( */}
      <div data-type="control">
        <TextInput
          value={currentValue}
          onChange={(value) => changeFilter('value', value)}
          data-filter-name={filter.id}
          data-filter-control="true"
        />
      </div>
      {/* ) : null} */}
      {/* {selectedRule?.columns === 2 ? (
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
