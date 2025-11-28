import { FilterFn } from '@tanstack/react-table';
import { dayjs } from 'components/calendar/index.ts';

export const dateFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue || !filterValue.rule) return true;

  const raw = row.getValue<any>(columnId);
  const rowDate = dayjs(raw);

  const rule = filterValue.rule;

  // ----- empty / notEmpty -----

  if (rule === 'empty') {
    return !rowDate.isValid();
  }

  if (rule === 'notEmpty') {
    return rowDate.isValid();
  }

  // Если дата невалидна, не удовлетворяет остальным правилам
  if (!rowDate.isValid()) {
    return false;
  }

  // ----- остальные правила требуют дату -----

  const val = filterValue.value;

  // правая часть отсутствует → условие не задано → не фильтруем
  if (val === undefined || val === null || val === '') return true;

  // Получаем level из filterValue (устанавливается в FilterRow)
  const level = filterValue.level || 'day';

  // Нормализуем даты в зависимости от level
  const normalizeDate = (date: any, lvl: string) => {
    if (!date?.isValid()) return null;
    if (lvl === 'year') return date.startOf('year');
    if (lvl === 'month') return date.startOf('month');
    return date.startOf('day');
  };

  // Для between/beyond - два значения
  if (Array.isArray(val)) {
    const [startVal, endVal] = val;

    if (
      (startVal === '' || startVal === null || startVal === undefined) &&
      (endVal === '' || endVal === null || endVal === undefined)
    ) {
      return true;
    }

    const startDate = startVal ? dayjs(startVal) : null;
    const endDate = endVal ? dayjs(endVal) : null;

    if (!startDate?.isValid() && !endDate?.isValid()) return true;

    const normalizedRowDate = normalizeDate(rowDate, level);
    const normalizedStart = startDate ? normalizeDate(startDate, level) : null;
    const normalizedEnd = endDate ? normalizeDate(endDate, level) : null;

    if (rule === 'between') {
      if (!normalizedStart || !normalizedEnd) return true;
      return (
        normalizedRowDate.isSameOrAfter(normalizedStart) &&
        normalizedRowDate.isSameOrBefore(normalizedEnd)
      );
    }

    if (rule === 'beyond') {
      if (!normalizedStart || !normalizedEnd) return true;
      return (
        normalizedRowDate.isBefore(normalizedStart) ||
        normalizedRowDate.isAfter(normalizedEnd)
      );
    }

    return true;
  }

  // Одно значение для остальных правил
  const filterDate = dayjs(val);
  if (!filterDate.isValid()) return true;

  const normalizedRowDate = normalizeDate(rowDate, level);
  const normalizedFilterDate = normalizeDate(filterDate, level);

  if (!normalizedRowDate || !normalizedFilterDate) return false;

  // ----- Equal / notEqual -----

  if (rule === 'equal') {
    return normalizedRowDate.isSame(normalizedFilterDate);
  }

  if (rule === 'notEqual') {
    return !normalizedRowDate.isSame(normalizedFilterDate);
  }

  // ----- Comparison -----

  if (rule === 'gt') {
    return normalizedRowDate.isAfter(normalizedFilterDate);
  }

  if (rule === 'gte') {
    return normalizedRowDate.isSameOrAfter(normalizedFilterDate);
  }

  if (rule === 'lt') {
    return normalizedRowDate.isBefore(normalizedFilterDate);
  }

  if (rule === 'lte') {
    return normalizedRowDate.isSameOrBefore(normalizedFilterDate);
  }

  return true;
};
