import { FilterFn } from '@tanstack/react-table';

export const textFilterFn: FilterFn<any, any> = (row, columnId, filterValue) => {
  if (!filterValue || !filterValue.rule) return true;

  const raw = row.getValue<string>(columnId);

  const text = raw == null ? '' : String(raw).trim();
  const value = filterValue.value?.trim().toLowerCase() ?? '';
  const lower = text.toLowerCase();

  switch (filterValue.rule) {
    case 'empty':
      return lower.length === 0;

    case 'notEmpty':
      return lower.length > 0;

    case 'contains':
      return lower.includes(value);

    case 'notContains':
      return !lower.includes(value);

    case 'equal':
      return lower === value;

    case 'notEqual':
      return lower !== value;

    default:
      return true;
  }
};
