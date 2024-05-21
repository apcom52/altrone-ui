import { useMemo } from 'react';
import s from './filtering.module.scss';
import { Select } from '../../select';
import { TextInput } from '../../textInput';
import { Button } from '../../button';
import { Icon } from '../../icon';
import { FilterRowProps } from '../DataTable.types.ts';
import { NumberInput } from '../../numberInput';
import clsx from 'clsx';
import {
  DataTableNumberRules,
  DataTableStringRules,
} from '../DataTable.constants.ts';

export const FilterRow = ({
  filter,
  columns,
  filterIndex,
  changeField,
  deleteFilter,
}: FilterRowProps) => {
  const isString = filter?.type === 'string';
  const isNumber = filter?.type === 'number';

  const rule = filter.conditions[0].rule;
  const value = filter.conditions[0].value;
  const minValue = isNumber ? filter.conditions[0]?.minValue || 0 : 0;
  const maxValue = isNumber ? filter.conditions[0]?.maxValue || 0 : 0;

  const selectedRule = useMemo(() => {
    const ruleArray =
      filter?.type === 'string' ? DataTableStringRules : DataTableNumberRules;

    return ruleArray.find((item) => item.value === rule);
  }, [rule, filter?.type]);

  const columnsWithFilters = useMemo(() => {
    return columns?.map((item) => ({
      value: String(item.accessor),
      label: String(item.label || item.accessor),
    }));
  }, [columns]);

  const isTwoFields = selectedRule?.columns === 2;

  const cls = clsx(s.FilterRow, {
    [s.FilterRow_zeroColumns]: !selectedRule || selectedRule?.columns === 0,
    [s.FilterRow_twoColumns]: isTwoFields,
  });

  return (
    <div className={cls}>
      <Select
        value={filter?.field}
        placeholder="Choose column"
        onChange={() => null}
        options={columnsWithFilters}
      />
      <Select
        value={rule}
        placeholder="Choose rule"
        onChange={changeField.bind(null, filterIndex, 'rule')}
        options={isString ? DataTableStringRules : DataTableNumberRules}
        parentWidth={false}
      />
      {selectedRule?.columns === 0 ? null : null}
      {selectedRule?.columns === 1 ? (
        <>
          {isString ? (
            <TextInput
              value={String(value)}
              onChange={changeField.bind(null, filterIndex, 'value')}
            />
          ) : null}
          {isNumber ? (
            <NumberInput
              value={Number(value)}
              onChange={changeField.bind(null, filterIndex, 'value')}
            />
          ) : null}
        </>
      ) : null}
      {selectedRule?.columns === 2 ? (
        <>
          {isNumber ? (
            <>
              <NumberInput
                value={minValue}
                onChange={changeField.bind(null, filterIndex, 'minValue')}
              />
              <NumberInput
                value={maxValue}
                onChange={changeField.bind(null, filterIndex, 'maxValue')}
              />
            </>
          ) : null}
        </>
      ) : null}

      <Button
        leftIcon={<Icon i="close" />}
        title="Delete filter"
        onClick={() => deleteFilter(filterIndex)}
      />
    </div>
  );
};
