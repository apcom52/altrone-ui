import { FilterFn } from '@tanstack/react-table';

export const selectFilterFn: FilterFn<any, any> = (row, columnId, filterValue) => {
  if (!filterValue || !filterValue.rule) return true;

  const raw = row.getValue<any>(columnId);
  const rowValue = Array.isArray(raw)
    ? raw
    : raw !== null && raw !== undefined
    ? [raw]
    : [];

  const rule = filterValue.rule;
  const filterValues = Array.isArray(filterValue.value)
    ? filterValue.value
    : [];

  // Если не выбрано ни одного значения для фильтрации, не фильтруем
  if (filterValues.length === 0) return true;

  switch (rule) {
    case 'has':
      // Проверяем, содержит ли значение строки хотя бы одно из выбранных значений
      return filterValues.some((filterVal: any) =>
        rowValue.includes(filterVal)
      );

    case 'notHas':
      // Проверяем, что значение строки не содержит ни одного из выбранных значений
      return !filterValues.some((filterVal: any) =>
        rowValue.includes(filterVal)
      );

    default:
      return true;
  }
};
