import { FilterFn } from '@tanstack/react-table';
import { NumberUtils } from 'utils';

export const numberFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue || !filterValue.rule) return true;

  const raw = row.getValue<any>(columnId);
  const number = NumberUtils.toNumber(raw);

  const rule = filterValue.rule;

  // ----- empty / notEmpty -----

  if (rule === 'empty') {
    return number === null;
  }

  if (rule === 'notEmpty') {
    return number !== null;
  }

  // ----- остальные правила требуют числа -----

  const val = filterValue.value;

  // правая часть отсутствует → условие не задано → не фильтруем
  if (val === undefined || val === null) return true;

  const left = Array.isArray(val)
    ? NumberUtils.toNumber(val[0])
    : NumberUtils.toNumber(val);
  const right = Array.isArray(val) ? NumberUtils.toNumber(val[1]) : null;

  if (left === null && right === null) return true;

  // null в данных → не удовлетворяет числовым сравнениям
  if (number === null) return false;

  // ----- Equal / notEqual -----

  if (rule === 'equal') {
    return number === left;
  }

  if (rule === 'notEqual') {
    return number !== left;
  }

  // ----- Comparison -----

  if (rule === 'gt') return number > left!;
  if (rule === 'gte') return number >= left!;
  if (rule === 'lt') return number < left!;
  if (rule === 'lte') return number <= left!;

  // ----- Between / NotBetween -----

  if (rule === 'between') {
    if (left === null || right === null) return true;
    return number >= left && number <= right;
  }

  if (rule === 'notBetween') {
    if (left === null || right === null) return true;
    return number < left || number > right;
  }

  return true;
};
