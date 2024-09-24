import { AnyObject } from '../../../utils';
import {
  FilterFuncArgs,
  NumberFilter,
  NumberFilterRules,
} from '../DataTable.types.ts';

export const numberFilter = <T extends AnyObject>({
  row,
  filter,
}: FilterFuncArgs<T, NumberFilter>) => {
  let validationResult = true;

  const value = Number(row[filter.field]);

  if (Number.isNaN(value)) {
    return false;
  }

  const condition = filter.conditions[0];
  const rule = condition.rule;
  const filterValue = condition.value;
  const minFilterValue = condition.minValue || 0;
  const maxFilterValue = condition.maxValue || 0;

  switch (rule) {
    case NumberFilterRules.equal:
      validationResult = value === filterValue;
      break;
    case NumberFilterRules.notEqual:
      validationResult = value !== filterValue;
      break;
    case NumberFilterRules.gt:
      validationResult = value > filterValue;
      break;
    case NumberFilterRules.gte:
      validationResult = value >= filterValue;
      break;
    case NumberFilterRules.lt:
      validationResult = value < filterValue;
      break;
    case NumberFilterRules.lte:
      validationResult = value <= filterValue;
      break;
    case NumberFilterRules.between:
      validationResult = value >= minFilterValue && value <= maxFilterValue;
      break;
    case NumberFilterRules.notBetween:
      validationResult = value < minFilterValue || value > maxFilterValue;
      break;
  }

  return validationResult;
};
