import { AnyObject } from '../../../utils';
import {
  FilterFuncArgs,
  StringFilter,
  StringFilterRules,
} from '../DataTable.types.ts';

export const stringFilter = <T extends AnyObject>({
  row,
  filter,
}: FilterFuncArgs<T, StringFilter>) => {
  let validationResult = true;

  const value = String(row[filter.field]).toLowerCase();
  const condition = filter.conditions[0];
  const rule = condition.rule;
  const filterValue = condition.value.trim().toLowerCase();

  switch (rule) {
    case StringFilterRules.contain:
      validationResult = value.includes(filterValue);
      break;
    case StringFilterRules.notContain:
      validationResult = !value.includes(filterValue);
      break;
    case StringFilterRules.empty:
      validationResult = value == '';
      break;
    case StringFilterRules.notEmpty:
      validationResult = value != '';
      break;
    case StringFilterRules.equal:
      validationResult = value == filterValue;
      break;
    case StringFilterRules.notEqual:
      validationResult = value != filterValue;
      break;
  }

  return validationResult;
};
