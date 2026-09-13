import { FilterFn } from '@tanstack/react-table';
import { NumberUtils } from 'utils';

export const numberFilterFn: FilterFn<any, any> = (row, columnId, filterValue) => {
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
  if (val === undefined || val === null || val === '') return true;

  // Проверяем, что значение не является пустой строкой в массиве
  if (Array.isArray(val)) {
    if (
      (val[0] === '' || val[0] === null || val[0] === undefined) &&
      (val[1] === '' || val[1] === null || val[1] === undefined)
    ) {
      return true;
    }
  }

  const left = Array.isArray(val)
    ? NumberUtils.toNumber(val[0])
    : NumberUtils.toNumber(val);
  const right = Array.isArray(val) ? NumberUtils.toNumber(val[1]) : null;

  // Если значение не может быть преобразовано в число, не фильтруем
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
