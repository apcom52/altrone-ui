import dayjs from 'dayjs';
import { AnyObject } from '../../../utils/index.ts';
import {
  DateFilter,
  DateFilterRules,
  FilterFuncArgs,
} from '../DataTable.types.ts';

export const dateFilter = <T extends AnyObject>({
  row,
  filter,
}: FilterFuncArgs<T, DateFilter>) => {
  let validationResult = true;

  const rawValue = row[filter.field];
  const value = dayjs(row[filter.field]);

  const condition = filter.conditions[0];
  const rule = condition.rule;
  const accuracy =
    filter.columnType === 'month'
      ? 'month'
      : filter.columnType === 'year'
        ? 'year'
        : 'day';

  if (
    ![DateFilterRules.empty, DateFilterRules.notEmpty].includes(
      filter.conditions[0].rule,
    ) &&
    !rawValue
  ) {
    return false;
  }

  switch (rule) {
    case DateFilterRules.equal:
      if (rawValue === undefined || rawValue === null) {
        return false;
      }

      validationResult = Boolean(
        value && value.isSame(condition.value, accuracy),
      );
      break;
    case DateFilterRules.notEqual:
      if (rawValue === undefined || rawValue === null) {
        return false;
      }

      validationResult = !value.isSame(condition.value, accuracy);
      break;
    case DateFilterRules.gt:
      validationResult = value.isAfter(condition.value, accuracy);
      break;
    case DateFilterRules.gte:
      validationResult = value.isSameOrAfter(condition.value, accuracy);
      break;
    case DateFilterRules.lt:
      validationResult = value.isBefore(condition.value, accuracy);
      break;
    case DateFilterRules.lte:
      validationResult = value.isSameOrBefore(condition.value, accuracy);
      break;
    case DateFilterRules.empty:
      validationResult = value === undefined;
      break;
    case DateFilterRules.notEmpty:
      validationResult = value !== undefined;
      break;
    case DateFilterRules.between:
      validationResult = value.isBetween(
        condition.minValue,
        condition.maxValue,
        accuracy,
        '[]',
      );
      break;
    case DateFilterRules.beyond:
      validationResult =
        value.isBefore(condition.minValue, accuracy) ||
        value.isAfter(condition.maxValue, accuracy);
      break;
  }

  return validationResult;
};
