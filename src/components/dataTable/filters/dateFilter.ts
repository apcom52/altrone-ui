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

  const value = dayjs(row[filter.field]);

  const condition = filter.conditions[0];
  const rule = condition.rule;

  switch (rule) {
    case DateFilterRules.equal:
      validationResult = value.isSame(condition.value, 'day');
      break;
    case DateFilterRules.notEqual:
      validationResult = !value.isSame(condition.value, 'day');
      break;
    case DateFilterRules.gt:
      validationResult = value.isAfter(condition.value, 'day');
      break;
    case DateFilterRules.gte:
      validationResult = value.isSameOrAfter(condition.value, 'day');
      break;
    case DateFilterRules.lt:
      validationResult = value.isBefore(condition.value, 'day');
      break;
    case DateFilterRules.lte:
      validationResult = value.isSameOrBefore(condition.value, 'day');
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
        'day',
        '[]',
      );
      break;
    case DateFilterRules.beyond:
      validationResult =
        value.isBefore(condition.minValue, 'day') ||
        value.isAfter(condition.maxValue, 'day');
      break;
  }

  return validationResult;
};
