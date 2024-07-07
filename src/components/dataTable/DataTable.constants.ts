import { Option } from '../select/Select.types.ts';
import {
  ArrayFilterRules,
  NumberFilterRules,
  StringFilterRules,
} from './DataTable.types.ts';

interface FilteringRuleOption extends Option {
  columns?: 0 | 1 | 2;
}

export const DataTableStringRules: FilteringRuleOption[] = [
  {
    value: StringFilterRules.contain,
    label: 'dataTable.stringFilter.contain',
    columns: 1,
  },
  {
    value: StringFilterRules.notContain,
    label: 'dataTable.stringFilter.notContain',
    columns: 1,
  },
  {
    value: StringFilterRules.equal,
    label: 'dataTable.stringFilter.equal',
    columns: 1,
  },
  {
    value: StringFilterRules.notEqual,
    label: 'dataTable.stringFilter.notEqual',
    columns: 1,
  },
  {
    value: StringFilterRules.empty,
    label: 'dataTable.stringFilter.empty',
    columns: 0,
  },
  {
    value: StringFilterRules.notEmpty,
    label: 'dataTable.stringFilter.notEmpty',
    columns: 0,
  },
];

export const DataTableNumberRules: FilteringRuleOption[] = [
  {
    value: NumberFilterRules.equal,
    label: 'dataTable.numberFilter.equal',
    columns: 1,
  },
  {
    value: NumberFilterRules.notEqual,
    label: 'dataTable.numberFilter.notEqual',
    columns: 1,
  },
  {
    value: NumberFilterRules.gt,
    label: 'dataTable.numberFilter.gt',
    columns: 1,
  },
  {
    value: NumberFilterRules.gte,
    label: 'dataTable.numberFilter.gte',
    columns: 1,
  },
  {
    value: NumberFilterRules.lt,
    label: 'dataTable.numberFilter.lt',
    columns: 1,
  },
  {
    value: NumberFilterRules.lte,
    label: 'dataTable.numberFilter.lte',
    columns: 1,
  },
  {
    value: NumberFilterRules.between,
    label: 'dataTable.numberFilter.between',
    columns: 2,
  },
  {
    value: NumberFilterRules.notBetween,
    label: 'dataTable.numberFilter.notBetween',
    columns: 2,
  },
];

export const DataTableArrayRules: FilteringRuleOption[] = [
  {
    value: ArrayFilterRules.has,
    label: 'dataTable.arrayFilter.has',
    columns: 1,
  },
  {
    value: ArrayFilterRules.notHas,
    label: 'dataTable.arrayFilter.notHas',
    columns: 1,
  },
];
