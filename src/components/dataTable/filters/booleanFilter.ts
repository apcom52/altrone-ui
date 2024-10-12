import { AnyObject } from '../../../utils';
import {
  BooleanFilter,
  BooleanFilterRules,
  FilterFuncArgs,
} from '../DataTable.types.ts';

export const booleanFilter = <T extends AnyObject>({
  row,
  filter,
}: FilterFuncArgs<T, BooleanFilter>) => {
  let validationResult = true;

  const value = Boolean(row[filter.field]);

  const condition = filter.conditions[0];
  const rule = condition.rule;

  switch (rule) {
    case BooleanFilterRules.positive:
      validationResult = value;
      break;
    case BooleanFilterRules.negative:
      validationResult = !value;
      break;
  }

  return validationResult;
};
