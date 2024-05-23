import { useMemo } from 'react';
import s from './filtering.module.scss';
import { Select } from '../../select';
import { TextInput } from '../../textInput';
import { Button } from '../../button';
import { Icon } from '../../icon';
import { FilterRowProps, FilterType } from '../DataTable.types.ts';
import { NumberInput } from '../../numberInput';
import clsx from 'clsx';
import {
  DataTableArrayRules,
  DataTableNumberRules,
  DataTableStringRules,
} from '../DataTable.constants.ts';

export const FilterRow = ({
  filter,
  columns,
  filterIndex,
  changeField,
  deleteFilter,
}: FilterRowProps<any>) => {
  const isString = filter?.type === FilterType.string;
  const isNumber = filter?.type === FilterType.number;
  const isArray = filter?.type === FilterType.array;

  const rule = filter.conditions[0].rule;
  const value = filter.conditions[0].value;
  const minValue = isNumber ? filter.conditions[0]?.minValue || 0 : 0;
  const maxValue = isNumber ? filter.conditions[0]?.maxValue || 0 : 0;
  const options = isArray ? filter.conditions[0]?.options || [] : [];

  const ruleSet = isString
    ? DataTableStringRules
    : isNumber
      ? DataTableNumberRules
      : isArray
        ? DataTableArrayRules
        : [];

  const selectedRule = useMemo(() => {
    return ruleSet.find((item) => item.value === rule);
  }, [ruleSet, rule, filter?.type]);

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
        options={ruleSet}
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
          {isArray ? (
            <Select
              value={value}
              onChange={changeField.bind(null, filterIndex, 'value')}
              options={options}
              multiple
              searchable
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
