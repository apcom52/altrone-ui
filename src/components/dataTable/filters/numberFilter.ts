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

  const rawValue = row[filter.field];
  const value = Number(rawValue);
  const stringValue = String(rawValue);

  const condition = filter.conditions[0];
  const rule = condition.rule;
  const filterValue = condition.value || 0;
  const minFilterValue = condition.minValue || 0;
  const maxFilterValue = condition.maxValue || 0;

  console.log('>>', rawValue, value, stringValue, filterValue);

  if (
    ![NumberFilterRules.empty, NumberFilterRules.notEmpty].includes(
      filter.conditions[0].rule,
    ) &&
    Number.isNaN(value)
  ) {
    return false;
  }

  switch (rule) {
    case NumberFilterRules.empty:
      validationResult =
        stringValue.trim() === '' ||
        rawValue === undefined ||
        rawValue === null;
      break;
    case NumberFilterRules.notEmpty:
      validationResult =
        stringValue.trim() !== '' &&
        rawValue !== undefined &&
        rawValue !== null;
      break;
    case NumberFilterRules.equal:
      if (Number.isNaN(rawValue) || Number.isNaN(filterValue)) {
        validationResult = false;
      } else {
        validationResult = value === filterValue;
      }

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
