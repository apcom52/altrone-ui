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
  { value: StringFilterRules.contain, label: 'contains', columns: 1 },
  {
    value: StringFilterRules.notContain,
    label: 'not contains',
    columns: 1,
  },
  { value: StringFilterRules.equal, label: 'equals to', columns: 1 },
  {
    value: StringFilterRules.notEqual,
    label: 'not equals to',
    columns: 1,
  },
  { value: StringFilterRules.empty, label: 'is empty', columns: 0 },
  {
    value: StringFilterRules.notEmpty,
    label: 'is not empty',
    columns: 0,
  },
];

export const DataTableNumberRules: FilteringRuleOption[] = [
  { value: NumberFilterRules.equal, label: 'equals to', columns: 1 },
  {
    value: NumberFilterRules.notEqual,
    label: 'not equals to',
    columns: 1,
  },
  { value: NumberFilterRules.gt, label: '>', columns: 1 },
  { value: NumberFilterRules.gte, label: '≥', columns: 1 },
  { value: NumberFilterRules.lt, label: '<', columns: 1 },
  { value: NumberFilterRules.lte, label: '≤', columns: 1 },
  { value: NumberFilterRules.between, label: 'is between', columns: 2 },
  {
    value: NumberFilterRules.notBetween,
    label: 'is not between',
    columns: 2,
  },
];

export const DataTableArrayRules: FilteringRuleOption[] = [
  { value: ArrayFilterRules.has, label: 'is contained in', columns: 1 },
  {
    value: ArrayFilterRules.notHas,
    label: 'is not contained in',
    columns: 1,
  },
];
