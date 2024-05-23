import { AnyObject } from '../../../utils';
import {
  ArrayFilter,
  ArrayFilterRules,
  FilterFuncArgs,
} from '../DataTable.types.ts';

export const arrayFilter = <T extends AnyObject>({
  row,
  filter,
}: FilterFuncArgs<T, ArrayFilter>) => {
  let validationResult = true;

  const value: unknown[] = row[filter.field];
  const condition = filter.conditions[0];
  const rule = condition.rule;
  const filterValue = condition.value || [];

  switch (rule) {
    case ArrayFilterRules.has:
      validationResult = Boolean(
        value.find((item) => filterValue.includes(item)),
      );
      break;
    case ArrayFilterRules.notHas:
      validationResult = !Boolean(
        value.find((item) => filterValue.includes(item)),
      );
      break;
  }

  return validationResult;
};
